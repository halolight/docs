# Authentication System

This document describes the user authentication and permission control implementation for the HaloLight project.

## Authentication Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Login  │ ──► │ Verify  │ ──► │  Get    │ ──► │  Store  │
│  Form   │     │Credentials│     │ Token   │     │  State  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

## Authentication Pages

| Page | Path | Function |
|------|------|------|
| Login | `/login` | Username/password login |
| Register | `/register` | New user registration |
| Forgot Password | `/forgot-password` | Send reset email |
| Reset Password | `/reset-password` | Set new password |

## Token Management

### Dual Token Mechanism

```ts
interface TokenPair {
  accessToken: string   // Short-lived (15 minutes)
  refreshToken: string  // Long-lived (7 days)
}
```

### Token Refresh

```ts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      try {
        const { refreshToken } = useAuthStore.getState()
        const newTokens = await authService.refresh(refreshToken)
        useAuthStore.getState().setTokens(newTokens)
        error.config.headers.Authorization = `Bearer ${newTokens.accessToken}`
        return api(error.config)
      } catch {
        useAuthStore.getState().logout()
      }
    }
    return Promise.reject(error)
  }
)
```

## Permission System

### Permission Format

```ts
// Format: resource:action
const permissions = [
  'users:list',      // View user list
  'users:create',    // Create user
  'users:update',    // Update user
  'users:delete',    // Delete user
  'users:*',         // All user permissions
  '*',               // Super admin
]
```

### Permission Check

```ts
function hasPermission(userPerms: string[], required: string): boolean {
  return userPerms.some((p) =>
    p === '*' ||
    p === required ||
    (p.endsWith(':*') && required.startsWith(p.slice(0, -1)))
  )
}
```

### Permission Component

```tsx
// React
function PermissionGuard({ permission, children, fallback }) {
  const hasPermission = useAuthStore((s) => s.hasPermission)
  return hasPermission(permission) ? children : fallback
}

// Usage
<PermissionGuard permission="users:delete" fallback={null}>
  <DeleteButton />
</PermissionGuard>
```

```vue
<!-- Vue -->
<template>
  <slot v-if="hasPermission(permission)" />
  <slot v-else name="fallback" />
</template>
```

### Permission Directive (Vue)

```ts
// v-permission directive
app.directive('permission', {
  mounted(el, binding) {
    const authStore = useAuthStore()
    if (!authStore.hasPermission(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
})

// Usage
<button v-permission="'users:delete'">Delete</button>
```

## Route Guards

### Next.js Middleware

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
```

### Vue Router Guard

```ts
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.permission && !authStore.hasPermission(to.meta.permission)) {
    next({ name: '403' })
    return
  }

  next()
})
```

## Standard Permission List

```ts
const PERMISSIONS = {
  // Dashboard
  'dashboard:view': 'View dashboard',
  'dashboard:edit': 'Edit dashboard',

  // User Management
  'users:list': 'View user list',
  'users:view': 'View user details',
  'users:create': 'Create user',
  'users:update': 'Update user',
  'users:delete': 'Delete user',

  // Role Management
  'roles:list': 'View role list',
  'roles:create': 'Create role',
  'roles:update': 'Update role',
  'roles:delete': 'Delete role',

  // Permission Management
  'permissions:list': 'View permission list',
  'permissions:assign': 'Assign permissions',

  // System Settings
  'settings:view': 'View settings',
  'settings:update': 'Update settings',
}
```

## Role Presets

```ts
const ROLES = {
  admin: {
    name: 'Administrator',
    permissions: ['*'],
  },
  manager: {
    name: 'Manager',
    permissions: ['dashboard:*', 'users:list', 'users:view'],
  },
  user: {
    name: 'User',
    permissions: ['dashboard:view'],
  },
}
```
