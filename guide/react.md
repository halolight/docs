# React 版本

HaloLight React 版本基于 React 19 + Vite 6 构建，是一个纯客户端渲染 (CSR) 的单页应用 (SPA)。

**在线预览**：[https://halolight-react.h7ml.cn/](https://halolight-react.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-react](https://github.com/halolight/halolight-react)

## 特性

- 🏗️ **React 19** - 最新的 React 特性和性能优化
- ⚡ **Vite 6** - 极速冷启动与 HMR
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 📑 **多标签页** - 浏览器式标签管理
- ⌘ **命令面板** - 快捷键导航 (⌘K)

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

## 核心特性

- **可配置仪表盘** - 9 种小部件，拖拽布局，响应式适配
- **多标签导航** - 浏览器式标签，右键菜单，状态缓存
- **权限系统** - RBAC 权限控制，路由守卫，权限组件
- **主题系统** - 11 种皮肤，明暗模式，View Transitions
- **多账户切换** - 快速切换账户，记住登录状态
- **命令面板** - 键盘快捷键 (⌘K)，全局搜索
- **实时通知** - WebSocket 推送，通知中心

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

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

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
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
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

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

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

### 权限控制

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

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过快捷设置面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿 | `--primary: 64.6% 0.178 142.49` |
| Orange | 橙色 | `--primary: 65.7% 0.198 45.13` |
| Rose | 玫红 | `--primary: 58.9% 0.238 11.26` |
| Cyan | 青色 | `--primary: 75.6% 0.146 191.68` |
| Yellow | 黄色 | `--primary: 85.1% 0.184 98.08` |
| Violet | 紫罗兰 | `--primary: 55.3% 0.264 293.49` |
| Slate | 石板灰 | `--primary: 47.9% 0.017 256.71` |
| Zinc | 锌灰 | `--primary: 48.3% 0 0` |
| Neutral | 中性灰 | `--primary: 48.5% 0 0` |

### CSS 变量 (OKLch)

```css
/* 示例变量定义 */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  --secondary: 96.1% 0.004 286.41;
  --secondary-foreground: 14.9% 0.017 285.75;
  --muted: 96.1% 0.004 286.41;
  --muted-foreground: 45.8% 0.009 285.77;
  --accent: 96.1% 0.004 286.41;
  --accent-foreground: 14.9% 0.017 285.75;
  --destructive: 59.3% 0.246 27.33;
  --destructive-foreground: 100% 0 0;
  --border: 89.8% 0.006 286.32;
  --input: 89.8% 0.006 286.32;
  --ring: 51.1% 0.262 276.97;
  --radius: 0.5rem;
}

.dark {
  --background: 0% 0 0;
  --foreground: 98.3% 0 0;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  /* ... */
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

## 环境变量

### 配置示例

```bash
cp .env.example .env.development
```

```env
# .env.development 示例
VITE_API_URL=/api
VITE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
```

### 变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| VITE_API_URL | API 基础路径 | /api |
| VITE_MOCK | 是否启用 Mock 数据 | true |
| VITE_APP_TITLE | 应用标题 | Admin Pro |
| VITE_BRAND_NAME | 品牌名称 | Halolight |
| VITE_DEMO_EMAIL | 演示账号邮箱 | admin@halolight.h7ml.cn |
| VITE_DEMO_PASSWORD | 演示账号密码 | 123456 |
| VITE_SHOW_DEMO_HINT | 是否显示演示提示 | true |

### 使用方式

```tsx
// 在代码中访问环境变量
const apiUrl = import.meta.env.VITE_API_URL
const isMock = import.meta.env.VITE_MOCK === 'true'
```

## 常用命令

```bash
pnpm dev            # 启动开发服务器
pnpm build          # 生产构建
pnpm preview        # 预览生产构建
pnpm lint           # 代码检查
pnpm lint:fix       # 自动修复
pnpm type-check     # 类型检查
pnpm test           # 运行测试
pnpm test:coverage  # 测试覆盖率
```

## 测试

```bash
pnpm test           # 运行测试（watch 模式）
pnpm test:run       # 单次运行
pnpm test:coverage  # 覆盖率报告
pnpm test:ui        # Vitest UI 界面
```

### 测试示例

```tsx
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## 配置

### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'chart-vendor': ['recharts'],
        },
      },
    },
  },
})
```

## 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-react)

```bash
vercel
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

```bash
docker build -t halolight-react .
docker run -p 3000:80 halolight-react
```

### 其他平台

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## CI/CD

项目配置了完整的 GitHub Actions CI 工作流：

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm audit --audit-level=high
```

## 高级功能

### PWA 支持

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
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### React Router 配置

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

## 性能优化

### 图片优化

```tsx
// 使用 lazy 加载图片
import { useState } from 'react'

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {!loaded && <div className="skeleton" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'opacity-100' : 'opacity-0'}
      />
    </div>
  )
}
```

### 懒加载组件

```tsx
// 路由级别代码分割
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Users = lazy(() => import('@/pages/users'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Suspense>
  )
}
```

### 预加载

```tsx
// 鼠标悬停时预加载组件
import { lazy } from 'react'

const UserDetails = lazy(() => import('@/pages/user-details'))

function UserList() {
  const preloadUserDetails = () => {
    // 触发预加载
    import('@/pages/user-details')
  }

  return (
    <Link
      to="/users/1"
      onMouseEnter={preloadUserDetails}
    >
      查看详情
    </Link>
  )
}
```

### Memo 优化

```tsx
import { memo } from 'react'

// 防止不必要的重渲染
const ExpensiveComponent = memo(({ data }: { data: any }) => {
  return <div>{/* 复杂渲染逻辑 */}</div>
})
```

## 常见问题

### Q：如何添加新的路由？

A：在 `src/routes/index.tsx` 中添加路由配置：

```tsx
{
  path: '/new-page',
  element: <NewPage />,
}
```

### Q：如何自定义主题颜色？

A：修改 CSS 变量或使用主题切换功能：

```css
:root {
  --primary: 51.1% 0.262 276.97; /* 修改主色调 */
}
```

### Q：如何集成真实 API？

A：将 `VITE_MOCK` 设置为 `false`，并配置 `VITE_API_URL`：

```env
VITE_MOCK=false
VITE_API_URL=https://api.example.com
```

### Q：如何添加新的权限？

A：在用户的 `permissions` 数组中添加权限字符串，并使用 `usePermission` Hook：

```tsx
const canEdit = usePermission('users:edit')
```

## 与其他版本对比

| 特性 | React 版本 | Next.js | Vue |
|------|-----------|---------|-----|
| SSR/SSG | ❌ | ✅ | ✅ (Nuxt) |
| 状态管理 | Zustand | Zustand | Pinia |
| 路由 | React Router | App Router | Vue Router |
| 构建工具 | Vite | Next.js | Vite |

## 相关链接

- [在线预览](https://halolight-react.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-react)
- [React 官方文档](https://react.dev)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
