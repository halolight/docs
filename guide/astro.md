# Astro 版本

HaloLight Astro 版本基于 Astro 5 构建，采用 Islands 架构实现零 JS 首屏和极致性能，支持多框架组件混用。

**在线预览**：[https://halolight-astro.h7ml.cn/](https://halolight-astro.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-astro](https://github.com/halolight/halolight-astro)

## 特性

- 🏝️ **Islands 架构** - 默认零 JS，按需水合交互组件
- ⚡ **极致性能** - 首屏零 JavaScript，Lighthouse 100 分
- 🔀 **多框架混用** - 同一项目支持 React、Vue、Svelte、Solid 组件
- 📄 **内容优先** - 原生 Markdown/MDX 支持，内容集合
- 🔄 **视图过渡** - 原生 View Transitions API 支持
- 🚀 **SSR/SSG/Hybrid** - 灵活的渲染模式选择
- 📦 **API 端点** - 原生支持 REST API 端点
- 🎨 **主题系统** - 深色/浅色主题切换
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Astro | 5.x | Islands 架构框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 3.x | 原子化 CSS |
| Vite | 内置 | 构建工具 |
| @astrojs/node | 9.x | Node.js 适配器 |
| Vitest | 4.x | 单元测试 |

## 核心特性

- **Islands 架构** - 默认零 JS，按需水合交互组件
- **多框架支持** - 可在同一项目中使用 React、Vue、Svelte 组件
- **内容优先** - 静态优先，极致首屏性能
- **SSR 支持** - 通过 @astrojs/node 适配器支持服务端渲染
- **文件路由** - 基于文件系统的自动路由
- **API 端点** - 原生支持 REST API 端点

## 目录结构

```
halolight-astro/
├── src/
│   ├── pages/                    # 文件路由
│   │   ├── index.astro          # 首页
│   │   ├── privacy.astro        # 隐私政策
│   │   ├── terms.astro          # 服务条款
│   │   ├── auth/                # 认证页面
│   │   │   ├── login.astro
│   │   │   ├── register.astro
│   │   │   ├── forgot-password.astro
│   │   │   └── reset-password.astro
│   │   ├── dashboard/           # 仪表盘页面
│   │   │   ├── index.astro      # 仪表盘首页
│   │   │   ├── analytics.astro  # 数据分析
│   │   │   ├── users.astro      # 用户管理
│   │   │   ├── accounts.astro   # 账户管理
│   │   │   ├── documents.astro  # 文档管理
│   │   │   ├── files.astro      # 文件管理
│   │   │   ├── messages.astro   # 消息中心
│   │   │   ├── notifications.astro
│   │   │   ├── calendar.astro   # 日历
│   │   │   ├── profile.astro    # 个人中心
│   │   │   └── settings/        # 设置
│   │   └── api/                 # API 端点
│   │       └── auth/
│   │           ├── login.ts
│   │           ├── register.ts
│   │           ├── forgot-password.ts
│   │           └── reset-password.ts
│   ├── layouts/                 # 布局组件
│   │   ├── Layout.astro         # 基础布局
│   │   ├── AuthLayout.astro     # 认证布局
│   │   ├── DashboardLayout.astro # 仪表盘布局
│   │   └── LegalLayout.astro    # 法律页面布局
│   ├── components/              # UI 组件
│   │   └── dashboard/
│   │       ├── Sidebar.astro    # 侧边栏
│   │       └── Header.astro     # 顶部导航
│   ├── styles/                  # 全局样式
│   │   └── globals.css
│   └── assets/                  # 静态资源
├── public/                      # 公共资源
├── tests/                       # 测试文件
├── astro.config.mjs            # Astro 配置
├── tailwind.config.mjs         # Tailwind 配置
├── vitest.config.ts            # 测试配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 安装

```bash
git clone https://github.com/halolight/halolight-astro.git
cd halolight-astro
pnpm install
```

### 环境变量

```bash
cp .env.example .env.local
```

```env
# .env.local 示例
PUBLIC_API_URL=/api
PUBLIC_MOCK=true
PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
PUBLIC_DEMO_PASSWORD=123456
PUBLIC_SHOW_DEMO_HINT=true
PUBLIC_APP_TITLE=Admin Pro
PUBLIC_BRAND_NAME=Halolight
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:4321

### 构建生产

```bash
pnpm build
pnpm preview
```

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

## 核心功能

### Islands 架构

Astro 的 Islands 架构允许页面默认为静态 HTML，仅在需要交互的组件上添加 JavaScript：

```astro
---
// 静态导入，无 JS
import StaticCard from '../components/StaticCard.astro';
// 交互组件（可来自 React/Vue/Svelte）
import Counter from '../components/Counter.tsx';
---

<!-- 纯静态，零 JS -->
<StaticCard title="统计数据" />

<!-- 页面加载时水合 -->
<Counter client:load />

<!-- 可见时水合（懒加载） -->
<Counter client:visible />

<!-- 浏览器空闲时水合 -->
<Counter client:idle />
```

**客户端指令**：

| 指令 | 行为 | 使用场景 |
|------|------|----------|
| `client:load` | 页面加载后立即水合 | 首屏关键交互 |
| `client:idle` | 浏览器空闲时水合 | 非关键交互 |
| `client:visible` | 元素可见时水合 | 懒加载组件 |
| `client:only` | 仅客户端渲染 | 依赖浏览器 API |
| `client:media` | 媒体查询匹配时水合 | 响应式组件 |

### 布局系统

```astro
---
// layouts/DashboardLayout.astro
import Layout from './Layout.astro';
import Sidebar from '../components/dashboard/Sidebar.astro';
import Header from '../components/dashboard/Header.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
const currentPath = Astro.url.pathname;
---

<Layout title={title} description={description}>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar currentPath={currentPath} />
    <div class="lg:pl-64">
      <Header title={title} />
      <main class="p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</Layout>
```

### API 端点

Astro 原生支持创建 API 端点：

```typescript
// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { email, password } = body;

  // 验证逻辑
  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, message: '邮箱和密码不能为空' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 认证逻辑...

  return new Response(
    JSON.stringify({
      success: true,
      message: '登录成功',
      user: { id: 1, name: '管理员', role: 'admin' },
      token: 'mock_token',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
```

### 文件路由

| 文件路径 | URL | 说明 |
|----------|-----|------|
| `src/pages/index.astro` | `/` | 首页 |
| `src/pages/auth/login.astro` | `/auth/login` | 登录 |
| `src/pages/dashboard/index.astro` | `/dashboard` | 仪表盘 |
| `src/pages/dashboard/[id].astro` | `/dashboard/:id` | 动态路由 |
| `src/pages/api/auth/login.ts` | `/api/auth/login` | API 端点 |

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 | 公开 |
| `/auth/login` | 登录 | 公开 |
| `/auth/register` | 注册 | 公开 |
| `/auth/forgot-password` | 忘记密码 | 公开 |
| `/auth/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/dashboard/analytics` | 数据分析 | `analytics:view` |
| `/dashboard/users` | 用户管理 | `users:view` |
| `/dashboard/accounts` | 账户管理 | `accounts:view` |
| `/dashboard/documents` | 文档管理 | `documents:view` |
| `/dashboard/files` | 文件管理 | `files:view` |
| `/dashboard/messages` | 消息中心 | `messages:view` |
| `/dashboard/notifications` | 通知中心 | `notifications:view` |
| `/dashboard/calendar` | 日历 | `calendar:view` |
| `/dashboard/profile` | 个人中心 | `settings:view` |
| `/dashboard/settings` | 设置 | `settings:view` |
| `/privacy` | 隐私政策 | 公开 |
| `/terms` | 服务条款 | 公开 |

## 环境变量

### 配置

```bash
# .env
PUBLIC_API_URL=/api
PUBLIC_MOCK=true
PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
PUBLIC_DEMO_PASSWORD=123456
PUBLIC_SHOW_DEMO_HINT=true
PUBLIC_APP_TITLE=Admin Pro
PUBLIC_BRAND_NAME=Halolight
```

### 变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `PUBLIC_API_URL` | API 基础 URL | `/api` |
| `PUBLIC_MOCK` | 启用 Mock 数据 | `true` |
| `PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `PUBLIC_BRAND_NAME` | 品牌名称 | `Halolight` |
| `PUBLIC_DEMO_EMAIL` | 演示账号邮箱 | - |
| `PUBLIC_DEMO_PASSWORD` | 演示账号密码 | - |
| `PUBLIC_SHOW_DEMO_HINT` | 显示演示提示 | `false` |

### 使用方式

```astro
---
// 在 .astro 文件中
const apiUrl = import.meta.env.PUBLIC_API_URL;
const isMock = import.meta.env.PUBLIC_MOCK === 'true';
---
```

```typescript
// 在 .ts 文件中
const apiUrl = import.meta.env.PUBLIC_API_URL;
```

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器 (默认 4321 端口)
pnpm dev --port 3000  # 指定端口

# 构建
pnpm build            # 生产构建
pnpm preview          # 预览生产构建

# 检查
pnpm astro check      # 类型检查
pnpm lint             # ESLint 检查
pnpm lint:fix         # ESLint 自动修复

# 测试
pnpm test             # 运行测试
pnpm test:run         # 单次运行
pnpm test:coverage    # 覆盖率报告

# Astro CLI
pnpm astro add react     # 添加 React 集成
pnpm astro add vue       # 添加 Vue 集成
pnpm astro add tailwind  # 添加 Tailwind
pnpm astro add mdx       # 添加 MDX 支持
```

## 测试

```bash
# 运行测试
pnpm test

# 生成覆盖率报告
pnpm test --coverage
```

### 测试示例

```typescript
// tests/components/Counter.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../../src/components/Counter';

describe('Counter', () => {
  it('renders with initial count', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments count on button click', () => {
    render(<Counter />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
```

## 配置

### Astro 配置

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',  // SSR 模式
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 4321,
    host: true,
  },
});
```

### 输出模式

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `static` | 静态站点生成 (SSG) | 博客、文档站 |
| `server` | 服务端渲染 (SSR) | 动态应用 |
| `hybrid` | 混合模式 | 部分动态 |

## 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-astro)

```bash
# 安装适配器
pnpm add @astrojs/vercel

