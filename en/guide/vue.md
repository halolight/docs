# Vue Version

HaloLight Vue version is built on Vue 3.5 + Vite 7, using Composition API + TypeScript.

**Live Preview**: [https://halolight-vue.h7ml.cn/](https://halolight-vue.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-vue](https://github.com/halolight/halolight-vue)

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Vue | 3.5.x | Progressive framework |
| Vite | 7.x (Rolldown) | Build tool |
| TypeScript | 5.x | Type safety |
| Vue Router | 4.x | Routing |
| Pinia | 2.x | State management |
| TanStack Query | 5.x | Server state |
| VeeValidate | 4.x | Form validation |
| Zod | 3.x | Data validation |
| Tailwind CSS | 4.x | Atomic CSS |
| shadcn-vue | latest | UI component library |
| grid-layout-plus | 1.x | Drag-and-drop layout |
| ECharts | 5.x | Chart visualization |
| Mock.js | 1.x | Data mocking |

## Directory Structure

```
halolight-vue/
├── src/
│   ├── views/                   # Page views
│   │   ├── admin/              # Admin pages
│   │   │   ├── dashboard/      # Dashboard
│   │   │   ├── users/          # User management
│   │   │   ├── roles/          # Role management
│   │   │   ├── permissions/    # Permission management
│   │   │   ├── settings/       # System settings
│   │   │   └── profile/        # User profile
│   │   └── auth/               # Auth pages
│   │       ├── login/
│   │       ├── register/
│   │       ├── forgot-password/
│   │       └── reset-password/
│   ├── components/
│   │   ├── ui/                 # shadcn-vue components (20+)
│   │   ├── layout/             # Layout components
│   │   │   ├── AdminLayout.vue
│   │   │   ├── AuthLayout.vue
│   │   │   ├── Sidebar.vue
│   │   │   ├── Header.vue
│   │   │   └── Footer.vue
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── DashboardGrid.vue
│   │   │   ├── WidgetWrapper.vue
│   │   │   ├── StatsWidget.vue
│   │   │   ├── ChartWidget.vue
│   │   │   └── ...
│   │   └── shared/             # Shared components
│   ├── composables/            # Composable functions
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
│   ├── services/               # API services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── ...
│   ├── router/                 # Router configuration
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── lib/                    # Utility library
│   │   ├── utils.ts
│   │   └── cn.ts
│   ├── types/                  # Type definitions
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── mocks/                  # Mock data
│   │   ├── index.ts
│   │   └── modules/
│   ├── App.vue
│   └── main.ts
├── public/                     # Static assets
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-vue.git
cd halolight-vue
pnpm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

```env
# .env.local example
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
```

### Start Development

```bash
pnpm dev
```

Visit http://localhost:5173

### Build for Production

```bash
pnpm build
pnpm preview
```

## Core Features

### State Management (Pinia)

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

### Data Fetching (TanStack Query)

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

### Permission Directive

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

// Register directive
app.directive('permission', vPermission)
```

```vue
<!-- Usage -->
<button v-permission="'users:delete'">Delete</button>
```

### Permission Component

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
<!-- Usage -->
<PermissionGuard permission="users:delete">
  <DeleteButton />
  <template #fallback>
    <span>No permission</span>
  </template>
</PermissionGuard>
```

### Draggable Dashboard

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

### Theme Toggle (View Transitions)

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

    // Circular reveal animation
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

## Page Routes

| Path | Page | Permission |
|------|------|------------|
| `/` | Redirect to `/dashboard` | - |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot password | Public |
| `/reset-password` | Reset password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/users` | User list | `users:list` |
| `/users/create` | Create user | `users:create` |
| `/users/:id` | User details | `users:view` |
| `/users/:id/edit` | Edit user | `users:update` |
| `/roles` | Role management | `roles:list` |
| `/permissions` | Permission management | `permissions:list` |
| `/settings` | System settings | `settings:view` |
| `/profile` | User profile | Authenticated |

### Route Guards

```ts
// router/index.ts
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Pages requiring authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Permission check
  if (to.meta.permission && !authStore.hasPermission(to.meta.permission)) {
    next({ name: '403' })
    return
  }

  next()
})
```

## UI Components

Based on shadcn-vue, 20+ components integrated:

- **Forms**: Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, DatePicker
- **Data Display**: Table, Card, Badge, Avatar, Progress, Skeleton
- **Feedback**: Dialog, Sheet, AlertDialog, Toast, Tooltip, Popover
- **Navigation**: Tabs, Breadcrumb, Pagination, DropdownMenu, Command
- **Layout**: Accordion, Collapsible, ScrollArea, Separator

## ECharts Integration

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

## Deployment

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

## Comparison with Next.js Version

| Feature | Vue Version | Next.js Version |
|---------|-------------|-----------------|
| State Management | Pinia | Zustand |
| Data Fetching | TanStack Query | TanStack Query |
| Form Validation | VeeValidate + Zod | React Hook Form + Zod |
| Drag-and-Drop | grid-layout-plus | react-grid-layout |
| UI Components | shadcn-vue | shadcn/ui |
| Routing | Vue Router | Next.js App Router |
| SSR | Requires Nuxt | Built-in support |
