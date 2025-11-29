# Solid.js 版本

HaloLight Solid.js 版本基于 SolidStart 1.0 构建，采用 Solid.js 细粒度响应式 + TypeScript，实现高性能管理后台。

**在线预览**：[https://halolight-solidjs.h7ml.cn/](https://halolight-solidjs.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-solidjs](https://github.com/halolight/halolight-solidjs)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| SolidStart | 1.x | Solid 全栈框架 |
| Solid.js | 1.9+ | 细粒度响应式框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| Kobalte | 0.13+ | 无障碍 UI 原语 |
| solid-primitives | latest | 响应式工具库 |
| Zod | 3.x | 数据验证 |
| @solid-primitives/storage | latest | 持久化存储 |
| solid-charts | latest | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **细粒度响应式**：无虚拟 DOM，精确追踪依赖更新
- **编译时优化**：JSX 编译为高效 DOM 操作
- **Signals**：简洁的响应式原语
- **服务端渲染**：SolidStart 内置 SSR 支持
- **文件路由**：基于文件系统的路由
- **RPC**：服务端函数无缝调用

## 目录结构

```
halolight-solidjs/
├── src/
│   ├── routes/                    # 文件路由
│   │   ├── index.tsx            # 首页
│   │   ├── (auth)/              # 认证路由组
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   └── reset-password.tsx
│   │   ├── (dashboard)/         # 仪表盘路由组
│   │   │   ├── dashboard.tsx
│   │   │   ├── users/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── create.tsx
│   │   │   │   └── [id].tsx
│   │   │   ├── roles.tsx
│   │   │   ├── permissions.tsx
│   │   │   ├── settings.tsx
│   │   │   └── profile.tsx
│   │   └── api/                 # API 路由
│   │       └── auth/
│   │           └── login.ts
│   ├── components/              # 组件库
│   │   ├── ui/                  # Kobalte 组件
│   │   ├── layout/              # 布局组件
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── dashboard/           # 仪表盘组件
│   │   │   ├── DashboardGrid.tsx
│   │   │   ├── WidgetWrapper.tsx
│   │   │   └── StatsWidget.tsx
│   │   └── shared/              # 共享组件
│   │       └── PermissionGuard.tsx
│   ├── stores/                  # 状态管理
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   └── dashboard.ts
│   ├── lib/                     # 工具库
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── cn.ts
│   ├── server/                  # 服务端代码
│   │   ├── auth.ts
│   │   └── middleware.ts
│   └── types/                   # 类型定义
├── public/                      # 静态资源
├── app.config.ts               # SolidStart 配置
├── tailwind.config.ts          # Tailwind 配置
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-solidjs.git
cd halolight-solidjs
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
VITE_DEMO_EMAIL=admin@example.com
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
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

### 状态管理 (Signals + Store)

```tsx
// stores/auth.ts
import { createSignal, createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { makePersisted } from '@solid-primitives/storage'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
}

const [state, setState] = makePersisted(
  createStore<AuthState>({
    user: null,
    token: null,
  }),
  { name: 'auth' }
)

const [loading, setLoading] = createSignal(false)

export const authStore = {
  get user() { return state.user },
  get token() { return state.token },
  get loading() { return loading() },

  isAuthenticated: createMemo(() => !!state.token && !!state.user),
  permissions: createMemo(() => state.user?.permissions ?? []),

  async login(credentials: { email: string; password: string }) {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      setState({
        user: data.user,
        token: data.token,
      })
    } finally {
      setLoading(false)
    }
  },

  logout() {
    setState({ user: null, token: null })
  },

  hasPermission(permission: string): boolean {
    const perms = state.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  },
}
```

### 路由中间件

```tsx
// src/middleware.ts
import { createMiddleware } from '@solidjs/start/middleware'