# astro.config.mjs
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

### Docker

```dockerfile
FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
```

### 其他平台

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

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
      - run: pnpm astro check

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

### 内容集合

Astro 内置的内容管理系统，支持类型安全的 Markdown/MDX 内容。

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogLayout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <time>{post.data.pubDate.toLocaleDateString()}</time>
    <Content />
  </article>
</BlogLayout>
```

### 视图过渡

原生 View Transitions API 支持，实现页面间流畅动画。

```astro
---
// src/layouts/Layout.astro
import { ViewTransitions } from 'astro:transitions';
---

<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <slot />
  </body>
</html>
```

```astro
---
// 自定义过渡动画
---
<div transition:name="hero">
  <h1 transition:animate="slide">欢迎</h1>
</div>

<style>
  /* 自定义动画 */
  @keyframes slide-in {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  ::view-transition-old(hero) {
    animation: slide-out 0.3s ease-out;
  }

  ::view-transition-new(hero) {
    animation: slide-in 0.3s ease-out;
  }
</style>
```

### 中间件

请求拦截和处理。

```typescript
// src/middleware.ts
import { defineMiddleware, sequence } from 'astro:middleware';

// 认证中间件
const auth = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('token')?.value;

  // 保护路由
  const protectedPaths = ['/dashboard', '/profile', '/settings'];
  const isProtected = protectedPaths.some(path =>
    context.url.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return context.redirect('/auth/login');
  }

  // 将用户信息传递给页面
  if (token) {
    context.locals.user = await verifyToken(token);
  }

  return next();
});

