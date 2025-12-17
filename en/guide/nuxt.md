# Nuxt Version

Halolight Nuxt version is built on Nuxt 3 with Vue 3.5 + Composition API + TypeScript, providing an out-of-the-box full-stack development experience.

**Live Preview**: [https://halolight-nuxt.h7ml.cn/](https://halolight-nuxt.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-nuxt](https://github.com/halolight/halolight-nuxt)

## Features

- 🔄 **Auto Import** - Components, composables, and APIs auto-imported with zero config
- 📁 **File-Based Routing** - Automatic routing from the file system
- 🌐 **Full-Stack Development** - Built-in Nitro server, unified frontend and backend
- 🚀 **SSR/SSG/SPA** - Flexible rendering modes
- ⚡ **Vite Powered** - Lightning-fast HMR
- 🔌 **Module Ecosystem** - Rich Nuxt module extensions
- 🎨 **Theme System** - Light/dark theme toggle
- 🔐 **Authentication** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Access Control** - Fine-grained RBAC permission management
- ⌘ **Command Palette** - `⌘/Ctrl + K` quick navigation

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Nuxt | 3.10 | Vue full-stack framework |
| Vue | 3.5+ | Progressive framework |
| TypeScript | 5.7 | Type safety |
| Tailwind CSS | 3.x (CDN) | Atomic CSS |
| Pinia | 0.5 | State management |
| VueUse | 10.x | Composables utility library |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Full-Stack Development**: Built-in Nitro server for unified frontend and backend development
- **Auto Import**: Automatic import of components, composables, and APIs
- **File-Based Routing**: Automatic routing based on file system
- **SSR/SSG**: Optional server-side rendering and static generation
- **Command Palette**: `⌘/Ctrl + K` for quick navigation
- **Hot Reload**: Excellent HMR development experience
- **Module Ecosystem**: Rich Nuxt module extensions

## Directory Structure

```
halolight-nuxt/
├── nuxt.config.ts              # Nuxt configuration
├── app.vue                     # App root component
├── pages/                      # File-based routing
│   ├── index.vue              # Home page
│   ├── login.vue              # Login
│   ├── register.vue           # Register
│   ├── forgot-password.vue    # Forgot password
│   ├── reset-password.vue     # Reset password
│   ├── terms.vue              # Terms of service
│   ├── privacy.vue            # Privacy policy
│   ├── dashboard/             # Dashboard
│   │   └── index.vue
│   ├── users/                 # User management
│   │   └── index.vue
│   ├── messages/              # Messages
│   │   └── index.vue
│   ├── analytics/             # Analytics
│   │   └── index.vue
│   ├── profile/               # User profile
│   │   └── index.vue
│   └── settings/              # System settings
│       └── index.vue
├── components/                 # Auto-imported components
│   └── common/                # Common components
│       ├── AppHeader.vue
│       ├── AppSidebar.vue
│       ├── AppFooter.vue
│       ├── AppTabs.vue
│       ├── CommandMenu.vue
│       └── ToastContainer.vue
├── composables/                # Composable functions
│   ├── useTheme.ts
│   ├── useToast.ts
│   └── useCommandMenu.ts
├── layouts/                    # Layouts
│   ├── default.vue            # Admin layout
│   └── auth.vue               # Auth layout
├── middleware/                 # Middleware
│   └── auth.global.ts
├── plugins/                    # Plugins
│   └── pinia-persist.client.ts
├── stores/                     # Pinia stores
│   ├── auth.ts
│   ├── ui-settings.ts
│   ├── dashboard.ts
│   ├── layout.ts
│   └── tabs.ts
├── utils/                      # Utility functions
│   ├── index.ts
│   └── mock.ts
├── assets/css/                 # Style files
│   ├── main.css
│   └── tailwind.css
├── tests/                      # Test files
│   └── unit/
├── .github/                    # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
└── public/                     # Static assets
```

## Quick Start

### Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

### Installation

```bash
git clone https://github.com/halolight/halolight-nuxt.git
cd halolight-nuxt
pnpm install
```

### Environment Variables

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

### Start Development

```bash
pnpm dev
```

Visit http://localhost:3000

### Build for Production

```bash
pnpm build
pnpm preview
```

## Demo Account

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Core Functionality

### State Management (Pinia)

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
      // Login logic
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

### Data Fetching (useFetch)

```vue
<script setup lang="ts">
// Using useFetch with automatic SSR handling
const { data: users, pending, error, refresh } = await useFetch('/api/users', {
  query: { page: 1, limit: 10 },
})

// Using useAsyncData with custom key
const { data: stats } = await useAsyncData('dashboard-stats', () =>
  $fetch('/api/dashboard/stats')
)
</script>
```

### Access Control

```ts
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Public pages list
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

### Draggable Dashboard

```vue
<script setup lang="ts">
// Dashboard configuration
const dashboardStore = useDashboardStore()
const widgets = computed(() => dashboardStore.widgets)

// Drag implementation
function handleDragEnd(event) {
  dashboardStore.updateLayout(event.newLayout)
}
</script>
```

## Page Routes

| Path | Page | Permission |
|------|------|------------|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot password | Public |
| `/reset-password` | Reset password | Public |
| `/terms` | Terms of service | Public |
| `/privacy` | Privacy policy | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/users` | User management | `users:view` |
| `/messages` | Messages | `messages:view` |
| `/analytics` | Analytics | `analytics:view` |
| `/profile` | User profile | `settings:view` |
| `/settings` | System settings | `settings:view` |

## Environment Variables

### Configuration Example

```bash
# .env
NUXT_PUBLIC_API_BASE=/api
NUXT_PUBLIC_MOCK=true
NUXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NUXT_PUBLIC_DEMO_PASSWORD=123456
NUXT_PUBLIC_SHOW_DEMO_HINT=true
NUXT_PUBLIC_APP_TITLE=Admin Pro
NUXT_PUBLIC_BRAND_NAME=Halolight

# Server private variables
NUXT_JWT_SECRET=your-jwt-secret
NUXT_DATABASE_URL=postgresql://localhost:5432/halolight
```

### Variable Description

| Variable Name | Description | Default |
|---------------|-------------|---------|
| `NUXT_PUBLIC_API_BASE` | API base URL | `/api` |
| `NUXT_PUBLIC_MOCK` | Enable mock data | `true` |
| `NUXT_PUBLIC_APP_TITLE` | App title | `Admin Pro` |
| `NUXT_PUBLIC_BRAND_NAME` | Brand name | `Halolight` |
| `NUXT_PUBLIC_DEMO_EMAIL` | Demo account email | - |
| `NUXT_PUBLIC_DEMO_PASSWORD` | Demo account password | - |
| `NUXT_JWT_SECRET` | JWT secret (server) | - |
| `NUXT_DATABASE_URL` | Database connection (server) | - |

### Usage

```vue
<script setup lang="ts">
// In components
const config = useRuntimeConfig();

// Public variables
const apiBase = config.public.apiBase;

// Private variables (server only)
// const jwtSecret = config.jwtSecret; // Not accessible on client
</script>
```

```typescript
// In server/api
export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const jwtSecret = config.jwtSecret; // Can access private variables
});
```

## Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm dev -o           # Start and open browser

# Build
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm generate         # Static site generation (SSG)

# Checks
pnpm typecheck        # TypeScript type check
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint autofix

# Tests
pnpm test             # Run tests
pnpm test:run         # Single run
pnpm test:coverage    # Coverage report

# Nuxt CLI
npx nuxi add page <name>       # Add page
npx nuxi add component <name>  # Add component
npx nuxi add composable <name> # Add composable
npx nuxi add plugin <name>     # Add plugin
npx nuxi add middleware <name> # Add middleware
npx nuxi add api <name>        # Add API route
npx nuxi upgrade               # Upgrade Nuxt
```

## Testing

```bash
pnpm test           # Run tests (watch mode)
pnpm test:run       # Single run
pnpm test:coverage  # Coverage report
pnpm test:ui        # Vitest UI
```

### Test Example

```typescript
// tests/unit/stores/auth.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have correct initial state', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
    expect(store.token).toBe('')
    expect(store.isAuthenticated).toBe(false)
  })

  it('should login successfully', async () => {
    const store = useAuthStore()
    await store.login({ email: 'admin@halolight.h7ml.cn', password: '123456' })
    expect(store.isAuthenticated).toBe(true)
  })
})
```

## Configuration

### Nuxt Configuration

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

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

Or use the Vercel button for one-click deployment:

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

### Other Platforms

- **Cloudflare Pages**: Configure `nitro.preset: 'cloudflare-pages'`
- **Netlify**: Configure `nitro.preset: 'netlify'`
- **Node.js Server**: `pnpm build && node .output/server/index.mjs`

## CI/CD

Complete GitHub Actions CI workflow configured:

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

## Advanced Features

### Server Routes (API Endpoints)

Nuxt 3 has a built-in Nitro server for creating server-side APIs.

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, limit = 10 } = query;

  // Mock database query
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

  // Protect API routes
  if (url.pathname.startsWith('/api/admin')) {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '');

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    try {
      const user = verifyToken(token);
      event.context.user = user;
    } catch {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token',
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

## Performance Optimization

### Image Optimization

```vue
<script setup lang="ts">
// Using @nuxt/image
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

