# Solid.js Version

HaloLight Solid.js version is built on SolidStart 1.0, featuring Solid.js fine-grained reactivity + TypeScript for high-performance admin dashboard. No virtual DOM, compile-time optimization, minimal bundle size.

**Live Preview**: [https://halolight-solidjs.h7ml.cn/](https://halolight-solidjs.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-solidjs](https://github.com/halolight/halolight-solidjs)

## Features

- ⚡ **Fine-grained Reactivity** - No virtual DOM, precise dependency tracking, millisecond-level response
- 🔧 **Compile-time Optimization** - JSX compiled to efficient DOM operations, zero runtime overhead
- 📦 **Minimal Bundle** - Core ~7KB gzip, 10x+ smaller than React
- 🎯 **Signals Primitives** - Simple and elegant reactive state management
- 🌐 **SolidStart Full-stack** - Built-in SSR/SSG, file routing, RPC
- 🔄 **Server Functions** - `"use server"` seamless server-side logic calls
- 🎨 **Theme System** - 11 skin presets + OKLch color space
- 📑 **Multi-tab Navigation** - Tab bar + context menu management
- 🛡️ **Permission Control** - Fine-grained permission validation and component guards
- 📊 **Data Visualization** - solid-charts integration

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| SolidStart | 1.x | Solid full-stack framework |
| Solid.js | 1.9+ | Fine-grained reactive framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS + OKLch |
| Kobalte | 0.13+ | Accessible UI primitives |
| solid-primitives | latest | Reactive utilities library |
| Zod | 3.x | Data validation |
| @solid-primitives/storage | latest | Persistent storage |
| solid-charts | latest | Chart visualization |
| Vitest | 4.x | Unit testing |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Fine-grained Reactivity**: No virtual DOM, precise dependency tracking and updates
- **Compile-time Optimization**: JSX compiled to efficient DOM operations
- **Signals**: Simple reactive primitives
- **Server-side Rendering**: SolidStart built-in SSR support
- **File-based Routing**: File system-based routing
- **RPC**: Seamless server function calls

## Directory Structure

```
halolight-solidjs/
├── src/
│   ├── routes/                    # File-based routing
│   │   ├── index.tsx             # Home (Dashboard)
│   │   ├── (auth)/               # Auth route group (no layout path)
│   │   │   ├── login.tsx         # Login
│   │   │   ├── register.tsx      # Register
│   │   │   ├── forgot-password.tsx # Forgot password
│   │   │   └── reset-password.tsx  # Reset password
│   │   ├── (dashboard)/          # Dashboard route group (with AdminLayout)
│   │   │   ├── dashboard.tsx     # Dashboard home
│   │   │   ├── analytics.tsx     # Data analytics
│   │   │   ├── users/            # User management
│   │   │   │   ├── index.tsx     # User list
│   │   │   │   ├── create.tsx    # Create user
│   │   │   │   └── [id].tsx      # User details (dynamic route)
│   │   │   ├── roles.tsx         # Role management
│   │   │   ├── permissions.tsx   # Permission management
│   │   │   ├── messages.tsx      # Message center
│   │   │   ├── notifications.tsx # Notifications
│   │   │   ├── documents.tsx     # Document management
│   │   │   ├── calendar.tsx      # Calendar
│   │   │   ├── settings.tsx      # System settings
│   │   │   └── profile.tsx       # User profile
│   │   ├── privacy.tsx           # Privacy policy
│   │   ├── terms.tsx             # Terms of service
│   │   └── api/                  # API routes
│   │       ├── auth/
│   │       │   ├── login.ts      # POST /api/auth/login
│   │       │   ├── register.ts   # POST /api/auth/register
│   │       │   └── logout.ts     # POST /api/auth/logout
│   │       └── users/
│   │           ├── index.ts      # GET/POST /api/users
│   │           └── [id].ts       # GET/PUT/DELETE /api/users/:id
│   ├── components/               # Component library
│   │   ├── ui/                   # Kobalte wrapped components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── AdminLayout.tsx   # Admin main layout
│   │   │   ├── AuthLayout.tsx    # Auth page layout
│   │   │   ├── Sidebar.tsx       # Sidebar
│   │   │   ├── Header.tsx        # Top navigation
│   │   │   ├── Footer.tsx        # Footer
│   │   │   ├── TabBar.tsx        # Tab bar
│   │   │   └── QuickSettings.tsx # Quick settings panel
│   │   ├── dashboard/            # Dashboard components
│   │   │   ├── DashboardGrid.tsx # Draggable grid
│   │   │   ├── WidgetWrapper.tsx # Widget wrapper
│   │   │   ├── StatsWidget.tsx   # Stats card
│   │   │   └── ChartWidget.tsx   # Chart widget
│   │   ├── auth/                 # Auth components
│   │   │   └── AuthShell.tsx     # Auth shell
│   │   └── shared/               # Shared components
│   │       ├── PermissionGuard.tsx # Permission guard
│   │       └── ErrorBoundary.tsx   # Error boundary
│   ├── stores/                   # State management (Signals + Store)
│   │   ├── auth.ts               # Auth state
│   │   ├── ui-settings.ts        # UI settings state
│   │   ├── tabs.ts               # Tab state
│   │   └── dashboard.ts          # Dashboard layout state
│   ├── lib/                      # Utilities
│   │   ├── api.ts                # API client
│   │   ├── permission.ts         # Permission utils
│   │   ├── meta.ts               # TDK meta info
│   │   └── cn.ts                 # Class name utils
│   ├── server/                   # Server code
│   │   ├── auth.ts               # Auth logic
│   │   ├── session.ts            # Session management
│   │   └── middleware.ts         # Middleware
│   ├── hooks/                    # Custom hooks
│   │   ├── createUsers.ts        # User data
│   │   └── createToast.ts        # Toast notifications
│   └── types/                    # TypeScript types
│       ├── user.ts
│       └── api.ts
├── tests/                        # Test files
│   ├── setup.ts
│   ├── stores/
│   └── components/
├── public/                       # Static assets
├── .github/workflows/ci.yml      # CI configuration
├── app.config.ts                 # SolidStart configuration
├── tailwind.config.ts            # Tailwind configuration
├── vitest.config.ts              # Vitest configuration
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-solidjs.git
cd halolight-solidjs
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```bash
# .env example
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
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
|------|------|------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Core Functionality

### Signals - Fine-grained Reactivity

Solid.js core is Signals, providing the most fine-grained reactive updates:

```tsx
import { createSignal, createEffect, createMemo } from 'solid-js';

// Create signal - reactive state
const [count, setCount] = createSignal(0);

// Create derived value - auto track dependencies
const doubled = createMemo(() => count() * 2);

// Create side effect - auto respond to changes
createEffect(() => {
  console.log('count changed:', count());
});

// Update state
setCount(1);        // Set new value
setCount(c => c + 1); // Functional update
```

### Store - Nested Reactive Objects

For complex nested data, use Store:

```tsx
import { createStore, produce } from 'solid-js/store';

interface User {
  id: number;
  name: string;
  profile: {
    avatar: string;
    bio: string;
  };
}

const [user, setUser] = createStore<User>({
  id: 1,
  name: 'Admin',
  profile: {
    avatar: '/avatar.png',
    bio: '',
  },
});

// Access - auto track
console.log(user.name);
console.log(user.profile.avatar);

// Update - path-based
setUser('name', 'New Name');
setUser('profile', 'bio', 'This is my bio');

// Update - functional (Immer style)
setUser(
  produce((draft) => {
    draft.name = 'New Name';
    draft.profile.bio = 'This is my bio';
  })
);
```

### State Management (Signals + Store)

```tsx
// stores/auth.ts
import { createSignal, createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { makePersisted } from '@solid-primitives/storage'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
}

const [state, setState] = makePersisted(
  createStore<AuthState>({
    user: null,
    token: null,
  }),
  { name: 'auth' }
)

const [loading, setLoading] = createSignal(false)

export const authStore = {
  get user() { return state.user },
  get token() { return state.token },
  get loading() { return loading() },

  isAuthenticated: createMemo(() => !!state.token && !!state.user),
  permissions: createMemo(() => state.user?.permissions ?? []),

  async login(credentials: { email: string; password: string }) {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      setState({
        user: data.user,
        token: data.token,
      })
    } finally {
      setLoading(false)
    }
  },

  logout() {
    setState({ user: null, token: null })
  },

  hasPermission(permission: string): boolean {
    const perms = state.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  },
}
```

### UI Settings Store (Skin/Layout)

```tsx
// stores/ui-settings.ts
import { createStore } from 'solid-js/store';
import { makePersisted } from '@solid-primitives/storage';

export type SkinPreset =
  | 'default'
  | 'blue'
  | 'emerald'
  | 'amber'
  | 'violet'
  | 'rose'
  | 'teal'
  | 'slate'
  | 'ocean'
  | 'sunset'
  | 'aurora';

export type ThemeMode = 'light' | 'dark' | 'system';

interface UiSettingsState {
  skin: SkinPreset;
  theme: ThemeMode;
  showFooter: boolean;
  showTabBar: boolean;
  sidebarCollapsed: boolean;
}

const [state, setState] = makePersisted(
  createStore<UiSettingsState>({
    skin: 'default',
    theme: 'system',
    showFooter: true,
    showTabBar: true,
    sidebarCollapsed: false,
  }),
  { name: 'ui-settings-storage' }
);

export const uiSettingsStore = {
  get skin() {
    return state.skin;
  },
  get theme() {
    return state.theme;
  },
  get showFooter() {
    return state.showFooter;
  },
  get showTabBar() {
    return state.showTabBar;
  },
  get sidebarCollapsed() {
    return state.sidebarCollapsed;
  },

  setSkin(skin: SkinPreset) {
    document.documentElement.setAttribute('data-skin', skin);
    setState('skin', skin);
  },

  setTheme(theme: ThemeMode) {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    setState('theme', theme);
  },

  setShowFooter(visible: boolean) {
    setState('showFooter', visible);
  },

  setShowTabBar(visible: boolean) {
    setState('showTabBar', visible);
  },

  toggleSidebar() {
    setState('sidebarCollapsed', (c) => !c);
  },
};
```

### Tabs Store (Tab Management)

```tsx
// stores/tabs.ts
import { createStore, produce } from 'solid-js/store';
import { makePersisted } from '@solid-primitives/storage';

interface Tab {
  id: string;
  title: string;
  path: string;
  closable: boolean;
}

const homeTab: Tab = {
  id: 'home',
  title: 'Home',
  path: '/',
  closable: false,
};

interface TabsState {
  tabs: Tab[];
  activeTabId: string;
}

const [state, setState] = makePersisted(
  createStore<TabsState>({
    tabs: [homeTab],
    activeTabId: 'home',
  }),
  { name: 'tabs-storage' }
);

export const tabsStore = {
  get tabs() {
    return state.tabs;
  },
  get activeTabId() {
    return state.activeTabId;
  },
  get activeTab() {
    return state.tabs.find((t) => t.id === state.activeTabId);
  },

  addTab(tab: Omit<Tab, 'id' | 'closable'>): string {
    // Check if already exists
    const existing = state.tabs.find((t) => t.path === tab.path);
    if (existing) {
      setState('activeTabId', existing.id);
      return existing.id;
    }

    const id = crypto.randomUUID();
    const newTab: Tab = { ...tab, id, closable: true };

    setState(
      produce((draft) => {
        draft.tabs.push(newTab);
        draft.activeTabId = id;
      })
    );

    return id;
  },

  removeTab(id: string) {
    const tab = state.tabs.find((t) => t.id === id);
    if (!tab?.closable) return;

    const index = state.tabs.findIndex((t) => t.id === id);
    const newTabs = state.tabs.filter((t) => t.id !== id);

    let newActiveId = state.activeTabId;
    if (state.activeTabId === id) {
      // Switch to adjacent tab
      newActiveId = newTabs[Math.min(index, newTabs.length - 1)]?.id || 'home';
    }

    setState({
      tabs: newTabs,
      activeTabId: newActiveId,
    });
  },

  setActiveTab(id: string) {
    setState('activeTabId', id);
  },

  closeOthers(id: string) {
    setState(
      produce((draft) => {
        draft.tabs = draft.tabs.filter((t) => t.id === id || !t.closable);
        draft.activeTabId = id;
      })
    );
  },

  closeRight(id: string) {
    const index = state.tabs.findIndex((t) => t.id === id);
    setState('tabs', (tabs) => tabs.filter((t, i) => i <= index || !t.closable));
  },

  clearTabs() {
    setState({
      tabs: [homeTab],
      activeTabId: 'home',
    });
  },
};
```

### Route Middleware

```tsx
// src/middleware.ts
import { createMiddleware } from '@solidjs/start/middleware';

export default createMiddleware({
  onRequest: [
    // Logging middleware
    async (event) => {
      const start = Date.now();
      const response = await event.next();
      const duration = Date.now() - start;
      console.log(`${event.request.method} ${event.request.url} - ${duration}ms`);
      return response;
    },

    // Auth middleware
    async (event) => {
      const url = new URL(event.request.url);

      // Public paths
      const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/api/auth'];
      const isPublic = publicPaths.some((path) => url.pathname.startsWith(path));

      if (isPublic) {
        return;
      }

      // Protect dashboard routes
      if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/api/')) {
        const cookies = event.request.headers.get('cookie') || '';
        const token = cookies.match(/token=([^;]+)/)?.[1];

        if (!token) {
          // API routes return 401
          if (url.pathname.startsWith('/api/')) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          // Page routes redirect
          return new Response(null, {
            status: 302,
            headers: { Location: `/login?redirect=${encodeURIComponent(url.pathname)}` },
          });
        }

        // Verify token and inject user info
        try {
          const user = await verifyToken(token);
          event.locals.user = user;
        } catch {
          // Invalid token, clear cookie and redirect
          return new Response(null, {
            status: 302,
            headers: {
              Location: '/login',
              'Set-Cookie': 'token=; Max-Age=0; Path=/',
            },
          });
        }
      }
    },
  ],
});

async function verifyToken(token: string) {
  // In production, verify JWT
  return { id: 1, name: 'Admin', permissions: ['*'] };
}
```

### Server Functions (RPC)

SolidStart supports `"use server"` marked server functions:

```tsx
// server/auth.ts
'use server';
import { z } from 'zod';
import { useSession } from 'vinxi/http';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export async function login(credentials: z.infer<typeof loginSchema>) {
  const validated = loginSchema.parse(credentials);

  // Mock validation
  if (validated.email !== 'admin@halolight.h7ml.cn' || validated.password !== '123456') {
    throw new Error('Invalid email or password');
  }

  const user = {
    id: 1,
    name: 'Admin',
    email: validated.email,
    role: 'admin',
    permissions: ['*'],
  };

  const token = `mock_token_${Date.now()}`;

  // Set session
  const session = await useSession({
    password: process.env.SESSION_SECRET!,
  });
  await session.update({ userId: user.id, token });

  return {
    success: true,
    user,
    token,
  };
}

export async function register(data: z.infer<typeof registerSchema>) {
  const validated = registerSchema.parse(data);

  // Check if email already exists
  const existing = await db.users.findByEmail(validated.email);
  if (existing) {
    throw new Error('Email already registered');
  }

  // Create user
  const user = await db.users.create({
    email: validated.email,
    name: validated.name,
    password: await hashPassword(validated.password),
  });

  return { success: true, user };
}

export async function getCurrentUser() {
  const session = await useSession({
    password: process.env.SESSION_SECRET!,
  });

  if (!session.data.userId) {
    return null;
  }

  const user = await db.users.findById(session.data.userId);
  return user;
}

export async function logout() {
  const session = await useSession({
    password: process.env.SESSION_SECRET!,
  });

  await session.clear();
  return { success: true };
}
```

### API Routes

```tsx
// routes/api/users/index.ts
import type { APIEvent } from '@solidjs/start/server';
import { json } from '@solidjs/router';

// GET /api/users
export async function GET(event: APIEvent) {
  const url = new URL(event.request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 10;
  const search = url.searchParams.get('search') || '';

  // Mock data
  const users = generateMockUsers(page, limit, search);
  const total = 100;

  return json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// POST /api/users
export async function POST(event: APIEvent) {
  const body = await event.request.json();
  const { email, name, role } = body;

  // Validation
  if (!email || !name) {
    return json({ success: false, message: 'Email and name are required' }, { status: 400 });
  }

  // Create user
  const user = {
    id: Date.now(),
    email,
    name,
    role: role || 'user',
    createdAt: new Date().toISOString(),
  };

  return json({
    success: true,
    data: user,
    message: 'User created successfully',
  });
}
```

```tsx
// routes/api/users/[id].ts
import type { APIEvent } from '@solidjs/start/server';
import { json } from '@solidjs/router';

// GET /api/users/:id
export async function GET(event: APIEvent) {
  const id = event.params.id;

  const user = await db.users.findById(id);
  if (!user) {
    return json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return json({ success: true, data: user });
}

// PUT /api/users/:id
export async function PUT(event: APIEvent) {
  const id = event.params.id;
  const body = await event.request.json();

  const user = await db.users.update(id, body);
  return json({
    success: true,
    data: user,
    message: 'User updated successfully',
  });
}

// DELETE /api/users/:id
export async function DELETE(event: APIEvent) {
  const id = event.params.id;

  await db.users.delete(id);
  return json({
    success: true,
    message: 'User deleted successfully',
  });
}
```
// src/middleware.ts
import { createMiddleware } from '@solidjs/start/middleware'

export default createMiddleware({
  onRequest: [
    async (event) => {
      const url = new URL(event.request.url)

      // Protect dashboard routes
      if (url.pathname.startsWith('/dashboard')) {
        const token = event.request.headers.get('cookie')?.match(/token=([^;]+)/)?.[1]

        if (!token) {
          return new Response(null, {
            status: 302,
            headers: { Location: `/login?redirect=${url.pathname}` },
          })
        }
      }
    },
  ],
})
```

### Server Functions (RPC)

```tsx
// server/auth.ts
'use server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function login(credentials: z.infer<typeof loginSchema>) {
  const validated = loginSchema.parse(credentials)

  // Validation logic...

  return {
    success: true,
    user: { id: 1, name: 'Admin', email: validated.email },
    token: 'mock_token',
  }
}

