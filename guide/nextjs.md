# Next.js 版本

HaloLight Next.js 版本基于 Next.js 14 App Router 构建，采用 React 18 + TypeScript。

**在线预览**：[https://halolight.h7ml.cn/](https://halolight.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight](https://github.com/halolight/halolight)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 14.x | React 全栈框架 (App Router) |
| React | 18.x | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn/ui | latest | UI 组件库 (28 组件) |
| Zustand | 5.x | 状态管理 (6 Store) |
| TanStack Query | 5.x | 服务端状态 |
| React Hook Form | 7.x | 表单处理 |
| Zod | 4.x | 数据验证 |
| react-grid-layout | 1.x | 拖拽布局 |
| Recharts | 3.x | 图表可视化 |
| Framer Motion | 12.x | 动画效果 |
| Mock.js | 1.x | 数据模拟 |
| next-pwa | 5.x | PWA 支持 |

## 目录结构

```
halolight/
├── src/
│   ├── app/                      # App Router 页面
│   │   ├── (auth)/              # 认证路由组
│   │   │   ├── login/           # 登录
│   │   │   ├── register/        # 注册
│   │   │   ├── forgot-password/ # 忘记密码
│   │   │   ├── reset-password/  # 重置密码
│   │   │   └── layout.tsx       # 认证布局
│   │   ├── (dashboard)/         # 仪表盘路由组
│   │   │   ├── page.tsx         # 仪表盘首页（可配置）
│   │   │   ├── accounts/        # 账户与权限
│   │   │   ├── analytics/       # 数据分析
│   │   │   ├── calendar/        # 日程管理
│   │   │   ├── docs/            # 帮助文档
│   │   │   ├── documents/       # 文档管理
│   │   │   ├── files/           # 文件存储
│   │   │   ├── messages/        # 消息中心
│   │   │   ├── notifications/   # 通知中心
│   │   │   ├── profile/         # 个人资料
│   │   │   ├── users/           # 用户管理
│   │   │   ├── settings/        # 系统设置
│   │   │   │   └── teams/       # 团队管理
│   │   │   │       └── roles/   # 角色管理
│   │   │   └── layout.tsx       # 仪表盘布局
│   │   ├── (legal)/             # 法律条款路由组
│   │   │   ├── privacy/         # 隐私政策
│   │   │   ├── terms/           # 服务条款
│   │   │   └── layout.tsx
│   │   ├── layout.tsx           # 根布局
│   │   ├── error.tsx            # 错误页面
│   │   └── not-found.tsx        # 404 页面
│   ├── components/
│   │   ├── ui/                  # shadcn/ui 组件 (28 个)
│   │   ├── layout/              # 布局组件 (11 个)
│   │   │   ├── admin-layout.tsx # 管理后台布局
│   │   │   ├── sidebar.tsx      # 可折叠侧边栏
│   │   │   ├── header.tsx       # 页头（通知/错误/用户菜单）
│   │   │   ├── footer.tsx       # 页脚
│   │   │   ├── tab-bar.tsx      # 多标签导航
│   │   │   ├── command-menu.tsx # 命令面板 (⌘K)
│   │   │   ├── quick-settings.tsx # 界面设置面板
│   │   │   ├── theme-toggle.tsx # 主题切换
│   │   │   └── pending-overlay.tsx # 加载遮罩
│   │   ├── dashboard/           # 仪表盘组件
│   │   │   ├── configurable-dashboard.tsx # 可配置仪表盘
│   │   │   ├── charts.tsx       # 图表组件
│   │   │   ├── stats-card.tsx   # 统计卡片
│   │   │   └── recent-activity.tsx # 最近活动
│   │   └── shared/              # 共享组件
│   ├── hooks/                   # React Hooks (15 个)
│   │   ├── use-users.ts         # 用户 CRUD
│   │   ├── use-teams.ts         # 团队管理
│   │   ├── use-messages.ts      # 消息管理
│   │   ├── use-notifications.ts # 通知管理
│   │   ├── use-calendar.ts      # 日历数据
│   │   ├── use-documents.ts     # 文档管理
│   │   ├── use-files.ts         # 文件管理
│   │   ├── use-dashboard.ts     # 仪表盘状态
│   │   ├── use-dashboard-data.ts # 仪表盘数据 Hook 集合
│   │   ├── use-chart-palette.ts # 图表配色（主题感知）
│   │   ├── use-action-mutation.ts # Server Action 封装
│   │   ├── use-keep-alive.tsx   # 页面状态缓存
│   │   ├── use-tdk.ts           # TDK 管理
│   │   └── use-title.ts         # 页面标题
│   ├── stores/                  # Zustand Stores (6 个)
│   │   ├── auth-store.ts        # 认证状态（含多账户）
│   │   ├── ui-settings-store.ts # UI 设置
│   │   ├── dashboard-store.ts   # 仪表盘状态
│   │   ├── navigation-store.ts  # 导航状态
│   │   ├── tabs-store.ts        # 标签页状态
│   │   └── error-store.ts       # 错误收集
│   ├── providers/               # React Providers (8 个)
│   │   ├── app-providers.tsx    # Provider 聚合
│   │   ├── auth-provider.tsx    # 认证 Provider
│   │   ├── theme-provider.tsx   # 主题 Provider
│   │   ├── query-provider.tsx   # TanStack Query
│   │   ├── error-provider.tsx   # 错误处理
│   │   ├── permission-provider.tsx # 权限检查
│   │   ├── websocket-provider.tsx # WebSocket 实时通知
│   │   └── keep-alive-provider.tsx # 页面保活
│   ├── actions/                 # Server Actions
│   ├── config/                  # 配置文件
│   │   ├── routes.ts            # 路由与权限配置
│   │   └── tdk.ts               # TDK 配置
│   ├── lib/                     # 工具库
│   │   └── api/                 # API 客户端
│   ├── mock/                    # Mock 数据 (9 模块)
│   └── middleware.ts            # 中间件（认证+安全头）
├── public/
│   ├── manifest.json            # PWA 清单
│   ├── sw.js                    # Service Worker
│   ├── icons/                   # PWA 图标 (8 尺寸)
│   ├── screenshots/             # PWA 截图
│   └── fonts/                   # 自托管字体
├── next.config.mjs              # Next.js + PWA 配置
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
NEXT_PUBLIC_MOCK=true              # 开启 Mock 数据
NEXT_PUBLIC_DEMO_EMAIL=admin@example.com
NEXT_PUBLIC_DEMO_PASSWORD=123456
NEXT_PUBLIC_SHOW_DEMO_HINT=false
NEXT_PUBLIC_WS_URL=                # WebSocket 地址
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

### 1。可配置仪表盘

支持 9 种小部件类型，可自由拖拽、调整大小、添加删除：

| 小部件类型 | 说明 | 数据来源 |
|-----------|------|----------|
| `stats` | 数据统计卡片（4 指标） | useDashboardStats |
| `chart-line` | 折线图（访问趋势） | useDashboardVisits |
| `chart-bar` | 柱状图（销售统计） | useDashboardSales |
| `chart-pie` | 饼图（流量占比） | useDashboardPie |
| `recent-users` | 最近用户列表 | useDashboardUsers |
| `notifications` | 通知列表 | useDashboardNotifications |
| `tasks` | 待办任务 | useDashboardTasks |
| `calendar` | 今日日程 | useDashboardCalendar |
| `quick-actions` | 快捷操作入口 | 静态配置 |

```tsx
// 仪表盘编辑模式
const { isEditing, setIsEditing, addWidget, removeWidget, resetToDefault } = useDashboardStore()

// 响应式布局 (列数自动适配)
// lg: 12列, md: 8列, sm: 4列, xs: 2列, mobile: 1列
```

### 2。多账户认证系统

```tsx
// stores/auth-store.ts
interface AuthState {
  user: AccountWithToken | null
  accounts: AccountWithToken[]        // 多账户列表
  activeAccountId: string | null      // 当前账户

  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  switchAccount: (accountId: string) => Promise<void>  // 快速切换账户
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  checkAuth: () => Promise<void>
}

// 使用 Cookie 存储 Token，支持"记住我"（7天/1天）
Cookies.set("token", response.token, {
  expires: data.remember ? 7 : 1,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
})
```

### 3。多标签导航

```tsx
// stores/tabs-store.ts
interface Tab {
  id: string
  title: string
  path: string
  icon?: string
  closable?: boolean  // 首页不可关闭
}

// 右键菜单功能
- 刷新页面
- 关闭标签
- 关闭其他
- 关闭右侧
- 关闭所有
```

### 4。页面状态缓存 (Keep-Alive)

```tsx
// hooks/use-keep-alive.tsx

// 自动保存/恢复滚动位置
useScrollRestore()

// 保存表单状态
const [values, saveValues, clearCache] = useFormCache('filter-form', initialValues)

// 保存自定义状态
const [state, setState] = useStateCache('my-key', initialValue)
```

### 5。命令面板 (⌘K)

支持键盘快速导航、主题切换、账户切换、退出登录等操作。

### 6。界面设置面板

```tsx
// 主题模式
setTheme('light' | 'dark' | 'system')

// 皮肤切换（带 View Transitions 动画）
setSkin(skinPreset)

// 布局控制
setShowFooter(boolean)      // 显示/隐藏底部
setShowTabBar(boolean)      // 显示/隐藏标签栏
setMobileHeaderFixed(boolean)   // 移动端固定头部
setMobileTabBarFixed(boolean)   // 移动端固定标签栏
```

### 7。实时通知 (WebSocket)

```tsx
// providers/websocket-provider.tsx
const { status, lastMessage, sendMessage, reconnect } = useWebSocket()

// 监听新通知
useRealtimeNotifications((notification) => {
  console.log('新通知:', notification)
})
```

### 8。权限系统

```tsx
// 路由权限配置
export const ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/": "dashboard:view",
  "/users": "users:view",
  "/analytics": "analytics:view",
  // ...
}

