# Qwik 版本

HaloLight Qwik 版本基于 Qwik City 构建，采用 Qwik 可恢复性架构 + TypeScript，实现零水合的极致性能。

**在线预览**：[https://halolight-qwik.h7ml.cn](https://halolight-qwik.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-qwik](https://github.com/halolight/halolight-qwik)

## 特性

- 🔄 **可恢复性** - 无需水合，服务端状态直接恢复
- ⚡ **懒加载一切** - 代码按需加载，首屏 JS 极小 (~1KB)
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 📡 **Signals** - 细粒度响应式系统
- 🌐 **边缘部署** - 原生支持 Cloudflare Workers 等边缘平台

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Qwik | 2.x | 可恢复性框架 |
| Qwik City | 2.x | 全栈框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| Qwik UI | latest | UI 组件库 |
| Modular Forms | latest | 表单处理 |
| Zod | 3.x | 数据验证 |
| ECharts | 5.x | 图表可视化 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **可配置仪表盘** - 9 种小部件，拖拽布局，响应式适配
- **权限系统** - RBAC 权限控制，路由守卫，权限组件
- **主题系统** - 11 种皮肤，明暗模式，View Transitions
- **服务端渲染** - 内置 SSR 支持，SEO 优化
- **文件路由** - 基于目录的路由系统
- **实时通知** - WebSocket 推送，通知中心

## 目录结构

```
halolight-qwik/
├── src/
│   ├── routes/                    # 文件路由
│   │   ├── index.tsx            # 首页
│   │   ├── layout.tsx           # 根布局
│   │   ├── (auth)/              # 认证路由组
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── index.tsx
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (dashboard)/         # 仪表盘路由组
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── index.tsx
│   │   │   ├── users/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── create/
│   │   │   │   └── [id]/
│   │   │   ├── roles/
│   │   │   ├── permissions/
│   │   │   ├── settings/
│   │   │   └── profile/
│   │   └── api/                 # API 端点
│   │       └── auth/
│   │           └── login/
│   │               └── index.ts
│   ├── components/              # 组件库
│   │   ├── ui/                  # Qwik UI 组件
│   │   ├── layout/              # 布局组件
│   │   │   ├── admin-layout/
│   │   │   ├── auth-layout/
│   │   │   ├── sidebar/
│   │   │   └── header/
│   │   ├── dashboard/           # 仪表盘组件
│   │   │   ├── dashboard-grid/
│   │   │   ├── widget-wrapper/
│   │   │   └── stats-widget/
│   │   └── shared/              # 共享组件
│   │       └── permission-guard/
│   ├── stores/                  # 状态管理
│   │   ├── auth.ts
│   │   ├── ui-settings.ts
│   │   └── dashboard.ts
│   ├── lib/                     # 工具库
│   │   ├── api.ts
│   │   ├── permission.ts
│   │   └── cn.ts
│   ├── mock/                    # Mock 数据
│   └── types/                   # 类型定义
├── public/                      # 静态资源
├── vite.config.ts              # Vite 配置
├── tailwind.config.ts          # Tailwind 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 安装

```bash
git clone https://github.com/halolight/halolight-qwik.git
cd halolight-qwik
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
pnpm serve
```

## 核心功能

### 状态管理 (Context + Signals)

```tsx
// stores/auth.ts
import {
  createContextId,
  useContext,
  useStore,
  useComputed$,
  $,
  type Signal,
} from '@builder.io/qwik'

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
}

export const AuthContext = createContextId<AuthState>('auth')

export function useAuth() {
  const state = useContext(AuthContext)

  const isAuthenticated = useComputed$(() => !!state.token && !!state.user)
  const permissions = useComputed$(() => state.user?.permissions ?? [])

  const login = $(async (credentials: { email: string; password: string }) => {
    state.loading = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()

      state.user = data.user
      state.token = data.token
    } finally {
      state.loading = false
    }
  })

  const logout = $(() => {
    state.user = null
    state.token = null
  })

  const hasPermission = $((permission: string) => {
    const perms = state.user?.permissions ?? []
    return perms.some(p =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  })

  return {
    state,
    isAuthenticated,
    permissions,
    login,
    logout,
    hasPermission,
  }
}
```

### 数据获取 (routeLoader$)

```tsx
// routes/(dashboard)/users/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'

