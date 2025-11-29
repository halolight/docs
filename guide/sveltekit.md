# SvelteKit 版本

HaloLight SvelteKit 版本基于 SvelteKit 2 构建，采用 Svelte 5 Runes + TypeScript，极简高效的开发体验。

**在线预览**：[https://halolight-sveltekit.h7ml.cn/](https://halolight-sveltekit.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-sveltekit](https://github.com/halolight/halolight-sveltekit)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| SvelteKit | 2.x | Svelte 全栈框架 |
| Svelte | 5.x | 编译时框架（Runes） |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn-svelte | latest | UI 组件库 |
| Superforms | 2.x | 表单处理 |
| Zod | 3.x | 数据验证 |
| svelte-dnd-action | latest | 拖拽交互 |
| LayerChart | latest | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **编译时优化**：Svelte 5 Runes 提供极致的运行时性能
- **文件路由**：基于文件系统的自动路由
- **服务端渲染**：内置 SSR/SSG 支持
- **Load 函数**：优雅的数据加载模式
- **Form Actions**：内置表单处理机制
- **Hooks**：灵活的请求生命周期钩子

## 目录结构

```
halolight-sveltekit/
├── src/
│   ├── routes/                    # 文件路由
│   │   ├── +page.svelte          # 首页
│   │   ├── +layout.svelte        # 根布局
│   │   ├── auth/                 # 认证页面
│   │   │   ├── login/
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.server.ts
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── dashboard/            # 仪表盘页面
│   │   │   ├── +layout.svelte
│   │   │   ├── +layout.server.ts
│   │   │   ├── +page.svelte
│   │   │   ├── users/
│   │   │   ├── roles/
│   │   │   ├── permissions/
│   │   │   ├── settings/
│   │   │   └── profile/
│   │   └── api/                  # API 端点
│   │       └── auth/
│   │           └── +server.ts
│   ├── lib/
│   │   ├── components/           # 组件库
│   │   │   ├── ui/              # shadcn-svelte 组件
│   │   │   ├── layout/          # 布局组件
│   │   │   │   ├── AdminLayout.svelte
│   │   │   │   ├── AuthLayout.svelte
│   │   │   │   ├── Sidebar.svelte
│   │   │   │   └── Header.svelte
│   │   │   ├── dashboard/       # 仪表盘组件
│   │   │   │   ├── DashboardGrid.svelte
│   │   │   │   ├── WidgetWrapper.svelte
│   │   │   │   └── StatsWidget.svelte
│   │   │   └── shared/          # 共享组件
│   │   ├── stores/              # Svelte Stores
│   │   │   ├── auth.svelte.ts
│   │   │   ├── ui-settings.svelte.ts
│   │   │   └── dashboard.svelte.ts
│   │   ├── server/              # 服务端代码
│   │   │   ├── auth.ts
│   │   │   └── db.ts
│   │   └── utils/               # 工具函数
│   │       ├── cn.ts
│   │       └── permission.ts
│   ├── hooks.server.ts          # 服务端钩子
│   ├── hooks.client.ts          # 客户端钩子
│   └── app.d.ts                 # 类型声明
├── static/                       # 静态资源
├── svelte.config.js             # Svelte 配置
├── vite.config.ts               # Vite 配置
├── tailwind.config.ts           # Tailwind 配置
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-sveltekit.git
cd halolight-sveltekit
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# .env 示例
PUBLIC_API_URL=/api
PUBLIC_USE_MOCK=true
PUBLIC_DEMO_EMAIL=admin@example.com
PUBLIC_DEMO_PASSWORD=123456
PUBLIC_SHOW_DEMO_HINT=true
PUBLIC_APP_TITLE=Admin Pro
PUBLIC_BRAND_NAME=Halolight
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

### 状态管理 (Svelte 5 Runes)

```ts
// lib/stores/auth.svelte.ts
import { browser } from '$app/environment'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

class AuthStore {
  user = $state<User | null>(null)
  token = $state<string | null>(null)

  isAuthenticated = $derived(!!this.token && !!this.user)
  permissions = $derived(this.user?.permissions ?? [])

  constructor() {
    if (browser) {
      const saved = localStorage.getItem('auth')
      if (saved) {
        const { user, token } = JSON.parse(saved)
        this.user = user
        this.token = token
      }
    }
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    this.user = data.user
    this.token = data.token
    this.persist()
  }

  logout() {
    this.user = null
    this.token = null
    localStorage.removeItem('auth')
  }

  hasPermission(permission: string): boolean {
    return this.permissions.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  }

  private persist() {
    if (browser) {
      localStorage.setItem('auth', JSON.stringify({
        user: this.user,
        token: this.token,
      }))
    }
  }
}

export const authStore = new AuthStore()
```

### 服务端钩子

```ts
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token')

  if (token) {
    // 验证 token 并设置用户信息
    event.locals.user = await validateToken(token)
  }

  // 路由保护
  if (event.url.pathname.startsWith('/dashboard')) {
    if (!event.locals.user) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/auth/login' },
      })
    }
  }

  return resolve(event)
}
```

### Load 函数

```ts
// routes/dashboard/+layout.server.ts
import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (!locals.user) {
    throw redirect(302, `/auth/login?redirect=${url.pathname}`)
  }

  return {
    user: locals.user,
  }
}
```

```ts
// routes/dashboard/users/+page.server.ts
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ locals, url }) => {
  const permission = 'users:list'

  if (!hasPermission(locals.user, permission)) {
    throw error(403, '无权限访问')
  }

  const page = Number(url.searchParams.get('page')) || 1
  const users = await fetchUsers({ page, limit: 10 })

  return { users }
}
```

### Form Actions

```ts
// routes/auth/login/+page.server.ts
import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(6, '密码至少6位'),
})

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema))

    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      const { token, user } = await authenticate(form.data)

      cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 天
      })

      throw redirect(302, '/dashboard')
    } catch (e) {
      return fail(401, { form, message: '邮箱或密码错误' })
    }
  },
}
```

### 权限组件

```svelte
<!-- lib/components/PermissionGuard.svelte -->
<script lang="ts">
  import { authStore } from '$lib/stores/auth.svelte'

  interface Props {
    permission: string
    children: import('svelte').Snippet
    fallback?: import('svelte').Snippet
  }

  let { permission, children, fallback }: Props = $props()

  const hasPermission = $derived(authStore.hasPermission(permission))
