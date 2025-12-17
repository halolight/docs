# Qwik Version

HaloLight Qwik version is built on Qwik City, featuring Qwik resumability architecture + TypeScript for zero hydration and ultimate performance.

**Live Preview**: [https://halolight-qwik.h7ml.cn](https://halolight-qwik.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-qwik](https://github.com/halolight/halolight-qwik)

## Features

- 🔄 **Resumability** - No hydration needed, server state directly resumed
- ⚡ **Lazy Load Everything** - Code loaded on demand, minimal initial JS (~1KB)
- 🎨 **Theme System** - 11 skins, dark mode, View Transitions
- 🔐 **Authentication** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Permission Control** - RBAC fine-grained permission management
- 📡 **Signals** - Fine-grained reactive system
- 🌐 **Edge Deployment** - Native support for Cloudflare Workers and other edge platforms

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Qwik | 2.x | Resumable framework |
| Qwik City | 2.x | Full-stack framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| Qwik UI | latest | UI component library |
| Modular Forms | latest | Form handling |
| Zod | 3.x | Data validation |
| ECharts | 5.x | Chart visualization |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Configurable Dashboard** - 9 widgets, drag & drop layout, responsive adaptation
- **Permission System** - RBAC permission control, route guards, permission components
- **Theme System** - 11 skins, dark mode, View Transitions
- **Server-side Rendering** - Built-in SSR support, SEO optimization
- **File-based Routing** - Directory-based routing system
- **Real-time Notifications** - WebSocket push, notification center

## Directory Structure

```
halolight-qwik/
├── src/
│   ├── routes/                    # File-based routing
│   │   ├── index.tsx            # Home
│   │   ├── layout.tsx           # Root layout
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── index.tsx
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (dashboard)/         # Dashboard route group
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── index.tsx
│   │   │   ├── users/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── create/
│   │   │   │   └── [id]/
│   │   │   ├── roles/
│   │   │   ├── permissions/
│   │   │   ├── settings/
│   │   │   └── profile/
│   │   └── api/                 # API endpoints
│   │       └── auth/
│   │           └── login/
│   │               └── index.ts
│   ├── components/              # Component library
│   │   ├── ui/                  # Qwik UI components
│   │   ├── layout/              # Layout components
│   │   │   ├── admin-layout/
│   │   │   ├── auth-layout/
│   │   │   ├── sidebar/
│   │   │   └── header/
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── dashboard-grid/
│   │   │   ├── widget-wrapper/
│   │   │   └── stats-widget/
│   │   └── shared/              # Shared components
│   │       └── permission-guard/
│   ├── stores/                  # State management
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   └── dashboard.ts
│   ├── lib/                     # Utilities
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── cn.ts
│   ├── mock/                    # Mock data
│   └── types/                   # Type definitions
├── public/                      # Static assets
├── vite.config.ts              # Vite config
├── tailwind.config.ts          # Tailwind config
└── package.json
```

## Quick Start

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

### Installation

```bash
git clone https://github.com/halolight/halolight-qwik.git
cd halolight-qwik
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
pnpm serve
```

## Core Features

### State Management (Context + Signals)

```tsx
// stores/auth.ts
import {
  createContextId,
  useContext,
  useStore,
  useComputed$,
  $,
  type Signal,
} from '@builder.io/qwik'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export const AuthContext = createContextId<AuthState>('auth')

export function useAuth() {
  const state = useContext(AuthContext)

  const isAuthenticated = useComputed$(() => !!state.token && !!state.user)
  const permissions = useComputed$(() => state.user?.permissions ?? [])

  const login = $(async (credentials: { email: string; password: string }) => {
    state.loading = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      state.user = data.user
      state.token = data.token
    } finally {
      state.loading = false
    }
  })

  const logout = $(() => {
    state.user = null
    state.token = null
  })

  const hasPermission = $((permission: string) => {
    const perms = state.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  })

  return {
    state,
    isAuthenticated,
    permissions,
    login,
    logout,
    hasPermission,
  }
}
```

### Data Fetching (routeLoader$)

```tsx
// routes/(dashboard)/users/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'

export const useUsers = routeLoader$(async ({ query, cookie, status }) => {
  const token = cookie.get('token')?.value
  const page = Number(query.get('page')) || 1

  // Permission check
  const user = await validateToken(token)
  if (!hasPermission(user, 'users:list')) {
    status(403)
    return { error: 'No permission to access' }
  }

  const response = await fetch(`/api/users?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.json()
})

