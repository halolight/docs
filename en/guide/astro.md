# Astro Version

HaloLight Astro version is built on Astro 5, featuring Islands architecture with zero JS initial load and ultimate performance, supporting multi-framework component integration.

**Live Preview**: [https://halolight-astro.h7ml.cn/](https://halolight-astro.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-astro](https://github.com/halolight/halolight-astro)

## Features

- 🏝️ **Islands Architecture** - Zero JS by default, hydrate interactive components on demand
- ⚡ **Ultimate Performance** - Zero JavaScript on initial load, Lighthouse 100 score
- 🔀 **Multi-framework Integration** - Support React, Vue, Svelte, Solid components in one project
- 📄 **Content-first** - Native Markdown/MDX support, content collections
- 🔄 **View Transitions** - Native View Transitions API support
- 🚀 **SSR/SSG/Hybrid** - Flexible rendering modes
- 📦 **API Endpoints** - Native REST API endpoint support
- 🎨 **Theme System** - Light/dark theme switching
- 🔐 **Authentication** - Complete login/register/forgot password flow
- 📊 **Dashboard** - Data visualization and business management

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Astro | 5.x | Islands architecture framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Atomic CSS |
| Vite | Built-in | Build tool |
| @astrojs/node | 9.x | Node.js adapter |
| Vitest | 4.x | Unit testing |

## Core Features

- **Islands Architecture** - Zero JS by default, hydrate interactive components on demand
- **Multi-framework Support** - Use React, Vue, Svelte components in the same project
- **Content-first** - Static-first, ultimate initial load performance
- **SSR Support** - Server-side rendering via @astrojs/node adapter
- **File-based Routing** - Automatic routing based on file system
- **API Endpoints** - Native support for REST API endpoints

## Directory Structure

```
halolight-astro/
├── src/
│   ├── pages/                    # File-based routing
│   │   ├── index.astro          # Home
│   │   ├── privacy.astro        # Privacy Policy
│   │   ├── terms.astro          # Terms of Service
│   │   ├── auth/                # Auth pages
│   │   │   ├── login.astro
│   │   │   ├── register.astro
│   │   │   ├── forgot-password.astro
│   │   │   └── reset-password.astro
│   │   ├── dashboard/           # Dashboard pages
│   │   │   ├── index.astro      # Dashboard home
│   │   │   ├── analytics.astro  # Analytics
│   │   │   ├── users.astro      # User management
│   │   │   ├── accounts.astro   # Account management
│   │   │   ├── documents.astro  # Document management
│   │   │   ├── files.astro      # File management
│   │   │   ├── messages.astro   # Message center
│   │   │   ├── notifications.astro
│   │   │   ├── calendar.astro   # Calendar
│   │   │   ├── profile.astro    # Profile
│   │   │   └── settings/        # Settings
│   │   └── api/                 # API endpoints
│   │       └── auth/
│   │           ├── login.ts
│   │           ├── register.ts
│   │           ├── forgot-password.ts
│   │           └── reset-password.ts
│   ├── layouts/                 # Layout components
│   │   ├── Layout.astro         # Base layout
│   │   ├── AuthLayout.astro     # Auth layout
│   │   ├── DashboardLayout.astro # Dashboard layout
│   │   └── LegalLayout.astro    # Legal pages layout
│   ├── components/              # UI components
│   │   └── dashboard/
│   │       ├── Sidebar.astro    # Sidebar
│   │       └── Header.astro     # Top navigation
│   ├── styles/                  # Global styles
│   │   └── globals.css
│   └── assets/                  # Static assets
├── public/                      # Public assets
├── tests/                       # Test files
├── astro.config.mjs            # Astro config
├── tailwind.config.mjs         # Tailwind config
├── vitest.config.ts            # Test config
└── package.json
```

## Quick Start

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

### Installation

```bash
git clone https://github.com/halolight/halolight-astro.git
cd halolight-astro
pnpm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

```env
# .env.local example
PUBLIC_API_URL=/api
PUBLIC_MOCK=true
PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
PUBLIC_DEMO_PASSWORD=123456
PUBLIC_SHOW_DEMO_HINT=true
PUBLIC_APP_TITLE=Admin Pro
PUBLIC_BRAND_NAME=Halolight
```

### Start Development

```bash
pnpm dev
```

Visit http://localhost:4321

### Build for Production

```bash
pnpm build
pnpm preview
```

## Demo Account

| Role | Email | Password |
|------|------|------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Core Functionality

### Islands Architecture

Astro's Islands architecture allows pages to be static HTML by default, with JavaScript only added to interactive components:

```astro
---
// Static import, no JS
import StaticCard from '../components/StaticCard.astro';
// Interactive component (can be from React/Vue/Svelte)
import Counter from '../components/Counter.tsx';
---

<!-- Pure static, zero JS -->
<StaticCard title="Statistics" />

<!-- Hydrate on page load -->
<Counter client:load />

<!-- Hydrate when visible (lazy load) -->
<Counter client:visible />

<!-- Hydrate when browser is idle -->
<Counter client:idle />
```

**Client Directives**:

| Directive | Behavior | Use Case |
|------|------|----------|
| `client:load` | Hydrate immediately on page load | Critical interactions |
| `client:idle` | Hydrate when browser is idle | Non-critical interactions |
| `client:visible` | Hydrate when element is visible | Lazy-loaded components |
| `client:only` | Client-side rendering only | Browser API dependent |
| `client:media` | Hydrate when media query matches | Responsive components |

### Layout System

```astro
---
// layouts/DashboardLayout.astro
import Layout from './Layout.astro';
import Sidebar from '../components/dashboard/Sidebar.astro';
import Header from '../components/dashboard/Header.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
const currentPath = Astro.url.pathname;
---

<Layout title={title} description={description}>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar currentPath={currentPath} />
    <div class="lg:pl-64">
      <Header title={title} />
      <main class="p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</Layout>
```

### API Endpoints

Astro natively supports creating API endpoints:

```typescript
// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { email, password } = body;

  // Validation logic
  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, message: 'Email and password are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Authentication logic...

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Login successful',
      user: { id: 1, name: 'Admin', role: 'admin' },
      token: 'mock_token',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
```

### File-based Routing

| File Path | URL | Description |
|----------|-----|------|
| `src/pages/index.astro` | `/` | Home |
| `src/pages/auth/login.astro` | `/auth/login` | Login |
| `src/pages/dashboard/index.astro` | `/dashboard` | Dashboard |
| `src/pages/dashboard/[id].astro` | `/dashboard/:id` | Dynamic route |
| `src/pages/api/auth/login.ts` | `/api/auth/login` | API endpoint |

## Page Routes

| Path | Page | Permission |
|------|------|------|
| `/` | Home | Public |
| `/auth/login` | Login | Public |
| `/auth/register` | Register | Public |
| `/auth/forgot-password` | Forgot Password | Public |
| `/auth/reset-password` | Reset Password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/dashboard/analytics` | Analytics | `analytics:view` |
| `/dashboard/users` | User Management | `users:view` |
| `/dashboard/accounts` | Account Management | `accounts:view` |
| `/dashboard/documents` | Document Management | `documents:view` |
| `/dashboard/files` | File Management | `files:view` |
| `/dashboard/messages` | Message Center | `messages:view` |
| `/dashboard/notifications` | Notification Center | `notifications:view` |
| `/dashboard/calendar` | Calendar | `calendar:view` |
| `/dashboard/profile` | Profile | `settings:view` |
| `/dashboard/settings` | Settings | `settings:view` |
| `/privacy` | Privacy Policy | Public |
| `/terms` | Terms of Service | Public |

## Environment Variables

### Configuration

```bash
# .env
PUBLIC_API_URL=/api
PUBLIC_MOCK=true
PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
PUBLIC_DEMO_PASSWORD=123456
PUBLIC_SHOW_DEMO_HINT=true
PUBLIC_APP_TITLE=Admin Pro
PUBLIC_BRAND_NAME=Halolight
```

### Variable Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_API_URL` | API base URL | `/api` |
| `PUBLIC_MOCK` | Enable mock data | `true` |
| `PUBLIC_APP_TITLE` | App title | `Admin Pro` |
| `PUBLIC_BRAND_NAME` | Brand name | `Halolight` |
| `PUBLIC_DEMO_EMAIL` | Demo account email | - |
| `PUBLIC_DEMO_PASSWORD` | Demo account password | - |
| `PUBLIC_SHOW_DEMO_HINT` | Show demo hint | `false` |

### Usage

```astro
---
// In .astro files
const apiUrl = import.meta.env.PUBLIC_API_URL;
const isMock = import.meta.env.PUBLIC_MOCK === 'true';
---
```

```typescript
// In .ts files
const apiUrl = import.meta.env.PUBLIC_API_URL;
```

## Common Commands

```bash
# Development
pnpm dev              # Start dev server (default port 4321)
pnpm dev --port 3000  # Specify port

# Build
pnpm build            # Production build
pnpm preview          # Preview production build

# Checks
pnpm astro check      # Type check
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint autofix

# Tests
pnpm test             # Run tests
pnpm test:run         # Single run
pnpm test:coverage    # Coverage report

# Astro CLI
pnpm astro add react     # Add React integration
pnpm astro add vue       # Add Vue integration
pnpm astro add tailwind  # Add Tailwind
pnpm astro add mdx       # Add MDX support
```

## Testing

```bash
# Run tests
pnpm test

# Generate coverage report
pnpm test --coverage
```

### Testing Examples

```typescript
// tests/components/Counter.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../../src/components/Counter';

describe('Counter', () => {
  it('renders with initial count', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments count on button click', () => {
    render(<Counter />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
```

## Configuration

### Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',  // SSR mode
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 4321,
    host: true,
  },
});
```

### Output Modes

| Mode | Description | Use Case |
|------|------|----------|
| `static` | Static site generation (SSG) | Blogs, documentation |
| `server` | Server-side rendering (SSR) | Dynamic applications |
| `hybrid` | Hybrid mode | Partially dynamic |

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-astro)

```bash
# Install adapter
pnpm add @astrojs/vercel

