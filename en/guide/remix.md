# Remix Version

HaloLight Remix version is built on React Router 7 (the original Remix team has merged into React Router), featuring TypeScript + Web standards-first full-stack development experience.

**Live Preview**: [https://halolight-remix.h7ml.cn/](https://halolight-remix.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-remix](https://github.com/halolight/halolight-remix)

## Features

- 🌐 **Web Standards First** - Based on native APIs like Fetch API, FormData, Response
- 🔄 **Loader/Action** - Elegant server-side data patterns with progressive enhancement
- 📁 **File-based Routing** - Intuitive nested routes and layout system
- ⚡ **Progressive Enhancement** - Forms work without JavaScript
- 🎯 **Type Safety** - Auto-generated route types (`+types/`)
- 🎨 **Theme System** - 11 skin presets + OKLch color space
- 📑 **Multi-tabs** - Tab bar + right-click menu management
- 🚀 **Vite Powered** - Lightning fast HMR
- 🌍 **Edge Deployment** - One-click deploy to Cloudflare Pages
- 📊 **Data Visualization** - Recharts integration
- 🔐 **Authentication System** - Complete login/register/password reset flow
- 🛡️ **Permission Control** - RBAC fine-grained permission management

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| React Router | 7.x | Full-stack routing framework (formerly Remix) |
| React | 19.x | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7.x | Build tool |
| Tailwind CSS | 4.x | Atomic CSS + OKLch |
| Radix UI | latest | Accessible UI primitives |
| Zustand | 5.x | Lightweight state management |
| Recharts | 3.x | Chart visualization |
| Vitest | 4.x | Unit testing |
| Cloudflare Pages | - | Edge deployment |

## Core Features

- **Web Standards First** - Based on Fetch API, FormData, Response and other native APIs
- **Loader/Action Pattern** - Elegant server-side data loading and form handling
- **File-based Routing** - Intuitive nested routes and layout system
- **Progressive Enhancement** - Forms work without JavaScript
- **Type Safety** - Auto-generated route type definitions (`+types/`)
- **Theme System** - 11 skin presets + OKLch color space + dark mode
- **Multi-tab Management** - Tab bar + right-click menu + state persistence

## Directory Structure

```
halolight-remix/
├── app/
│   ├── routes/                    # File-based routing
│   │   ├── _index.tsx            # Homepage (dashboard)
│   │   ├── login.tsx             # Login
│   │   ├── register.tsx          # Register
│   │   ├── forgot-password.tsx   # Forgot password
│   │   ├── reset-password.tsx    # Reset password
│   │   ├── users.tsx             # User management
│   │   ├── users.$id.tsx         # User details (dynamic route)
│   │   ├── settings.tsx          # System settings
│   │   ├── profile.tsx           # Profile
│   │   ├── security.tsx          # Security settings
│   │   ├── analytics.tsx         # Data analytics
│   │   ├── notifications.tsx     # Notification center
│   │   ├── documents.tsx         # Document management
│   │   ├── calendar.tsx          # Calendar
│   │   ├── api.users.ts          # API endpoint
│   │   ├── api.auth.login.ts     # Login API
│   │   ├── api.auth.logout.ts    # Logout API
│   │   └── +types/               # Auto-generated types
│   ├── components/               # Component library
│   │   ├── ui/                   # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── tab-bar.tsx
│   │   │   └── quick-settings.tsx
│   │   ├── auth/                 # Auth components
│   │   │   └── auth-shell.tsx
│   │   ├── dashboard/            # Dashboard components
│   │   │   ├── stats-card.tsx
│   │   │   └── chart-widget.tsx
│   │   ├── admin-layout.tsx      # Admin layout
│   │   └── theme-provider.tsx    # Theme provider
│   ├── hooks/                    # React Hooks
│   │   ├── use-chart-palette.ts
│   │   ├── use-toast.ts
│   │   └── use-media-query.ts
│   ├── lib/                      # Utilities
│   │   ├── utils.ts              # cn() className utility
│   │   ├── meta.ts               # TDK meta info
│   │   ├── session.server.ts     # Session management
│   │   ├── auth.server.ts        # Auth logic
│   │   └── project-info.ts       # Project info
│   ├── stores/                   # Zustand state
│   │   ├── tabs-store.ts         # Tabs state
│   │   └── ui-settings-store.ts  # UI settings state
│   ├── types/                    # TypeScript types
│   │   ├── user.ts
│   │   └── api.ts
│   ├── root.tsx                  # Root component
│   ├── routes.ts                 # Route config
│   └── app.css                   # Global styles
├── tests/                        # Test files
│   ├── setup.ts
│   ├── lib/
│   ├── stores/
│   └── components/
├── public/                       # Static assets
├── .github/workflows/ci.yml      # CI config
├── wrangler.json                 # Cloudflare config
├── vitest.config.ts              # Vitest config
├── eslint.config.js              # ESLint config
├── vite.config.ts                # Vite config
└── package.json
```

## Quick Start

### Environment Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

### Installation

```bash
git clone https://github.com/halolight/halolight-remix.git
cd halolight-remix
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```bash
# .env example
SESSION_SECRET=your-super-secret-session-key
API_BASE_URL=https://api.halolight.h7ml.cn
MOCK_ENABLED=true
DEMO_EMAIL=admin@halolight.h7ml.cn
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=true
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
```

### Start Development

```bash
pnpm dev
```

Visit http://localhost:5173

### Production Build

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

### Loader/Action Data Pattern

#### Route File Conventions

React Router 7 uses file-system routing, where filenames determine URL paths:

```
app/routes/
├── _index.tsx            → /              (index route)
├── about.tsx             → /about         (static route)
├── users.tsx             → /users         (static route)
├── users.$id.tsx         → /users/:id     (dynamic route)
├── users.$id_.edit.tsx   → /users/:id/edit (nested route)
├── _layout.tsx           → layout route (no URL segment)
├── _layout.dashboard.tsx → /dashboard      (with layout)
├── $.tsx                 → /*             (splat route)
├── api.users.ts          → /api/users     (resource route)
└── [...slug].tsx         → /* optional catch-all
```

#### Special File Conventions

| Filename | Description |
|--------|------|
| `_index.tsx` | Index route, matches parent route exact path |
| `_layout.tsx` | Pathless layout, child routes share layout |
| `$param.tsx` | Dynamic route parameter |
| `$.tsx` | Splat route, catches all sub-paths |
| `api.*.ts` | Resource route (loader/action only, no UI) |
| `+types/` | Auto-generated type definitions |

#### Loader (Data Loading)

Loader executes on the server for page data fetching:

```tsx
// app/routes/users.tsx
import type { Route } from "./+types/users";

// Server-side data loading
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;
  const search = url.searchParams.get("search") || "";

  // Check authentication
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    throw redirect("/login");
  }

  // Fetch data
  const response = await fetch(
    `${process.env.API_BASE_URL}/users?page=${page}&limit=${limit}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${session.get("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Response("Failed to fetch user list", { status: response.status });
  }

  const { data, total } = await response.json();

  return {
    users: data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Page component receives loaderData
export default function UsersPage({ loaderData }: Route.ComponentProps) {
  const { users, pagination } = loaderData;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <Link to={`/users/${user.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination {...pagination} />
    </div>
  );
}
```

#### Action (Form Handling)

Action handles form submissions with progressive enhancement:

```tsx
// app/routes/login.tsx
import type { Route } from "./+types/login";
import { Form, useActionData, useNavigation, redirect } from "react-router";
import { commitSession, getSession } from "~/lib/session.server";

// Server-side form handling
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo") as string || "/";

  // Validation
  const errors: Record<string, string> = {};

  if (!email) {
    errors.email = "Please enter email";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Please enter password";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { email } };
  }

  // Call login API
  const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const data = await response.json();
    return { errors: { form: data.message || "Invalid email or password" } };
  }

  const { user, token } = await response.json();

  // Create session
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user.id);
  session.set("token", token);
  session.set("user", user);

  // Redirect and set Cookie
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// Meta info
export function meta(): Route.MetaDescriptors {
  return [
    { title: "Login - Admin Pro" },
    { name: "description", content: "Login to Admin Pro management system" },
  ];
}

// Page component
export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Login to your account</p>
        </div>

        {/* Form error message */}
        {actionData?.errors?.form && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {actionData.errors.form}
          </div>
        )}

        {/* Progressive enhancement form - works without JS */}
        <Form method="post" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={actionData?.values?.email}
              className="w-full rounded-md border px-3 py-2"
              placeholder="admin@example.com"
            />
            {actionData?.errors?.email && (
              <p className="text-sm text-destructive">{actionData.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-md border px-3 py-2"
              placeholder="••••••••"
            />
            {actionData?.errors?.password && (
              <p className="text-sm text-destructive">{actionData.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
```

### Meta (TDK Meta Info)

```tsx
// app/routes/users.tsx
import type { Route } from "./+types/users";
import { generateMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return generateMeta("/users");
}
```

```ts
// app/lib/meta.ts
export const pageMetas: Record<string, PageMeta> = {
  "/users": {
    title: "User Management",
    description: "Manage system user accounts, including creation, editing, and permission configuration",
    keywords: ["user management", "account management", "permission configuration"],
  },
  // ...
};

export function generateMeta(path: string, overrides?: Partial<PageMeta>) {
  const meta = pageMetas[path] || { title: "Page", description: "" };
  // Return complete meta tag array
}
```

### State Management (Zustand)

#### Tabs Store (Tab Management)

```tsx
// app/stores/tabs-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabsState {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Omit<Tab, "id">) => string;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  clearTabs: () => void;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (set, get) => ({
      tabs: [homeTab],
      activeTabId: "home",
      addTab: (tab) => { /* ... */ },
      removeTab: (id) => { /* ... */ },
      // ...
    }),
    { name: "tabs-storage" }
  )
);
```

#### UI Settings Store (Skin/Layout)

```tsx
// app/stores/ui-settings-store.ts
export type SkinPreset =
  | "default" | "blue" | "emerald" | "amber" | "violet"
  | "rose" | "teal" | "slate" | "ocean" | "sunset" | "aurora";

export const useUiSettingsStore = create<UiSettingsState>()(
  persist(
    (set) => ({
      skin: "default",
      showFooter: true,
      showTabBar: true,
      setSkin: (skin) => set({ skin }),
      setShowFooter: (visible) => set({ showFooter: visible }),
      // ...
    }),
    { name: "ui-settings-storage" }
  )
);
```

## Theme System

### Skin Presets

Supports 11 preset skins, switch via Quick Settings panel:

| Skin | Primary Color |
|------|--------|
| Default | Purple |
| Blue | Blue |
| Emerald | Emerald |
| Amber | Amber |
| Violet | Violet |
| Rose | Rose |
| Teal | Teal |
| Slate | Slate |
| Ocean | Ocean Blue |
| Sunset | Sunset Orange |
| Aurora | Aurora |

### CSS Variables (OKLch)

```css
/* app/app.css */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;
  /* ... */
}

[data-skin="ocean"] {
  --primary: 54.3% 0.195 240.03;
}

.dark {
  --background: 14.9% 0.017 285.75;
  --foreground: 98.5% 0 0;
  /* ... */
}
```

## Page Routes

| Path | Page | Permission |
|------|------|------|
| `/` | Dashboard | `dashboard:view` |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot Password | Public |
| `/reset-password` | Reset Password | Public |
| `/users` | User Management | `users:view` |
| `/settings` | System Settings | `settings:view` |
| `/profile` | Profile | `settings:view` |
| `/security` | Security Settings | `settings:view` |
| `/analytics` | Data Analytics | `analytics:view` |
| `/notifications` | Notification Center | `notifications:view` |
| `/documents` | Document Management | `documents:view` |
| `/calendar` | Calendar | `calendar:view` |

## Environment Variables

### Configuration Example

```bash
# .env
SESSION_SECRET=your-super-secret-session-key
API_BASE_URL=https://api.halolight.h7ml.cn
MOCK_ENABLED=true
DEMO_EMAIL=admin@halolight.h7ml.cn
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=true
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
```

### Variable Description

| Variable Name | Description | Default Value |
|--------|------|--------|
| `SESSION_SECRET` | Session secret key (required) | (required) |
| `API_BASE_URL` | API base URL | `/api` |
| `MOCK_ENABLED` | Enable Mock data | `false` |
| `DEMO_EMAIL` | Demo account email | - |
| `DEMO_PASSWORD` | Demo account password | - |
| `SHOW_DEMO_HINT` | Show demo hint | `false` |
| `APP_TITLE` | Application title | `Admin Pro` |
| `BRAND_NAME` | Brand name | `Halolight` |

### Usage

```ts
// app/routes/users.tsx
export async function loader({ request }: Route.LoaderArgs) {
  const apiUrl = process.env.API_BASE_URL;
  const response = await fetch(`${apiUrl}/users`);
  return response.json();
}
```

## Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm dev --host       # Allow LAN access

# Build
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm typecheck        # TypeScript type check
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier format

# Testing
pnpm test             # Watch mode
pnpm test:run         # Single run
pnpm test:coverage    # Coverage report
pnpm test:ui          # Vitest UI interface

# Deployment
pnpm preview          # Cloudflare local preview
pnpm deploy           # Deploy to Cloudflare Pages
```

## Testing

### Run Tests
pnpm test:coverage # Coverage report
```

### Test Example

```tsx
// tests/stores/tabs-store.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useTabsStore } from "~/stores/tabs-store";

describe("useTabsStore", () => {
  beforeEach(() => {
    useTabsStore.getState().clearTabs();
  });

  it("should add new tab", () => {
    const { addTab } = useTabsStore.getState();
    addTab({ title: "User Management", path: "/users" });

    const { tabs } = useTabsStore.getState();
    expect(tabs).toHaveLength(2);
  });
});
```

## Configuration

### React Router Configuration

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
});
```

### Wrangler Configuration

```json
// wrangler.json
{
  "name": "halolight-remix",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./build/client"
}
```

### ESLint Configuration

```js
// eslint.config.js
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["build", ".react-router"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
```

## Deployment

### Cloudflare Pages (Recommended)

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login
wrangler login

# Deploy
pnpm deploy
```

### Cloudflare Configuration

```json
// wrangler.json
{
  "name": "halolight-remix",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./build/client"
}
```

### GitHub Actions Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

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

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: halolight-remix
          directory: build/client
```

### Node.js Server

```bash
pnpm build
pnpm start
```

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .

RUN pnpm install --prod --frozen-lockfile

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
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
      - API_BASE_URL=${API_BASE_URL}
    restart: unless-stopped
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Other Platforms

- [Cloudflare Pages](/guide/cloudflare) - Edge deployment (recommended)
- [Netlify](/guide/netlify) - Static site hosting
- [AWS Amplify](/guide/aws) - AWS hosting service
- [Azure Static Web Apps](/guide/azure) - Azure static apps

## CI/CD

The project is configured with complete GitHub Actions CI workflow:

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

### Session Management (Cookie)

Using Cookie for session management:

```ts
// app/lib/session.server.ts
import { createCookieSessionStorage, redirect } from "react-router";

// Create session storage
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

// Get current user
export async function getUser(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  return user || null;
}

// Require login
export async function requireUser(request: Request) {
  const user = await getUser(request);
  if (!user) {
    const url = new URL(request.url);
    throw redirect(`/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  }
  return user;
}

