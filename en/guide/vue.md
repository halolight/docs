# Vue Version

HaloLight Vue version is built on Vue 3.5 + Vite 7, using Composition API + TypeScript.

**Live Preview**: [https://halolight-vue.h7ml.cn/](https://halolight-vue.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-vue](https://github.com/halolight/halolight-vue)

## Features

- 🏗️ **Composition API** - Vue 3.5 Composition API for flexible logic reuse
- ⚡ **Vite 7 + Rolldown** - Lightning-fast HMR, Rust-powered build tool
- 🎨 **Theme System** - 11 skins, light/dark mode, View Transitions
- 🔐 **Authentication** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Permission Control** - Fine-grained RBAC permission management
- 📑 **Multi-Tab** - Tab bar management
- ⌘ **Command Palette** - Keyboard shortcuts navigation

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

## Core Features

- **Configurable Dashboard** - 9 widgets, drag-and-drop layout, responsive adaptation
- **Multi-Tab Navigation** - Browser-style tabs, context menu, state caching
- **Permission System** - RBAC permission control, route guards, permission components
- **Theme System** - 11 skins, light/dark mode, View Transitions
- **Multi-Account Switching** - Quick account switching, remember login state
- **Command Palette** - Keyboard shortcuts (⌘K), global search
- **Real-time Notifications** - WebSocket push, notification center

## Directory Structure

```
halolight-vue/
├── src/
│   ├── views/               # Page views
│   │   ├── (auth)/         # Auth pages
│   │   └── (dashboard)/    # Dashboard pages
│   ├── components/         # Components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Layout components
│   │   └── dashboard/      # Dashboard components
│   ├── composables/        # Composable functions
│   ├── stores/             # Pinia state management
│   ├── lib/                # Utility library
│   ├── mocks/              # Mock data
│   └── types/              # Type definitions
├── public/                 # Static assets
├── vite.config.ts
└── package.json
```

## Quick Start

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

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
# .env.local
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=false
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
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

## Demo Account

| Role | Email | Password |
|------|------|----------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Core Functionality

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

### Permission Control

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

// Register directive
app.directive('permission', vPermission)
```

```vue
<!-- Use permission directive -->
<button v-permission="'users:delete'">Delete</button>

<!-- Use permission component -->
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

## Theme System

### Skin Presets

Supports 11 preset skins, switchable via quick settings panel:

| Skin | Primary Color | CSS Variable |
|------|---------------|--------------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Orange | Orange | `--primary: 69.7% 0.196 49.27` |
| Rose | Rose | `--primary: 63.4% 0.243 357.61` |
| Amber | Amber | `--primary: 79.1% 0.177 77.54` |
| Cyan | Cyan | `--primary: 74.4% 0.167 197.13` |
| Violet | Violet | `--primary: 57.2% 0.267 285.75` |
| Lime | Lime | `--primary: 78.8% 0.184 127.38` |
| Pink | Pink | `--primary: 70.9% 0.254 347.58` |
| Teal | Teal | `--primary: 67.8% 0.157 181.02` |

### CSS Variables (OKLch)

```css
/* Example variable definitions */
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

### Theme Toggle

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
| `/users` | User management | `users:view` |
| `/analytics` | Analytics | `analytics:view` |
| `/calendar` | Calendar | `calendar:view` |
| `/documents` | Documents | `documents:view` |
| `/files` | File storage | `files:view` |
| `/messages` | Messages | `messages:view` |
| `/notifications` | Notifications | `notifications:view` |
| `/settings` | System settings | `settings:view` |
| `/profile` | User profile | `settings:view` |

## Environment Variables

### Configuration Example

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

### Variable Description

| Variable Name | Description | Default Value |
|---------------|-------------|---------------|
| `VITE_API_URL` | API base path | `/api` |
| `VITE_USE_MOCK` | Whether to use Mock data | `true` |
| `VITE_DEMO_EMAIL` | Demo account email | `admin@halolight.h7ml.cn` |
| `VITE_DEMO_PASSWORD` | Demo account password | `123456` |
| `VITE_SHOW_DEMO_HINT` | Whether to show demo hint | `false` |
| `VITE_APP_TITLE` | Application title | `Admin Pro` |
| `VITE_BRAND_NAME` | Brand name | `Halolight` |

### Usage

```ts
// Use in code
const apiUrl = import.meta.env.VITE_API_URL
const useMock = import.meta.env.VITE_USE_MOCK === 'true'
const appTitle = import.meta.env.VITE_APP_TITLE
```

## Common Commands

```bash
pnpm dev            # Start development server
pnpm build          # Production build
pnpm preview        # Preview production build
pnpm lint           # Code linting
pnpm lint:fix       # Auto-fix
pnpm type-check     # Type checking
pnpm test           # Run tests
pnpm test:coverage  # Test coverage
```

## Testing

```bash
pnpm test           # Run tests (watch mode)
pnpm test:run       # Run once
pnpm test:coverage  # Coverage report
pnpm test:ui        # Vitest UI
```

### Test Example

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

## Configuration

### Vite Configuration

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

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-vue)

### Docker

```bash
docker build -t halolight-vue .
docker run -p 3000:3000 halolight-vue
```

### Other Platforms

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## CI/CD

The project is configured with a complete GitHub Actions CI workflow:

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

## Advanced Features

### ECharts Integration

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

### Route Guards

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

export default router
```

## Performance Optimization

### Image Optimization

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
    alt="Responsive image"
  >
</template>
```

### Lazy Load Components

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

### Preloading

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Preload commonly used routes
  router.resolve({ name: 'users' })
  router.resolve({ name: 'settings' })
})
</script>
```

## FAQ

### Q: How to switch themes?

A: Use the `useTheme` composable:

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme, skin } = useTheme()

// Toggle light/dark theme
function handleToggle(event: MouseEvent) {
  toggleTheme(event)
}

// Change skin
function changeSkin(newSkin: SkinPreset) {
  skin.value = newSkin
}
</script>

<template>
  <button @click="handleToggle">Toggle Theme</button>
  <select v-model="skin">
    <option value="default">Default</option>
    <option value="blue">Blue</option>
    <option value="emerald">Emerald</option>
  </select>
</template>
```

### Q: How to add new permissions?

A: Add permission strings in the authentication response:

```ts
// types/auth.ts
interface User {
  id: string
  name: string
  email: string
  permissions: string[] // ['users:*', 'posts:view', 'posts:create']
}

// Using wildcards
// 'users:*' - All permissions for user module
// '*' - All permissions
// 'users:view' - Specific permission
```

### Q: How to customize dashboard layout?

A: Manage layout through Dashboard Store:

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
    // Save to server
  }

  return { layout, saveLayout }
})
```

## Comparison with Other Versions

| Feature | Vue | Next.js | Angular |
|---------|-----|---------|---------|
| SSR/SSG | ❌ (Requires Nuxt) | ✅ | ✅ (Requires Angular Universal) |
| State Management | Pinia | Zustand | RxJS/Signals |
| Routing | Vue Router | App Router | Angular Router |
| Build Tool | Vite | Next.js | Angular CLI |
| Learning Curve | Medium | Medium | High |
| Ecosystem | Rich | Rich | Enterprise |

## Related Links

- [Live Preview](https://halolight-vue.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-vue)
- [Vue Official Docs](https://vuejs.org)
- [Vite Official Docs](https://vitejs.dev)
- [Pinia Official Docs](https://pinia.vuejs.org)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