// 权限检查
const { hasPermission } = usePermission()
if (hasPermission("users:delete")) {
  // 显示删除按钮
}

// 权限守卫组件
<PermissionGuard permission="users:delete" fallback={<Disabled />}>
  <DeleteButton />
</PermissionGuard>
```

## 皮肤预设

支持 11 种皮肤预设，带实时预览和平滑过渡动画：

| 预设 | 名称 | 说明 |
|------|------|------|
| `default` | Shadcn · Neutral | 官方默认中性色 |
| `blue` | Shadcn · Blue | 蓝色主色 + Charts 冷色调 |
| `emerald` | Shadcn · Emerald | 清新绿色，适合数据展示 |
| `amber` | Shadcn · Amber | 琥珀/橙色，温暖明快 |
| `violet` | Shadcn · Violet | 紫色高饱和，科技感 |
| `rose` | Shadcn · Rose | 玫红主色，图表撞色 |
| `teal` | Shadcn · Teal | 青色主色，现代感 |
| `slate` | Shadcn · Slate | 低饱和灰蓝，工具感 |
| `ocean` | 旧 · 深海蓝 | 蓝绿渐变 |
| `sunset` | 旧 · 暮光橙 | 橙粉撞色 |
| `aurora` | 旧 · 极光绿 | 青绿 + 紫色 |

## UI 组件

基于 shadcn/ui，已集成 28 个组件：

- **表单**：Button，Input，InputClear，Textarea，Select，Checkbox，Switch，Label
- **数据展示**：Table，Card，Badge，Avatar，Skeleton
- **反馈**：Dialog，Sheet，AlertDialog，Tooltip，Popover
- **导航**：Tabs，DropdownMenu，ContextMenu，Command，ScrollArea
- **布局**：Separator
- **增强**：BackToTop，CookieConsent，CommandInputClear，InputClearForm

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 重定向到仪表盘 | - |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 可配置仪表盘 | `dashboard:view` |
| `/accounts` | 账号与权限 | `settings:view` |
| `/analytics` | 数据分析 | `analytics:view` |
| `/calendar` | 日程管理 | `calendar:view` |
| `/documents` | 文档管理 | `documents:view` |
| `/files` | 文件存储 | `files:view` |
| `/messages` | 消息中心 | `messages:view` |
| `/notifications` | 通知中心 | `notifications:view` |
| `/users` | 用户管理 | `users:view` |
| `/settings` | 系统设置 | `settings:view` |
| `/settings/teams` | 团队设置 | `settings:view` |
| `/settings/teams/roles` | 角色管理 | `settings:view` |
| `/profile` | 个人资料 | `settings:view` |
| `/docs` | 帮助文档 | `documents:view` |
| `/privacy` | 隐私政策 | 公开 |
| `/terms` | 服务条款 | 公开 |

## PWA 支持

项目已完整集成 PWA 功能：

### 配置

```js
// next.config.mjs
import withPWA from "next-pwa"

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    // 字体缓存 (1年)
    { urlPattern: /\.(?:woff|woff2|ttf)$/i, handler: "CacheFirst", ... },
    // 图片缓存 (24小时)
    { urlPattern: /\.(?:jpg|png|svg|webp)$/i, handler: "StaleWhileRevalidate", ... },
    // Next.js 静态资源 (1年)
    { urlPattern: /\/_next\/static\/.+\.(js|css)$/i, handler: "CacheFirst", ... },
    // 页面数据 (1小时)
    { urlPattern: /\/_next\/data\/.+\.json$/i, handler: "NetworkFirst", ... },
  ],
})
```

### 功能特性

- **离线访问**：Service Worker 缓存静态资源
- **安装到桌面**：支持 Add to Home Screen
- **自托管字体**：Inter + JetBrains Mono
- **图标支持**：8 种尺寸 (72x72 ~ 512x512)
- **截图展示**：桌面端 + 移动端

### manifest.json

```json
{
  "name": "Admin Pro 后台管理系统",
  "short_name": "Admin Pro",
  "display": "standalone",
  "orientation": "portrait-primary",
  "categories": ["business", "productivity"],
  "lang": "zh-CN"
}
```

## 安全特性

### 中间件安全头

```ts
// middleware.ts
response.headers.set("Content-Security-Policy", csp)
response.headers.set("X-Content-Type-Options", "nosniff")
response.headers.set("X-Frame-Options", "DENY")
response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
response.headers.set("X-XSS-Protection", "1; mode=block")
response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
```

### 认证保护

- Cookie 安全属性 (`secure`，`sameSite: strict`)
- 已登录用户不能访问登录页
- 未登录用户重定向到登录页 (带 redirect 参数)

## 构建优化

```js
// next.config.mjs
{
  // 包导入优化 - 减少打包体积
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-*",
      "lucide-react",
      "framer-motion",
      "@tanstack/react-query",
      "recharts",
      "zustand",
    ],
  },

  // 生产环境移除 console
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },

  // 关闭 source map
  productionBrowserSourceMaps: false,

  // 图片优化
  images: {
    formats: ["image/avif", "image/webp"],
  },
}
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

### Cloudflare Pages

项目支持部署到 Cloudflare Pages，详见 [Cloudflare 版本](https://github.com/halolight/halolight-cloudflare)。

```bash
pnpm cf:build
pnpm cf:deploy
```

### 静态导出

```bash
# next.config.mjs
export default { output: 'export' }

pnpm build
# 输出到 out/ 目录
```
