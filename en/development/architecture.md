# Overall Architecture

This document describes the overall architecture design of the HaloLight project, including directory structure, layered design, and core patterns.

## Directory Structure Specification

### Standard Directory Layout

```
src/
├── app/                    # Page routes (Next.js) or views/ (Vue)
│   ├── (admin)/           # Admin route group
│   │   ├── dashboard/     # Dashboard
│   │   ├── users/         # User management
│   │   ├── roles/         # Role management
│   │   ├── permissions/   # Permission management
│   │   ├── settings/      # System settings
│   │   └── profile/       # User profile
│   └── (auth)/            # Auth route group
│       ├── login/         # Login
│       ├── register/      # Register
│       ├── forgot-password/
│       └── reset-password/
├── components/            # Reusable components
│   ├── ui/               # Basic UI components (shadcn/ui)
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   ├── charts/           # Chart components
│   └── shared/           # Shared business components
├── hooks/ (composables/)  # Reusable logic
├── stores/               # State management
├── services/             # API service layer
├── lib/                  # Utility library
├── types/                # TypeScript type definitions
├── styles/               # Global styles
└── mocks/                # Mock data
```

## Layered Architecture

### Four-Layer Architecture Design

```
┌─────────────────────────────────────────────────┐
│                   View Layer                     │
│        Pages / Views / Routes                    │
├─────────────────────────────────────────────────┤
│                Component Layer                   │
│     UI Components / Layout / Dashboard          │
├─────────────────────────────────────────────────┤
│                  State Layer                     │
│     Stores / Composables / Hooks                │
├─────────────────────────────────────────────────┤
│                 Service Layer                    │
│     API Services / Data Fetching / Cache        │
└─────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Responsibility | Framework Implementation |
|------|------|----------|
| View Layer | Page routing, layout assembly | Next.js Pages / Vue Views |
| Component Layer | UI rendering, user interaction | React/Vue/Svelte Components |
| State Layer | Application state, business logic | Zustand / Pinia / Stores |
| Service Layer | API calls, data caching | TanStack Query / Axios |

## Provider Hierarchy

### React/Next.js Provider Chain

```tsx
<ThemeProvider>
  <MockProvider>
    <QueryClientProvider>
      <AuthProvider>
        <PermissionProvider>
          <WebSocketProvider>
            <ErrorProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </ErrorProvider>
          </WebSocketProvider>
        </PermissionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </MockProvider>
</ThemeProvider>
```

### Vue Plugin Registration Order

```ts
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(mockPlugin)
app.use(queryPlugin)
app.use(permissionPlugin)
```

## Layout System

### AdminLayout Structure

```
┌──────────────────────────────────────────────────────┐
│                     Header                            │
│  [Logo] [Breadcrumb]           [Search] [User] [Settings]
├────────────┬─────────────────────────────────────────┤
│            │                                          │
│  Sidebar   │              Content                     │
│            │                                          │
│  - Menu    │   ┌──────────────────────────────────┐  │
│  - Nav     │   │        Page Content               │  │
│            │   │                                   │  │
│            │   └──────────────────────────────────┘  │
│            │                                          │
├────────────┴─────────────────────────────────────────┤
│                     Footer                            │
└──────────────────────────────────────────────────────┘
```

### AuthLayout Structure

```
┌──────────────────────────────────────────────────────┐
│                                                       │
│                    ┌────────────┐                    │
│                    │            │                    │
│                    │  Auth Form │                    │
│                    │            │                    │
│                    └────────────┘                    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## Route Configuration Specification

### Route Meta Information

```ts
interface RouteMeta {
  title: string           // Page title
  icon?: string          // Menu icon
  permission?: string    // Required permission
  hidden?: boolean       // Hidden in menu
  keepAlive?: boolean    // Cache component
  breadcrumb?: boolean   // Show breadcrumb
}
```

### Standard Route Table

| Path | Page | Permission |
|------|------|------|
| `/dashboard` | Dashboard | `dashboard:view` |
| `/users` | User list | `users:list` |
| `/users/create` | Create user | `users:create` |
| `/users/:id` | User detail | `users:view` |
| `/users/:id/edit` | Edit user | `users:update` |
| `/roles` | Role list | `roles:list` |
| `/permissions` | Permission management | `permissions:list` |
| `/settings` | System settings | `settings:view` |
| `/profile` | User profile | - (authenticated) |

## Environment Variable Specification

### Variable Naming Convention

| Prefix | Framework | Description |
|------|------|------|
| `NEXT_PUBLIC_` | Next.js | Client-side visible |
| `VITE_` | Vue/Vite | Client-side visible |
| `PUBLIC_` | SvelteKit | Client-side visible |
| No prefix | All | Server-side only |

### Required Environment Variables

```bash
# API Configuration
*_API_BASE_URL=http://localhost:3000/api
*_API_TIMEOUT=30000

# Authentication Configuration
*_AUTH_SECRET=your-secret-key
*_TOKEN_EXPIRES=7d

# Mock Toggle
*_ENABLE_MOCK=true

# Feature Toggles
*_ENABLE_WEBSOCKET=true
*_ENABLE_ANALYTICS=false
```

## Code Organization Principles

### 1. Feature First

Organize code by feature modules, not by file types:

```
# Recommended ✅
features/
├── users/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/

# Avoid ❌
components/
├── UserList.tsx
├── UserForm.tsx
hooks/
├── useUsers.ts
services/
├── userService.ts
```

### 2. Proximity Principle

Place component-specific styles, types, and utilities in the component directory:

```
components/
└── UserCard/
    ├── index.tsx
    ├── UserCard.module.css
    ├── UserCard.types.ts
    └── useUserCard.ts
```

### 3. Shared Extraction

Extract code used in multiple places to shared locations:

```
# Used by 2+ components → Extract to components/shared/
# Used in 3+ places → Extract to lib/ or utils/
```

### 4. Specification First

When adding or modifying features, first clarify interfaces, constraints, and directory structure in `halolight/docs`, then sync to `halolight` and `halolight-vue` to avoid implementation divergence.
