# Vue 版本

HaloLight Vue 版本基于 Vue 3.5 + Vite 7 构建，采用 Composition API + TypeScript。

**在线预览**：[https://halolight-vue.h7ml.cn/](https://halolight-vue.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-vue](https://github.com/halolight/halolight-vue)

## 特性

- 🏗️ **Composition API** - Vue 3.5 组合式 API，逻辑复用更灵活
- ⚡ **Vite 7 + Rolldown** - 极速热更新，Rust 驱动的构建工具
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 📑 **多标签页** - 标签栏管理
- ⌘ **命令面板** - 快捷键导航

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.x | 渐进式框架 |
| Vite | 7.x (Rolldown) | 构建工具 |
| TypeScript | 5.x | 类型安全 |
| Vue Router | 4.x | 路由管理 |
| Pinia | 2.x | 状态管理 |
| TanStack Query | 5.x | 服务端状态 |
| VeeValidate | 4.x | 表单验证 |
| Zod | 3.x | 数据验证 |
| Tailwind CSS | 4.x | 原子化 CSS |
| shadcn-vue | latest | UI 组件库 |
| grid-layout-plus | 1.x | 拖拽布局 |
| ECharts | 5.x | 图表可视化 |
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
halolight-vue/
├── src/
│   ├── views/               # 页面视图
│   │   ├── (auth)/         # 认证页面
│   │   └── (dashboard)/    # 仪表盘页面
│   ├── components/         # 组件
│   │   ├── ui/             # 基础 UI 组件
│   │   ├── layout/         # 布局组件
│   │   └── dashboard/      # 仪表盘组件
│   ├── composables/        # 组合式函数
│   ├── stores/             # Pinia 状态管理
│   ├── lib/                # 工具库
│   ├── mocks/              # Mock 数据
│   └── types/              # 类型定义
├── public/                 # 静态资源
├── vite.config.ts
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 安装

```bash
git clone https://github.com/halolight/halolight-vue.git
cd halolight-vue
pnpm install
```

### 环境变量

```bash
cp .env.example .env.local
```

```env
# .env.local
VITE_API_URL=/api
VITE_USE_MOCK=true
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

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

## 核心功能

### 状态管理 (Pinia)

```ts
// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const permissions = computed(() => user.value?.permissions || [])

  // Actions
  async function login(credentials: LoginCredentials) {
    const response = await authService.login(credentials)
    user.value = response.user
    token.value = response.token
  }

  function logout() {
    user.value = null
    token.value = null
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
  persist: {
    paths: ['token', 'user'],
  },
})
```

### 数据获取 (TanStack Query)

```ts
// composables/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { userService } from '@/services/users'

export function useUsers(params?: Ref<UserQueryParams>) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(unref(params)),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### 权限控制

```ts
// composables/usePermission.ts
import { useAuthStore } from '@/stores/auth'

export function usePermission() {
  const authStore = useAuthStore()

  function hasPermission(permission: string): boolean {
    return authStore.hasPermission(permission)
  }

  function hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => hasPermission(p))
  }

  function hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(p => hasPermission(p))
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  }
}
```

```ts
// directives/permission.ts
import { useAuthStore } from '@/stores/auth'

export const vPermission = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()
    if (!authStore.hasPermission(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

// 注册指令
app.directive('permission', vPermission)
```

```vue
<!-- 使用权限指令 -->
<button v-permission="'users:delete'">删除</button>

<!-- 使用权限组件 -->
<PermissionGuard permission="users:delete">
  <DeleteButton />
  <template #fallback>
    <span>无权限</span>
  </template>
</PermissionGuard>
```

### 可拖拽仪表盘

