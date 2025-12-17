# TypeScript tRPC 网关 API

基于 tRPC 11 + Express 5 构建的类型安全 API 网关，为前端应用提供统一的端到端类型安全接口层。

**API 文档**：[https://halolight-bff.h7ml.cn](https://halolight-bff.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-bff](https://github.com/halolight/halolight-bff)

## 特性

- 🎯 **端到端类型安全** - tRPC 提供从服务器到客户端的完整类型推导，零运行时开销
- 🔐 **JWT 双令牌认证** - Access Token + Refresh Token 自动续期，RBAC 权限控制
- 📡 **服务网关聚合** - 统一聚合多个后端服务 (Python/Java/Go/Bun)，自动故障转移
- ✅ **Zod 数据验证** - 所有输入自动验证，类型安全，详细错误信息
- 🔄 **SuperJSON 序列化** - 自动处理 Date、Map、Set、BigInt、RegExp 等复杂类型
- 🎭 **请求批处理** - 自动批量处理多个请求，减少网络开销
- 📊 **分布式追踪** - Trace ID 自动传播，完整请求链路日志
- 🐳 **Docker 支持** - 容器化部署，生产级配置

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| TypeScript | 5.9 | 编程语言 |
| tRPC | 11 | RPC 框架 |
| Zod | - | 数据验证 |
| Express | 5 | Web 服务器 |
| SuperJSON | - | 序列化 |
| JWT | - | 身份认证 |
| Pino | - | 日志系统 |

## 快速开始

### 环境要求

- Node.js >= 20.0
- pnpm >= 8.0
- 至少一个后端服务 (Python/Java/Go/Bun)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-bff.git
cd halolight-bff

# 安装依赖
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# 服务器配置
PORT=3002
HOST=0.0.0.0
NODE_ENV=development

# JWT 密钥（生产环境必须修改）
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# CORS 配置
CORS_ORIGIN=*

# 日志级别
LOG_LEVEL=info

# 后端服务注册（至少配置一个）
HALOLIGHT_API_PYTHON_URL=http://localhost:8000
HALOLIGHT_API_BUN_URL=http://localhost:3000
HALOLIGHT_API_JAVA_URL=http://localhost:8080
HALOLIGHT_API_NESTJS_URL=http://localhost:3001
HALOLIGHT_API_NODE_URL=http://localhost:3003
HALOLIGHT_API_GO_URL=http://localhost:8081
```

### 数据库初始化

无需数据库 (API 网关不直接操作数据库)。

### 启动服务

```bash
# 开发模式（热重载）
pnpm dev

# 生产模式
pnpm build
pnpm start
```

访问 http://localhost:3002

## 项目结构

```
halolight-bff/
├── src/
│   ├── index.ts              # 应用入口
│   ├── server.ts             # Express 服务器 + tRPC 适配器
│   ├── trpc.ts               # tRPC 实例和 procedure 定义
│   ├── context.ts            # Context 创建（用户、追踪、服务）
│   ├── routers/
│   │   ├── index.ts          # 根 router（组合所有模块）
│   │   ├── auth.ts           # 认证模块（8 个端点）
│   │   ├── users.ts          # 用户管理（8 个端点）
│   │   ├── dashboard.ts      # 仪表盘统计（9 个端点）
│   │   ├── permissions.ts    # 权限管理（7 个端点）
│   │   ├── roles.ts          # 角色管理（8 个端点）
│   │   ├── teams.ts          # 团队管理（9 个端点）
│   │   ├── folders.ts        # 文件夹管理（8 个端点）
│   │   ├── files.ts          # 文件管理（9 个端点）
│   │   ├── documents.ts      # 文档管理（10 个端点）
│   │   ├── calendar.ts       # 日历事件（10 个端点）
│   │   ├── notifications.ts  # 通知（7 个端点）
│   │   └── messages.ts       # 消息/聊天（9 个端点）
│   ├── middleware/
│   │   └── auth.ts           # JWT 认证/授权中间件
│   ├── services/
│   │   ├── httpClient.ts     # HTTP 客户端（后端通信）
│   │   └── serviceRegistry.ts # 后端服务注册表
│   └── schemas/
│       ├── index.ts          # Schema 导出
│       └── common.ts         # 通用 Zod schemas（分页、排序、响应）
├── .env.example              # 环境变量模板
├── .github/workflows/        # CI/CD 配置
├── Dockerfile                # Docker 镜像构建
├── docker-compose.yml        # Docker Compose 配置
├── package.json              # 依赖配置
└── tsconfig.json             # TypeScript 配置
```

## API 模块

HaloLight BFF 提供 **12 个核心业务模块**，覆盖 **100+ tRPC 端点**：

| 模块 | 端点数 | 描述 |
|------|--------|------|
| auth | 8 | 登录、注册、令牌刷新、登出、密码管理 |
| users | 8 | 用户 CRUD、角色/状态管理、个人资料 |
| dashboard | 9 | 统计数据、访问趋势、销售数据、任务、日程 |
| permissions | 7 | 权限 CRUD、树结构、模块权限、批量操作 |
| roles | 8 | 角色 CRUD、权限分配、用户关联 |
| teams | 9 | 团队 CRUD、成员管理、邀请、权限 |
| folders | 8 | 文件夹 CRUD、树结构、移动、面包屑 |
| files | 9 | 文件 CRUD、上传、下载、移动、复制、共享 |
| documents | 10 | 文档 CRUD、版本控制、协作、分享 |
| calendar | 10 | 事件 CRUD、参与者管理、RSVP、提醒 |
| notifications | 7 | 通知列表、未读数、标记已读、批量删除 |
| messages | 9 | 对话管理、消息 CRUD、发送、已读状态 |

### 认证相关端点

| Procedure | 类型 | 描述 | 权限 |
|-----------|------|------|------|
| `auth.login` | mutation | 用户登录 | 公开 |
| `auth.register` | mutation | 用户注册 | 公开 |
| `auth.refresh` | mutation | 刷新令牌 | 公开 |
| `auth.logout` | mutation | 退出登录 | 需认证 |
| `auth.forgotPassword` | mutation | 忘记密码 | 公开 |
| `auth.resetPassword` | mutation | 重置密码 | 公开 |
| `auth.verifyEmail` | mutation | 验证邮箱 | 公开 |
| `auth.changePassword` | mutation | 修改密码 | 需认证 |

### 用户管理端点

| Procedure | 类型 | 描述 | 权限 |
|-----------|------|------|------|
| `users.list` | query | 获取用户列表 | `users:view` |
| `users.byId` | query | 获取用户详情 | `users:view` |
| `users.me` | query | 获取当前用户 | 需认证 |
| `users.create` | mutation | 创建用户 | `users:create` |
| `users.update` | mutation | 更新用户 | `users:update` |
| `users.delete` | mutation | 删除用户 | `users:delete` |
| `users.updateRole` | mutation | 更新用户角色 | `users:update` |
| `users.updateStatus` | mutation | 更新用户状态 | `users:update` |

### 完整端点清单

#### 仪表盘 (Dashboard) - 9 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `dashboard.getStats` | query | 统计数据（用户、文档、文件、任务） |
| `dashboard.getVisits` | query | 访问趋势（7天/30天） |
| `dashboard.getSales` | query | 销售数据（折线图） |
| `dashboard.getPieData` | query | 饼图数据（分类占比） |
| `dashboard.getTasks` | query | 待办任务列表 |
| `dashboard.getCalendar` | query | 今日日程 |
| `dashboard.getActivities` | query | 最近活动 |
| `dashboard.getNotifications` | query | 最新通知 |
| `dashboard.getProgress` | query | 项目进度 |

#### 权限管理 (Permissions) - 7 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `permissions.list` | query | 获取权限列表 |
| `permissions.tree` | query | 获取权限树 |
| `permissions.byId` | query | 获取权限详情 |
| `permissions.create` | mutation | 创建权限 |
| `permissions.update` | mutation | 更新权限 |
| `permissions.delete` | mutation | 删除权限 |
| `permissions.modules` | query | 获取权限模块 |

#### 角色管理 (Roles) - 8 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `roles.list` | query | 获取角色列表 |
| `roles.byId` | query | 获取角色详情 |
| `roles.create` | mutation | 创建角色 |
| `roles.update` | mutation | 更新角色 |
| `roles.delete` | mutation | 删除角色 |
| `roles.assignPermissions` | mutation | 分配权限 |
| `roles.removePermissions` | mutation | 移除权限 |
| `roles.users` | query | 获取角色下的用户 |

#### 团队管理 (Teams) - 9 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `teams.list` | query | 获取团队列表 |
| `teams.byId` | query | 获取团队详情 |
| `teams.create` | mutation | 创建团队 |
| `teams.update` | mutation | 更新团队 |
| `teams.delete` | mutation | 删除团队 |
| `teams.addMember` | mutation | 添加成员 |
| `teams.removeMember` | mutation | 移除成员 |
| `teams.updateMemberRole` | mutation | 更新成员角色 |
| `teams.members` | query | 获取团队成员 |

#### 文件夹管理 (Folders) - 8 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `folders.list` | query | 获取文件夹列表 |
| `folders.tree` | query | 获取文件夹树 |
| `folders.byId` | query | 获取文件夹详情 |
| `folders.create` | mutation | 创建文件夹 |
| `folders.update` | mutation | 更新文件夹 |
| `folders.delete` | mutation | 删除文件夹 |
| `folders.move` | mutation | 移动文件夹 |
| `folders.breadcrumb` | query | 获取面包屑路径 |

#### 文件管理 (Files) - 9 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `files.list` | query | 获取文件列表 |
| `files.byId` | query | 获取文件详情 |
| `files.upload` | mutation | 上传文件 |
| `files.update` | mutation | 更新文件信息 |
| `files.delete` | mutation | 删除文件 |
| `files.move` | mutation | 移动文件 |
| `files.copy` | mutation | 复制文件 |
| `files.download` | query | 获取下载链接 |
| `files.share` | mutation | 共享文件 |

#### 文档管理 (Documents) - 10 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `documents.list` | query | 获取文档列表 |
| `documents.byId` | query | 获取文档详情 |
| `documents.create` | mutation | 创建文档 |
| `documents.update` | mutation | 更新文档 |
| `documents.delete` | mutation | 删除文档 |
| `documents.versions` | query | 获取版本历史 |
| `documents.restore` | mutation | 恢复版本 |
| `documents.share` | mutation | 共享文档 |
| `documents.unshare` | mutation | 取消共享 |
| `documents.collaborators` | query | 获取协作者 |

#### 日历管理 (Calendar) - 10 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `calendar.events` | query | 获取日程列表 |
| `calendar.byId` | query | 获取日程详情 |
| `calendar.create` | mutation | 创建日程 |
| `calendar.update` | mutation | 更新日程 |
| `calendar.delete` | mutation | 删除日程 |
| `calendar.addAttendee` | mutation | 添加参与者 |
| `calendar.removeAttendee` | mutation | 移除参与者 |
| `calendar.rsvp` | mutation | RSVP 响应 |
| `calendar.setReminder` | mutation | 设置提醒 |
| `calendar.byMonth` | query | 按月获取日程 |

#### 通知管理 (Notifications) - 7 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `notifications.list` | query | 获取通知列表 |
| `notifications.unreadCount` | query | 获取未读数 |
| `notifications.markRead` | mutation | 标记已读 |
| `notifications.markAllRead` | mutation | 全部已读 |
| `notifications.delete` | mutation | 删除通知 |
| `notifications.deleteAll` | mutation | 删除全部 |
| `notifications.preferences` | query | 获取通知偏好 |

#### 消息管理 (Messages) - 9 个端点

| Procedure | 类型 | 描述 |
|-----------|------|------|
| `messages.conversations` | query | 获取对话列表 |
| `messages.byConversation` | query | 获取对话消息 |
| `messages.send` | mutation | 发送消息 |
| `messages.markRead` | mutation | 标记已读 |
| `messages.delete` | mutation | 删除消息 |
| `messages.createConversation` | mutation | 创建对话 |
| `messages.deleteConversation` | mutation | 删除对话 |
| `messages.search` | query | 搜索消息 |
| `messages.unreadCount` | query | 获取未读数 |

## 核心概念

### tRPC Procedures

tRPC 提供三种 procedure 类型：

```typescript
// 公开端点 - 无需认证
export const publicProcedure = t.procedure;

// 受保护端点 - 需要有效 JWT
export const protectedProcedure = t.procedure.use(isAuthenticated);

// 管理员端点 - 需要 admin 角色
export const adminProcedure = t.procedure.use(isAdmin);
```

**使用示例**：

```typescript
export const usersRouter = router({
  // Query - 查询数据
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      keyword: z.string().optional(),
    }))
    .query(async ({ input, ctx }) => {
      // ctx.user 包含已认证用户信息
      const client = ctx.services.getDefault();
      const data = await client.get('/api/users', { query: input });
      return { code: 200, message: 'success', data };
    }),

  // Mutation - 修改数据
  create: adminProcedure
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      role: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.post('/api/users', { body: input });
      return { code: 201, message: 'Created', data };
    }),
});
```

### Context

每个请求都会创建一个独立的 context：

```typescript
interface Context {
  req: Request;                    // Express 请求对象
  res: Response;                   // Express 响应对象
  user: JWTPayload | null;         // 已认证用户（通过 JWT）
  traceId: string;                 // 分布式追踪 ID（UUID）
  services: ServiceRegistry;       // 后端服务注册表
}
```

**Context 创建流程**：

1. 解析 `Authorization` 头中的 JWT Token
2. 验证 Token 有效性，提取用户信息
3. 生成唯一的 `traceId` (用于分布式追踪)
4. 注入 `ServiceRegistry` (后端服务集合)

### JWT Token 结构

```typescript
interface JWTPayload {
  id: string;                      // 用户 ID
  name: string;                    // 用户名
  email: string;                   // 邮箱
  role: {
    id: string;                    // 角色 ID
    name: string;                  // 角色名称（如 admin, user）
    label: string;                 // 角色显示名称
    permissions: string[];         // 权限列表（如 ["users:*", "documents:view"]）
  };
}
```

**Token 使用**：

```typescript
// 客户端发送请求
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// 服务端自动解析并注入到 ctx.user
const userId = ctx.user.id;
const userPermissions = ctx.user.role.permissions;
```

### 权限系统

支持灵活的通配符权限匹配：

| 权限格式 | 说明 | 示例 |
|----------|------|------|
| `*` | 所有权限（超级管理员） | 可执行任何操作 |
| `{resource}:*` | 模块所有操作 | `users:*` = 用户模块所有权限 |
| `{resource}:{action}` | 特定操作 | `users:view` = 仅查看用户 |

**权限检查示例**：

```typescript
// 在 middleware 中检查权限
export const requirePermission = (permission: string) => {
  return t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const hasPermission = ctx.user.role.permissions.some(p =>
      p === '*' ||
      p === permission ||
      (p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    );

    if (!hasPermission) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    return next();
  });
};

