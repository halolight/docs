# Preact 版本

HaloLight Preact 版本基于 Preact + Vite 构建，采用 Signals + TypeScript，实现轻量高性能的管理后台。

**在线预览**：[https://halolight-preact.h7ml.cn/](https://halolight-preact.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-preact](https://github.com/halolight/halolight-preact)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Preact | 10.x | 轻量 React 替代方案 |
| @preact/signals | 2.x | 响应式状态管理 |
| TypeScript | 5.9 | 类型安全 |
| Tailwind CSS | 3.4 | 原子化 CSS |
| Vite | 7.2 | 构建工具 |
| preact-router | 4.x | 客户端路由 |
| Vitest | 4.0 | 单元测试 |
| Testing Library | 3.x | 组件测试 |
| ESLint | 9.x | 代码检查 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **极致轻量**：核心库仅 3KB gzip
- **React 兼容**：可直接使用大部分 React 生态
- **Signals**：高性能响应式状态管理
- **快速启动**：Vite 提供极速开发体验
- **简单直接**：无复杂概念，易于上手

## 目录结构

```
halolight-preact/
├── src/
│   ├── pages/                     # 页面组件
│   │   ├── Home.tsx              # 首页
│   │   ├── auth/                 # 认证页面
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── ResetPassword.tsx
│   │   └── dashboard/            # 仪表盘页面
│   │       ├── Dashboard.tsx
│   │       ├── Users.tsx
│   │       ├── UserDetail.tsx
│   │       ├── UserCreate.tsx
│   │       ├── Roles.tsx
│   │       ├── Permissions.tsx
│   │       ├── Settings.tsx
│   │       └── Profile.tsx
│   ├── components/               # 组件库
│   │   ├── ui/                   # UI 组件
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   └── ...
│   │   ├── layout/               # 布局组件
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── dashboard/            # 仪表盘组件
│   │   │   ├── DashboardGrid.tsx
│   │   │   ├── WidgetWrapper.tsx
│   │   │   └── StatsWidget.tsx
│   │   └── shared/               # 共享组件
│   │       └── PermissionGuard.tsx
│   ├── stores/                   # 状态管理
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   └── dashboard.ts
│   ├── hooks/                    # 自定义 Hooks
│   │   ├── useAuth.ts
│   │   └── usePermission.ts
│   ├── lib/                      # 工具库
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── cn.ts
│   ├── types/                    # 类型定义
│   ├── App.tsx                   # 根组件
│   ├── routes.tsx                # 路由配置
│   └── main.tsx                  # 入口文件
├── public/                       # 静态资源
├── vite.config.ts               # Vite 配置
├── tailwind.config.ts           # Tailwind 配置
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-preact.git
cd halolight-preact
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# .env 示例
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
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

### 状态管理 (@preact/signals)

```tsx
// stores/auth.ts
import { signal, computed, effect } from '@preact/signals'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

// 响应式状态
export const user = signal<User | null>(null)
export const token = signal<string | null>(null)
export const loading = signal(false)

// 计算属性
export const isAuthenticated = computed(() => !!token.value && !!user.value)
export const permissions = computed(() => user.value?.permissions ?? [])

// 持久化
effect(() => {
  if (user.value && token.value) {
    localStorage.setItem('auth', JSON.stringify({
      user: user.value,
      token: token.value,
    }))
  }
})

// 初始化
const saved = localStorage.getItem('auth')
if (saved) {
  const { user: savedUser, token: savedToken } = JSON.parse(saved)
  user.value = savedUser
  token.value = savedToken
}

// 方法
export async function login(credentials: { email: string; password: string }) {
  loading.value = true
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    user.value = data.user
    token.value = data.token
  } finally {
    loading.value = false
  }
}

export function logout() {
  user.value = null
  token.value = null
  localStorage.removeItem('auth')
}

export function hasPermission(permission: string): boolean {
  const perms = permissions.value
  return perms.some(p =>
    p === '*' || p === permission ||
    (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
  )
}
```

### 路由配置

```tsx
// routes.tsx
import Router, { Route } from 'preact-router'
import { isAuthenticated, hasPermission } from './stores/auth'

// 页面组件
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Users from './pages/dashboard/Users'
// ... 更多页面

// 路由守卫 HOC
function ProtectedRoute({ component: Component, permission, ...rest }) {
  if (!isAuthenticated.value) {
    route('/login?redirect=' + rest.path)
    return null
  }

  if (permission && !hasPermission(permission)) {
    return <div>无权限访问</div>
  }

  return <Component {...rest} />
}

export function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute
        path="/dashboard"
        component={Dashboard}
        permission="dashboard:view"
      />
      <ProtectedRoute
        path="/users"
        component={Users}
        permission="users:list"
      />
      {/* 更多路由 */}
    </Router>
  )
}
```

### 数据获取 (TanStack Query)

```tsx
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { token } from '../stores/auth'