export default createMiddleware({
  onRequest: [
    async (event) => {
      const url = new URL(event.request.url)

      // 保护 dashboard 路由
      if (url.pathname.startsWith('/dashboard')) {
        const token = event.request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1]

        if (!token) {
          return new Response(null, {
            status: 302,
            headers: { Location: `/login?redirect=${url.pathname}` },
          })
        }
      }
    },
  ],
})
```

### 服务端函数 (RPC)

```tsx
// server/auth.ts
'use server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function login(credentials: z.infer<typeof loginSchema>) {
  const validated = loginSchema.parse(credentials)

  // 验证逻辑...

  return {
    success: true,
    user: { id: 1, name: '管理员', email: validated.email },
    token: 'mock_token',
  }
}

export async function getCurrentUser(token: string) {
  // 验证 token 并返回用户
  return {
    id: 1,
    name: '管理员',
    permissions: ['*'],
  }
}
```

### 权限组件

```tsx
// components/shared/PermissionGuard.tsx
import { Show, type ParentComponent, type JSX } from 'solid-js'
import { authStore } from '~/stores/auth'

interface Props {
  permission: string
  fallback?: JSX.Element
}

export const PermissionGuard: ParentComponent<Props> = (props) => {
  const hasPermission = () => authStore.hasPermission(props.permission)

  return (
    <Show when={hasPermission()} fallback={props.fallback}>
      {props.children}
    </Show>
  )
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

### 数据获取

```tsx
// routes/(dashboard)/users/index.tsx
import { createAsync, cache } from '@solidjs/router'

const getUsers = cache(async (params: { page: number }) => {
  'use server'
  const users = await db.users.findMany({
    skip: (params.page - 1) * 10,
    take: 10,
  })
  return users
}, 'users')

export const route = {
  load: ({ location }) => {
    const page = Number(location.query.page) || 1
    void getUsers({ page })
  },
}

export default function UsersPage() {
  const users = createAsync(() => getUsers({ page: 1 }))

  return (
    <div>
      <h1>用户列表</h1>
      <Show when={users()}>
        {(data) => (
          <For each={data()}>
            {(user) => <UserCard user={user} />}
          </For>
        )}
      </Show>
    </div>
  )
}
```

### 表单处理

```tsx
// routes/(auth)/login.tsx
import { createSignal } from 'solid-js'
import { useNavigate, useSearchParams } from '@solidjs/router'
import { authStore } from '~/stores/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')

    try {
      await authStore.login({
        email: email(),
        password: password(),
      })
      navigate(searchParams.redirect || '/dashboard')
    } catch (e) {
      setError('邮箱或密码错误')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Show when={error()}>
        <div class="text-destructive">{error()}</div>
      </Show>

      <input
        type="email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="邮箱"
      />

      <input
        type="password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        placeholder="密码"
      />

      <button type="submit" disabled={authStore.loading}>
        {authStore.loading ? '登录中...' : '登录'}
      </button>
    </form>
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
| `/users/[id]` | 用户详情 | `users:view` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

## 配置

### SolidStart 配置

```ts
// app.config.ts
import { defineConfig } from '@solidjs/start/config'

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  vite: {
    plugins: [],
  },
})
```

## 部署

### Node.js 服务器

```bash
pnpm build
node .output/server/index.mjs
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### Vercel

```ts
// app.config.ts
export default defineConfig({
  server: {
    preset: 'vercel',
  },
})
```

### Cloudflare Pages

```ts
// app.config.ts
export default defineConfig({
  server: {
    preset: 'cloudflare-pages',
  },
})
```

## 测试

```bash
# 运行测试
pnpm test

# E2E 测试
pnpm test:e2e
```

## 与其他版本对比

| 功能 | Solid.js 版本 | Vue 版本 | Next.js 版本 |
|------|--------------|----------|--------------|
| 状态管理 | Signals + Store | Pinia | Zustand |
| 数据获取 | createAsync | TanStack Query | TanStack Query |
| 表单验证 | 自定义 + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | SolidStart 内置 | 独立后端 | API Routes |
| 组件库 | Kobalte | shadcn-vue | shadcn/ui |
| 路由 | 文件路由 | Vue Router | App Router |
| 响应式 | 细粒度 Signals | Proxy-based | Hooks |
| Bundle 大小 | ~7KB | ~33KB | ~85KB |
