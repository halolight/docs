# Solid.js 版本

HaloLight Solid.js 版本基于 SolidStart 1.0 构建，采用 Solid.js 细粒度响应式 + TypeScript，实现高性能管理后台。无虚拟 DOM、编译时优化、极小 Bundle 体积。

**在线预览**：[https://halolight-solidjs.h7ml.cn/](https://halolight-solidjs.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-solidjs](https://github.com/halolight/halolight-solidjs)

## 特性

- ⚡ **细粒度响应式** - 无虚拟 DOM，精确追踪依赖更新，毫秒级响应
- 🔧 **编译时优化** - JSX 编译为高效 DOM 操作，运行时零开销
- 📦 **极小 Bundle** - 核心 ~7KB gzip，比 React 小 10 倍+
- 🎯 **Signals 原语** - 简洁优雅的响应式状态管理
- 🌐 **SolidStart 全栈** - 内置 SSR/SSG、文件路由、RPC
- 🔄 **服务端函数** - `"use server"` 无缝调用服务端逻辑
- 🎨 **主题系统** - 11 种皮肤，明暗模式，View Transitions
- 🔐 **认证系统** - 完整登录/注册/找回密码流程
- 📊 **仪表盘** - 数据可视化与业务管理
- 🛡️ **权限控制** - RBAC 细粒度权限管理
- 📑 **多标签页** - 标签栏管理
- ⌘ **命令面板** - 快捷键导航

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| SolidStart | 1.x | Solid 全栈框架 |
| Solid.js | 1.9+ | 细粒度响应式框架 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS + OKLch |
| Kobalte | 0.13+ | 无障碍 UI 原语 |
| solid-primitives | latest | 响应式工具库 |
| Zod | 3.x | 数据验证 |
| @solid-primitives/storage | latest | 持久化存储 |
| solid-charts | latest | 图表可视化 |
| Vitest | 4.x | 单元测试 |
| Mock.js | 1.x | 数据模拟 |

## 核心特性

- **细粒度响应式** - 无虚拟 DOM，精确追踪依赖更新，毫秒级响应
- **编译时优化** - JSX 编译为高效 DOM 操作，运行时零开销
- **Signals 原语** - 简洁优雅的响应式状态管理
- **服务端渲染** - SolidStart 内置 SSR 支持
- **文件路由** - 基于文件系统的路由
- **RPC 调用** - 无缝服务端函数调用
- **可配置仪表盘** - 9 种小部件，拖拽布局，响应式适配
- **多标签导航** - 浏览器式标签，右键菜单，状态缓存
- **权限系统** - RBAC 权限控制，路由守卫，权限组件
- **主题系统** - 11 种皮肤，明暗模式，View Transitions
- **命令面板** - 键盘快捷键 (⌘K)，全局搜索

## 目录结构

```
halolight-solidjs/
├── src/
│   ├── routes/                    # 文件路由
│   │   ├── index.tsx             # 首页 (仪表盘)
│   │   ├── (auth)/               # 认证路由组 (无布局路径)
│   │   │   ├── login.tsx         # 登录
│   │   │   ├── register.tsx      # 注册
│   │   │   ├── forgot-password.tsx # 忘记密码
│   │   │   └── reset-password.tsx  # 重置密码
│   │   ├── (dashboard)/          # 仪表盘路由组 (带 AdminLayout)
│   │   │   ├── dashboard.tsx     # 仪表盘首页
│   │   │   ├── analytics.tsx     # 数据分析
│   │   │   ├── users/            # 用户管理
│   │   │   │   ├── index.tsx     # 用户列表
│   │   │   │   ├── create.tsx    # 创建用户
│   │   │   │   └── [id].tsx      # 用户详情 (动态路由)
│   │   │   ├── roles.tsx         # 角色管理
│   │   │   ├── permissions.tsx   # 权限管理
│   │   │   ├── messages.tsx      # 消息中心
│   │   │   ├── notifications.tsx # 通知列表
│   │   │   ├── documents.tsx     # 文档管理
│   │   │   ├── calendar.tsx      # 日历
│   │   │   ├── settings.tsx      # 系统设置
│   │   │   └── profile.tsx       # 个人中心
│   │   ├── privacy.tsx           # 隐私政策
│   │   ├── terms.tsx             # 服务条款
│   │   └── api/                  # API 路由
│   │       ├── auth/
│   │       │   ├── login.ts      # POST /api/auth/login
│   │       │   ├── register.ts   # POST /api/auth/register
│   │       │   └── logout.ts     # POST /api/auth/logout
│   │       └── users/
│   │           ├── index.ts      # GET/POST /api/users
│   │           └── [id].ts       # GET/PUT/DELETE /api/users/:id
│   ├── components/               # 组件库
│   │   ├── ui/                   # Kobalte 封装组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ...
│   │   ├── layout/               # 布局组件
│   │   │   ├── AdminLayout.tsx   # 后台主布局
│   │   │   ├── AuthLayout.tsx    # 认证页布局
│   │   │   ├── Sidebar.tsx       # 侧边栏
│   │   │   ├── Header.tsx        # 顶部导航
│   │   │   ├── Footer.tsx        # 页脚
│   │   │   ├── TabBar.tsx        # 标签栏
│   │   │   └── QuickSettings.tsx # 快捷设置面板
│   │   ├── dashboard/            # 仪表盘组件
│   │   │   ├── DashboardGrid.tsx # 可拖拽网格
│   │   │   ├── WidgetWrapper.tsx # 部件包装器
│   │   │   ├── StatsWidget.tsx   # 统计卡片
│   │   │   └── ChartWidget.tsx   # 图表部件
│   │   ├── auth/                 # 认证组件
│   │   │   └── AuthShell.tsx     # 认证外壳
│   │   └── shared/               # 共享组件
│   │       ├── PermissionGuard.tsx # 权限守卫
│   │       └── ErrorBoundary.tsx   # 错误边界
│   ├── stores/                   # 状态管理 (Signals + Store)
│   │   ├── auth.ts               # 认证状态
│   │   ├── ui-settings.ts        # UI 设置状态
│   │   ├── tabs.ts               # 标签页状态
│   │   └── dashboard.ts          # 仪表盘布局状态
│   ├── lib/                      # 工具库
│   │   ├── api.ts                # API 客户端
│   │   ├── permission.ts         # 权限工具
│   │   ├── meta.ts               # TDK 元信息
│   │   └── cn.ts                 # 类名工具
│   ├── server/                   # 服务端代码
│   │   ├── auth.ts               # 认证逻辑
│   │   ├── session.ts            # 会话管理
│   │   └── middleware.ts         # 中间件
│   ├── hooks/                    # 自定义 Hooks
│   │   ├── createUsers.ts        # 用户数据
│   │   └── createToast.ts        # Toast 通知
│   └── types/                    # TypeScript 类型
│       ├── user.ts
│       └── api.ts
├── tests/                        # 测试文件
│   ├── setup.ts
│   ├── stores/
│   └── components/
├── public/                       # 静态资源
├── .github/workflows/ci.yml      # CI 配置
├── app.config.ts                 # SolidStart 配置
├── tailwind.config.ts            # Tailwind 配置
├── vitest.config.ts              # Vitest 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 9.x

### 安装

```bash
git clone https://github.com/halolight/halolight-solidjs.git
cd halolight-solidjs
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```bash
# .env 示例
VITE_API_URL=/api
VITE_USE_MOCK=true
VITE_DEMO_EMAIL=admin@halolight.h7ml.cn
VITE_DEMO_PASSWORD=123456
VITE_SHOW_DEMO_HINT=true
VITE_APP_TITLE=Admin Pro
VITE_BRAND_NAME=Halolight
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:3000

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

### Signals - 细粒度响应式

Solid.js 的核心是 Signals，它提供了最细粒度的响应式更新：

```tsx
import { createSignal, createEffect, createMemo } from 'solid-js';

// 创建信号 - 响应式状态
const [count, setCount] = createSignal(0);

// 创建派生值 - 自动追踪依赖
const doubled = createMemo(() => count() * 2);

// 创建副作用 - 自动响应变化
createEffect(() => {
  console.log('count changed:', count());
});

// 更新状态
setCount(1);        // 设置新值
setCount(c => c + 1); // 函数式更新
```

### Store - 嵌套响应式对象

对于复杂嵌套数据，使用 Store：

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
  name: '管理员',
  profile: {
    avatar: '/avatar.png',
    bio: '',
  },
});

// 访问 - 自动追踪
console.log(user.name);
console.log(user.profile.avatar);

// 更新 - 路径式
setUser('name', '新名称');
setUser('profile', 'bio', '这是我的简介');

// 更新 - 函数式 (Immer 风格)
setUser(
  produce((draft) => {
    draft.name = '新名称';
    draft.profile.bio = '这是我的简介';
  })
);
```

### 状态管理 (Signals + Store)

```tsx
// stores/auth.ts
import { createSignal, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';
import { makePersisted } from '@solid-primitives/storage';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  permissions: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
}

// 创建持久化 store
const [state, setState] = makePersisted(
  createStore<AuthState>({
    user: null,
    token: null,
  }),
  { name: 'auth-storage' }
);

// 独立的加载状态
const [loading, setLoading] = createSignal(false);
const [error, setError] = createSignal<string | null>(null);

export const authStore = {
  // Getters - 响应式访问
  get user() {
    return state.user;
  },
  get token() {
    return state.token;
  },
  get loading() {
    return loading();
  },
  get error() {
    return error();
  },

  // 派生状态
  isAuthenticated: createMemo(() => !!state.token && !!state.user),
  permissions: createMemo(() => state.user?.permissions ?? []),
  isAdmin: createMemo(() => state.user?.role === 'admin'),

  // Actions
  async login(credentials: { email: string; password: string }) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '登录失败');
      }

      const data = await response.json();
      setState({
        user: data.user,
        token: data.token,
      });

      return data;
    } catch (e) {
      const message = e instanceof Error ? e.message : '登录失败';
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  },

  logout() {
    setState({ user: null, token: null });
  },

  updateProfile(updates: Partial<User>) {
    setState('user', (user) => (user ? { ...user, ...updates } : null));
  },

  // 权限检查
  hasPermission(permission: string): boolean {
    const perms = state.user?.permissions ?? [];
    return perms.some(
      (p) =>
        p === '*' ||
        p === permission ||
        (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    );
  },

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((p) => authStore.hasPermission(p));
  },

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every((p) => authStore.hasPermission(p));
  },
};
```

### 数据获取 (createAsync)

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

### Tabs Store (标签页)

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
  title: '首页',
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
    // 检查是否已存在
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
      // 切换到相邻标签
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

### 路由中间件

```tsx
// src/middleware.ts
import { createMiddleware } from '@solidjs/start/middleware';

export default createMiddleware({
  onRequest: [
    // 日志中间件
    async (event) => {
      const start = Date.now();
      const response = await event.next();
      const duration = Date.now() - start;
      console.log(`${event.request.method} ${event.request.url} - ${duration}ms`);
      return response;
    },

    // 认证中间件
    async (event) => {
      const url = new URL(event.request.url);

      // 公开路径
      const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/api/auth'];
      const isPublic = publicPaths.some((path) => url.pathname.startsWith(path));

      if (isPublic) {
        return;
      }

      // 保护 dashboard 路由
      if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/api/')) {
        const cookies = event.request.headers.get('cookie') || '';
        const token = cookies.match(/token=([^;]+)/)?.[1];

        if (!token) {
          // API 路由返回 401
          if (url.pathname.startsWith('/api/')) {
            return new Response(JSON.stringify({ error: '未授权' }), {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          // 页面路由重定向
          return new Response(null, {
            status: 302,
            headers: { Location: `/login?redirect=${encodeURIComponent(url.pathname)}` },
          });
        }

        // 验证 token 并注入用户信息
        try {
          const user = await verifyToken(token);
          event.locals.user = user;
        } catch {
          // Token 无效，清除 cookie 并重定向
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
  // 实际项目中验证 JWT
  return { id: 1, name: '管理员', permissions: ['*'] };
}
```

### 服务端函数 (RPC)

SolidStart 支持 `"use server"` 标记的服务端函数：

```tsx
// server/auth.ts
'use server';
import { z } from 'zod';
import { useSession } from 'vinxi/http';

const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少 6 位'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, '姓名至少 2 个字符'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次密码不一致',
  path: ['confirmPassword'],
});

export async function login(credentials: z.infer<typeof loginSchema>) {
  const validated = loginSchema.parse(credentials);

  // 模拟验证
  if (validated.email !== 'admin@halolight.h7ml.cn' || validated.password !== '123456') {
    throw new Error('邮箱或密码错误');
  }

  const user = {
    id: 1,
    name: '管理员',
    email: validated.email,
    role: 'admin',
    permissions: ['*'],
  };

  const token = `mock_token_${Date.now()}`;

  // 设置 session
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

  // 检查邮箱是否已存在
  const existing = await db.users.findByEmail(validated.email);
  if (existing) {
    throw new Error('该邮箱已被注册');
  }

  // 创建用户
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

### API 路由

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

  // 模拟数据
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

  // 验证
  if (!email || !name) {
    return json({ success: false, message: '邮箱和姓名不能为空' }, { status: 400 });
  }

  // 创建用户
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
    message: '用户创建成功',
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
    return json({ success: false, message: '用户不存在' }, { status: 404 });
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
    message: '用户更新成功',
  });
}

// DELETE /api/users/:id
export async function DELETE(event: APIEvent) {
  const id = event.params.id;

  await db.users.delete(id);
  return json({
    success: true,
    message: '用户删除成功',
  });
}
```

### 权限组件

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
    // 单权限检查
    if (props.permission) {
      return authStore.hasPermission(props.permission);
    }

    // 多权限检查
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

// 使用示例
<PermissionGuard
  permission="users:delete"
  fallback={<span class="text-muted-foreground">无权限</span>}
>
  <Button variant="destructive" onClick={handleDelete}>
    删除用户
  </Button>
</PermissionGuard>

// 多权限检查
<PermissionGuard
  permissions={['users:edit', 'users:delete']}
  mode="any"
>
  <DropdownMenu>
    <DropdownMenuItem>编辑</DropdownMenuItem>
    <DropdownMenuItem>删除</DropdownMenuItem>
  </DropdownMenu>
</PermissionGuard>
```

### 数据获取

使用 `createAsync` 和 `cache` 进行数据获取：

```tsx
// routes/(dashboard)/users/index.tsx
import { createAsync, cache, useSearchParams } from '@solidjs/router';
import { Show, For, Suspense } from 'solid-js';
import { AdminLayout } from '~/components/layout/AdminLayout';
import { Table, Pagination, Button, Input } from '~/components/ui';

// 定义缓存函数
const getUsers = cache(async (params: { page: number; limit: number; search?: string }) => {
  'use server';

  const response = await fetch(
    `${process.env.API_BASE_URL}/users?page=${params.page}&limit=${params.limit}&search=${params.search || ''}`
  );

  if (!response.ok) {
    throw new Error('获取用户列表失败');
  }

  return response.json();
}, 'users');

// 预加载
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
    <AdminLayout title="用户管理">
      <div class="space-y-6">
        {/* 搜索栏 */}
        <div class="flex items-center justify-between">
          <Input
            type="search"
            placeholder="搜索用户..."
            value={search()}
            onInput={(e) => handleSearch(e.currentTarget.value)}
            class="max-w-sm"
          />
          <Button>
            <PlusIcon class="mr-2 h-4 w-4" />
            添加用户
          </Button>
        </div>

        {/* 表格 */}
        <Suspense fallback={<TableSkeleton />}>
          <Show when={users()}>
            {(data) => (
              <>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>姓名</Table.Head>
                      <Table.Head>邮箱</Table.Head>
                      <Table.Head>角色</Table.Head>
                      <Table.Head>状态</Table.Head>
                      <Table.Head class="text-right">操作</Table.Head>
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

### 表单处理

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
      newErrors.email = '请输入邮箱';
    } else if (!email().includes('@')) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!password()) {
      newErrors.password = '请输入密码';
    } else if (password().length < 6) {
      newErrors.password = '密码至少 6 位';
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

      // 跳转到原页面或仪表盘
      const redirect = searchParams.redirect || '/dashboard';
      navigate(redirect);
    } catch (e) {
      setErrors({ form: e instanceof Error ? e.message : '登录失败' });
    }
  };

  // 填充演示账号
  const fillDemo = () => {
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
    const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;
    if (demoEmail) setEmail(demoEmail);
    if (demoPassword) setPassword(demoPassword);
  };

  return (
    <AuthLayout title="登录">
      <Card class="w-full max-w-md">
        <Card.Header class="text-center">
          <Card.Title class="text-2xl">欢迎回来</Card.Title>
          <Card.Description>登录到您的账户</Card.Description>
        </Card.Header>

        <Card.Content>
          {/* 错误提示 */}
          <Show when={errors().form}>
            <div class="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {errors().form}
            </div>
          </Show>

          {/* 演示提示 */}
          <Show when={import.meta.env.VITE_SHOW_DEMO_HINT === 'true'}>
            <div class="mb-4 rounded-md bg-muted p-3 text-sm">
              <p>演示账号：</p>
              <p class="font-mono text-xs">
                邮箱：{import.meta.env.VITE_DEMO_EMAIL}
              </p>
              <p class="font-mono text-xs">
                密码：{import.meta.env.VITE_DEMO_PASSWORD}
              </p>
              <Button variant="link" size="sm" onClick={fillDemo} class="mt-1 h-auto p-0">
                点击填充
              </Button>
            </div>
          </Show>

          <form onSubmit={handleSubmit} class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">
                邮箱
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
                  密码
                </label>
                <A href="/forgot-password" class="text-sm text-primary hover:underline">
                  忘记密码？
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
              {authStore.loading ? '登录中...' : '登录'}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer class="justify-center">
          <p class="text-sm text-muted-foreground">
            还没有账户？{' '}
            <A href="/register" class="text-primary hover:underline">
              立即注册
            </A>
          </p>
        </Card.Footer>
      </Card>
    </AuthLayout>
  );
}
```

### 错误处理

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
          <Card.Title class="text-destructive">发生错误</Card.Title>
          <Card.Description>{props.error.message}</Card.Description>
        </Card.Header>
        <Card.Content class="space-y-4">
          <div class="flex justify-center gap-2">
            <Button variant="outline" onClick={props.reset}>
              重试
            </Button>
            <Button onClick={() => navigate('/')}>
              返回首页
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
```