export function useUsers(page = 1) {
  return useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await fetch(`/api/users?page=${page}`, {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return response.json()
    },
    enabled: !!token.value,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

```tsx
// 使用
import { useUsers } from '../hooks/useUsers'

export function UsersPage() {
  const { data, isLoading, error } = useUsers(1)

  if (isLoading) return <div>加载中...</div>
  if (error) return <div>加载失败</div>

  return (
    <ul>
      {data.data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### 权限组件

```tsx
// components/shared/PermissionGuard.tsx
import { ComponentChildren } from 'preact'
import { hasPermission } from '../../stores/auth'

interface Props {
  permission: string
  children: ComponentChildren
  fallback?: ComponentChildren
}

export function PermissionGuard({ permission, children, fallback }: Props) {
  if (!hasPermission(permission)) {
    return fallback ?? null
  }

  return children
}
```

```tsx
// 使用
<PermissionGuard
  permission="users:delete"
  fallback={<span class="text-muted-foreground">无权限</span>}
>
  <Button variant="destructive">删除</Button>
</PermissionGuard>
```

### 表单处理

```tsx
// pages/auth/Login.tsx
import { useState } from 'preact/hooks'
import { route } from 'preact-router'
import { login, loading } from '../../stores/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')

    try {
      await login({ email, password })
      const params = new URLSearchParams(location.search)
      route(params.get('redirect') || '/dashboard')
    } catch (e) {
      setError('邮箱或密码错误')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div class="text-destructive">{error}</div>}

      <input
        type="email"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="邮箱"
      />

      <input
        type="password"
        value={password}
        onInput={(e) => setPassword(e.currentTarget.value)}
        placeholder="密码"
      />

      <button type="submit" disabled={loading.value}>
        {loading.value ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
```

### 组件示例

```tsx
// components/ui/Button.tsx
import { ComponentChildren } from 'preact'
import { cn } from '../../lib/cn'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
  children: ComponentChildren
  onClick?: () => void
}

export function Button({
  variant = 'default',
  size = 'md',
  disabled,
  class: className,
  children,
  onClick,
}: Props) {
  return (
    <button
      class={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90':
            variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90':
            variant === 'destructive',
          'border border-input bg-background hover:bg-accent':
            variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 | 公开 |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户列表 | `users:list` |
| `/users/create` | 创建用户 | `users:create` |
| `/users/:id` | 用户详情 | `users:view` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

## 配置

### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
})
```

## 部署

### 静态托管

```bash
pnpm build
# 将 dist 目录部署到任意静态托管服务
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
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

### Vercel

```bash
npx vercel
```

### Cloudflare Pages

直接连接 GitHub 仓库，自动部署。

## 测试

### 测试命令

```bash
# 交互式测试（watch 模式）
pnpm test

# CI 测试（单次运行 + 覆盖率）
pnpm test:ci

# 可视化测试界面
pnpm test:ui
```

### 测试文件组织

测试文件与源文件放在一起，使用 `.test.ts` 或 `.test.tsx` 后缀：

```
src/components/ui/
├── Button.tsx
├── Button.test.tsx     # Button 组件测试
├── Input.tsx
└── Input.test.tsx      # Input 组件测试
```

### 编写测试

```tsx
// src/components/ui/Button.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { Button } from './Button'

describe('Button', () => {
  it('渲染默认按钮', () => {
    render(<Button>点击</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('点击')
  })

  it('渲染不同变体', () => {
    render(<Button variant="destructive">删除</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

## CI/CD

项目使用 GitHub Actions 进行持续集成：

- **Lint**：ESLint 代码检查
- **Type Check**：TypeScript 类型检查
- **Test**：Vitest 单元测试 + 覆盖率报告
- **Build**：生产构建验证

## 与其他版本对比

| 功能 | Preact 版本 | Vue 版本 | Next.js 版本 |
|------|------------|----------|--------------|
| 状态管理 | Signals | Pinia | Zustand |
| 数据获取 | 自定义 Fetch | TanStack Query | TanStack Query |
| 表单验证 | 自定义 | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | 无（SPA） | 独立后端 | API Routes |
| 组件库 | 自定义 | shadcn-vue | shadcn/ui |
| 路由 | preact-router | Vue Router | App Router |
| 测试框架 | Vitest + Testing Library | Vitest + Testing Library | Jest + Testing Library |
| Bundle 大小 | ~3KB 核心 | ~33KB | ~85KB |
| React 兼容 | ✅ | ❌ | - |
| CI/CD | GitHub Actions | GitHub Actions | GitHub Actions |
