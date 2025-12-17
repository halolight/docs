# Next.js Version

HaloLight Next.js version is built on Next.js 14 App Router with React 18 + TypeScript.

**Live Preview**: [https://halolight.h7ml.cn/](https://halolight.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight](https://github.com/halolight/halolight)

## Features

- 🏗️ **Next.js 14 App Router** - Server components & streaming rendering
- ⚡ **Zustand State Management** - Lightweight state management solution
- 🎨 **Theme System** - 11 skins, dark/light mode, View Transitions
- 🔐 **Authentication System** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization & business management
- 🛡️ **Permission Control** - RBAC fine-grained permission management
- 📑 **Multi-Tab Navigation** - Tab bar management
- ⌘ **Command Palette** - Keyboard shortcut navigation

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 14.x | React full-stack framework (App Router) |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| shadcn/ui | latest | UI component library (28 components) |
| Zustand | 5.x | State management (6 Stores) |
| TanStack Query | 5.x | Server state |
| React Hook Form | 7.x | Form handling |
| Zod | 4.x | Data validation |
| react-grid-layout | 1.x | Drag-and-drop layout |
| Recharts | 3.x | Chart visualization |
| Framer Motion | 12.x | Animation effects |
| Mock.js | 1.x | Data mocking |
| next-pwa | 5.x | PWA support |

## Core Features

- **Configurable Dashboard** - 9 widget types, drag-and-drop layout, responsive adaptation
- **Multi-Tab Navigation** - Browser-style tabs, context menu, state caching
- **Permission System** - RBAC permission control, route guards, permission components
- **Theme System** - 11 skins, dark/light mode, View Transitions
- **Multi-Account Switching** - Quick account switch, remember login state
- **Command Palette** - Keyboard shortcuts (⌘K), global search
- **Real-time Notifications** - WebSocket push, notification center

## Directory Structure

```
halolight/
├── src/
│   ├── app/                      # App Router pages
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── login/           # Login
│   │   │   ├── register/        # Register
│   │   │   ├── forgot-password/ # Forgot password
│   │   │   ├── reset-password/  # Reset password
│   │   │   └── layout.tsx       # Auth layout
│   │   ├── (dashboard)/         # Dashboard route group
│   │   │   ├── page.tsx         # Dashboard home (configurable)
│   │   │   ├── accounts/        # Account & permissions
│   │   │   ├── analytics/       # Analytics
│   │   │   ├── calendar/        # Calendar
│   │   │   ├── docs/            # Help docs
│   │   │   ├── documents/       # Document management
│   │   │   ├── files/           # File storage
│   │   │   ├── messages/        # Message center
│   │   │   ├── notifications/   # Notification center
│   │   │   ├── profile/         # User profile
│   │   │   ├── users/           # User management
│   │   │   ├── settings/        # System settings
│   │   │   │   └── teams/       # Team management
│   │   │   │       └── roles/   # Role management
│   │   │   └── layout.tsx       # Dashboard layout
│   │   ├── (legal)/             # Legal route group
│   │   │   ├── privacy/         # Privacy policy
│   │   │   ├── terms/           # Terms of service
│   │   │   └── layout.tsx
│   │   ├── layout.tsx           # Root layout
│   │   ├── error.tsx            # Error page
│   │   └── not-found.tsx        # 404 page
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components (28)
│   │   ├── layout/              # Layout components (11)
│   │   │   ├── admin-layout.tsx # Admin layout
│   │   │   ├── sidebar.tsx      # Collapsible sidebar
│   │   │   ├── header.tsx       # Header (notifications/errors/user menu)
│   │   │   ├── footer.tsx       # Footer
│   │   │   ├── tab-bar.tsx      # Multi-tab navigation
│   │   │   ├── command-menu.tsx # Command palette (⌘K)
│   │   │   ├── quick-settings.tsx # UI settings panel
│   │   │   ├── theme-toggle.tsx # Theme toggle
│   │   │   └── pending-overlay.tsx # Loading overlay
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── configurable-dashboard.tsx # Configurable dashboard
│   │   │   ├── charts.tsx       # Chart components
│   │   │   ├── stats-card.tsx   # Stats card
│   │   │   └── recent-activity.tsx # Recent activity
│   │   └── shared/              # Shared components
│   ├── hooks/                   # React Hooks (15)
│   │   ├── use-users.ts         # User CRUD
│   │   ├── use-teams.ts         # Team management
│   │   ├── use-messages.ts      # Message management
│   │   ├── use-notifications.ts # Notification management
│   │   ├── use-calendar.ts      # Calendar data
│   │   ├── use-documents.ts     # Document management
│   │   ├── use-files.ts         # File management
│   │   ├── use-dashboard.ts     # Dashboard state
│   │   ├── use-dashboard-data.ts # Dashboard data Hook collection
│   │   ├── use-chart-palette.ts # Chart palette (theme-aware)
│   │   ├── use-action-mutation.ts # Server Action wrapper
│   │   ├── use-keep-alive.tsx   # Page state caching
│   │   ├── use-tdk.ts           # TDK management
│   │   └── use-title.ts         # Page title
│   ├── stores/                  # Zustand Stores (6)
│   │   ├── auth-store.ts        # Auth state (with multi-account)
│   │   ├── ui-settings-store.ts # UI settings
│   │   ├── dashboard-store.ts   # Dashboard state
│   │   ├── navigation-store.ts  # Navigation state
│   │   ├── tabs-store.ts        # Tab state
│   │   └── error-store.ts       # Error collection
│   ├── providers/               # React Providers (8)
│   │   ├── app-providers.tsx    # Provider aggregation
│   │   ├── auth-provider.tsx    # Auth Provider
│   │   ├── theme-provider.tsx   # Theme Provider
│   │   ├── query-provider.tsx   # TanStack Query
│   │   ├── error-provider.tsx   # Error handling
│   │   ├── permission-provider.tsx # Permission check
│   │   ├── websocket-provider.tsx # WebSocket real-time notifications
│   │   └── keep-alive-provider.tsx # Page keep-alive
│   ├── actions/                 # Server Actions
│   ├── config/                  # Configuration
│   │   ├── routes.ts            # Routes & permissions config
│   │   └── tdk.ts               # TDK config
│   ├── lib/                     # Utility library
│   │   └── api/                 # API client
│   ├── mock/                    # Mock data (9 modules)
│   └── middleware.ts            # Middleware (auth + security headers)
├── public/
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service Worker
│   ├── icons/                   # PWA icons (8 sizes)
│   ├── screenshots/             # PWA screenshots
│   └── fonts/                   # Self-hosted fonts
├── next.config.mjs              # Next.js + PWA config
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Quick Start

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

### Installation

```bash
git clone https://github.com/halolight/halolight.git
cd halolight
pnpm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

```env
# .env.local example
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_MOCK=true              # Enable Mock data
NEXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NEXT_PUBLIC_DEMO_PASSWORD=123456
NEXT_PUBLIC_SHOW_DEMO_HINT=false
NEXT_PUBLIC_WS_URL=                # WebSocket URL
NEXT_PUBLIC_APP_TITLE=Admin Pro
NEXT_PUBLIC_BRAND_NAME=Halolight
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

## Demo Account

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Core Functionality

### 1. State Management (Zustand)

```tsx
// stores/auth-store.ts
interface AuthState {
  user: AccountWithToken | null
  accounts: AccountWithToken[]        // Multi-account list
  activeAccountId: string | null      // Current account

  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  switchAccount: (accountId: string) => Promise<void>  // Quick account switch
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  checkAuth: () => Promise<void>
}

// Cookie-based token storage with "Remember me" support (7 days / 1 day)
Cookies.set("token", response.token, {
  expires: data.remember ? 7 : 1,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
})
```

### 2. Data Fetching (TanStack Query)

```tsx
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useUsers() {
  const queryClient = useQueryClient()

  // Query user list
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  // Create user
  const createUser = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return { data, isLoading, createUser }
}
```

### 3. Permission Control

```tsx
// Route permission config
export const ROUTE_PERMISSIONS: Record<string, Permission> = {
  "/": "dashboard:view",
  "/users": "users:view",
  "/analytics": "analytics:view",
  // ...
}

// Permission check
const { hasPermission } = usePermission()
if (hasPermission("users:delete")) {
  // Show delete button
}
```

```tsx
// Permission guard component
<PermissionGuard permission="users:delete" fallback={<Disabled />}>
  <DeleteButton />
</PermissionGuard>
```

### 4. Draggable Dashboard

```tsx
// Dashboard edit mode
const { isEditing, setIsEditing, addWidget, removeWidget, resetToDefault } = useDashboardStore()

// Responsive layout (columns auto-adapt)
// lg: 12 cols, md: 8 cols, sm: 4 cols, xs: 2 cols, mobile: 1 col
```

Supports 9 widget types:

| Widget Type | Description | Data Source |
|-------------|-------------|-------------|
| `stats` | Statistics card (4 metrics) | useDashboardStats |
| `chart-line` | Line chart (visit trends) | useDashboardVisits |
| `chart-bar` | Bar chart (sales statistics) | useDashboardSales |
| `chart-pie` | Pie chart (traffic distribution) | useDashboardPie |
| `recent-users` | Recent users list | useDashboardUsers |
| `notifications` | Notifications list | useDashboardNotifications |
| `tasks` | Todo tasks | useDashboardTasks |
| `calendar` | Today's schedule | useDashboardCalendar |
| `quick-actions` | Quick action shortcuts | Static config |

## Theme System

### Skin Presets

Supports 11 skin presets with live preview and smooth transition animations:

| Preset | Name | Description |
|--------|------|-------------|
| `default` | Shadcn · Neutral | Official default neutral colors |
| `blue` | Shadcn · Blue | Blue primary + cool-toned charts |
| `emerald` | Shadcn · Emerald | Fresh green, ideal for data display |
| `amber` | Shadcn · Amber | Amber/orange, warm and vibrant |
| `violet` | Shadcn · Violet | High-saturation purple, tech feel |
| `rose` | Shadcn · Rose | Rose primary, contrasting charts |
| `teal` | Shadcn · Teal | Teal primary, modern feel |
| `slate` | Shadcn · Slate | Low-saturation gray-blue, utilitarian |
| `ocean` | Legacy · Ocean Blue | Blue-green gradient |
| `sunset` | Legacy · Sunset Orange | Orange-pink contrast |
| `aurora` | Legacy · Aurora Green | Cyan-green + purple |

### CSS Variables (OKLch)

```css
/* Example variable definitions */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  --muted: 96.4% 0.004 285.75;
  --accent: 96.4% 0.004 285.75;
  /* ... */
}
```

## Page Routes

| Path | Page | Permission |
|------|------|------------|
| `/` | Redirect to dashboard | - |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot password | Public |
| `/reset-password` | Reset password | Public |
| `/dashboard` | Configurable dashboard | `dashboard:view` |
| `/accounts` | Account & permissions | `settings:view` |
| `/analytics` | Analytics | `analytics:view` |
| `/calendar` | Calendar | `calendar:view` |
| `/documents` | Document management | `documents:view` |
| `/files` | File storage | `files:view` |
| `/messages` | Message center | `messages:view` |
| `/notifications` | Notification center | `notifications:view` |
| `/users` | User management | `users:view` |
| `/settings` | System settings | `settings:view` |
| `/settings/teams` | Team settings | `settings:view` |
| `/settings/teams/roles` | Role management | `settings:view` |
| `/profile` | User profile | `settings:view` |
| `/docs` | Help docs | `documents:view` |
| `/privacy` | Privacy policy | Public |
| `/terms` | Terms of service | Public |

## Environment Variables

### Configuration Example

```bash
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_MOCK=true
NEXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NEXT_PUBLIC_DEMO_PASSWORD=123456
NEXT_PUBLIC_SHOW_DEMO_HINT=false
NEXT_PUBLIC_WS_URL=
NEXT_PUBLIC_APP_TITLE=Admin Pro
NEXT_PUBLIC_BRAND_NAME=Halolight
```

### Variable Description

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API base path | `/api` |
| `NEXT_PUBLIC_MOCK` | Enable Mock data | `true` |
| `NEXT_PUBLIC_DEMO_EMAIL` | Demo account email | `admin@halolight.h7ml.cn` |
| `NEXT_PUBLIC_DEMO_PASSWORD` | Demo account password | `123456` |
| `NEXT_PUBLIC_SHOW_DEMO_HINT` | Show demo hint | `false` |
| `NEXT_PUBLIC_WS_URL` | WebSocket URL | - |
| `NEXT_PUBLIC_APP_TITLE` | Application title | `Admin Pro` |
| `NEXT_PUBLIC_BRAND_NAME` | Brand name | `Halolight` |

### Usage

```tsx
// Use in client components
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const isMock = process.env.NEXT_PUBLIC_MOCK === 'true'
```

## Common Commands

```bash
pnpm dev            # Start development server
pnpm build          # Production build
pnpm start          # Preview production build
pnpm lint           # Code linting
pnpm lint:fix       # Auto fix
pnpm type-check     # Type checking
pnpm test           # Run tests
pnpm test:coverage  # Test coverage
```

## Testing

```bash
pnpm test           # Run tests (watch mode)
pnpm test:run       # Single run
pnpm test:coverage  # Coverage report
pnpm test:ui        # Vitest UI interface
```

### Test Example

```tsx
// __tests__/components/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Configuration

