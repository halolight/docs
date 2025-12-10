# tRPC BFF Gateway

HaloLight BFF (Backend for Frontend) Gateway，基于 tRPC 11 + Express 5 构建的类型安全 API 网关，为前端应用提供统一的类型安全接口。

## 特性

- **端到端类型安全** - tRPC 提供从服务器到客户端的完整类型推导
- **零运行时开销** - 编译时类型检查，运行时零额外开销
- **JWT 认证授权** - 内置 JWT Token 验证和 RBAC 权限控制
- **Zod 数据验证** - 所有输入自动验证，详细的错误消息
- **服务注册发现** - 支持多个后端服务，自动故障转移
- **请求追踪日志** - 分布式追踪支持，Trace ID 自动传播
- **SuperJSON 序列化** - 自动处理 Date、Map、Set、BigInt 等复杂类型
- **完整文档** - 类 Swagger UI 的交互式文档

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | tRPC 11 + Express 5 |
| 语言 | TypeScript 5.9 |
| 验证 | Zod |
| 序列化 | SuperJSON |
| 认证 | JWT (jsonwebtoken) |
| 日志 | Pino + pino-http |
| 安全 | Helmet + CORS |
| 运行时 | Node.js 20+ |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-bff.git
cd halolight-bff

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件配置 JWT 密钥和后端服务地址

# 运行开发服务器
pnpm dev

# 构建生产版本
pnpm build
pnpm start
```

## 项目结构

```
halolight-bff/
├── src/
│   ├── index.ts              # 入口文件
│   ├── server.ts             # Express 服务器 + tRPC 适配器
│   ├── trpc.ts               # tRPC 实例和 procedures
│   ├── context.ts            # Context 创建（用户、traceId、服务）
│   ├── schemas/
│   │   ├── index.ts          # Schema 导出
│   │   └── common.ts         # 通用 Zod schemas（分页、排序、响应）
│   ├── services/
│   │   ├── index.ts          # Service 导出
│   │   ├── httpClient.ts     # HTTP 客户端（后端服务）
│   │   └── serviceRegistry.ts # 后端服务注册表
│   ├── routers/
│   │   ├── index.ts          # 根 router（组合所有 routers）
│   │   ├── auth.ts           # 认证（8 个端点）
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
│   └── middleware/
│       └── auth.ts           # 认证/授权中间件
├── .env.example              # 环境变量示例
├── .github/workflows/        # CI/CD 配置
├── Dockerfile                # Docker 镜像构建
├── package.json              # 依赖配置
└── tsconfig.json             # TypeScript 配置
```

## API 模块

HaloLight BFF 提供 **12 个核心业务模块**，覆盖 **100+ API 端点**：

| 模块 | 端点数 | 描述 |
|------|--------|------|
| auth | 8 | 登录、注册、令牌刷新、登出、密码管理 |
| users | 8 | 用户 CRUD、角色/状态管理 |
| dashboard | 9 | 统计数据、趋势、活动、任务 |
| permissions | 7 | 权限 CRUD、树结构、模块 |
| roles | 8 | 角色 CRUD、权限分配 |
| teams | 9 | 团队 CRUD、成员管理 |
| folders | 8 | 文件夹 CRUD、树、移动、面包屑 |
| files | 9 | 文件 CRUD、上传、下载、移动、复制 |
| documents | 10 | 文档 CRUD、版本、分享 |
| calendar | 10 | 事件 CRUD、参与者、RSVP |
| notifications | 7 | 列表、未读数、标记已读、删除 |
| messages | 9 | 对话、消息、发送、已读状态 |

## 核心概念

### tRPC Procedures

tRPC 提供三种 procedure 类型：

- **publicProcedure** - 公开端点，无需认证
- **protectedProcedure** - 受保护端点，需要有效 JWT token
- **adminProcedure** - 管理员端点，需要 admin 角色

```typescript
// 示例：创建受保护的端点
export const usersRouter = router({
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ input, ctx }) => {
      // ctx.user 包含已认证用户信息
      // 调用后端服务获取数据
      const client = ctx.services.getDefault();
      const data = await client.get('/api/users', { query: input });
      return { code: 200, message: 'success', data };
    }),
});
```

### Context

每个请求都会创建一个 context，包含：

```typescript
interface Context {
  req: Request;                    // Express request
  res: Response;                   // Express response
  user: JWTPayload | null;         // 已认证用户（如果有）
  traceId: string;                 // 分布式追踪 ID
  services: ServiceRegistry;       // 后端服务注册表
}
```

### JWT Token 结构

```typescript
interface JWTPayload {
  id: string;                      // 用户 ID
  name: string;                    // 用户名
  email: string;                   // 邮箱
  role: {
    id: string;                    // 角色 ID
    name: string;                  // 角色名称
    label: string;                 // 角色标签
    permissions: string[];         // 权限列表
  };
}
```

### 权限系统

支持通配符权限：

- `*` - 所有权限 (超级管理员)
- `users:*` - 用户模块所有操作
- `users:view` - 仅查看用户
- `users:create` - 仅创建用户

### 服务注册

通过环境变量配置多个后端服务：

```bash
HALOLIGHT_API_PYTHON_URL=http://api-python:8000
HALOLIGHT_API_BUN_URL=http://api-bun:3000
HALOLIGHT_API_JAVA_URL=http://api-java:8080
```

在代码中使用：

```typescript
// 使用默认服务（优先级最高的）
const client = ctx.services.getDefault();

