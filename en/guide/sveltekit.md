# SvelteKit Version

HaloLight SvelteKit version is built on SvelteKit 2, featuring Svelte 5 Runes + TypeScript with compile-time optimization and ultimate performance.

**Live Preview**: [https://halolight-svelte.h7ml.cn](https://halolight-svelte.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-svelte](https://github.com/halolight/halolight-svelte)

## Features

- 🏗️ **Svelte 5 Runes** - New reactivity system ($state/$derived/$effect)
- ⚡ **Compile-time Optimization** - No virtual DOM, minimal runtime overhead
- 🎨 **Theme System** - 11 skins, dark mode, View Transitions
- 🔐 **Authentication** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Permission Control** - RBAC fine-grained access control
- 📑 **Multi-tabs** - Browser-style tab management
- ⌘ **Command Palette** - Keyboard shortcuts (⌘K)

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| SvelteKit | 2.x | Svelte full-stack framework |
| Svelte | 5.x | Compile-time framework (Runes) |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| shadcn-svelte | latest | UI component library |
| Superforms | 2.x | Form handling |
| TanStack Query | 5.x | Server state |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Configurable Dashboard** - 9 widgets, drag-and-drop layout, responsive
- **Multi-tab Navigation** - Browser-style tabs, context menu, state caching
- **Permission System** - RBAC control, route guards, permission components
- **Theme System** - 11 skins, dark mode, View Transitions
- **Multi-account Switching** - Quick account switching, remember login
- **Command Palette** - Keyboard shortcuts (⌘K), global search
- **Real-time Notifications** - WebSocket push, notification center

## Directory Structure

```
halolight-svelte/
├── src/
│   ├── routes/                    # File-based routing
│   │   ├── (auth)/                # Auth pages
│   │   └── (dashboard)/           # Dashboard pages
│   ├── lib/
│   │   ├── components/            # Components
│   │   │   ├── ui/               # Base UI components
│   │   │   ├── layout/           # Layout components
│   │   │   └── dashboard/        # Dashboard components
│   │   ├── stores/               # State management (Runes)
│   │   ├── utils/                # Utilities
│   │   ├── mock/                 # Mock data
│   │   └── types/                # Type definitions
│   ├── hooks.server.ts           # Server hooks
│   └── app.css                   # Global styles
├── static/                        # Static assets
├── svelte.config.js              # Svelte config
└── package.json
```

## Quick Start

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

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
# .env
VITE_API_URL=/api
VITE_MOCK=true
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
pnpm preview
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

### Data Fetching (Load Functions)

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

### Permission Control

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

### Draggable Dashboard

```svelte
<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity';
  import GridLayout from '$lib/components/dashboard/GridLayout.svelte';

  // Reactive Set for managing widgets
  let activeWidgets = new SvelteSet(['stats', 'chart', 'recent']);

  const layout = $state([
    { i: 'stats', x: 0, y: 0, w: 4, h: 2 },
    { i: 'chart', x: 4, y: 0, w: 8, h: 4 },
    { i: 'recent', x: 0, y: 2, w: 4, h: 2 },
  ]);

  function onLayoutChange(newLayout: typeof layout) {
    layout.splice(0, layout.length, ...newLayout);
    localStorage.setItem('dashboard-layout', JSON.stringify(newLayout));
  }
</script>

<GridLayout {layout} on:change={onLayoutChange}>
  {#each [...activeWidgets] as widget}
    <div data-grid-item={widget}>
      <Widget type={widget} />
    </div>
  {/each}
</GridLayout>
```

## Theme System

### Skin Presets

Support 11 preset skins, switch via quick settings panel:

| Skin | Primary Color | CSS Variable |
|------|--------|----------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Orange | Orange | `--primary: 68.9% 0.181 40.84` |
| Rose | Rose | `--primary: 60.7% 0.234 11.63` |
| Teal | Teal | `--primary: 62.8% 0.149 186.07` |
| Yellow | Yellow | `--primary: 82.3% 0.165 92.14` |
| Violet | Violet | `--primary: 58.9% 0.264 292.85` |
| Cyan | Cyan | `--primary: 73.2% 0.152 196.85` |
| Pink | Pink | `--primary: 70.5% 0.226 340.54` |
| Indigo | Indigo | `--primary: 52.4% 0.218 270.32` |

### CSS Variables (OKLch)

```css
/* app.css */
@layer base {
  :root {
    --background: 100% 0 0;
    --foreground: 14.9% 0.017 285.75;
    --primary: 51.1% 0.262 276.97;
    --primary-foreground: 98% 0.007 285.89;
    --secondary: 96.1% 0.006 286.32;
    --secondary-foreground: 14.9% 0.017 285.75;
    --muted: 96.1% 0.006 286.32;
    --muted-foreground: 45.5% 0.026 285.82;
    --accent: 96.1% 0.006 286.32;
    --accent-foreground: 14.9% 0.017 285.75;
    --destructive: 61.1% 0.246 29.23;
    --destructive-foreground: 98% 0.007 285.89;
    --border: 92.1% 0.011 286.32;
    --input: 92.1% 0.011 286.32;
    --ring: 51.1% 0.262 276.97;
    --radius: 0.5rem;
  }

  .dark {
    --background: 22.4% 0.015 285.88;
    --foreground: 98% 0.007 285.89;
    --primary: 61.1% 0.262 276.97;
    --primary-foreground: 98% 0.007 285.89;
    /* ... */
  }
}
```

### View Transitions Theme Switching

```svelte
<script lang="ts">
  function toggleTheme() {
    if (!document.startViewTransition) {
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
| `/auth/reset-password` | Reset Password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/dashboard/users` | User Management | `users:view` |
| `/dashboard/analytics` | Analytics | `analytics:view` |
| `/dashboard/calendar` | Calendar | `calendar:view` |
| `/dashboard/documents` | Documents | `documents:view` |
| `/dashboard/files` | Files | `files:view` |
| `/dashboard/messages` | Messages | `messages:view` |
| `/dashboard/notifications` | Notifications | `notifications:view` |
| `/dashboard/settings` | Settings | `settings:view` |
| `/dashboard/profile` | Profile | `settings:view` |

## Common Commands

```bash
pnpm dev            # Start dev server
pnpm build          # Production build
pnpm preview        # Preview production build
pnpm lint           # Lint code
pnpm lint:fix       # Auto-fix lint issues
pnpm format         # Format code
pnpm check          # Type check (svelte-check)
pnpm test           # Run tests
pnpm test:coverage  # Test coverage
pnpm ci             # Full CI check
```

## Deployment

### Cloudflare Pages (Recommended)

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/halolight/halolight-svelte)