// Logout
export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
```

### Error Handling (ErrorBoundary)

Global and route-level error handling:

```tsx
// app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  // Route errors (like 404, 401)
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Error {error.status}</title>
          <Meta />
          <Links />
        </head>
        <body>
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h1 className="text-9xl font-bold text-muted-foreground">
                {error.status}
              </h1>
              <p className="mt-4 text-xl">{error.statusText}</p>
              <p className="mt-2 text-muted-foreground">{error.data}</p>
              <a href="/" className="mt-8 inline-block text-primary hover:underline">
                Back to Home
              </a>
            </div>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  // Unknown errors
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error Occurred</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Error Occurred</h1>
            <p className="mt-2 text-muted-foreground">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
            <a href="/" className="mt-8 inline-block text-primary hover:underline">
              Back to Home
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
```

```tsx
// app/routes/users.$id.tsx - Route-level error boundary
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">User Not Found</h2>
          <p className="text-muted-foreground">Please check if the user ID is correct</p>
          <Link to="/users" className="mt-4 inline-block text-primary">
            Back to User List
          </Link>
        </div>
      </div>
    );
  }

  throw error; // Throw other errors upward
}
```

#### Resource Routes (API Endpoints)

Resource routes have no UI components, only export loader/action:

```ts
// app/routes/api.users.ts
import type { Route } from "./+types/api.users";
import { getSession } from "~/lib/session.server";

