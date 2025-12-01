# Remix 版本

HaloLight Remix 版本基于 React Router 7 构建 (原 Remix 团队已合并至 React Router)，采用 TypeScript + Web 标准优先的全栈开发体验。

**在线预览**：[https://halolight-remix.h7ml.cn/](https://halolight-remix.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-remix](https://github.com/halolight/halolight-remix)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React Router | 7.x | 全栈路由框架 (原 Remix) |
| React | 19.x | UI 框架 |
| TypeScript | 5.9 | 类型安全 |
| Vite | 7.x | 构建工具 |
| Tailwind CSS | 4.x | 原子化 CSS + OKLch |
| Radix UI | latest | 无障碍 UI 原语 |
| Zustand | 5.x | 轻量状态管理 |
| Recharts | 3.x | 图表可视化 |
| Vitest | 4.x | 单元测试 |
| Cloudflare Pages | - | 边缘部署 |

## 核心特性

- **Web 标准**：基于 Web Fetch API、FormData、Response
- **嵌套路由**：强大的嵌套布局和数据加载
- **渐进增强**：无 JS 也能工作的表单
- **Loader/Action**：优雅的服务端数据模式
- **类型安全**：自动生成的路由类型
- **主题系统**：11 种皮肤预设 + 深色模式
- **多标签页**：标签栏 + 右键菜单管理

## 目录结构

```
halolight-remix/
├── app/
│   ├── routes/                    # 文件路由
│   │   ├── _index.tsx            # 首页 (仪表盘)
│   │   ├── login.tsx             # 登录
│   │   ├── register.tsx          # 注册
│   │   ├── forgot-password.tsx   # 忘记密码
│   │   ├── reset-password.tsx    # 重置密码
│   │   ├── users.tsx             # 用户管理
│   │   ├── settings.tsx          # 系统设置
│   │   ├── profile.tsx           # 个人中心
│   │   ├── security.tsx          # 安全设置
│   │   ├── analytics.tsx         # 数据分析
│   │   ├── notifications.tsx     # 通知中心
│   │   ├── documents.tsx         # 文档管理
│   │   ├── calendar.tsx          # 日历
│   │   └── +types/               # 自动生成类型
│   ├── components/               # 组件库
│   │   ├── ui/                   # 基础 UI 组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── layout/               # 布局组件
│   │   │   ├── footer.tsx
│   │   │   ├── tab-bar.tsx
│   │   │   └── quick-settings.tsx
│   │   ├── auth/                 # 认证组件
│   │   │   └── auth-shell.tsx
│   │   ├── admin-layout.tsx      # 后台布局
│   │   └── theme-provider.tsx    # 主题提供者
│   ├── hooks/                    # React Hooks
│   │   └── use-chart-palette.ts
│   ├── lib/                      # 工具库
│   │   ├── utils.ts              # cn() 类名工具
│   │   ├── meta.ts               # TDK 元信息
│   │   └── project-info.ts       # 项目信息
│   ├── stores/                   # Zustand 状态
│   │   ├── tabs-store.ts         # 标签页状态
│   │   └── ui-settings-store.ts  # UI 设置状态
│   ├── root.tsx                  # 根组件
│   ├── routes.ts                 # 路由配置
│   └── app.css                   # 全局样式
├── tests/                        # 测试文件
│   ├── setup.ts
│   ├── lib/
│   ├── stores/
│   └── components/
├── .github/workflows/ci.yml      # CI 配置
├── wrangler.json                 # Cloudflare 配置
├── vitest.config.ts              # Vitest 配置
├── eslint.config.js              # ESLint 配置
└── package.json
```

## 快速开始

### 安装

```bash
git clone https://github.com/halolight/halolight-remix.git
cd halolight-remix
pnpm install
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产

```bash
pnpm build
pnpm start
```

### 可用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 生产构建
pnpm start        # 启动生产服务器
pnpm typecheck    # 类型检查
pnpm lint         # ESLint 检查
pnpm test         # 运行测试
pnpm test:run     # 单次运行测试
pnpm test:coverage # 测试覆盖率
pnpm preview      # Cloudflare 本地预览
pnpm deploy       # 部署到 Cloudflare
```

## 核心概念

### 路由文件约定

React Router 7 使用文件系统路由：

```
_index.tsx        → /          (索引路由)
about.tsx         → /about     (静态路由)
users.tsx         → /users     (静态路由)
users.$id.tsx     → /users/:id (动态路由)
_layout.tsx       → 布局路由
$.tsx             → 通配符路由
```

### Loader (数据加载)

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
      <h1>用户列表</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Action (表单处理)

```tsx
// app/routes/login.tsx
import type { Route } from "./+types/login";
import { Form, useActionData, useNavigation } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // 验证
  if (!email || !password) {
    return { error: "请填写完整信息" };
  }

  // 登录逻辑
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return { error: "邮箱或密码错误" };
  }

  // 重定向到首页
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

      <input type="email" name="email" placeholder="邮箱" required />
      <input type="password" name="password" placeholder="密码" required />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "登录中..." : "登录"}
      </button>
    </Form>
  );
}
```

### Meta (TDK 元信息)

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
    title: "用户管理",
    description: "管理系统用户账户，包括创建、编辑和权限配置",
    keywords: ["用户管理", "账户管理", "权限配置"],
  },
  // ...
};