# astro.config.mjs
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

### Docker

```dockerfile
FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
```

### Other Platforms

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## CI/CD

Complete GitHub Actions CI workflow configuration:

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
      - run: pnpm astro check

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

### Content Collections

Astro's built-in content management system with type-safe Markdown/MDX content.

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogLayout title={post.data.title}>
  <article>
    <h1>{post.data.title}</h1>
    <time>{post.data.pubDate.toLocaleDateString()}</time>
    <Content />
  </article>
</BlogLayout>
```

### View Transitions

Native View Transitions API support for smooth page animations.

```astro
---
// src/layouts/Layout.astro
import { ViewTransitions } from 'astro:transitions';
---

<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <slot />
  </body>
</html>
```

```astro
---
// Custom transition animations
---
<div transition:name="hero">
  <h1 transition:animate="slide">Welcome</h1>
</div>

<style>
  /* Custom animations */
  @keyframes slide-in {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  ::view-transition-old(hero) {
    animation: slide-out 0.3s ease-out;
  }

  ::view-transition-new(hero) {
    animation: slide-in 0.3s ease-out;
  }
</style>
```

### Middleware

Request interception and processing.

```typescript
// src/middleware.ts
import { defineMiddleware, sequence } from 'astro:middleware';

// Authentication middleware
const auth = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('token')?.value;

  // Protected routes
  const protectedPaths = ['/dashboard', '/profile', '/settings'];
  const isProtected = protectedPaths.some(path =>
    context.url.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return context.redirect('/auth/login');
  }

  // Pass user info to pages
  if (token) {
    context.locals.user = await verifyToken(token);
  }

  return next();
});

