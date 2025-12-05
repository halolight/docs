# Fresh (Deno) 版本

HaloLight Fresh 版本基于 Fresh 2 + Deno 构建，采用 Islands 架构 + Preact，实现零配置、极速启动的管理后台。

**在线预览**：[https://halolight-fresh.h7ml.cn/](https://halolight-fresh.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-fresh](https://github.com/halolight/halolight-fresh)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Fresh | 2.x | Deno 全栈框架 |
| Deno | 2.x | 现代 JavaScript 运行时 |
| Preact | 10.x | 轻量 UI 库 |
| @preact/signals | 2.x | 响应式状态 |
| TypeScript | 内置 | 类型安全 |
| Tailwind CSS | 内置 | 原子化 CSS |
| Zod | 3.x | 数据验证 |
| Chart.js | 4.x | 图表可视化 |

## 核心特性

- **零配置**：开箱即用，无需复杂配置
- **Islands 架构**：默认零 JS，按需水合
- **边缘优先**：原生支持 Deno Deploy 边缘部署
- **内置 TypeScript**：无需配置，直接使用
- **JIT 渲染**：无构建步骤，即时渲染
- **安全默认**：Deno 沙盒安全模型

## 目录结构

```
halolight-fresh/
├���─ routes/                        # 文件路由
│   ├── _app.tsx                  # 根布局
│   ├── _layout.tsx               # 默认布局
│   ├── _middleware.ts            # 全局中间件
│   ├── index.tsx                 # 首页
│   ├── auth/                     # 认证页面
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot-password.tsx
│   │   └── reset-password.tsx
│   ├── dashboard/                # 仪表盘页面
│   │   ├── _layout.tsx           # 仪表盘布局
│   │   ├── _middleware.ts        # 认证中间件
│   │   ├── index.tsx
│   │   ├── users/
│   │   │   ├── index.tsx
│   │   │   ├── create.tsx
│   │   │   └── [id].tsx
│   │   ├── roles.tsx
│   │   ├── permissions.tsx
│   │   ├── settings.tsx
│   │   └── profile.tsx
│   └── api/                      # API 路由
│       └── auth/
│           ├── login.ts
│           ├── register.ts
│           └── me.ts
├── islands/                      # 交互式 Islands
│   ├── LoginForm.tsx
│   ├── UserTable.tsx
│   ├── DashboardGrid.tsx
│   ├── ThemeToggle.tsx
│   └── Sidebar.tsx
├── components/                   # 静态组件
│   ├── ui/                       # UI 组件
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/                   # 布局组件
│   │   ├── AdminLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── Header.tsx
│   └── shared/                   # 共享组件
│       └── PermissionGuard.tsx
├── lib/                          # 工具库
│   ├── auth.ts
│   ├── permission.ts
│   ├── session.ts
│   └── cn.ts
├── signals/                      # 状态管理
│   ├── auth.ts
│   ├── ui-settings.ts
│   └── dashboard.ts
├── static/                       # 静态资源
├── fresh.config.ts              # Fresh 配置
├── deno.json                    # Deno 配置
└── tailwind.config.ts           # Tailwind 配置
```

## 快速开始

### 安装 Deno

```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex
```

### 克隆项目

```bash
git clone https://github.com/halolight/halolight-fresh.git
cd halolight-fresh
```

### 环境变量

```bash
cp .env.example .env
```

```env
# .env 示例
API_URL=/api
USE_MOCK=true
DEMO_EMAIL=admin@halolight.h7ml.cn
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=true
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
SESSION_SECRET=your-secret-key
```

### 启动开发

```bash
deno task dev
```

访问 http://localhost:8000

### 构建生产

```bash
deno task build
deno task start
```

## 核心功能

### 状态管理 (@preact/signals)

```ts
// signals/auth.ts
import { signal, computed, effect } from '@preact/signals'
import { IS_BROWSER } from '$fresh/runtime.ts'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

export const user = signal<User | null>(null)
export const token = signal<string | null>(null)
export const loading = signal(false)

export const isAuthenticated = computed(() => !!token.value && !!user.value)
export const permissions = computed(() => user.value?.permissions ?? [])

// 仅在浏览器端持久化
if (IS_BROWSER) {
  const saved = localStorage.getItem('auth')
  if (saved) {
    const { user: savedUser, token: savedToken } = JSON.parse(saved)
    user.value = savedUser
    token.value = savedToken
  }

  effect(() => {
    if (user.value && token.value) {
      localStorage.setItem('auth', JSON.stringify({
        user: user.value,
        token: token.value,
      }))
    }
  })
}

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
  if (IS_BROWSER) {
    localStorage.removeItem('auth')
  }
}

export function hasPermission(permission: string): boolean {
  const perms = permissions.value
  return perms.some((p) =>
    p === '*' || p === permission ||
    (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
  )
}
```

### 认证中间件

```ts
// routes/dashboard/_middleware.ts
import { FreshContext } from '$fresh/server.ts'
import { getCookies } from '$std/http/cookie.ts'
import { verifyToken, getUser } from '../../lib/auth.ts'

export async function handler(req: Request, ctx: FreshContext) {
  const cookies = getCookies(req.headers)
  const token = cookies.token

  if (!token) {
    const url = new URL(req.url)
    return new Response(null, {
      status: 302,
      headers: { Location: `/auth/login?redirect=${url.pathname}` },
    })
  }

  try {
    const payload = await verifyToken(token)
    const user = await getUser(payload.userId)
    ctx.state.user = user
    ctx.state.token = token
  } catch {
    return new Response(null, {
      status: 302,
      headers: { Location: '/auth/login' },
    })
  }

  return ctx.next()
}
```

### Islands (交互式组件)

```tsx
// islands/LoginForm.tsx
import { useSignal } from '@preact/signals'
import { login, loading } from '../signals/auth.ts'
import { Button } from '../components/ui/Button.tsx'
import { Input } from '../components/ui/Input.tsx'

interface Props {
  redirectTo?: string
}

export default function LoginForm({ redirectTo = '/dashboard' }: Props) {
  const email = useSignal('')
  const password = useSignal('')
  const error = useSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    error.value = ''

    try {
      await login({
        email: email.value,
        password: password.value,
      })
      globalThis.location.href = redirectTo
    } catch (e) {
      error.value = '邮箱或密码错误'
    }
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      {error.value && (
        <div class="text-destructive text-sm">{error.value}</div>
      )}

      <Input
        type="email"
        label="邮箱"
        value={email.value}
        onInput={(e) => email.value = e.currentTarget.value}
        required
      />

      <Input
        type="password"
        label="密码"
        value={password.value}
        onInput={(e) => password.value = e.currentTarget.value}
        required
      />

      <Button type="submit" class="w-full" disabled={loading.value}>
        {loading.value ? '登录中...' : '登录'}
      </Button>
    </form>
  )
}
```

### 页面路由

```tsx
// routes/auth/login.tsx
import { Handlers, PageProps } from '$fresh/server.ts'
import { AuthLayout } from '../../components/layout/AuthLayout.tsx'
import LoginForm from '../../islands/LoginForm.tsx'

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const redirect = url.searchParams.get('redirect') || '/dashboard'
    return ctx.render({ redirect })
  },
}

export default function LoginPage({ data }: PageProps<{ redirect: string }>) {
  return (
    <AuthLayout>
      <div class="max-w-md mx-auto">
        <h1 class="text-2xl font-bold text-center mb-8">登录</h1>
        <LoginForm redirectTo={data.redirect} />
      </div>
    </AuthLayout>
  )
}
```

### API 路由

```ts
// routes/api/auth/login.ts
import { Handlers } from '$fresh/server.ts'
import { z } from 'zod'
import { setCookie } from '$std/http/cookie.ts'
import { createToken } from '../../../lib/auth.ts'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json()
      const { email, password } = loginSchema.parse(body)

      // 验证用户（示例）
      const user = await authenticateUser(email, password)
      if (!user) {
        return new Response(
          JSON.stringify({ error: '邮箱或密码错误' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        )
      }

      const token = await createToken({ userId: user.id })

      const response = new Response(
        JSON.stringify({ user, token }),
        { headers: { 'Content-Type': 'application/json' } }
      )

      setCookie(response.headers, {
        name: 'token',
        value: token,
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 60 * 60 * 24 * 7,
      })

      return response
    } catch (e) {
      if (e instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ error: '参数验证失败', details: e.errors }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
      return new Response(
        JSON.stringify({ error: '服务器错误' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  },
}
```

### 权限组件

```tsx
// components/shared/PermissionGuard.tsx
import { ComponentChildren } from 'preact'

interface Props {
  permission: string
  userPermissions: string[]
  children: ComponentChildren
  fallback?: ComponentChildren
}

function checkPermission(
  userPermissions: string[],
  permission: string
): boolean {
  return userPermissions.some((p) =>
    p === '*' || p === permission ||
    (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
  )
}

export function PermissionGuard({
  permission,
  userPermissions,
  children,
  fallback,
}: Props) {
  if (!checkPermission(userPermissions, permission)) {
    return fallback ?? null
  }

  return <>{children}</>
}
```

```tsx
// 使用（在服务端渲染）
<PermissionGuard
  permission="users:delete"
  userPermissions={ctx.state.user.permissions}
  fallback={<span class="text-muted-foreground">无权限</span>}
>
  <Button variant="destructive">删除</Button>
</PermissionGuard>
```

### 仪表盘布局

```tsx
// routes/dashboard/_layout.tsx
import { PageProps } from '$fresh/server.ts'
import { AdminLayout } from '../../components/layout/AdminLayout.tsx'
import Sidebar from '../../islands/Sidebar.tsx'

export default function DashboardLayout({ Component, state }: PageProps) {
  return (
    <AdminLayout>
      <div class="flex min-h-screen">
        <Sidebar user={state.user} />
        <main class="flex-1 p-6">
          <Component />
        </main>
      </div>
    </AdminLayout>
  )
}
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 | 公开 |
| `/auth/login` | 登录 | 公开 |
| `/auth/register` | 注册 | 公开 |
| `/auth/forgot-password` | 忘记密码 | 公开 |
| `/auth/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/dashboard/users` | 用户列表 | `users:list` |
| `/dashboard/users/create` | 创建用户 | `users:create` |
| `/dashboard/users/[id]` | 用户详情 | `users:view` |
| `/dashboard/roles` | 角色管理 | `roles:list` |
| `/dashboard/permissions` | 权限管理 | `permissions:list` |
| `/dashboard/settings` | 系统设置 | `settings:view` |
| `/dashboard/profile` | 个人中心 | 登录即可 |

## 配置

### Fresh 配置

```ts
// fresh.config.ts
import { defineConfig } from '$fresh/server.ts'
import tailwind from '$fresh/plugins/tailwind.ts'

export default defineConfig({
  plugins: [tailwind()],
})
```

### Deno 配置

```json
// deno.json
{
  "lock": false,
  "tasks": {
    "check": "deno fmt --check && deno lint && deno check **/*.ts && deno check **/*.tsx",
    "dev": "deno run -A --watch=static/,routes/ dev.ts",
    "build": "deno run -A dev.ts build",
    "start": "deno run -A main.ts",
    "update": "deno run -A -r https://fresh.deno.dev/update ."
  },
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@2.0.0/",
    "$std/": "https://deno.land/std@0.224.0/",
    "preact": "https://esm.sh/preact@10.22.0",
    "preact/": "https://esm.sh/preact@10.22.0/",
    "@preact/signals": "https://esm.sh/@preact/signals@1.2.3",
    "zod": "https://deno.land/x/zod@v3.23.0/mod.ts"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

## 部署

### Deno Deploy (推荐)

```bash
# 安装 deployctl
deno install -A --no-check -r -f https://deno.land/x/deploy/deployctl.ts

# 部署
deployctl deploy --project=halolight-fresh main.ts
```

### Docker

```dockerfile
FROM denoland/deno:2.0.0

WORKDIR /app
COPY . .

RUN deno cache main.ts

EXPOSE 8000
CMD ["run", "-A", "main.ts"]
```

### 自托管

```bash
# 构建
deno task build

# 运行
deno task start
```

## 测试

项目使用 Deno 内置测试框架，测试文件位于 `tests/` 目录。

### 测试结构

```
tests/
├── setup.ts              # 测试环境设置
│   ├── localStorage mock
│   ├── sessionStorage mock
│   ├── matchMedia mock
│   └── 辅助函数（createMockUser, mockAuthenticatedState 等）
└── lib/
    ├── utils.test.ts     # 工具函数测试
    ├── config.test.ts    # 配置测试
    └── stores.test.ts    # 状态管理测试
```

### 运行测试

```bash
# 运行所有测试
deno task test

# 监视模式
deno task test:watch

# 测试覆盖率
deno task test:coverage

# 覆盖率报告输出到 coverage/lcov.info
```

### 测试示例

```ts
// tests/lib/config.test.ts
import { assertEquals, assertExists } from "$std/assert/mod.ts";
import "../setup.ts";

import { hasPermission } from "../../lib/config.ts";
import type { Permission } from "../../lib/types.ts";

Deno.test("hasPermission - 权限检查", async (t) => {
  const userPermissions: Permission[] = ["dashboard:view", "users:view"];

  await t.step("应该返回 true 当用户有权限时", () => {
    const result = hasPermission(userPermissions, "dashboard:view");
    assertEquals(result, true);
  });

  await t.step("应该支持通配符权限", () => {
    const adminPermissions: Permission[] = ["*"];
    const result = hasPermission(adminPermissions, "dashboard:view");
    assertEquals(result, true);
  });
});
```

## CI/CD

项目使用 GitHub Actions 进行持续集成，配置文件位于 `.github/workflows/ci.yml`。

### 工作流任务

| 任务 | 说明 | 触发条件 |
|------|------|----------|
| lint | 格式检查、代码检查、类型检查 | push/PR |
| test | 运行测试并上传覆盖率 | push/PR |
| build | 生产构建验证 | lint/test 通过后 |
| security | Deno 安全审计 | push/PR |
| dependency-review | 依赖安全审查 | PR only |

### 本地 CI 命令

```bash
# 运行完整 CI 检查
deno task ci

# 等同于
deno task fmt:check && deno task lint && deno task check && deno task test
```

### 代码质量配置

```json
// deno.json
{
  "lint": {
    "rules": {
      "tags": ["recommended"],
      "exclude": [
        "no-explicit-any",
        "explicit-function-return-type",
        "explicit-module-boundary-types",
        "jsx-button-has-type",
        "no-unused-vars"
      ]
    }
  },
  "fmt": {
    "lineWidth": 100,
    "indentWidth": 2,
    "singleQuote": false,
    "semiColons": true
  }
}
```

## 与其他版本对比

| 功能 | Fresh 版本 | Astro 版本 | Next.js 版本 |
|------|-----------|------------|--------------|
| 运行时 | Deno | Node.js | Node.js |
| 状态管理 | @preact/signals | - | Zustand |
| 数据获取 | Handlers | Load 函��� | TanStack Query |
| 表单验证 | Zod | Zod | React Hook Form + Zod |
| 服务端 | 内置 | @astrojs/node | API Routes |
| 组件库 | 自定义 | - | shadcn/ui |
| Islands 架构 | ✅ | ✅ | ❌ |
| 零配置 | ✅ | ❌ | ❌ |
| 边缘部署 | Deno Deploy | Cloudflare | Vercel Edge |
| 构建步骤 | 可选 | 必须 | 必须 |
