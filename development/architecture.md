# 整体架构

本文档描述 HaloLight 项目的整体架构设计，包括目录结构、分层设计和核心模式。

## 目录结构规范

### 标准目录布局

```
src/
├── app/                    # 页面路由 (Next.js) 或 views/ (Vue)
│   ├── (admin)/           # 管理后台路由组
│   │   ├── dashboard/     # 仪表盘
│   │   ├── users/         # 用户管理
│   │   ├── roles/         # 角色管理
│   │   ├── permissions/   # 权限管理
│   │   ├── settings/      # 系统设置
│   │   └── profile/       # 个人中心
│   └── (auth)/            # 认证路由组
│       ├── login/         # 登录
│       ├── register/      # 注册
│       ├── forgot-password/
│       └── reset-password/
├── components/            # 可复用组件
│   ├── ui/               # 基础 UI 组件 (shadcn/ui)
│   ├── layout/           # 布局组件
│   ├── dashboard/        # 仪表盘组件
│   ├── charts/           # 图表组件
│   └── shared/           # 通用业务组件
├── hooks/ (composables/)  # 可复用逻辑
├── stores/               # 状态管理
├── services/             # API 服务层
├── lib/                  # 工具库
├── types/                # TypeScript 类型定义
├── styles/               # 全局样式
└── mocks/                # Mock 数据
```

## 分层架构

### 四层架构设计

```
┌─────────────────────────────────────────────────┐
│                   视图层 (Views)                  │
│        Pages / Views / Routes                    │
├─────────────────────────────────────────────────┤
│                  组件层 (Components)              │
│     UI Components / Layout / Dashboard          │
├─────────────────────────────────────────────────┤
│                  状态层 (State)                   │
│     Stores / Composables / Hooks                │
├─────────────────────────────────────────────────┤
│                  服务层 (Services)                │
│     API Services / Data Fetching / Cache        │
└─────────────────────────────────────────────────┘
```

### 各层职责

| 层级 | 职责 | 框架实现 |
|------|------|----------|
| 视图层 | 页面路由、布局组装 | Next.js Pages / Vue Views |
| 组件层 | UI 渲染、用户交互 | React/Vue/Svelte Components |
| 状态层 | 应用状态、业务逻辑 | Zustand / Pinia / Stores |
| 服务层 | API 调用、数据缓存 | TanStack Query / Axios |

## Provider 层次结构

### React/Next.js Provider 链

```tsx
<ThemeProvider>
  <MockProvider>
    <QueryClientProvider>
      <AuthProvider>
        <PermissionProvider>
          <WebSocketProvider>
            <ErrorProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </ErrorProvider>
          </WebSocketProvider>
        </PermissionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </MockProvider>
</ThemeProvider>
```

### Vue Plugin 注册顺序

```ts
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(mockPlugin)
app.use(queryPlugin)
app.use(permissionPlugin)
```

## 布局系统

### AdminLayout 结构

```
┌──────────────────────────────────────────────────────┐
│                     Header                            │
│  [Logo] [Breadcrumb]           [Search] [User] [Settings]
├────────────┬─────────────────────────────────────────┤
│            │                                          │
│  Sidebar   │              Content                     │
│            │                                          │
│  - Menu    │   ┌──────────────────────────────────┐  │
│  - Nav     │   │        Page Content               │  │
│            │   │                                   │  │
│            │   └──────────────────────────────────┘  │
│            │                                          │
├────────────┴─────────────────────────────────────────┤
│                     Footer                            │
└──────────────────────────────────────────────────────┘
```

### AuthLayout 结构

```
┌──────────────────────────────────────────────────────┐
│                                                       │
│                    ┌────────────┐                    │
│                    │            │                    │
│                    │  Auth Form │                    │
│                    │            │                    │
│                    └────────────┘                    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## 路由配置规范

### 路由元信息

```ts
interface RouteMeta {
  title: string           // 页面标题
  icon?: string          // 菜单图标
  permission?: string    // 所需权限
  hidden?: boolean       // 是否在菜单中隐藏
  keepAlive?: boolean    // 是否缓存组件
  breadcrumb?: boolean   // 是否显示面包屑
}
```

### 标准路由表

| 路径 | 页面 | 权限 |
|------|------|------|
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户列表 | `users:list` |
| `/users/create` | 创建用户 | `users:create` |
| `/users/:id` | 用户详情 | `users:view` |
| `/users/:id/edit` | 编辑用户 | `users:update` |
| `/roles` | 角色列表 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | - (登录即可) |

## 环境变量规范

### 变量命名约定

| 前缀 | 框架 | 说明 |
|------|------|------|
| `NEXT_PUBLIC_` | Next.js | 客户端可见 |
| `VITE_` | Vue/Vite | 客户端可见 |
| `PUBLIC_` | SvelteKit | 客户端可见 |
| 无前缀 | 所有 | 仅服务端可见 |

### 必需环境变量

```bash
# API 配置
*_API_BASE_URL=http://localhost:3000/api
*_API_TIMEOUT=30000

# 认证配置
*_AUTH_SECRET=your-secret-key
*_TOKEN_EXPIRES=7d

# Mock 开关
*_ENABLE_MOCK=true

# 功能开关
*_ENABLE_WEBSOCKET=true
*_ENABLE_ANALYTICS=false
```

## 代码组织原则

### 1。功能优先

按功能模块组织代码，而非按文件类型：

```
# 推荐 ✅
features/
├── users/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/

# 避免 ❌
components/
├── UserList.tsx
├── UserForm.tsx
hooks/
├── useUsers.ts
services/
├── userService.ts
```

### 2。就近原则

组件专用的样式、类型、工具放在组件目录下：

```
components/
└── UserCard/
    ├── index.tsx
    ├── UserCard.module.css
    ├── UserCard.types.ts
    └── useUserCard.ts
```

### 3。公共提取

多处使用的代码提取到共享位置：

```
# 2个以上组件使用 → 提取到 components/shared/
# 3个以上地方使用 → 提取到 lib/ 或 utils/
```

### 2。规范先行

新增或调整功能时，先在 `halolight/docs` 明确接口、约束和目录，再同步到 `halolight` 与 `halolight-vue`，避免各实现分叉。