export default component$(() => {
  const users = useUsers()

  return (
    <div>
      <h1>User List</h1>

      {users.value.error ? (
        <div class="text-destructive">{users.value.error}</div>
      ) : (
        <ul>
          {users.value.data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
})
```

### Permission Control

#### Route Guards

```tsx
// routes/(dashboard)/layout.tsx
import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { useAuth } from '~/stores/auth'
import { AdminLayout } from '~/components/layout/admin-layout'

export const useAuthGuard = routeLoader$(async ({ cookie, redirect, url }) => {
  const token = cookie.get('token')?.value

  if (!token) {
    throw redirect(302, `/login?redirect=${url.pathname}`)
  }

  // Validate token and return user info
  return {
    user: await validateToken(token),
  }
})

export default component$(() => {
  const data = useAuthGuard()

  return (
    <AdminLayout user={data.value.user}>
      <Slot />
    </AdminLayout>
  )
})
```

#### Permission Component

```tsx
// components/shared/permission-guard/index.tsx
import { component$, Slot, useComputed$ } from '@builder.io/qwik'
import { useAuth } from '~/stores/auth'

interface Props {
  permission: string
}

export const PermissionGuard = component$<Props>(({ permission }) => {
  const { hasPermission } = useAuth()

  const allowed = useComputed$(async () => {
    return await hasPermission(permission)
  })

  return (
    <>
      {allowed.value ? (
        <Slot />
      ) : (
        <Slot name="fallback" />
      )}
    </>
  )
})

// Usage
<PermissionGuard permission="users:delete">
  <Button variant="destructive" q:slot="">Delete</Button>
  <span q:slot="fallback" class="text-muted-foreground">No Permission</span>
</PermissionGuard>
```

### Form Submission (routeAction$)

```tsx
// routes/(auth)/login/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeAction$, zod$, z, Form } from '@builder.io/qwik-city'

export const useLogin = routeAction$(
  async (data, { cookie, redirect, fail }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        return fail(401, { message: 'Invalid email or password' })
      }

      const result = await response.json()

      cookie.set('token', result.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })

      throw redirect(302, '/dashboard')
    } catch (e) {
      return fail(500, { message: 'Server error' })
    }
  },
  zod$({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
)

export default component$(() => {
  const action = useLogin()

  return (
    <Form action={action}>
      {action.value?.failed && (
        <div class="text-destructive">{action.value.message}</div>
      )}

      <input type="email" name="email" placeholder="Email" />
      {action.value?.fieldErrors?.email && (
        <span class="text-destructive">{action.value.fieldErrors.email}</span>
      )}

      <input type="password" name="password" placeholder="Password" />
      {action.value?.fieldErrors?.password && (
        <span class="text-destructive">{action.value.fieldErrors.password}</span>
      )}

      <button type="submit" disabled={action.isRunning}>
        {action.isRunning ? 'Logging in...' : 'Login'}
      </button>
    </Form>
  )
})
```

### API Routes

```ts
// routes/api/auth/login/index.ts
import type { RequestHandler } from '@builder.io/qwik-city'

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const body = await parseBody()
  const { email, password } = body as { email: string; password: string }

  // Validation logic
  if (!email || !password) {
    json(400, { success: false, message: 'Email and password are required' })
    return
  }

  // Authentication logic...

  json(200, {
    success: true,
    user: { id: 1, name: 'Admin', email },
    token: 'mock_token',
  })
}
```

### Draggable Dashboard

```tsx
// components/dashboard/dashboard-grid/index.tsx
import { component$, useSignal, useStore, $ } from '@builder.io/qwik'

interface Widget {
  id: string
  type: string
  x: number
  y: number
  w: number
  h: number
}

export const DashboardGrid = component$(() => {
  const widgets = useStore<Widget[]>([
    { id: '1', type: 'stats', x: 0, y: 0, w: 3, h: 2 },
    { id: '2', type: 'chart', x: 3, y: 0, w: 6, h: 4 },
  ])

  const handleLayoutChange = $((newLayout: Widget[]) => {
    widgets.splice(0, widgets.length, ...newLayout)
  })

  return (
    <div class="dashboard-grid">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          class="widget"
          style={{
            gridColumn: `${widget.x + 1} / span ${widget.w}`,
            gridRow: `${widget.y + 1} / span ${widget.h}`,
          }}
        >
          {/* Widget content */}
        </div>
      ))}
    </div>
  )
})
```

## Theme System

### Skin Presets

Supports 11 preset skins, switchable through quick settings panel:

| Skin | Primary Color | CSS Variable |
|------|--------|----------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Rose | Rose | `--primary: 61.8% 0.238 12.57` |
| Orange | Orange | `--primary: 68.3% 0.199 36.35` |
| Yellow | Yellow | `--primary: 88.1% 0.197 95.45` |
| Violet | Violet | `--primary: 57.8% 0.24 305.4` |
| Cyan | Cyan | `--primary: 73.8% 0.139 196.85` |
| Pink | Pink | `--primary: 72.2% 0.218 345.82` |
| Lime | Lime | `--primary: 79.2% 0.183 123.7` |
| Amber | Amber | `--primary: 82.5% 0.157 62.24` |

### CSS Variables (OKLch)

```css
/* Global variable definitions */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 98% 0 0;
  --secondary: 96.1% 0 0;
  --secondary-foreground: 9.8% 0 0;
  --muted: 95.1% 0.01 286.38;
  --muted-foreground: 45.1% 0.009 285.88;
  --accent: 95.1% 0.01 286.38;
  --accent-foreground: 9.8% 0 0;
  --destructive: 54.3% 0.227 25.78;
  --destructive-foreground: 98% 0 0;
  --border: 89.8% 0.006 286.32;
  --input: 89.8% 0.006 286.32;
  --ring: 51.1% 0.262 276.97;
  --radius: 0.5rem;
}

