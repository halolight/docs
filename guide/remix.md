# Remix 版本

HaloLight Remix 版本基于 Remix 3 构建，采用 React Router 7 + TypeScript，Web 标准优先的全栈开发体验。

**在线预览**：[https://halolight-remix.h7ml.cn/](https://halolight-remix.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-remix](https://github.com/halolight/halolight-remix)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Remix | 3.x | React 全栈框架 |
| React | 19.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn/ui | latest | UI 组件库 |
| Conform | 1.x | 表单处理 |
| Zod | 3.x | 数据验证 |
| TanStack Query | 5.x | 客户端缓存 |
| Recharts | 2.x | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **Web 标准**：基于 Web Fetch API、FormData、Response
- **嵌套路由**：强大的嵌套布局和数据加载
- **渐进增强**：无 JS 也能工作的表单
- **Loader/Action**：优雅的服务端数据模式
- **乐观更新**：内置的乐观 UI 支持
- **错误边界**：细粒度的错误处理

## 目录结构

```
halolight-remix/
├── app/
│   ├── routes/                    # 文件路由
│   │   ├── _index.tsx            # 首页
│   │   ├── _auth.tsx             # 认证布局
│   │   ├── _auth.login.tsx       # 登录
│   │   ├── _auth.register.tsx    # 注册
│   │   ├── _auth.forgot-password.tsx
│   │   ├── _auth.reset-password.tsx
│   │   ├── _dashboard.tsx        # 仪表盘布局
│   │   ├── _dashboard._index.tsx # 仪表盘首页
│   │   ├── _dashboard.users.tsx  # 用户列表
│   │   ├── _dashboard.users.$id.tsx
│   │   ├── _dashboard.users.create.tsx
│   │   ├── _dashboard.roles.tsx
│   │   ├── _dashboard.permissions.tsx
│   │   ├── _dashboard.settings.tsx
│   │   └── _dashboard.profile.tsx
│   ├── components/               # 组件库
│   │   ├── ui/                   # shadcn/ui 组件
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
│   ├── lib/                      # 工具库
│   │   ├── auth.server.ts        # 服务端认证
│   │   ├── session.server.ts     # Session 管理
│   │   ├── permission.ts         # 权限工具
│   │   └── cn.ts
│   ├── hooks/                    # React Hooks
│   │   ├── useAuth.ts
│   │   └── usePermission.ts
│   ├── types/                    # 类型定义
│   ├── root.tsx                  # 根组件
│   └── entry.server.tsx          # 服务端入口
├── public/                       # 静态资源
├── vite.config.ts               # Vite 配置
├── tailwind.config.ts           # Tailwind 配置
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-remix.git
cd halolight-remix
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# .env 示例
API_URL=/api
USE_MOCK=true
SESSION_SECRET=your-secret-key
DEMO_EMAIL=admin@example.com
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=true
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产

```bash
pnpm build
pnpm start
```

## 核心功能

### Session 管理

```ts
// lib/session.server.ts
import { createCookieSessionStorage, redirect } from '@remix-run/node'

interface SessionData {
  userId: number
  token: string
}

interface SessionFlashData {
  error: string
}

export const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
  },
})

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

export async function requireUser(request: Request) {
  const session = await getSession(request)
  const userId = session.get('userId')

  if (!userId) {
    const url = new URL(request.url)
    throw redirect(`/login?redirect=${url.pathname}`)
  }

  return { userId, token: session.get('token') }
}

export async function createUserSession(
  userId: number,
  token: string,
  redirectTo: string
) {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)
  session.set('token', token)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}

export async function destroySession(request: Request) {
  const session = await getSession(request)

  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}
```

### 认证 Loader

```tsx
// routes/_dashboard.tsx
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { requireUser } from '~/lib/session.server'
import { getUser } from '~/lib/auth.server'
import { AdminLayout } from '~/components/layout/AdminLayout'