// 使用
export const deleteUser = protectedProcedure
  .use(requirePermission('users:delete'))
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    // 只有拥有 users:delete 权限的用户可以执行
  });
```

### 服务注册与发现

通过环境变量配置多个后端服务：

```bash
# Python FastAPI
HALOLIGHT_API_PYTHON_URL=http://api-python:8000

# Bun Hono
HALOLIGHT_API_BUN_URL=http://api-bun:3000

# Java Spring Boot
HALOLIGHT_API_JAVA_URL=http://api-java:8080

# Go Fiber
HALOLIGHT_API_GO_URL=http://api-go:8081
```

**服务优先级**：按配置顺序，第一个可用的服务作为默认服务。

**使用示例**：

```typescript
// 使用默认服务（优先级最高的）
const client = ctx.services.getDefault();
const data = await client.get('/api/users');

// 使用特定服务
const pythonClient = ctx.services.get('python');
const stats = await pythonClient.get('/api/dashboard/stats');

// 故障转移：如果默认服务不可用，自动切换到下一个服务
try {
  const data = await ctx.services.getDefault().get('/api/users');
} catch (error) {
  // ServiceRegistry 自动重试其他服务
}
```

### 响应格式

所有 API 遵循统一的响应结构：

```typescript
// 标准响应
interface APIResponse<T> {
  code: number;        // HTTP 状态码（200, 201, 400, 500...）
  message: string;     // 人类可读消息（success, error, ...）
  data: T | null;      // 响应数据（成功时）或 null（失败时）
}