.dark {
  --background: 0% 0 0;
  --foreground: 98% 0 0;
  --primary: 59.6% 0.262 276.97;
  --primary-foreground: 14.9% 0.017 285.75;
  /* ... */
}
```

## Page Routes

| Path | Page | Permission |
|------|------|------|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot Password | Public |
| `/reset-password` | Reset Password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/users` | User List | `users:list` |
| `/users/create` | Create User | `users:create` |
| `/users/[id]` | User Details | `users:view` |
| `/roles` | Role Management | `roles:list` |
| `/permissions` | Permission Management | `permissions:list` |
| `/settings` | System Settings | `settings:view` |
| `/profile` | Profile | Authenticated |

## Common Commands

```bash
pnpm dev            # Start development server
pnpm build          # Production build
pnpm serve          # Preview production build
pnpm lint           # Code linting
pnpm lint:fix       # Auto-fix linting issues
pnpm type-check     # Type checking
pnpm test           # Run tests
pnpm test:e2e       # E2E tests
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-qwik)

```bash
# Use Vercel Edge adapter
pnpm add -D @builder.io/qwik-city/adapters/vercel-edge
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json .
RUN npm install --production
EXPOSE 3000
CMD ["node", "server/entry.express.js"]
```

### Other Platforms

- **Node.js Server**
  ```bash
  pnpm build
  node server/entry.express.js
  ```

- **Cloudflare Pages**
  ```bash
  # Use Cloudflare Pages adapter
  pnpm add -D @builder.io/qwik-city/adapters/cloudflare-pages
  ```

- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## Demo Accounts

| Role | Email | Password |
|------|------|------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Testing

```bash
pnpm test           # Run tests
pnpm test:e2e       # E2E tests
pnpm test:coverage  # Coverage report
```

### Test Examples

```tsx
// src/components/permission-guard/permission-guard.spec.tsx
import { describe, it, expect } from 'vitest'
import { createDOM } from '@builder.io/qwik/testing'
import { PermissionGuard } from './permission-guard'

describe('PermissionGuard', () => {
  it('should render content when has permission', async () => {
    const { screen, render } = await createDOM()

    await render(
      <PermissionGuard permission="users:view">
        <div>Protected Content</div>
      </PermissionGuard>
    )

    expect(screen.innerHTML).toContain('Protected Content')
  })

  it('should render fallback when no permission', async () => {
    const { screen, render } = await createDOM()

    await render(
      <PermissionGuard permission="admin:*">
        <div>Protected Content</div>
        <div q:slot="fallback">No Permission</div>
      </PermissionGuard>
    )

    expect(screen.innerHTML).toContain('No Permission')
  })
})
```

## Configuration

### Vite Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  }
})
```

## CI/CD

Project is configured with complete GitHub Actions CI workflow:

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

### Qwik Resumability Principle

Qwik's core innovation is "resumability" rather than "hydration":

```tsx
// Traditional frameworks (React/Vue): Need to re-execute all code to rebuild state
// Qwik: Directly resume state from HTML without re-execution

// Server serializes state
export default component$(() => {
  const count = useSignal(0)

  // Qwik serializes state into HTML
  return <div>Count: {count.value}</div>
})

// Client directly resumes state from HTML without executing component code
// Code is loaded and executed only on interaction
```

### Lazy Loading Strategy

Qwik implements the most aggressive code splitting:

```tsx
// Each event handler is an independent lazy loading unit
export default component$(() => {
  const count = useSignal(0)

  // This function won't be downloaded until clicked
  const handleClick = $(() => {
    count.value++
  })

  return (
    <button onClick$={handleClick}>
      Count: {count.value}
    </button>
  )
})
```

