# Remix Version

HaloLight Remix version is built on React Router 7 (the original Remix team has merged into React Router), featuring TypeScript + Web standards-first full-stack development experience.

**Live Preview**: [https://halolight-remix.h7ml.cn/](https://halolight-remix.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-remix](https://github.com/halolight/halolight-remix)

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

- **Web Standards**: Based on Web Fetch API, FormData, Response
- **Nested Routes**: Powerful nested layouts and data loading
- **Progressive Enhancement**: Forms work without JS
- **Loader/Action**: Elegant server-side data patterns
- **Type Safety**: Auto-generated route types
- **Theme System**: 11 skin presets + dark mode
- **Multi-tabs**: Tab bar + right-click menu management

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
│   │   ├── settings.tsx          # System settings
│   │   ├── profile.tsx           # Profile
│   │   ├── security.tsx          # Security settings
│   │   ├── analytics.tsx         # Data analytics
│   │   ├── notifications.tsx     # Notification center
│   │   ├── documents.tsx         # Document management
│   │   ├── calendar.tsx          # Calendar
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
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── footer.tsx
│   │   │   ├── tab-bar.tsx
│   │   │   └── quick-settings.tsx
│   │   ├── auth/                 # Auth components
│   │   │   └── auth-shell.tsx
│   │   ├── admin-layout.tsx      # Admin layout
│   │   └── theme-provider.tsx    # Theme provider
│   ├── hooks/                    # React Hooks
│   │   └── use-chart-palette.ts
│   ├── lib/                      # Utilities
│   │   ├── utils.ts              # cn() className utility
│   │   ├── meta.ts               # TDK meta info
│   │   └── project-info.ts       # Project info
│   ├── stores/                   # Zustand state
│   │   ├── tabs-store.ts         # Tabs state
│   │   └── ui-settings-store.ts  # UI settings state
│   ├── root.tsx                  # Root component
│   ├── routes.ts                 # Route config
│   └── app.css                   # Global styles
├── tests/                        # Test files
│   ├── setup.ts
│   ├── lib/
│   ├── stores/
│   └── components/
├── .github/workflows/ci.yml      # CI config
├── wrangler.json                 # Cloudflare config
├── vitest.config.ts              # Vitest config
├── eslint.config.js              # ESLint config
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-remix.git
cd halolight-remix
pnpm install
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

### Available Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm typecheck    # Type checking
pnpm lint         # ESLint check
pnpm test         # Run tests
pnpm test:run     # Run tests once
pnpm test:coverage # Test coverage
pnpm preview      # Cloudflare local preview
pnpm deploy       # Deploy to Cloudflare
```

## Core Concepts

### Route File Conventions

React Router 7 uses file-system routing:

```
_index.tsx        → /          (index route)
about.tsx         → /about     (static route)
users.tsx         → /users     (static route)
users.$id.tsx     → /users/:id (dynamic route)
_layout.tsx       → layout route
$.tsx             → splat route
```

### Loader (Data Loading)

```tsx
// app/routes/users.tsx
import type { Route } from "./+types/users";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;

  const response = await fetch(`/api/users?page=${page}`);
  const users = await response.json();

  return { users, page };
}

export default function UsersPage({ loaderData }: Route.ComponentProps) {
  const { users, page } = loaderData;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Action (Form Handling)

```tsx
// app/routes/login.tsx
import type { Route } from "./+types/login";
import { Form, useActionData, useNavigation } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Validation
  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  // Login logic
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return { error: "Invalid email or password" };
  }

  // Redirect to homepage
  return redirect("/");
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      {actionData?.error && (
        <p className="text-destructive">{actionData.error}</p>
      )}

      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </Form>
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

## State Management

### Tabs Store (Tab Management)

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

### UI Settings Store (Skin/Layout)

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

| Path | Page | Description |
|------|------|------|
| `/` | Dashboard | Data overview + charts |
| `/login` | Login | User login |
| `/register` | Register | User registration |
| `/forgot-password` | Forgot Password | Send reset email |
| `/reset-password` | Reset Password | Set new password |
| `/users` | User Management | User list CRUD |
| `/settings` | System Settings | App configuration |
| `/profile` | Profile | User profile |
| `/security` | Security Settings | Password change, etc. |
| `/analytics` | Data Analytics | Chart display |
| `/notifications` | Notification Center | Message list |
| `/documents` | Document Management | File list |
| `/calendar` | Calendar | Schedule management |

## Testing

### Run Tests

```bash
pnpm test:run      # Single run
pnpm test          # Watch mode
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

## Deployment

### Cloudflare Pages

```bash
pnpm deploy
```

Configure GitHub Secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Node.js Server

```bash
pnpm build
pnpm start
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
```

## CI/CD

The project is configured with complete GitHub Actions CI workflow:

- **Lint & Type Check** - ESLint + TypeScript checking
- **Unit Tests** - Vitest unit tests + Codecov coverage
- **Build** - Production build verification
- **Security Audit** - Dependency security audit
- **Dependency Review** - PR dependency change review

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