// 分页响应
interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: {
    list: T[];         // 数据列表
    total: number;     // 总记录数
    page: number;      // 当前页码
    limit: number;     // 每页条数
    totalPages?: number; // 总页数（可选）
  };
}
```

**示例**：

```typescript
// 成功响应
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

// 分页响应
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [{ "id": "1", "name": "User 1" }],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}

// 错误响应（tRPC 自动格式化）
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Not authenticated"
  }
}
```

## 认证机制

### JWT 双令牌

```
Access Token:  15 分钟有效期，用于 API 请求
Refresh Token: 7 天有效期，用于刷新 Access Token
```

### 请求头

```http
Authorization: Bearer <access_token>
```

### 刷新流程

```typescript
// 客户端示例
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const result = await trpc.auth.refresh.mutate({ refreshToken });

  localStorage.setItem('accessToken', result.data.accessToken);
  localStorage.setItem('refreshToken', result.data.refreshToken);

  return result.data.accessToken;
};

// tRPC 客户端配置 - 自动刷新
const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      async headers() {
        let token = localStorage.getItem('accessToken');

        // 如果 token 过期，自动刷新
        if (isTokenExpired(token)) {
          token = await refreshToken();
        }

        return {
          authorization: `Bearer ${token}`,
        };
      },
    }),
  ],
});
```

## 错误处理

### tRPC 错误类型

```typescript
import { TRPCError } from '@trpc/server';

