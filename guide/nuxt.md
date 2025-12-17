# Nuxt 版本

HaloLight Nuxt 版本基于 Nuxt 3 构建，采用 Vue 3.5 + Composition API + TypeScript，提供开箱即用的全栈开发体验。

**在线预览**：[https://halolight-nuxt.h7ml.cn/](https://halolight-nuxt.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-nuxt](https://github.com/halolight/halolight-nuxt)

## 特性

- 🔄 **自动导入** - 组件、composables、API 自动导入，零配置
- 📁 **文件路由** - 基于文件系统的自动路由
- 🌐 **全栈开发** - 内置 Nitro 服务端，前后端统一
- 🚀 **SSR/SSG/SPA** - 多种渲染模式灵活选择
- ⚡ **Vite 驱动** - 极速 HMR 热更新
- 🔌 **模块生态** - 丰富的 Nuxt 模块扩展
- 🎨 **主题系统** - 深色/浅色主题切换
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- ⌘ **命令面板** - `⌘/Ctrl + K` 快速导航

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Nuxt | 3.10 | Vue 全栈框架 |
| Vue | 3.5+ | 渐进式框架 |
| TypeScript | 5.7 | 类型安全 |
| Tailwind CSS | 3.x (CDN) | 原子化 CSS |
| Pinia | 0.5 | 状态管理 |
| VueUse | 10.x | 组合式工具库 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **全栈开发**：内置 Nitro 服务端，前后端统一开发
- **自动导入**：组件、composables、API 自动导入
- **文件路由**：基于文件系统的自动路由
- **SSR/SSG**：服务端渲染与静态生成可选
- **命令面板**：`⌘/Ctrl + K` 快速导航
- **热更新**：开发体验极佳的 HMR
- **模块生态**：丰富的 Nuxt 模块扩展

## 目录结构

```
halolight-nuxt/
├── nuxt.config.ts              # Nuxt 配置
├── app.vue                     # 应用根组件
├── pages/                      # 文件路由
│   ├── index.vue              # 首页
│   ├── login.vue              # 登录
│   ├── register.vue           # 注册
│   ├── forgot-password.vue    # 忘记密码
│   ├── reset-password.vue     # 重置密码
│   ├── terms.vue              # 服务条款
│   ├── privacy.vue            # 隐私政策
│   ├── dashboard/             # 仪表盘
│   │   └── index.vue
│   ├── users/                 # 用户管理
│   │   └── index.vue
│   ├── messages/              # 消息中心
│   │   └── index.vue
│   ├── analytics/             # 数据分析
│   │   └── index.vue
│   ├── profile/               # 个人中心
│   │   └── index.vue
│   └── settings/              # 系统设置
│       └── index.vue
├── components/                 # 自动导入组件
│   └── common/                # 通用组件
│       ├── AppHeader.vue
│       ├── AppSidebar.vue
│       ├── AppFooter.vue
│       ├── AppTabs.vue
│       ├── CommandMenu.vue
│       └── ToastContainer.vue
├── composables/                # 组合式函数
│   ├── useTheme.ts
│   ├── useToast.ts
│   └── useCommandMenu.ts
├── layouts/                    # 布局
│   ├── default.vue            # 管理后台布局
│   └── auth.vue               # 认证页面布局
├── middleware/                 # 中间件
│   └── auth.global.ts
├── plugins/                    # 插件
│   └── pinia-persist.client.ts
├── stores/                     # Pinia stores
│   ├── auth.ts
│   ├── ui-settings.ts
│   ├── dashboard.ts
│   ├── layout.ts
│   └── tabs.ts
├── utils/                      # 工具函数
│   ├── index.ts
│   └── mock.ts
├── assets/css/                 # 样式文件
│   ├── main.css
│   └── tailwind.css
├── tests/                      # 测试文件
│   └── unit/
├── .github/                    # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
└── public/                     # 静态资源
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 安装

```bash
git clone https://github.com/halolight/halolight-nuxt.git
cd halolight-nuxt
pnpm install
```

### 环境变量

```bash
cp .env.example .env.local
```

```env
# .env.local
NUXT_PUBLIC_API_BASE=/api
NUXT_PUBLIC_MOCK=true
NUXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NUXT_PUBLIC_DEMO_PASSWORD=123456
NUXT_PUBLIC_SHOW_DEMO_HINT=true
NUXT_PUBLIC_APP_TITLE=Admin Pro
NUXT_PUBLIC_BRAND_NAME=Halolight
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:3000

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

### 状态管理 (Pinia)

```ts
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref('')
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = ''
    try {
      // 登录逻辑
      const result = await mockLogin(credentials)
      user.value = result.user
      token.value = result.token
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = ''
    navigateTo('/login')
  }

  return { user, token, loading, error, isAuthenticated, login, logout }
})
```

### 数据获取 (useFetch)

```vue
<script setup lang="ts">
// 使用 useFetch 自动处理 SSR
const { data: users, pending, error, refresh } = await useFetch('/api/users', {
  query: { page: 1, limit: 10 },
})

// 使用 useAsyncData 自定义 key
const { data: stats } = await useAsyncData('dashboard-stats', () =>
  $fetch('/api/dashboard/stats')
)
</script>
```

### 权限控制

```ts
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // 公开页面列表
  const publicPages = ['/login', '/register', '/forgot-password', '/reset-password']

  if (publicPages.includes(to.path)) {
    return
  }

  if (!authStore.isAuthenticated) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
})
```

### 可拖拽仪表盘

```vue
<script setup lang="ts">
// 仪表盘配置
const dashboardStore = useDashboardStore()
const widgets = computed(() => dashboardStore.widgets)

// 拖拽实现
function handleDragEnd(event) {
  dashboardStore.updateLayout(event.newLayout)
}
</script>
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 | 公开 |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/terms` | 服务条款 | 公开 |
| `/privacy` | 隐私政策 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户管理 | `users:view` |
| `/messages` | 消息中心 | `messages:view` |
| `/analytics` | 数据分析 | `analytics:view` |
| `/profile` | 个人中心 | `settings:view` |
| `/settings` | 系统设置 | `settings:view` |

## 环境变量

### 配置示例

```bash
# .env
NUXT_PUBLIC_API_BASE=/api
NUXT_PUBLIC_MOCK=true
NUXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NUXT_PUBLIC_DEMO_PASSWORD=123456
NUXT_PUBLIC_SHOW_DEMO_HINT=true
NUXT_PUBLIC_APP_TITLE=Admin Pro
NUXT_PUBLIC_BRAND_NAME=Halolight

# 服务端私有变量
NUXT_JWT_SECRET=your-jwt-secret
NUXT_DATABASE_URL=postgresql://localhost:5432/halolight
```

### 变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NUXT_PUBLIC_API_BASE` | API 基础 URL | `/api` |
| `NUXT_PUBLIC_MOCK` | 启用 Mock 数据 | `true` |
| `NUXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `NUXT_PUBLIC_BRAND_NAME` | 品牌名称 | `Halolight` |
| `NUXT_PUBLIC_DEMO_EMAIL` | 演示账号邮箱 | - |
| `NUXT_PUBLIC_DEMO_PASSWORD` | 演示账号密码 | - |
| `NUXT_JWT_SECRET` | JWT 密钥 (服务端) | - |
| `NUXT_DATABASE_URL` | 数据库连接 (服务端) | - |

### 使用方式

```vue
<script setup lang="ts">
// 在组件中使用
const config = useRuntimeConfig();

// 公开变量
const apiBase = config.public.apiBase;

// 私有变量（仅服务端）
// const jwtSecret = config.jwtSecret; // 客户端不可访问
</script>
```

```typescript
// 在 server/api 中使用
export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const jwtSecret = config.jwtSecret; // 可以访问私有变量
});
```

## 配置

### Nuxt 配置

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-11-30',
  devtools: { enabled: false },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: '/api',
      mock: true,
      demoEmail: 'admin@halolight.h7ml.cn',
      demoPassword: '123456',
      showDemoHint: true,
      appTitle: 'Admin Pro',
      brandName: 'Halolight',
    },
  },

  app: {
    head: {
      title: 'Admin Pro',
      script: [
        { src: 'https://cdn.tailwindcss.com' },
      ],
    },
  },
})
```

