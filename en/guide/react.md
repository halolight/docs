# React Version

HaloLight React version is built on React 19 + Vite 6, a pure Client-Side Rendering (CSR) Single Page Application (SPA).

**Live Preview**: [https://halolight-react.h7ml.cn/](https://halolight-react.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-react](https://github.com/halolight/halolight-react)

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.x | UI framework |
| Vite | 6.x | Build tool |
| TypeScript | 5.x | Type safety |
| React Router | 6.x | Client-side routing |
| Zustand | 5.x | State management |
| TanStack Query | 5.x | Server state |
| React Hook Form | 7.x | Form handling |
| Zod | 4.x | Data validation |
| Tailwind CSS | 4.x | Atomic CSS |
| shadcn/ui | latest | UI component library |
| react-grid-layout | 1.5.x | Drag-and-drop layout |
| Recharts | 3.x | Chart visualization |
| Framer Motion | 12.x | Animation effects |
| Mock.js | 1.x | Data mocking |

## Directory Structure

```
halolight-react/
├── src/
│   ├── pages/                     # Page components
│   │   ├── auth/                  # Auth pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── dashboard/             # Dashboard
│   │   └── legal/                 # Legal pages
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (20+)
│   │   ├── layout/                # Layout components
│   │   │   ├── admin-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/             # Dashboard components
│   │   │   ├── configurable-dashboard.tsx
│   │   │   ├── widget-wrapper.tsx
│   │   │   ├── stats-widget.tsx
│   │   │   ├── chart-widget.tsx
│   │   │   └── ...
│   │   └── shared/                # Shared components
│   ├── hooks/                     # Custom Hooks
│   │   ├── use-users.ts
│   │   ├── use-auth.ts
│   │   ├── use-theme.ts
│   │   └── ...
│   ├── stores/                    # Zustand Stores
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   ├── dashboard-layout.ts
│   │   └── tabs.ts
│   ├── lib/
│   │   ├── api/                   # API services
│   │   ├── auth/                  # Auth logic
│   │   ├── validations/           # Zod schemas
│   │   └── utils.ts               # Utility functions
│   ├── routes/                    # Route configuration
│   │   └── index.tsx
│   ├── config/                    # Configuration files
│   │   ├── routes.ts
│   │   └── tdk.ts
│   ├── types/                     # Type definitions
│   ├── mock/                      # Mock data
│   ├── providers/                 # Context Providers
│   ├── App.tsx
│   └── main.tsx
├── public/                        # Static assets
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-react.git
cd halolight-react
pnpm install
```

### Environment Variables

```bash
cp .env.example .env.development
```

```env
# .env.development example
VITE_API_URL=/api
VITE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
VITE_DEMO_EMAIL=admin@example.com
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
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

### State Management (Zustand)

```tsx
// stores/auth.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        const response = await authApi.login(credentials)
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      hasPermission: (permission) => {
        const { user } = get()
        if (!user) return false
        return user.permissions.some(p =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)
```

### Data Fetching (TanStack Query)

```tsx
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/lib/api'

export function useUsers(params?: UserQueryParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => usersApi.getList(params),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// Usage in component
function UsersPage() {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{/* Render user list */}</div>
}
```

### Route Configuration (React Router)

```tsx
// routes/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { AuthLayout } from '@/layouts/auth-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <HomePage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'settings', element: <SettingsPage /> },
      // More routes...
    ],
  },
])
```

### Permission Hook

```tsx
// hooks/use-permission.ts
import { useAuthStore } from '@/stores/auth'

export function usePermission(permission: string): boolean {
  const hasPermission = useAuthStore((state) => state.hasPermission)
  return hasPermission(permission)
}

export function usePermissions(permissions: string[]): boolean {
  const hasPermission = useAuthStore((state) => state.hasPermission)
  return permissions.every(p => hasPermission(p))
}
```

```tsx
// Usage
function DeleteButton() {
  const canDelete = usePermission('users:delete')

  if (!canDelete) return null

  return <Button variant="destructive">Delete</Button>
}
```

### Permission Component

```tsx
// components/permission-guard.tsx
import { usePermission } from '@/hooks/use-permission'

