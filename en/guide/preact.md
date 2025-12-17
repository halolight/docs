# Preact Version

HaloLight Preact version is built on Preact + Vite, using Signals + TypeScript to deliver a lightweight, high-performance admin dashboard.

**Live Preview**: [https://halolight-preact.h7ml.cn](https://halolight-preact.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-preact](https://github.com/halolight/halolight-preact)

## Features

- 🪶 **Ultra Lightweight** - Core library only 3KB gzip
- ⚡ **High-Performance Signals** - Reactive state management with automatic dependency tracking
- 🎨 **Theme System** - 11 skins, dark/light mode, View Transitions
- 🔐 **Authentication System** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Permission Control** - RBAC fine-grained permission management
- ⚛️ **React Compatible** - Can directly use most React ecosystem libraries
- 🚀 **Fast Startup** - Vite provides ultra-fast dev experience

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Preact | 10.x | Lightweight React alternative |
| @preact/signals | 2.x | Reactive state management |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| shadcn/ui | latest | UI component library (compat layer) |
| Vite | 7.2 | Build tool |
| preact-router | 4.x | Client-side routing |
| TanStack Query | 5.x | Server state |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Signals State Management** - High-performance reactive, automatic dependency tracking, fine-grained updates
- **Permission System** - RBAC permission control, route guards, permission components
- **Theme System** - 11 skins, dark/light mode, View Transitions
- **Data Mocking** - Mock.js + Fetch interception, complete backend simulation
- **React Compatible** - Use React ecosystem libraries through preact/compat

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
│   │   │   └── Dialog.tsx
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
│   ├── mock/                     # Mock data
│   │   ├── index.ts
│   │   └── handlers/
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

### Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

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
# .env
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

**Signals Features**:

- **Fine-grained Updates** - Only updates components that depend on the Signal
- **Automatic Dependency Tracking** - No need to manually declare dependencies
- **No Memoization Needed** - Computed properties are automatically cached
- **Cross-component Communication** - Global state automatically syncs

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

### Permission Control

```tsx
// hooks/usePermission.ts
import { hasPermission } from '../stores/auth'

export function usePermission() {
  return {
    hasPermission,
    can: (permission: string) => hasPermission(permission),
  }
}
```

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
    </Router>
  )
}
```

## Theme System

### Skin Presets

Support 11 preset skins, switch via quick settings panel:

| Skin | Color | CSS Variable |
|------|--------|----------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Amber | Amber | `--primary: 78.3% 0.177 74.21` |
| Rose | Rose | `--primary: 62.8% 0.243 12.48` |
| Slate | Slate | `--primary: 51.4% 0.032 257.42` |
| Zinc | Zinc | `--primary: 50.7% 0.017 285.96` |
| Stone | Stone | `--primary: 53.4% 0.015 69.82` |
| Neutral | Neutral | `--primary: 50.9% 0.016 286.13` |
| Red | Red | `--primary: 55.5% 0.238 25.33` |
| Orange | Orange | `--primary: 72.3% 0.187 56.24` |

### CSS Variables (OKLch)

```css
/* Light mode */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  --secondary: 96.5% 0.006 286.32;
  --secondary-foreground: 21.7% 0.026 285.88;
  --accent: 96.5% 0.006 286.32;
  --accent-foreground: 21.7% 0.026 285.88;
}

/* Dark mode */
.dark {
  --background: 15.5% 0.018 285.88;
  --foreground: 98.3% 0.006 286.32;
  --primary: 74.1% 0.196 275.74;
  --primary-foreground: 21.7% 0.043 286.07;
  --secondary: 20.7% 0.021 286.05;
  --secondary-foreground: 98.3% 0.006 286.32;
}
```

### Theme Switching

```tsx
// stores/ui-settings.ts
import { signal, effect } from '@preact/signals'

export const theme = signal<'light' | 'dark'>('light')
export const skin = signal<string>('default')

