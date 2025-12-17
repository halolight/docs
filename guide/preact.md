# Preact 版本

HaloLight Preact 版本基于 Preact + Vite 构建，采用 Signals + TypeScript，实现轻量高性能的管理后台。

**在线预览**：[https://halolight-preact.h7ml.cn](https://halolight-preact.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-preact](https://github.com/halolight/halolight-preact)

## 特性

- 🪶 **极致轻量** - 核心库仅 3KB gzip
- ⚡ **高性能 Signals** - 响应式状态管理，自动依赖追踪
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- ⚛️ **React 兼容** - 可直接使用大部分 React 生态
- 🚀 **快速启动** - Vite 提供极速开发体验

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Preact | 10.x | 轻量 React 替代方案 |
| @preact/signals | 2.x | 响应式状态管理 |
| TypeScript | 5.9 | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn/ui | latest | UI 组件库（兼容层） |
| Vite | 7.2 | 构建工具 |
| preact-router | 4.x | 客户端路由 |
| TanStack Query | 5.x | 服务端状态 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **Signals 状态管理** - 高性能响应式，自动依赖追踪，细粒度更新
- **权限系统** - RBAC 权限控制，路由守卫，权限组件
- **主题系统** - 11 种皮肤，明暗模式，View Transitions
- **数据模拟** - Mock.js + Fetch 拦截，完整后端模拟
- **React 兼容** - 通过 preact/compat 使用 React 生态库

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
│   │   │   └── Dialog.tsx
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
│   ├── mock/                     # Mock 数据
│   │   ├── index.ts
│   │   └── handlers/
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

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

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
# .env
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=false
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

**Signals 特性**：

- **细粒度更新** - 只更新依赖该 Signal 的组件
- **自动依赖追踪** - 无需手动声明依赖
- **无需记忆化** - 计算属性自动缓存
- **跨组件通信** - 全局状态自动同步

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

### 权限控制

```tsx
// hooks/usePermission.ts
import { hasPermission } from '../stores/auth'

export function usePermission() {
  return {
    hasPermission,
    can: (permission: string) => hasPermission(permission),
  }
}
```

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
    </Router>
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
| Amber | 琥珀 | `--primary: 78.3% 0.177 74.21` |
| Rose | 玫瑰 | `--primary: 62.8% 0.243 12.48` |
| Slate | 石板 | `--primary: 51.4% 0.032 257.42` |
| Zinc | 锌灰 | `--primary: 50.7% 0.017 285.96` |
| Stone | 石灰 | `--primary: 53.4% 0.015 69.82` |
| Neutral | 中性 | `--primary: 50.9% 0.016 286.13` |
| Red | 红色 | `--primary: 55.5% 0.238 25.33` |
| Orange | 橙色 | `--primary: 72.3% 0.187 56.24` |

### CSS 变量 (OKLch)

```css
/* 亮色模式 */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  --secondary: 96.5% 0.006 286.32;
  --secondary-foreground: 21.7% 0.026 285.88;
  --accent: 96.5% 0.006 286.32;
  --accent-foreground: 21.7% 0.026 285.88;
}

/* 暗色模式 */
.dark {
  --background: 15.5% 0.018 285.88;
  --foreground: 98.3% 0.006 286.32;
  --primary: 74.1% 0.196 275.74;
  --primary-foreground: 21.7% 0.043 286.07;
  --secondary: 20.7% 0.021 286.05;
  --secondary-foreground: 98.3% 0.006 286.32;
}
```

### 主题切换

```tsx
// stores/ui-settings.ts
import { signal, effect } from '@preact/signals'

export const theme = signal<'light' | 'dark'>('light')
export const skin = signal<string>('default')

// 持久化
effect(() => {
  localStorage.setItem('theme', theme.value)
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
})

effect(() => {
  localStorage.setItem('skin', skin.value)
  document.documentElement.dataset.skin = skin.value
})

// 初始化
theme.value = (localStorage.getItem('theme') as any) || 'light'
skin.value = localStorage.getItem('skin') || 'default'

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

export function setSkin(newSkin: string) {
  skin.value = newSkin
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

## 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-preact)

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

```bash
docker build -t halolight-preact .
docker run -p 80:80 halolight-preact
```

### 其他平台

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

## 测试

### 测试命令

```bash
pnpm test           # 运行测试（watch 模式）
pnpm test:run       # 单次运行
pnpm test:coverage  # 覆盖率报告
pnpm test:ui        # Vitest UI 界面
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

### 测试示例

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

  it('禁用状态', () => {
    render(<Button disabled>禁用</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## 配置

### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // React 兼容
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/hooks'],
          router: ['preact-router'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
})
```

### Tailwind 配置

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

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
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
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
        required
      />

      <input
        type="password"
        value={password}
        onInput={(e) => setPassword(e.currentTarget.value)}
        placeholder="密码"
        required
      />

      <button type="submit" disabled={loading.value}>
        {loading.value ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
```

## 性能优化

### 懒加载组件

```tsx
// App.tsx
import { lazy, Suspense } from 'preact/compat'

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Users = lazy(() => import('./pages/dashboard/Users'))

export function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Router>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={Users} />
      </Router>
    </Suspense>
  )
}
```

### 代码分割

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/hooks'],
          router: ['preact-router'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
})
```

### Signals 优化

```tsx
// 使用 computed 避免重复计算
import { signal, computed } from '@preact/signals'

const items = signal([1, 2, 3, 4, 5])
const filter = signal('all')

// 计算属性自动缓存
const filteredItems = computed(() => {
  if (filter.value === 'all') return items.value
  return items.value.filter(item => item > 2)
})

// 组件中使用
function ItemList() {
  return (
    <ul>
      {filteredItems.value.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
```

## 常见问题

### Q：如何使用 React 生态库？

A：Preact 通过 `preact/compat` 提供 React 兼容层，大部分 React 库可直接使用：

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
})
```

### Q：Signals 如何与 React Hook 结合？

A：Signals 可以直接在组件中使用，无需 useState：

```tsx
import { signal } from '@preact/signals'

const count = signal(0)

function Counter() {
  // 直接使用 signal.value
  return (
    <button onClick={() => count.value++}>
      Count: {count.value}
    </button>
  )
}
```

### Q：如何优化首屏加载？

A：使用代码分割和懒加载：

```tsx
import { lazy, Suspense } from 'preact/compat'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## 与其他版本对比

| 特性 | Preact | Next.js | Vue |
|------|--------|---------|-----|
| SSR/SSG | ❌ (SPA) | ✅ | ✅ (Nuxt) |
| 状态管理 | Signals | Zustand | Pinia |
| 路由 | preact-router | App Router | Vue Router |
| 构建工具 | Vite | Next.js | Vite |
| Bundle 大小 | ~3KB | ~85KB | ~33KB |
| React 兼容 | ✅ | - | ❌ |
| 学习曲线 | 低 | 中 | 中 |

## 相关链接

- [在线预览](https://halolight-preact.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-preact)
- [Preact 官方文档](https://preactjs.com)
- [Signals 文档](https://preactjs.com/guide/v10/signals)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