### Next.js Configuration

```js
// next.config.mjs
import withPWA from "next-pwa"

const nextConfig = {
  // Package import optimization - reduce bundle size
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-*",
      "lucide-react",
      "framer-motion",
      "@tanstack/react-query",
      "recharts",
      "zustand",
    ],
  },

  // Remove console in production
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },

  // Disable source maps
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

export default pwaConfig(nextConfig)
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight)

```bash
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

```bash
docker build -t halolight-nextjs .
docker run -p 3000:3000 halolight-nextjs
```

### Other Platforms

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## CI/CD

The project has a complete GitHub Actions CI workflow configured:

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

### Multi-Tab Navigation

```tsx
// stores/tabs-store.ts
interface Tab {
  id: string
  title: string
  path: string
  icon?: string
  closable?: boolean  // Home tab not closable
}

// Context menu features
- Refresh page
- Close tab
- Close others
- Close right tabs
- Close all
```

### Page State Caching (Keep-Alive)

```tsx
// hooks/use-keep-alive.tsx

// Auto save/restore scroll position
useScrollRestore()

// Save form state
const [values, saveValues, clearCache] = useFormCache('filter-form', initialValues)

// Save custom state
const [state, setState] = useStateCache('my-key', initialValue)
```

### Command Palette (⌘K)

