# Qwik 版本

HaloLight Qwik 版本基于 Qwik City 构建，采用 Qwik 可恢复性架构 + TypeScript，实现零水合的极致性能。

**在线预览**：[https://halolight-qwik.h7ml.cn/](https://halolight-qwik.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-qwik](https://github.com/halolight/halolight-qwik)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Qwik | 2.x | 可恢复性框架 |
| Qwik City | 2.x | 全栈框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| Qwik UI | latest | UI 组件库 |
| Modular Forms | latest | 表单处理 |
| Zod | 3.x | 数据验证 |
| ECharts | 5.x | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **可恢复性**：无需水合，服务端状态直接恢复
- **懒加载一切**：代码按需加载，首屏 JS 极小
- **Signals**：细粒度响应式
- **服务端渲染**：内置 SSR 支持
- **文件路由**：基于目录的路由系统
- **边缘部署**：原生支持 Cloudflare Workers 等边缘平台

## 目录结构

```
halolight-qwik/
├── src/
│   ├── routes/                    # 文件路由
│   │   ├── index.tsx            # 首页
│   │   ├── layout.tsx           # 根布局
│   │   ├── (auth)/              # 认证路由组
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── index.tsx
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (dashboard)/         # 仪表盘路由组
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── index.tsx
│   │   │   ├── users/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── create/
│   │   │   │   └── [id]/
│   │   │   ├── roles/
│   │   │   ├── permissions/
│   │   │   ├── settings/
│   │   │   └── profile/
│   │   └── api/                 # API 端点
│   │       └── auth/
│   │           └── login/
│   │               └── index.ts
│   ├── components/              # 组件库
│   │   ├── ui/                  # Qwik UI 组件
│   │   ├── layout/              # 布局组件
│   │   │   ├── admin-layout/
│   │   │   ├── auth-layout/
│   │   │   ├── sidebar/
│   │   │   └── header/
│   │   ├── dashboard/           # 仪表盘组件
│   │   │   ├── dashboard-grid/
│   │   │   ├── widget-wrapper/
│   │   │   └── stats-widget/
│   │   └── shared/              # 共享组件
│   │       └── permission-guard/
│   ├── stores/                  # 状态管理
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   └── dashboard.ts
│   ├── lib/                     # 工具库
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── cn.ts
│   └── types/                   # 类型定义
├── public/                      # 静态资源
├── vite.config.ts              # Vite 配置
├── tailwind.config.ts          # Tailwind 配置
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-qwik.git
cd halolight-qwik
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
pnpm serve
```

## 核心功能

### 状态管理 (Context + Signals)

```tsx
// stores/auth.ts
import {
  createContextId,
  useContext,
  useStore,
  useComputed$,
  $,
  type Signal,
} from '@builder.io/qwik'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export const AuthContext = createContextId<AuthState>('auth')

export function useAuth() {
  const state = useContext(AuthContext)

  const isAuthenticated = useComputed$(() => !!state.token && !!state.user)
  const permissions = useComputed$(() => state.user?.permissions ?? [])

  const login = $(async (credentials: { email: string; password: string }) => {
    state.loading = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      state.user = data.user
      state.token = data.token
    } finally {
      state.loading = false
    }
  })

  const logout = $(() => {
    state.user = null
    state.token = null
  })

  const hasPermission = $((permission: string) => {
    const perms = state.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  })

  return {
    state,
    isAuthenticated,
    permissions,
    login,
    logout,
    hasPermission,
  }
}
```

### 根布局 (提供 Context)

```tsx
// routes/layout.tsx
import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik'
import { AuthContext } from '~/stores/auth'

export default component$(() => {
  const authState = useStore({
    user: null,
    token: null,
    loading: false,
  })

  useContextProvider(AuthContext, authState)

  return <Slot />
})
```

### 路由守卫

```tsx
// routes/(dashboard)/layout.tsx
import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$, useNavigate } from '@builder.io/qwik-city'
import { useAuth } from '~/stores/auth'
import { AdminLayout } from '~/components/layout/admin-layout'

export const useAuthGuard = routeLoader$(async ({ cookie, redirect, url }) => {
  const token = cookie.get('token')?.value

  if (!token) {
    throw redirect(302, `/login?redirect=${url.pathname}`)
  }

  // 验证 token 并返回用户信息
  return {
    user: await validateToken(token),
  }
})

export default component$(() => {
  const data = useAuthGuard()

  return (
    <AdminLayout user={data.value.user}>
      <Slot />
    </AdminLayout>
  )
})
```

### 数据加载 (routeLoader$)

```tsx
// routes/(dashboard)/users/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'

export const useUsers = routeLoader$(async ({ query, cookie, status }) => {
  const token = cookie.get('token')?.value
  const page = Number(query.get('page')) || 1

  // 权限检查
  const user = await validateToken(token)
  if (!hasPermission(user, 'users:list')) {
    status(403)
    return { error: '无权限访问' }
  }

  const response = await fetch(`/api/users?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.json()
})

