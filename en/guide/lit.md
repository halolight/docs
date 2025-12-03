# Lit Version

HaloLight Lit version is built on Lit 3, using Web Components standards + TypeScript to deliver a cross-framework reusable admin dashboard.

**Live Preview**: [https://halolight-lit.h7ml.cn/](https://halolight-lit.h7ml.cn/)

**GitHub**: [https://github.com/halolight/halolight-lit](https://github.com/halolight/halolight-lit)

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Lit | 3.x | Web Components framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| Vite | 6.x | Build tool |
| @lit-labs/router | 0.1.x | Client-side routing |
| @lit-labs/context | 1.x | Context state |
| Shoelace | 2.x | Web Components UI library |
| Zod | 3.x | Data validation |
| ECharts | 5.x | Chart visualization |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Web Components Standard**: Native browser support, no framework lock-in
- **Cross-framework Reusable**: Components can be used in React/Vue/Angular
- **Shadow DOM**: Style isolation, avoid conflicts
- **Reactive Properties**: @property decorator for reactivity
- **Lightweight & Efficient**: Core library ~5KB gzip
- **SSR Support**: Server-side rendering support

## Directory Structure

```
halolight-lit/
├── src/
│   ├── pages/                     # Page components
│   │   ├── hl-home.ts            # Homepage
│   │   ├── auth/                 # Auth pages
│   │   │   ├── hl-login.ts
│   │   │   ├── hl-register.ts
│   │   │   ├── hl-forgot-password.ts
│   │   │   └── hl-reset-password.ts
│   │   └── dashboard/            # Dashboard pages
│   │       ├── hl-dashboard.ts
│   │       ├── hl-users.ts
│   │       ├── hl-user-detail.ts
│   │       ├── hl-user-create.ts
│   │       ├── hl-roles.ts
│   │       ├── hl-permissions.ts
│   │       ├── hl-settings.ts
│   │       └── hl-profile.ts
│   ├── components/               # Component library
│   │   ├── ui/                   # UI components
│   │   │   ├── hl-button.ts
│   │   │   ├── hl-input.ts
│   │   │   ├── hl-card.ts
│   │   │   ├── hl-dialog.ts
│   │   │   └── ...
│   │   ├── layout/               # Layout components
│   │   │   ├── hl-admin-layout.ts
│   │   │   ├── hl-auth-layout.ts
│   │   │   ├── hl-sidebar.ts
│   │   │   └── hl-header.ts
│   │   ├── dashboard/            # Dashboard components
│   │   │   ├── hl-dashboard-grid.ts
│   │   │   ├── hl-widget-wrapper.ts
│   │   │   └── hl-stats-widget.ts
│   │   └── shared/               # Shared components
│   │       └── hl-permission-guard.ts
│   ├── stores/                   # State management
│   │   ├── auth-context.ts
│   │   ├── ui-settings-context.ts
│   │   └── dashboard-context.ts
│   ├── lib/                      # Utilities
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── styles.ts
│   ├── types/                    # Type definitions
│   ├── hl-app.ts                 # Root component
│   ├── router.ts                 # Route config
│   └── main.ts                   # Entry file
├── public/                       # Static assets
├── vite.config.ts               # Vite config
├── tailwind.config.ts           # Tailwind config
└── package.json
```

## Quick Start

### Installation

```bash
git clone https://github.com/halolight/halolight-lit.git
cd halolight-lit
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# .env example
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@example.com
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
```

### Start Development

```bash
pnpm dev
```

Visit http://localhost:5173

### Production Build

```bash
pnpm build
pnpm preview
```

## Core Features

### State Management (@lit-labs/context)

```ts
// stores/auth-context.ts
import { createContext } from '@lit-labs/context'
import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { provide } from '@lit-labs/context'

interface User {
  id: number
  name: string
  email: string
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

export const authContext = createContext<AuthState>('auth')

@customElement('hl-auth-provider')
export class AuthProvider extends LitElement {
  @state() private user: User | null = null
  @state() private token: string | null = null
  @state() private loading = false

  @provide({ context: authContext })
  authState: AuthState = {
    user: null,
    token: null,
    loading: false,
    login: this.login.bind(this),
    logout: this.logout.bind(this),
    hasPermission: this.hasPermission.bind(this),
  }

  connectedCallback() {
    super.connectedCallback()
    this.loadFromStorage()
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('auth')
    if (saved) {
      const { user, token } = JSON.parse(saved)
      this.user = user
      this.token = token
      this.updateContext()
    }
  }

  private updateContext() {
    this.authState = {
      ...this.authState,
      user: this.user,
      token: this.token,
      loading: this.loading,
    }
  }

  async login(credentials: { email: string; password: string }) {
    this.loading = true
    this.updateContext()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      this.user = data.user
      this.token = data.token
      localStorage.setItem('auth', JSON.stringify({
        user: this.user,
        token: this.token,
      }))
    } finally {
      this.loading = false
      this.updateContext()
    }
  }

  logout() {
    this.user = null
    this.token = null
    localStorage.removeItem('auth')
    this.updateContext()
  }

  hasPermission(permission: string): boolean {
    const perms = this.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  }

  render() {
    return html`<slot></slot>`
  }
}
```

### Base Component

```ts
// components/ui/hl-button.ts
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('hl-button')
export class HlButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .default {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    .default:hover {
      opacity: 0.9;
    }

    .destructive {
      background-color: var(--destructive);
      color: var(--destructive-foreground);
    }

    .outline {
      border: 1px solid var(--border);
      background: transparent;
    }

    .sm { height: 2rem; padding: 0 0.75rem; font-size: 0.875rem; }
    .md { height: 2.5rem; padding: 0 1rem; }
    .lg { height: 3rem; padding: 0 1.5rem; font-size: 1.125rem; }

    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `

  @property() variant: 'default' | 'destructive' | 'outline' | 'ghost' = 'default'
  @property() size: 'sm' | 'md' | 'lg' = 'md'
  @property({ type: Boolean }) disabled = false

  render() {
    const classes = {
      [this.variant]: true,
      [this.size]: true,
      disabled: this.disabled,
    }

    return html`
      <button class=${classMap(classes)} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `
  }
}
```

### Route Configuration

```ts
// router.ts
import { Router } from '@lit-labs/router'
import { html } from 'lit'

// Lazy load page components
const routes = [
  {
    path: '/',
    render: () => html`<hl-home></hl-home>`,
    enter: async () => {
      await import('./pages/hl-home.js')
      return true
    },
  },
  {
    path: '/login',
    render: () => html`<hl-login></hl-login>`,
    enter: async () => {
      await import('./pages/auth/hl-login.js')
      return true
    },
  },
  {
    path: '/dashboard',
    render: () => html`<hl-dashboard></hl-dashboard>`,
    enter: async ({ router }) => {
      // Route guard
      const authState = document.querySelector('hl-auth-provider')?.authState
      if (!authState?.token) {
        router.goto('/login?redirect=/dashboard')
        return false
      }
      await import('./pages/dashboard/hl-dashboard.js')
      return true
    },
  },
  {
    path: '/users',
    render: () => html`<hl-users></hl-users>`,
    enter: async ({ router }) => {
      const authState = document.querySelector('hl-auth-provider')?.authState
      if (!authState?.hasPermission('users:list')) {
        return false
      }
      await import('./pages/dashboard/hl-users.js')
      return true
    },
  },
  // More routes...
]

export function createRouter(host: HTMLElement) {
  return new Router(host, routes)
}
```

### Permission Component

```ts
// components/shared/hl-permission-guard.ts
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { consume } from '@lit-labs/context'
import { authContext, type AuthState } from '../../stores/auth-context'

@customElement('hl-permission-guard')
export class HlPermissionGuard extends LitElement {
  @property() permission = ''

  @consume({ context: authContext, subscribe: true })
  authState!: AuthState

  render() {
    const hasPermission = this.authState?.hasPermission(this.permission)

    if (!hasPermission) {
      return html`<slot name="fallback"></slot>`
    }

    return html`<slot></slot>`
  }
}
```

```html
<!-- Usage -->
<hl-permission-guard permission="users:delete">
  <hl-button variant="destructive">Delete</hl-button>
  <span slot="fallback" class="text-muted-foreground">No permission</span>
</hl-permission-guard>
```

### Page Component

```ts
// pages/auth/hl-login.ts
import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { consume } from '@lit-labs/context'
import { authContext, type AuthState } from '../../stores/auth-context'

@customElement('hl-login')
export class HlLogin extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .error {
      color: var(--destructive);
    }
  `

  @consume({ context: authContext, subscribe: true })
  authState!: AuthState

  @state() private email = ''
  @state() private password = ''
  @state() private error = ''

  private async handleSubmit(e: Event) {
    e.preventDefault()
    this.error = ''

    try {
      await this.authState.login({
        email: this.email,
        password: this.password,
      })

      const params = new URLSearchParams(location.search)
      const redirect = params.get('redirect') || '/dashboard'
      window.location.href = redirect
    } catch (e) {
      this.error = 'Invalid email or password'
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <h1>Login</h1>

        ${this.error ? html`<div class="error">${this.error}</div>` : ''}

        <hl-input
          type="email"
          label="Email"
          .value=${this.email}
          @input=${(e: Event) => this.email = (e.target as HTMLInputElement).value}
        ></hl-input>

        <hl-input
          type="password"
          label="Password"
          .value=${this.password}
          @input=${(e: Event) => this.password = (e.target as HTMLInputElement).value}
        ></hl-input>

        <hl-button type="submit" ?disabled=${this.authState?.loading}>
          ${this.authState?.loading ? 'Logging in...' : 'Login'}
        </hl-button>
      </form>
    `
  }
}
```

### Root App Component

```ts
// hl-app.ts
import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRouter } from './router'

