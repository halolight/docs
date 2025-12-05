# Solid.js Version

HaloLight Solid.js version is built on SolidStart 1.0, featuring Solid.js fine-grained reactivity + TypeScript for high-performance admin dashboard.

**Live Preview**: [https://halolight-solidjs.h7ml.cn/](https://halolight-solidjs.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-solidjs](https://github.com/halolight/halolight-solidjs)

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| SolidStart | 1.x | Solid full-stack framework |
| Solid.js | 1.9+ | Fine-grained reactive framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| Kobalte | 0.13+ | Accessible UI primitives |
| solid-primitives | latest | Reactive utilities |
| Zod | 3.x | Data validation |
| @solid-primitives/storage | latest | Persistent storage |
| solid-charts | latest | Chart visualization |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Fine-grained Reactivity**: No virtual DOM, precise dependency tracking and updates
- **Compile-time Optimization**: JSX compiled to efficient DOM operations
- **Signals**: Simple reactive primitives
- **Server-side Rendering**: SolidStart built-in SSR support
- **File-based Routing**: File system-based routing
- **RPC**: Seamless server function calls

## Directory Structure

```
halolight-solidjs/
├── src/
│   ├── routes/                    # File-based routing
│   │   ├── index.tsx            # Home
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   └── reset-password.tsx
│   │   ├── (dashboard)/         # Dashboard route group
│   │   │   ├── dashboard.tsx
│   │   │   ├── users/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── create.tsx
│   │   │   │   └── [id].tsx
│   │   │   ├── roles.tsx
│   │   │   ├── permissions.tsx
│   │   │   ├── settings.tsx
│   │   │   └── profile.tsx
│   │   └── api/                 # API routes
│   │       └── auth/
│   │           └── login.ts
│   ├── components/              # Component library
│   │   ├── ui/                  # Kobalte components
│   │   ├── layout/              # Layout components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── DashboardGrid.tsx
│   │   │   ├── WidgetWrapper.tsx
│   │   │   └── StatsWidget.tsx
│   │   └── shared/              # Shared components
│   │       └── PermissionGuard.tsx
│   ├── stores/                  # State management
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   └── dashboard.ts
│   ├── lib/                     # Utilities
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── cn.ts
│   ├── server/                  # Server code
│   │   ├── auth.ts
│   │   └── middleware.ts
│   └── types/                   # Type definitions
├── public/                      # Static assets
├── app.config.ts               # SolidStart config
├── tailwind.config.ts          # Tailwind config
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-solidjs.git
cd halolight-solidjs
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

Visit http://localhost:3000

### Build for Production

```bash
pnpm build
pnpm start
```

## Core Features

### State Management (Signals + Store)

```tsx
// stores/auth.ts
import { createSignal, createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { makePersisted } from '@solid-primitives/storage'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
}

const [state, setState] = makePersisted(
  createStore<AuthState>({
    user: null,
    token: null,
  }),
  { name: 'auth' }
)

const [loading, setLoading] = createSignal(false)

export const authStore = {
  get user() { return state.user },
  get token() { return state.token },
  get loading() { return loading() },

  isAuthenticated: createMemo(() => !!state.token && !!state.user),
  permissions: createMemo(() => state.user?.permissions ?? []),

  async login(credentials: { email: string; password: string }) {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      setState({
        user: data.user,
        token: data.token,
      })
    } finally {
      setLoading(false)
    }
  },

  logout() {
    setState({ user: null, token: null })
  },

  hasPermission(permission: string): boolean {
    const perms = state.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  },
}
```

### Route Middleware

```tsx
// src/middleware.ts
import { createMiddleware } from '@solidjs/start/middleware'