// 日志中间件
const logger = defineMiddleware(async (context, next) => {
  const start = Date.now();
  const response = await next();
  const duration = Date.now() - start;

  console.log(`${context.request.method} ${context.url.pathname} - ${duration}ms`);

  return response;
});

// 组合中间件
export const onRequest = sequence(logger, auth);
```

## 性能优化

### 图片优化

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/hero.png';
---

<!-- 自动优化图片 -->
<Image src={myImage} alt="Hero" width={800} height={600} />

<!-- 远程图片 -->
<Image
  src="https://example.com/image.jpg"
  alt="Remote"
  width={400}
  height={300}
  inferSize
/>
```

### 懒加载组件

```astro
---
// 使用 client:visible 实现懒加载
import HeavyComponent from '../components/HeavyComponent';
---

<!-- 仅在元素可见时加载 -->
<HeavyComponent client:visible />
```

### 预加载

```astro
---
// 预加载关键资源
---
<head>
  <link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin />
  <link rel="preconnect" href="https://api.example.com" />
  <link rel="dns-prefetch" href="https://cdn.example.com" />
</head>
```

### 代码分割

```astro
---
// 动态导入重型组件
const Chart = await import('../components/Chart.tsx');
---

<Chart.default client:visible data={data} />
```

## 常见问题