// 400 - 请求参数错误
throw new TRPCError({
  code: 'BAD_REQUEST',
  message: 'Invalid input',
});

// 401 - 未认证
throw new TRPCError({
  code: 'UNAUTHORIZED',
  message: 'Not authenticated',
});

// 403 - 无权限
throw new TRPCError({
  code: 'FORBIDDEN',
  message: 'Insufficient permissions',
});

// 404 - 资源不存在
throw new TRPCError({
  code: 'NOT_FOUND',
  message: 'Resource not found',
});

// 409 - 资源冲突
throw new TRPCError({
  code: 'CONFLICT',
  message: 'Email already exists',
});

// 500 - 服务器错误
throw new TRPCError({
  code: 'INTERNAL_SERVER_ERROR',
  message: 'Something went wrong',
});
```

### 错误响应格式

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Not authenticated",
    "data": {
      "code": "UNAUTHORIZED",
      "httpStatus": 401,
      "path": "auth.login"
    }
  }
}
```

## 客户端使用

### React + @tanstack/react-query

```typescript
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from 'halolight-bff';

// 创建 tRPC React hooks
const trpc = createTRPCReact<AppRouter>();

// 创建 tRPC 客户端
const trpcClient = trpc.createClient({
  transformer: superjson, // 支持 Date、Map、Set 等复杂类型
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      headers() {
        return {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        };
      },
    }),
  ],
});

// 创建 React Query 客户端
const queryClient = new QueryClient();

// 根组件
function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserList />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

// 使用 tRPC hooks
function UserList() {
  // Query - 自动管理加载状态、缓存、重新获取
  const { data, isLoading, error } = trpc.users.list.useQuery({
    page: 1,
    limit: 10,
  });

  // Mutation - 自动管理加载状态、错误处理
  const createUser = trpc.users.create.useMutation({
    onSuccess: () => {
      // 自动刷新用户列表
      trpc.users.list.invalidate();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => createUser.mutate({
        name: 'New User',
        email: 'new@example.com',
        role: 'user',
      })}>
        Create User
      </button>

      {data?.data.list.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Next.js App Router

```typescript
// app/api/trpc/[trpc]/route.ts - tRPC API 路由
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };

// app/providers.tsx - tRPC Provider
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';
import type { AppRouter } from '@/server/routers';

const trpc = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

// app/page.tsx - Server Component
import { createCaller } from '@/server/routers';

export default async function Page() {
  const caller = createCaller({ req: {}, res: {}, user: null });
  const stats = await caller.dashboard.getStats();

  return <div>Total Users: {stats.data.totalUsers}</div>;
}
```

### Vue 3 + TanStack Query

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import superjson from 'superjson';
import type { AppRouter } from 'halolight-bff';

// 创建 tRPC 客户端
const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      headers() {
        return {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        };
      },
    }),
  ],
});

// 在组件中使用
export default {
  setup() {
    const queryClient = useQueryClient();

    // Query
    const { data, isLoading } = useQuery({
      queryKey: ['users', { page: 1 }],
      queryFn: () => trpc.users.list.query({ page: 1, limit: 10 }),
    });

    // Mutation
    const createUser = useMutation({
      mutationFn: (user) => trpc.users.create.mutate(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });

    return { data, isLoading, createUser };
  },
};
```

### Vanilla TypeScript

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'halolight-bff';
import superjson from 'superjson';

const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      headers() {
        return {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        };
      },
    }),
  ],
});

// 使用（完整类型推导）
const users = await client.users.list.query({ page: 1 });
console.log(users.data.list); // TS 自动推导类型