### Preload Optimization

```tsx
// routes/(dashboard)/layout.tsx
import { component$ } from '@builder.io/qwik'
import { routeLoader$, Link } from '@builder.io/qwik-city'

// Preload data
export const usePreloadData = routeLoader$(async () => {
  return {
    navigation: await fetchNavigation(),
  }
})

export default component$(() => {
  const data = usePreloadData()

  return (
    <nav>
      {data.value.navigation.map((item) => (
        // Link automatically preloads target page
        <Link href={item.path} prefetch>
          {item.title}
        </Link>
      ))}
    </nav>
  )
})
```

## Performance Optimization

### Image Optimization

```tsx
import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'

export default component$(() => {
  return (
    <Image
      src="https://example.com/image.jpg"
      layout="constrained"
      width={800}
      height={600}
      alt="Optimized image"
    />
  )
})
```

### Lazy Loading Components

```tsx
// Component-level lazy loading
import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <div>
      {/* Use resource$ for component lazy loading */}
      <Resource
        value={heavyComponentResource}
        onPending={() => <div>Loading...</div>}
        onResolved={(HeavyComponent) => <HeavyComponent />}
      />
    </div>
  )
})
```

### Preload Critical Resources

```tsx
// routes/layout.tsx
import { component$, useVisibleTask$ } from '@builder.io/qwik'

export default component$(() => {
  useVisibleTask$(() => {
    // Preload critical fonts
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.href = '/fonts/main.woff2'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  return <Slot />
})
```

## FAQ

### Q: How to handle client-side state?

A: Use `useSignal` and `useStore` to create reactive state:

```tsx
import { component$, useSignal, useStore } from '@builder.io/qwik'

export default component$(() => {
  // Use useSignal for simple values
  const count = useSignal(0)

  // Use useStore for complex objects
  const state = useStore({
    user: null,
    loading: false,
  })

  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>Increment</button>
    </div>
  )
})
```

### Q: How to integrate third-party libraries?

A: Use `useVisibleTask$` to execute code on the client:

```tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'

export default component$(() => {
  const chartRef = useSignal<Element>()

  useVisibleTask$(({ cleanup }) => {
    // Initialize third-party library on the client
    import('chart.js').then(({ Chart }) => {
      const chart = new Chart(chartRef.value, {
        // Configuration...
      })

      cleanup(() => chart.destroy())
    })
  })

  return <canvas ref={chartRef} />
})
```

### Q: How to optimize initial load time?

A: Qwik optimizes automatically, but you can further:

1. **Use SSR**: Enabled by default
2. **Preload critical routes**:
   ```tsx
   <Link href="/dashboard" prefetch>Dashboard</Link>
   ```
3. **Defer non-critical resources**:
   ```tsx
   useVisibleTask$(({ track }) => {
     // Load only when component is visible
     track(() => isVisible.value)
     if (isVisible.value) {
       loadAnalytics()
     }
   })
   ```

### Q: How to handle form submission?

A: Use `routeAction$` for server-side processing:

```tsx
import { component$ } from '@builder.io/qwik'
import { routeAction$, Form, zod$, z } from '@builder.io/qwik-city'

export const useAddUser = routeAction$(
  async (data) => {
    // Server-side processing
    const user = await createUser(data)
    return { success: true, user }
  },
  zod$({
    name: z.string().min(2),
    email: z.string().email(),
  })
)

export default component$(() => {
  const action = useAddUser()

  return (
    <Form action={action}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">
        {action.isRunning ? 'Submitting...' : 'Submit'}
      </button>
    </Form>
  )
})
```

## Comparison with Other Versions

| Feature | Qwik Version | Next.js | Vue |
|------|-----------|---------|-----|
| SSR/SSG | ✅ Built-in | ✅ | ✅ (Nuxt) |
| State Management | Context + Signals | Zustand | Pinia |
| Data Fetching | routeLoader$ | TanStack Query | TanStack Query |
| Form Validation | Modular Forms + Zod | React Hook Form + Zod | VeeValidate + Zod |
| Routing | File-based Routing | App Router | Vue Router |
| Build Tool | Vite | Next.js | Vite |
| Hydration | Resumable (Zero Hydration) | Traditional Hydration | Traditional Hydration |
| Initial JS | ~1KB | ~85KB | ~33KB |
| Server-side | Built-in Full-stack | API Routes | Separate Backend |
| Component Library | Qwik UI | shadcn/ui | shadcn-vue |

## Related Links

- [Live Preview](https://halolight-qwik.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-qwik)
- [Qwik Official Documentation](https://qwik.builder.io)
- [Qwik City Documentation](https://qwik.builder.io/docs/qwikcity)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
