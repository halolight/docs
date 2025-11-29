# Lit 版本

HaloLight Lit 版本基于 Lit 3 构建，采用 Web Components 标准 + TypeScript，实现跨框架可复用的管理后台。

**在线预览**：[https://halolight-lit.h7ml.cn/](https://halolight-lit.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-lit](https://github.com/halolight/halolight-lit)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Lit | 3.x | Web Components 框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| Vite | 6.x | 构建工具 |
| @lit-labs/router | 0.1.x | 客户端路由 |
| @lit-labs/context | 1.x | 上下文状态 |
| Shoelace | 2.x | Web Components UI 库 |
| Zod | 3.x | 数据验证 |
| ECharts | 5.x | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **Web Components 标准**：原生浏览器支持，无框架锁定
- **跨框架复用**：组件可在 React/Vue/Angular 中使用
- **Shadow DOM**：样式隔离，避免冲突
- **响应式属性**：@property 装饰器实现响应式
- **轻量高效**：核心库约 5KB gzip
- **SSR 支持**：支持服务端渲染

## 目录结构

```
halolight-lit/
├── src/
│   ├── pages/                     # 页面组件
│   │   ├── hl-home.ts            # 首页
│   │   ├── auth/                 # 认证页面
│   │   │   ├── hl-login.ts
│   │   │   ├── hl-register.ts
│   │   │   ├── hl-forgot-password.ts
│   │   │   └── hl-reset-password.ts
│   │   └── dashboard/            # 仪表盘页面
│   │       ├── hl-dashboard.ts
│   │       ├── hl-users.ts
│   │       ├── hl-user-detail.ts
│   │       ├── hl-user-create.ts
│   │       ├── hl-roles.ts
│   │       ├── hl-permissions.ts
│   │       ├── hl-settings.ts
│   │       └── hl-profile.ts
│   ├── components/               # 组件库
│   │   ├── ui/                   # UI 组件
│   │   │   ├── hl-button.ts
│   │   │   ├── hl-input.ts
│   │   │   ├── hl-card.ts
│   │   │   ├── hl-dialog.ts
│   │   │   └── ...
│   │   ├── layout/               # 布局组件
│   │   │   ├── hl-admin-layout.ts
│   │   │   ├── hl-auth-layout.ts
│   │   │   ├── hl-sidebar.ts
│   │   │   └── hl-header.ts
│   │   ├── dashboard/            # 仪表盘组件
│   │   │   ├── hl-dashboard-grid.ts
│   │   │   ├── hl-widget-wrapper.ts
│   │   │   └── hl-stats-widget.ts
│   │   └── shared/               # 共享组件
│   │       └── hl-permission-guard.ts
│   ├── stores/                   # 状态管理
│   │   ├── auth-context.ts
│   │   ├── ui-settings-context.ts
│   │   └── dashboard-context.ts
│   ├── lib/                      # 工具库
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── styles.ts
│   ├── types/                    # 类型定义
│   ├── hl-app.ts                 # 根组件
│   ├── router.ts                 # 路由配置
│   └── main.ts                   # 入口文件
├── public/                       # 静态资源
├── vite.config.ts               # Vite 配置
├── tailwind.config.ts           # Tailwind 配置
���── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-lit.git
cd halolight-lit
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# .env 示例
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@example.com
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产

```bash
pnpm build
pnpm preview
```

## 核心功能

### 状态管理 (@lit-labs/context)

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

### 基础组件

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

### 路由配置

```ts
// router.ts
import { Router } from '@lit-labs/router'
import { html } from 'lit'

// 延迟加载页面组件
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
      // 路由守卫
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
  // 更多路由...
]

export function createRouter(host: HTMLElement) {
  return new Router(host, routes)
}
```

### 权限组件

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
<!-- 使用 -->
<hl-permission-guard permission="users:delete">
  <hl-button variant="destructive">删除</hl-button>
  <span slot="fallback" class="text-muted-foreground">无权限</span>
</hl-permission-guard>
```

### 页面组件

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
      this.error = '邮箱或密码错误'
    }
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <h1>登录</h1>

        ${this.error ? html`<div class="error">${this.error}</div>` : ''}

        <hl-input
          type="email"
          label="邮箱"
          .value=${this.email}
          @input=${(e: Event) => this.email = (e.target as HTMLInputElement).value}
        ></hl-input>

        <hl-input
          type="password"
          label="密码"
          .value=${this.password}
          @input=${(e: Event) => this.password = (e.target as HTMLInputElement).value}
        ></hl-input>

        <hl-button type="submit" ?disabled=${this.authState?.loading}>
          ${this.authState?.loading ? '登录中...' : '登录'}
        </hl-button>
      </form>
    `
  }
}
```

### 根应用组件

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

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 | 公开 |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户列表 | `users:list` |
| `/users/create` | 创建用户 | `users:create` |
| `/users/:id` | 用户详情 | `users:view` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

## 在其他框架中使用

### React

```tsx
import '@halolight/lit/hl-button'

function App() {
  return (
    <hl-button variant="default" onClick={() => console.log('clicked')}>
      点击
    </hl-button>
  )
}
```

### Vue

```vue
<template>
  <hl-button variant="default" @click="handleClick">
    点击
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
  点击
</hl-button>
```

## 配置

### Vite 配置

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

## 部署

### 静态托管

```bash
pnpm build
# 将 dist 目录部署到任意静态托管服务
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

## 测试

```bash
# 运行测试
pnpm test

# 使用 Web Test Runner
pnpm test:wtr
```

## 与其他版本对比

| 功能 | Lit 版本 | Vue 版本 | Next.js 版本 |
|------|---------|----------|--------------|
| 状态管理 | @lit-labs/context | Pinia | Zustand |
| 数据获取 | fetch | TanStack Query | TanStack Query |
| 表单验证 | 自定义 + Zod | VeeValidate + Zod | React Hook Form + Zod |
| 服务端 | 无（SPA） | 独立后端 | API Routes |
| 组件库 | Shoelace | shadcn-vue | shadcn/ui |
| 路由 | @lit-labs/router | Vue Router | App Router |
| 跨框架复用 | ✅ 原生支持 | ❌ | ❌ |
| Shadow DOM | ✅ | ❌ | ❌ |