export const useUsers = routeLoader$(async ({ query, cookie, status }) => {
  const token = cookie.get('token')?.value
  const page = Number(query.get('page')) || 1

  // 权限检查
  const user = await validateToken(token)
  if (!hasPermission(user, 'users:list')) {
    status(403)
    return { error: '无权限访问' }
  }

  const response = await fetch(`/api/users?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.json()
})

export default component$(() => {
  const users = useUsers()

  return (
    <div>
      <h1>用户列表</h1>

      {users.value.error ? (
        <div class="text-destructive">{users.value.error}</div>
      ) : (
        <ul>
          {users.value.data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
})
```

### 权限控制

#### 路由守卫

```tsx
// routes/(dashboard)/layout.tsx
import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { useAuth } from '~/stores/auth'
import { AdminLayout } from '~/components/layout/admin-layout'

export const useAuthGuard = routeLoader$(async ({ cookie, redirect, url }) => {
  const token = cookie.get('token')?.value

  if (!token) {
    throw redirect(302, `/login?redirect=${url.pathname}`)
  }

  // 验证 token 并返回用户信息
  return {
    user: await validateToken(token),
  }
})

export default component$(() => {
  const data = useAuthGuard()

  return (
    <AdminLayout user={data.value.user}>
      <Slot />
    </AdminLayout>
  )
})
```

#### 权限组件

```tsx
// components/shared/permission-guard/index.tsx
import { component$, Slot, useComputed$ } from '@builder.io/qwik'
import { useAuth } from '~/stores/auth'

interface Props {
  permission: string
}

export const PermissionGuard = component$<Props>(({ permission }) => {
  const { hasPermission } = useAuth()

  const allowed = useComputed$(async () => {
    return await hasPermission(permission)
  })

  return (
    <>
      {allowed.value ? (
        <Slot />
      ) : (
        <Slot name="fallback" />
      )}
    </>
  )
})

// 使用
<PermissionGuard permission="users:delete">
  <Button variant="destructive" q:slot="">删除</Button>
  <span q:slot="fallback" class="text-muted-foreground">无权限</span>
</PermissionGuard>
```

### 表单提交 (routeAction$)

```tsx
// routes/(auth)/login/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeAction$, zod$, z, Form } from '@builder.io/qwik-city'

export const useLogin = routeAction$(
  async (data, { cookie, redirect, fail }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        return fail(401, { message: '邮箱或密码错误' })
      }

      const result = await response.json()

      cookie.set('token', result.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })

      throw redirect(302, '/dashboard')
    } catch (e) {
      return fail(500, { message: '服务器错误' })
    }
  },
  zod$({
    email: z.string().email('请输入有效邮箱'),
    password: z.string().min(6, '密码至少6位'),
  })
)

export default component$(() => {
  const action = useLogin()

  return (
    <Form action={action}>
      {action.value?.failed && (
        <div class="text-destructive">{action.value.message}</div>
      )}

      <input type="email" name="email" placeholder="邮箱" />
      {action.value?.fieldErrors?.email && (
        <span class="text-destructive">{action.value.fieldErrors.email}</span>
      )}

      <input type="password" name="password" placeholder="密码" />
      {action.value?.fieldErrors?.password && (
        <span class="text-destructive">{action.value.fieldErrors.password}</span>
      )}

      <button type="submit" disabled={action.isRunning}>
        {action.isRunning ? '登录中...' : '登录'}
      </button>
    </Form>
  )
})
```

### API 路由

```ts
// routes/api/auth/login/index.ts
import type { RequestHandler } from '@builder.io/qwik-city'

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const body = await parseBody()
  const { email, password } = body as { email: string; password: string }

  // 验证逻辑
  if (!email || !password) {
    json(400, { success: false, message: '邮箱和密码不能为空' })
    return
  }

  // 认证逻辑...

  json(200, {
    success: true,
    user: { id: 1, name: '管理员', email },
    token: 'mock_token',
  })
}
```

### 可拖拽仪表盘

```tsx
// components/dashboard/dashboard-grid/index.tsx
import { component$, useSignal, useStore, $ } from '@builder.io/qwik'

interface Widget {
  id: string
  type: string
  x: number
  y: number
  w: number
  h: number
}

export const DashboardGrid = component$(() => {
  const widgets = useStore<Widget[]>([
    { id: '1', type: 'stats', x: 0, y: 0, w: 3, h: 2 },
    { id: '2', type: 'chart', x: 3, y: 0, w: 6, h: 4 },
  ])

  const handleLayoutChange = $((newLayout: Widget[]) => {
    widgets.splice(0, widgets.length, ...newLayout)
  })

  return (
    <div class="dashboard-grid">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          class="widget"
          style={{
            gridColumn: `${widget.x + 1} / span ${widget.w}`,
            gridRow: `${widget.y + 1} / span ${widget.h}`,
          }}
        >
          {/* Widget 内容 */}
        </div>
      ))}
    </div>
  )
})
```

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过快捷设置面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿 | `--primary: 64.6% 0.178 142.49` |
| Rose | 玫瑰 | `--primary: 61.8% 0.238 12.57` |
| Orange | 橙色 | `--primary: 68.3% 0.199 36.35` |
| Yellow | 黄色 | `--primary: 88.1% 0.197 95.45` |
| Violet | 紫罗兰 | `--primary: 57.8% 0.24 305.4` |
| Cyan | 青色 | `--primary: 73.8% 0.139 196.85` |
| Pink | 粉色 | `--primary: 72.2% 0.218 345.82` |
| Lime | 青柠 | `--primary: 79.2% 0.183 123.7` |
| Amber | 琥珀 | `--primary: 82.5% 0.157 62.24` |

### CSS 变量 (OKLch)

```css
/* 全局变量定义 */
:root {
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 98% 0 0;
  --secondary: 96.1% 0 0;
  --secondary-foreground: 9.8% 0 0;
  --muted: 95.1% 0.01 286.38;
  --muted-foreground: 45.1% 0.009 285.88;
  --accent: 95.1% 0.01 286.38;
  --accent-foreground: 9.8% 0 0;
  --destructive: 54.3% 0.227 25.78;
  --destructive-foreground: 98% 0 0;
  --border: 89.8% 0.006 286.32;
  --input: 89.8% 0.006 286.32;
  --ring: 51.1% 0.262 276.97;
  --radius: 0.5rem;
}

.dark {
  --background: 0% 0 0;
  --foreground: 98% 0 0;
  --primary: 59.6% 0.262 276.97;
  --primary-foreground: 14.9% 0.017 285.75;
  /* ... */
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
| `/users/[id]` | 用户详情 | `users:view` |
| `/roles` | 角色管理 | `roles:list` |
| `/permissions` | 权限管理 | `permissions:list` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | 登录即可 |

## 常用命令

```bash
pnpm dev            # 启动开发服务器
pnpm build          # 生产构建
pnpm serve          # 预览生产构建
pnpm lint           # 代码检查
pnpm lint:fix       # 自动修复
pnpm type-check     # 类型检查
pnpm test           # 运行测试
pnpm test:e2e       # E2E 测试
```

## 部署

### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-qwik)

```bash
# 使用 Vercel Edge 适配器
pnpm add -D @builder.io/qwik-city/adapters/vercel-edge
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
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json .
RUN npm install --production
EXPOSE 3000
CMD ["node", "server/entry.express.js"]
```

### 其他平台

- **Node.js 服务器**
  ```bash
  pnpm build
  node server/entry.express.js
  ```

- **Cloudflare Pages**
  ```bash
  # 使用 Cloudflare Pages 适配器
  pnpm add -D @builder.io/qwik-city/adapters/cloudflare-pages
  ```

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
pnpm test           # 运行测试
pnpm test:e2e       # E2E 测试
pnpm test:coverage  # 覆盖率报告
```

### 测试示例

```tsx
// src/components/permission-guard/permission-guard.spec.tsx
import { describe, it, expect } from 'vitest'
import { createDOM } from '@builder.io/qwik/testing'
import { PermissionGuard } from './permission-guard'

describe('PermissionGuard', () => {
  it('应当在有权限时渲染内容', async () => {
    const { screen, render } = await createDOM()

    await render(
      <PermissionGuard permission="users:view">
        <div>Protected Content</div>
      </PermissionGuard>
    )

    expect(screen.innerHTML).toContain('Protected Content')
  })

  it('应当在无权限时渲染回退内容', async () => {
    const { screen, render } = await createDOM()

    await render(
      <PermissionGuard permission="admin:*">
        <div>Protected Content</div>
        <div q:slot="fallback">No Permission</div>
      </PermissionGuard>
    )

    expect(screen.innerHTML).toContain('No Permission')
  })
})
```

## 配置

### Vite 配置

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  }
})
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