interface PermissionGuardProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const hasPermission = usePermission(permission)

  if (!hasPermission) return fallback

  return <>{children}</>
}
```

```tsx
<!-- Usage -->
<PermissionGuard permission="users:delete" fallback={<span>No permission</span>}>
  <DeleteButton />
</PermissionGuard>
```

### Draggable Dashboard

```tsx
// components/dashboard/configurable-dashboard.tsx
import GridLayout from 'react-grid-layout'
import { useDashboardStore } from '@/stores/dashboard-layout'

export function ConfigurableDashboard() {
  const { layout, setLayout, isEditing } = useDashboardStore()

  return (
    <GridLayout
      layout={layout}
      onLayoutChange={setLayout}
      cols={12}
      rowHeight={80}
      isDraggable={isEditing}
      isResizable={isEditing}
      margin={[16, 16]}
    >
      {layout.map((item) => (
        <div key={item.i}>
          <WidgetWrapper widget={getWidget(item.i)} />
        </div>
      ))}
    </GridLayout>
  )
}
```

### Theme Toggle

```tsx
// hooks/use-theme.ts
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')

  const actualTheme = theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(actualTheme)
  }, [actualTheme])

  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark')
  }

  return { theme, actualTheme, setTheme, toggleTheme }
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
| `/users/:id` | User details | `users:view` |
| `/users/:id/edit` | Edit user | `users:update` |
| `/roles` | Role management | `roles:list` |
| `/permissions` | Permission management | `permissions:list` |
| `/settings` | System settings | `settings:view` |
| `/profile` | User profile | Authenticated |

### Route Guards

```tsx
// components/auth-guard.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

interface AuthGuardProps {
  children: React.ReactNode
  permission?: string
}

export function AuthGuard({ children, permission }: AuthGuardProps) {
  const location = useLocation()
  const { isAuthenticated, hasPermission } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
```

## UI Components

Based on shadcn/ui, 20+ components integrated:

- **Forms**: Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, DatePicker
- **Data Display**: Table, Card, Badge, Avatar, Progress, Skeleton
- **Feedback**: Dialog, Sheet, AlertDialog, Toast, Tooltip, Popover
- **Navigation**: Tabs, Breadcrumb, Pagination, DropdownMenu, Command
- **Layout**: Accordion, Collapsible, ScrollArea, Separator

## Recharts Integration

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  // ...
]

function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

## PWA Support

Built-in PWA support including:

- Service Worker registration
- Offline caching
- App manifest (manifest.json)
- Multiple icon sizes

```json
// public/manifest.json
{
  "name": "Admin Pro",
  "short_name": "Admin",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## Deployment

### Vercel

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

### Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/halolight-react/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
    }
}
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Comparison with Next.js Version

| Feature | React Version | Next.js Version |
|---------|---------------|-----------------|
| Rendering | CSR (Client-Side) | SSR/SSG/ISR |
| State Management | Zustand | Zustand |
| Data Fetching | TanStack Query | TanStack Query |
| Form Validation | React Hook Form + Zod | React Hook Form + Zod |
| Drag-and-Drop | react-grid-layout | react-grid-layout |
| UI Components | shadcn/ui | shadcn/ui |
| Routing | React Router | Next.js App Router |
| Charts | Recharts | Recharts |
| SSR | None | Built-in |
| SEO | react-helmet-async | Built-in |
| Deployment | Static hosting / CDN | Vercel / Any platform |

### When to Choose React Version?

- Pure frontend app with separate backend API
- No SSR/SEO optimization needed
- Already have a backend service, just need frontend admin interface
- Want a lighter tech stack
- Deploying to pure static hosting services

### When to Choose Next.js Version?

- Need SEO optimization
- Need SSR/SSG for better initial load performance
- Want frontend-backend integration
- Need API Routes / Server Actions
- Deploying to full-stack platforms like Vercel