```vue
<!-- components/dashboard/DashboardGrid.vue -->
<script setup lang="ts">
import { GridLayout, GridItem } from 'grid-layout-plus'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
const { layout, isEditing } = storeToRefs(dashboardStore)
</script>

<template>
  <GridLayout
    v-model:layout="layout"
    :col-num="12"
    :row-height="80"
    :is-draggable="isEditing"
    :is-resizable="isEditing"
    :margin="[16, 16]"
  >
    <GridItem
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
    >
      <WidgetWrapper :widget="getWidget(item.i)" />
    </GridItem>
  </GridLayout>
</template>
```

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过快捷设置面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿 | `--primary: 64.6% 0.178 142.49` |
| Orange | 橙色 | `--primary: 69.7% 0.196 49.27` |
| Rose | 玫瑰 | `--primary: 63.4% 0.243 357.61` |
| Amber | 琥珀 | `--primary: 79.1% 0.177 77.54` |
| Cyan | 青色 | `--primary: 74.4% 0.167 197.13` |
| Violet | 紫罗兰 | `--primary: 57.2% 0.267 285.75` |
| Lime | 青柠 | `--primary: 78.8% 0.184 127.38` |
| Pink | 粉色 | `--primary: 70.9% 0.254 347.58` |
| Teal | 青蓝 | `--primary: 67.8% 0.157 181.02` |

### CSS 变量 (OKLch)

```css
/* 示例变量定义 */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  --secondary: 97.3% 0.006 285.75;
  --secondary-foreground: 17.9% 0.018 285.75;
  --muted: 97.3% 0.006 285.75;
  --muted-foreground: 49.5% 0.023 285.75;
  --accent: 97.3% 0.006 285.75;
  --accent-foreground: 17.9% 0.018 285.75;
  --destructive: 59.9% 0.24 29.23;
  --destructive-foreground: 98.3% 0.002 285.75;
  --border: 91.9% 0.010 285.75;
  --input: 91.9% 0.010 285.75;
  --ring: 51.1% 0.262 276.97;
  --radius: 0.5rem;
}
```

### 主题切换

```ts
// composables/useTheme.ts
import { ref, computed, watch } from 'vue'

export function useTheme() {
  const theme = ref<'light' | 'dark' | 'system'>('system')
  const skin = ref<SkinPreset>('default')

  const actualTheme = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme.value
  })

  async function toggleTheme(event?: MouseEvent) {
    const newTheme = actualTheme.value === 'dark' ? 'light' : 'dark'

    // View Transitions API
    if (!document.startViewTransition) {
      theme.value = newTheme
      return
    }

    await document.startViewTransition(() => {
      theme.value = newTheme
    }).ready

    // 圆形展开动画
    if (event) {
      const { clientX, clientY } = event
      const radius = Math.hypot(
        Math.max(clientX, window.innerWidth - clientX),
        Math.max(clientY, window.innerHeight - clientY)
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${clientX}px ${clientY}px)`,
            `circle(${radius}px at ${clientX}px ${clientY}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    }
  }

  watch([theme, skin], () => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(actualTheme.value)
    document.documentElement.setAttribute('data-skin', skin.value)
  }, { immediate: true })

  return { theme, skin, actualTheme, toggleTheme }
}
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 重定向到 `/dashboard` | - |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户管理 | `users:view` |
| `/analytics` | 数据分析 | `analytics:view` |
| `/calendar` | 日程管理 | `calendar:view` |
| `/documents` | 文档管理 | `documents:view` |
| `/files` | 文件存储 | `files:view` |
| `/messages` | 消息中心 | `messages:view` |
| `/notifications` | 通知中心 | `notifications:view` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人资料 | `settings:view` |

## 环境变量

### 配置示例

```env
# .env.local
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=false
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
```

### 变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_API_URL` | API 基础路径 | `/api` |
| `VITE_USE_MOCK` | 是否使用 Mock 数据 | `true` |
| `VITE_DEMO_EMAIL` | 演示账号邮箱 | `admin@halolight.h7ml.cn` |
| `VITE_DEMO_PASSWORD` | 演示账号密码 | `123456` |
| `VITE_SHOW_DEMO_HINT` | 是否显示演示提示 | `false` |
| `VITE_APP_TITLE` | 应用标题 | `Admin Pro` |
| `VITE_BRAND_NAME` | 品牌名称 | `Halolight` |

### 使用方式

```ts
// 在代码中使用
const apiUrl = import.meta.env.VITE_API_URL
const useMock = import.meta.env.VITE_USE_MOCK === 'true'
const appTitle = import.meta.env.VITE_APP_TITLE
```

## 常用命令

```bash
pnpm dev            # 启动开发服务器
pnpm build          # 生产构建
pnpm preview        # 预览生产构建
pnpm lint           # 代码检查
pnpm lint:fix       # 自动修复
pnpm type-check     # 类型检查
pnpm test           # 运行测试
pnpm test:coverage  # 测试覆盖率
```

