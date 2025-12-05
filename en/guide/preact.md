# Preact Version

HaloLight Preact version is built on Preact + Vite, using Signals + TypeScript to deliver a lightweight, high-performance admin dashboard.

**Live Preview**: [https://halolight-preact.h7ml.cn/](https://halolight-preact.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-preact](https://github.com/halolight/halolight-preact)

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Preact | 10.x | Lightweight React alternative |
| @preact/signals | 2.x | Reactive state management |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 3.4 | Atomic CSS |
| Vite | 7.2 | Build tool |
| preact-router | 4.x | Client-side routing |
| Vitest | 4.0 | Unit testing |
| Testing Library | 3.x | Component testing |
| ESLint | 9.x | Code linting |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Ultra Lightweight**: Core library only 3KB gzip
- **React Compatible**: Can use most React ecosystem
- **Signals**: High-performance reactive state management
- **Fast Startup**: Vite provides ultra-fast dev experience
- **Simple & Direct**: No complex concepts, easy to learn

## Directory Structure

```
halolight-preact/
├── src/
│   ├── pages/                     # Page components
│   │   ├── Home.tsx              # Homepage
│   │   ├── auth/                 # Auth pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── ResetPassword.tsx
│   │   └── dashboard/            # Dashboard pages
│   │       ├── Dashboard.tsx
│   │       ├── Users.tsx
│   │       ├── UserDetail.tsx
│   │       ├── UserCreate.tsx
│   │       ├── Roles.tsx
│   │       ├── Permissions.tsx
│   │       ├── Settings.tsx
│   │       └── Profile.tsx
│   ├── components/               # Component library
│   │   ├── ui/                   # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── dashboard/            # Dashboard components
│   │   │   ├── DashboardGrid.tsx
│   │   │   ├── WidgetWrapper.tsx
│   │   │   └── StatsWidget.tsx
│   │   └── shared/               # Shared components
│   │       └── PermissionGuard.tsx
│   ├── stores/                   # State management
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   └── dashboard.ts
│   ├── hooks/                    # Custom Hooks
│   │   ├── useAuth.ts
│   │   └── usePermission.ts
│   ├── lib/                      # Utilities
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── cn.ts
│   ├── types/                    # Type definitions
│   ├── App.tsx                   # Root component
│   ├── routes.tsx                # Route config
│   └── main.tsx                  # Entry file
├── public/                       # Static assets
├── vite.config.ts               # Vite config
├── tailwind.config.ts           # Tailwind config
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-preact.git
cd halolight-preact
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# .env example
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
```

### Start Development

```bash
pnpm dev
```

Visit http://localhost:5173

### Production Build

```bash
pnpm build
pnpm preview
```

## Core Features

### State Management (@preact/signals)

```tsx
// stores/auth.ts
import { signal, computed, effect } from '@preact/signals'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

// Reactive state
export const user = signal<User | null>(null)
export const token = signal<string | null>(null)
export const loading = signal(false)

// Computed properties
export const isAuthenticated = computed(() => !!token.value && !!user.value)
export const permissions = computed(() => user.value?.permissions ?? [])

// Persistence
effect(() => {
  if (user.value && token.value) {
    localStorage.setItem('auth', JSON.stringify({
      user: user.value,
      token: token.value,
    }))
  }
})

// Initialization
const saved = localStorage.getItem('auth')
if (saved) {
  const { user: savedUser, token: savedToken } = JSON.parse(saved)
  user.value = savedUser
  token.value = savedToken
}

// Methods
export async function login(credentials: { email: string; password: string }) {
  loading.value = true
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    user.value = data.user
    token.value = data.token
  } finally {
    loading.value = false
  }
}

export function logout() {
  user.value = null
  token.value = null
  localStorage.removeItem('auth')
}

export function hasPermission(permission: string): boolean {
  const perms = permissions.value
  return perms.some(p =>
    p === '*' || p === permission ||
    (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
  )
}
```

### Route Configuration

```tsx
// routes.tsx
import Router, { Route } from 'preact-router'
import { isAuthenticated, hasPermission } from './stores/auth'

// Page components
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Users from './pages/dashboard/Users'
// ... more pages

// Route guard HOC
function ProtectedRoute({ component: Component, permission, ...rest }) {
  if (!isAuthenticated.value) {
    route('/login?redirect=' + rest.path)
    return null
  }

  if (permission && !hasPermission(permission)) {
    return <div>No permission</div>
  }

  return <Component {...rest} />
}

export function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute
        path="/dashboard"
        component={Dashboard}
        permission="dashboard:view"
      />
      <ProtectedRoute
        path="/users"
        component={Users}
        permission="users:list"
      />
      {/* More routes */}
    </Router>
  )
}
```

### Data Fetching (TanStack Query)

```tsx
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { token } from '../stores/auth'

export function useUsers(page = 1) {
  return useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await fetch(`/api/users?page=${page}`, {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      return response.json()
    },
    enabled: !!token.value,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

```tsx
// Usage
import { useUsers } from '../hooks/useUsers'

export function UsersPage() {
  const { data, isLoading, error } = useUsers(1)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>

  return (
    <ul>
      {data.data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Permission Component

```tsx
// components/shared/PermissionGuard.tsx
import { ComponentChildren } from 'preact'
import { hasPermission } from '../../stores/auth'

interface Props {
  permission: string
  children: ComponentChildren
  fallback?: ComponentChildren
}

export function PermissionGuard({ permission, children, fallback }: Props) {
  if (!hasPermission(permission)) {
    return fallback ?? null
  }

  return children
}
```

```tsx
// Usage
<PermissionGuard
  permission="users:delete"
  fallback={<span class="text-muted-foreground">No permission</span>}
>
  <Button variant="destructive">Delete</Button>
</PermissionGuard>
```

### Form Handling

```tsx
// pages/auth/Login.tsx
import { useState } from 'preact/hooks'
import { route } from 'preact-router'
import { login, loading } from '../../stores/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')

    try {
      await login({ email, password })
      const params = new URLSearchParams(location.search)
      route(params.get('redirect') || '/dashboard')
    } catch (e) {
      setError('Invalid email or password')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div class="text-destructive">{error}</div>}

      <input
        type="email"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onInput={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
      />

      <button type="submit" disabled={loading.value}>
        {loading.value ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

### Component Example

```tsx
// components/ui/Button.tsx
import { ComponentChildren } from 'preact'
import { cn } from '../../lib/cn'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
  children: ComponentChildren
  onClick?: () => void
}

export function Button({
  variant = 'default',
  size = 'md',
  disabled,
  class: className,
  children,
  onClick,
}: Props) {
  return (
    <button
      class={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90':
            variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90':
            variant === 'destructive',
          'border border-input bg-background hover:bg-accent':
            variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

## Page Routes

| Path | Page | Permission |
|------|------|------|
| `/` | Homepage | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot Password | Public |
| `/reset-password` | Reset Password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/users` | User List | `users:list` |
| `/users/create` | Create User | `users:create` |
| `/users/:id` | User Detail | `users:view` |
| `/roles` | Role Management | `roles:list` |
| `/permissions` | Permission Management | `permissions:list` |
| `/settings` | System Settings | `settings:view` |
| `/profile` | Profile | Logged in |

## Configuration

### Vite Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
})
```

## Deployment

### Static Hosting

```bash
pnpm build
# Deploy dist directory to any static hosting service
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
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

### Vercel

```bash
npx vercel
```

### Cloudflare Pages

Connect GitHub repository directly for automatic deployment.

## Testing

### Test Commands

```bash
# Interactive test (watch mode)
pnpm test

# CI test (single run + coverage)
pnpm test:ci

# Visual test UI
pnpm test:ui
```

### Test File Organization

Test files are placed together with source files, using `.test.ts` or `.test.tsx` suffix:

```
src/components/ui/
├── Button.tsx
├── Button.test.tsx     # Button component test
├── Input.tsx
└── Input.test.tsx      # Input component test
```

### Writing Tests

```tsx
// src/components/ui/Button.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { Button } from './Button'

describe('Button', () => {
  it('renders default button', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click')
  })

  it('renders different variants', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

## CI/CD

The project uses GitHub Actions for continuous integration:

- **Lint**: ESLint code checking
- **Type Check**: TypeScript type checking
- **Test**: Vitest unit tests + coverage report
- **Build**: Production build verification

## Comparison with Other Versions

| Feature | Preact Version | Vue Version | Next.js Version |
|------|------------|----------|--------------|
| State Management | Signals | Pinia | Zustand |
| Data Fetching | Custom Fetch | TanStack Query | TanStack Query |
| Form Validation | Custom | VeeValidate + Zod | React Hook Form + Zod |
| Server-side | None (SPA) | Separate Backend | API Routes |
| Component Library | Custom | shadcn-vue | shadcn/ui |
| Routing | preact-router | Vue Router | App Router |
| Testing Framework | Vitest + Testing Library | Vitest + Testing Library | Jest + Testing Library |
| Bundle Size | ~3KB core | ~33KB | ~85KB |
| React Compatibility | ✅ | ❌ | - |
| CI/CD | GitHub Actions | GitHub Actions | GitHub Actions |
