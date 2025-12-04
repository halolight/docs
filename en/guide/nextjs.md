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
| Zustand | 5.x | State management |
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
│   │   │   ├── page.tsx         # Dashboard home
│   │   │   ├── accounts/        # Account management
│   │   │   ├── analytics/       # Analytics
│   │   │   ├── calendar/        # Calendar
│   │   │   ├── docs/            # Documentation
│   │   │   ├── documents/       # Document management
│   │   │   ├── files/           # File management
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
│   │   │   └── layout.tsx       # Legal pages layout
│   │   ├── layout.tsx           # Root layout
│   │   ├── error.tsx            # Error page
│   │   └── not-found.tsx        # 404 page
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components (28)
│   │   ├── layout/              # Layout components
│   │   │   ├── admin-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── configurable-dashboard.tsx
│   │   │   ├── widget-*.tsx     # 9 widget types
│   │   │   └── ...
│   │   └── shared/              # Shared components
│   ├── hooks/                   # React Hooks (15)
│   │   ├── use-users.ts         # User management
│   │   ├── use-teams.ts         # Team management
│   │   ├── use-messages.ts      # Message management
│   │   ├── use-notifications.ts # Notification management
│   │   ├── use-calendar.ts      # Calendar data
│   │   ├── use-documents.ts     # Document management
│   │   ├── use-files.ts         # File management
│   │   ├── use-dashboard.ts     # Dashboard state
│   │   ├── use-dashboard-data.ts # Dashboard data
│   │   ├── use-chart-palette.ts # Chart color palette
│   │   ├── use-action-mutation.ts # Server Action
│   │   ├── use-keep-alive.tsx   # Page keep-alive
│   │   ├── use-tdk.ts           # TDK management
│   │   ├── use-title.ts         # Page title
│   │   └── index.ts             # Export file
│   ├── stores/                  # Zustand Stores (6)
│   │   ├── auth-store.ts        # Auth state
│   │   ├── ui-settings-store.ts # UI settings
│   │   ├── dashboard-store.ts   # Dashboard state
│   │   ├── navigation-store.ts  # Navigation state
│   │   ├── tabs-store.ts        # Tabs state
│   │   └── error-store.ts       # Error state
│   ├── actions/                 # Server Actions
│   ├── services/                # API services
│   ├── providers/               # React Providers (8)
│   │   ├── app-providers.tsx    # App provider aggregation
│   │   ├── auth-provider.tsx    # Auth provider
│   │   ├── theme-provider.tsx   # Theme provider
│   │   ├── query-provider.tsx   # TanStack Query provider
│   │   ├── error-provider.tsx   # Error provider
│   │   ├── permission-provider.tsx # Permission provider
│   │   ├── websocket-provider.tsx # WebSocket provider
│   │   └── keep-alive-provider.tsx # Page keep-alive provider
│   ├── lib/                     # Utility library
│   ├── config/                  # Configuration
│   │   ├── routes.ts            # Route configuration
│   │   └── tdk.ts               # TDK configuration
│   ├── types/                   # Type definitions
│   ├── mock/                    # Mock data
│   │   ├── index.ts             # Mock entry
│   │   ├── user.ts              # User data
│   │   ├── dashboard.ts         # Dashboard data
│   │   ├── message.ts           # Message data
│   │   ├── notification.ts      # Notification data
│   │   ├── calendar.ts          # Calendar data
│   │   ├── document.ts          # Document data
│   │   ├── file.ts              # File data
│   │   └── team.ts              # Team data
│   └── middleware.ts            # Middleware
├── public/                      # Static assets
├── next.config.js
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
NEXT_PUBLIC_MOCK=false
NEXT_PUBLIC_DEMO_EMAIL=admin@example.com
NEXT_PUBLIC_DEMO_PASSWORD=123456
NEXT_PUBLIC_SHOW_DEMO_HINT=false
NEXT_PUBLIC_WS_URL=
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

### State Management (Zustand)

The project includes 6 stores with `zustand/persist` for persistence:

```tsx
// stores/auth-store.ts - Authentication state management
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  accounts: Account[] // Multi-account support
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (data: ResetPasswordData) => Promise<void>
  switchAccount: (accountId: string) => void // Switch account
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      accounts: [],

      login: async (credentials) => {
        const response = await authService.login(credentials)
        set({
          user: response.user,
          token: response.token,
        })
      },

      logout: () => {
        set({ user: null, token: null })
      },

      switchAccount: (accountId) => {
        const { accounts } = get()
        const account = accounts.find(a => a.id === accountId)
        if (account) {
          set({ user: account.user, token: account.token })
        }
      },

      hasPermission: (permission) => {
        const permissions = get().user?.permissions || []
        return permissions.some(p =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    { name: 'auth-storage' }
  )
)
```

