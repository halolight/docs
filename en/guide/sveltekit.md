# SvelteKit Version

HaloLight SvelteKit version is built on SvelteKit 2, featuring Svelte 5 Runes + TypeScript with compile-time optimization and ultimate performance.

**Live Preview**: [https://halolight-svelte.h7ml.cn/](https://halolight-svelte.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-svelte](https://github.com/halolight/halolight-svelte)

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| SvelteKit | 2.x | Svelte full-stack framework |
| Svelte | 5.x | Compile-time framework (Runes) |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4.x | Atomic CSS + @tailwindcss/postcss |
| shadcn-svelte | latest | UI component library |
| bits-ui | latest | Headless UI components |
| lucide-svelte | latest | Icon library |
| sveltekit-superforms | 2.x | Form handling |
| Zod | 4.x | Data validation |
| Vitest | 4.x | Unit testing |
| MSW | 2.x | Mock data |

## Core Features

- **Svelte 5 Runes**: `$state`, `$derived`, `$effect`, `$props` new reactivity system
- **Compile-time Optimization**: No virtual DOM, minimal runtime overhead
- **File-based Routing**: Automatic routing based on file system
- **Server-side Rendering**: Built-in SSR/SSG support
- **Load Functions**: Elegant data loading pattern
- **Form Actions**: Built-in form handling mechanism
- **Hooks**: Flexible request lifecycle hooks
- **View Transitions API**: Theme/skin switching animations
- **Cloudflare Pages**: Edge deployment, global acceleration

## Directory Structure

```
halolight-svelte/
├── src/
│   ├── routes/                    # File-based routing
│   │   ├── +page.svelte          # Home (redirect)
│   │   ├── +layout.svelte        # Root layout
│   │   ├── +error.svelte         # Error page
│   │   ├── auth/                 # Auth pages
│   │   │   ├── login/
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.ts
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   └── (dashboard)/          # Dashboard route group
│   │       ├── +layout.svelte
│   │       ├── dashboard/
│   │       ├── analytics/
│   │       ├── users/
│   │       ├── settings/
│   │       └── profile/
│   ├── lib/
│   │   ├── components/           # Component library
│   │   │   ├── ui/              # shadcn-svelte components
│   │   │   └── layout/          # Layout components
│   │   │       ├── AdminLayout.svelte
│   │   │       ├── AppHeader.svelte
│   │   │       ├── AppSidebar.svelte
│   │   │       ├── AppFooter.svelte
│   │   │       └── QuickSettings.svelte
│   │   ├── config/              # Config files
│   │   │   ├── menu.ts          # Menu config
│   │   │   └── routes.ts        # Route config
│   │   ├── stores/              # State management
│   │   │   ├── auth.ts
│   │   │   ├── layout.ts
│   │   │   ├── navigation.ts
│   │   │   └── ui-settings.ts
│   │   ├── types/               # Type definitions
│   │   └── utils/               # Utility functions
│   │       ├── cn.ts
│   │       ├── format.ts
│   │       └── validation.ts
│   ├── hooks.server.ts          # Server hooks
│   ├── app.html                 # HTML template
│   ├── app.css                  # Global styles (Tailwind)
│   └── app.d.ts                 # Type declarations
├── static/                       # Static assets
├── tests/                        # Test files
├── svelte.config.js             # Svelte config
├── vite.config.ts               # Vite config
├── tailwind.config.js           # Tailwind config
├── postcss.config.js            # PostCSS config
└── package.json
```

## Quick Start

### Environment Requirements

- Node.js >= 20
- pnpm >= 9

### Installation

```bash
git clone https://github.com/halolight/halolight-svelte.git
cd halolight-svelte
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# .env example
VITE_API_URL=/api
VITE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_51LA_SITE_ID=your-51la-site-id
VITE_GA_MEASUREMENT_ID=your-ga-measurement-id
```

### Start Development

```bash
pnpm dev
```

Visit http://localhost:5173

### Build for Production

```bash
pnpm build
pnpm preview
```

### Code Quality

```bash
# ESLint check
pnpm lint

# Prettier format
pnpm format

# Type check
pnpm check

# Run tests
pnpm test

# Test coverage
pnpm test:coverage

# Full CI check
pnpm ci
```

## Core Features

### State Management (Svelte 5 Runes)

```ts
// lib/stores/auth.ts
import { browser } from '$app/environment';

interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
}

class AuthStore {
  user = $state<User | null>(null);
  token = $state<string | null>(null);

  isAuthenticated = $derived(!!this.token && !!this.user);
  permissions = $derived(this.user?.permissions ?? []);

  constructor() {
    if (browser) {
      const saved = localStorage.getItem('auth');
      if (saved) {
        const { user, token } = JSON.parse(saved);
        this.user = user;
        this.token = token;
      }
    }
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    this.user = data.user;
    this.token = data.token;
    this.persist();
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('auth');
  }

  hasPermission(permission: string): boolean {
    return this.permissions.some(
      (p) =>
        p === '*' || p === permission || (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    );
  }

  private persist() {
    if (browser) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: this.user,
          token: this.token,
        })
      );
    }
  }
}

export const authStore = new AuthStore();
```

### Reactive Collections (SvelteSet/SvelteMap)

```svelte
<script lang="ts">
  import { SvelteSet, SvelteMap } from 'svelte/reactivity';

  // Reactive Set
  let selectedIds = new SvelteSet<string>();

  function toggleSelection(id: string) {
    if (selectedIds.has(id)) {
      selectedIds.delete(id);
    } else {
      selectedIds.add(id);
    }
  }

  // Reactive Map
  let itemStatus = new SvelteMap<string, 'pending' | 'done'>();

  function markDone(id: string) {
    itemStatus.set(id, 'done');
  }
</script>

<p>Selected: {selectedIds.size}</p>
```

### Server Hooks

```ts
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');

  if (token) {
    // Validate token and set user info
    event.locals.user = await validateToken(token);
  }

  // Route protection
  if (event.url.pathname.startsWith('/dashboard')) {
    if (!event.locals.user) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/auth/login' },
      });
    }
  }

  return resolve(event);
};
```

### Load Functions

```ts
// routes/(dashboard)/+layout.ts
import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ parent, url }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect(302, `/auth/login?redirect=${url.pathname}`);
  }

  return { user };
};
```

```svelte
<!-- routes/(dashboard)/dashboard/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1>Welcome, {data.user.name}!</h1>
```

### Form Actions with Superforms

```ts
// routes/auth/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const { token, user } = await authenticate(form.data);

      cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      throw redirect(302, '/dashboard');
    } catch (e) {
      return fail(401, { form, message: 'Invalid email or password' });
    }
  },
};
```

### Permission Component

```svelte
<!-- lib/components/PermissionGuard.svelte -->
<script lang="ts">
  import { authStore } from '$lib/stores/auth';

  interface Props {
    permission: string;
    children: import('svelte').Snippet;
    fallback?: import('svelte').Snippet;
  }

  let { permission, children, fallback }: Props = $props();

  const hasPermission = $derived(authStore.hasPermission(permission));
</script>

{#if hasPermission}
  {@render children()}
{:else if fallback}
  {@render fallback()}
{/if}
```

```svelte
<!-- Usage example -->
<PermissionGuard permission="users:delete">
  {#snippet children()}
    <Button variant="destructive">Delete</Button>
  {/snippet}
  {#snippet fallback()}
    <span class="text-muted-foreground">No Permission</span>
  {/snippet}
</PermissionGuard>
```

### View Transitions Theme Switching

```svelte
<script lang="ts">
  function toggleTheme() {
    if (!document.startViewTransition) {
      // Fallback
      document.documentElement.classList.toggle('dark');
      return;
    }

    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark');
    });
  }
</script>

<button onclick={toggleTheme}>Toggle Theme</button>

<style>
  :global(::view-transition-old(root)),
  :global(::view-transition-new(root)) {
    animation-duration: 0.3s;
  }
</style>
```

## Page Routes

| Path | Page | Permission |
|------|------|------|
| `/` | Home (redirect) | Public |
| `/auth/login` | Login | Public |
| `/auth/register` | Register | Public |
| `/auth/forgot-password` | Forgot Password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/dashboard/analytics` | Analytics | `analytics:view` |
| `/dashboard/users` | User Management | `users:list` |
| `/dashboard/documents` | Document Management | `documents:view` |
| `/dashboard/settings` | System Settings | `settings:view` |
| `/dashboard/profile` | Profile | Authenticated |

## Configuration

### Svelte Configuration

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils',
    },
  },
};
```

### PostCSS Configuration (Tailwind CSS v4)

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

## Deployment

### Cloudflare Pages (Recommended)

Project is configured with Cloudflare Pages adapter by default:

```bash
pnpm add -D @sveltejs/adapter-cloudflare
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';

export default {
  kit: {
    adapter: adapter(),
  },
};
```

```bash
pnpm build
# Cloudflare Pages will automatically deploy main branch
```

### Node.js Server

```bash
pnpm add -D @sveltejs/adapter-node
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter(),
  },
};
```

```bash
pnpm build
node build
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
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
EXPOSE 3000
CMD ["node", "build"]
```

### Vercel

```bash
# Default support, deploy directly
npx vercel
```

## CI/CD

GitHub Actions automatically runs the following checks:

1. **lint** - ESLint code check
2. **format** - Prettier format check
3. **type-check** - TypeScript type check (svelte-check)
4. **test** - Vitest unit tests + coverage
5. **build** - Production build verification

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
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm format:check

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:coverage

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
```

## Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Test coverage
pnpm test:coverage

# UI mode
pnpm test:ui
```

## Comparison with Other Versions

| Feature | SvelteKit Version | Vue Version | Next.js Version |
|------|---------------|----------|--------------|
| State Management | Svelte 5 Runes + Stores | Pinia | Zustand |
| Reactivity | $state/$derived/$effect | ref/reactive/computed | useState/useMemo |
| Data Fetching | Load Functions | TanStack Query | TanStack Query |
| Form Validation | Superforms + Zod | VeeValidate + Zod | React Hook Form + Zod |
| Server-side | Built-in Hooks | Separate Backend | API Routes |
| Component Library | shadcn-svelte | shadcn-vue | shadcn/ui |
| Routing | File-based Routing | Vue Router | App Router |
| Compilation | Compile-time Optimization | Virtual DOM | Virtual DOM |
| Deployment | Cloudflare Pages | Vercel | Vercel |