```tsx
// routes/[...404].tsx - 404 页面
import { A } from '@solidjs/router';
import { Button } from '~/components/ui';

export default function NotFoundPage() {
  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-muted-foreground">404</h1>
        <p class="mt-4 text-2xl text-foreground">页面未找到</p>
        <p class="mt-2 text-muted-foreground">
          您访问的页面不存在或已被移除
        </p>
        <Button as={A} href="/" class="mt-8">
          返回首页
        </Button>
      </div>
    </div>
  );
}
```

### Meta (TDK 元信息)

```tsx
// lib/meta.ts
interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
}

export const pageMetas: Record<string, PageMeta> = {
  '/': {
    title: '仪表盘',
    description: 'Admin Pro 管理系统仪表盘，数据概览与统计分析',
    keywords: ['仪表盘', '数据分析', '管理系统'],
  },
  '/users': {
    title: '用户管理',
    description: '管理系统用户账户，包括创建、编辑和权限配置',
    keywords: ['用户管理', '账户管理', '权限配置'],
  },
  '/analytics': {
    title: '数据分析',
    description: '业务数据统计分析，可视化图表展示',
    keywords: ['数据分析', '图表', '统计'],
  },
  '/settings': {
    title: '系统设置',
    description: '系统配置与个性化设置',
    keywords: ['系统设置', '配置', '个性化'],
  },
};

export function generateMeta(path: string, overrides?: Partial<PageMeta>) {
  const meta = { ...pageMetas[path], ...overrides } || {
    title: '页面',
    description: 'Admin Pro 管理系统',
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
// 在页面中使用
import { Title, Meta } from '@solidjs/meta';
import { generateMeta } from '~/lib/meta';

export default function UsersPage() {
  const meta = generateMeta('/users');

  return (
    <>
      <Title>{meta.title}</Title>
      <Meta name="description" content={meta.description} />
      <Meta name="keywords" content={meta.keywords} />

      {/* 页面内容 */}
    </>
  );
}
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
/* src/styles/globals.css */
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
  --color-primary: oklch(var(--primary));
  --color-primary-foreground: oklch(var(--primary-foreground));
  /* ... */
}
```