// Logger middleware
const logger = defineMiddleware(async (context, next) => {
  const start = Date.now();
  const response = await next();
  const duration = Date.now() - start;

  console.log(`${context.request.method} ${context.url.pathname} - ${duration}ms`);

  return response;
});

// Compose middleware
export const onRequest = sequence(logger, auth);
```

## Performance Optimization

### Image Optimization

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/hero.png';
---

<!-- Auto-optimized images -->
<Image src={myImage} alt="Hero" width={800} height={600} />

<!-- Remote images -->
<Image
  src="https://example.com/image.jpg"
  alt="Remote"
  width={400}
  height={300}
  inferSize
/>
```

### Lazy Loading Components

```astro
---
// Use client:visible for lazy loading
import HeavyComponent from '../components/HeavyComponent';
---

<!-- Load only when element is visible -->
<HeavyComponent client:visible />
```

### Preload

```astro
---
// Preload critical resources
---
<head>
  <link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin />
  <link rel="preconnect" href="https://api.example.com" />
  <link rel="dns-prefetch" href="https://cdn.example.com" />
</head>
```

### Code Splitting

```astro
---
// Dynamically import heavy components
const Chart = await import('../components/Chart.tsx');
---

<Chart.default client:visible data={data} />
```

## FAQ

### Q: How do I share state between Islands?

