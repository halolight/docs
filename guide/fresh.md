# Fresh (Deno) 版本

HaloLight Fresh 版本基于 Fresh 2 + Deno 构建，采用 Islands 架构 + Preact，实现零配置、极速启动的管理后台。

**在线预览**：[https://halolight-fresh.h7ml.cn](https://halolight-fresh.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-fresh](https://github.com/halolight/halolight-fresh)

## 特性

- 🏗️ **Islands 架构** - 默认零 JS，按需水合，极致性能
- ⚡ **零配置启动** - 开箱即用，无需构建步骤
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 🔒 **安全默认** - Deno 沙盒安全模型
- 🌐 **边缘优先** - 原生支持 Deno Deploy 边缘部署

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Fresh | 2.x | Deno 全栈框架 |
| Deno | 2.x | 现代 JavaScript 运行时 |
| Preact | 10.x | 轻量 UI 库 |
| @preact/signals | 2.x | 响应式状态管理 |
| TypeScript | 内置 | 类型安全 |
| Tailwind CSS | 内置 | 原子化 CSS |
| Zod | 3.x | 数据验证 |
| Chart.js | 4.x | 图表可视化 |

## 核心特性

- **Islands 架构** - 默认零 JS，仅交互组件水合，极致性能
- **零配置开发** - JIT 渲染，无构建步骤，即时启动
- **权限系统** - RBAC 权限控制，路由守卫，权限组件
- **主题系统** - 11 种皮肤，明暗模式，View Transitions
- **边缘部署** - 原生支持 Deno Deploy 边缘运行时
- **类型安全** - 内置 TypeScript，无需配置
- **安全模型** - Deno 沙盒，显式权限，默认安全

## 目录结构

```
halolight-fresh/
├── routes/                        # 文件路由
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

### 环境要求

- Deno >= 2.x

### 安装 Deno

```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex
```

### 安装

```bash
git clone https://github.com/halolight/halolight-fresh.git
cd halolight-fresh
```

### 环境变量

```bash
cp .env.example .env
```

```env
# .env
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

### 数据获取 (Handlers)

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

### 权限控制

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

### Islands 架构

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

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过快捷设置面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿 | `--primary: 64.6% 0.178 142.49` |
| Orange | 橙色 | `--primary: 69.7% 0.186 37.37` |
| Rose | 玫红 | `--primary: 62.8% 0.241 12.48` |
| Teal | 青绿 | `--primary: 66.7% 0.151 193.65` |
| Amber | 琥珀 | `--primary: 77.5% 0.166 69.76` |
| Cyan | 青蓝 | `--primary: 75.1% 0.146 204.66` |
| Pink | 粉色 | `--primary: 65.7% 0.255 347.69` |
| Indigo | 靛青 | `--primary: 51.9% 0.235 272.75` |
| Lime | 柠檬绿 | `--primary: 78.1% 0.167 136.29` |

### CSS 变量 (OKLch)

```css
/* 主题变量定义 */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  --secondary: 96.1% 0.006 285.75;
  --secondary-foreground: 14.9% 0.017 285.75;
  --muted: 96.1% 0.006 285.75;
  --muted-foreground: 44.7% 0.025 285.75;
  --accent: 96.1% 0.006 285.75;
  --accent-foreground: 14.9% 0.017 285.75;
  --destructive: 62.8% 0.241 12.48;
  --destructive-foreground: 100% 0 0;
  --border: 89.8% 0.011 285.75;
  --input: 89.8% 0.011 285.75;
  --ring: 51.1% 0.262 276.97;
  --radius: 0.5rem;
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

## 常用命令

```bash
deno task dev            # 启动开发服务器
deno task build          # 生产构建
deno task start          # 启动生产服务器
deno task check          # 格式和类型检查
deno task fmt            # 格式化代码
deno task fmt:check      # 检查代码格式
deno task lint           # 代码检查
deno task test           # 运行测试
deno task test:watch     # 测试 watch 模式
deno task test:coverage  # 测试覆盖率
deno task ci             # 运行完整 CI 检查
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

```bash
docker build -t halolight-fresh .
docker run -p 8000:8000 halolight-fresh
```

### 其他平台

- [Cloudflare Workers](/guide/cloudflare) - 通过 Deno Deploy 适配器
- [Fly.io](/guide/fly) - Deno 原生支持
- 自托管 - 直接运行 `deno task start`

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

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

## 高级功能

### 中间件系统

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

### 嵌套布局

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

## 性能优化

### Islands 架构优化

Fresh 默认零 JS，仅交互组件需要水合：

```tsx
// 静态组件（components/）- 零 JS
export function Card({ title, content }) {
  return (
    <div class="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

// 交互式 Island（islands/）- 按需水合
export default function Counter() {
  const count = useSignal(0)
  return (
    <button onClick={() => count.value++}>
      Count: {count.value}
    </button>
  )
}
```

### 边缘部署优化

```ts
// 利用 Deno Deploy 边缘运行时
export const handler: Handlers = {
  async GET(req) {
    // 在边缘节点执行，降低延迟
    const data = await fetchFromDatabase()
    return new Response(JSON.stringify(data))
  }
}
```

### 预加载

```tsx
// 预加载关键资源
<link rel="preload" href="/api/auth/me" as="fetch" crossOrigin="anonymous" />
```

## 常见问题

### Q：如何在 Islands 和服务端组件之间共享状态？

A：使用 @preact/signals，它在服务端和客户端都能工作：

```ts
// signals/auth.ts
export const user = signal<User | null>(null)

// islands/UserProfile.tsx (客户端)
import { user } from '../signals/auth.ts'
export default function UserProfile() {
  return <div>{user.value?.name}</div>
}

// routes/dashboard/index.tsx (服务端)
import { user } from '../signals/auth.ts'
export default function Dashboard({ data }: PageProps) {
  return <div>Welcome {data.user.name}</div>
}
```

### Q：如何处理环境变量？

A：Fresh 使用 Deno 的环境变量系统：

```ts
// 读取环境变量
const apiUrl = Deno.env.get('API_URL') || '/api'

// .env 文件（开发环境）
// 使用 deno task dev 自动加载
```

### Q：如何实现数据持久化？

A：使用 Deno KV (内置键值数据库)：

```ts
// lib/db.ts
const kv = await Deno.openKv()

export async function saveUser(user: User) {
  await kv.set(['users', user.id], user)
}

export async function getUser(id: number) {
  const result = await kv.get(['users', id])
  return result.value as User
}
```

## 与其他版本对比

| 特性 | Fresh 版本 | Astro 版本 | Next.js 版本 |
|------|-----------|------------|--------------|
| 运行时 | Deno | Node.js | Node.js |
| 状态管理 | @preact/signals | - | Zustand |
| 数据获取 | Handlers | Load 函数 | TanStack Query |
| 表单验证 | Zod | Zod | React Hook Form + Zod |
| 服务端 | 内置 | @astrojs/node | API Routes |
| 组件库 | 自定义 | - | shadcn/ui |
| Islands 架构 | ✅ | ✅ | ❌ |
| 零配置 | ✅ | ❌ | ❌ |
| 边缘部署 | Deno Deploy | Cloudflare | Vercel Edge |
| 构建步骤 | 可选 | 必须 | 必须 |

## 相关链接

- [在线预览](https://halolight-fresh.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-fresh)
- [Fresh 官方文档](https://fresh.deno.dev)
- [Deno 官方文档](https://deno.com)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