// GET /api/users
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;

  const response = await fetch(
    `${process.env.API_BASE_URL}/users?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session.get("token")}`,
      },
    }
  );

  const data = await response.json();
  return Response.json(data);
}

// POST /api/users
export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const response = await fetch(`${process.env.API_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.get("token")}`,
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}
```

```ts
// app/routes/api.users.$id.ts
import type { Route } from "./+types/api.users.$id";

// GET /api/users/:id
export async function loader({ params, request }: Route.LoaderArgs) {
  const { id } = params;
  const session = await getSession(request.headers.get("Cookie"));

  const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${session.get("token")}`,
    },
  });

  if (!response.ok) {
    throw new Response("User not found", { status: 404 });
  }

  return Response.json(await response.json());
}

// PUT /api/users/:id
export async function action({ params, request }: Route.ActionArgs) {
  const { id } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const body = await request.json();

  const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
    method: request.method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.get("token")}`,
    },
  });

  return Response.json(await response.json(), { status: response.status });
}
```

## Advanced Features

### useFetcher (No-Navigation Data Fetching)

```tsx
// app/routes/users.tsx
import { useFetcher } from "react-router";

export default function UsersPage() {
  const fetcher = useFetcher();

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      fetcher.submit(
        { userId },
        { method: "delete", action: "/api/users" }
      );
    }
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button
            onClick={() => handleDelete(user.id)}
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Optimistic UI Updates

