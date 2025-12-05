# Vue 版本

HaloLight Vue 版本基于 Vue 3.5 + Vite 7 构建，采用 Composition API + TypeScript。

**在线预览**：[https://halolight-vue.h7ml.cn/](https://halolight-vue.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-vue](https://github.com/halolight/halolight-vue)

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

## 目录结构

```
halolight-vue/
├── src/
│   ├── views/                   # 页面视图
│   │   ├── admin/              # 管理后台页面
│   │   │   ├── dashboard/      # 仪表盘
│   │   │   ├── users/          # 用户管理
│   │   │   ├── roles/          # 角色管理
│   │   │   ├── permissions/    # 权限管理
│   │   │   ├── settings/       # 系统设置
│   │   │   └── profile/        # 个人中心
│   │   └── auth/               # 认证页面
│   │       ├── login/
│   │       ├── register/
│   │       ├── forgot-password/
│   │       └── reset-password/
│   ├── components/
│   │   ├── ui/                 # shadcn-vue 组件 (20+)
│   │   ├── layout/             # 布局组件
│   │   │   ├── AdminLayout.vue
│   │   │   ├── AuthLayout.vue
│   │   │   ├── Sidebar.vue
│   │   │   ├── Header.vue
│   │   │   └── Footer.vue
│   │   ├── dashboard/          # 仪表盘组件
│   │   │   ├── DashboardGrid.vue
│   │   │   ├── WidgetWrapper.vue
│   │   │   ├── StatsWidget.vue
│   │   │   ├── ChartWidget.vue
│   │   │   └── ...
│   │   └── shared/             # 共享组件
│   ├── composables/            # 组合式函数
│   │   ├── useUsers.ts
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   └── ...
│   ├── stores/                 # Pinia Stores
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   ├── dashboard.ts
│   │   ├── navigation.ts
│   │   └── tabs.ts
│   ├── services/               # API 服务
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── ...
│   ├── router/                 # 路由配置
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── lib/                    # 工具库
│   │   ├── utils.ts
│   │   └── cn.ts
│   ├── types/                  # 类型定义
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── mocks/                  # Mock 数据
│   │   ├── index.ts
│   │   └── modules/
│   ├── App.vue
│   └── main.ts
├── public/                     # 静态资源
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 快速开始

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
# .env.local 示例
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
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

### 权限指令

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
<!-- 使用 -->
<button v-permission="'users:delete'">删除</button>
```

### 权限组件

```vue
<!-- components/PermissionGuard.vue -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  permission: string
}>()

const authStore = useAuthStore()
const hasPermission = computed(() => authStore.hasPermission(props.permission))
</script>

<template>
  <slot v-if="hasPermission" />
  <slot v-else name="fallback" />
</template>
```

```vue
<!-- 使用 -->
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

### 主题切换 (View Transitions)

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
| `/users` | 用户列表 | `users:list` |
| `/users/create` | 创建用户 | `users:create` |
| `/users/:id` | 用户详情 | `users:view` |
| `/users/:id/edit` | 编辑用户 | `users:update` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

### 路由守卫

```ts
// router/index.ts
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
```

## UI 组件

基于 shadcn-vue，已集成 20+ 组件：

- **表单**：Button，Input，Textarea，Select，Checkbox，RadioGroup，Switch，Slider，DatePicker
- **数据展示**：Table，Card，Badge，Avatar，Progress，Skeleton
- **反馈**：Dialog，Sheet，AlertDialog，Toast，Tooltip，Popover
- **导航**：Tabs，Breadcrumb，Pagination，DropdownMenu，Command
- **布局**：Accordion，Collapsible，ScrollArea，Separator

## ECharts 集成

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
  // ... chart options
}))
</script>

<template>
  <VChart :option="option" autoresize />
</template>
```

## 部署

### Vercel

```bash
vercel
```

### Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/halolight-vue/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
    }
}
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 与 Next.js 版本对比

| 功能 | Vue 版本 | Next.js 版本 |
|------|----------|--------------|
| 状态管理 | Pinia | Zustand |
| 数据获取 | TanStack Query | TanStack Query |
| 表单验证 | VeeValidate + Zod | React Hook Form + Zod |
| 拖拽布局 | grid-layout-plus | react-grid-layout |
| 组件库 | shadcn-vue | shadcn/ui |
| 路由 | Vue Router | Next.js App Router |
| SSR | 需要 Nuxt | 内置支持 |
