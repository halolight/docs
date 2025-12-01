# SvelteKit 版本

HaloLight SvelteKit 版本基于 SvelteKit 2 构建，采用 Svelte 5 Runes + TypeScript，具备编译时优化和极致性能。

**在线预览**：[https://halolight-svelte.h7ml.cn/](https://halolight-svelte.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-svelte](https://github.com/halolight/halolight-svelte)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| SvelteKit | 2.x | Svelte 全栈框架 |
| Svelte | 5.x | 编译时框架（Runes） |
| TypeScript | 5.9 | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS + @tailwindcss/postcss |
| shadcn-svelte | latest | UI 组件库 |
| bits-ui | latest | 无头 UI 组件 |
| lucide-svelte | latest | 图标库 |
| sveltekit-superforms | 2.x | 表单处理 |
| Zod | 4.x | 数据验证 |
| Vitest | 4.x | 单元测试 |
| MSW | 2.x | Mock 数据 |

## 核心特性

- **Svelte 5 Runes**：`$state`、`$derived`、`$effect`、`$props` 全新响应式系统
- **编译时优化**：无虚拟 DOM，极小运行时开销
- **文件路由**：基于文件系统的自动路由
- **服务端渲染**：内置 SSR/SSG 支持
- **Load 函数**：优雅的数据加载模式
- **Form Actions**：内置表单处理机制
- **Hooks**：灵活的请求生命周期钩子
- **View Transitions API**：主题/皮肤切换动画
- **Cloudflare Pages**：边缘部署，全球加速

## 目录结构

```
halolight-svelte/
├── src/
│   ├── routes/                    # 文件路由
│   │   ├── +page.svelte          # 首页（重定向）
│   │   ├── +layout.svelte        # 根布局
│   │   ├── +error.svelte         # 错误页面
│   │   ├── auth/                 # 认证页面
│   │   │   ├── login/
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.ts
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   └── (dashboard)/          # 仪表盘路由组
│   │       ├── +layout.svelte
│   │       ├── dashboard/
│   │       ├── analytics/
│   │       ├── users/
│   │       ├── settings/
│   │       └── profile/
│   ├── lib/
│   │   ├── components/           # 组件库
│   │   │   ├── ui/              # shadcn-svelte 组件
│   │   │   └── layout/          # 布局组件
│   │   │       ├── AdminLayout.svelte
│   │   │       ├── AppHeader.svelte
│   │   │       ├── AppSidebar.svelte
│   │   │       ├── AppFooter.svelte
│   │   │       └── QuickSettings.svelte
│   │   ├── config/              # 配置文件
│   │   │   ├── menu.ts          # 菜单配置
│   │   │   └── routes.ts        # 路由配置
│   │   ├── stores/              # 状态管理
│   │   │   ├── auth.ts
│   │   │   ├── layout.ts
│   │   │   ├── navigation.ts
│   │   │   └── ui-settings.ts
│   │   ├── types/               # 类型定义
│   │   └── utils/               # 工具函数
│   │       ├── cn.ts
│   │       ├── format.ts
│   │       └── validation.ts
│   ├── hooks.server.ts          # 服务端钩子
│   ├── app.html                 # HTML 模板
│   ├── app.css                  # 全局样式 (Tailwind)
│   └── app.d.ts                 # 类型声明
├── static/                       # 静态资源
├── tests/                        # 测试文件
├── svelte.config.js             # Svelte 配置
├── vite.config.ts               # Vite 配置
├── tailwind.config.js           # Tailwind 配置
├── postcss.config.js            # PostCSS 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 9

### 安装

```bash
git clone https://github.com/halolight/halolight-svelte.git
cd halolight-svelte
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# .env 示例
VITE_API_URL=/api
VITE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_51LA_SITE_ID=your-51la-site-id
VITE_GA_MEASUREMENT_ID=your-ga-measurement-id
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

### 代码质量

```bash
# ESLint 检查
pnpm lint

# Prettier 格式化
pnpm format

# 类型检查
pnpm check

# 运行测试
pnpm test

# 测试覆盖率
pnpm test:coverage

# 完整 CI 检查
pnpm ci
```

## 核心功能

### 状态管理 (Svelte 5 Runes)

```ts
// lib/stores/auth.ts
import { browser } from '$app/environment';

interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
}

class AuthStore {
  user = $state<User | null>(null);
  token = $state<string | null>(null);

  isAuthenticated = $derived(!!this.token && !!this.user);
  permissions = $derived(this.user?.permissions ?? []);

  constructor() {
    if (browser) {
      const saved = localStorage.getItem('auth');
      if (saved) {
        const { user, token } = JSON.parse(saved);
        this.user = user;
        this.token = token;
      }
    }
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    this.user = data.user;
    this.token = data.token;
    this.persist();
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('auth');
  }

  hasPermission(permission: string): boolean {
    return this.permissions.some(
      (p) =>
        p === '*' || p === permission || (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    );
  }

  private persist() {
    if (browser) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: this.user,
          token: this.token,
        })
      );
    }
  }
}

export const authStore = new AuthStore();
```

### 响应式集合 (SvelteSet/SvelteMap)

```svelte
<script lang="ts">
  import { SvelteSet, SvelteMap } from 'svelte/reactivity';

  // 响应式 Set
  let selectedIds = new SvelteSet<string>();

  function toggleSelection(id: string) {
    if (selectedIds.has(id)) {
      selectedIds.delete(id);
    } else {
      selectedIds.add(id);
    }
  }

  // 响应式 Map
  let itemStatus = new SvelteMap<string, 'pending' | 'done'>();

  function markDone(id: string) {
    itemStatus.set(id, 'done');
  }
</script>

<p>Selected: {selectedIds.size}</p>
```

### 服务端钩子

```ts
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');

  if (token) {
    // 验证 token 并设置用户信息
    event.locals.user = await validateToken(token);
  }

  // 路由保护
  if (event.url.pathname.startsWith('/dashboard')) {
    if (!event.locals.user) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/auth/login' },
      });
    }
  }

  return resolve(event);
};
```

### Load 函数

```ts
// routes/(dashboard)/+layout.ts
import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ parent, url }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect(302, `/auth/login?redirect=${url.pathname}`);
  }

  return { user };
};
```

```svelte
<!-- routes/(dashboard)/dashboard/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1>Welcome, {data.user.name}!</h1>
```

### Form Actions with Superforms

```ts
// routes/auth/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(6, '密码至少6位'),
});

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const { token, user } = await authenticate(form.data);

      cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 天
      });

      throw redirect(302, '/dashboard');
    } catch (e) {
      return fail(401, { form, message: '邮箱或密码错误' });
    }
  },
};
```

### 权限组件

```svelte
<!-- lib/components/PermissionGuard.svelte -->
<script lang="ts">
  import { authStore } from '$lib/stores/auth';

  interface Props {
    permission: string;
    children: import('svelte').Snippet;
    fallback?: import('svelte').Snippet;
  }

  let { permission, children, fallback }: Props = $props();

  const hasPermission = $derived(authStore.hasPermission(permission));
</script>

{#if hasPermission}
  {@render children()}
{:else if fallback}
  {@render fallback()}
{/if}
```

```svelte
<!-- 使用示例 -->
<PermissionGuard permission="users:delete">
  {#snippet children()}
    <Button variant="destructive">删除</Button>
  {/snippet}
  {#snippet fallback()}
    <span class="text-muted-foreground">无权限</span>
  {/snippet}
</PermissionGuard>
```

### View Transitions 主题切换

```svelte
<script lang="ts">
  function toggleTheme() {
    if (!document.startViewTransition) {
      // 降级处理
      document.documentElement.classList.toggle('dark');
      return;
    }

    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark');
    });
  }
</script>

<button onclick={toggleTheme}>Toggle Theme</button>

<style>
  :global(::view-transition-old(root)),
  :global(::view-transition-new(root)) {
    animation-duration: 0.3s;
  }
</style>
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页（重定向） | 公开 |
| `/auth/login` | 登录 | 公开 |
| `/auth/register` | 注册 | 公开 |
| `/auth/forgot-password` | 忘记密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/dashboard/analytics` | 数据分析 | `analytics:view` |
| `/dashboard/users` | 用户管理 | `users:list` |
| `/dashboard/documents` | 文档管理 | `documents:view` |
| `/dashboard/settings` | 系统设置 | `settings:view` |
| `/dashboard/profile` | 个人中心 | 登录即可 |

## 配置

### Svelte 配置

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

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
};
```

### PostCSS 配置 (Tailwind CSS v4)

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

## 部署

### Cloudflare Pages (推荐)

项目默认配置 Cloudflare Pages 适配器：

```bash
pnpm add -D @sveltejs/adapter-cloudflare
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';