## 页面路由

| 路径 | 页面 | 布局 | 权限 |
|------|------|------|------|
| `/` | 首页 | - | 公开 |
| `/login` | 登录 | AuthLayout | 公开 |
| `/register` | 注册 | AuthLayout | 公开 |
| `/forgot-password` | 忘记密码 | AuthLayout | 公开 |
| `/reset-password` | 重置密码 | AuthLayout | 公开 |
| `/dashboard` | 仪表盘 | AdminLayout | `dashboard:view` |
| `/analytics` | 数据分析 | AdminLayout | `analytics:view` |
| `/users` | 用户列表 | AdminLayout | `users:list` |
| `/users/create` | 创建用户 | AdminLayout | `users:create` |
| `/users/[id]` | 用户详情 | AdminLayout | `users:view` |
| `/roles` | 角色管理 | AdminLayout | `roles:list` |
| `/permissions` | 权限管理 | AdminLayout | `permissions:list` |
| `/messages` | 消息中心 | AdminLayout | `messages:view` |
| `/notifications` | 通知列表 | AdminLayout | 登录即可 |
| `/documents` | 文档管理 | AdminLayout | `documents:list` |
| `/calendar` | 日历 | AdminLayout | `calendar:view` |
| `/settings` | 系统设置 | AdminLayout | `settings:view` |
| `/profile` | 个人中心 | AdminLayout | 登录即可 |
| `/privacy` | 隐私政策 | - | 公开 |
| `/terms` | 服务条款 | - | 公开 |

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_API_URL` | API 基础 URL | `/api` |
| `VITE_USE_MOCK` | 启用 Mock 数据 | `false` |
| `VITE_DEMO_EMAIL` | 演示账号邮箱 | - |
| `VITE_DEMO_PASSWORD` | 演示账号密码 | - |
| `VITE_SHOW_DEMO_HINT` | 显示演示提示 | `false` |
| `VITE_APP_TITLE` | 应用标题 | `Admin Pro` |
| `VITE_BRAND_NAME` | 品牌名称 | `Halolight` |
| `SESSION_SECRET` | 会话密钥 (服务端) | (必需) |

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

# 其他
pnpm clean            # 清理构建产物
pnpm deps             # 检查依赖更新
```

