# Lit 版本

HaloLight Lit 版本基于 Lit 3 构建，采用 Web Components 标准 + TypeScript，提供跨框架可复用的 Web Components 组件库。

**在线预览**：[https://halolight-lit.h7ml.cn](https://halolight-lit.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-lit](https://github.com/halolight/halolight-lit)

## 特性

- 🎯 **Web Components 标准** - 原生浏览器支持，无框架锁定
- ⚡ **跨框架复用** - 组件可在 React/Vue/Angular 中使用
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 🪶 **轻量高效** - 核心库约 5KB gzip
- 🌓 **Shadow DOM** - 样式隔离，避免冲突

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Lit | 3.x | Web Components 框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| @lit-labs/router | 0.1.x | 客户端路由 |
| @lit-labs/context | 1.x | 上下文状态 |
| Shoelace | 2.x | Web Components UI 库 |
| Zod | 3.x | 数据验证 |
| ECharts | 5.x | 图表可视化 |
| Vite | 6.x | 构建工具 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **可配置仪表盘** - 9 种小部件，拖拽布局，响应式适配
- **权限系统** - RBAC 权限控制，路由守卫，权限组件
- **主题系统** - 11 种皮肤，明暗模式，View Transitions
- **响应式属性** - @property 装饰器实现响应式
- **Shadow DOM 隔离** - 样式封装，避免全局冲突
- **原生支持** - 基于 Web 标准，兼容所有现代浏览器

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
│   │   │   └── hl-dialog.ts
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
│   ├── mock/                     # Mock 数据
│   ├── types/                    # 类型定义
│   ├── hl-app.ts                 # 根组件
│   ├── router.ts                 # 路由配置
│   └── main.ts                   # 入口文件
├── public/                       # 静态资源
├── vite.config.ts               # Vite 配置
├── tailwind.config.ts           # Tailwind 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

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
# .env
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=false
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

### 权限控制

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

**使用示例：**

```html
<hl-permission-guard permission="users:delete">
  <hl-button variant="destructive">删除</hl-button>
  <span slot="fallback" class="text-muted-foreground">无权限</span>
</hl-permission-guard>
```

### 可拖拽仪表盘

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

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过快捷设置面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿 | `--primary: 64.6% 0.178 142.49` |
| Rose | 玫红 | `--primary: 58.5% 0.217 12.53` |
| Orange | 橘色 | `--primary: 68.4% 0.197 41.73` |

### CSS 变量 (OKLch)

```css
/* 主题变量定义 */
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

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 首页 | 公开 |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/dashboard` | 仪表盘 | `dashboard:view` |
| `/users` | 用户管理 | `users:view` |
| `/users/create` | 创建用户 | `users:create` |
| `/users/:id` | 用户详情 | `users:view` |
| `/roles` | 角色管理 | `roles:view` |
| `/permissions` | 权限管理 | `permissions:view` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人资料 | `settings:view` |

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

## 常用命令

```bash
pnpm dev            # 启动开发服务器
pnpm build          # 生产构建
pnpm preview        # 预览生产构建
pnpm lint           # 代码检查
pnpm lint:fix       # 自动修复
pnpm type-check     # 类型检查
pnpm test           # 运行测试
pnpm test:coverage  # 测试覆盖率
```

## 部署

### Vercel (推荐)

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

### 其他平台

- [Cloudflare Pages](/guide/cloudflare)
- [Netlify](/guide/netlify)
- [AWS Amplify](/guide/aws)
- [Azure Static Web Apps](/guide/azure)

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

## 测试

```bash
pnpm test           # 运行测试（watch 模式）
pnpm test:run       # 单次运行
pnpm test:coverage  # 覆盖率报告
pnpm test:ui        # Vitest UI 界面
```

### 测试示例

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
  server: {
    port: 5173,
  },
})
```

### Tailwind 配置

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

项目配置了完整的 GitHub Actions CI 工作流：

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

## 高级功能

### 生命周期钩子

```ts
// 组件生命周期
@customElement('my-component')
export class MyComponent extends LitElement {
  // 首次连接到 DOM
  connectedCallback() {
    super.connectedCallback()
    console.log('Component connected')
  }

  // 首次更新完成
  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties)
    console.log('First render complete')
  }

  // 每次更新完成
  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    if (changedProperties.has('value')) {
      console.log('Value changed:', this.value)
    }
  }

  // 从 DOM 中移除
  disconnectedCallback() {
    super.disconnectedCallback()
    console.log('Component disconnected')
  }
}
```

### 自定义指令

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
// 使用
import { tooltip } from './lib/directives/tooltip'

render() {
  return html`
    <span ${tooltip('这是提示信息')}>悬停查看提示</span>
  `
}
```

## 性能优化

### 虚拟滚动

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

### 懒加载组件

```ts
// 路由懒加载
{
  path: '/dashboard',
  enter: async () => {
    await import('./pages/dashboard/hl-dashboard.js')
    return true
  },
}

// 动态导入
async loadWidget(type: string) {
  const module = await import(`./widgets/hl-${type}-widget.js`)
  return module.default
}
```

### 预加载

```ts
// 预加载关键路由
const preloadRoutes = ['/dashboard', '/users']

preloadRoutes.forEach(async (route) => {
  const link = document.createElement('link')
  link.rel = 'modulepreload'
  link.href = `./pages${route}.js`
  document.head.appendChild(link)
})
```

## 常见问题

### Q：如何在 Shadow DOM 中使用全局样式？

A：使用 CSS 自定义属性或 `@import` 导入全局样式：

```ts
static styles = css`
  @import url('/global.css');

  :host {
    color: var(--foreground);
    background: var(--background);
  }
`
```

### Q：如何处理表单数据双向绑定？

A：使用 `@input` 事件和 `@state` 装饰器：

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

### Q：如何在组件间通信？

A：使用自定义事件或 Context API：

```ts
// 发送事件
this.dispatchEvent(new CustomEvent('data-changed', {
  detail: { data: this.data },
  bubbles: true,
  composed: true, // 穿透 Shadow DOM
}))

// 监听事件
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

## 与其他版本对比

| 特性 | Lit 版本 | Next.js 版本 | Vue 版本 |
|------|---------|--------------|----------|
| SSR/SSG | ✅ (实验性) | ✅ | ✅ (Nuxt) |
| 状态管理 | @lit-labs/context | Zustand | Pinia |
| 路由 | @lit-labs/router | App Router | Vue Router |
| 构建工具 | Vite | Next.js | Vite |
| 跨框架复用 | ✅ 原生支持 | ❌ | ❌ |
| Shadow DOM | ✅ | ❌ | ❌ |
| 包大小 | 5KB (gzip) | ~90KB | ~60KB |

## 相关链接

- [在线预览](https://halolight-lit.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-lit)
- [Lit 官方文档](https://lit.dev)
- [Web Components 标准](https://www.webcomponents.org)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
