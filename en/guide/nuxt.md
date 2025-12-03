# Nuxt Version

Halolight Nuxt version is built on Nuxt 3 with Vue 3.5 + Composition API + TypeScript, providing an out-of-the-box full-stack development experience.

**Live Preview**: [https://halolight-nuxt.h7ml.cn/](https://halolight-nuxt.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-nuxt](https://github.com/halolight/halolight-nuxt)

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
# .env example
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

### Code Checking and Testing

```bash
# Type checking
pnpm typecheck

# Code linting
pnpm lint
pnpm lint:fix

# Run tests
pnpm test
pnpm test:run
pnpm test:coverage
```

## Demo Account

- Email: `admin@halolight.h7ml.cn`
- Password: `123456`

## Core Features

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

### Authentication Middleware

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

### Data Fetching

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

## Page Routes

| Path | Page | Layout |
|------|------|--------|
| `/` | Home | - |
| `/login` | Login | auth |
| `/register` | Register | auth |
| `/forgot-password` | Forgot password | auth |
| `/reset-password` | Reset password | auth |
| `/terms` | Terms of service | auth |
| `/privacy` | Privacy policy | auth |
| `/dashboard` | Dashboard | default |
| `/users` | User management | default |
| `/messages` | Messages | default |
| `/analytics` | Analytics | default |
| `/profile` | User profile | default |
| `/settings` | System settings | default |

### Route Configuration

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

### Node.js Server

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