```tsx
// components/layout/command-menu.tsx
// Supports keyboard quick navigation, theme switching, account switching, logout, etc.

Shortcuts:
- ⌘K / Ctrl+K - Open command palette
- Search pages - Quick navigation to any page
- Switch theme - Toggle dark/light mode
- Switch account - Quick account switching
```

### Real-time Notifications (WebSocket)

```tsx
// providers/websocket-provider.tsx
const { status, lastMessage, sendMessage, reconnect } = useWebSocket()

// Listen for new notifications
useRealtimeNotifications((notification) => {
  console.log('New notification:', notification)
})

// Connection status
status === 'Open' // Connected
status === 'Connecting' // Connecting
status === 'Closed' // Disconnected
```

### PWA Support

```js
// next.config.mjs
const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    // Font caching (1 year)
    { urlPattern: /\.(?:woff|woff2|ttf)$/i, handler: "CacheFirst" },
    // Image caching (24 hours)
    { urlPattern: /\.(?:jpg|png|svg|webp)$/i, handler: "StaleWhileRevalidate" },
    // Next.js static assets (1 year)
    { urlPattern: /\/_next\/static\/.+\.(js|css)$/i, handler: "CacheFirst" },
    // Page data (1 hour)
    { urlPattern: /\/_next\/data\/.+\.json$/i, handler: "NetworkFirst" },
  ],
})
```

