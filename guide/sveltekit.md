# SvelteKit 版本

HaloLight SvelteKit 版本基于 SvelteKit 2 构建，采用 Svelte 5 Runes + TypeScript，具备编译时优化和极致性能。

**在线预览**：[https://halolight-svelte.h7ml.cn](https://halolight-svelte.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-svelte](https://github.com/halolight/halolight-svelte)

## 特性

- 🏗️ **Svelte 5 Runes** - 全新响应式系统 ($state/$derived/$effect)
- ⚡ **编译时优化** - 无虚拟 DOM，极小运行时开销
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 📑 **多标签页** - 标签栏管理
- ⌘ **命令面板** - 快捷键导航 (⌘K)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| SvelteKit | 2.x | Svelte 全栈框架 |
| Svelte | 5.x | 编译时框架 (Runes) |
| TypeScript | 5.9 | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn-svelte | latest | UI 组件库 |
| Superforms | 2.x | 表单处理 |
| TanStack Query | 5.x | 服务端状态 |
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
halolight-svelte/
├── src/
│   ├── routes/                    # 文件路由
│   │   ├── (auth)/                # 认证页面
│   │   └── (dashboard)/           # 仪表盘页面
│   ├── lib/
│   │   ├── components/            # 组件
│   │   │   ├── ui/               # 基础 UI 组件
│   │   │   ├── layout/           # 布局组件
│   │   │   └── dashboard/        # 仪表盘组件
│   │   ├── stores/               # 状态管理 (Runes)
│   │   ├── utils/                # 工具库
│   │   ├── mock/                 # Mock 数据
│   │   └── types/                # 类型定义
│   ├── hooks.server.ts           # 服务端钩子
│   └── app.css                   # 全局样式
├── static/                        # 静态资源
├── svelte.config.js              # Svelte 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

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
# .env
VITE_API_URL=/api
VITE_MOCK=true
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

### 数据获取 (Load 函数)

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

<h1>欢迎, {data.user.name}!</h1>
```

### 权限控制

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

### 可拖拽仪表盘

```svelte
<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity';
  import GridLayout from '$lib/components/dashboard/GridLayout.svelte';

  // 响应式 Set 管理小部件
  let activeWidgets = new SvelteSet(['stats', 'chart', 'recent']);

  const layout = $state([
    { i: 'stats', x: 0, y: 0, w: 4, h: 2 },
    { i: 'chart', x: 4, y: 0, w: 8, h: 4 },
    { i: 'recent', x: 0, y: 2, w: 4, h: 2 },
  ]);

  function onLayoutChange(newLayout: typeof layout) {
    layout.splice(0, layout.length, ...newLayout);
    localStorage.setItem('dashboard-layout', JSON.stringify(newLayout));
  }
</script>

<GridLayout {layout} on:change={onLayoutChange}>
  {#each [...activeWidgets] as widget}
    <div data-grid-item={widget}>
      <Widget type={widget} />
    </div>
  {/each}
</GridLayout>
```

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过快捷设置面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿 | `--primary: 64.6% 0.178 142.49` |
| Orange | 橙色 | `--primary: 68.9% 0.181 40.84` |
| Rose | 玫瑰 | `--primary: 60.7% 0.234 11.63` |
| Teal | 青色 | `--primary: 62.8% 0.149 186.07` |
| Yellow | 黄色 | `--primary: 82.3% 0.165 92.14` |
| Violet | 紫罗兰 | `--primary: 58.9% 0.264 292.85` |
| Cyan | 青蓝 | `--primary: 73.2% 0.152 196.85` |
| Pink | 粉红 | `--primary: 70.5% 0.226 340.54` |
| Indigo | 靛蓝 | `--primary: 52.4% 0.218 270.32` |

### CSS 变量 (OKLch)

```css
/* app.css */
@layer base {
  :root {
    --background: 100% 0 0;
    --foreground: 14.9% 0.017 285.75;
    --primary: 51.1% 0.262 276.97;
    --primary-foreground: 98% 0.007 285.89;
    --secondary: 96.1% 0.006 286.32;
    --secondary-foreground: 14.9% 0.017 285.75;
    --muted: 96.1% 0.006 286.32;
    --muted-foreground: 45.5% 0.026 285.82;
    --accent: 96.1% 0.006 286.32;
    --accent-foreground: 14.9% 0.017 285.75;
    --destructive: 61.1% 0.246 29.23;
    --destructive-foreground: 98% 0.007 285.89;
    --border: 92.1% 0.011 286.32;
    --input: 92.1% 0.011 286.32;
    --ring: 51.1% 0.262 276.97;
    --radius: 0.5rem;
  }

  .dark {
    --background: 22.4% 0.015 285.88;
    --foreground: 98% 0.007 285.89;
    --primary: 61.1% 0.262 276.97;
    --primary-foreground: 98% 0.007 285.89;
    /* ... */
  }
}
```

### View Transitions 主题切换

```svelte
<script lang="ts">
  function toggleTheme() {
    if (!document.startViewTransition) {
      document.documentElement.classList.toggle('dark');
      return;
    }

    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark');
    });
  }
</script>