export async function getCurrentUser(token: string) {
  // Validate token and return user
  return {
    id: 1,
    name: 'Admin',
    permissions: ['*'],
  }
}
```

### Permission Component

```tsx
// components/shared/PermissionGuard.tsx
import { Show, type ParentComponent, type JSX } from 'solid-js'
import { authStore } from '~/stores/auth'

interface Props {
  permission: string
  fallback?: JSX.Element
}

export const PermissionGuard: ParentComponent<Props> = (props) => {
  const hasPermission = () => authStore.hasPermission(props.permission)

  return (
    <Show when={hasPermission()} fallback={props.fallback}>
      {props.children}
    </Show>
  )
}
```

```tsx
// Usage
<PermissionGuard
  permission="users:delete"
  fallback={<span class="text-muted-foreground">No Permission</span>}
>
  <Button variant="destructive">Delete</Button>
</PermissionGuard>
```

### Data Fetching

```tsx
// routes/(dashboard)/users/index.tsx
import { createAsync, cache } from '@solidjs/router'

const getUsers = cache(async (params: { page: number }) => {
  'use server'
  const users = await db.users.findMany({
    skip: (params.page - 1) * 10,
    take: 10,
  })
  return users
}, 'users')

export const route = {
  load: ({ location }) => {
    const page = Number(location.query.page) || 1
    void getUsers({ page })
  },
}

