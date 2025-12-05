# Astro 版本

HaloLight Astro 版本基于 Astro 5 构建，采用 Islands 架构，实现零 JS 首屏和极致性能。

**在线预览**：[https://halolight-astro.h7ml.cn/](https://halolight-astro.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-astro](https://github.com/halolight/halolight-astro)

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

- **Islands 架构**：默认零 JS，按需水合交互组件
- **多框架支持**：可在同一项目中使用 React、Vue、Svelte 组件
- **内容优先**：静态优先，极致首屏性能
- **SSR 支持**：通过 @astrojs/node 适配器支持服务端渲染
- **文件路由**：基于文件系统的自动路由
- **API 端点**：原生支持 REST API 端点

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

### 客户端指令

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

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 落地页 |
| `/auth/login` | 登录 | 用户登录 |
| `/auth/register` | 注册 | 用户注册 |
| `/auth/forgot-password` | 忘记密码 | 密码找回 |
| `/auth/reset-password` | 重置密码 | 设置新密码 |
| `/dashboard` | 仪表盘 | 数据概览 |
| `/dashboard/analytics` | 数据分析 | 图表统计 |
| `/dashboard/users` | 用户管理 | 用户列表 |
| `/dashboard/accounts` | 账户管理 | 账户列表 |
| `/dashboard/documents` | 文档管理 | 文档列表 |
| `/dashboard/files` | 文件管理 | 文件列表 |
| `/dashboard/messages` | 消息中心 | 消息列表 |
| `/dashboard/notifications` | 通知 | 通知列表 |
| `/dashboard/calendar` | 日历 | 日程管理 |
| `/dashboard/profile` | 个人中心 | 个人信息 |
| `/dashboard/settings` | 设置 | 系统设置 |
| `/privacy` | 隐私政策 | 法律页面 |
| `/terms` | 服务条款 | 法律页面 |

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

### Node.js 服务器

```bash
pnpm build
node ./dist/server/entry.mjs
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
```

### Vercel

```bash
# 安装 Vercel 适配器
pnpm add @astrojs/vercel

# astro.config.mjs
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  adapter: vercel(),
});
```

### Cloudflare Pages

```bash
# 安装 Cloudflare 适配器
pnpm add @astrojs/cloudflare

# astro.config.mjs
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
});
```

## 测试

```bash
# 运行测试
pnpm test

# 生成覆盖率报告
pnpm test --coverage
```

## 与其他框架对比

| 特性 | Astro | Next.js | Nuxt |
|------|-------|---------|------|
| 默认 JS 体积 | 0 KB | ~80 KB | ~70 KB |
| Islands 架构 | 原生支持 | 不支持 | 不支持 |
| 多框架组件 | 支持 | 不支持 | 不支持 |
| SSG/SSR | 支持 | 支持 | 支持 |
| 学习曲线 | 低 | 中 | 中 |
