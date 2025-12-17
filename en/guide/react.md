# React Version

HaloLight React version is built on React 19 + Vite 6, a pure Client-Side Rendering (CSR) Single Page Application (SPA).

**Live Preview**: [https://halolight-react.h7ml.cn/](https://halolight-react.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-react](https://github.com/halolight/halolight-react)

## Features

- 🏗️ **React 19** - Latest React features and performance optimizations
- ⚡ **Vite 6** - Lightning-fast cold start and HMR
- 🎨 **Theme System** - 11 skins, dark mode, View Transitions
- 🔐 **Authentication** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Permission Control** - RBAC fine-grained permission management
- 📑 **Multi-tab** - Browser-style tab management
- ⌘ **Command Palette** - Keyboard shortcuts navigation (⌘K)

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

## Core Features

- **Configurable Dashboard** - 9 widgets, drag-and-drop layout, responsive design
- **Multi-tab Navigation** - Browser-style tabs, context menu, state caching
- **Permission System** - RBAC permission control, route guards, permission components
- **Theme System** - 11 skins, dark mode, View Transitions
- **Multi-account Switching** - Quick account switching, remember login state
- **Command Palette** - Keyboard shortcuts (⌘K), global search
- **Real-time Notifications** - WebSocket push, notification center

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

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

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
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
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

## Demo Account

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Core Functionality

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

### Permission Control

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

## Theme System

### Skin Presets

Supports 11 preset skins, switchable via quick settings panel:

| Skin | Main Color | CSS Variable |
|------|------------|--------------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Orange | Orange | `--primary: 65.7% 0.198 45.13` |
| Rose | Rose | `--primary: 58.9% 0.238 11.26` |
| Cyan | Cyan | `--primary: 75.6% 0.146 191.68` |
| Yellow | Yellow | `--primary: 85.1% 0.184 98.08` |
| Violet | Violet | `--primary: 55.3% 0.264 293.49` |
| Slate | Slate | `--primary: 47.9% 0.017 256.71` |
| Zinc | Zinc | `--primary: 48.3% 0 0` |
| Neutral | Neutral | `--primary: 48.5% 0 0` |

### CSS Variables (OKLch)

```css
/* Example variable definitions */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  --secondary: 96.1% 0.004 286.41;
  --secondary-foreground: 14.9% 0.017 285.75;
  --muted: 96.1% 0.004 286.41;
  --muted-foreground: 45.8% 0.009 285.77;
  --accent: 96.1% 0.004 286.41;
  --accent-foreground: 14.9% 0.017 285.75;
  --destructive: 59.3% 0.246 27.33;
  --destructive-foreground: 100% 0 0;
  --border: 89.8% 0.006 286.32;
  --input: 89.8% 0.006 286.32;
  --ring: 51.1% 0.262 276.97;
  --radius: 0.5rem;
}

.dark {
  --background: 0% 0 0;
  --foreground: 98.3% 0 0;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  /* ... */
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

## Environment Variables

### Configuration Example

```bash
cp .env.example .env.development
```

```env
# .env.development example
VITE_API_URL=/api
VITE_MOCK=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
```

### Variable Descriptions

| Variable Name | Description | Default Value |
|---------------|-------------|---------------|
| VITE_API_URL | API base path | /api |
| VITE_MOCK | Enable Mock data | true |
| VITE_APP_TITLE | Application title | Admin Pro |
| VITE_BRAND_NAME | Brand name | Halolight |
| VITE_DEMO_EMAIL | Demo account email | admin@halolight.h7ml.cn |
| VITE_DEMO_PASSWORD | Demo account password | 123456 |
| VITE_SHOW_DEMO_HINT | Show demo hint | true |

### Usage

```tsx
// Access environment variables in code
const apiUrl = import.meta.env.VITE_API_URL
const isMock = import.meta.env.VITE_MOCK === 'true'
```

## Common Commands

```bash
pnpm dev            # Start development server
pnpm build          # Production build
pnpm preview        # Preview production build
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

### Test Examples

```tsx
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## Configuration

### Vite Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'chart-vendor': ['recharts'],
        },
      },
    },
  },
})
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-react)

```bash
vercel
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

```bash
docker build -t halolight-react .
docker run -p 3000:80 halolight-react
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

### PWA Support

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
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### React Router Configuration

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

## Performance Optimization

### Image Optimization

```tsx
// Lazy load images
import { useState } from 'react'

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {!loaded && <div className="skeleton" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'opacity-100' : 'opacity-0'}
      />
    </div>
  )
}
```

### Lazy Loading Components

```tsx
// Route-level code splitting
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Users = lazy(() => import('@/pages/users'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Suspense>
  )
}
```

### Preloading

```tsx
// Preload component on hover
import { lazy } from 'react'

const UserDetails = lazy(() => import('@/pages/user-details'))

function UserList() {
  const preloadUserDetails = () => {
    // Trigger preload
    import('@/pages/user-details')
  }

  return (
    <Link
      to="/users/1"
      onMouseEnter={preloadUserDetails}
    >
      View Details
    </Link>
  )
}
```

### Memo Optimization

```tsx
import { memo } from 'react'

// Prevent unnecessary re-renders
const ExpensiveComponent = memo(({ data }: { data: any }) => {
  return <div>{/* Complex rendering logic */}</div>
})
```

## Frequently Asked Questions

### Q: How to add a new route?

A: Add route configuration in `src/routes/index.tsx`:

```tsx
{
  path: '/new-page',
  element: <NewPage />,
}
```

### Q: How to customize theme colors?

A: Modify CSS variables or use theme switching feature:

```css
:root {
  --primary: 51.1% 0.262 276.97; /* Modify primary color */
}
```

### Q: How to integrate real API?

A: Set `VITE_MOCK` to `false` and configure `VITE_API_URL`:

```env
VITE_MOCK=false
VITE_API_URL=https://api.example.com
```

### Q: How to add new permissions?

A: Add permission string to user's `permissions` array and use `usePermission` Hook:

```tsx
const canEdit = usePermission('users:edit')
```

## Comparison with Other Versions

| Feature | React Version | Next.js | Vue |
|---------|---------------|---------|-----|
| SSR/SSG | ❌ | ✅ | ✅ (Nuxt) |
| State Management | Zustand | Zustand | Pinia |
| Routing | React Router | App Router | Vue Router |
| Build Tool | Vite | Next.js | Vite |

## Related Links

- [Live Preview](https://halolight-react.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-react)
- [React Official Documentation](https://react.dev)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