export default function UsersPage() {
  const users = createAsync(() => getUsers({ page: 1 }))

  return (
    <div>
      <h1>User List</h1>
      <Show when={users()}>
        {(data) => (
          <For each={data()}>
            {(user) => <UserCard user={user} />}
          </For>
        )}
      </Show>
    </div>
  )
}
```

### Form Handling

```tsx
// routes/(auth)/login.tsx
import { createSignal } from 'solid-js'
import { useNavigate, useSearchParams } from '@solidjs/router'
import { authStore } from '~/stores/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')

    try {
      await authStore.login({
        email: email(),
        password: password(),
      })
      navigate(searchParams.redirect || '/dashboard')
    } catch (e) {
      setError('Invalid email or password')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Show when={error()}>
        <div class="text-destructive">{error()}</div>
      </Show>

      <input
        type="email"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
      />

      <button type="submit" disabled={authStore.loading}>
        {authStore.loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

### Permission Components

```tsx
// components/shared/PermissionGuard.tsx
import { Show, type ParentComponent, type JSX, createMemo } from 'solid-js';
import { authStore } from '~/stores/auth';

interface Props {
  permission?: string;
  permissions?: string[];
  mode?: 'any' | 'all';
  fallback?: JSX.Element;
}

export const PermissionGuard: ParentComponent<Props> = (props) => {
  const hasPermission = createMemo(() => {
    // Single permission check
    if (props.permission) {
      return authStore.hasPermission(props.permission);
    }

    // Multiple permissions check
    if (props.permissions) {
      return props.mode === 'all'
        ? authStore.hasAllPermissions(props.permissions)
        : authStore.hasAnyPermission(props.permissions);
    }

    return true;
  });

  return (
    <Show when={hasPermission()} fallback={props.fallback}>
      {props.children}
    </Show>
  );
};

// Usage example
<PermissionGuard
  permission="users:delete"
  fallback={<span class="text-muted-foreground">No Permission</span>}
>
  <Button variant="destructive" onClick={handleDelete}>
    Delete User
  </Button>
</PermissionGuard>

// Multiple permissions check
<PermissionGuard
  permissions={['users:edit', 'users:delete']}
  mode="any"
>
  <DropdownMenu>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenu>
</PermissionGuard>
```

### Data Fetching

Using `createAsync` and `cache` for data fetching:

```tsx
// routes/(dashboard)/users/index.tsx
import { createAsync, cache, useSearchParams } from '@solidjs/router';
import { Show, For, Suspense } from 'solid-js';
import { AdminLayout } from '~/components/layout/AdminLayout';
import { Table, Pagination, Button, Input } from '~/components/ui';

// Define cache function
const getUsers = cache(async (params: { page: number; limit: number; search?: string }) => {
  'use server';

  const response = await fetch(
    `${process.env.API_BASE_URL}/users?page=${params.page}&limit=${params.limit}&search=${params.search || ''}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}, 'users');