const newUser = await client.users.create.mutate({
  name: 'John',
  email: 'john@example.com',
  role: 'user',
});
```

## 开发指南

### 添加新 Router

1. **创建新的 router 文件**：

```typescript
// src/routers/products.ts
import { z } from 'zod';
import { router, protectedProcedure, adminProcedure } from '../trpc';

export const productsRouter = router({
  // Query - 获取产品列表
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      category: z.string().optional(),
    }))
    .query(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.get('/api/products', { query: input });
      return { code: 200, message: 'success', data };
    }),

  // Query - 获取产品详情
  byId: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.get(`/api/products/${input.id}`);
      return { code: 200, message: 'success', data };
    }),

  // Mutation - 创建产品（需要管理员权限）
  create: adminProcedure
    .input(z.object({
      name: z.string().min(2),
      price: z.number().positive(),
      category: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.post('/api/products', { body: input });
      return { code: 201, message: 'Created', data };
    }),

  // Mutation - 更新产品
  update: adminProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(2).optional(),
      price: z.number().positive().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;
      const client = ctx.services.getDefault();
      const data = await client.put(`/api/products/${id}`, { body: updateData });
      return { code: 200, message: 'Updated', data };
    }),

  // Mutation - 删除产品
  delete: adminProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      await client.delete(`/api/products/${input.id}`);
      return { code: 200, message: 'Deleted', data: null };
    }),
});
```

2. **在根 router 中注册**：

```typescript
// src/routers/index.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';
import { productsRouter } from './products'; // 导入新 router

export const appRouter = router({
  auth: authRouter,
  users: usersRouter,
  products: productsRouter, // 注册新 router
  // ... 其他 routers
});

export type AppRouter = typeof appRouter;
```

3. **客户端使用**：

```typescript
// 类型自动推导，无需手动定义
const products = await trpc.products.list.query({ page: 1 });
const product = await trpc.products.byId.query({ id: '1' });
const newProduct = await trpc.products.create.mutate({
  name: 'iPhone 15',
  price: 999,
  category: 'electronics',
});
```

### 添加自定义 Middleware

```typescript
// src/middleware/rateLimit.ts
import { TRPCError } from '@trpc/server';
import { t } from '../trpc';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export const rateLimit = (maxRequests: number, windowMs: number) => {
  return t.middleware(({ ctx, next }) => {
    const key = ctx.user?.id || ctx.req.ip;
    const now = Date.now();

    const record = rateLimitMap.get(key);

    if (!record || now > record.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Rate limit exceeded',
      });
    }

    record.count++;
    return next();
  });
};

// 使用
export const limitedProcedure = protectedProcedure.use(
  rateLimit(10, 60000) // 每分钟最多 10 个请求
);
```

### 添加 Schema 验证

```typescript
// src/schemas/product.ts
import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(100),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'books']),
  stock: z.number().int().nonnegative(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = createProductSchema.partial();

// 在 router 中使用
export const productsRouter = router({
  create: adminProcedure
    .input(createProductSchema)
    .mutation(async ({ input, ctx }) => {
      // input 已经过 Zod 验证，类型安全
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      data: updateProductSchema,
    }))
    .mutation(async ({ input, ctx }) => {
      // ...
    }),
});
```

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（热重载）
pnpm dev:watch        # 启动开发服务器（文件监听）

# 构建
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器

# 测试
pnpm test             # 运行测试
pnpm test:watch       # 监听模式运行测试
pnpm test:coverage    # 生成测试覆盖率

# 代码质量
pnpm lint             # 运行 ESLint
pnpm lint:fix         # 自动修复 lint 错误
pnpm type-check       # TypeScript 类型检查
pnpm format           # Prettier 格式化代码
```