## 测试

```bash
pnpm test           # 运行测试（watch 模式）
pnpm test:run       # 单次运行
pnpm test:coverage  # 覆盖率报告
pnpm test:ui        # Vitest UI 界面
```

### 测试示例

```ts
// tests/components/Button.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/ui/Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      props: { variant: 'default' },
      slots: { default: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

## 配置

### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['@tanstack/vue-query'],
        },
      },
    },
  },
})
```

## 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-vue)

### Docker

```bash
docker build -t halolight-vue .
docker run -p 3000:3000 halolight-vue
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
      - run: pnpm type-check

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

### ECharts 集成

```vue
<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { useTheme } from '@/composables/useTheme'

use([CanvasRenderer, LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const { actualTheme } = useTheme()

const option = computed(() => ({
  backgroundColor: 'transparent',
  textStyle: {
    color: actualTheme.value === 'dark' ? '#e5e5e5' : '#333',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
}))
</script>

<template>
  <VChart :option="option" autoresize />
</template>
```

### 路由守卫

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 需要认证的页面
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // 权限检查
  if (to.meta.permission && !authStore.hasPermission(to.meta.permission)) {
    next({ name: '403' })
    return
  }

  next()
})

export default router
```

## 性能优化

### 图片优化

```vue
<script setup lang="ts">
const imageSrc = computed(() => {
  const { width } = useWindowSize()
  if (width.value < 768) return '/images/mobile.webp'
  if (width.value < 1024) return '/images/tablet.webp'
  return '/images/desktop.webp'
})
</script>

<template>
  <img
    :src="imageSrc"
    loading="lazy"
    decoding="async"
    alt="响应式图片"
  >
</template>
```

### 懒加载组件

```ts
// router/routes.ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    component: () => import('@/views/Users.vue'),
    meta: { requiresAuth: true, permission: 'users:view' }
  },
]
```

### 预加载

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 预加载常用路由
  router.resolve({ name: 'users' })
  router.resolve({ name: 'settings' })
})
</script>
```

## 常见问题

### Q：如何切换主题？

A：使用 `useTheme` composable：

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme, skin } = useTheme()

// 切换明暗主题
function handleToggle(event: MouseEvent) {
  toggleTheme(event)
}

// 切换皮肤
function changeSkin(newSkin: SkinPreset) {
  skin.value = newSkin
}
</script>

<template>
  <button @click="handleToggle">切换主题</button>
  <select v-model="skin">
    <option value="default">Default</option>
    <option value="blue">Blue</option>
    <option value="emerald">Emerald</option>
  </select>
</template>
```

### Q：如何添加新的权限？

A：在认证响应中添加权限字符串：

```ts
// types/auth.ts
interface User {
  id: string
  name: string
  email: string
  permissions: string[] // ['users:*', 'posts:view', 'posts:create']
}

// 使用通配符
// 'users:*' - 用户模块所有权限
// '*' - 所有权限
// 'users:view' - 特定权限
```

### Q：如何自定义仪表盘布局？

A：通过 Dashboard Store 管理布局：

```ts
// stores/dashboard.ts
import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', () => {
  const layout = ref([
    { i: 'widget-1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'widget-2', x: 6, y: 0, w: 6, h: 4 },
  ])

  function saveLayout(newLayout: Layout[]) {
    layout.value = newLayout
    // 保存到服务器
  }

  return { layout, saveLayout }
})
```

## 与其他版本对比

| 特性 | Vue | Next.js | Angular |
|------|-----|---------|---------|
| SSR/SSG | ❌ (需要 Nuxt) | ✅ | ✅ (需要 Angular Universal) |
| 状态管理 | Pinia | Zustand | RxJS/Signals |
| 路由 | Vue Router | App Router | Angular Router |
| 构建工具 | Vite | Next.js | Angular CLI |
| 学习曲线 | 中 | 中 | 高 |
| 生态系统 | 丰富 | 丰富 | 企业级 |

## 相关链接

- [在线预览](https://halolight-vue.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-vue)
- [Vue 官方文档](https://vuejs.org)
- [Vite 官方文档](https://vitejs.dev)
- [Pinia 官方文档](https://pinia.vuejs.org)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