### Data Fetching (TanStack Query)

```tsx
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/users'

export function useUsers(params?: UserQueryParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(params),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### Permission Component

```tsx
// components/permission-guard.tsx
interface PermissionGuardProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({
  permission,
  children,
  fallback = null
}: PermissionGuardProps) {
  const hasPermission = useAuthStore(s => s.hasPermission)

  if (!hasPermission(permission)) {
    return fallback
  }

  return children
}

// Usage
<PermissionGuard permission="users:delete">
  <DeleteButton />
</PermissionGuard>
```

### Draggable Dashboard

Supports 9 widget types with drag-and-drop and resizing:

```tsx
// stores/dashboard-store.ts
export type WidgetType =
  | "stats"         // Statistics
  | "chart-line"    // Line chart
  | "chart-bar"     // Bar chart
  | "chart-pie"     // Pie chart
  | "recent-users"  // Recent users
  | "notifications" // Notifications list
  | "tasks"         // Todo tasks
  | "calendar"      // Today's schedule
  | "quick-actions" // Quick actions

// components/dashboard/configurable-dashboard.tsx
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function ConfigurableDashboard() {
  const { widgets, layouts, isEditing, setLayouts } = useDashboardStore()

  return (
    <ResponsiveGridLayout
      layouts={{ lg: layouts }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
      cols={{ lg: 12, md: 8, sm: 4, xs: 2 }}
      rowHeight={80}
      isDraggable={isEditing}
      isResizable={isEditing}
      onLayoutChange={(layout) => setLayouts(layout)}
    >
      {widgets.map(widget => (
        <div key={widget.id}>
          <WidgetRenderer widget={widget} />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
```

## Page Routes

| Path | Page | Permission |
|------|------|------------|
| `/` | Redirect to `/dashboard` | - |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot password | Public |
| `/reset-password` | Reset password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/accounts` | Account management | `accounts:list` |
| `/analytics` | Analytics | `analytics:view` |
| `/calendar` | Calendar | `calendar:view` |
| `/docs` | Documentation | `docs:view` |
| `/documents` | Document management | `documents:list` |
| `/files` | File management | `files:list` |
| `/messages` | Message center | `messages:list` |
| `/notifications` | Notification center | `notifications:list` |
| `/users` | User management | `users:list` |
| `/settings` | System settings | `settings:view` |
| `/settings/teams` | Team management | `teams:list` |
| `/settings/teams/roles` | Role management | `roles:list` |
| `/profile` | User profile | Authenticated |
| `/privacy` | Privacy policy | Public |
| `/terms` | Terms of service | Public |

## UI Components

Based on shadcn/ui, 28 components integrated:

- **Forms**: Button, Input, InputClear, Textarea, Select, Checkbox, Switch, Label
- **Data Display**: Table, Card, Badge, Avatar, Skeleton
- **Feedback**: Dialog, Sheet, AlertDialog, Tooltip, Popover
- **Navigation**: Tabs, DropdownMenu, ContextMenu, Command, ScrollArea
- **Layout**: Separator
- **Enhanced**: BackToTop, CookieConsent, CommandInputClear, InputClearForm

## Skin Presets

Supports 11 skin presets, switchable via `useUiSettingsStore`:

| Preset | Description |
|--------|-------------|
| `default` | Default theme |
| `blue` | Blue theme |
| `emerald` | Emerald green theme |
| `amber` | Amber theme |
| `violet` | Violet theme |
| `rose` | Rose theme |
| `teal` | Teal theme |
| `slate` | Slate gray theme |
| `ocean` | Ocean blue theme |
| `sunset` | Sunset orange theme |
| `aurora` | Aurora theme |

```tsx
// Switch skin
const { skin, setSkin } = useUiSettingsStore()
setSkin('rose') // Switch to rose theme

// Toggle theme mode
const { theme, setTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'
```

## UI Settings

```tsx
// stores/ui-settings-store.ts
interface UiSettingsState {
  skin: SkinPreset        // Skin preset
  showFooter: boolean     // Show footer
  showTabBar: boolean     // Show tab bar
  mobileHeaderFixed: boolean   // Fixed header on mobile
  mobileTabBarFixed: boolean   // Fixed tab bar on mobile
  // ...
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
# next.config.js
module.exports = {
  output: 'export'
}

pnpm build
# Output to out/ directory
```

## PWA Support

The project integrates `next-pwa` for offline access and desktop installation:

```js
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // Next.js configuration
})
```