## 部署

### Vercel (推荐)

```bash
npx vercel
```

或使用 Vercel 按钮一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-nuxt)

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

COPY --from=builder /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

### 其他平台

- **Cloudflare Pages**：配置 `nitro.preset: 'cloudflare-pages'`
- **Netlify**：配置 `nitro.preset: 'netlify'`
- **Node.js 服务器**：`pnpm build && node .output/server/index.mjs`

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
      - run: pnpm typecheck

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

### Server Routes (API 端点)

Nuxt 3 内置 Nitro 服务器，支持创建服务端 API。

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, limit = 10 } = query;

  // 模拟数据库查询
  const users = await getUsersFromDB({ page: Number(page), limit: Number(limit) });

  return {
    success: true,
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: 100,
    },
  };
});
```

### Server Middleware

```typescript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  // 保护 API 路由
  if (url.pathname.startsWith('/api/admin')) {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '');

    if (!token) {
      throw createError({
        statusCode: 401,
        message: '未授权访问',
      });
    }

    try {
      const user = verifyToken(token);
      event.context.user = user;
    } catch {
      throw createError({
        statusCode: 401,
        message: 'Token 无效或已过期',
      });
    }
  }
});
```

### Plugins

```typescript
// plugins/api.ts
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const authStore = useAuthStore();
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        };
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore();
        authStore.logout();
        navigateTo('/login');
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
```

### Composables

```typescript
// composables/useUsers.ts
export function useUsers() {
  const { $api } = useNuxtApp();

  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchUsers(params?: { page?: number; limit?: number }) {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api<ApiResponse<User[]>>('/api/users', {
        params,
      });
      users.value = response.data;
      return response;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}
```

## 性能优化

### 图片优化

```vue
<script setup lang="ts">
// 使用 @nuxt/image
</script>

<template>
  <NuxtImg
    src="/hero.jpg"
    alt="Hero"
    width="800"
    height="600"
    loading="lazy"
    format="webp"
  />

  <NuxtPicture
    src="/hero.jpg"
    alt="Hero"
    width="800"
    height="600"
    sizes="sm:100vw md:50vw lg:33vw"
  />
</template>
```

### 懒加载组件

```vue
<script setup lang="ts">
// 延迟加载重型组件
const Chart = defineAsyncComponent(() => import('~/components/Chart.vue'));
</script>

<template>
  <ClientOnly>
    <Chart :data="chartData" />
    <template #fallback>
      <div class="h-80 animate-pulse bg-gray-200" />
    </template>
  </ClientOnly>
</template>
```

### 预加载

```vue
<script setup lang="ts">
// 预加载关键数据
const { data } = await useFetch('/api/critical-data', {
  key: 'critical',
  lazy: false,
});
</script>
```

## 常见问题

### Q：如何配置 SSG (静态生成)？

A：修改 `nuxt.config.ts`：

```typescript
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/', '/about', '/contact'],
      crawlLinks: true,
    },
  },
});
```

运行 `pnpm generate` 生成静态站点。

### Q：如何配置 SPA 模式？

A：禁用 SSR：

```typescript
export default defineNuxtConfig({
  ssr: false,
});
```

### Q：useFetch 和 $fetch 的区别？

A:
- `useFetch` 是 composable，自动处理 SSR 数据同步
- `$fetch` 是底层方法，不处理 SSR

```vue
<script setup lang="ts">
// 推荐：自动处理 SSR
const { data } = await useFetch('/api/users');