## 高级功能

### Qwik 可恢复性原理

Qwik 的核心创新是 “可恢复性” 而非 “水合”：

```tsx
// 传统框架（React/Vue）：需要重新执行所有代码来重建状态
// Qwik：直接从 HTML 恢复状态，无需重新执行

// 服务端序列化状态
export default component$(() => {
  const count = useSignal(0)

  // Qwik 会将状态序列化到 HTML 中
  return <div>Count: {count.value}</div>
})

// 客户端直接从 HTML 恢复状态，不需要执行组件代码
// 只有在交互时才按需加载和执行代码
```

### 懒加载策略

Qwik 实现了最激进的代码分割：

```tsx
// 每个事件处理器都是独立的懒加载单元
export default component$(() => {
  const count = useSignal(0)

  // 点击前这个函数不会被下载
  const handleClick = $(() => {
    count.value++
  })

  return (
    <button onClick$={handleClick}>
      Count: {count.value}
    </button>
  )
})
```

### 预加载优化

```tsx
// routes/(dashboard)/layout.tsx
import { component$ } from '@builder.io/qwik'
import { routeLoader$, Link } from '@builder.io/qwik-city'

// 预加载数据
export const usePreloadData = routeLoader$(async () => {
  return {
    navigation: await fetchNavigation(),
  }
})

export default component$(() => {
  const data = usePreloadData()

  return (
    <nav>
      {data.value.navigation.map((item) => (
        // Link 会自动预加载目标页面
        <Link href={item.path} prefetch>
          {item.title}
        </Link>
      ))}
    </nav>
  )
})
```