```tsx
// app/routes/notifications.tsx
import { useFetcher } from "react-router";

function NotificationItem({ notification }) {
  const fetcher = useFetcher();

  // Optimistic UI: immediately show read status
  const isRead = fetcher.formData
    ? fetcher.formData.get("read") === "true"
    : notification.read;

  return (
    <div className={isRead ? "opacity-50" : ""}>
      <p>{notification.message}</p>
      {!isRead && (
        <fetcher.Form method="post" action="/api/notifications/mark-read">
          <input type="hidden" name="id" value={notification.id} />
          <input type="hidden" name="read" value="true" />
          <button type="submit">Mark as Read</button>
        </fetcher.Form>
      )}
    </div>
  );
}
```

### defer and Suspense

```tsx
// app/routes/analytics.tsx
import type { Route } from "./+types/analytics";
import { Await, defer } from "react-router";
import { Suspense } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  // Fast data returns immediately
  const summary = await getSummary();

  // Slow data loads deferred
  const chartDataPromise = getChartData();
  const reportPromise = generateReport();

  return defer({
    summary,
    chartData: chartDataPromise,
    report: reportPromise,
  });
}

export default function AnalyticsPage({ loaderData }: Route.ComponentProps) {
  const { summary, chartData, report } = loaderData;

  return (
    <div className="space-y-6">
      {/* Show immediately */}
      <SummaryCard data={summary} />

      {/* Deferred chart loading */}
      <Suspense fallback={<ChartSkeleton />}>
        <Await resolve={chartData}>
          {(data) => <Chart data={data} />}
        </Await>
      </Suspense>

      {/* Deferred report loading */}
      <Suspense fallback={<ReportSkeleton />}>
        <Await resolve={report}>
          {(data) => <Report data={data} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

### Parallel Data Loading

```tsx
// app/routes/dashboard.tsx
export async function loader({ request }: Route.LoaderArgs) {
  // Parallel requests to multiple data sources
  const [stats, recentUsers, notifications, activities] = await Promise.all([
    getStats(),
    getRecentUsers(),
    getNotifications(),
    getActivities(),
  ]);

  return { stats, recentUsers, notifications, activities };
}
```

### Middleware Pattern

```ts
// app/lib/middleware.ts
import { redirect } from "react-router";
import { getSession } from "./session.server";

