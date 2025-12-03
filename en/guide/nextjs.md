# Next.js Version

HaloLight Next.js version is built on Next.js 14 App Router with React 18 + TypeScript.

**Live Preview**: [https://halolight.h7ml.cn/](https://halolight.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight](https://github.com/halolight/halolight)

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 14.x | React full-stack framework |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| shadcn/ui | latest | UI component library |
| Zustand | 5.x | State management |
| TanStack Query | 5.x | Server state |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Data validation |
| react-grid-layout | 1.x | Drag-and-drop layout |
| ECharts | 5.x | Chart visualization |
| Mock.js | 1.x | Data mocking |

## Directory Structure

```
halolight/
├── src/
│   ├── app/                      # App Router pages
│   │   ├── (admin)/             # Admin route group
│   │   │   ├── dashboard/       # Dashboard
│   │   │   ├── users/           # User management
│   │   │   ├── roles/           # Role management
│   │   │   ├── permissions/     # Permission management
│   │   │   ├── settings/        # System settings
│   │   │   └── profile/         # User profile
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home redirect
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components (30+)
│   │   ├── layout/              # Layout components
│   │   │   ├── admin-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/           # Dashboard components
│   │   │   ├── dashboard-grid.tsx
│   │   │   ├── widget-wrapper.tsx
│   │   │   ├── stats-widget.tsx
│   │   │   ├── chart-widget.tsx
│   │   │   └── ...
│   │   └── shared/              # Shared components
│   ├── hooks/                   # React Hooks
│   │   ├── use-users.ts
│   │   ├── use-auth.ts
│   │   └── ...
│   ├── stores/                  # Zustand Stores
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   ├── dashboard.ts
│   │   ├── navigation.ts
│   │   └── tabs.ts
│   ├── services/                # API services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── ...
│   ├── lib/                     # Utility library
│   │   ├── utils.ts
│   │   └── cn.ts
│   ├── types/                   # Type definitions
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── ...
│   └── mocks/                   # Mock data
│       ├── index.ts
│       └── modules/
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

```tsx
// stores/auth.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

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

      hasPermission: (permission) => {
        const permissions = get().user?.permissions || []
        return permissions.some(p =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    { name: 'auth' }
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

```tsx
// components/dashboard/dashboard-grid.tsx
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function DashboardGrid() {
  const { layouts, updateLayout, isEditing } = useDashboardStore()

  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 8, sm: 4 }}
      rowHeight={80}
      isDraggable={isEditing}
      isResizable={isEditing}
      onLayoutChange={(_, allLayouts) => updateLayout(allLayouts)}
    >
      {widgets.map(widget => (
        <div key={widget.id}>
          <WidgetWrapper widget={widget} />
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
| `/users` | User list | `users:list` |
| `/users/create` | Create user | `users:create` |
| `/users/[id]` | User details | `users:view` |
| `/users/[id]/edit` | Edit user | `users:update` |
| `/roles` | Role management | `roles:list` |
| `/permissions` | Permission management | `permissions:list` |
| `/settings` | System settings | `settings:view` |
| `/profile` | User profile | Authenticated |

## UI Components

Based on shadcn/ui, 30+ components integrated:

- **Forms**: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker
- **Data Display**: Table, Card, Badge, Avatar, Progress, Skeleton
- **Feedback**: Dialog, Sheet, Alert, Toast, Tooltip, Popover
- **Navigation**: Tabs, Breadcrumb, Pagination, DropdownMenu, Command
- **Layout**: Accordion, Collapsible, ScrollArea, Separator

## Theme Configuration

```tsx
// Toggle theme
const { theme, setTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'

// Change skin
const { skin, setSkin } = useUISettingsStore()
setSkin('rose') // 11 skin presets
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

### Static Export

```bash
# next.config.js
module.exports = {
  output: 'export'
}

pnpm build
# Output to out/ directory
```