export async function loader({ request }: LoaderFunctionArgs) {
  const { userId, token } = await requireUser(request)
  const user = await getUser(userId, token)

  return json({ user })
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <AdminLayout user={user}>
      <Outlet />
    </AdminLayout>
  )
}
```

### 数据加载 (Loader)

```tsx
// routes/_dashboard.users.tsx
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { requireUser, requirePermission } from '~/lib/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const { token } = await requireUser(request)
  await requirePermission(request, 'users:list')

  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || 1

  const response = await fetch(`${process.env.API_URL}/users?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Response('获取用户列表失败', { status: response.status })
  }

  const users = await response.json()
  return json({ users })
}

export default function UsersPage() {
  const { users } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div>
      <h1>用户列表</h1>

      <ul>
        {users.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <Pagination
        current={users.page}
        total={users.total}
        onChange={(page) => setSearchParams({ page: String(page) })}
      />
    </div>
  )
}
```

### 表单处理 (Action)

```tsx
// routes/_auth.login.tsx
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { parseWithZod } from '@conform-to/zod'
import { useForm } from '@conform-to/react'
import { z } from 'zod'
import { createUserSession } from '~/lib/session.server'

const loginSchema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(6, '密码至少6位'),
  redirectTo: z.string().optional(),
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: loginSchema })

  if (submission.status !== 'success') {
    return json(submission.reply(), { status: 400 })
  }

  const { email, password, redirectTo } = submission.value

  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      return json(
        submission.reply({ formErrors: ['邮箱或密码错误'] }),
        { status: 401 }
      )
    }

    const { user, token } = await response.json()
    return createUserSession(user.id, token, redirectTo || '/dashboard')
  } catch (e) {
    return json(
      submission.reply({ formErrors: ['服务器错误'] }),
      { status: 500 }
    )
  }
}

export default function LoginPage() {
  const lastResult = useActionData<typeof action>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema })
    },
  })

  return (
    <Form method="post" {...form.props}>
      {form.errors && (
        <div className="text-destructive">{form.errors}</div>
      )}

      <div>
        <input
          type="email"
          name={fields.email.name}
          placeholder="邮箱"
        />
        {fields.email.errors && (
          <span className="text-destructive">{fields.email.errors}</span>
        )}
      </div>

      <div>
        <input
          type="password"
          name={fields.password.name}
          placeholder="密码"
        />
        {fields.password.errors && (
          <span className="text-destructive">{fields.password.errors}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </Form>
  )
}
```

### 权限组件

```tsx
// components/shared/PermissionGuard.tsx
import { type ReactNode } from 'react'
import { useRouteLoaderData } from '@remix-run/react'

interface Props {
  permission: string
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGuard({ permission, children, fallback }: Props) {
  const data = useRouteLoaderData<{ user: User }>('routes/_dashboard')

  const hasPermission = (perm: string) => {
    const perms = data?.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === perm ||
      (p.endsWith(':*') && perm.startsWith(p.slice(0, -1)))
    )
  }

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
  fallback={<span className="text-muted-foreground">无权限</span>}
>
  <Button variant="destructive">删除</Button>
</PermissionGuard>
```

### 乐观更新

```tsx
// routes/_dashboard.users.$id.tsx
import { useFetcher } from '@remix-run/react'

export function UserCard({ user }) {
  const fetcher = useFetcher()

  // 乐观更新：使用提交的数据而非服务器响应
  const displayName = fetcher.formData
    ? fetcher.formData.get('name')
    : user.name

  return (
    <fetcher.Form method="post">
      <input type="text" name="name" defaultValue={user.name} />
      <button type="submit">保存</button>
      <p>当前名称: {displayName}</p>
    </fetcher.Form>
  )
}
```

### 错误边界

```tsx
// routes/_dashboard.users.tsx
import { isRouteErrorResponse, useRouteError } from '@remix-run/react'

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 403) {
      return <div>无权限访问此页面</div>
    }
    if (error.status === 404) {
      return <div>页面不存在</div>
    }
    return <div>{error.statusText}</div>
  }

  return <div>发生错误，请稍后重试</div>
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
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
})
```

## 部署

### Node.js 服务器

```bash
pnpm build
pnpm start
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
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel

```bash
npx vercel
```

### Cloudflare Pages

```bash
# 使用 Cloudflare 适配器
pnpm add -D @remix-run/cloudflare
```

## 测试

```bash
# 运行测试
pnpm test

# E2E 测试
pnpm test:e2e
```

## 与其他版本对比

| 功能 | Remix 版本 | Vue 版本 | Next.js 版本 |
|------|-----------|----------|--------------|
| 状态管理 | Loader/Action | Pinia | Zustand |
| 数据获取 | Loader | TanStack Query | TanStack Query |
| 表单验证 | Conform + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | 内置 | 独立后端 | API Routes |
| 组件库 | shadcn/ui | shadcn-vue | shadcn/ui |
| 路由 | 文件路由 | Vue Router | App Router |
| 表单处理 | 渐进增强 | 客户端 | 客户端 |
