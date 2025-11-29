# API 层设计

本文档描述 HaloLight 项目的 API 服务层架构和数据获取策略。

## 技术选型

| 框架 | HTTP 客户端 | 缓存层 |
|------|-------------|--------|
| React/Next.js | Axios | TanStack Query |
| Vue 3 | Axios | TanStack Query |
| Svelte | Fetch | TanStack Query |
| Angular | HttpClient | RxJS |

## 服务层结构

```
services/
├── api.ts              # Axios 实例配置
├── auth.ts             # 认证服务
├── users.ts            # 用户服务
├── roles.ts            # 角色服务
├── permissions.ts      # 权限服务
├── dashboard.ts        # 仪表盘服务
├── settings.ts         # 设置服务
└── index.ts            # 统一导出
```

## Axios 实例配置

```ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## 服务定义规范

```ts
// services/users.ts
export const userService = {
  getList: (params: UserQueryParams) =>
    api.get<PaginatedResponse<User>>('/users', { params }),

  getById: (id: string) =>
    api.get<User>(`/users/${id}`),

  create: (data: CreateUserDto) =>
    api.post<User>('/users', data),

  update: (id: string, data: UpdateUserDto) =>
    api.put<User>(`/users/${id}`, data),

  delete: (id: string) =>
    api.delete(`/users/${id}`),
}
```

## TanStack Query Hooks

### Query Hook 模式

```ts
// hooks/useUsers.ts
export function useUsers(params: UserQueryParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(params),
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  })
}
```

### Mutation Hook 模式

```ts
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('用户创建成功')
    },
  })
}
```

## Mock 数据系统

### Mock.js 配置

```ts
// mocks/index.ts
import Mock from 'mockjs'
import './modules/auth'
import './modules/users'
import './modules/dashboard'

Mock.setup({ timeout: '200-600' })
```

### Mock 模块示例

```ts
// mocks/modules/users.ts
Mock.mock(/\/api\/users(\?.*)?$/, 'get', (options) => {
  const params = parseQuery(options.url)
  return {
    code: 200,
    data: {
      list: Mock.mock({
        [`list|${params.pageSize || 10}`]: [{
          'id': '@guid',
          'name': '@cname',
          'email': '@email',
          'status|1': ['active', 'inactive'],
          'createdAt': '@datetime',
        }]
      }).list,
      total: 100,
    }
  }
})
```

## 错误处理

```ts
interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

// 统一错误处理
function handleApiError(error: ApiError) {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      // 表单验证错误
      break
    case 'UNAUTHORIZED':
      // 未授权
      break
    case 'FORBIDDEN':
      // 无权限
      break
    default:
      toast.error(error.message)
  }
}
```

## 分页规范

```ts
interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
```
