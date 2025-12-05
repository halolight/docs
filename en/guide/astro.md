# Astro Version

HaloLight Astro version is built on Astro 5, featuring Islands architecture with zero JS initial load and ultimate performance.

**Live Preview**: [https://halolight-astro.h7ml.cn/](https://halolight-astro.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-astro](https://github.com/halolight/halolight-astro)

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

- **Islands Architecture**: Zero JS by default, hydrate interactive components on demand
- **Multi-framework Support**: Use React, Vue, Svelte components in the same project
- **Content-first**: Static-first, ultimate initial load performance
- **SSR Support**: Server-side rendering via @astrojs/node adapter
- **File-based Routing**: Automatic routing based on file system
- **API Endpoints**: Native support for REST API endpoints

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

## Core Features

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

### Client Directives

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

| Path | Page | Description |
|------|------|------|
| `/` | Home | Landing page |
| `/auth/login` | Login | User login |
| `/auth/register` | Register | User registration |
| `/auth/forgot-password` | Forgot Password | Password recovery |
| `/auth/reset-password` | Reset Password | Set new password |
| `/dashboard` | Dashboard | Data overview |
| `/dashboard/analytics` | Analytics | Chart statistics |
| `/dashboard/users` | User Management | User list |
| `/dashboard/accounts` | Account Management | Account list |
| `/dashboard/documents` | Document Management | Document list |
| `/dashboard/files` | File Management | File list |
| `/dashboard/messages` | Message Center | Message list |
| `/dashboard/notifications` | Notifications | Notification list |
| `/dashboard/calendar` | Calendar | Schedule management |
| `/dashboard/profile` | Profile | Personal information |
| `/dashboard/settings` | Settings | System settings |
| `/privacy` | Privacy Policy | Legal page |
| `/terms` | Terms of Service | Legal page |

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

### Node.js Server

```bash
pnpm build
node ./dist/server/entry.mjs
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
```

### Vercel

```bash
# Install Vercel adapter
pnpm add @astrojs/vercel

# astro.config.mjs
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  adapter: vercel(),
});
```

### Cloudflare Pages

```bash
# Install Cloudflare adapter
pnpm add @astrojs/cloudflare

# astro.config.mjs
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
});
```

## Testing

```bash
# Run tests
pnpm test

# Generate coverage report
pnpm test --coverage
```

## Comparison with Other Frameworks

| Feature | Astro | Next.js | Nuxt |
|------|-------|---------|------|
| Default JS Size | 0 KB | ~80 KB | ~70 KB |
| Islands Architecture | Native support | Not supported | Not supported |
| Multi-framework Components | Supported | Not supported | Not supported |
| SSG/SSR | Supported | Supported | Supported |
| Learning Curve | Low | Medium | Medium |
