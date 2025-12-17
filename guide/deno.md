# Deno Fresh 后端 API

HaloLight Deno 后端 API 基于 Fresh 框架和 Deno KV 构建，采用 Deno 原生运行时，提供高性能的 RESTful API 服务。

**API 文档**：[https://halolight-deno.h7ml.cn/docs](https://halolight-deno.h7ml.cn/docs)

**GitHub**：[https://github.com/halolight/halolight-deno](https://github.com/halolight/halolight-deno)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 💾 **Deno KV** - 内置键值存储，无需外部数据库
- ⚡ **Islands 架构** - 部分水合，极致性能
- ✅ **数据验证** - 请求参数校验，错误处理
- 📊 **日志系统** - 请求日志，错误追踪
- 🐳 **Docker 支持** - 容器化部署

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Deno | 2.x | 运行时 (内置 TypeScript) |
| Fresh | 1.x | Deno 原生 Web 框架 |
| Preact | 10.x | 轻量级 UI 库 |
| Deno KV | - | 内置键值存储 (数据库) |
| Hono | 4.x | API 路由框架 (可选) |
| JWT | - | 身份认证 |
| Tailwind CSS | 3.x | 原子化 CSS |

## 快速开始

### 环境要求

- Deno >= 2.0.0

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-deno.git
cd halolight-deno

# 无需安装依赖，Deno 自动管理
```

### 环境变量

```bash
cp .env.example .env
```

```env
# API 配置
API_URL=/api
USE_MOCK=true

# JWT 密钥
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Deno KV (可选，默认使用本地)
DENO_KV_PATH=./data/kv.db

# 服务配置
PORT=8000
NODE_ENV=development

# 演示账号
DEMO_EMAIL=admin@halolight.h7ml.cn
DEMO_PASSWORD=123456
SHOW_DEMO_HINT=false

# 品牌配置
APP_TITLE=Admin Pro
BRAND_NAME=Halolight
```

### 数据库初始化

```bash
# Deno KV 无需迁移，自动创建
# 如需种子数据
deno task seed
```

### 启动服务

```bash
# 开发模式
deno task dev

# 生产模式
deno task build
deno task start
```

访问 http://localhost:8000

## 项目结构

```
halolight-deno/
├── routes/                  # 路由处理
│   ├── api/                 # API 端点
│   │   ├── auth/            # 认证路由
│   │   ├── users/           # 用户路由
│   │   ├── dashboard/       # 仪表盘路由
│   │   ├── documents/       # 文档路由
│   │   ├── files/           # 文件路由
│   │   ├── messages/        # 消息路由
│   │   ├── notifications/   # 通知路由
│   │   └── calendar/        # 日历路由
│   ├── (auth)/              # 认证页面
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   └── (dashboard)/         # 仪表盘页面
│       ├── index.tsx
│       ├── users.tsx
│       └── settings.tsx
├── utils/                   # 工具函数
│   ├── auth.ts              # 认证工具
│   ├── kv.ts                # Deno KV 封装
│   ├── permissions.ts       # 权限检查
│   ├── jwt.ts               # JWT 工具
│   └── validation.ts        # 数据验证
├── islands/                 # 交互式组件 (客户端)
│   ├── AuthProvider.tsx
│   ├── ThemeToggle.tsx
│   └── Dashboard.tsx
├── components/              # UI 组件
│   ├── ui/
│   ├── layout/
│   └── dashboard/
├── static/                  # 静态资源
├── fresh.gen.ts             # Fresh 生成文件
├── fresh.config.ts          # Fresh 配置
├── deno.json                # Deno 配置
└── import_map.json          # 导入映射
```

## API 模块

### 认证相关端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/auth/login` | 用户登录 | 公开 |
| POST | `/api/auth/register` | 用户注册 | 公开 |
| POST | `/api/auth/refresh` | 刷新令牌 | 公开 |
| POST | `/api/auth/logout` | 退出登录 | 需认证 |
| POST | `/api/auth/forgot-password` | 忘记密码 | 公开 |
| POST | `/api/auth/reset-password` | 重置密码 | 公开 |

### 用户管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/users` | 获取用户列表 | `users:view` |
| GET | `/api/users/:id` | 获取用户详情 | `users:view` |
| POST | `/api/users` | 创建用户 | `users:create` |
| PUT | `/api/users/:id` | 更新用户 | `users:update` |
| DELETE | `/api/users/:id` | 删除用户 | `users:delete` |
| GET | `/api/users/me` | 获取当前用户 | 需认证 |

### 完整端点清单

#### 文档管理 (Documents) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/documents` | 获取文档列表 |
| GET | `/api/documents/:id` | 获取文档详情 |
| POST | `/api/documents` | 创建文档 |
| PUT | `/api/documents/:id` | 更新文档 |
| DELETE | `/api/documents/:id` | 删除文档 |

#### 文件管理 (Files) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/files` | 获取文件列表 |
| GET | `/api/files/:id` | 获取文件详情 |
| POST | `/api/files/upload` | 上传文件 |
| PUT | `/api/files/:id` | 更新文件信息 |
| DELETE | `/api/files/:id` | 删除文件 |

#### 消息管理 (Messages) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/messages` | 获取消息列表 |
| GET | `/api/messages/:id` | 获取消息详情 |
| POST | `/api/messages` | 发送消息 |
| PUT | `/api/messages/:id/read` | 标记已读 |
| DELETE | `/api/messages/:id` | 删除消息 |

#### 通知管理 (Notifications) - 4 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/notifications` | 获取通知列表 |
| PUT | `/api/notifications/:id/read` | 标记已读 |
| PUT | `/api/notifications/read-all` | 全部已读 |
| DELETE | `/api/notifications/:id` | 删除通知 |

#### 日历管理 (Calendar) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/calendar/events` | 获取日程列表 |
| GET | `/api/calendar/events/:id` | 获取日程详情 |
| POST | `/api/calendar/events` | 创建日程 |
| PUT | `/api/calendar/events/:id` | 更新日程 |
| DELETE | `/api/calendar/events/:id` | 删除日程 |

#### 仪表盘 (Dashboard) - 6 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/dashboard/stats` | 统计数据 |
| GET | `/api/dashboard/visits` | 访问趋势 |
| GET | `/api/dashboard/sales` | 销售数据 |
| GET | `/api/dashboard/pie` | 饼图数据 |
| GET | `/api/dashboard/tasks` | 待办任务 |
| GET | `/api/dashboard/calendar` | 今日日程 |

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
// utils/jwt.ts
import { create, verify } from "https://deno.land/x/djwt@v3.0.0/mod.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);

export async function createAccessToken(userId: string): Promise<string> {
  return await create(
    { alg: "HS256", typ: "JWT" },
    { userId, exp: Date.now() + 15 * 60 * 1000 }, // 15分钟
    key,
  );
}

export async function refreshToken(refreshToken: string): Promise<string> {
  const payload = await verify(refreshToken, key);
  return await createAccessToken(payload.userId as string);
}
```

## 权限系统

### 角色定义

| 角色 | 说明 | 权限 |
|------|------|------|
| `super_admin` | 超级管理员 | `*` (所有权限) |
| `admin` | 管理员 | `users:*`, `documents:*`, `files:*`, `messages:*`, `calendar:*` |
| `user` | 普通用户 | `documents:view`, `files:view`, `messages:view`, `calendar:view` |
| `guest` | 访客 | `dashboard:view` |

### 权限格式

```
{resource}:{action}

示例：
- users:view      # 查看用户
- users:create    # 创建用户
- users:*         # 用户所有操作
- *               # 所有权限
```

### 权限检查实现

```typescript
// utils/permissions.ts
export function hasPermission(user: User, permission: string): boolean {
  const userPermissions = user.permissions || [];

  return userPermissions.some((p) => {
    if (p === "*") return true;
    if (p.endsWith(":*")) {
      const resource = p.slice(0, -2);
      return permission.startsWith(resource + ":");
    }
    return p === permission;
  });
}

// 路由中间件
export function requirePermission(permission: string) {
  return async (req: Request, ctx: any) => {
    const user = ctx.state.user;
    if (!hasPermission(user, permission)) {
      return new Response("Forbidden", { status: 403 });
    }
    return await ctx.next();
  };
}
```

## 错误处理

### 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      { "field": "email", "message": "邮箱格式不正确" }
    ]
  }
}
```

### 错误码

| 状态码 | 错误码 | 说明 |
|--------|--------|------|
| 400 | `VALIDATION_ERROR` | 参数验证失败 |
| 401 | `UNAUTHORIZED` | 未授权 |
| 403 | `FORBIDDEN` | 无权限 |
| 404 | `NOT_FOUND` | 资源不存在 |
| 409 | `CONFLICT` | 资源冲突 |
| 500 | `INTERNAL_ERROR` | 服务器错误 |

## 常用命令

```bash
# 开发
deno task dev              # 启动开发服务器 (热重载)

# 构建
deno task build            # 构建生产版本

# 测试
deno test                  # 运行测试
deno test --coverage       # 测试覆盖率

# 数据库
deno task seed             # 初始化种子数据

# 代码质量
deno lint                  # 代码检查
deno fmt                   # 代码格式化
deno check **/*.ts         # 类型检查
```

## 部署

### Docker

```bash
docker build -t halolight-deno .
docker run -p 8000:8000 halolight-deno
```

### Docker Compose

```bash
docker-compose up -d
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - DENO_KV_PATH=/data/kv.db
    volumes:
      - deno_kv_data:/data
    restart: unless-stopped

volumes:
  deno_kv_data:
```

### Deno Deploy (推荐)

```bash
# 安装 deployctl
deno install -Arf jsr:@deno/deployctl

# 部署到 Deno Deploy
deployctl deploy --project=halolight-deno main.ts
```

### 生产环境配置

```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key-min-32-chars
DENO_KV_PATH=/data/kv.db
PORT=8000
```

## 测试

### 运行测试

```bash
deno test                  # 运行所有测试
deno test --coverage       # 生成覆盖率报告
deno test --watch          # 监听模式
```

### 测试示例

```typescript
// routes/api/auth/_test.ts
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

Deno.test("POST /api/auth/login - success", async () => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@halolight.h7ml.cn",
      password: "123456",
    }),
  });

  assertEquals(response.status, 200);
  const data = await response.json();
  assertEquals(data.success, true);
  assertEquals(typeof data.data.accessToken, "string");
});

Deno.test("POST /api/auth/login - invalid credentials", async () => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "wrong@example.com",
      password: "wrong",
    }),
  });

  assertEquals(response.status, 401);
  const data = await response.json();
  assertEquals(data.success, false);
});
```

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | ~45,000 req/s | Deno 2.0, 单核, wrk 测试 |
| 平均响应时间 | <5ms | 本地 Deno KV, 无外部依赖 |
| 内存占用 | ~30MB | 启动后基础内存 |
| CPU 使用率 | <10% | 空闲状态 |

## 可观测性

### 日志系统

```typescript
// utils/logger.ts
import { Logger } from "https://deno.land/std@0.208.0/log/mod.ts";

const logger = new Logger("app");

export function logRequest(req: Request, res: Response, duration: number) {
  logger.info(
    `${req.method} ${new URL(req.url).pathname} ${res.status} ${duration}ms`,
  );
}

export function logError(error: Error, context?: any) {
  logger.error(`Error: ${error.message}`, { error, context });
}
```

### 健康检查

```typescript
// routes/api/health.ts
export const handler = async (req: Request): Promise<Response> => {
  try {
    // 检查 Deno KV 连接
    const kv = await Deno.openKv();
    await kv.get(["health"]);
    await kv.close();

    return Response.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: Deno.memoryUsage(),
    });
  } catch (error) {
    return Response.json(
      { status: "unhealthy", error: error.message },
      { status: 503 },
    );
  }
};
```

### 监控指标

```typescript
// utils/metrics.ts
const metrics = {
  requests: 0,
  errors: 0,
  responseTime: [] as number[],
};

export function recordRequest(duration: number) {
  metrics.requests++;
  metrics.responseTime.push(duration);
}

export function recordError() {
  metrics.errors++;
}

export function getMetrics() {
  const avg = metrics.responseTime.reduce((a, b) => a + b, 0) /
    metrics.responseTime.length;
  return {
    totalRequests: metrics.requests,
    totalErrors: metrics.errors,
    avgResponseTime: avg || 0,
  };
}
```

## 常见问题

### Q：Deno KV 数据如何持久化？

A：通过配置 `DENO_KV_PATH` 环境变量指定数据文件路径。

```bash
# .env
DENO_KV_PATH=./data/kv.db
```

```typescript
// 使用自定义路径
const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));
```

### Q：如何启用远程 Deno KV (Deno Deploy)？

A：在 Deno Deploy 上部署时，使用 `Deno.openKv()` 会自动连接到托管的分布式 KV。

```typescript
// 生产环境自动使用远程 KV
const kv = await Deno.openKv();
```

### Q：如何处理文件上传？

A：使用 Fresh 的 `FormData` API 处理文件上传。

```typescript
// routes/api/files/upload.ts
export const handler = async (req: Request): Promise<Response> => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  // 保存文件到 Deno KV 或云存储
  const bytes = await file.arrayBuffer();
  const kv = await Deno.openKv();
  await kv.set(["files", crypto.randomUUID()], {
    name: file.name,
    type: file.type,
    size: file.size,
    data: new Uint8Array(bytes),
  });

  return Response.json({ success: true });
};
```

### Q：Islands 架构如何与 API 集成？

A：Islands 是客户端交互组件，通过 `fetch` 调用后端 API。

```typescript
// islands/UserList.tsx
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function UserList() {
  const users = useSignal([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => users.value = data);
  }, []);

  return (
    <div>
      {users.value.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 开发工具

### 推荐插件/工具

- **Deno VSCode Extension** - 官方 VS Code 插件，提供智能提示和调试
- **deployctl** - Deno Deploy 命令行工具
- **wrk / autocannon** - HTTP 压力测试工具
- **Deno Lint** - 内置代码检查工具

## 与其他后端对比

| 特性 | Deno Fresh | NestJS | FastAPI | Spring Boot |
|------|------------|--------|---------|-------------|
| 语言 | TypeScript (Deno) | TypeScript | Python | Java |
| ORM | Deno KV | Prisma | SQLAlchemy | JPA |
| 性能 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| 启动时间 | <100ms | ~2s | ~1s | ~5s |
| 内存占用 | 30MB | 80MB | 50MB | 150MB |
| 部署 | Deno Deploy | Docker/云 | Docker/云 | Docker/云 |

## 相关链接

- [API 文档](https://halolight-deno.h7ml.cn/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-deno)
- [Deno 官方文档](https://deno.land/manual)
- [Fresh 官方文档](https://fresh.deno.dev)
- [Deno KV 文档](https://deno.com/kv)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