export default createMiddleware({
  onRequest: [
    async (event) => {
      const url = new URL(event.request.url)

      // Protect dashboard routes
      if (url.pathname.startsWith('/dashboard')) {
        const token = event.request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1]

        if (!token) {
          return new Response(null, {
            status: 302,
            headers: { Location: `/login?redirect=${url.pathname}` },
          })
        }
      }
    },
  ],
})
```

### Server Functions (RPC)

```tsx
// server/auth.ts
'use server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function login(credentials: z.infer<typeof loginSchema>) {
  const validated = loginSchema.parse(credentials)

  // Validation logic...

  return {
    success: true,
    user: { id: 1, name: 'Admin', email: validated.email },
    token: 'mock_token',
  }
}

export async function getCurrentUser(token: string) {
  // Validate token and return user
  return {
    id: 1,
    name: 'Admin',
    permissions: ['*'],
  }
}
```

### Permission Component

```tsx
// components/shared/PermissionGuard.tsx
import { Show, type ParentComponent, type JSX } from 'solid-js'
import { authStore } from '~/stores/auth'

interface Props {
  permission: string
  fallback?: JSX.Element
}

export const PermissionGuard: ParentComponent<Props> = (props) => {
  const hasPermission = () => authStore.hasPermission(props.permission)

  return (
    <Show when={hasPermission()} fallback={props.fallback}>
      {props.children}
    </Show>
  )
}
```

```tsx
// Usage
<PermissionGuard
  permission="users:delete"
  fallback={<span class="text-muted-foreground">No Permission</span>}
>
  <Button variant="destructive">Delete</Button>
</PermissionGuard>
```

### Data Fetching

```tsx
// routes/(dashboard)/users/index.tsx
import { createAsync, cache } from '@solidjs/router'

const getUsers = cache(async (params: { page: number }) => {
  'use server'
  const users = await db.users.findMany({
    skip: (params.page - 1) * 10,
    take: 10,
  })
  return users
}, 'users')

export const route = {
  load: ({ location }) => {
    const page = Number(location.query.page) || 1
    void getUsers({ page })
  },
}

export default function UsersPage() {
  const users = createAsync(() => getUsers({ page: 1 }))

  return (
    <div>
      <h1>User List</h1>
      <Show when={users()}>
        {(data) => (
          <For each={data()}>
            {(user) => <UserCard user={user} />}
          </For>
        )}
      </Show>
    </div>
  )
}
```

### Form Handling

```tsx
// routes/(auth)/login.tsx
import { createSignal } from 'solid-js'
import { useNavigate, useSearchParams } from '@solidjs/router'
import { authStore } from '~/stores/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')

    try {
      await authStore.login({
        email: email(),
        password: password(),
      })
      navigate(searchParams.redirect || '/dashboard')
    } catch (e) {
      setError('Invalid email or password')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Show when={error()}>
        <div class="text-destructive">{error()}</div>
      </Show>

      <input
        type="email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
      />

      <button type="submit" disabled={authStore.loading}>
        {authStore.loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
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

### SolidStart Configuration

```ts
// app.config.ts
import { defineConfig } from '@solidjs/start/config'

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  vite: {
    plugins: [],
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
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### Vercel

```ts
// app.config.ts
export default defineConfig({
  server: {
    preset: 'vercel',
  },
})
```

### Cloudflare Pages

```ts
// app.config.ts
export default defineConfig({
  server: {
    preset: 'cloudflare-pages',
  },
})
```

## Testing

```bash
# Run tests
pnpm test

# E2E tests
pnpm test:e2e
```

## Comparison with Other Versions

| Feature | Solid.js Version | Vue Version | Next.js Version |
|------|--------------|----------|--------------|
| State Management | Signals + Store | Pinia | Zustand |
| Data Fetching | createAsync | TanStack Query | TanStack Query |
| Form Validation | Custom + Zod | VeeValidate + Zod | React Hook Form + Zod |
| Server-side | SolidStart Built-in | Separate Backend | API Routes |
| Component Library | Kobalte | shadcn-vue | shadcn/ui |
| Routing | File-based Routing | Vue Router | App Router |
| Reactivity | Fine-grained Signals | Proxy-based | Hooks |
| Bundle Size | ~7KB | ~33KB | ~85KB |