### Q：如何在 Islands 中共享状态？

A：使用 nanostores 或 Zustand：

```bash
pnpm add nanostores @nanostores/react
```

```typescript
// src/stores/counter.ts
import { atom } from 'nanostores';

export const $counter = atom(0);

export function increment() {
  $counter.set($counter.get() + 1);
}
```

```tsx
// React 组件
import { useStore } from '@nanostores/react';
import { $counter, increment } from '../stores/counter';

export function Counter() {
  const count = useStore($counter);
  return <button onClick={increment}>{count}</button>;
}
```

### Q：如何处理表单提交？

A：使用 API 端点：

```astro
---
// src/pages/contact.astro
---
<form method="POST" action="/api/contact">
  <input name="email" type="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">提交</button>
</form>
```

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const message = data.get('message');

  // 处理表单数据
  await sendEmail({ email, message });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

### Q：如何实现认证？

A：使用中间件 + Cookie：

```typescript
// src/middleware.ts
export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('auth-token')?.value;

  if (context.url.pathname.startsWith('/dashboard') && !token) {
    return context.redirect('/auth/login');
  }

  if (token) {
    try {
      const user = await verifyToken(token);
      context.locals.user = user;
    } catch {
      context.cookies.delete('auth-token');
      return context.redirect('/auth/login');
    }
  }

  return next();
});
```

### Q：构建体积大怎么办？

A：优化建议：
1. 检查 `client:` 指令使用，尽量用 `client:visible` 或 `client:idle`
2. 使用动态导入
3. 移除未使用的集成
4. 使用 `@playform/compress` 压缩输出

```bash
pnpm add @playform/compress
```

```javascript
// astro.config.mjs
import compress from '@playform/compress';

export default defineConfig({
  integrations: [compress()],
});
```

## 与其他版本对比

| 特性 | Astro | Next.js | Vue |
|------|-------|---------|-----|
| 默认 JS 体积 | 0 KB | ~80 KB | ~70 KB |
| Islands 架构 | 原生支持 | 不支持 | 不支持 (Nuxt) |
| 多框架组件 | 支持 | 不支持 | 不支持 |
| SSG/SSR | 支持 | 支持 | 支持 (Nuxt) |
| 学习曲线 | 低 | 中 | 中 |

## 相关链接

- [在线预览](https://halolight-astro.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-astro)
- [Astro 官方文档](https://docs.astro.build)
- [Astro 集成目录](https://astro.build/integrations)
- [Astro 主题市场](https://astro.build/themes)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