// Preload
export const route = {
  load: ({ location }) => {
    const page = Number(new URLSearchParams(location.search).get('page')) || 1;
    void getUsers({ page, limit: 10 });
  },
};

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = () => Number(searchParams.page) || 1;
  const search = () => searchParams.search || '';

  const users = createAsync(() =>
    getUsers({ page: page(), limit: 10, search: search() })
  );

  const handleSearch = (value: string) => {
    setSearchParams({ search: value, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <AdminLayout title="User Management">
      <div class="space-y-6">
        {/* Search bar */}
        <div class="flex items-center justify-between">
          <Input
            type="search"
            placeholder="Search users..."
            value={search()}
            onInput={(e) => handleSearch(e.currentTarget.value)}
            class="max-w-sm"
          />
          <Button>
            <PlusIcon class="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Table */}
        <Suspense fallback={<TableSkeleton />}>
          <Show when={users()}>
            {(data) => (
              <>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Name</Table.Head>
                      <Table.Head>Email</Table.Head>
                      <Table.Head>Role</Table.Head>
                      <Table.Head>Status</Table.Head>
                      <Table.Head class="text-right">Actions</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <For each={data().data}>
                      {(user) => (
                        <Table.Row>
                          <Table.Cell>{user.name}</Table.Cell>
                          <Table.Cell>{user.email}</Table.Cell>
                          <Table.Cell>
                            <Badge>{user.role}</Badge>
                          </Table.Cell>
                          <Table.Cell>
                            <StatusBadge status={user.status} />
                          </Table.Cell>
                          <Table.Cell class="text-right">
                            <UserActions user={user} />
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </For>
                  </Table.Body>
                </Table>

                <Pagination
                  page={page()}
                  totalPages={data().pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </Show>
        </Suspense>
      </div>
    </AdminLayout>
  );
}
```

### Form Handling

```tsx
// routes/(auth)/login.tsx
import { createSignal, Show } from 'solid-js';
import { useNavigate, useSearchParams, A } from '@solidjs/router';
import { authStore } from '~/stores/auth';
import { AuthLayout } from '~/components/layout/AuthLayout';
import { Input, Button, Card } from '~/components/ui';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [errors, setErrors] = createSignal<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email()) {
      newErrors.email = 'Please enter email';
    } else if (!email().includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password()) {
      newErrors.password = 'Please enter password';
    } else if (password().length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await authStore.login({
        email: email(),
        password: password(),
      });

      // Redirect to original page or dashboard
      const redirect = searchParams.redirect || '/dashboard';
      navigate(redirect);
    } catch (e) {
      setErrors({ form: e instanceof Error ? e.message : 'Login failed' });
    }
  };

  // Fill demo account
  const fillDemo = () => {
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
    const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;
    if (demoEmail) setEmail(demoEmail);
    if (demoPassword) setPassword(demoPassword);
  };

  return (
    <AuthLayout title="Login">
      <Card class="w-full max-w-md">
        <Card.Header class="text-center">
          <Card.Title class="text-2xl">Welcome Back</Card.Title>
          <Card.Description>Login to your account</Card.Description>
        </Card.Header>

        <Card.Content>
          {/* Error message */}
          <Show when={errors().form}>
            <div class="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {errors().form}
            </div>
          </Show>

          {/* Demo hint */}
          <Show when={import.meta.env.VITE_SHOW_DEMO_HINT === 'true'}>
            <div class="mb-4 rounded-md bg-muted p-3 text-sm">
              <p>Demo Account:</p>
              <p class="font-mono text-xs">
                Email: {import.meta.env.VITE_DEMO_EMAIL}
              </p>
              <p class="font-mono text-xs">
                Password: {import.meta.env.VITE_DEMO_PASSWORD}
              </p>
              <Button variant="link" size="sm" onClick={fillDemo} class="mt-1 h-auto p-0">
                Click to fill
              </Button>
            </div>
          </Show>

          <form onSubmit={handleSubmit} class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                placeholder="admin@example.com"
                autocomplete="email"
              />
              <Show when={errors().email}>
                <p class="text-sm text-destructive">{errors().email}</p>
              </Show>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-medium">
                  Password
                </label>
                <A href="/forgot-password" class="text-sm text-primary hover:underline">
                  Forgot password?
                </A>
              </div>
              <Input
                id="password"
                type="password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <Show when={errors().password}>
                <p class="text-sm text-destructive">{errors().password}</p>
              </Show>
            </div>

            <Button type="submit" class="w-full" disabled={authStore.loading}>
              {authStore.loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer class="justify-center">
          <p class="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <A href="/register" class="text-primary hover:underline">
              Sign up now
            </A>
          </p>
        </Card.Footer>
      </Card>
    </AuthLayout>
  );
}
```

### Error Handling

```tsx
// components/shared/ErrorBoundary.tsx
import { ErrorBoundary as SolidErrorBoundary, type ParentComponent } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { Button, Card } from '~/components/ui';

interface Props {
  fallback?: (error: Error, reset: () => void) => JSX.Element;
}

export const ErrorBoundary: ParentComponent<Props> = (props) => {
  return (
    <SolidErrorBoundary
      fallback={(error, reset) => {
        if (props.fallback) {
          return props.fallback(error, reset);
        }

        return <DefaultErrorFallback error={error} reset={reset} />;
      }}
    >
      {props.children}
    </SolidErrorBoundary>
  );
};

function DefaultErrorFallback(props: { error: Error; reset: () => void }) {
  const navigate = useNavigate();

  return (
    <div class="flex min-h-[400px] items-center justify-center p-4">
      <Card class="w-full max-w-md">
        <Card.Header class="text-center">
          <Card.Title class="text-destructive">An Error Occurred</Card.Title>
          <Card.Description>{props.error.message}</Card.Description>
        </Card.Header>
        <Card.Content class="space-y-4">
          <div class="flex justify-center gap-2">
            <Button variant="outline" onClick={props.reset}>
              Retry
            </Button>
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
```

```tsx
// routes/[...404].tsx - 404 page
import { A } from '@solidjs/router';
import { Button } from '~/components/ui';

export default function NotFoundPage() {
  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-muted-foreground">404</h1>
        <p class="mt-4 text-2xl text-foreground">Page Not Found</p>
        <p class="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has been removed
        </p>
        <Button as={A} href="/" class="mt-8">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
```

### Meta (TDK Meta Information)

```tsx
// lib/meta.ts
interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
}

export const pageMetas: Record<string, PageMeta> = {
  '/': {
    title: 'Dashboard',
    description: 'Admin Pro management system dashboard with data overview and analytics',
    keywords: ['dashboard', 'analytics', 'management'],
  },
  '/users': {
    title: 'User Management',
    description: 'Manage system user accounts including creation, editing, and permission configuration',
    keywords: ['user management', 'account management', 'permissions'],
  },
  '/analytics': {
    title: 'Analytics',
    description: 'Business data statistics and visualization charts',
    keywords: ['analytics', 'charts', 'statistics'],
  },
  '/settings': {
    title: 'System Settings',
    description: 'System configuration and personalization settings',
    keywords: ['settings', 'configuration', 'personalization'],
  },
};

export function generateMeta(path: string, overrides?: Partial<PageMeta>) {
  const meta = { ...pageMetas[path], ...overrides } || {
    title: 'Page',
    description: 'Admin Pro Management System',
  };

  const brandName = import.meta.env.VITE_BRAND_NAME || 'Halolight';
  const fullTitle = `${meta.title} - ${brandName}`;

  return {
    title: fullTitle,
    description: meta.description,
    keywords: meta.keywords?.join(', ') || '',
  };
}
```

```tsx
// Usage in pages
import { Title, Meta } from '@solidjs/meta';
import { generateMeta } from '~/lib/meta';

export default function UsersPage() {
  const meta = generateMeta('/users');

  return (
    <>
      <Title>{meta.title}</Title>
      <Meta name="description" content={meta.description} />
      <Meta name="keywords" content={meta.keywords} />

      {/* Page content */}
    </>
  );
}
```

## Theme System

### Skin Presets

Supports 11 preset skins, switchable via Quick Settings panel:

| Skin | Primary Color | CSS Variable |
|------|--------|----------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Amber | Amber | `--primary: 76.9% 0.188 84.94` |
| Violet | Violet | `--primary: 54.1% 0.243 293.54` |
| Rose | Rose | `--primary: 64.5% 0.246 16.44` |
| Teal | Teal | `--primary: 60.0% 0.118 184.71` |
| Slate | Slate | `--primary: 45.9% 0.022 264.53` |
| Ocean | Ocean | `--primary: 54.3% 0.195 240.03` |
| Sunset | Sunset | `--primary: 70.5% 0.213 47.60` |
| Aurora | Aurora | `--primary: 62.8% 0.265 303.9` |

### CSS Variables (OKLch)

```css
/* src/styles/globals.css */
@import "tailwindcss";

:root {
  /* Background colors */
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;

  /* Card */
  --card: 100% 0 0;
  --card-foreground: 14.9% 0.017 285.75;

  /* Popover */
  --popover: 100% 0 0;
  --popover-foreground: 14.9% 0.017 285.75;

  /* Primary */
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;

  /* Secondary */
  --secondary: 96.7% 0.001 286.38;
  --secondary-foreground: 21% 0.006 285.75;

  /* Muted */
  --muted: 96.7% 0.001 286.38;
  --muted-foreground: 55.2% 0.014 285.94;

  /* Accent */
  --accent: 96.7% 0.001 286.38;
  --accent-foreground: 21% 0.006 285.75;

  /* Destructive */
  --destructive: 57.7% 0.245 27.32;
  --destructive-foreground: 100% 0 0;

  /* Border/Input */
  --border: 91.2% 0.004 286.32;
  --input: 91.2% 0.004 286.32;
  --ring: 51.1% 0.262 276.97;

  /* Radius */
  --radius: 0.5rem;
}

/* Skin presets */
[data-skin="blue"] {
  --primary: 54.8% 0.243 264.05;
  --ring: 54.8% 0.243 264.05;
}

[data-skin="ocean"] {
  --primary: 54.3% 0.195 240.03;
  --ring: 54.3% 0.195 240.03;
}

[data-skin="emerald"] {
  --primary: 64.6% 0.178 142.49;
  --ring: 64.6% 0.178 142.49;
}

/* Dark mode */
.dark {
  --background: 14.9% 0.017 285.75;
  --foreground: 98.5% 0 0;
  --card: 14.9% 0.017 285.75;
  --card-foreground: 98.5% 0 0;
  --popover: 14.9% 0.017 285.75;
  --popover-foreground: 98.5% 0 0;
  --secondary: 26.8% 0.019 286.07;
  --secondary-foreground: 98.5% 0 0;
  --muted: 26.8% 0.019 286.07;
  --muted-foreground: 71.2% 0.013 286.07;
  --accent: 26.8% 0.019 286.07;
  --accent-foreground: 98.5% 0 0;
  --border: 26.8% 0.019 286.07;
  --input: 26.8% 0.019 286.07;
}

/* Tailwind theme mapping */
@theme {
  --color-background: oklch(var(--background));
  --color-foreground: oklch(var(--foreground));
  --color-primary: oklch(var(--primary));
  --color-primary-foreground: oklch(var(--primary-foreground));
  /* ... */
}
```

## Page Routes

| Path | Page | Layout | Permission |
|------|------|------|------|
| `/` | Home | - | Public |
| `/login` | Login | AuthLayout | Public |
| `/register` | Register | AuthLayout | Public |
| `/forgot-password` | Forgot Password | AuthLayout | Public |
| `/reset-password` | Reset Password | AuthLayout | Public |
| `/dashboard` | Dashboard | AdminLayout | `dashboard:view` |
| `/analytics` | Analytics | AdminLayout | `analytics:view` |
| `/users` | User List | AdminLayout | `users:list` |
| `/users/create` | Create User | AdminLayout | `users:create` |
| `/users/[id]` | User Details | AdminLayout | `users:view` |
| `/roles` | Role Management | AdminLayout | `roles:list` |
| `/permissions` | Permission Management | AdminLayout | `permissions:list` |
| `/messages` | Message Center | AdminLayout | `messages:view` |
| `/notifications` | Notifications | AdminLayout | Authenticated |
| `/documents` | Document Management | AdminLayout | `documents:list` |
| `/calendar` | Calendar | AdminLayout | `calendar:view` |
| `/settings` | System Settings | AdminLayout | `settings:view` |
| `/profile` | User Profile | AdminLayout | Authenticated |
| `/privacy` | Privacy Policy | - | Public |
| `/terms` | Terms of Service | - | Public |

## Environment Variables

| Variable | Description | Default |
|--------|------|--------|
| `VITE_API_URL` | API base URL | `/api` |
| `VITE_USE_MOCK` | Enable mock data | `false` |
| `VITE_DEMO_EMAIL` | Demo account email | - |
| `VITE_DEMO_PASSWORD` | Demo account password | - |
| `VITE_SHOW_DEMO_HINT` | Show demo hint | `false` |
| `VITE_APP_TITLE` | Application title | `Admin Pro` |
| `VITE_BRAND_NAME` | Brand name | `Halolight` |
| `SESSION_SECRET` | Session secret (server-side) | (required) |

## Common Commands

```bash
# Development
pnpm dev              # Start development server
pnpm dev --host       # Allow LAN access

# Build
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm typecheck        # TypeScript type check
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto fix
pnpm format           # Prettier format

# Testing
pnpm test             # Watch mode
pnpm test:run         # Single run
pnpm test:coverage    # Coverage report
pnpm test:ui          # Vitest UI

# Others
pnpm clean            # Clean build artifacts
pnpm deps             # Check dependency updates
```

## Testing

### Run Tests

```bash
pnpm test:run      # Single run
pnpm test          # Watch mode
pnpm test:coverage # Coverage report
```

### Test Examples

```tsx
// tests/stores/auth.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authStore } from '~/stores/auth';

describe('authStore', () => {
  beforeEach(() => {
    authStore.logout();
  });

  it('initial state should be unauthenticated', () => {
    expect(authStore.isAuthenticated()).toBe(false);
    expect(authStore.user).toBeNull();
    expect(authStore.token).toBeNull();
  });

  it('should update state after successful login', async () => {
    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          user: { id: 1, name: 'Admin', permissions: ['*'] },
          token: 'mock_token',
        }),
    });

    await authStore.login({
      email: 'admin@example.com',
      password: '123456',
    });

    expect(authStore.isAuthenticated()).toBe(true);
    expect(authStore.user?.name).toBe('Admin');
    expect(authStore.token).toBe('mock_token');
  });

  it('permission checks should work correctly', async () => {
    // Set user permissions
    authStore.login({
      email: 'test@example.com',
      password: '123456',
    });

    // Mock successful login
    expect(authStore.hasPermission('*')).toBe(true);
    expect(authStore.hasPermission('users:list')).toBe(true);
    expect(authStore.hasPermission('unknown:action')).toBe(true); // * permission
  });

  it('should clear state after logout', () => {
    authStore.logout();

    expect(authStore.isAuthenticated()).toBe(false);
    expect(authStore.user).toBeNull();
    expect(authStore.token).toBeNull();
  });
});
```

```tsx
// tests/stores/tabs.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { tabsStore } from '~/stores/tabs';

describe('tabsStore', () => {
  beforeEach(() => {
    tabsStore.clearTabs();
  });

  it('initial state should only have home tab', () => {
    expect(tabsStore.tabs.length).toBe(1);
    expect(tabsStore.tabs[0].id).toBe('home');
    expect(tabsStore.activeTabId).toBe('home');
  });

  it('should add new tab', () => {
    const id = tabsStore.addTab({ title: 'User Management', path: '/users' });

    expect(tabsStore.tabs.length).toBe(2);
    expect(tabsStore.tabs[1].title).toBe('User Management');
    expect(tabsStore.activeTabId).toBe(id);
  });

  it('should deduplicate existing routes', () => {
    const id1 = tabsStore.addTab({ title: 'User Management', path: '/users' });
    const id2 = tabsStore.addTab({ title: 'User Management', path: '/users' });

    expect(id1).toBe(id2);
    expect(tabsStore.tabs.length).toBe(2);
  });

  it('should close tab and switch to adjacent tab', () => {
    tabsStore.addTab({ title: 'User Management', path: '/users' });
    const id = tabsStore.addTab({ title: 'Settings', path: '/settings' });

    tabsStore.removeTab(id);

    expect(tabsStore.tabs.length).toBe(2);
    expect(tabsStore.activeTabId).not.toBe(id);
  });

  it('home tab should not be closable', () => {
    tabsStore.removeTab('home');

    expect(tabsStore.tabs.length).toBe(1);
    expect(tabsStore.tabs[0].id).toBe('home');
  });
});
```

## Configuration

### SolidStart Configuration

```ts
// app.config.ts
import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'node-server', // Default Node.js server
  },
  vite: {
    plugins: [],
    css: {
      postcss: './postcss.config.js',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['solid-js', '@solidjs/router'],
            ui: ['@kobalte/core'],
          },
        },
      },
    },
  },
  middleware: './src/middleware.ts',
});
```

### Different Environment Presets

```ts
// Development environment
export default defineConfig({
  server: { preset: 'node-server' },
});