## 测试

### 运行测试

```bash
pnpm test:run      # 单次运行
pnpm test          # 监视模式
pnpm test:coverage # 覆盖率报告
```

### 测试示例

```tsx
// tests/stores/auth.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authStore } from '~/stores/auth';

describe('authStore', () => {
  beforeEach(() => {
    authStore.logout();
  });

  it('初始状态应该是未登录', () => {
    expect(authStore.isAuthenticated()).toBe(false);
    expect(authStore.user).toBeNull();
    expect(authStore.token).toBeNull();
  });

  it('登录成功后应该更新状态', async () => {
    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          user: { id: 1, name: '管理员', permissions: ['*'] },
          token: 'mock_token',
        }),
    });

    await authStore.login({
      email: 'admin@example.com',
      password: '123456',
    });

    expect(authStore.isAuthenticated()).toBe(true);
    expect(authStore.user?.name).toBe('管理员');
    expect(authStore.token).toBe('mock_token');
  });

  it('权限检查应该正确工作', async () => {
    // 设置用户权限
    authStore.login({
      email: 'test@example.com',
      password: '123456',
    });

    // 模拟登录成功后
    expect(authStore.hasPermission('*')).toBe(true);
    expect(authStore.hasPermission('users:list')).toBe(true);
    expect(authStore.hasPermission('unknown:action')).toBe(true); // * 权限
  });

  it('登出后应该清除状态', () => {
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

  it('初始状态应该只有首页标签', () => {
    expect(tabsStore.tabs.length).toBe(1);
    expect(tabsStore.tabs[0].id).toBe('home');
    expect(tabsStore.activeTabId).toBe('home');
  });

  it('应该添加新标签', () => {
    const id = tabsStore.addTab({ title: '用户管理', path: '/users' });

    expect(tabsStore.tabs.length).toBe(2);
    expect(tabsStore.tabs[1].title).toBe('用户管理');
    expect(tabsStore.activeTabId).toBe(id);
  });

  it('应该去重已存在的路由', () => {
    const id1 = tabsStore.addTab({ title: '用户管理', path: '/users' });
    const id2 = tabsStore.addTab({ title: '用户管理', path: '/users' });

    expect(id1).toBe(id2);
    expect(tabsStore.tabs.length).toBe(2);
  });

  it('应该关闭标签并切换到相邻标签', () => {
    tabsStore.addTab({ title: '用户管理', path: '/users' });
    const id = tabsStore.addTab({ title: '设置', path: '/settings' });

    tabsStore.removeTab(id);

    expect(tabsStore.tabs.length).toBe(2);
    expect(tabsStore.activeTabId).not.toBe(id);
  });

  it('首页标签不可关闭', () => {
    tabsStore.removeTab('home');

    expect(tabsStore.tabs.length).toBe(1);
    expect(tabsStore.tabs[0].id).toBe('home');
  });
});
```

