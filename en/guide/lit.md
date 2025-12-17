# Lit Version

HaloLight Lit version is built on Lit 3 with Web Components standards + TypeScript, providing cross-framework reusable Web Components library.

**Live Preview**: [https://halolight-lit.h7ml.cn](https://halolight-lit.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-lit](https://github.com/halolight/halolight-lit)

## Features

- 🎯 **Web Components Standard** - Native browser support, no framework lock-in
- ⚡ **Cross-framework Reusable** - Components work in React/Vue/Angular
- 🎨 **Theme System** - 11 skins, light/dark mode, View Transitions
- 🔐 **Authentication** - Complete login/register/password recovery flow
- 📊 **Dashboard** - Data visualization and business management
- 🛡️ **Permission Control** - RBAC fine-grained permission management
- 🪶 **Lightweight** - Core library ~5KB gzip
- 🌓 **Shadow DOM** - Style isolation, avoid conflicts

## Tech Stack

| Technology | Version | Description |
|------|------|------|
| Lit | 3.x | Web Components framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Atomic CSS |
| @lit-labs/router | 0.1.x | Client-side routing |
| @lit-labs/context | 1.x | Context state |
| Shoelace | 2.x | Web Components UI library |
| Zod | 3.x | Data validation |
| ECharts | 5.x | Chart visualization |
| Vite | 6.x | Build tool |
| Mock.js | 1.x | Data mocking |

## Core Features

- **Configurable Dashboard** - 9 widgets, drag & drop layout, responsive design
- **Permission System** - RBAC permission control, route guards, permission components
- **Theme System** - 11 skins, light/dark mode, View Transitions
- **Reactive Properties** - @property decorator for reactivity
- **Shadow DOM Isolation** - Style encapsulation, avoid global conflicts
- **Native Support** - Based on Web standards, compatible with all modern browsers

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
│   │   │   └── hl-dialog.ts
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
│   ├── mock/                     # Mock data
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

### Requirements

- Node.js >= 18.0.0
- pnpm >= 9.x

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
# .env
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=false
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

### Permission Control

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

**Usage Example:**

```html
<hl-permission-guard permission="users:delete">
  <hl-button variant="destructive">Delete</hl-button>
  <span slot="fallback" class="text-muted-foreground">No permission</span>
</hl-permission-guard>
```

### Draggable Dashboard

```ts
// components/dashboard/hl-dashboard-grid.ts
import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import Sortable from 'sortablejs'

@customElement('hl-dashboard-grid')
export class HlDashboardGrid extends LitElement {
  static styles = css`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .widget {
      background: var(--card);
      border-radius: 0.5rem;
      padding: 1rem;
      cursor: move;
    }
  `

  @state() private widgets = [
    { id: 'stats', type: 'stats' },
    { id: 'chart', type: 'chart' },
    { id: 'table', type: 'table' },
  ]

  firstUpdated() {
    const grid = this.shadowRoot?.querySelector('.grid')
    if (grid) {
      new Sortable(grid as HTMLElement, {
        animation: 150,
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt
          if (oldIndex !== undefined && newIndex !== undefined) {
            const item = this.widgets.splice(oldIndex, 1)[0]
            this.widgets.splice(newIndex, 0, item)
            this.requestUpdate()
          }
        },
      })
    }
  }

  render() {
    return html`
      <div class="grid">
        ${this.widgets.map(widget => html`
          <div class="widget" data-id=${widget.id}>
            <hl-widget-wrapper type=${widget.type}></hl-widget-wrapper>
          </div>
        `)}
      </div>
    `
  }
}
```

## Theme System

### Skin Presets

Supports 11 preset skins, switch via quick settings panel:

| Skin | Primary Color | CSS Variable |
|------|--------|----------|
| Default | Purple | `--primary: 51.1% 0.262 276.97` |
| Blue | Blue | `--primary: 54.8% 0.243 264.05` |
| Emerald | Emerald | `--primary: 64.6% 0.178 142.49` |
| Rose | Rose | `--primary: 58.5% 0.217 12.53` |
| Orange | Orange | `--primary: 68.4% 0.197 41.73` |

### CSS Variables (OKLch)

```css
/* Theme variable definition */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 98% 0 0;
  --card: 100% 0 0;
  --card-foreground: 14.9% 0.017 285.75;
  --border: 93.3% 0.011 285.88;
  --radius: 0.5rem;
}

.dark {
  --background: 14.9% 0.017 285.75;
  --foreground: 98% 0 0;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 98% 0 0;
  --card: 14.9% 0.017 285.75;
  --card-foreground: 98% 0 0;
  --border: 25.1% 0.025 285.82;
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
| `/users` | User Management | `users:view` |
| `/users/create` | Create User | `users:create` |
| `/users/:id` | User Detail | `users:view` |
| `/roles` | Role Management | `roles:view` |
| `/permissions` | Permission Management | `permissions:view` |
| `/settings` | System Settings | `settings:view` |
| `/profile` | Profile | `settings:view` |

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

## Common Commands

```bash
pnpm dev            # Start dev server
pnpm build          # Production build
pnpm preview        # Preview production build
pnpm lint           # Code linting
pnpm lint:fix       # Auto fix
pnpm type-check     # Type checking
pnpm test           # Run tests
pnpm test:coverage  # Test coverage
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-lit)

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