### Lazy-Load Components

```vue
<script setup lang="ts">
// Lazy-load heavy components
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

### Prefetch

```vue
<script setup lang="ts">
// Prefetch critical data
const { data } = await useFetch('/api/critical-data', {
  key: 'critical',
  lazy: false,
});
</script>
```

## Frequently Asked Questions

### Q: How do I configure SSG (static generation)?

A: Update `nuxt.config.ts`:

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

Run `pnpm generate` to create the static site.

### Q: How do I configure SPA mode?

A: Disable SSR:

```typescript
export default defineNuxtConfig({
  ssr: false,
});
```

### Q: What is the difference between useFetch and $fetch?

A:
- `useFetch` is a composable that automatically handles SSR data syncing
- `$fetch` is the low-level method and does not handle SSR

```vue
<script setup lang="ts">
// Recommended: handles SSR automatically
const { data } = await useFetch('/api/users');

// Manual call
const fetchData = async () => {
  const data = await $fetch('/api/users');
};
</script>
```

### Q: How do I add global CSS?

A: Configure it in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
});
```

### Q: How do I configure a proxy?

A: Use `nitro.routeRules`:

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

### Q: How do I implement authentication?

A: Use middleware + Pinia:

```typescript
// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const publicPages = ['/login', '/register', '/forgot-password'];

  if (!publicPages.includes(to.path) && !authStore.isAuthenticated) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  }
});
```