## 配置

### SolidStart 配置

```ts
// app.config.ts
import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: {
    preset: 'node-server', // 默认 Node.js 服务器
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

### 不同环境预设

```ts
// 开发环境
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

## 部署

### Node.js 服务器

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
# 部署
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
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
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

### GitHub Actions 部署

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

### createResource (异步数据)

```tsx
import { createResource, Suspense, Show } from 'solid-js';

// 定义数据获取函数
const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error('用户不存在');
  return response.json();
};

function UserProfile(props: { userId: string }) {
  // createResource 自动管理加载/错误状态
  const [user, { refetch, mutate }] = createResource(
    () => props.userId,
    fetchUser
  );

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Show when={user()} fallback={<div>用户不存在</div>}>
        {(userData) => (
          <div>
            <h1>{userData().name}</h1>
            <p>{userData().email}</p>
            <button onClick={refetch}>刷新</button>
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

// 快速数据
const getQuickStats = cache(async () => {
  'use server';
  return await db.stats.getQuick();
}, 'quick-stats');

// 慢速数据
const getDetailedAnalytics = cache(async () => {
  'use server';
  return await db.analytics.getDetailed(); // 耗时操作
}, 'detailed-analytics');

export default function Dashboard() {
  const quickStats = createAsync(() => getQuickStats());
  const analytics = createAsync(() => getDetailedAnalytics());

  return (
    <div class="space-y-6">
      {/* 快速渲染的内容 */}
      <Show when={quickStats()}>
        {(stats) => <QuickStats data={stats()} />}
      </Show>

      {/* 流式渲染的慢内容 */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Show when={analytics()}>
          {(data) => <DetailedAnalytics data={data()} />}
        </Show>
      </Suspense>
    </div>
  );
}
```