<button onclick={toggleTheme}>切换主题</button>

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
| `/auth/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/dashboard/users` | 用户管理 | `users:view` |
| `/dashboard/analytics` | 数据分析 | `analytics:view` |
| `/dashboard/calendar` | 日程管理 | `calendar:view` |
| `/dashboard/documents` | 文档管理 | `documents:view` |
| `/dashboard/files` | 文件存储 | `files:view` |
| `/dashboard/messages` | 消息中心 | `messages:view` |
| `/dashboard/notifications` | 通知中心 | `notifications:view` |
| `/dashboard/settings` | 系统设置 | `settings:view` |
| `/dashboard/profile` | 个人资料 | `settings:view` |

## 常用命令

```bash
pnpm dev            # 启动开发服务器
pnpm build          # 生产构建
pnpm preview        # 预览生产构建
pnpm lint           # 代码检查
pnpm lint:fix       # 自动修复
pnpm format         # 格式化代码
pnpm check          # 类型检查 (svelte-check)
pnpm test           # 运行测试
pnpm test:coverage  # 测试覆盖率
pnpm ci             # 完整 CI 检查
```

## 部署

### Cloudflare Pages (推荐)

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/halolight/halolight-svelte)

项目默认配置 Cloudflare Pages 适配器：

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

### Docker

```bash
docker build -t halolight-svelte .
docker run -p 3000:3000 halolight-svelte
```

### 其他平台

- [Vercel](/guide/vercel)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

## 测试

```bash
pnpm test           # 运行测试（watch 模式）
pnpm test:run       # 单次运行
pnpm test:coverage  # 覆盖率报告
pnpm test:ui        # Vitest UI 界面
```

### 测试示例

```ts
// tests/auth.test.ts
import { describe, it, expect } from 'vitest';
import { authStore } from '$lib/stores/auth';

describe('AuthStore', () => {
  it('should initialize with null user', () => {
    expect(authStore.user).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
  });

  it('should authenticate user', async () => {
    await authStore.login({
      email: 'admin@halolight.h7ml.cn',
      password: '123456',
    });

    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.user?.email).toBe('admin@halolight.h7ml.cn');
  });

  it('should check permissions', () => {
    expect(authStore.hasPermission('users:view')).toBe(true);
    expect(authStore.hasPermission('invalid')).toBe(false);
  });
});
```

## 配置

### SvelteKit 配置

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

### Vite 配置

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
  },
});
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
      - run: pnpm format:check

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check

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

<p>已选择: {selectedIds.size}</p>
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

## 性能优化

### 懒加载组件

```svelte
<script lang="ts">
  const HeavyComponent = $lazy(() => import('$lib/components/Heavy.svelte'));
</script>

{#await HeavyComponent}
  <div>加载中...</div>
{:then component}
  <svelte:component this={component} />
{/await}
```

### 预加载

```svelte
<script lang="ts">
  import { preloadData } from '$app/navigation';

  function handleMouseEnter() {
    preloadData('/dashboard/analytics');
  }
</script>

<a href="/dashboard/analytics" onmouseenter={handleMouseEnter}>
  数据分析
</a>
```

### 图片优化

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visible = true;
        observer.disconnect();
      }
    });

    observer.observe(element);
  });
</script>

{#if visible}
  <img src="/large-image.jpg" alt="优化图片" />
{:else}
  <div class="placeholder" />
{/if}
```

## 常见问题

### Q：如何在 SvelteKit 中使用 TanStack Query？

A：SvelteKit 推荐使用内置的 Load 函数进行数据加载，但也可以结合 TanStack Query：

```svelte
<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  const query = createQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
</script>

{#if $query.isLoading}
  <p>加载中...</p>
{:else if $query.error}
  <p>错误: {$query.error.message}</p>
{:else if $query.data}
  <ul>
    {#each $query.data as user}
      <li>{user.name}</li>
    {/each}
  </ul>
{/if}
```

### Q：如何实现表单验证？

A：推荐使用 Superforms + Zod：

```ts
// routes/users/create/+page.server.ts
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // 处理表单数据
    return { form };
  },
};
```

### Q：如何部署到 Vercel？

A：切换到 Vercel 适配器：

```bash
pnpm add -D @sveltejs/adapter-vercel
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter(),
  },
};
```

## 与其他版本对比

| 特性 | SvelteKit | Next.js | Vue |
|------|-----------|---------|-----|
| SSR/SSG | ✅ | ✅ | ✅ (Nuxt) |
| 状态管理 | Svelte 5 Runes | Zustand | Pinia |
| 路由 | 文件路由 | App Router | Vue Router |
| 构建工具 | Vite | Turbopack | Vite |
| 运行时 | 无虚拟 DOM | 虚拟 DOM | 虚拟 DOM |
| 表单 | Superforms | React Hook Form | VeeValidate |
| 组件库 | shadcn-svelte | shadcn/ui | shadcn-vue |

## 相关链接

- [在线预览](https://halolight-svelte.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-svelte)
- [SvelteKit 官方文档](https://kit.svelte.dev)
- [Svelte 5 文档](https://svelte.dev/docs/svelte/overview)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
