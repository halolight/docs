# API Layer Design

This document describes the API service layer architecture and data fetching strategies for the HaloLight project.

## Technology Stack

| Framework | HTTP Client | Cache Layer |
|------|-------------|--------|
| React/Next.js | Axios | TanStack Query |
| Vue 3 | Axios | TanStack Query |
| Svelte | Fetch | TanStack Query |
| Angular | HttpClient | RxJS |

## Service Layer Structure

```
services/
├── api.ts              # Axios instance configuration
├── auth.ts             # Authentication service
├── users.ts            # User service
├── roles.ts            # Role service
├── permissions.ts      # Permission service
├── dashboard.ts        # Dashboard service
├── settings.ts         # Settings service
└── index.ts            # Unified export
```

## Axios Instance Configuration

```ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
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

## Service Definition Specification

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

### Query Hook Pattern

```ts
// hooks/useUsers.ts
export function useUsers(params: UserQueryParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
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

### Mutation Hook Pattern

```ts
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    },
  })
}
```

## Mock Data System

### Mock.js Configuration

```ts
// mocks/index.ts
import Mock from 'mockjs'
import './modules/auth'
import './modules/users'
import './modules/dashboard'

Mock.setup({ timeout: '200-600' })
```

### Mock Module Example

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
          'name': '@name',
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

## Error Handling

```ts
interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

// Unified error handling
function handleApiError(error: ApiError) {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      // Form validation error
      break
    case 'UNAUTHORIZED':
      // Unauthorized
      break
    case 'FORBIDDEN':
      // Forbidden
      break
    default:
      toast.error(error.message)
  }
}
```

## Pagination Specification

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