### 乐观更新

```tsx
import { createSignal, For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

function TodoList() {
  const [todos, setTodos] = createStore<Todo[]>([]);
  const [newTodo, setNewTodo] = createSignal('');

  const addTodo = async () => {
    const text = newTodo();
    if (!text.trim()) return;

    // 乐观更新 - 立即显示
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
      // 实际请求
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const realTodo = await response.json();

      // 替换为真实数据
      setTodos(
        (todo) => todo.id === tempId,
        { id: realTodo.id, pending: false }
      );
    } catch {
      // 回滚
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
            {todo.pending && <span>保存中...</span>}
          </div>
        )}
      </For>
    </div>
  );
}
```

### Context 跨组件通信

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

### Portal 和 Modal

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

// 使用
function App() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>打开模态框</button>
      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <h2>标题</h2>
        <p>内容</p>
        <button onClick={() => setIsOpen(false)}>关闭</button>
      </Modal>
    </>
  );
}
```

## 性能优化

### 细粒度更新

Solid.js 的核心优势是细粒度更新，无需手动优化：

```tsx
// 组件不会因为父组件更新而重新执行
function Parent() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>
        Count: {count()}
      </button>
      {/* Child 组件只创建一次 */}
      <Child />
    </div>
  );
}

function Child() {
  console.log('Child rendered'); // 只执行一次
  return <div>I'm a child</div>;
}
```

### 懒加载组件

```tsx
import { lazy, Suspense } from 'solid-js';