### Other Platforms

- [Cloudflare Pages](/en/guide/cloudflare)
- [Netlify](/en/guide/netlify)
- [AWS Amplify](/en/guide/aws)
- [Azure Static Web Apps](/en/guide/azure)

## Demo Accounts

| Role | Email | Password |
|------|------|------|
| Admin | admin@halolight.h7ml.cn | 123456 |
| User | user@halolight.h7ml.cn | 123456 |

## Testing

```bash
pnpm test           # Run tests (watch mode)
pnpm test:run       # Single run
pnpm test:coverage  # Coverage report
pnpm test:ui        # Vitest UI
```

### Test Example

```ts
// __tests__/hl-button.test.ts
import { expect, fixture, html } from '@open-wc/testing'
import '../src/components/ui/hl-button'

describe('hl-button', () => {
  it('renders with default variant', async () => {
    const el = await fixture(html`<hl-button>Click me</hl-button>`)
    const button = el.shadowRoot?.querySelector('button')
    expect(button).to.exist
    expect(button?.textContent?.trim()).to.equal('Click me')
  })

  it('applies variant classes', async () => {
    const el = await fixture(html`<hl-button variant="destructive">Delete</hl-button>`)
    const button = el.shadowRoot?.querySelector('button')
    expect(button?.classList.contains('destructive')).to.be.true
  })

  it('handles disabled state', async () => {
    const el = await fixture(html`<hl-button disabled>Disabled</hl-button>`)
    const button = el.shadowRoot?.querySelector('button')
    expect(button?.disabled).to.be.true
  })
})
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
  server: {
    port: 5173,
  },
})
```

### Tailwind Configuration

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'oklch(var(--border))',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
      },
    },
  },
} satisfies Config
```

## CI/CD

Complete GitHub Actions CI workflow configured:

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

### Lifecycle Hooks

```ts
// Component lifecycle
@customElement('my-component')
export class MyComponent extends LitElement {
  // First connected to DOM
  connectedCallback() {
    super.connectedCallback()
    console.log('Component connected')
  }

  // First update complete
  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties)
    console.log('First render complete')
  }

  // Each update complete
  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    if (changedProperties.has('value')) {
      console.log('Value changed:', this.value)
    }
  }

  // Removed from DOM
  disconnectedCallback() {
    super.disconnectedCallback()
    console.log('Component disconnected')
  }
}
```

### Custom Directives

```ts
// lib/directives/tooltip.ts
import { directive, Directive } from 'lit/directive.js'
import { AsyncDirective } from 'lit/async-directive.js'

class TooltipDirective extends AsyncDirective {
  render(text: string) {
    return text
  }

  update(part: any, [text]: [string]) {
    const element = part.element
    element.setAttribute('title', text)
    element.style.cursor = 'help'
    return this.render(text)
  }
}