// Vercel
export default defineConfig({
  server: { preset: 'vercel' },
});

// Cloudflare Pages
export default defineConfig({
  server: { preset: 'cloudflare-pages' },
});

// Netlify
export default defineConfig({
  server: { preset: 'netlify' },
});

// AWS Lambda
export default defineConfig({
  server: { preset: 'aws-lambda' },
});

// Bun
export default defineConfig({
  server: { preset: 'bun' },
});
```

## Deployment

### Node.js Server

```bash
pnpm build
node .output/server/index.mjs
```

### Docker

```dockerfile
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SESSION_SECRET=${SESSION_SECRET}
      - VITE_API_URL=${VITE_API_URL}
    restart: unless-stopped
```

### Vercel

```ts
// app.config.ts
import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'vercel',
  },
});
```

```bash
# Deploy
npx vercel
```

### Cloudflare Pages

```ts
// app.config.ts
import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'cloudflare-pages',
  },
});
```

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy .output/public
```

### Netlify

```ts
// app.config.ts
import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'netlify',
  },
});
```

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".output/public"
  functions = ".output/server"

[functions]
  node_bundler = "esbuild"
```

### GitHub Actions Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## CI/CD

Project has complete GitHub Actions CI workflow:

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
      - run: pnpm typecheck

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

### createResource (Async Data)

```tsx
import { createResource, Suspense, Show } from 'solid-js';