// 懒加载重型组件
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

### 列表优化

```tsx
import { For, Index } from 'solid-js';

// For - 适合对象数组，按引用追踪
<For each={users()}>
  {(user, index) => (
    <div>{index()}: {user.name}</div>
  )}
</For>

// Index - 适合原始值数组，按索引追踪
<Index each={numbers()}>
  {(num, index) => (
    <div>{index}: {num()}</div>
  )}
</Index>
```

### 预加载

```tsx
// 路由预加载
export const route = {
  load: ({ params }) => {
    // 预加载数据
    void getUser({ id: params.id });
    void getUserPosts({ userId: params.id });
  },
};

// 链接预加载
<A href="/users" preload>
  用户管理
</A>
```

## 常见问题

### Q：Solid.js 和 React 的主要区别？

A：核心区别：
1. **无虚拟 DOM** - Solid 直接操作真实 DOM
2. **细粒度响应式** - 只更新变化的部分，组件不重新执行
3. **编译时优化** - JSX 编译为高效 DOM 操作
4. **Signals** vs Hooks - Signals 是真正的响应式原语

```tsx
// React - 组件每次状态变化都重新执行
function ReactComponent() {
  const [count, setCount] = useState(0);
  console.log('render'); // 每次更新都打印
  return <div>{count}</div>;
}

// Solid - 组件只执行一次，只有访问 signal 的地方更新
function SolidComponent() {
  const [count, setCount] = createSignal(0);
  console.log('setup'); // 只打印一次
  return <div>{count()}</div>; // 只有这里更新
}
```