type LoaderFunction = (args: LoaderArgs) => Promise<any>;

// Authentication middleware
export function withAuth(loader: LoaderFunction): LoaderFunction {
  return async (args) => {
    const session = await getSession(args.request.headers.get("Cookie"));

    if (!session.has("userId")) {
      const url = new URL(args.request.url);
      throw redirect(`/login?redirectTo=${encodeURIComponent(url.pathname)}`);
    }

    // Inject user info
    const user = session.get("user");
    return loader({ ...args, user });
  };
}

// Role check middleware
export function withRole(role: string, loader: LoaderFunction): LoaderFunction {
  return withAuth(async (args) => {
    const { user } = args as any;

    if (user.role !== role) {
      throw new Response("Insufficient permissions", { status: 403 });
    }

    return loader(args);
  });
}

// Usage example
// app/routes/admin.tsx
export const loader = withRole("admin", async ({ request }) => {
  // Only admin role can access
  return getAdminData();
});
```

## Performance Optimization

### Code Splitting

```tsx
// Use React.lazy for dynamic imports
import { lazy, Suspense } from "react";

const Chart = lazy(() => import("~/components/dashboard/chart"));

export default function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <Chart data={data} />
    </Suspense>
  );
}
```

### Prefetching

```tsx
// Link prefetching
import { Link, prefetchRouteModule } from "react-router";

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      onMouseEnter={() => prefetchRouteModule(to)}
      onFocus={() => prefetchRouteModule(to)}
    >
      {children}
    </Link>
  );
}
```

### Caching Strategy

```tsx
// app/routes/api.static-data.ts
export async function loader() {
  const data = await getStaticData();

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
```

## Frequently Asked Questions

### Q: How to handle form validation?

A: Combine server-side and client-side validation:

```tsx
// app/routes/register.tsx
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Server-side validation
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Create user...
}
```

### Q: How to implement file uploads?

A: Use FormData to handle files:

```tsx
// app/routes/upload.tsx
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { error: "Please select a file" };
  }

  // Upload to storage service
  const buffer = await file.arrayBuffer();
  const url = await uploadToStorage(buffer, file.name, file.type);

  return { url };
}

