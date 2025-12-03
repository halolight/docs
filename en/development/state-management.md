# State Management

This document describes the state management patterns for the HaloLight project, covering implementation solutions for different frameworks.

## State Management Solution Comparison

| Framework | State Library | Features |
|------|--------|------|
| React/Next.js | Zustand | Simple, no boilerplate |
| Vue 3 | Pinia | Official recommendation, type-safe |
| Svelte | Svelte Stores | Native reactivity |
| Angular | Signals + RxJS | Fine-grained reactivity |
| Solid.js | createStore | Fine-grained reactivity |

## Store Module Division

```
stores/
├── auth.ts           # Authentication state
├── ui-settings.ts    # UI settings
├── dashboard.ts      # Dashboard layout
├── navigation.ts     # Navigation menu
├── tabs.ts           # Multi-tab page
└── error.ts          # Error state
```

## Auth Store

### State Definition

```ts
interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  permissions: string[]
  roles: string[]
  isAuthenticated: boolean
  isLoading: boolean
}
```

### Zustand Implementation (React)

```ts
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      permissions: [],
      isAuthenticated: false,

      login: async (credentials) => {
        const response = await authService.login(credentials)
        set({
          user: response.user,
          token: response.token,
          permissions: response.permissions,
          isAuthenticated: true,
        })
      },

      hasPermission: (permission) => {
        const { permissions } = get()
        return permissions.some((p) =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    { name: 'auth-storage' }
  )
)
```

### Pinia Implementation (Vue)

```ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const permissions = ref<string[]>([])

  const isAuthenticated = computed(() => !!token.value)

  function hasPermission(permission: string): boolean {
    return permissions.value.some((p) =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  }

  return { user, token, permissions, isAuthenticated, hasPermission }
}, { persist: { paths: ['token', 'user'] } })
```

## Dashboard Store

### Layout State

```ts
interface DashboardState {
  layouts: { lg: GridLayout[]; md: GridLayout[]; sm: GridLayout[] }
  widgets: WidgetConfig[]
  isEditing: boolean
}

interface GridLayout {
  i: string; x: number; y: number; w: number; h: number
}
```

## Persistence Strategy

| Data Type | Storage Location | Example |
|----------|----------|------|
| User Preferences | localStorage | Theme, language |
| UI State | localStorage | Sidebar, layout |
| Temporary Data | sessionStorage | Form drafts |
| Server Data | TanStack Query | API responses |