// 使用特定服务
const pythonClient = ctx.services.get('python');
```

## 响应格式

所有 API 遵循统一的响应格式：

```typescript
// 标准响应
interface APIResponse<T> {
  code: number;        // HTTP 状态码
  message: string;     // 人类可读消息
  data: T | null;      // 响应数据
}

// 分页响应
interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: {
    list: T[];
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
  };
}
```

## 环境变量

### 必需配置

```bash
# JWT 密钥（生产环境必须修改）
JWT_SECRET=your-secret-key-at-least-32-characters-long

# 服务器端口
PORT=3002
```

### 可选配置

```bash
# 服务器配置
HOST=0.0.0.0
NODE_ENV=development

# CORS 配置
CORS_ORIGIN=*

# JWT 配置
JWT_EXPIRES_IN=7d

# 日志级别
LOG_LEVEL=info

# 后端服务（至少配置一个）
HALOLIGHT_API_PYTHON_URL=http://localhost:8000
HALOLIGHT_API_BUN_URL=http://localhost:3000
HALOLIGHT_API_JAVA_URL=http://localhost:8080
HALOLIGHT_API_NESTJS_URL=http://localhost:3001
HALOLIGHT_API_NODE_URL=http://localhost:3003
HALOLIGHT_API_GO_URL=http://localhost:8081
```

## 客户端使用

### React + @tanstack/react-query

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'halolight-bff';

const trpc = createTRPCReact<AppRouter>();

function UserList() {
  const { data, isLoading } = trpc.users.list.useQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.data.list.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Next.js App Router

```typescript
// Server Component
import { createCaller } from '@trpc/server';
import { appRouter } from './routers';

export default async function Page() {
  const caller = createCaller({ req: {}, res: {}, user: null });
  const data = await caller.dashboard.getStats();

  return <div>{JSON.stringify(data)}</div>;
}
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

// 使用
const users = await client.users.list.query({ page: 1 });
```

## 开发指南

### 添加新 Router

1. 创建新的 router 文件：

```typescript
// src/routers/products.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const productsRouter = router({
  list: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ input, ctx }) => {
      const client = ctx.services.getDefault();
      const data = await client.get('/api/products', { query: input });
      return { code: 200, message: 'success', data };
    }),
});
```

2. 在根 router 中注册：

```typescript
// src/routers/index.ts
import { productsRouter } from './products';

export const appRouter = router({
  // ... 现有 routers
  products: productsRouter,
});
```

### 错误处理

使用 tRPC 的错误类型：

```typescript
import { TRPCError } from '@trpc/server';

throw new TRPCError({
  code: 'UNAUTHORIZED',
  message: 'Not authenticated',
}); // 401

throw new TRPCError({
  code: 'FORBIDDEN',
  message: 'Insufficient permissions',
}); // 403

throw new TRPCError({
  code: 'NOT_FOUND',
  message: 'Resource not found',
}); // 404
```

## Docker 部署

### 使用 Docker

```bash
# 构建镜像
docker build -t halolight-bff .

# 运行容器
docker run -p 3002:3002 \
  -e JWT_SECRET=your-secret-key \
  -e HALOLIGHT_API_PYTHON_URL=http://api-python:8000 \
  halolight-bff
```

### 使用 Docker Compose

```yaml
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
    depends_on:
      - api-python
```

## 测试

```bash
# 运行类型检查
pnpm type-check

# 运行 linter
pnpm lint

# 格式化代码
pnpm format
```

## 性能优化

1. **启用批处理** - tRPC 自动批处理多个请求
2. **使用 DataLoader** - 避免 N+1 查询问题
3. **缓存策略** - 使用 Redis 缓存频繁访问的数据
4. **限流** - 使用 rate limiting 保护 API

## 安全建议

1. **使用强 JWT 密钥** - 至少 32 字符
2. **启用 HTTPS** - 生产环境必须使用 HTTPS
3. **限制 CORS** - 只允许信任的源
4. **输入验证** - 使用 Zod 验证所有输入
5. **日志脱敏** - 不记录敏感信息 (密码、token)

## 常见问题

### 端口已被占用

修改 `.env` 中的 `PORT` 配置，或者终止占用端口的进程。

### CORS 错误

更新 `.env` 中的 `CORS_ORIGIN` 为允许的源地址。

### Token 验证失败

确保 `JWT_SECRET` 在所有环境中保持一致。

## 相关链接

- [tRPC 官方文档](https://trpc.io/docs)
- [Zod 文档](https://zod.dev/)
- [项目仓库](https://github.com/halolight/halolight-bff)
- [在线演示](https://halolight-bff.h7ml.cn)

## 许可证

MIT License