</script>

{#if hasPermission}
  {@render children()}
{:else if fallback}
  {@render fallback()}
{/if}
```

```svelte
<!-- 使用 -->
<PermissionGuard permission="users:delete">
  {#snippet children()}
    <Button variant="destructive">删除</Button>
  {/snippet}
  {#snippet fallback()}
    <span class="text-muted-foreground">无权限</span>
  {/snippet}
</PermissionGuard>
```

### 可拖拽仪表盘

```svelte
<!-- lib/components/dashboard/DashboardGrid.svelte -->
<script lang="ts">
  import { dndzone } from 'svelte-dnd-action'
  import { dashboardStore } from '$lib/stores/dashboard.svelte'
  import WidgetWrapper from './WidgetWrapper.svelte'

  const flipDurationMs = 300

  function handleDndConsider(e: CustomEvent) {
    dashboardStore.widgets = e.detail.items
  }

  function handleDndFinalize(e: CustomEvent) {
    dashboardStore.widgets = e.detail.items
    dashboardStore.saveLayout()
  }
</script>

<div
  class="grid grid-cols-12 gap-4"
  use:dndzone={{
    items: dashboardStore.widgets,
    flipDurationMs,
    dragDisabled: !dashboardStore.isEditing,
  }}
  onconsider={handleDndConsider}
  onfinalize={handleDndFinalize}
>
  {#each dashboardStore.widgets as widget (widget.id)}
    <div class="col-span-{widget.cols}">
      <WidgetWrapper {widget} />
    </div>
  {/each}
</div>
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

### Svelte 配置

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils',
    },
  },
}
```

## 部署

### Node.js 服务器

```bash
# 使用 @sveltejs/adapter-node
pnpm add -D @sveltejs/adapter-node
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-node'

export default {
  kit: {
    adapter: adapter(),
  },
}
```

```bash
pnpm build
node build
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
COPY --from=builder /app/package.json .
EXPOSE 3000
CMD ["node", "build"]
```

### Vercel

```bash
# 默认支持，直接部署
npx vercel
```

### Cloudflare Pages

```bash
pnpm add -D @sveltejs/adapter-cloudflare
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare'

export default {
  kit: {
    adapter: adapter(),
  },
}
```

## 测试

```bash
# 运行测试
pnpm test

# E2E 测试
pnpm test:e2e
```

## 与其他版本对比

| 功能 | SvelteKit 版本 | Vue 版本 | Next.js 版本 |
|------|---------------|----------|--------------|
| 状态管理 | Svelte Stores | Pinia | Zustand |
| 数据获取 | Load 函数 | TanStack Query | TanStack Query |
| 表单验证 | Superforms + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | 内置 | 独立后端 | API Routes |
| 组件库 | shadcn-svelte | shadcn-vue | shadcn/ui |
| 路由 | 文件路由 | Vue Router | App Router |
| 编译 | 编译时优化 | 虚拟 DOM | 虚拟 DOM |
