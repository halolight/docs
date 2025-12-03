# React 版本

HaloLight React 版本基于 React 19 + Vite 6 构建，是一个纯客户端渲染 (CSR) 的单页应用 (SPA)。

**在线预览**：[https://halolight-react.h7ml.cn/](https://halolight-react.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-react](https://github.com/halolight/halolight-react)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.x | UI 框架 |
| Vite | 6.x | 构建工具 |
| TypeScript | 5.x | 类型安全 |
| React Router | 6.x | 客户端路由 |
| Zustand | 5.x | 状态管理 |
| TanStack Query | 5.x | 服务端状态 |
| React Hook Form | 7.x | 表单处理 |
| Zod | 4.x | 数据验证 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn/ui | latest | UI 组件库 |
| react-grid-layout | 1.5.x | 拖拽布局 |
| Recharts | 3.x | 图表可视化 |
| Framer Motion | 12.x | 动画效果 |
| Mock.js | 1.x | 数据模拟 |

## 目录结构

```
halolight-react/
├── src/
│   ├── pages/                     # 页面组件
│   │   ├── auth/                  # 认证页面
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── dashboard/             # 仪表盘
│   │   └── legal/                 # 法律条款
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 组件 (20+)
│   │   ├── layout/                # 布局组件
│   │   │   ├── admin-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/             # 仪表盘组件
│   │   │   ├── configurable-dashboard.tsx
│   │   │   ├── widget-wrapper.tsx
│   │   │   ├── stats-widget.tsx
│   │   │   ├── chart-widget.tsx
│   │   │   └── ...
│   │   └── shared/                # 共享组件
│   ├── hooks/                     # 自定义 Hooks
│   │   ├── use-users.ts
│   │   ├── use-auth.ts
│   │   ├── use-theme.ts
│   │   └── ...
│   ├── stores/                    # Zustand Stores
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   ├── dashboard-layout.ts
│   │   └── tabs.ts
│   ├── lib/
│   │   ├── api/                   # API 服务
│   │   ├── auth/                  # 认证逻辑
│   │   ├── validations/           # Zod schemas
│   │   └── utils.ts               # 工具函数
│   ├── routes/                    # 路由配置
│   │   └── index.tsx
│   ├── config/                    # 配置文件
│   │   ├── routes.ts
│   │   └── tdk.ts
│   ├── types/                     # 类型定义
│   ├── mock/                      # Mock 数据
│   ├── providers/                 # Context Providers
│   ├── App.tsx
│   └── main.tsx
├── public/                        # 静态资源
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-react.git
cd halolight-react
pnpm install
```

### 环境变量

```bash
cp .env.example .env.development
```

```env
# .env.development 示例
VITE_API_URL=/api
VITE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
VITE_DEMO_EMAIL=admin@example.com
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产

```bash
pnpm build
pnpm preview
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
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        const response = await authApi.login(credentials)
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      hasPermission: (permission) => {
        const { user } = get()
        if (!user) return false
        return user.permissions.some(p =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)
```

### 数据获取 (TanStack Query)

```tsx
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/lib/api'

export function useUsers(params?: UserQueryParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => usersApi.getList(params),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// 在组件中使用
function UsersPage() {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{/* 渲染用户列表 */}</div>
}
```

### 路由配置 (React Router)

```tsx
// routes/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { AuthLayout } from '@/layouts/auth-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <HomePage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'settings', element: <SettingsPage /> },
      // 更多路由...
    ],
  },
])
```

### 权限 Hook

```tsx
// hooks/use-permission.ts
import { useAuthStore } from '@/stores/auth'

export function usePermission(permission: string): boolean {
  const hasPermission = useAuthStore((state) => state.hasPermission)
  return hasPermission(permission)
}

export function usePermissions(permissions: string[]): boolean {
  const hasPermission = useAuthStore((state) => state.hasPermission)
  return permissions.every(p => hasPermission(p))
}
```

```tsx
// 使用
function DeleteButton() {
  const canDelete = usePermission('users:delete')

  if (!canDelete) return null

  return <Button variant="destructive">删除</Button>
}
```

### 权限组件

```tsx
// components/permission-guard.tsx
import { usePermission } from '@/hooks/use-permission'