Features:
- **Offline Access** - Service Worker caches static assets
- **Install to Desktop** - Supports Add to Home Screen
- **Self-hosted Fonts** - Inter + JetBrains Mono
- **Icon Support** - 8 sizes (72x72 ~ 512x512)

## Performance Optimization

### Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/images/hero.png"
  alt="Hero"
  width={800}
  height={600}
  priority // Priority loading
  placeholder="blur" // Blur placeholder
/>

// next.config.mjs
images: {
  formats: ["image/avif", "image/webp"],
}
```

### Lazy Loading Components

```tsx
// Dynamic import components
import dynamic from 'next/dynamic'

const DashboardChart = dynamic(
  () => import('@/components/dashboard/chart'),
  {
    loading: () => <Skeleton />,
    ssr: false // Disable SSR
  }
)
```

### Preloading

```tsx
// Route preloading
import Link from 'next/link'

<Link href="/dashboard" prefetch>
  Dashboard
</Link>

// Data preloading
queryClient.prefetchQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
```

### Package Import Optimization

```js
// next.config.mjs
experimental: {
  optimizePackageImports: [
    "@radix-ui/react-*",
    "lucide-react",
    "framer-motion",
    "@tanstack/react-query",
    "recharts",
    "zustand",
  ],
}
```

## FAQ

### Q: How to disable Mock data?

A: Set `NEXT_PUBLIC_MOCK=false` in `.env.local` and configure real API address.

```env
NEXT_PUBLIC_MOCK=false
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Q: How to add a new page?