export default {
  kit: {
    adapter: adapter(),
  },
};
```

```bash
pnpm build
# Cloudflare Pages 会自动部署 main 分支
```

### Node.js 服务器

```bash
pnpm add -D @sveltejs/adapter-node
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter(),
  },
};
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

## CI/CD

GitHub Actions 自动运行以下检查：

1. **lint** - ESLint 代码检查
2. **format** - Prettier 格式检查
3. **type-check** - TypeScript 类型检查 (svelte-check)
4. **test** - Vitest 单元测试 + 覆盖率
5. **build** - 生产构建验证

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
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm format:check

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:coverage

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
```

## 测试

```bash
# 运行测试
pnpm test

# 监听模式
pnpm test:watch

# 测试覆盖率
pnpm test:coverage

# UI 模式
pnpm test:ui
```

## 与其他版本对比

| 功能 | SvelteKit 版本 | Vue 版本 | Next.js 版本 |
|------|---------------|----------|--------------|
| 状态管理 | Svelte 5 Runes + Stores | Pinia | Zustand |
| 响应式 | $state/$derived/$effect | ref/reactive/computed | useState/useMemo |
| 数据获取 | Load 函数 | TanStack Query | TanStack Query |
| 表单验证 | Superforms + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | 内置 Hooks | 独立后端 | API Routes |
| 组件库 | shadcn-svelte | shadcn-vue | shadcn/ui |
| 路由 | 文件路由 | Vue Router | App Router |
| 编译 | 编译时优化 | 虚拟 DOM | 虚拟 DOM |
| 部署 | Cloudflare Pages | Vercel | Vercel |
