# Fresh (Deno) Version

HaloLight Fresh version is built on Fresh 2 + Deno, using Islands architecture + Preact to deliver a zero-config, ultra-fast admin dashboard.

**Live Preview**: [https://halolight-fresh.h7ml.cn/](https://halolight-fresh.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-fresh](https://github.com/halolight/halolight-fresh)

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Fresh | 2.x | Deno full-stack framework |
| Deno | 2.x | Modern JavaScript runtime |
| Preact | 10.x | Lightweight UI library |
| @preact/signals | 2.x | Reactive state |
| TypeScript | Built-in | Type safety |
| Tailwind CSS | Built-in | Atomic CSS |
| Zod | 3.x | Data validation |
| Chart.js | 4.x | Chart visualization |

## Core Features

- **Zero Config**: Works out of the box, no complex configuration
- **Islands Architecture**: Zero JS by default, hydrate on demand
- **Edge First**: Native support for Deno Deploy edge deployment
- **Built-in TypeScript**: No configuration needed, use directly
- **JIT Rendering**: No build step, instant rendering
- **Secure by Default**: Deno sandbox security model

## Directory Structure

```
halolight-fresh/
├── routes/                        # File-based routing
│   ├── _app.tsx                  # Root layout
│   ├── _layout.tsx               # Default layout
│   ├── _middleware.ts            # Global middleware
│   ├── index.tsx                 # Homepage
│   ├── auth/                     # Auth pages
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot-password.tsx
│   │   └── reset-password.tsx
│   ├── dashboard/                # Dashboard pages
│   │   ├── _layout.tsx           # Dashboard layout
│   │   ├── _middleware.ts        # Auth middleware
│   │   ├── index.tsx
│   │   ├── users/
│   │   │   ├── index.tsx
│   │   │   ├── create.tsx
│   │   │   └── [id].tsx
│   │   ├── roles.tsx
│   │   ├── permissions.tsx
│   │   ├── settings.tsx
│   │   └── profile.tsx
│   └── api/                      # API routes
│       └── auth/
│           ├── login.ts
│           ├── register.ts
│           └── me.ts
├── islands/                      # Interactive Islands
│   ├── LoginForm.tsx
│   ├── UserTable.tsx
│   ├── DashboardGrid.tsx
│   ├── ThemeToggle.tsx
│   └── Sidebar.tsx
├── components/                   # Static components
│   ├── ui/                       # UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── AdminLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── Header.tsx
│   └── shared/                   # Shared components
│       └── PermissionGuard.tsx
├── lib/                          # Utilities
│   ├── auth.ts
│   ├── permission.ts
│   ├── session.ts
│   └── cn.ts
├── signals/                      # State management
│   ├── auth.ts
│   ├── ui-settings.ts
│   └── dashboard.ts
├── static/                       # Static assets
├── fresh.config.ts              # Fresh config
├── deno.json                    # Deno config
└── tailwind.config.ts           # Tailwind config
```

## Quick Start

### Install Deno

```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows
irm https://deno.land/install.ps1 | iex
```

### Clone Project

```bash
git clone https://github.com/halolight/halolight-fresh.git
cd halolight-fresh
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# .env example
API_URL=/api
USE_MOCK=true
DEMO_EMAIL=admin@example.com
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=true
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
SESSION_SECRET=your-secret-key
```

### Start Development

```bash
deno task dev
```

Visit http://localhost:8000

### Production Build

```bash
deno task build
deno task start
```

## Core Features

### State Management (@preact/signals)

```ts
// signals/auth.ts
import { signal, computed, effect } from '@preact/signals'
import { IS_BROWSER } from '$fresh/runtime.ts'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

export const user = signal<User | null>(null)
export const token = signal<string | null>(null)
export const loading = signal(false)

export const isAuthenticated = computed(() => !!token.value && !!user.value)
export const permissions = computed(() => user.value?.permissions ?? [])

// Only persist in browser
if (IS_BROWSER) {
  const saved = localStorage.getItem('auth')
  if (saved) {
    const { user: savedUser, token: savedToken } = JSON.parse(saved)
    user.value = savedUser
    token.value = savedToken
  }

  effect(() => {
    if (user.value && token.value) {
      localStorage.setItem('auth', JSON.stringify({
        user: user.value,
        token: token.value,
      }))
    }
  })
}

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
  if (IS_BROWSER) {
    localStorage.removeItem('auth')
  }
}

export function hasPermission(permission: string): boolean {
  const perms = permissions.value
  return perms.some((p) =>
    p === '*' || p === permission ||
    (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
  )
}
```

### Auth Middleware

```ts
// routes/dashboard/_middleware.ts
import { FreshContext } from '$fresh/server.ts'
import { getCookies } from '$std/http/cookie.ts'
import { verifyToken, getUser } from '../../lib/auth.ts'

export async function handler(req: Request, ctx: FreshContext) {
  const cookies = getCookies(req.headers)
  const token = cookies.token

  if (!token) {
    const url = new URL(req.url)
    return new Response(null, {
      status: 302,
      headers: { Location: `/auth/login?redirect=${url.pathname}` },
    })
  }

  try {
    const payload = await verifyToken(token)
    const user = await getUser(payload.userId)
    ctx.state.user = user
    ctx.state.token = token
  } catch {
    return new Response(null, {
      status: 302,
      headers: { Location: '/auth/login' },
    })
  }

  return ctx.next()
}
```

### Islands (Interactive Components)

```tsx
// islands/LoginForm.tsx
import { useSignal } from '@preact/signals'
import { login, loading } from '../signals/auth.ts'
import { Button } from '../components/ui/Button.tsx'
import { Input } from '../components/ui/Input.tsx'

interface Props {
  redirectTo?: string
}

export default function LoginForm({ redirectTo = '/dashboard' }: Props) {
  const email = useSignal('')
  const password = useSignal('')
  const error = useSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    error.value = ''

    try {
      await login({
        email: email.value,
        password: password.value,
      })
      globalThis.location.href = redirectTo
    } catch (e) {
      error.value = 'Invalid email or password'
    }
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      {error.value && (
        <div class="text-destructive text-sm">{error.value}</div>
      )}

      <Input
        type="email"
        label="Email"
        value={email.value}
        onInput={(e) => email.value = e.currentTarget.value}
        required
      />

      <Input
        type="password"
        label="Password"
        value={password.value}
        onInput={(e) => password.value = e.currentTarget.value}
        required
      />

      <Button type="submit" class="w-full" disabled={loading.value}>
        {loading.value ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
```

### Page Routes

```tsx
// routes/auth/login.tsx
import { Handlers, PageProps } from '$fresh/server.ts'
import { AuthLayout } from '../../components/layout/AuthLayout.tsx'
import LoginForm from '../../islands/LoginForm.tsx'

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url)
    const redirect = url.searchParams.get('redirect') || '/dashboard'
    return ctx.render({ redirect })
  },
}

export default function LoginPage({ data }: PageProps<{ redirect: string }>) {
  return (
    <AuthLayout>
      <div class="max-w-md mx-auto">
        <h1 class="text-2xl font-bold text-center mb-8">Login</h1>
        <LoginForm redirectTo={data.redirect} />
      </div>
    </AuthLayout>
  )
}
```

### API Routes

```ts
// routes/api/auth/login.ts
import { Handlers } from '$fresh/server.ts'
import { z } from 'zod'
import { setCookie } from '$std/http/cookie.ts'
import { createToken } from '../../../lib/auth.ts'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.json()
      const { email, password } = loginSchema.parse(body)

      // Authenticate user (example)
      const user = await authenticateUser(email, password)
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Invalid email or password' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        )
      }

      const token = await createToken({ userId: user.id })

      const response = new Response(
        JSON.stringify({ user, token }),
        { headers: { 'Content-Type': 'application/json' } }
      )

      setCookie(response.headers, {
        name: 'token',
        value: token,
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 60 * 60 * 24 * 7,
      })

      return response
    } catch (e) {
      if (e instanceof z.ZodError) {
        return new Response(
          JSON.stringify({ error: 'Validation failed', details: e.errors }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
      return new Response(
        JSON.stringify({ error: 'Server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  },
}
```

### Permission Component

```tsx
// components/shared/PermissionGuard.tsx
import { ComponentChildren } from 'preact'

interface Props {
  permission: string
  userPermissions: string[]
  children: ComponentChildren
  fallback?: ComponentChildren
}

function checkPermission(
  userPermissions: string[],
  permission: string
): boolean {
  return userPermissions.some((p) =>
    p === '*' || p === permission ||
    (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
  )
}

export function PermissionGuard({
  permission,
  userPermissions,
  children,
  fallback,
}: Props) {
  if (!checkPermission(userPermissions, permission)) {
    return fallback ?? null
  }

  return <>{children}</>
}
```

```tsx
// Usage (in server-side rendering)
<PermissionGuard
  permission="users:delete"
  userPermissions={ctx.state.user.permissions}
  fallback={<span class="text-muted-foreground">No permission</span>}
>
  <Button variant="destructive">Delete</Button>
</PermissionGuard>
```

### Dashboard Layout

```tsx
// routes/dashboard/_layout.tsx
import { PageProps } from '$fresh/server.ts'
import { AdminLayout } from '../../components/layout/AdminLayout.tsx'
import Sidebar from '../../islands/Sidebar.tsx'

export default function DashboardLayout({ Component, state }: PageProps) {
  return (
    <AdminLayout>
      <div class="flex min-h-screen">
        <Sidebar user={state.user} />
        <main class="flex-1 p-6">
          <Component />
        </main>
      </div>
    </AdminLayout>
  )
}
```

## Page Routes

| Path | Page | Permission |
|------|------|------|
| `/` | Homepage | Public |
| `/auth/login` | Login | Public |
| `/auth/register` | Register | Public |
| `/auth/forgot-password` | Forgot Password | Public |
| `/auth/reset-password` | Reset Password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/dashboard/users` | User List | `users:list` |
| `/dashboard/users/create` | Create User | `users:create` |
| `/dashboard/users/[id]` | User Detail | `users:view` |
| `/dashboard/roles` | Role Management | `roles:list` |
| `/dashboard/permissions` | Permission Management | `permissions:list` |
| `/dashboard/settings` | System Settings | `settings:view` |
| `/dashboard/profile` | Profile | Logged in |

## Configuration

### Fresh Configuration

```ts
// fresh.config.ts
import { defineConfig } from '$fresh/server.ts'
import tailwind from '$fresh/plugins/tailwind.ts'

export default defineConfig({
  plugins: [tailwind()],
})
```

### Deno Configuration

```json
// deno.json
{
  "lock": false,
  "tasks": {
    "check": "deno fmt --check && deno lint && deno check **/*.ts && deno check **/*.tsx",
    "dev": "deno run -A --watch=static/,routes/ dev.ts",
    "build": "deno run -A dev.ts build",
    "start": "deno run -A main.ts",
    "update": "deno run -A -r https://fresh.deno.dev/update ."
  },
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@2.0.0/",
    "$std/": "https://deno.land/std@0.224.0/",
    "preact": "https://esm.sh/preact@10.22.0",
    "preact/": "https://esm.sh/preact@10.22.0/",
    "@preact/signals": "https://esm.sh/@preact/signals@1.2.3",
    "zod": "https://deno.land/x/zod@v3.23.0/mod.ts"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

## Deployment

### Deno Deploy (Recommended)

```bash
# Install deployctl
deno install -A --no-check -r -f https://deno.land/x/deploy/deployctl.ts

# Deploy
deployctl deploy --project=halolight-fresh main.ts
```

### Docker

```dockerfile
FROM denoland/deno:2.0.0

WORKDIR /app
COPY . .

RUN deno cache main.ts

EXPOSE 8000
CMD ["run", "-A", "main.ts"]
```

### Self-hosted

```bash
# Build
deno task build

# Run
deno task start
```

## Testing

The project uses Deno's built-in testing framework, test files are located in the `tests/` directory.

### Test Structure

```
tests/
├── setup.ts              # Test environment setup
│   ├── localStorage mock
│   ├── sessionStorage mock
│   ├── matchMedia mock
│   └── Helper functions (createMockUser, mockAuthenticatedState, etc.)
└── lib/
    ├── utils.test.ts     # Utility function tests
    ├── config.test.ts    # Config tests
    └── stores.test.ts    # State management tests
```

### Run Tests

```bash
# Run all tests
deno task test

# Watch mode
deno task test:watch

# Test coverage
deno task test:coverage

# Coverage report output to coverage/lcov.info
```

### Test Example

```ts
// tests/lib/config.test.ts
import { assertEquals, assertExists } from "$std/assert/mod.ts";
import "../setup.ts";

import { hasPermission } from "../../lib/config.ts";
import type { Permission } from "../../lib/types.ts";

Deno.test("hasPermission - permission check", async (t) => {
  const userPermissions: Permission[] = ["dashboard:view", "users:view"];

  await t.step("should return true when user has permission", () => {
    const result = hasPermission(userPermissions, "dashboard:view");
    assertEquals(result, true);
  });

  await t.step("should support wildcard permissions", () => {
    const adminPermissions: Permission[] = ["*"];
    const result = hasPermission(adminPermissions, "dashboard:view");
    assertEquals(result, true);
  });
});
```

## CI/CD

The project uses GitHub Actions for continuous integration, configuration file is located at `.github/workflows/ci.yml`.

### Workflow Tasks

| Task | Description | Trigger |
|------|------|----------|
| lint | Format check, code check, type check | push/PR |
| test | Run tests and upload coverage | push/PR |
| build | Production build verification | After lint/test pass |
| security | Deno security audit | push/PR |
| dependency-review | Dependency security review | PR only |

### Local CI Commands

```bash
# Run full CI check
deno task ci

# Equivalent to
deno task fmt:check && deno task lint && deno task check && deno task test
```

### Code Quality Configuration

```json
// deno.json
{
  "lint": {
    "rules": {
      "tags": ["recommended"],
      "exclude": [
        "no-explicit-any",
        "explicit-function-return-type",
        "explicit-module-boundary-types",
        "jsx-button-has-type",
        "no-unused-vars"
      ]
    }
  },
  "fmt": {
    "lineWidth": 100,
    "indentWidth": 2,
    "singleQuote": false,
    "semiColons": true
  }
}
```

## Comparison with Other Versions

| Feature | Fresh Version | Astro Version | Next.js Version |
|------|-----------|------------|--------------|
| Runtime | Deno | Node.js | Node.js |
| State Management | @preact/signals | - | Zustand |
| Data Fetching | Handlers | Load functions | TanStack Query |
| Form Validation | Zod | Zod | React Hook Form + Zod |
| Server-side | Built-in | @astrojs/node | API Routes |
| Component Library | Custom | - | shadcn/ui |
| Islands Architecture | ✅ | ✅ | ❌ |
| Zero Config | ✅ | ❌ | ❌ |
| Edge Deployment | Deno Deploy | Cloudflare | Vercel Edge |
| Build Step | Optional | Required | Required |
