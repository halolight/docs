# Nuxt 版本

HaloLight Nuxt 版本基于 Nuxt 4 构建，采用 Vue 3.5 + Composition API + TypeScript，开箱即用的全栈开发体验。

**在线预览**：[https://halolight-nuxt.h7ml.cn/](https://halolight-nuxt.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-nuxt](https://github.com/halolight/halolight-nuxt)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Nuxt | 4.x | Vue 全栈框架 |
| Vue | 3.5+ | 渐进式框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| Nuxt UI | 3.x | UI 组件库 |
| Pinia | 3.x | 状态管理 |
| VueUse | 12.x | 组合式工具库 |
| Zod | 3.x | 数据验证 |
| VueUse Gesture | latest | 手势交互 |
| ECharts | 5.x | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **全栈开发**：内置 Nitro 服务端，前后端统一开发
- **自动导入**：组件、composables、API 自动导入
- **文件路由**：基于文件系统的自动路由
- **SSR/SSG**：服务端渲染与静态生成可选
- **热更新**：开发体验极佳的 HMR
- **模块生态**：丰富的 Nuxt 模块扩展

## 目录结构

```
halolight-nuxt/
├── app/
│   ├── pages/                     # 文件路由
│   │   ├── index.vue             # 首页
│   │   ├── auth/                 # 认证页面
│   │   │   ├── login.vue
│   │   │   ├── register.vue
│   │   │   ├── forgot-password.vue
│   │   │   └── reset-password.vue
│   │   └── dashboard/            # 仪表盘页面
│   │       ├── index.vue
│   │       ├── users/
│   │       ├── roles/
│   │       ├── permissions/
│   │       ├── settings/
│   │       └── profile.vue
│   ├── components/               # 自动导入组件
│   │   ├── ui/                   # UI 组件
│   │   ├── layout/               # 布局组件
│   │   │   ├── AdminLayout.vue
│   │   │   ├── AuthLayout.vue
│   │   │   ├── Sidebar.vue
│   │   │   └── Header.vue
│   │   ├── dashboard/            # 仪表盘组件
│   │   │   ├── DashboardGrid.vue
│   │   │   ├── WidgetWrapper.vue
│   │   │   ├── StatsWidget.vue
│   │   │   └── ChartWidget.vue
│   │   └── shared/               # 共享组件
│   ├── composables/              # 组合式函数
│   │   ├── useAuth.ts
│   │   ├── usePermission.ts
│   │   ├── useTheme.ts
│   │   └── useDashboard.ts
│   ├── layouts/                  # 布局
│   │   ├── default.vue
│   │   ├── auth.vue
│   │   └── dashboard.vue
│   └── middleware/               # 中间件
│       ├── auth.ts
│       └── permission.ts
├── server/                       # 服务端
│   ├── api/                      # API 路由
│   │   ├── auth/
│   │   │   ├── login.post.ts
│   │   │   ├── register.post.ts
│   │   │   └── me.get.ts
│   │   └── users/
│   ├── middleware/               # 服务端中间件
│   └── utils/                    # 服务端工具
├── stores/                       # Pinia stores
│   ├── auth.ts
│   ├── ui-settings.ts
│   ├── dashboard.ts
│   └── tabs.ts
├── types/                        # 类型定义
├── public/                       # 静态资源
├── nuxt.config.ts               # Nuxt 配置
├── tailwind.config.ts           # Tailwind 配置
└── package.json
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
cp .env.example .env
```

```env
# .env 示例
NUXT_PUBLIC_API_URL=/api
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_DEMO_EMAIL=admin@example.com
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

## 核心功能

### 状态管理 (Pinia)

```ts
// stores/auth.ts
import { defineStore } from 'pinia'

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const permissions = computed(() => user.value?.permissions ?? [])

  async function login(credentials: LoginCredentials) {
    const { data } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })

    if (data.value) {
      user.value = data.value.user
      token.value = data.value.token
    }
  }

  function logout() {
    user.value = null
    token.value = null
    navigateTo('/auth/login')
  }

  function hasPermission(permission: string): boolean {
    return permissions.value.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  }

  return {
    user,
    token,
    isAuthenticated,
    permissions,
    login,
    logout,
    hasPermission,
  }
}, {
  persist: true,
})
```

### 认证中间件

```ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  }
})
```

### 权限中间件

```ts
// middleware/permission.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const permission = to.meta.permission as string | undefined

  if (permission && !authStore.hasPermission(permission)) {
    return navigateTo('/403')
  }
})
```

### 权限组合式函数

```ts
// composables/usePermission.ts
export function usePermission() {
  const authStore = useAuthStore()

  const hasPermission = (permission: string) => {
    return authStore.hasPermission(permission)
  }

  const hasAnyPermission = (permissions: string[]) => {
    return permissions.some(p => authStore.hasPermission(p))
  }

  const hasAllPermissions = (permissions: string[]) => {
    return permissions.every(p => authStore.hasPermission(p))
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }
}
```

### 权限指令

```ts
// plugins/permission.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('permission', {
    mounted(el, binding) {
      const authStore = useAuthStore()
      if (!authStore.hasPermission(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
})
```

```vue
<!-- 使用 -->
<button v-permission="'users:delete'">删除</button>
```

### 服务端 API

```ts
// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 验证逻辑
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: '邮箱和密码不能为空',
    })
  }

  // 认证逻辑...

  return {
    success: true,
    user: { id: 1, name: '管理员', email },
    token: 'mock_token',
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

### 路由配置

```vue
<!-- pages/dashboard/users/index.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'permission'],
  permission: 'users:list',
})
</script>
```

## 配置

### Nuxt 配置

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  ui: {
    global: true,
  },

  runtimeConfig: {
    public: {
      apiUrl: '/api',
      useMock: true,
      appTitle: 'Admin Pro',
      brandName: 'Halolight',
    },
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
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

## 测试

```bash
# 运行测试
pnpm test

# 生成覆盖率报告
pnpm test --coverage
```

## 与其他版本对比

| 功能 | Nuxt 版本 | Vue 版本 | Next.js 版本 |
|------|----------|----------|--------------|
| 状态管理 | Pinia | Pinia | Zustand |
| 数据获取 | useFetch | TanStack Query | TanStack Query |
| 表单验证 | VeeValidate + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | Nitro 内置 | 独立后端 | API Routes |
| 组件库 | Nuxt UI | shadcn-vue | shadcn/ui |
| 路由 | 文件路由 | Vue Router | App Router |
| SSR | 内置支持 | 需配置 | 内置支持 |