// 手动调用
const fetchData = async () => {
  const data = await $fetch('/api/users');
};
</script>
```

### Q：如何添加全局 CSS？

A：在 `nuxt.config.ts` 中配置：

```typescript
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
});
```

### Q：如何配置代理？

A：使用 `nitro.routeRules`：

```typescript
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/api/external/**': {
        proxy: 'https://api.example.com/**',
      },
    },
  },
});
```

### Q：如何优化构建体积？

A：优化建议：

```typescript
export default defineNuxtConfig({
  // 按需导入组件
  components: {
    dirs: ['~/components'],
    global: false,
  },

  // 实验性功能
  experimental: {
    treeshakeClientOnly: true,
  },

  // Vite 优化
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
          },
        },
      },
    },
  },
});
```

## 与其他版本对比

| 功能 | Nuxt 版本 | Vue 版本 | Next.js 版本 |
|------|----------|----------|--------------|
| 状态管理 | Pinia | Pinia | Zustand |
| 数据获取 | useFetch | Axios | TanStack Query |
| 表单验证 | 原生 | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | Nitro 内置 | 独立后端 | API Routes |
| 样式 | Tailwind CDN | Tailwind | Tailwind |
| 路由 | 文件路由 | Vue Router | App Router |
| SSR | 内置支持 | 需配置 | 内置支持 |

## 相关链接

- [在线预览](https://halolight-nuxt.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-nuxt)
- [Nuxt 官方文档](https://nuxt.com)
- [Nuxt 模块目录](https://nuxt.com/modules)
- [Nitro 文档](https://nitro.unjs.io)
- [Vue 3 文档](https://vuejs.org)
- [Pinia 文档](https://pinia.vuejs.org)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
