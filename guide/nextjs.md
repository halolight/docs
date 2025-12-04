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
| Zustand | 5.x | 状态管理 |
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
│   │   │   ├── page.tsx         # 仪表盘首页
│   │   │   ├── accounts/        # 账户管理
│   │   │   ├── analytics/       # 数据分析
│   │   │   ├── calendar/        # 日历
│   │   │   ├── docs/            # 文档
│   │   │   ├── documents/       # 文档管理
│   │   │   ├── files/           # 文件管理
│   │   │   ├── messages/        # 消息中心
│   │   │   ├── notifications/   # 通知中心
│   │   │   ├── profile/         # 个人中心
│   │   │   ├── users/           # 用户管理
│   │   │   ├── settings/        # 系统设置
│   │   │   │   └── teams/       # 团队管理
│   │   │   │       └── roles/   # 角色管理
│   │   │   └── layout.tsx       # 仪表盘布局
│   │   ├── (legal)/             # 法律条款路由组
│   │   │   ├── privacy/         # 隐私政策
│   │   │   ├── terms/           # 服务条款
│   │   │   └── layout.tsx       # 法律页面布局
│   │   ├── layout.tsx           # 根布局
│   │   ├── error.tsx            # 错误页面
│   │   └── not-found.tsx        # 404 页面
│   ├── components/
│   │   ├── ui/                  # shadcn/ui 组件 (28 个)
│   │   ├── layout/              # 布局组件
│   │   │   ├── admin-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/           # 仪表盘组件
│   │   │   ├── configurable-dashboard.tsx
│   │   │   ├── widget-*.tsx     # 9 种小部件
│   │   │   └── ...
│   │   └── shared/              # 共享组件
│   ├── hooks/                   # React Hooks (15 个)
│   │   ├── use-users.ts         # 用户管理
│   │   ├── use-teams.ts         # 团队管理
│   │   ├── use-messages.ts      # 消息管理
│   │   ├── use-notifications.ts # 通知管理
│   │   ├── use-calendar.ts      # 日历数据
│   │   ├── use-documents.ts     # 文档管理
│   │   ├── use-files.ts         # 文件管理
│   │   ├── use-dashboard.ts     # 仪表盘状态
│   │   ├── use-dashboard-data.ts # 仪表盘数据
│   │   ├── use-chart-palette.ts # 图表配色
│   │   ├── use-action-mutation.ts # Server Action
│   │   ├── use-keep-alive.tsx   # 页面保活
│   │   ├── use-tdk.ts           # TDK 管理
│   │   ├── use-title.ts         # 页面标题
│   │   └── index.ts             # 导出文件
│   ├── stores/                  # Zustand Stores (6 个)
│   │   ├── auth-store.ts        # 认证状态
│   │   ├── ui-settings-store.ts # UI 设置
│   │   ├── dashboard-store.ts   # 仪表盘状态
│   │   ├── navigation-store.ts  # 导航状态
│   │   ├── tabs-store.ts        # 标签页状态
│   │   └── error-store.ts       # 错误状态
│   ├── actions/                 # Server Actions
│   ├── services/                # API 服务
│   ├── providers/               # React Providers (8 个)
│   │   ├── app-providers.tsx    # 应用 Provider 聚合
│   │   ├── auth-provider.tsx    # 认证 Provider
│   │   ├── theme-provider.tsx   # 主题 Provider
│   │   ├── query-provider.tsx   # TanStack Query Provider
│   │   ├── error-provider.tsx   # 错误 Provider
│   │   ├── permission-provider.tsx # 权限 Provider
│   │   ├── websocket-provider.tsx # WebSocket Provider
│   │   └── keep-alive-provider.tsx # 页面保活 Provider
│   ├── lib/                     # 工具库
│   ├── config/                  # 配置文件
│   │   ├── routes.ts            # 路由配置
│   │   └── tdk.ts               # TDK 配置
│   ├── types/                   # 类型定义
│   ├── mock/                    # Mock 数据
│   │   ├── index.ts             # Mock 入口
│   │   ├── user.ts              # 用户数据
│   │   ├── dashboard.ts         # 仪表盘数据
│   │   ├── message.ts           # 消息数据
│   │   ├── notification.ts      # 通知数据
│   │   ├── calendar.ts          # 日历数据
│   │   ├── document.ts          # 文档数据
│   │   ├── file.ts              # 文件数据
│   │   └── team.ts              # 团队数据
│   └── middleware.ts            # 中间件
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