### Q: How do I optimize bundle size?

A: Optimization suggestions:

```typescript
export default defineNuxtConfig({
  // On-demand component import
  components: {
    dirs: ['~/components'],
    global: false,
  },

  // Experimental features
  experimental: {
    treeshakeClientOnly: true,
  },

  // Vite optimization
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

## Comparison with Other Versions

| Feature | Nuxt Version | Vue Version | Next.js Version |
|---------|--------------|-------------|-----------------|
| State Management | Pinia | Pinia | Zustand |
| Data Fetching | useFetch | Axios | TanStack Query |
| Form Validation | Native | VeeValidate + Zod | React Hook Form + Zod |
| Server | Built-in Nitro | Separate backend | API Routes |
| Styling | Tailwind CDN | Tailwind | Tailwind |
| Routing | File-based routing | Vue Router | App Router |
| SSR | Built-in support | Requires configuration | Built-in support |

## Related Links

- [Live Preview](https://halolight-nuxt.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-nuxt)
- [Nuxt Docs](https://nuxt.com)
- [Nuxt Modules Directory](https://nuxt.com/modules)
- [Nitro Docs](https://nitro.unjs.io)
- [Vue 3 Docs](https://vuejs.org)
- [Pinia Docs](https://pinia.vuejs.org)
- [HaloLight Docs](https://docs.halolight.h7ml.cn)