interface PermissionGuardProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const hasPermission = usePermission(permission)

  if (!hasPermission) return fallback

  return <>{children}</>
}
```

```tsx
<!-- 使用 -->
<PermissionGuard permission="users:delete" fallback={<span>无权限</span>}>
  <DeleteButton />
</PermissionGuard>
```

### 可拖拽仪表盘

```tsx
// components/dashboard/configurable-dashboard.tsx
import GridLayout from 'react-grid-layout'
import { useDashboardStore } from '@/stores/dashboard-layout'

export function ConfigurableDashboard() {
  const { layout, setLayout, isEditing } = useDashboardStore()

  return (
    <GridLayout
      layout={layout}
      onLayoutChange={setLayout}
      cols={12}
      rowHeight={80}
      isDraggable={isEditing}
      isResizable={isEditing}
      margin={[16, 16]}
    >
      {layout.map((item) => (
        <div key={item.i}>
          <WidgetWrapper widget={getWidget(item.i)} />
        </div>
      ))}
    </GridLayout>
  )
}
```

### 主题切换

```tsx
// hooks/use-theme.ts
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')

  const actualTheme = theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(actualTheme)
  }, [actualTheme])

  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark')
  }

  return { theme, actualTheme, setTheme, toggleTheme }
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
| `/users/:id` | 用户详情 | `users:view` |
| `/users/:id/edit` | 编辑用户 | `users:update` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

### 路由守卫

```tsx
// components/auth-guard.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

interface AuthGuardProps {
  children: React.ReactNode
  permission?: string
}

export function AuthGuard({ children, permission }: AuthGuardProps) {
  const location = useLocation()
  const { isAuthenticated, hasPermission } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
```

## UI 组件

基于 shadcn/ui，已集成 20+ 组件：

- **表单**：Button、Input、Textarea、Select、Checkbox、RadioGroup、Switch、Slider、DatePicker
- **数据展示**：Table、Card、Badge、Avatar、Progress、Skeleton
- **反馈**：Dialog、Sheet、AlertDialog、Toast、Tooltip、Popover
- **导航**：Tabs、Breadcrumb、Pagination、DropdownMenu、Command
- **布局**：Accordion、Collapsible、ScrollArea、Separator

## Recharts 图表集成

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  // ...
]

function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

## PWA 支持

项目内置 PWA 支持，包括：

- Service Worker 注册
- 离线缓存
- 应用清单 (manifest.json)
- 多尺寸图标

```json
// public/manifest.json
{
  "name": "Admin Pro",
  "short_name": "Admin",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 部署

### Vercel

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

### Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/halolight-react/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
    }
}
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 与 Next.js 版本对比

| 功能 | React 版本 | Next.js 版本 |
|------|-----------|--------------|
| 渲染模式 | CSR (客户端渲染) | SSR/SSG/ISR |
| 状态管理 | Zustand | Zustand |
| 数据获取 | TanStack Query | TanStack Query |
| 表单验证 | React Hook Form + Zod | React Hook Form + Zod |
| 拖拽布局 | react-grid-layout | react-grid-layout |
| 组件库 | shadcn/ui | shadcn/ui |
| 路由 | React Router | Next.js App Router |
| 图表 | Recharts | Recharts |
| SSR | 无 | 内置支持 |
| SEO | react-helmet-async | 内置支持 |
| 部署 | 静态托管 / CDN | Vercel / 任意平台 |

### 何时选择 React 版本？

- 纯前端应用，后端 API 独立部署
- 不需要 SSR/SEO 优化
- 已有后端服务，只需要前端管理界面
- 希望使用更轻量的技术栈
- 部署到纯静态托管服务

### 何时选择 Next.js 版本？

- 需要 SEO 优化
- 需要 SSR/SSG 提升首屏性能
- 希望前后端一体化
- 需要 API Routes / Server Actions
- 部署到 Vercel 等全栈平台