// Persistence
effect(() => {
  localStorage.setItem('theme', theme.value)
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
})

effect(() => {
  localStorage.setItem('skin', skin.value)
  document.documentElement.dataset.skin = skin.value
})

// Initialization
theme.value = (localStorage.getItem('theme') as any) || 'light'
skin.value = localStorage.getItem('skin') || 'default'

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

export function setSkin(newSkin: string) {
  skin.value = newSkin
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

## Common Commands

```bash
pnpm dev            # Start dev server
pnpm build          # Production build
pnpm preview        # Preview production build
pnpm lint           # Code linting
pnpm lint:fix       # Auto fix
pnpm type-check     # Type checking
pnpm test           # Run tests
pnpm test:coverage  # Test coverage
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-preact)

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

```bash
docker build -t halolight-preact .
docker run -p 80:80 halolight-preact
```

### Other Platforms

- [Cloudflare Pages](/en/guide/cloudflare)
- [Netlify](/en/guide/netlify)
- [AWS Amplify](/en/guide/aws)
- [Azure Static Web Apps](/en/guide/azure)

## Demo Accounts

| Role | Email | Password |
|------|------|------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Testing

### Test Commands

```bash
pnpm test           # Run tests (watch mode)
pnpm test:run       # Single run
pnpm test:coverage  # Coverage report
pnpm test:ui        # Vitest UI
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

### Test Example

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

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## Configuration

### Vite Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // React compatibility
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/hooks'],
          router: ['preact-router'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
})
```

### Tailwind Configuration

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

## CI/CD

The project is configured with complete GitHub Actions CI workflow:

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
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
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
        required
      />

      <input
        type="password"
        value={password}
        onInput={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={loading.value}>
        {loading.value ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

## Performance Optimization

### Lazy Loading Components

```tsx
// App.tsx
import { lazy, Suspense } from 'preact/compat'

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Users = lazy(() => import('./pages/dashboard/Users'))

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={Users} />
      </Router>
    </Suspense>
  )
}
```

### Code Splitting

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/hooks'],
          router: ['preact-router'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
})
```

### Signals Optimization

```tsx
// Use computed to avoid redundant calculations
import { signal, computed } from '@preact/signals'

const items = signal([1, 2, 3, 4, 5])
const filter = signal('all')

// Computed properties are automatically cached
const filteredItems = computed(() => {
  if (filter.value === 'all') return items.value
  return items.value.filter(item => item > 2)
})

// Usage in component
function ItemList() {
  return (
    <ul>
      {filteredItems.value.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
```

## FAQ

### Q: How to use React ecosystem libraries?

A: Preact provides React compatibility through `preact/compat`, most React libraries can be used directly:

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
})
```

### Q: How do Signals work with React Hooks?

A: Signals can be used directly in components without useState:

```tsx
import { signal } from '@preact/signals'

const count = signal(0)

function Counter() {
  // Use signal.value directly
  return (
    <button onClick={() => count.value++}>
      Count: {count.value}
    </button>
  )
}
```

### Q: How to optimize first screen loading?

A: Use code splitting and lazy loading:

```tsx
import { lazy, Suspense } from 'preact/compat'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Comparison with Other Versions

| Feature | Preact | Next.js | Vue |
|------|--------|---------|-----|
| SSR/SSG | ❌ (SPA) | ✅ | ✅ (Nuxt) |
| State Management | Signals | Zustand | Pinia |
| Routing | preact-router | App Router | Vue Router |
| Build Tool | Vite | Next.js | Vite |
| Bundle Size | ~3KB | ~85KB | ~33KB |
| React Compatibility | ✅ | - | ❌ |
| Learning Curve | Low | Medium | Medium |

## Related Links

- [Live Preview](https://halolight-preact.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-preact)
- [Preact Official Docs](https://preactjs.com)
- [Signals Documentation](https://preactjs.com/guide/v10/signals)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