## 部署

### Docker

```bash
# 构建镜像
docker build -t halolight-bff .

# 运行容器
docker run -p 3002:3002 \
  -e JWT_SECRET=your-secret-key \
  -e HALOLIGHT_API_PYTHON_URL=http://api-python:8000 \
  halolight-bff
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  bff:
    build: .
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - HALOLIGHT_API_PYTHON_URL=http://api-python:8000
      - HALOLIGHT_API_BUN_URL=http://api-bun:3000
      - HALOLIGHT_API_JAVA_URL=http://api-java:8080
    depends_on:
      - api-python
      - api-bun
      - api-java
    restart: unless-stopped

  api-python:
    image: halolight-api-python
    ports:
      - "8000:8000"

  api-bun:
    image: halolight-api-bun
    ports:
      - "3000:3000"

  api-java:
    image: halolight-api-java
    ports:
      - "8080:8080"
```

```bash
docker-compose up -d
```

### 生产环境配置

```env
NODE_ENV=production
PORT=3002
HOST=0.0.0.0

# 强密钥（至少 32 字符）
JWT_SECRET=your-production-secret-key-with-at-least-32-characters
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# 限制 CORS
CORS_ORIGIN=https://your-frontend.com

# 生产日志
LOG_LEVEL=warn

# 后端服务
HALOLIGHT_API_PYTHON_URL=https://api-python.production.com
HALOLIGHT_API_BUN_URL=https://api-bun.production.com
HALOLIGHT_API_JAVA_URL=https://api-java.production.com
```

## 性能优化

### 1。启用请求批处理

tRPC 自动批处理多个并发请求，减少网络开销：

```typescript
// 客户端配置
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3002/trpc',
      maxURLLength: 2083, // 最大 URL 长度
    }),
  ],
});

// 这三个请求会自动批处理为一个 HTTP 请求
const [users, stats, notifications] = await Promise.all([
  trpc.users.list.query({ page: 1 }),
  trpc.dashboard.getStats.query(),
  trpc.notifications.unreadCount.query(),
]);
```

### 2。使用 DataLoader 避免 N+1 查询

```typescript
import DataLoader from 'dataloader';

// 创建 DataLoader
const userLoader = new DataLoader(async (ids: string[]) => {
  const users = await db.user.findMany({
    where: { id: { in: ids } },
  });
  return ids.map(id => users.find(u => u.id === id));
});

// 在 context 中注入
export const createContext = (opts: CreateExpressContextOptions) => {
  return {
    ...opts,
    loaders: {
      user: userLoader,
    },
  };
};

// 在 router 中使用
export const postsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const posts = await db.post.findMany();

    // 批量加载作者信息，避免 N+1 查询
    const postsWithAuthors = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        author: await ctx.loaders.user.load(post.authorId),
      }))
    );

    return postsWithAuthors;
  }),
});
```

### 3。缓存策略

```typescript
// 使用 Redis 缓存
import Redis from 'ioredis';

const redis = new Redis();

export const dashboardRouter = router({
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const cacheKey = `dashboard:stats:${ctx.user.id}`;

    // 尝试从缓存获取
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 从后端服务获取
    const client = ctx.services.getDefault();
    const data = await client.get('/api/dashboard/stats');

    // 缓存 5 分钟
    await redis.setex(cacheKey, 300, JSON.stringify(data));

    return data;
  }),
});
```

### 4。限流保护

```typescript
import rateLimit from 'express-rate-limit';

// 在 Express 中配置全局限流
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 最多 100 个请求
  message: 'Too many requests from this IP',
});

app.use('/trpc', limiter);
```

## 安全建议

### 1。使用强 JWT 密钥

```bash
# 生成强密钥（至少 32 字符）
openssl rand -base64 32

# 在 .env 中配置
JWT_SECRET=your-generated-secret-key-with-at-least-32-characters
```

### 2。启用 HTTPS

```typescript
// 在生产环境强制使用 HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}
```

### 3。限制 CORS

