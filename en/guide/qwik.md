# Qwik Version

HaloLight Qwik version is built on Qwik City, featuring Qwik resumability architecture + TypeScript for zero hydration and ultimate performance.

**Live Preview**: [https://halolight-qwik.h7ml.cn/](https://halolight-qwik.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-qwik](https://github.com/halolight/halolight-qwik)

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

- **Resumability**: No hydration needed, server state directly resumed
- **Lazy Load Everything**: Code loaded on demand, minimal initial JS
- **Signals**: Fine-grained reactivity
- **Server-side Rendering**: Built-in SSR support
- **File-based Routing**: Directory-based routing system
- **Edge Deployment**: Native support for Cloudflare Workers and other edge platforms

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
│   └── types/                   # Type definitions
├── public/                      # Static assets
├── vite.config.ts              # Vite config
├── tailwind.config.ts          # Tailwind config
└── package.json
```

## Quick Start

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
VITE_DEMO_EMAIL=admin@example.com
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

### Root Layout (Provide Context)

```tsx
// routes/layout.tsx
import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik'
import { AuthContext } from '~/stores/auth'

export default component$(() => {
  const authState = useStore({
    user: null,
    token: null,
    loading: false,
  })

  useContextProvider(AuthContext, authState)

  return <Slot />
})
```

### Route Guards

```tsx
// routes/(dashboard)/layout.tsx
import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$, useNavigate } from '@builder.io/qwik-city'
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

### Data Loading (routeLoader$)

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

### Server Actions (routeAction$)

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

### Permission Component

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
```

```tsx
// Usage
<PermissionGuard permission="users:delete">
  <Button variant="destructive" q:slot="">Delete</Button>
  <span q:slot="fallback" class="text-muted-foreground">No Permission</span>
</PermissionGuard>
```

### API Endpoints

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
  }
})
```

## Deployment

### Node.js Server

```bash
pnpm build
node server/entry.express.js
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

### Cloudflare Pages

```bash
# Use Cloudflare Pages adapter
pnpm add -D @builder.io/qwik-city/adapters/cloudflare-pages
```

### Vercel

```bash
# Use Vercel Edge adapter
pnpm add -D @builder.io/qwik-city/adapters/vercel-edge
```

## Testing

```bash
# Run tests
pnpm test

# E2E tests
pnpm test.e2e
```

## Comparison with Other Versions

| Feature | Qwik Version | Vue Version | Next.js Version |
|------|----------|----------|--------------|
| State Management | Context + Signals | Pinia | Zustand |
| Data Fetching | routeLoader$ | TanStack Query | TanStack Query |
| Form Validation | Modular Forms + Zod | VeeValidate + Zod | React Hook Form + Zod |
| Server-side | Built-in | Separate Backend | API Routes |
| Component Library | Qwik UI | shadcn-vue | shadcn/ui |
| Routing | File-based Routing | Vue Router | App Router |
| Hydration | Resumable (Zero Hydration) | Traditional Hydration | Traditional Hydration |
| Initial JS | ~1KB | ~33KB | ~85KB |