export const tooltip = directive(TooltipDirective)
```

```ts
// Usage
import { tooltip } from './lib/directives/tooltip'

render() {
  return html`
    <span ${tooltip('Tooltip message')}>Hover to see tooltip</span>
  `
}
```

## Performance Optimization

### Virtual Scrolling

```ts
// components/ui/hl-virtual-list.ts
import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

@customElement('hl-virtual-list')
export class HlVirtualList extends LitElement {
  @property({ type: Array }) items: any[] = []
  @property({ type: Number }) itemHeight = 50
  @state() private visibleStart = 0
  @state() private visibleEnd = 20

  private handleScroll(e: Event) {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    this.visibleStart = Math.floor(scrollTop / this.itemHeight)
    this.visibleEnd = this.visibleStart + 20
  }

  render() {
    const visibleItems = this.items.slice(this.visibleStart, this.visibleEnd)

    return html`
      <div class="container" @scroll=${this.handleScroll}>
        <div style="height: ${this.items.length * this.itemHeight}px">
          <div style="transform: translateY(${this.visibleStart * this.itemHeight}px)">
            ${repeat(
              visibleItems,
              item => item.id,
              item => html`<div class="item">${item.name}</div>`
            )}
          </div>
        </div>
      </div>
    `
  }
}
```

### Lazy Loading Components

```ts
// Route lazy loading
{
  path: '/dashboard',
  enter: async () => {
    await import('./pages/dashboard/hl-dashboard.js')
    return true
  },
}

// Dynamic import
async loadWidget(type: string) {
  const module = await import(`./widgets/hl-${type}-widget.js`)
  return module.default
}
```

### Preloading

```ts
// Preload critical routes
const preloadRoutes = ['/dashboard', '/users']

preloadRoutes.forEach(async (route) => {
  const link = document.createElement('link')
  link.rel = 'modulepreload'
  link.href = `./pages${route}.js`
  document.head.appendChild(link)
})
```

## FAQ

### Q: How to use global styles in Shadow DOM?

A: Use CSS custom properties or `@import` global styles:

```ts
static styles = css`
  @import url('/global.css');

  :host {
    color: var(--foreground);
    background: var(--background);
  }
`
```

### Q: How to handle form data two-way binding?

A: Use `@input` event and `@state` decorator:

```ts
@customElement('hl-form')
export class HlForm extends LitElement {
  @state() private formData = { name: '', email: '' }

  private handleInput(field: string, value: string) {
    this.formData = { ...this.formData, [field]: value }
  }

  render() {
    return html`
      <input
        .value=${this.formData.name}
        @input=${(e: Event) =>
          this.handleInput('name', (e.target as HTMLInputElement).value)}
      />
    `
  }
}
```

### Q: How to communicate between components?

A: Use custom events or Context API:

```ts
// Dispatch event
this.dispatchEvent(new CustomEvent('data-changed', {
  detail: { data: this.data },
  bubbles: true,
  composed: true, // Penetrate Shadow DOM
}))

// Listen event
@customElement('parent-component')
export class ParentComponent extends LitElement {
  render() {
    return html`
      <child-component @data-changed=${this.handleDataChanged}></child-component>
    `
  }

  private handleDataChanged(e: CustomEvent) {
    console.log('Data:', e.detail.data)
  }
}
```

## Comparison with Other Versions

| Feature | Lit Version | Next.js Version | Vue Version |
|------|---------|--------------|----------|
| SSR/SSG | ✅ (Experimental) | ✅ | ✅ (Nuxt) |
| State Management | @lit-labs/context | Zustand | Pinia |
| Routing | @lit-labs/router | App Router | Vue Router |
| Build Tool | Vite | Next.js | Vite |
| Cross-framework Reusable | ✅ Native Support | ❌ | ❌ |
| Shadow DOM | ✅ | ❌ | ❌ |
| Bundle Size | 5KB (gzip) | ~90KB | ~60KB |

## Related Links

- [Live Preview](https://halolight-lit.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-lit)
- [Lit Official Docs](https://lit.dev)
- [Web Components Standards](https://www.webcomponents.org)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