## 性能优化

### 图片优化

```tsx
import { component$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'

export default component$(() => {
  return (
    <Image
      src="https://example.com/image.jpg"
      layout="constrained"
      width={800}
      height={600}
      alt="优化的图片"
    />
  )
})
```

### 懒加载组件

```tsx
// 组件级别的懒加载
import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <div>
      {/* 使用 resource$ 实现组件懒加载 */}
      <Resource
        value={heavyComponentResource}
        onPending={() => <div>加载中...</div>}
        onResolved={(HeavyComponent) => <HeavyComponent />}
      />
    </div>
  )
})
```

### 预加载关键资源

```tsx
// routes/layout.tsx
import { component$, useVisibleTask$ } from '@builder.io/qwik'

export default component$(() => {
  useVisibleTask$(() => {
    // 预加载关键字体
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.href = '/fonts/main.woff2'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  return <Slot />
})
```

## 常见问题

### Q：如何处理需要客户端状态的场景？

A：使用 `useSignal` 和 `useStore` 创建响应式状态：

```tsx
import { component$, useSignal, useStore } from '@builder.io/qwik'

export default component$(() => {
  // 简单值使用 useSignal
  const count = useSignal(0)

  // 复杂对象使用 useStore
  const state = useStore({
    user: null,
    loading: false,
  })

  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>Increment</button>
    </div>
  )
})
```

### Q：如何与第三方库集成？

A：使用 `useVisibleTask$` 在客户端执行代码：

```tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'

export default component$(() => {
  const chartRef = useSignal<Element>()

  useVisibleTask$(({ cleanup }) => {
    // 在客户端初始化第三方库
    import('chart.js').then(({ Chart }) => {
      const chart = new Chart(chartRef.value, {
        // 配置...
      })

      cleanup(() => chart.destroy())
    })
  })

  return <canvas ref={chartRef} />
})
```

### Q：如何优化首屏加载时间？

A：Qwik 自动优化，但你可以进一步：

1. **使用 SSR**：默认启用
2. **预加载关键路由**：
   ```tsx
   <Link href="/dashboard" prefetch>Dashboard</Link>
   ```
3. **延迟非关键资源**：
   ```tsx
   useVisibleTask$(({ track }) => {
     // 只在组件可见时加载
     track(() => isVisible.value)
     if (isVisible.value) {
       loadAnalytics()
     }
   })
   ```

### Q：如何处理表单提交？

A：使用 `routeAction$` 实现服务端处理：

```tsx
import { component$ } from '@builder.io/qwik'
import { routeAction$, Form, zod$, z } from '@builder.io/qwik-city'

export const useAddUser = routeAction$(
  async (data) => {
    // 服务端处理
    const user = await createUser(data)
    return { success: true, user }
  },
  zod$({
    name: z.string().min(2),
    email: z.string().email(),
  })
)

export default component$(() => {
  const action = useAddUser()

  return (
    <Form action={action}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">
        {action.isRunning ? '提交中...' : '提交'}
      </button>
    </Form>
  )
})
```

## 与其他版本对比

| 特性 | Qwik 版本 | Next.js | Vue |
|------|-----------|---------|-----|
| SSR/SSG | ✅ 内置 | ✅ | ✅ (Nuxt) |
| 状态管理 | Context + Signals | Zustand | Pinia |
| 数据获取 | routeLoader$ | TanStack Query | TanStack Query |
| 表单验证 | Modular Forms + Zod | React Hook Form + Zod | VeeValidate + Zod |
| 路由 | 文件路由 | App Router | Vue Router |
| 构建工具 | Vite | Next.js | Vite |
| 水合 | 可恢复（零水合） | 传统水合 | 传统水合 |
| 首屏 JS | ~1KB | ~85KB | ~33KB |
| 服务端 | 内置全栈 | API Routes | 独立后端 |
| 组件库 | Qwik UI | shadcn/ui | shadcn-vue |

## 相关链接

- [在线预览](https://halolight-qwik.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-qwik)
- [Qwik 官方文档](https://qwik.builder.io)
- [Qwik City 文档](https://qwik.builder.io/docs/qwikcity)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