export default function UploadPage() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post" encType="multipart/form-data">
      <input type="file" name="file" required />
      <button type="submit">Upload</button>
      {actionData?.url && <p>Upload successful: {actionData.url}</p>}
      {actionData?.error && <p className="text-destructive">{actionData.error}</p>}
    </Form>
  );
}
```

### Q: How to handle internationalization?

A: Use Cookie or URL prefix:

```tsx
// app/lib/i18n.ts
export const locales = ["zh-CN", "en-US"] as const;
export type Locale = typeof locales[number];

export function getLocale(request: Request): Locale {
  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie");

  // 1. Check URL parameter
  const urlLocale = url.searchParams.get("locale");
  if (urlLocale && locales.includes(urlLocale as Locale)) {
    return urlLocale as Locale;
  }

  // 2. Check Cookie
  const cookieLocale = getCookie(cookie, "locale");
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 3. Check Accept-Language
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage?.includes("zh")) {
    return "zh-CN";
  }

  return "en-US";
}
```

### Q: How to implement real-time updates?

A: Use SSE (Server-Sent Events):

```ts
// app/routes/api.events.ts
export async function loader({ request }: Route.LoaderArgs) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Send events periodically
      const interval = setInterval(() => {
        sendEvent({ type: "ping", timestamp: Date.now() });
      }, 5000);

      // Cleanup
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

