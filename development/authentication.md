# 认证系统

本文档描述 HaloLight 项目的用户认证和权限控制实现。

## 认证流程

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  登录   │ ──► │ 验证    │ ──► │ 获取    │ ──► │ 存储    │
│  表单   │     │ 凭证    │     │ Token   │     │ 状态    │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

## 认证页面

| 页面 | 路径 | 功能 |
|------|------|------|
| 登录 | `/login` | 用户名/密码登录 |
| 注册 | `/register` | 新用户注册 |
| 忘记密码 | `/forgot-password` | 发送重置邮件 |
| 重置密码 | `/reset-password` | 设置新密码 |

## Token 管理

### 双 Token 机制

```ts
interface TokenPair {
  accessToken: string   // 短期有效 (15分钟)
  refreshToken: string  // 长期有效 (7天)
}
```

### Token 刷新

```ts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      try {
        const { refreshToken } = useAuthStore.getState()
        const newTokens = await authService.refresh(refreshToken)
        useAuthStore.getState().setTokens(newTokens)
        error.config.headers.Authorization = `Bearer ${newTokens.accessToken}`
        return api(error.config)
      } catch {
        useAuthStore.getState().logout()
      }
    }
    return Promise.reject(error)
  }
)
```

## 权限系统

### 权限格式

```ts
// 格式: resource:action
const permissions = [
  'users:list',      // 查看用户列表
  'users:create',    // 创建用户
  'users:update',    // 更新用户
  'users:delete',    // 删除用户
  'users:*',         // 用户所有权限
  '*',               // 超级管理员
]
```

### 权限检查

```ts
function hasPermission(userPerms: string[], required: string): boolean {
  return userPerms.some((p) =>
    p === '*' ||
    p === required ||
    (p.endsWith(':*') && required.startsWith(p.slice(0, -1)))
  )
}
```

### 权限组件

```tsx
// React
function PermissionGuard({ permission, children, fallback }) {
  const hasPermission = useAuthStore((s) => s.hasPermission)
  return hasPermission(permission) ? children : fallback
}

// 使用
<PermissionGuard permission="users:delete" fallback={null}>
  <DeleteButton />
</PermissionGuard>
```

```vue
<!-- Vue -->
<template>
  <slot v-if="hasPermission(permission)" />
  <slot v-else name="fallback" />
</template>
```

### 权限指令 (Vue)

```ts
// v-permission 指令
app.directive('permission', {
  mounted(el, binding) {
    const authStore = useAuthStore()
    if (!authStore.hasPermission(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
})

// 使用
<button v-permission="'users:delete'">删除</button>
```

## 路由守卫

### Next.js Middleware

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
```

### Vue Router Guard

```ts
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.permission && !authStore.hasPermission(to.meta.permission)) {
    next({ name: '403' })
    return
  }

  next()
})
```

## 标准权限列表

```ts
const PERMISSIONS = {
  // 仪表盘
  'dashboard:view': '查看仪表盘',
  'dashboard:edit': '编辑仪表盘',

  // 用户管理
  'users:list': '查看用户列表',
  'users:view': '查看用户详情',
  'users:create': '创建用户',
  'users:update': '更新用户',
  'users:delete': '删除用户',

  // 角色管理
  'roles:list': '查看角色列表',
  'roles:create': '创建角色',
  'roles:update': '更新角色',
  'roles:delete': '删除角色',

  // 权限管理
  'permissions:list': '查看权限列表',
  'permissions:assign': '分配权限',

  // 系统设置
  'settings:view': '查看设置',
  'settings:update': '更新设置',
}
```

## 角色预设

```ts
const ROLES = {
  admin: {
    name: '管理员',
    permissions: ['*'],
  },
  manager: {
    name: '经理',
    permissions: ['dashboard:*', 'users:list', 'users:view'],
  },
  user: {
    name: '普通用户',
    permissions: ['dashboard:view'],
  },
}
```