### Q：如何处理异步数据？

A：使用 `createResource` 或 `createAsync`：

```tsx
// createResource - 更细粒度控制
const [data, { refetch, mutate }] = createResource(source, fetcher);

// createAsync - SolidStart 路由集成
const data = createAsync(() => getData());
```

### Q：如何共享状态？

A：三种方式：

1. **导出 Signals/Store** - 简单场景
```tsx
// stores/counter.ts
export const [count, setCount] = createSignal(0);
```

2. **Context** - 依赖注入
```tsx
const CounterContext = createContext();
```

3. **solid-primitives/storage** - 持久化
```tsx
const [state, setState] = makePersisted(createStore({}), { name: 'key' });
```

### Q：如何处理表单？

A：使用受控组件或 `@modular-forms/solid`：

```tsx
// 受控组件
const [email, setEmail] = createSignal('');
<input value={email()} onInput={(e) => setEmail(e.currentTarget.value)} />

// 或使用表单库
import { createForm } from '@modular-forms/solid';

const [form, { Form, Field }] = createForm<LoginForm>();
```

### Q：如何实现路由守卫？

A：使用中间件或路由 `load` 函数：

```tsx
// middleware.ts
export default createMiddleware({
  onRequest: [authMiddleware],
});

// 或在路由中
export const route = {
  load: ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect('/login');
    }
  },
};
```

## 与其他版本对比

| 功能 | Solid.js 版本 | Vue 版本 | Next.js 版本 | Remix 版本 |
|------|--------------|----------|--------------|------------|
| 状态管理 | Signals + Store | Pinia | Zustand | Zustand |
| 数据获取 | createAsync | TanStack Query | TanStack Query | Loader/Action |
| 表单验证 | 自定义 + Zod | VeeValidate + Zod | React Hook Form + Zod | 渐进增强 |
| 服务端 | SolidStart 内置 | 独立后端 / Nuxt | API Routes | 内置 |
| 组件库 | Kobalte | shadcn-vue | shadcn/ui | Radix UI |
| 路由 | 文件路由 | Vue Router | App Router | 文件路由 |
| 响应式 | 细粒度 Signals | Proxy-based | Hooks | Hooks |
| Bundle 大小 | ~7KB | ~33KB | ~85KB | ~70KB |
| 运行时性能 | 极高 | 高 | 中 | 中 |

## 相关链接

- [在线预览](https://halolight-solidjs.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-solidjs)
- [Solid.js 官方文档](https://www.solidjs.com)
- [SolidStart 文档](https://start.solidjs.com)
- [Kobalte 文档](https://kobalte.dev)
- [solid-primitives 文档](https://primitives.solidjs.community)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
