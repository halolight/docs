# 实现指南

本指南帮助开发者为 HaloLight 创建新的框架版本实现。

## 共用约束

- **数据模拟**：使用 Mock.js 结合 `fetch` 拦截，行为与 `halolight/src/mock` 对齐 (响应格式、延时、错误码)
- **认证流程**：登录/注册/忘记密码/重置密码参考 `halolight/src/app/(auth)` 的页面流与校验逻辑
- **环境变量**：各框架复用同一变量命名 (如 `*_API_URL`、`*_USE_MOCK`、`*_DEMO_*`、`*_BRAND_NAME`)，保持文档一致
- **CI/CD 与测试**：沿用通用工作流 (lint + type-check + test + build + security)，保留单元测试与覆盖率任务

## 实现清单

### 第一阶段：项目初始化

- [ ] 使用框架 CLI 创建项目
- [ ] 配置 TypeScript
- [ ] 安装 Tailwind CSS
- [ ] 安装 shadcn/ui 对应版本
- [ ] 配置环境变量
- [ ] 设置路径别名 (`@/`)

### 第二阶段：基础架构

- [ ] 创建目录结构
- [ ] 实现 API 服务层
- [ ] 配置 TanStack Query
- [ ] 设置 Mock.js fetch 拦截 (复用 `halolight/src/mock` 数据结构)
- [ ] 实现状态管理 Store

### 第三阶段：认证系统

- [ ] 登录/注册/忘记密码/重置密码页面 (参考 Next.js 版本交互)
- [ ] Auth Store (含 Token 持久化)
- [ ] 路由守卫
- [ ] 权限检查 (页面级与按钮级)

### 第四阶段：布局组件

- [ ] AdminLayout
- [ ] AuthLayout
- [ ] Sidebar
- [ ] Header
- [ ] Footer
- [ ] Breadcrumb
- [ ] TabsNav

### 第五阶段：核心页面

- [ ] Dashboard (可拖拽仪表盘)
- [ ] 用户管理 (CRUD)
- [ ] 角色管理
- [ ] 权限管理
- [ ] 系统设置
- [ ] 个人中心

### 第六阶段：增强功能

- [ ] 主题切换
- [ ] 皮肤预设
- [ ] 多语言 (可选)
- [ ] 响应式适配
- [ ] 错误边界
- [ ] CI/CD (lint、type-check、test、build、security) 与覆盖率报告

## 快速开始

### 1。创建项目

```bash
# Next.js
npx create-next-app@latest halolight --typescript --tailwind --app

# Vue
npm create vue@latest halolight-vue

# SvelteKit
npx sv create halolight-svelte

# Angular
ng new halolight-angular --routing --style=scss
```

### 2。安装依赖

```bash
# 通用依赖
npm install axios @tanstack/react-query zustand
npm install -D tailwindcss postcss autoprefixer

# shadcn/ui
npx shadcn@latest init
```

### 3。目录结构

```
src/
├── app/              # 页面
├── components/
│   ├── ui/          # shadcn 组件
│   ├── layout/      # 布局组件
│   └── dashboard/   # 仪表盘组件
├── hooks/           # 自定义 hooks
├── stores/          # 状态管理
├── services/        # API 服务
├── lib/             # 工具函数
├── types/           # 类型定义
└── mocks/           # Mock 数据
```

## 框架对照表

### 组件语法

| 概念 | React | Vue | Svelte |
|------|-------|-----|--------|
| 组件 | `function Component()` | `<script setup>` | `<script>` |
| Props | `props: Props` | `defineProps<Props>()` | `export let prop` |
| State | `useState()` | `ref()` | `let state = $state()` |
| 计算 | `useMemo()` | `computed()` | `$derived()` |
| 副作用 | `useEffect()` | `watch()` | `$effect()` |
| 上下文 | `useContext()` | `provide/inject` | `setContext()` |

### 路由

| 概念 | Next.js | Vue Router | SvelteKit |
|------|---------|------------|-----------|
| 文件路由 | `app/page.tsx` | - | `routes/+page.svelte` |
| 动态路由 | `[id]/page.tsx` | `:id` | `[id]/+page.svelte` |
| 布局 | `layout.tsx` | - | `+layout.svelte` |
| 守卫 | `middleware.ts` | `beforeEach` | `+page.server.ts` |

### 状态管理

| 框架 | 推荐方案 | 持久化 |
|------|----------|--------|
| React | Zustand | zustand/middleware |
| Vue | Pinia | pinia-plugin-persistedstate |
| Svelte | Svelte Stores | - |
| Angular | Signals | localStorage |

## API 模块模板

```ts
// services/users.ts
import { api } from './api'

export const userService = {
  getList: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
}
```

## Query Hook 模板

```ts
// hooks/useUsers.ts
export function useUsers(params) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(params),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

## Store 模板

```ts
// stores/auth.ts
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        const response = await authService.login(credentials)
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      hasPermission: (permission) => {
        const { permissions } = get().user || {}
        return permissions?.includes(permission) || permissions?.includes('*')
      },
    }),
    { name: 'auth' }
  )
)
```

## 测试清单

### 功能测试

- [ ] 登录/登出流程
- [ ] 权限控制生效
- [ ] 仪表盘拖拽保存
- [ ] 主题切换正常
- [ ] 皮肤切换正常
- [ ] 响应式布局
- [ ] 数据表格操作
- [ ] 表单提交验证

### 兼容性测试

- [ ] Chrome 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版
- [ ] Edge 最新版
- [ ] 移动端浏览器

## 代码规范

### 命名约定

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `UserCard.tsx` |
| Hook | camelCase + use | `useUsers.ts` |
| Store | camelCase + use | `useAuthStore.ts` |
| 服务 | camelCase + Service | `userService.ts` |
| 类型 | PascalCase | `User`, `UserQueryParams` |
| 常量 | UPPER_SNAKE | `API_BASE_URL` |

### 文件组织

```
# 组件目录
components/
└── UserCard/
    ├── index.tsx          # 主组件
    ├── UserCard.types.ts  # 类型定义
    └── useUserCard.ts     # 组件逻辑

# 页面目录
app/users/
├── page.tsx               # 列表页
├── [id]/
│   └── page.tsx          # 详情页
└── create/
    └── page.tsx          # 创建页
```

## 参考资源

- [Next.js 实现](https://github.com/halolight/halolight)
- [Vue 实现](https://github.com/halolight/halolight-vue)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)