// Define data fetching function
const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
};

function UserProfile(props: { userId: string }) {
  // createResource automatically manages loading/error states
  const [user, { refetch, mutate }] = createResource(
    () => props.userId,
    fetchUser
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Show when={user()} fallback={<div>User not found</div>}>
        {(userData) => (
          <div>
            <h1>{userData().name}</h1>
            <p>{userData().email}</p>
            <button onClick={refetch}>Refresh</button>
          </div>
        )}
      </Show>
    </Suspense>
  );
}
```

### Streaming SSR

```tsx
// routes/dashboard.tsx
import { Suspense } from 'solid-js';
import { createAsync, cache } from '@solidjs/router';

// Fast data
const getQuickStats = cache(async () => {
  'use server';
  return await db.stats.getQuick();
}, 'quick-stats');

// Slow data
const getDetailedAnalytics = cache(async () => {
  'use server';
  return await db.analytics.getDetailed(); // Time-consuming operation
}, 'detailed-analytics');

export default function Dashboard() {
  const quickStats = createAsync(() => getQuickStats());
  const analytics = createAsync(() => getDetailedAnalytics());

  return (
    <div class="space-y-6">
      {/* Fast rendered content */}
      <Show when={quickStats()}>
        {(stats) => <QuickStats data={stats()} />}
      </Show>

      {/* Stream rendered slow content */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Show when={analytics()}>
          {(data) => <DetailedAnalytics data={data()} />}
        </Show>
      </Suspense>
    </div>
  );
}
```

### Optimistic Updates

```tsx
import { createSignal, For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

function TodoList() {
  const [todos, setTodos] = createStore<Todo[]>([]);
  const [newTodo, setNewTodo] = createSignal('');

  const addTodo = async () => {
    const text = newTodo();
    if (!text.trim()) return;

    // Optimistic update - show immediately
    const tempId = `temp-${Date.now()}`;
    const optimisticTodo: Todo = {
      id: tempId,
      text,
      completed: false,
      pending: true,
    };

    setTodos(produce((draft) => draft.push(optimisticTodo)));
    setNewTodo('');

    try {
      // Actual request
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const realTodo = await response.json();

      // Replace with real data
      setTodos(
        (todo) => todo.id === tempId,
        { id: realTodo.id, pending: false }
      );
    } catch {
      // Rollback
      setTodos((todos) => todos.filter((t) => t.id !== tempId));
    }
  };

  return (
    <div>
      <input
        value={newTodo()}
        onInput={(e) => setNewTodo(e.currentTarget.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <For each={todos}>
        {(todo) => (
          <div class={todo.pending ? 'opacity-50' : ''}>
            {todo.text}
            {todo.pending && <span>Saving...</span>}
          </div>
        )}
      </For>
    </div>
  );
}
```

### Context Cross-component Communication

```tsx
// context/theme.tsx
import { createContext, useContext, type ParentComponent } from 'solid-js';
import { createStore } from 'solid-js/store';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>();

export const ThemeProvider: ParentComponent = (props) => {
  const [state, setState] = createStore({ theme: 'light' as const });

  const value: ThemeContextValue = {
    get theme() {
      return state.theme;
    },
    setTheme(theme) {
      setState('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    },
    toggle() {
      value.setTheme(state.theme === 'light' ? 'dark' : 'light');
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Portal and Modal

```tsx
import { Portal, Show } from 'solid-js/web';
import { createSignal } from 'solid-js';

function Modal(props: { isOpen: boolean; onClose: () => void; children: JSX.Element }) {
  return (
    <Show when={props.isOpen}>
      <Portal mount={document.body}>
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-black/50"
            onClick={props.onClose}
          />
          {/* Content */}
          <div class="relative z-10 rounded-lg bg-background p-6 shadow-lg">
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
}

// Usage
function App() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <h2>Title</h2>
        <p>Content</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </>
  );
}
```

## Performance Optimization

### Fine-grained Updates

Solid.js core advantage is fine-grained updates, no manual optimization needed:

```tsx
// Component doesn't re-execute when parent updates
function Parent() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>
        Count: {count()}
      </button>
      {/* Child component only created once */}
      <Child />
    </div>
  );
}

function Child() {
  console.log('Child rendered'); // Only executes once
  return <div>I'm a child</div>;
}
```

### Lazy Loading Components

```tsx
import { lazy, Suspense } from 'solid-js';

// Lazy load heavy components
const Chart = lazy(() => import('./components/Chart'));
const DataTable = lazy(() => import('./components/DataTable'));

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<ChartSkeleton />}>
        <Chart />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
```

### List Optimization

```tsx
import { For, Index } from 'solid-js';

// For - suitable for object arrays, tracked by reference
<For each={users()}>
  {(user, index) => (
    <div>{index()}: {user.name}</div>
  )}
</For>

// Index - suitable for primitive arrays, tracked by index
<Index each={numbers()}>
  {(num, index) => (
    <div>{index}: {num()}</div>
  )}
</Index>
```

### Preloading

```tsx
// Route preload
export const route = {
  load: ({ params }) => {
    // Preload data
    void getUser({ id: params.id });
    void getUserPosts({ userId: params.id });
  },
};

// Link preload
<A href="/users" preload>
  User Management
</A>
```

## FAQ

### Q: What are the main differences between Solid.js and React?

A: Core differences:
1. **No Virtual DOM** - Solid directly manipulates real DOM
2. **Fine-grained Reactivity** - Only updates changed parts, components don't re-execute
3. **Compile-time Optimization** - JSX compiled to efficient DOM operations
4. **Signals vs Hooks** - Signals are true reactive primitives

```tsx
// React - component re-executes on every state change
function ReactComponent() {
  const [count, setCount] = useState(0);
  console.log('render'); // Logs on every update
  return <div>{count}</div>;
}

// Solid - component executes once, only where signal is accessed updates
function SolidComponent() {
  const [count, setCount] = createSignal(0);
  console.log('setup'); // Only logs once
  return <div>{count()}</div>; // Only this updates
}
```

### Q: How to handle async data?

A: Use `createResource` or `createAsync`:

```tsx
// createResource - more granular control
const [data, { refetch, mutate }] = createResource(source, fetcher);

// createAsync - SolidStart route integration
const data = createAsync(() => getData());
```

### Q: How to share state?

A: Three approaches:

1. **Export Signals/Store** - Simple scenarios
```tsx
// stores/counter.ts
export const [count, setCount] = createSignal(0);
```

2. **Context** - Dependency injection
```tsx
const CounterContext = createContext();
```

3. **solid-primitives/storage** - Persistence
```tsx
const [state, setState] = makePersisted(createStore({}), { name: 'key' });
```

### Q: How to handle forms?

A: Use controlled components or `@modular-forms/solid`:

```tsx
// Controlled component
const [email, setEmail] = createSignal('');
<input value={email()} onInput={(e) => setEmail(e.currentTarget.value)} />

// Or use form library
import { createForm } from '@modular-forms/solid';

const [form, { Form, Field }] = createForm<LoginForm>();
```

### Q: How to implement route guards?

A: Use middleware or route `load` function:

```tsx
// middleware.ts
export default createMiddleware({
  onRequest: [authMiddleware],
});

// Or in route
export const route = {
  load: ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect('/login');
    }
  },
};
```

## Comparison with Other Versions

| Feature | Solid.js Version | Vue Version | Next.js Version | Remix Version |
|------|--------------|----------|--------------|------------|
| State Management | Signals + Store | Pinia | Zustand | Zustand |
| Data Fetching | createAsync | TanStack Query | TanStack Query | Loader/Action |
| Form Validation | Custom + Zod | VeeValidate + Zod | React Hook Form + Zod | Progressive Enhancement |
| Server-side | SolidStart Built-in | Separate Backend / Nuxt | API Routes | Built-in |
| Component Library | Kobalte | shadcn-vue | shadcn/ui | Radix UI |
| Routing | File-based Routing | Vue Router | App Router | File-based Routing |
| Reactivity | Fine-grained Signals | Proxy-based | Hooks | Hooks |
| Bundle Size | ~7KB | ~33KB | ~85KB | ~70KB |
| Runtime Performance | Extremely High | High | Medium | Medium |

## Related Links

- [Live Preview](https://halolight-solidjs.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-solidjs)
- [Solid.js Official Docs](https://www.solidjs.com)
- [SolidStart Docs](https://start.solidjs.com)
- [Kobalte Docs](https://kobalte.dev)
- [solid-primitives Docs](https://primitives.solidjs.community)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [HaloLight Docs](https://docs.halolight.h7ml.cn)