export default component$(() => {
  const users = useUsers()

  return (
    <div>
      <h1>用户列表</h1>

      {users.value.error ? (
        <div class="text-destructive">{users.value.error}</div>
      ) : (
        <ul>
          {users.value.data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
})
```

### 服务端 Action (routeAction$)

```tsx
// routes/(auth)/login/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeAction$, zod$, z, Form } from '@builder.io/qwik-city'

export const useLogin = routeAction$(
  async (data, { cookie, redirect, fail }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        return fail(401, { message: '邮箱或密码错误' })
      }

      const result = await response.json()

      cookie.set('token', result.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })

      throw redirect(302, '/dashboard')
    } catch (e) {
      return fail(500, { message: '服务器错误' })
    }
  },
  zod$({
    email: z.string().email('请输入有效邮箱'),
    password: z.string().min(6, '密码至少6位'),
  })
)

export default component$(() => {
  const action = useLogin()

  return (
    <Form action={action}>
      {action.value?.failed && (
        <div class="text-destructive">{action.value.message}</div>
      )}

      <input type="email" name="email" placeholder="邮箱" />
      {action.value?.fieldErrors?.email && (
        <span class="text-destructive">{action.value.fieldErrors.email}</span>
      )}

      <input type="password" name="password" placeholder="密码" />
      {action.value?.fieldErrors?.password && (
        <span class="text-destructive">{action.value.fieldErrors.password}</span>
      )}

      <button type="submit" disabled={action.isRunning}>
        {action.isRunning ? '登录中...' : '登录'}
      </button>
    </Form>
  )
})
```

### 权限组件

```tsx
// components/shared/permission-guard/index.tsx
import { component$, Slot, useComputed$ } from '@builder.io/qwik'
import { useAuth } from '~/stores/auth'

interface Props {
  permission: string
}

export const PermissionGuard = component$<Props>(({ permission }) => {
  const { hasPermission } = useAuth()

  const allowed = useComputed$(async () => {
    return await hasPermission(permission)
  })

  return (
    <>
      {allowed.value ? (
        <Slot />
      ) : (
        <Slot name="fallback" />
      )}
    </>
  )
})
```

```tsx
// 使用
<PermissionGuard permission="users:delete">
  <Button variant="destructive" q:slot="">删除</Button>
  <span q:slot="fallback" class="text-muted-foreground">无权限</span>
</PermissionGuard>
```

### API 端点

```ts
// routes/api/auth/login/index.ts
import type { RequestHandler } from '@builder.io/qwik-city'

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const body = await parseBody()
  const { email, password } = body as { email: string; password: string }

  // 验证逻辑
  if (!email || !password) {
    json(400, { success: false, message: '邮箱和密码不能为空' })
    return
  }

  // 认证逻辑...

  json(200, {
    success: true,
    user: { id: 1, name: '管理员', email },
    token: 'mock_token',
  })
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

### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
  }
})
```

## 部署

### Node.js 服务器

```bash
pnpm build
node server/entry.express.js
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
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json .
RUN npm install --production
EXPOSE 3000
CMD ["node", "server/entry.express.js"]
```

### Cloudflare Pages

```bash
# 使用 Cloudflare Pages 适配器
pnpm add -D @builder.io/qwik-city/adapters/cloudflare-pages
```

### Vercel

```bash
# 使用 Vercel Edge 适配器
pnpm add -D @builder.io/qwik-city/adapters/vercel-edge
```

## 测试

```bash
# 运行测试
pnpm test

# E2E 测试
pnpm test.e2e
```

## 与其他版本对比

| 功能 | Qwik 版本 | Vue 版本 | Next.js 版本 |
|------|----------|----------|--------------|
| 状态管理 | Context + Signals | Pinia | Zustand |
| 数据获取 | routeLoader$ | TanStack Query | TanStack Query |
| 表单验证 | Modular Forms + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | 内置 | 独立后端 | API Routes |
| 组件库 | Qwik UI | shadcn-vue | shadcn/ui |
| 路由 | 文件路由 | Vue Router | App Router |
| 水合 | 可恢复（零水合） | 传统水合 | 传统水合 |
| 首屏 JS | ~1KB | ~33KB | ~85KB |
