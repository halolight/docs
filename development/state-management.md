# 状态管理

本文档描述 HaloLight 项目的状态管理模式，涵盖不同框架的实现方案。

## 状态管理方案对照

| 框架 | 状态库 | 特点 |
|------|--------|------|
| React/Next.js | Zustand | 简洁、无样板代码 |
| Vue 3 | Pinia | 官方推荐、类型安全 |
| Svelte | Svelte Stores | 原生响应式 |
| Angular | Signals + RxJS | 细粒度响应式 |
| Solid.js | createStore | 细粒度响应式 |

## Store 模块划分

```
stores/
├── auth.ts           # 认证状态
├── ui-settings.ts    # UI 设置
├── dashboard.ts      # 仪表盘布局
├── navigation.ts     # 导航菜单
├── tabs.ts           # 多标签页
└── error.ts          # 错误状态
```

## Auth Store

### 状态定义

```ts
interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  permissions: string[]
  roles: string[]
  isAuthenticated: boolean
  isLoading: boolean
}
```

### Zustand 实现 (React)

```ts
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      permissions: [],
      isAuthenticated: false,

      login: async (credentials) => {
        const response = await authService.login(credentials)
        set({
          user: response.user,
          token: response.token,
          permissions: response.permissions,
          isAuthenticated: true,
        })
      },

      hasPermission: (permission) => {
        const { permissions } = get()
        return permissions.some((p) =>
          p === '*' || p === permission ||
          (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
        )
      },
    }),
    { name: 'auth-storage' }
  )
)
```

### Pinia 实现 (Vue)

```ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const permissions = ref<string[]>([])

  const isAuthenticated = computed(() => !!token.value)

  function hasPermission(permission: string): boolean {
    return permissions.value.some((p) =>
      p === '*' || p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    )
  }

  return { user, token, permissions, isAuthenticated, hasPermission }
}, { persist: { paths: ['token', 'user'] } })
```

## Dashboard Store

### 布局状态

```ts
interface DashboardState {
  layouts: { lg: GridLayout[]; md: GridLayout[]; sm: GridLayout[] }
  widgets: WidgetConfig[]
  isEditing: boolean
}

interface GridLayout {
  i: string; x: number; y: number; w: number; h: number
}
```

## 持久化策略

| 数据类型 | 存储位置 | 示例 |
|----------|----------|------|
| 用户偏好 | localStorage | 主题、语言 |
| UI 状态 | localStorage | 侧边栏、布局 |
| 临时数据 | sessionStorage | 表单草稿 |
| 服务端数据 | TanStack Query | API 响应 |
