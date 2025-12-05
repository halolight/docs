# Next.js Version

HaloLight Next.js version is built on Next.js 14 App Router with React 18 + TypeScript.

**Live Preview**: [https://halolight.h7ml.cn/](https://halolight.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight](https://github.com/halolight/halolight)

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

## Core Features

### 1. Configurable Dashboard

Supports 9 widget types with drag-and-drop, resize, add and remove capabilities:

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

```tsx
// Dashboard edit mode
const { isEditing, setIsEditing, addWidget, removeWidget, resetToDefault } = useDashboardStore()

// Responsive layout (columns auto-adapt)
// lg: 12 cols, md: 8 cols, sm: 4 cols, xs: 2 cols, mobile: 1 col
```

### 2. Multi-Account Authentication System

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

### 3. Multi-Tab Navigation

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

### 4. Page State Caching (Keep-Alive)

```tsx
// hooks/use-keep-alive.tsx

// Auto save/restore scroll position
useScrollRestore()

// Save form state
const [values, saveValues, clearCache] = useFormCache('filter-form', initialValues)

// Save custom state
const [state, setState] = useStateCache('my-key', initialValue)
```

### 5. Command Palette (⌘K)

Supports keyboard quick navigation, theme switching, account switching, logout and more.

### 6. UI Settings Panel

```tsx
// Theme mode
setTheme('light' | 'dark' | 'system')

// Skin switching (with View Transitions animation)
setSkin(skinPreset)

// Layout controls
setShowFooter(boolean)      // Show/hide footer
setShowTabBar(boolean)      // Show/hide tab bar
setMobileHeaderFixed(boolean)   // Fixed header on mobile
setMobileTabBarFixed(boolean)   // Fixed tab bar on mobile
```

### 7. Real-time Notifications (WebSocket)

```tsx
// providers/websocket-provider.tsx
const { status, lastMessage, sendMessage, reconnect } = useWebSocket()

// Listen for new notifications
useRealtimeNotifications((notification) => {
  console.log('New notification:', notification)
})
```

### 8. Permission System

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

// Permission guard component
<PermissionGuard permission="users:delete" fallback={<Disabled />}>
  <DeleteButton />
</PermissionGuard>
```

## Skin Presets

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

## UI Components

Based on shadcn/ui, 28 components integrated:

- **Forms**: Button, Input, InputClear, Textarea, Select, Checkbox, Switch, Label
- **Data Display**: Table, Card, Badge, Avatar, Skeleton
- **Feedback**: Dialog, Sheet, AlertDialog, Tooltip, Popover
- **Navigation**: Tabs, DropdownMenu, ContextMenu, Command, ScrollArea
- **Layout**: Separator
- **Enhanced**: BackToTop, CookieConsent, CommandInputClear, InputClearForm

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

## PWA Support

The project has complete PWA integration:

### Configuration

```js
// next.config.mjs
import withPWA from "next-pwa"

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    // Font caching (1 year)
    { urlPattern: /\.(?:woff|woff2|ttf)$/i, handler: "CacheFirst", ... },
    // Image caching (24 hours)
    { urlPattern: /\.(?:jpg|png|svg|webp)$/i, handler: "StaleWhileRevalidate", ... },
    // Next.js static assets (1 year)
    { urlPattern: /\/_next\/static\/.+\.(js|css)$/i, handler: "CacheFirst", ... },
    // Page data (1 hour)
    { urlPattern: /\/_next\/data\/.+\.json$/i, handler: "NetworkFirst", ... },
  ],
})
```

### Features

- **Offline Access**: Service Worker caches static assets
- **Install to Desktop**: Supports Add to Home Screen
- **Self-hosted Fonts**: Inter + JetBrains Mono
- **Icon Support**: 8 sizes (72x72 ~ 512x512)
- **Screenshot Showcase**: Desktop + Mobile

### manifest.json

```json
{
  "name": "Admin Pro Management System",
  "short_name": "Admin Pro",
  "display": "standalone",
  "orientation": "portrait-primary",
  "categories": ["business", "productivity"],
  "lang": "zh-CN"
}
```

## Security Features

### Middleware Security Headers

```ts
// middleware.ts
response.headers.set("Content-Security-Policy", csp)
response.headers.set("X-Content-Type-Options", "nosniff")
response.headers.set("X-Frame-Options", "DENY")
response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
response.headers.set("X-XSS-Protection", "1; mode=block")
response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
```

### Authentication Protection

- Cookie security attributes (`secure`, `sameSite: strict`)
- Logged-in users cannot access login page
- Unauthenticated users redirected to login (with redirect parameter)

## Build Optimization

```js
// next.config.mjs
{
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
```

## Deployment

### Vercel (Recommended)

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

### Cloudflare Pages

The project supports deployment to Cloudflare Pages, see [Cloudflare version](https://github.com/halolight/halolight-cloudflare).

```bash
pnpm cf:build
pnpm cf:deploy
```

### Static Export

```bash
# next.config.mjs
export default { output: 'export' }

pnpm build
# Output to out/ directory
```