export function generateMeta(path: string, overrides?: Partial<PageMeta>) {
  const meta = pageMetas[path] || { title: "页面", description: "" };
  // 返回完整的 meta 标签数组
}
```

## 状态管理

### Tabs Store (标签页)

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

### UI Settings Store (皮肤/布局)

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

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过 Quick Settings 面板切换：

| 皮肤 | 主色调 |
|------|--------|
| Default | 紫色 |
| Blue | 蓝色 |
| Emerald | 翠绿色 |
| Amber | 琥珀色 |
| Violet | 紫罗兰 |
| Rose | 玫瑰色 |
| Teal | 青色 |
| Slate | 石板灰 |
| Ocean | 海洋蓝 |
| Sunset | 日落橙 |
| Aurora | 极光色 |

### CSS 变量 (OKLch)

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

## 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 仪表盘 | 数据概览 + 图表 |
| `/login` | 登录 | 用户登录 |
| `/register` | 注册 | 用户注册 |
| `/forgot-password` | 忘记密码 | 发送重置邮件 |
| `/reset-password` | 重置密码 | 设置新密码 |
| `/users` | 用户管理 | 用户列表 CRUD |
| `/settings` | 系统设置 | 应用配置 |
| `/profile` | 个人中心 | 用户资料 |
| `/security` | 安全设置 | 密码修改等 |
| `/analytics` | 数据分析 | 图表展示 |
| `/notifications` | 通知中心 | 消息列表 |
| `/documents` | 文档管理 | 文件列表 |
| `/calendar` | 日历 | 日程管理 |

## 测试

### 运行测试

```bash
pnpm test:run      # 单次运行
pnpm test          # 监视模式
pnpm test:coverage # 覆盖率报告
```

### 测试示例

```tsx
// tests/stores/tabs-store.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useTabsStore } from "~/stores/tabs-store";

describe("useTabsStore", () => {
  beforeEach(() => {
    useTabsStore.getState().clearTabs();
  });

  it("应该添加新标签", () => {
    const { addTab } = useTabsStore.getState();
    addTab({ title: "用户管理", path: "/users" });

    const { tabs } = useTabsStore.getState();
    expect(tabs).toHaveLength(2);
  });
});
```

## 部署

### Cloudflare Pages

```bash
pnpm deploy
```

需要配置 GitHub Secrets：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Node.js 服务器

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

项目配置了完整的 GitHub Actions CI 流程：

- **Lint & Type Check** - ESLint + TypeScript 检查
- **Unit Tests** - Vitest 单元测试 + Codecov 覆盖率
- **Build** - 生产构建验证
- **Security Audit** - 依赖安全审计
- **Dependency Review** - PR 依赖变更审查

## 与其他版本对比

| 功能 | Remix 版本 | Vue 版本 | Next.js 版本 |
|------|-----------|----------|--------------|
| 状态管理 | Zustand | Pinia | Zustand |
| 数据获取 | Loader/Action | TanStack Query | TanStack Query |
| 表单处理 | 渐进增强 Form | VeeValidate | React Hook Form |
| 服务端 | 内置 SSR | Nuxt | App Router |
| 组件库 | Radix UI | shadcn-vue | shadcn/ui |
| 路由 | 文件路由 | Vue Router | App Router |
| 主题 | OKLch CSS 变量 | OKLch CSS 变量 | OKLch CSS 变量 |
| 测试 | Vitest | Vitest | Vitest |