import './stores/auth-context'
import './components/layout/hl-admin-layout'

@customElement('hl-app')
export class HlApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
  `

  private router = createRouter(this)

  render() {
    return html`
      <hl-auth-provider>
        ${this.router.outlet()}
      </hl-auth-provider>
    `
  }
}
```

## Page Routes

| Path | Page | Permission |
|------|------|------|
| `/` | Homepage | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot Password | Public |
| `/reset-password` | Reset Password | Public |
| `/dashboard` | Dashboard | `dashboard:view` |
| `/users` | User List | `users:list` |
| `/users/create` | Create User | `users:create` |
| `/users/:id` | User Detail | `users:view` |
| `/roles` | Role Management | `roles:list` |
| `/permissions` | Permission Management | `permissions:list` |
| `/settings` | System Settings | `settings:view` |
| `/profile` | Profile | Logged in |

## Using in Other Frameworks

### React

```tsx
import '@halolight/lit/hl-button'

function App() {
  return (
    <hl-button variant="default" onClick={() => console.log('clicked')}>
      Click
    </hl-button>
  )
}
```

### Vue

```vue
<template>
  <hl-button variant="default" @click="handleClick">
    Click
  </hl-button>
</template>

<script setup>
import '@halolight/lit/hl-button'

function handleClick() {
  console.log('clicked')
}
</script>
```

### Angular

```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import '@halolight/lit/hl-button'

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<hl-button variant="default" (click)="handleClick()">
  Click
</hl-button>
```

## Configuration

### Vite Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
})
```

## Deployment

### Static Hosting

```bash
pnpm build
# Deploy dist directory to any static hosting service
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
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

### Vercel

```bash
npx vercel
```

## Testing

```bash
# Run tests
pnpm test

# Use Web Test Runner
pnpm test:wtr
```

## Comparison with Other Versions

| Feature | Lit Version | Vue Version | Next.js Version |
|------|---------|----------|--------------|
| State Management | @lit-labs/context | Pinia | Zustand |
| Data Fetching | fetch | TanStack Query | TanStack Query |
| Form Validation | Custom + Zod | VeeValidate + Zod | React Hook Form + Zod |
| Server-side | None (SPA) | Separate Backend | API Routes |
| Component Library | Shoelace | shadcn-vue | shadcn/ui |
| Routing | @lit-labs/router | Vue Router | App Router |
| Cross-framework Reusable | ✅ Native Support | ❌ | ❌ |
| Shadow DOM | ✅ | ❌ | ❌ |