```bash
# 只允许特定源
CORS_ORIGIN=https://your-frontend.com

# 或多个源（逗号分隔）
CORS_ORIGIN=https://app1.com,https://app2.com
```

### 4。输入验证

```typescript
// 使用 Zod 严格验证所有输入
export const createUser = protectedProcedure
  .input(z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    age: z.number().int().positive().max(150),
    role: z.enum(['admin', 'user']),
  }))
  .mutation(async ({ input, ctx }) => {
    // input 已经过严格验证
  });
```

### 5。日志脱敏

```typescript
// 使用 Pino redact 配置
const logger = pino({
  redact: {
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.token',
      'res.headers["set-cookie"]',
    ],
    remove: true, // 完全移除敏感字段
  },
});
```

## 可观测性

### 日志系统

```typescript
// 使用 Pino 结构化日志
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

// HTTP 请求日志
app.use(pinoHttp({ logger }));

// 在 router 中使用
export const usersRouter = router({
  create: adminProcedure.mutation(async ({ input, ctx }) => {
    logger.info({ userId: ctx.user.id, input }, 'Creating user');

    try {
      const data = await createUser(input);
      logger.info({ userId: ctx.user.id, data }, 'User created');
      return data;
    } catch (error) {
      logger.error({ userId: ctx.user.id, error }, 'Failed to create user');
      throw error;
    }
  }),
});
```

### 健康检查

```typescript
// 健康检查端点
app.get('/health', async (req, res) => {
  try {
    // 检查后端服务连接
    const services = await Promise.all([
      fetch(`${process.env.HALOLIGHT_API_PYTHON_URL}/health`),
      fetch(`${process.env.HALOLIGHT_API_BUN_URL}/health`),
    ]);

    const allHealthy = services.every(s => s.ok);

    res.status(allHealthy ? 200 : 503).json({
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        python: services[0].ok,
        bun: services[1].ok,
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});
```

### 监控指标

```typescript
// Prometheus 指标
import promClient from 'prom-client';

// 创建注册表
const register = new promClient.Registry();

// 收集默认指标
promClient.collectDefaultMetrics({ register });

// 自定义指标
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// 暴露指标端点
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## 常见问题

### Q：端口已被占用

**A**：修改 `.env` 中的 `PORT` 配置，或者终止占用端口的进程：

```bash
# 查找占用端口的进程
lsof -i :3002

# 终止进程
kill -9 <PID>

# 或修改端口
echo "PORT=3003" >> .env
```

### Q：CORS 错误

**A**：更新 `.env` 中的 `CORS_ORIGIN` 为允许的源地址：

```bash
# 开发环境允许所有源
CORS_ORIGIN=*

# 生产环境指定源
CORS_ORIGIN=https://your-frontend.com
```

### Q：Token 验证失败

**A**：确保 `JWT_SECRET` 在所有环境中保持一致：

```bash
# 检查 JWT_SECRET 是否一致
echo $JWT_SECRET

# 重新生成 Token
curl -X POST http://localhost:3002/trpc/auth.login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### Q：后端服务连接失败

**A**：检查后端服务是否正常运行，以及 URL 配置是否正确：

```bash
# 检查服务健康状态
curl http://localhost:8000/health
curl http://localhost:3000/health

# 检查环境变量
echo $HALOLIGHT_API_PYTHON_URL
echo $HALOLIGHT_API_BUN_URL

# 测试连接
curl http://localhost:3002/health
```

### Q：类型推导不工作

**A**：确保正确导出 `AppRouter` 类型，并在客户端正确引入：

```typescript
// 服务端 - src/routers/index.ts
export const appRouter = router({
  // ... routers
});

export type AppRouter = typeof appRouter; // 必须导出类型

// 客户端 - 确保从正确的路径导入
import type { AppRouter } from 'halolight-bff'; // NPM 包
// 或
import type { AppRouter } from '@/server/routers'; // Monorepo
```

## 与其他网关对比

| 特性 | tRPC BFF | GraphQL | REST API | gRPC |
|------|----------|---------|----------|------|
| 类型安全 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 开发体验 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| 性能 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| 生态系统 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 文档 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 相关链接

- [API 文档](https://halolight-bff.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-bff)
- [tRPC 官方文档](https://trpc.io/docs)
- [Zod 文档](https://zod.dev/)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
