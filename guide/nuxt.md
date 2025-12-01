# Nuxt 版本

Halolight Nuxt 版本基于 Nuxt 3 构建，采用 Vue 3.5 + Composition API + TypeScript，开箱即用的全栈开发体验。

**在线预览**：[https://halolight-nuxt.h7ml.cn/](https://halolight-nuxt.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-nuxt](https://github.com/halolight/halolight-nuxt)

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
# .env 示例
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

### 代码检查与测试

```bash
# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
pnpm lint:fix

# 运行测试
pnpm test
pnpm test:run
pnpm test:coverage
```

## 演示账号

- 邮箱：`admin@halolight.h7ml.cn`
- 密码：`123456`

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

### 认证中间件

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

### 数据获取

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

## 页面路由

| 路径 | 页面 | 布局 |
|------|------|------|
| `/` | 首页 | - |
| `/login` | 登录 | auth |
| `/register` | 注册 | auth |
| `/forgot-password` | 忘记密码 | auth |
| `/reset-password` | 重置密码 | auth |
| `/terms` | 服务条款 | auth |
| `/privacy` | 隐私政策 | auth |
| `/dashboard` | 仪表盘 | default |
| `/users` | 用户管理 | default |
| `/messages` | 消息中心 | default |
| `/analytics` | 数据分析 | default |
| `/profile` | 个人中心 | default |
| `/settings` | 系统设置 | default |

### 路由配置

```vue
<!-- pages/login.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>
```

```vue
<!-- pages/dashboard/index.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
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

### Node.js 服务器

```bash
pnpm build
node .output/server/index.mjs
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### Vercel

```bash
npx vercel
```

### Cloudflare Pages

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages',
  },
})
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