```tsx
// Client-side usage
useEffect(() => {
  const eventSource = new EventSource("/api/events");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Handle event
  };

  return () => eventSource.close();
}, []);
```

## Performance Optimization

### Code Splitting

```tsx
// Use React.lazy for dynamic imports
import { lazy, Suspense } from "react";

const Chart = lazy(() => import("~/components/dashboard/chart"));

export default function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <Chart data={data} />
    </Suspense>
  );
}
```

### Prefetching

```tsx
// Link prefetching
import { Link, prefetchRouteModule } from "react-router";

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      onMouseEnter={() => prefetchRouteModule(to)}
      onFocus={() => prefetchRouteModule(to)}
    >
      {children}
    </Link>
  );
}
```

### Caching Strategy

```tsx
// app/routes/api.static-data.ts
export async function loader() {
  const data = await getStaticData();

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
```

## Environment Variables

| Variable Name | Description | Default Value |
|--------|------|--------|
| `SESSION_SECRET` | Session secret key | (required) |
| `API_BASE_URL` | API base URL | `/api` |
| `MOCK_ENABLED` | Enable Mock data | `false` |
| `DEMO_EMAIL` | Demo account email | - |
| `DEMO_PASSWORD` | Demo account password | - |
| `SHOW_DEMO_HINT` | Show demo hint | `false` |
| `APP_TITLE` | Application title | `Admin Pro` |
| `BRAND_NAME` | Brand name | `Halolight` |

## Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm dev --host       # Allow LAN access

# Build
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm typecheck        # TypeScript type check
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier format

# Testing
pnpm test             # Watch mode
pnpm test:run         # Single run
pnpm test:coverage    # Coverage report
pnpm test:ui          # Vitest UI interface

# Deployment
pnpm preview          # Cloudflare local preview
pnpm deploy           # Deploy to Cloudflare Pages
```

## Comparison with Other Versions

| Feature | Remix Version | Vue Version | Next.js Version |
|------|-----------|----------|--------------|
| State Management | Zustand | Pinia | Zustand |
| Data Fetching | Loader/Action | TanStack Query | TanStack Query |
| Form Handling | Progressive Enhancement Form | VeeValidate | React Hook Form |
| Server-side | Built-in SSR | Nuxt | App Router |
| Component Library | Radix UI | shadcn-vue | shadcn/ui |
| Routing | File-based routing | Vue Router | App Router |
| Theme | OKLch CSS Variables | OKLch CSS Variables | OKLch CSS Variables |
| Testing | Vitest | Vitest | Vitest |
| Build Tool | Vite | Vite | Turbopack |

## Related Links

- [Live Preview](https://halolight-remix.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-remix)
- [React Router Official Documentation](https://reactrouter.com)
- [Remix Migration Guide](https://remix.run/blog/react-router-v7)
- [Vite Documentation](https://vitejs.dev)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
