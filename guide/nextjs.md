# Next.js 版本

HaloLight Next.js 版本基于 Next.js 14 App Router 构建，采用 React 18 + TypeScript。

**在线预览**：[https://halolight.h7ml.cn/](https://halolight.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight](https://github.com/halolight/halolight)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 14.x | React 全栈框架 |
| React | 18.x | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn/ui | latest | UI 组件库 |
| Zustand | 5.x | 状态管理 |
| TanStack Query | 5.x | 服务端状态 |
| React Hook Form | 7.x | 表单处理 |
| Zod | 3.x | 数据验证 |
| react-grid-layout | 1.x | 拖拽布局 |
| ECharts | 5.x | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 目录结构

```
halolight/
├── src/
│   ├── app/                      # App Router 页面
│   │   ├── (admin)/             # 管理后台路由组
│   │   │   ├── dashboard/       # 仪表盘
│   │   │   ├── users/           # 用户管理
│   │   │   ├── roles/           # 角色管理
│   │   │   ├── permissions/     # 权限管理
│   │   │   ├── settings/        # 系统设置
│   │   │   └── profile/         # 个人中心
│   │   ├── (auth)/              # 认证路由组
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── layout.tsx           # 根布局
│   │   └── page.tsx             # 首页重定向
│   ├── components/
│   │   ├── ui/                  # shadcn/ui 组件 (30+)
│   │   ├── layout/              # 布局组件
│   │   │   ├── admin-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/           # 仪表盘组件
│   │   │   ├── dashboard-grid.tsx
│   │   │   ├── widget-wrapper.tsx
│   │   │   ├── stats-widget.tsx
│   │   │   ├── chart-widget.tsx
│   │   │   └── ...
│   │   └── shared/              # 共享组件
│   ├── hooks/                   # React Hooks
│   │   ├── use-users.ts
│   │   ├── use-auth.ts
│   │   └── ...
│   ├── stores/                  # Zustand Stores
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   ├── dashboard.ts
│   │   ├── navigation.ts
│   │   └── tabs.ts
│   ├── services/                # API 服务
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── ...
│   ├── lib/                     # 工具库
│   │   ├── utils.ts
│   │   └── cn.ts
│   ├── types/                   # 类型定义
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── ...
│   └── mocks/                   # Mock 数据
│       ├── index.ts
│       └── modules/
├── public/                      # 静态资源
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight.git
cd halolight
pnpm install
```

### 环境变量

```bash
cp .env.example .env.local
```

```env
# .env.local 示例
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_MOCK=false
NEXT_PUBLIC_DEMO_EMAIL=admin@example.com
NEXT_PUBLIC_DEMO_PASSWORD=123456
NEXT_PUBLIC_SHOW_DEMO_HINT=false
NEXT_PUBLIC_WS_URL=
NEXT_PUBLIC_APP_TITLE=Admin Pro
NEXT_PUBLIC_BRAND_NAME=Halolight
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产

```bash
pnpm build
pnpm start
```

## 核心功能

### 状态管理 (Zustand)

```tsx
// stores/auth.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (credentials) => {
        const response = await authService.login(credentials)
        set({
          user: response.user,
          token: response.token,
        })
      },

      logout: () => {
        set({ user: null, token: null })
      },

      hasPermission: (permission) => {
        const permissions = get().user?.permissions || []
        return permissions.some(p =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    { name: 'auth' }
  )
)
```

### 数据获取 (TanStack Query)

```tsx
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/users'

export function useUsers(params?: UserQueryParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(params),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### 权限组件

```tsx
// components/permission-guard.tsx
interface PermissionGuardProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({
  permission,
  children,
  fallback = null
}: PermissionGuardProps) {
  const hasPermission = useAuthStore(s => s.hasPermission)

  if (!hasPermission(permission)) {
    return fallback
  }

  return children
}

// 使用
<PermissionGuard permission="users:delete">
  <DeleteButton />
</PermissionGuard>
```

### 可拖拽仪表盘

```tsx
// components/dashboard/dashboard-grid.tsx
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function DashboardGrid() {
  const { layouts, updateLayout, isEditing } = useDashboardStore()

  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 8, sm: 4 }}
      rowHeight={80}
      isDraggable={isEditing}
      isResizable={isEditing}
      onLayoutChange={(_, allLayouts) => updateLayout(allLayouts)}
    >
      {widgets.map(widget => (
        <div key={widget.id}>
          <WidgetWrapper widget={widget} />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 重定向到 `/dashboard` | - |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户列表 | `users:list` |
| `/users/create` | 创建用户 | `users:create` |
| `/users/[id]` | 用户详情 | `users:view` |
| `/users/[id]/edit` | 编辑用户 | `users:update` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

## UI 组件

基于 shadcn/ui，已集成 30+ 组件：

- **表单**：Button，Input，Textarea，Select，Checkbox，Radio，Switch，Slider，DatePicker
- **数据展示**：Table，Card，Badge，Avatar，Progress，Skeleton
- **反馈**：Dialog，Sheet，Alert，Toast，Tooltip，Popover
- **导航**：Tabs，Breadcrumb，Pagination，DropdownMenu，Command
- **布局**：Accordion，Collapsible，ScrollArea，Separator

## 主题配置

```tsx
// 切换主题
const { theme, setTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'

// 切换皮肤
const { skin, setSkin } = useUISettingsStore()
setSkin('rose') // 11 种皮肤预设
```

## 部署

### Vercel (推荐)

```bash
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### 静态导出

```bash
# next.config.js
module.exports = {
  output: 'export'
}

pnpm build
# 输出到 out/ 目录
```