A: Use nanostores or Zustand:

```bash
pnpm add nanostores @nanostores/react
```

```typescript
// src/stores/counter.ts
import { atom } from 'nanostores';

export const $counter = atom(0);

export function increment() {
  $counter.set($counter.get() + 1);
}
```

```tsx
// React component
import { useStore } from '@nanostores/react';
import { $counter, increment } from '../stores/counter';

export function Counter() {
  const count = useStore($counter);
  return <button onClick={increment}>{count}</button>;
}
```

### Q: How do I handle form submissions?

A: Use API endpoints:

```astro
---
// src/pages/contact.astro
---
<form method="POST" action="/api/contact">
  <input name="email" type="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Submit</button>
</form>
```

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const message = data.get('message');

  // Handle form data
  await sendEmail({ email, message });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

### Q: How do I implement authentication?

A: Use middleware + Cookies:

```typescript
// src/middleware.ts
export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('auth-token')?.value;

  if (context.url.pathname.startsWith('/dashboard') && !token) {
    return context.redirect('/auth/login');
  }

  if (token) {
    try {
      const user = await verifyToken(token);
      context.locals.user = user;
    } catch {
      context.cookies.delete('auth-token');
      return context.redirect('/auth/login');
    }
  }

  return next();
});
```

### Q: What if the bundle size is too large?

A: Optimization suggestions:
1. Check `client:` directive usage, prefer `client:visible` or `client:idle`
2. Use dynamic imports
3. Remove unused integrations
4. Use `@playform/compress` to compress output

```bash
pnpm add @playform/compress
```

```javascript
// astro.config.mjs
import compress from '@playform/compress';

export default defineConfig({
  integrations: [compress()],
});
```

## Comparison with Other Versions

| Feature | Astro | Next.js | Vue |
|------|-------|---------|-----|
| Default JS Size | 0 KB | ~80 KB | ~70 KB |
| Islands Architecture | Native support | Not supported | Not supported (Nuxt) |
| Multi-framework Components | Supported | Not supported | Not supported |
| SSG/SSR | Supported | Supported | Supported (Nuxt) |
| Learning Curve | Low | Medium | Medium |

## Related Links

- [Live Preview](https://halolight-astro.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-astro)
- [Astro Docs](https://docs.astro.build)
- [Astro Integrations](https://astro.build/integrations)
- [Astro Themes](https://astro.build/themes)
- [HaloLight Docs](https://docs.halolight.h7ml.cn)