项目包含 6 个 Store，采用 `zustand/persist` 实现持久化：

```tsx
// stores/auth-store.ts - 认证状态管理
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  accounts: Account[] // 多账户支持
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (data: ResetPasswordData) => Promise<void>
  switchAccount: (accountId: string) => void // 切换账户
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      accounts: [],

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

      switchAccount: (accountId) => {
        const { accounts } = get()
        const account = accounts.find(a => a.id === accountId)
        if (account) {
          set({ user: account.user, token: account.token })
        }
      },

      hasPermission: (permission) => {
        const permissions = get().user?.permissions || []
        return permissions.some(p =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    { name: 'auth-storage' }
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

支持 9 种小部件类型，可自由拖拽、调整大小：

```tsx
// stores/dashboard-store.ts
export type WidgetType =
  | "stats"         // 数据统计
  | "chart-line"    // 折线图
  | "chart-bar"     // 柱状图
  | "chart-pie"     // 饼图
  | "recent-users"  // 最近用户
  | "notifications" // 通知列表
  | "tasks"         // 待办任务
  | "calendar"      // 今日日程
  | "quick-actions" // 快捷操作

// components/dashboard/configurable-dashboard.tsx
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function ConfigurableDashboard() {
  const { widgets, layouts, isEditing, setLayouts } = useDashboardStore()

  return (
    <ResponsiveGridLayout
      layouts={{ lg: layouts }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
      cols={{ lg: 12, md: 8, sm: 4, xs: 2 }}
      rowHeight={80}
      isDraggable={isEditing}
      isResizable={isEditing}
      onLayoutChange={(layout) => setLayouts(layout)}
    >
      {widgets.map(widget => (
        <div key={widget.id}>
          <WidgetRenderer widget={widget} />
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
| `/accounts` | 账户管理 | `accounts:list` |
| `/analytics` | 数据分析 | `analytics:view` |
| `/calendar` | 日历 | `calendar:view` |
| `/docs` | 文档 | `docs:view` |
| `/documents` | 文档管理 | `documents:list` |
| `/files` | 文件管理 | `files:list` |
| `/messages` | 消息中心 | `messages:list` |
| `/notifications` | 通知中心 | `notifications:list` |
| `/users` | 用户管理 | `users:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/settings/teams` | 团队管理 | `teams:list` |
| `/settings/teams/roles` | 角色管理 | `roles:list` |
| `/profile` | 个人中心 | 登录即可 |
| `/privacy` | 隐私政策 | 公开 |
| `/terms` | 服务条款 | 公开 |

## UI 组件

基于 shadcn/ui，已集成 28 个组件：

- **表单**：Button, Input, InputClear, Textarea, Select, Checkbox, Switch, Label
- **数据展示**：Table, Card, Badge, Avatar, Skeleton
- **反馈**：Dialog, Sheet, AlertDialog, Tooltip, Popover
- **导航**：Tabs, DropdownMenu, ContextMenu, Command, ScrollArea
- **布局**：Separator
- **增强**：BackToTop, CookieConsent, CommandInputClear, InputClearForm

## 皮肤预设

支持 11 种皮肤预设，通过 `useUiSettingsStore` 切换：

| 预设 | 说明 |
|------|------|
| `default` | 默认主题 |
| `blue` | 蓝色主题 |
| `emerald` | 翡翠绿主题 |
| `amber` | 琥珀色主题 |
| `violet` | 紫罗兰主题 |
| `rose` | 玫瑰红主题 |
| `teal` | 青色主题 |
| `slate` | 石板灰主题 |
| `ocean` | 海洋蓝主题 |
| `sunset` | 日落橙主题 |
| `aurora` | 极光主题 |

```tsx
// 切换皮肤
const { skin, setSkin } = useUiSettingsStore()
setSkin('rose') // 切换到玫瑰红主题

// 切换主题模式
const { theme, setTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'
```

## UI 设置

```tsx
// stores/ui-settings-store.ts
interface UiSettingsState {
  skin: SkinPreset        // 皮肤预设
  showFooter: boolean     // 显示底部栏
  showTabBar: boolean     // 显示标签栏
  mobileHeaderFixed: boolean   // 移动端固定头部
  mobileTabBarFixed: boolean   // 移动端固定标签栏
  // ...
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
# next.config.js
module.exports = {
  output: 'export'
}

pnpm build
# 输出到 out/ 目录
```

## PWA 支持

项目已集成 `next-pwa`，支持离线访问和安装到桌面：

```js
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // Next.js 配置
})
```