Project is configured with Cloudflare Pages adapter by default:

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

### Docker

```bash
docker build -t halolight-svelte .
docker run -p 3000:3000 halolight-svelte
```

### Other Platforms

- [Vercel](/en/guide/vercel)
- [Netlify](/en/guide/netlify)
- [AWS Amplify](/en/guide/aws)
- [Azure Static Web Apps](/en/guide/azure)

## Demo Accounts

| Role | Email | Password |
|------|------|------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Testing

```bash
pnpm test           # Run tests (watch mode)
pnpm test:run       # Single run
pnpm test:coverage  # Coverage report
pnpm test:ui        # Vitest UI
```

### Test Examples

```ts
// tests/auth.test.ts
import { describe, it, expect } from 'vitest';
import { authStore } from '$lib/stores/auth';

describe('AuthStore', () => {
  it('should initialize with null user', () => {
    expect(authStore.user).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
  });

  it('should authenticate user', async () => {
    await authStore.login({
      email: 'admin@halolight.h7ml.cn',
      password: '123456',
    });

    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.user?.email).toBe('admin@halolight.h7ml.cn');
  });

  it('should check permissions', () => {
    expect(authStore.hasPermission('users:view')).toBe(true);
    expect(authStore.hasPermission('invalid')).toBe(false);
  });
});
```

## Configuration

### SvelteKit Configuration

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

### Vite Configuration

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
  },
});
```

## CI/CD

Complete GitHub Actions CI workflow configured:

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
      - run: pnpm format:check

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check

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

## Performance Optimization

### Lazy Load Components

```svelte
<script lang="ts">
  const HeavyComponent = $lazy(() => import('$lib/components/Heavy.svelte'));
</script>

{#await HeavyComponent}
  <div>Loading...</div>
{:then component}
  <svelte:component this={component} />
{/await}
```

### Preloading

```svelte
<script lang="ts">
  import { preloadData } from '$app/navigation';

  function handleMouseEnter() {
    preloadData('/dashboard/analytics');
  }
</script>

<a href="/dashboard/analytics" onmouseenter={handleMouseEnter}>
  Analytics
</a>
```

### Image Optimization

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visible = true;
        observer.disconnect();
      }
    });

    observer.observe(element);
  });
</script>

{#if visible}
  <img src="/large-image.jpg" alt="Optimized image" />
{:else}
  <div class="placeholder" />
{/if}
```

## FAQ

### Q: How to use TanStack Query in SvelteKit?

A: SvelteKit recommends using built-in Load functions for data loading, but you can also combine TanStack Query:

```svelte
<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  const query = createQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
</script>

{#if $query.isLoading}
  <p>Loading...</p>
{:else if $query.error}
  <p>Error: {$query.error.message}</p>
{:else if $query.data}
  <ul>
    {#each $query.data as user}
      <li>{user.name}</li>
    {/each}
  </ul>
{/if}
```

### Q: How to implement form validation?

A: Recommended using Superforms + Zod:

```ts
// routes/users/create/+page.server.ts
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // Process form data
    return { form };
  },
};
```

### Q: How to deploy to Vercel?

A: Switch to Vercel adapter:

```bash
pnpm add -D @sveltejs/adapter-vercel
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter(),
  },
};
```

## Comparison with Other Versions

| Feature | SvelteKit | Next.js | Vue |
|------|-----------|---------|-----|
| SSR/SSG | ✅ | ✅ | ✅ (Nuxt) |
| State Management | Svelte 5 Runes | Zustand | Pinia |
| Routing | File-based | App Router | Vue Router |
| Build Tool | Vite | Turbopack | Vite |
| Runtime | No Virtual DOM | Virtual DOM | Virtual DOM |
| Forms | Superforms | React Hook Form | VeeValidate |
| Component Library | shadcn-svelte | shadcn/ui | shadcn-vue |

## Related Links

- [Live Preview](https://halolight-svelte.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-svelte)
- [SvelteKit Official Docs](https://kit.svelte.dev)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