A: Create a new directory and `page.tsx` file under `src/app/(dashboard)`.

```tsx
// src/app/(dashboard)/my-page/page.tsx
export default function MyPage() {
  return <div>My Page</div>
}

// Add route permission
// src/config/routes.ts
export const ROUTE_PERMISSIONS = {
  // ...
  "/my-page": "my-page:view",
}
```

### Q: How to customize theme colors?

A: Modify CSS variables in `tailwind.config.js`.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
      },
    },
  },
}
```

```css
/* app/globals.css */
:root {
  --primary: 51.1% 0.262 276.97; /* Change to your color */
}
```

### Q: How to disable PWA?

A: Set `disable: true` in `next.config.mjs`.

```js
const pwaConfig = withPWA({
  dest: "public",
  disable: true, // Disable PWA
})
```

### Q: How to deploy to static hosting platforms?

A: Configure static export mode.

```js
// next.config.mjs
export default {
  output: 'export',
  images: {
    unoptimized: true, // Need to disable image optimization for static export
  },
}
```

```bash
pnpm build
# Output to out/ directory
```

## Comparison with Other Versions

| Feature | Next.js | Vue | Angular |
|---------|---------|-----|---------|
| SSR/SSG | ✅ | ✅ (Nuxt) | ✅ (Universal) |
| State Management | Zustand | Pinia | Services + RxJS |
| Router | App Router | Vue Router | Angular Router |
| Build Tool | Next.js | Vite | esbuild + Vite |
| Component Library | shadcn/ui | shadcn-vue | Angular Material |
| Learning Curve | Medium | Low | High |
| Performance | Excellent | Excellent | Excellent |

## Related Links

- [Live Preview](https://halolight.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight)
- [Next.js Official Documentation](https://nextjs.org/docs)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)

