# Implementation Guide

This guide helps developers create new framework version implementations for HaloLight.

## Shared Constraints

- **Data Mocking**: Use Mock.js with `fetch` interception, aligned with `halolight/src/mock` behavior (response format, delay, error codes)
- **Authentication Flow**: Login/register/forgot password/reset password reference `halolight/src/app/(auth)` page flows and validation logic
- **Environment Variables**: All frameworks reuse the same variable naming (e.g. `*_API_URL`, `*_USE_MOCK`, `*_DEMO_*`, `*_BRAND_NAME`) for documentation consistency
- **CI/CD & Testing**: Use common workflow (lint + type-check + test + build + security), retain unit tests and coverage tasks

## Implementation Checklist

### Phase 1: Project Initialization

- [ ] Create project using framework CLI
- [ ] Configure TypeScript
- [ ] Install Tailwind CSS
- [ ] Install corresponding shadcn/ui version
- [ ] Configure environment variables
- [ ] Setup path alias (`@/`)

### Phase 2: Basic Architecture

- [ ] Create directory structure
- [ ] Implement API service layer
- [ ] Configure TanStack Query
- [ ] Setup Mock.js fetch interception (reuse `halolight/src/mock` data structure)
- [ ] Implement state management Store

### Phase 3: Authentication System

- [ ] Login/register/forgot password/reset password pages (reference Next.js version interaction)
- [ ] Auth Store (with Token persistence)
- [ ] Route guards
- [ ] Permission checks (page-level and button-level)

### Phase 4: Layout Components

- [ ] AdminLayout
- [ ] AuthLayout
- [ ] Sidebar
- [ ] Header
- [ ] Footer
- [ ] Breadcrumb
- [ ] TabsNav

### Phase 5: Core Pages

- [ ] Dashboard (draggable dashboard)
- [ ] User Management (CRUD)
- [ ] Role Management
- [ ] Permission Management
- [ ] System Settings
- [ ] User Profile

### Phase 6: Enhanced Features

- [ ] Theme switching
- [ ] Skin presets
- [ ] Internationalization (optional)
- [ ] Responsive adaptation
- [ ] Error boundaries
- [ ] CI/CD (lint, type-check, test, build, security) and coverage reports

## Quick Start

### 1. Create Project

```bash
# Next.js
npx create-next-app@latest halolight --typescript --tailwind --app

# Vue
npm create vue@latest halolight-vue

# SvelteKit
npx sv create halolight-svelte

# Angular
ng new halolight-angular --routing --style=scss
```

### 2. Install Dependencies

```bash
# Common dependencies
npm install axios @tanstack/react-query zustand
npm install -D tailwindcss postcss autoprefixer

# shadcn/ui
npx shadcn@latest init
```

### 3. Directory Structure

```
src/
├── app/              # Pages
├── components/
│   ├── ui/          # shadcn components
│   ├── layout/      # Layout components
│   └── dashboard/   # Dashboard components
├── hooks/           # Custom hooks
├── stores/          # State management
├── services/        # API services
├── lib/             # Utility functions
├── types/           # Type definitions
└── mocks/           # Mock data
```

## Framework Comparison Table

### Component Syntax

| Concept | React | Vue | Svelte |
|------|-------|-----|--------|
| Component | `function Component()` | `<script setup>` | `<script>` |
| Props | `props: Props` | `defineProps<Props>()` | `export let prop` |
| State | `useState()` | `ref()` | `let state = $state()` |
| Computed | `useMemo()` | `computed()` | `$derived()` |
| Side Effect | `useEffect()` | `watch()` | `$effect()` |
| Context | `useContext()` | `provide/inject` | `setContext()` |

### Routing

| Concept | Next.js | Vue Router | SvelteKit |
|------|---------|------------|-----------|
| File Routing | `app/page.tsx` | - | `routes/+page.svelte` |
| Dynamic Route | `[id]/page.tsx` | `:id` | `[id]/+page.svelte` |
| Layout | `layout.tsx` | - | `+layout.svelte` |
| Guard | `middleware.ts` | `beforeEach` | `+page.server.ts` |

### State Management

| Framework | Recommended Solution | Persistence |
|------|----------|--------|
| React | Zustand | zustand/middleware |
| Vue | Pinia | pinia-plugin-persistedstate |
| Svelte | Svelte Stores | - |
| Angular | Signals | localStorage |

## API Module Template

```ts
// services/users.ts
import { api } from './api'

export const userService = {
  getList: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
}
```

## Query Hook Template

```ts
// hooks/useUsers.ts
export function useUsers(params) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(params),
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

## Store Template

```ts
// stores/auth.ts
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        const response = await authService.login(credentials)
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      hasPermission: (permission) => {
        const { permissions } = get().user || {}
        return permissions?.includes(permission) || permissions?.includes('*')
      },
    }),
    { name: 'auth' }
  )
)
```

## Testing Checklist

### Functional Testing

- [ ] Login/logout flow
- [ ] Permission control effective
- [ ] Dashboard drag and save
- [ ] Theme switching works
- [ ] Skin switching works
- [ ] Responsive layout
- [ ] Data table operations
- [ ] Form submission validation

### Compatibility Testing

- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest
- [ ] Mobile browsers

## Code Standards

### Naming Conventions

| Type | Standard | Example |
|------|------|------|
| Component | PascalCase | `UserCard.tsx` |
| Hook | camelCase + use | `useUsers.ts` |
| Store | camelCase + use | `useAuthStore.ts` |
| Service | camelCase + Service | `userService.ts` |
| Type | PascalCase | `User`, `UserQueryParams` |
| Constant | UPPER_SNAKE | `API_BASE_URL` |

### File Organization

```
# Component directory
components/
└── UserCard/
    ├── index.tsx          # Main component
    ├── UserCard.types.ts  # Type definitions
    └── useUserCard.ts     # Component logic

# Page directory
app/users/
├── page.tsx               # List page
├── [id]/
│   └── page.tsx          # Detail page
└── create/
    └── page.tsx          # Create page
```

## Reference Resources

- [Next.js Implementation](https://github.com/halolight/halolight)
- [Vue Implementation](https://github.com/halolight/halolight-vue)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)
