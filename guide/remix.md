# Remix 版本

HaloLight Remix 版本基于 React Router 7 构建 (原 Remix 团队已合并至 React Router)，采用 TypeScript + Web 标准优先的全栈开发体验。

**在线预览**：[https://halolight-remix.h7ml.cn/](https://halolight-remix.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-remix](https://github.com/halolight/halolight-remix)

## 特性

- 🌐 **Web 标准优先** - 基于 Fetch API、FormData、Response 等原生 API
- 🔄 **Loader/Action** - 优雅的服务端数据模式，渐进增强
- 📁 **文件路由** - 直观的嵌套路由和布局系统
- ⚡ **渐进增强** - 无 JS 也能工作的表单提交
- 🎯 **类型安全** - 自动生成的路由类型 (`+types/`)
- 🎨 **主题系统** - 11 种皮肤预设 + OKLch 色彩空间
- 📑 **多标签页** - 标签栏 + 右键菜单管理
- 🚀 **Vite 驱动** - 极速 HMR 热更新
- 🌍 **边缘部署** - Cloudflare Pages 一键部署
- 📊 **数据可视化** - Recharts 图表集成
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 🛡️ **权限控制** - RBAC 细粒度权限管理

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

- **Web 标准优先** - 基于 Fetch API、FormData、Response 等原生 API
- **Loader/Action 模式** - 优雅的服务端数据加载和表单处理
- **文件系统路由** - 直观的嵌套路由和布局系统
- **渐进增强** - 无 JavaScript 也能工作的表单提交
- **类型安全** - 自动生成的路由类型定义 (`+types/`)
- **主题系统** - 11 种皮肤预设 + OKLch 色彩空间 + 明暗模式
- **多标签页管理** - 标签栏 + 右键菜单 + 状态持久化

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
│   │   ├── users.$id.tsx         # 用户详情 (动态路由)
│   │   ├── settings.tsx          # 系统设置
│   │   ├── profile.tsx           # 个人中心
│   │   ├── security.tsx          # 安全设置
│   │   ├── analytics.tsx         # 数据分析
│   │   ├── notifications.tsx     # 通知中心
│   │   ├── documents.tsx         # 文档管理
│   │   ├── calendar.tsx          # 日历
│   │   ├── api.users.ts          # API 端点
│   │   ├── api.auth.login.ts     # 登录 API
│   │   ├── api.auth.logout.ts    # 登出 API
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
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── layout/               # 布局组件
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── tab-bar.tsx
│   │   │   └── quick-settings.tsx
│   │   ├── auth/                 # 认证组件
│   │   │   └── auth-shell.tsx
│   │   ├── dashboard/            # 仪表盘组件
│   │   │   ├── stats-card.tsx
│   │   │   └── chart-widget.tsx
│   │   ├── admin-layout.tsx      # 后台布局
│   │   └── theme-provider.tsx    # 主题提供者
│   ├── hooks/                    # React Hooks
│   │   ├── use-chart-palette.ts
│   │   ├── use-toast.ts
│   │   └── use-media-query.ts
│   ├── lib/                      # 工具库
│   │   ├── utils.ts              # cn() 类名工具
│   │   ├── meta.ts               # TDK 元信息
│   │   ├── session.server.ts     # 会话管理
│   │   ├── auth.server.ts        # 认证逻辑
│   │   └── project-info.ts       # 项目信息
│   ├── stores/                   # Zustand 状态
│   │   ├── tabs-store.ts         # 标签页状态
│   │   └── ui-settings-store.ts  # UI 设置状态
│   ├── types/                    # TypeScript 类型
│   │   ├── user.ts
│   │   └── api.ts
│   ├── root.tsx                  # 根组件
│   ├── routes.ts                 # 路由配置
│   └── app.css                   # 全局样式
├── tests/                        # 测试文件
│   ├── setup.ts
│   ├── lib/
│   ├── stores/
│   └── components/
├── public/                       # 静态资源
├── .github/workflows/ci.yml      # CI 配置
├── wrangler.json                 # Cloudflare 配置
├── vitest.config.ts              # Vitest 配置
├── eslint.config.js              # ESLint 配置
├── vite.config.ts                # Vite 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 安装

```bash
git clone https://github.com/halolight/halolight-remix.git
cd halolight-remix
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```bash
# .env 示例
SESSION_SECRET=your-super-secret-session-key
API_BASE_URL=https://api.halolight.h7ml.cn
MOCK_ENABLED=true
DEMO_EMAIL=admin@halolight.h7ml.cn
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=true
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
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

## 演示账号

| 角色 | 邮箱 | 密码 |
|------|------|------|
| 管理员 | admin@halolight.h7ml.cn | 123456 |
| 普通用户 | user@halolight.h7ml.cn | 123456 |

## 核心功能

### Loader/Action 数据模式

#### 路由文件约定

React Router 7 使用文件系统路由，文件名决定 URL 路径：

```
app/routes/
├── _index.tsx            → /              (索引路由)
├── about.tsx             → /about         (静态路由)
├── users.tsx             → /users         (静态路由)
├── users.$id.tsx         → /users/:id     (动态路由)
├── users.$id_.edit.tsx   → /users/:id/edit (嵌套路由)
├── _layout.tsx           → 布局路由 (无 URL 段)
├── _layout.dashboard.tsx → /dashboard      (带布局)
├── $.tsx                 → /*             (通配符路由)
├── api.users.ts          → /api/users     (资源路由)
└── [...slug].tsx         → /* 可选捕获
```

#### 特殊文件约定

| 文件名 | 说明 |
|--------|------|
| `_index.tsx` | 索引路由，匹配父路由精确路径 |
| `_layout.tsx` | 无路径布局，子路由共享布局 |
| `$param.tsx` | 动态路由参数 |
| `$.tsx` | 通配符路由，捕获所有子路径 |
| `api.*.ts` | 资源路由（仅 loader/action，无 UI） |
| `+types/` | 自动生成的类型定义 |

#### Loader (数据加载)

Loader 在服务端执行，用于页面数据获取：

```tsx
// app/routes/users.tsx
import type { Route } from "./+types/users";

// 服务端数据加载
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;
  const search = url.searchParams.get("search") || "";

  // 检查认证
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    throw redirect("/login");
  }

  // 获取数据
  const response = await fetch(
    `${process.env.API_BASE_URL}/users?page=${page}&limit=${limit}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${session.get("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Response("获取用户列表失败", { status: response.status });
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

// 页面组件接收 loaderData
export default function UsersPage({ loaderData }: Route.ComponentProps) {
  const { users, pagination } = loaderData;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">用户管理</h1>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left">姓名</th>
              <th className="p-4 text-left">邮箱</th>
              <th className="p-4 text-left">角色</th>
              <th className="p-4 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <Link to={`/users/${user.id}`}>查看</Link>
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

#### Action (表单处理)

Action 处理表单提交，支持渐进增强：

```tsx
// app/routes/login.tsx
import type { Route } from "./+types/login";
import { Form, useActionData, useNavigation, redirect } from "react-router";
import { commitSession, getSession } from "~/lib/session.server";

// 服务端表单处理
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo") as string || "/";

  // 验证
  const errors: Record<string, string> = {};

  if (!email) {
    errors.email = "请输入邮箱";
  } else if (!email.includes("@")) {
    errors.email = "请输入有效的邮箱地址";
  }

  if (!password) {
    errors.password = "请输入密码";
  } else if (password.length < 6) {
    errors.password = "密码至少 6 位";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { email } };
  }

  // 调用登录 API
  const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const data = await response.json();
    return { errors: { form: data.message || "邮箱或密码错误" } };
  }

  const { user, token } = await response.json();

  // 创建会话
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user.id);
  session.set("token", token);
  session.set("user", user);

  // 重定向并设置 Cookie
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// Meta 信息
export function meta(): Route.MetaDescriptors {
  return [
    { title: "登录 - Admin Pro" },
    { name: "description", content: "登录到 Admin Pro 管理系统" },
  ];
}

// 页面组件
export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">欢迎回来</h1>
          <p className="text-muted-foreground">登录到您的账户</p>
        </div>

        {/* 表单错误提示 */}
        {actionData?.errors?.form && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {actionData.errors.form}
          </div>
        )}

        {/* 渐进增强表单 - 无 JS 也能工作 */}
        <Form method="post" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱
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
              密码
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
            {isSubmitting ? "登录中..." : "登录"}
          </button>
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          还没有账户？{" "}
          <Link to="/register" className="text-primary hover:underline">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
```

#### 资源路由 (API 端点)

资源路由没有 UI 组件，仅导出 loader/action：

```ts
// app/routes/api.users.ts
import type { Route } from "./+types/api.users";
import { getSession } from "~/lib/session.server";

// GET /api/users
export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    return Response.json({ error: "未授权" }, { status: 401 });
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
    return Response.json({ error: "未授权" }, { status: 401 });
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
    throw new Response("用户不存在", { status: 404 });
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

### 会话管理 (Session)

使用 Cookie 进行会话管理：

```ts
// app/lib/session.server.ts
import { createCookieSessionStorage, redirect } from "react-router";

// 创建会话存储
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

// 获取当前用户
export async function getUser(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  return user || null;
}

// 要求登录
export async function requireUser(request: Request) {
  const user = await getUser(request);
  if (!user) {
    const url = new URL(request.url);
    throw redirect(`/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  }
  return user;
}

// 登出
export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
```

### 错误处理 (ErrorBoundary)

全局和路由级错误处理：

```tsx
// app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  // 路由错误（如 404、401）
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="zh-CN">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>错误 {error.status}</title>
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
                返回首页
              </a>
            </div>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  // 未知错误
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>发生错误</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">发生错误</h1>
            <p className="mt-2 text-muted-foreground">
              {error instanceof Error ? error.message : "未知错误"}
            </p>
            <a href="/" className="mt-8 inline-block text-primary hover:underline">
              返回首页
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
// app/routes/users.$id.tsx - 路由级错误边界
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">用户不存在</h2>
          <p className="text-muted-foreground">请检查用户 ID 是否正确</p>
          <Link to="/users" className="mt-4 inline-block text-primary">
            返回用户列表
          </Link>
        </div>
      </div>
    );
  }

  throw error; // 向上抛出其他错误
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
interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
}

export const pageMetas: Record<string, PageMeta> = {
  "/": {
    title: "仪表盘",
    description: "Admin Pro 管理系统仪表盘，数据概览与统计分析",
    keywords: ["仪表盘", "数据分析", "管理系统"],
  },
  "/users": {
    title: "用户管理",
    description: "管理系统用户账户，包括创建、编辑和权限配置",
    keywords: ["用户管理", "账户管理", "权限配置"],
  },
  "/analytics": {
    title: "数据分析",
    description: "业务数据统计分析，可视化图表展示",
    keywords: ["数据分析", "图表", "统计"],
  },
  "/settings": {
    title: "系统设置",
    description: "系统配置与个性化设置",
    keywords: ["系统设置", "配置", "个性化"],
  },
};

export function generateMeta(path: string, overrides?: Partial<PageMeta>): MetaDescriptor[] {
  const meta = { ...pageMetas[path], ...overrides } || {
    title: "页面",
    description: "Admin Pro 管理系统",
  };

  const brandName = process.env.BRAND_NAME || "Halolight";
  const fullTitle = `${meta.title} - ${brandName}`;

  return [
    { title: fullTitle },
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.keywords?.join(", ") || "" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: meta.description },
    { property: "og:type", content: "website" },
  ];
}
```

### 状态管理 (Zustand)

### Tabs Store (标签页)

```tsx
// app/stores/tabs-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Tab {
  id: string;
  title: string;
  path: string;
  closable?: boolean;
}

const homeTab: Tab = {
  id: "home",
  title: "首页",
  path: "/",
  closable: false,
};

interface TabsState {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Omit<Tab, "id">) => string;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  closeOthers: (id: string) => void;
  closeRight: (id: string) => void;
  clearTabs: () => void;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (set, get) => ({
      tabs: [homeTab],
      activeTabId: "home",

      addTab: (tab) => {
        const { tabs } = get();
        // 检查是否已存在
        const existing = tabs.find((t) => t.path === tab.path);
        if (existing) {
          set({ activeTabId: existing.id });
          return existing.id;
        }

        const id = crypto.randomUUID();
        const newTab = { ...tab, id, closable: true };
        set({
          tabs: [...tabs, newTab],
          activeTabId: id,
        });
        return id;
      },

      removeTab: (id) => {
        const { tabs, activeTabId } = get();
        const tab = tabs.find((t) => t.id === id);
        if (!tab?.closable) return;

        const newTabs = tabs.filter((t) => t.id !== id);
        let newActiveId = activeTabId;

        // 如果关闭的是当前标签，切换到相邻标签
        if (activeTabId === id) {
          const index = tabs.findIndex((t) => t.id === id);
          newActiveId = newTabs[Math.min(index, newTabs.length - 1)]?.id || "home";
        }

        set({ tabs: newTabs, activeTabId: newActiveId });
      },

      setActiveTab: (id) => set({ activeTabId: id }),

      closeOthers: (id) => {
        const { tabs } = get();
        const newTabs = tabs.filter((t) => t.id === id || !t.closable);
        set({ tabs: newTabs, activeTabId: id });
      },

      closeRight: (id) => {
        const { tabs } = get();
        const index = tabs.findIndex((t) => t.id === id);
        const newTabs = tabs.filter((t, i) => i <= index || !t.closable);
        set({ tabs: newTabs });
      },

      clearTabs: () => set({ tabs: [homeTab], activeTabId: "home" }),
    }),
    { name: "tabs-storage" }
  )
);
```

#### UI Settings Store (皮肤/布局)

```tsx
// app/stores/ui-settings-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SkinPreset =
  | "default"
  | "blue"
  | "emerald"
  | "amber"
  | "violet"
  | "rose"
  | "teal"
  | "slate"
  | "ocean"
  | "sunset"
  | "aurora";

export type ThemeMode = "light" | "dark" | "system";

interface UiSettingsState {
  skin: SkinPreset;
  theme: ThemeMode;
  showFooter: boolean;
  showTabBar: boolean;
  sidebarCollapsed: boolean;
  setSkin: (skin: SkinPreset) => void;
  setTheme: (theme: ThemeMode) => void;
  setShowFooter: (visible: boolean) => void;
  setShowTabBar: (visible: boolean) => void;
  toggleSidebar: () => void;
}

export const useUiSettingsStore = create<UiSettingsState>()(
  persist(
    (set) => ({
      skin: "default",
      theme: "system",
      showFooter: true,
      showTabBar: true,
      sidebarCollapsed: false,

      setSkin: (skin) => {
        document.documentElement.setAttribute("data-skin", skin);
        set({ skin });
      },

      setTheme: (theme) => {
        if (theme === "system") {
          const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.classList.toggle("dark", isDark);
        } else {
          document.documentElement.classList.toggle("dark", theme === "dark");
        }
        set({ theme });
      },

      setShowFooter: (visible) => set({ showFooter: visible }),
      setShowTabBar: (visible) => set({ showTabBar: visible }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    { name: "ui-settings-storage" }
  )
);
```

## 主题系统

### 皮肤预设

支持 11 种预设皮肤，通过 Quick Settings 面板切换：

| 皮肤 | 主色调 | CSS 变量 |
|------|--------|----------|
| Default | 紫色 | `--primary: 51.1% 0.262 276.97` |
| Blue | 蓝色 | `--primary: 54.8% 0.243 264.05` |
| Emerald | 翠绿色 | `--primary: 64.6% 0.178 142.49` |
| Amber | 琥珀色 | `--primary: 76.9% 0.188 84.94` |
| Violet | 紫罗兰 | `--primary: 54.1% 0.243 293.54` |
| Rose | 玫瑰色 | `--primary: 64.5% 0.246 16.44` |
| Teal | 青色 | `--primary: 60.0% 0.118 184.71` |
| Slate | 石板灰 | `--primary: 45.9% 0.022 264.53` |
| Ocean | 海洋蓝 | `--primary: 54.3% 0.195 240.03` |
| Sunset | 日落橙 | `--primary: 70.5% 0.213 47.60` |
| Aurora | 极光色 | `--primary: 62.8% 0.265 303.9` |

### CSS 变量 (OKLch)

```css
/* app/app.css */
@import "tailwindcss";

:root {
  /* 背景色 */
  --background: 100% 0 0;
  --foreground: 14.9% 0.017 285.75;

  /* 卡片 */
  --card: 100% 0 0;
  --card-foreground: 14.9% 0.017 285.75;

  /* 弹出层 */
  --popover: 100% 0 0;
  --popover-foreground: 14.9% 0.017 285.75;

  /* 主色 */
  --primary: 51.1% 0.262 276.97;
  --primary-foreground: 100% 0 0;

  /* 次要色 */
  --secondary: 96.7% 0.001 286.38;
  --secondary-foreground: 21% 0.006 285.75;

  /* 静音色 */
  --muted: 96.7% 0.001 286.38;
  --muted-foreground: 55.2% 0.014 285.94;

  /* 强调色 */
  --accent: 96.7% 0.001 286.38;
  --accent-foreground: 21% 0.006 285.75;

  /* 危险色 */
  --destructive: 57.7% 0.245 27.32;
  --destructive-foreground: 100% 0 0;

  /* 边框/输入框 */
  --border: 91.2% 0.004 286.32;
  --input: 91.2% 0.004 286.32;
  --ring: 51.1% 0.262 276.97;

  /* 圆角 */
  --radius: 0.5rem;
}

/* 皮肤预设 */
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

[data-skin="sunset"] {
  --primary: 70.5% 0.213 47.60;
  --ring: 70.5% 0.213 47.60;
}

/* 深色模式 */
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

/* Tailwind 主题映射 */
@theme {
  --color-background: oklch(var(--background));
  --color-foreground: oklch(var(--foreground));
  --color-card: oklch(var(--card));
  --color-card-foreground: oklch(var(--card-foreground));
  --color-popover: oklch(var(--popover));
  --color-popover-foreground: oklch(var(--popover-foreground));
  --color-primary: oklch(var(--primary));
  --color-primary-foreground: oklch(var(--primary-foreground));
  --color-secondary: oklch(var(--secondary));
  --color-secondary-foreground: oklch(var(--secondary-foreground));
  --color-muted: oklch(var(--muted));
  --color-muted-foreground: oklch(var(--muted-foreground));
  --color-accent: oklch(var(--accent));
  --color-accent-foreground: oklch(var(--accent-foreground));
  --color-destructive: oklch(var(--destructive));
  --color-destructive-foreground: oklch(var(--destructive-foreground));
  --color-border: oklch(var(--border));
  --color-input: oklch(var(--input));
  --color-ring: oklch(var(--ring));
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

## 页面路由

| 路径 | 页面 | 权限 |
|------|------|------|
| `/` | 仪表盘 | `dashboard:view` |
| `/login` | 登录 | 公开 |
| `/register` | 注册 | 公开 |
| `/forgot-password` | 忘记密码 | 公开 |
| `/reset-password` | 重置密码 | 公开 |
| `/users` | 用户管理 | `users:view` |
| `/users/:id` | 用户详情 | `users:view` |
| `/settings` | 系统设置 | `settings:view` |
| `/profile` | 个人中心 | `settings:view` |
| `/security` | 安全设置 | `settings:view` |
| `/analytics` | 数据分析 | `analytics:view` |
| `/notifications` | 通知中心 | `notifications:view` |
| `/documents` | 文档管理 | `documents:view` |
| `/calendar` | 日历 | `calendar:view` |

## 环境变量

### 配置示例

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

### 变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `SESSION_SECRET` | 会话密钥（必需） | (必需) |
| `API_BASE_URL` | API 基础 URL | `/api` |
| `MOCK_ENABLED` | 启用 Mock 数据 | `false` |
| `DEMO_EMAIL` | 演示账号邮箱 | - |
| `DEMO_PASSWORD` | 演示账号密码 | - |
| `SHOW_DEMO_HINT` | 显示演示提示 | `false` |
| `APP_TITLE` | 应用标题 | `Admin Pro` |
| `BRAND_NAME` | 品牌名称 | `Halolight` |

### 使用方式

```ts
// app/routes/users.tsx
export async function loader({ request }: Route.LoaderArgs) {
  const apiUrl = process.env.API_BASE_URL;
  const response = await fetch(`${apiUrl}/users`);
  return response.json();
}
```

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器
pnpm dev --host       # 允许局域网访问

# 构建
pnpm build            # 生产构建
pnpm start            # 启动生产服务器

# 代码质量
pnpm typecheck        # TypeScript 类型检查
pnpm lint             # ESLint 检查
pnpm lint:fix         # ESLint 自动修复
pnpm format           # Prettier 格式化

# 测试
pnpm test             # 监视模式
pnpm test:run         # 单次运行
pnpm test:coverage    # 覆盖率报告
pnpm test:ui          # Vitest UI 界面

# 部署
pnpm preview          # Cloudflare 本地预览
pnpm deploy           # 部署到 Cloudflare Pages
```

## 测试

### 运行命令

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

  it("初始状态应该只有首页标签", () => {
    const { tabs, activeTabId } = useTabsStore.getState();
    expect(tabs).toHaveLength(1);
    expect(tabs[0].id).toBe("home");
    expect(activeTabId).toBe("home");
  });

  it("应该添加新标签", () => {
    const { addTab } = useTabsStore.getState();
    const id = addTab({ title: "用户管理", path: "/users" });

    const { tabs, activeTabId } = useTabsStore.getState();
    expect(tabs).toHaveLength(2);
    expect(tabs[1].title).toBe("用户管理");
    expect(activeTabId).toBe(id);
  });

  it("应该去重已存在的路由", () => {
    const { addTab } = useTabsStore.getState();
    const id1 = addTab({ title: "用户管理", path: "/users" });
    const id2 = addTab({ title: "用户管理", path: "/users" });

    expect(id1).toBe(id2);
    const { tabs } = useTabsStore.getState();
    expect(tabs).toHaveLength(2);
  });

  it("应该关闭标签并切换到相邻标签", () => {
    const { addTab, removeTab } = useTabsStore.getState();
    addTab({ title: "用户管理", path: "/users" });
    const id = addTab({ title: "设置", path: "/settings" });

    removeTab(id);

    const { tabs, activeTabId } = useTabsStore.getState();
    expect(tabs).toHaveLength(2);
    expect(activeTabId).not.toBe(id);
  });

  it("首页标签不可关闭", () => {
    const { removeTab } = useTabsStore.getState();
    removeTab("home");

    const { tabs } = useTabsStore.getState();
    expect(tabs).toHaveLength(1);
    expect(tabs[0].id).toBe("home");
  });
});
```

```tsx
// tests/lib/meta.test.ts
import { describe, it, expect } from "vitest";
import { generateMeta, pageMetas } from "~/lib/meta";

describe("generateMeta", () => {
  it("应该生成正确的 meta 标签", () => {
    const meta = generateMeta("/users");

    expect(meta).toContainEqual(
      expect.objectContaining({ name: "description" })
    );
    expect(meta).toContainEqual(
      expect.objectContaining({ property: "og:title" })
    );
  });

  it("应该支持覆盖默认值", () => {
    const meta = generateMeta("/users", { title: "自定义标题" });

    const titleMeta = meta.find((m) => "title" in m);
    expect(titleMeta?.title).toContain("自定义标题");
  });
});
```

## 配置

### React Router 配置

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
});
```

### Wrangler 配置

```json
// wrangler.json
{
  "name": "halolight-remix",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./build/client"
}
```

### ESLint 配置

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

## 部署

### Cloudflare Pages (推荐)

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录
wrangler login

# 部署
pnpm deploy
```

### Cloudflare 配置

```json
// wrangler.json
{
  "name": "halolight-remix",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./build/client"
}
```

### GitHub Actions 部署

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

### Node.js 服务器

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
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

### 其他平台

- [Cloudflare Pages](/guide/cloudflare) - 边缘部署 (推荐)
- [Netlify](/guide/netlify) - 静态站点托管
- [AWS Amplify](/guide/aws) - AWS 托管服务
- [Azure Static Web Apps](/guide/azure) - Azure 静态应用

## CI/CD

项目配置了完整的 GitHub Actions CI 流程：

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

### useFetcher (无导航数据获取)

```tsx
// app/routes/users.tsx
import { useFetcher } from "react-router";

export default function UsersPage() {
  const fetcher = useFetcher();

  const handleDelete = (userId: string) => {
    if (confirm("确定删除此用户？")) {
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
            {fetcher.state === "submitting" ? "删除中..." : "删除"}
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 乐观 UI 更新

```tsx
// app/routes/notifications.tsx
import { useFetcher } from "react-router";

function NotificationItem({ notification }) {
  const fetcher = useFetcher();

  // 乐观 UI：立即显示已读状态
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
          <button type="submit">标为已读</button>
        </fetcher.Form>
      )}
    </div>
  );
}
```

### defer 和 Suspense

```tsx
// app/routes/analytics.tsx
import type { Route } from "./+types/analytics";
import { Await, defer } from "react-router";
import { Suspense } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  // 快速数据立即返回
  const summary = await getSummary();

  // 慢速数据延迟加载
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
      {/* 立即显示 */}
      <SummaryCard data={summary} />

      {/* 延迟加载的图表 */}
      <Suspense fallback={<ChartSkeleton />}>
        <Await resolve={chartData}>
          {(data) => <Chart data={data} />}
        </Await>
      </Suspense>

      {/* 延迟加载的报告 */}
      <Suspense fallback={<ReportSkeleton />}>
        <Await resolve={report}>
          {(data) => <Report data={data} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

### 并行数据加载

```tsx
// app/routes/dashboard.tsx
export async function loader({ request }: Route.LoaderArgs) {
  // 并行请求多个数据源
  const [stats, recentUsers, notifications, activities] = await Promise.all([
    getStats(),
    getRecentUsers(),
    getNotifications(),
    getActivities(),
  ]);

  return { stats, recentUsers, notifications, activities };
}
```

### 中间件模式

```ts
// app/lib/middleware.ts
import { redirect } from "react-router";
import { getSession } from "./session.server";

type LoaderFunction = (args: LoaderArgs) => Promise<any>;

// 认证中间件
export function withAuth(loader: LoaderFunction): LoaderFunction {
  return async (args) => {
    const session = await getSession(args.request.headers.get("Cookie"));

    if (!session.has("userId")) {
      const url = new URL(args.request.url);
      throw redirect(`/login?redirectTo=${encodeURIComponent(url.pathname)}`);
    }

    // 注入用户信息
    const user = session.get("user");
    return loader({ ...args, user });
  };
}

// 角色检查中间件
export function withRole(role: string, loader: LoaderFunction): LoaderFunction {
  return withAuth(async (args) => {
    const { user } = args as any;

    if (user.role !== role) {
      throw new Response("权限不足", { status: 403 });
    }

    return loader(args);
  });
}

// 使用示例
// app/routes/admin.tsx
export const loader = withRole("admin", async ({ request }) => {
  // 只有 admin 角色才能访问
  return getAdminData();
});
```

## 性能优化

### 代码分割

```tsx
// 使用 React.lazy 动态导入
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

### 预加载

```tsx
// 链接预加载
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

### 缓存策略

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

## 常见问题

### Q：如何处理表单验证？

A：结合服务端和客户端验证：

```tsx
// app/routes/register.tsx
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("请输入有效的邮箱"),
  password: z.string().min(6, "密码至少 6 位"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "两次密码不一致",
  path: ["confirmPassword"],
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // 服务端验证
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // 创建用户...
}
```

### Q：如何实现文件上传？

A：使用 FormData 处理文件：

```tsx
// app/routes/upload.tsx
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { error: "请选择文件" };
  }

  // 上传到存储服务
  const buffer = await file.arrayBuffer();
  const url = await uploadToStorage(buffer, file.name, file.type);

  return { url };
}

export default function UploadPage() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post" encType="multipart/form-data">
      <input type="file" name="file" required />
      <button type="submit">上传</button>
      {actionData?.url && <p>上传成功: {actionData.url}</p>}
      {actionData?.error && <p className="text-destructive">{actionData.error}</p>}
    </Form>
  );
}
```

### Q：如何处理国际化？

A：使用 Cookie 或 URL 前缀：

```tsx
// app/lib/i18n.ts
export const locales = ["zh-CN", "en-US"] as const;
export type Locale = typeof locales[number];

export function getLocale(request: Request): Locale {
  const url = new URL(request.url);
  const cookie = request.headers.get("Cookie");

  // 1. 检查 URL 参数
  const urlLocale = url.searchParams.get("locale");
  if (urlLocale && locales.includes(urlLocale as Locale)) {
    return urlLocale as Locale;
  }

  // 2. 检查 Cookie
  const cookieLocale = getCookie(cookie, "locale");
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 3. 检查 Accept-Language
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage?.includes("zh")) {
    return "zh-CN";
  }

  return "en-US";
}
```

### Q：如何实现实时更新？

A：使用 SSE (Server-Sent Events)：

```ts
// app/routes/api.events.ts
export async function loader({ request }: Route.LoaderArgs) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // 定时发送事件
      const interval = setInterval(() => {
        sendEvent({ type: "ping", timestamp: Date.now() });
      }, 5000);

      // 清理
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
// 客户端使用
useEffect(() => {
  const eventSource = new EventSource("/api/events");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // 处理事件
  };

  return () => eventSource.close();
}, []);
```

## 性能优化

### 代码分割

```tsx
// 使用 React.lazy 动态导入
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

### 预加载

```tsx
// 链接预加载
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

### 缓存策略

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
| 构建工具 | Vite | Vite | Turbopack |

## 相关链接

- [在线预览](https://halolight-remix.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-remix)
- [React Router 官方文档](https://reactrouter.com)
- [Remix 迁移指南](https://remix.run/blog/react-router-v7)
- [Vite 文档](https://vitejs.dev)
- [Radix UI 文档](https://www.radix-ui.com)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
