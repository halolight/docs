# Bun 后端 API

HaloLight Bun 后端 API，基于 Bun + Hono + Drizzle ORM 构建的高性能后端服务，与 NestJS/Java 版本共用同一数据库（PostgreSQL/Neon）和接口规范。

## 特性

- ⚡ **Bun 1.1+** - 比 Node.js 快 4 倍的 JavaScript 运行时
- 🔥 **Hono 4.x** - 超轻量级、高性能 Web 框架（~14KB）
- 🗄️ **Drizzle ORM** - TypeScript-first SQL ORM，零运行时开销
- 🔐 **JWT 双令牌** - AccessToken + RefreshToken 认证机制
- 🛡️ **RBAC 权限** - 基于角色的访问控制系统
- 📚 **Swagger 文档** - 动态生成 OpenAPI 规范
- ✅ **Zod 验证** - 类型安全的请求数据验证
- 🧪 **完整测试** - Bun Test 单元测试 + E2E 测试

## 技术栈

| 类别 | 技术 |
|------|------|
| 运行时 | Bun 1.1+ |
| 框架 | Hono 4.x |
| 语言 | TypeScript 5.x |
| 数据库 | PostgreSQL 15+ / Neon |
| ORM | Drizzle ORM 0.36+ |
| 认证 | JWT (jose) |
| 验证 | Zod 3.x + @hono/zod-validator |
| 文档 | Swagger/OpenAPI |
| 测试 | Bun Test |
| 包管理 | pnpm |

## 性能对比

| 指标 | Bun | Node.js | 提升 |
|------|-----|---------|------|
| 启动速度 | ~100ms | ~500ms | **4x** |
| HTTP 吞吐量 | ~50,000 req/s | ~20,000 req/s | **2.5x** |
| 内存占用 | ~30MB | ~50MB+ | **40%** |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-bun.git
cd halolight-api-bun

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填写数据库连接字符串和 JWT 密钥

# 推送数据库 Schema
bun run db:push

# 填充测试数据（可选）
bun run db:seed

# 运行开发服务器
bun run dev

# 构建生产版本
bun run build
bun run start
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | - |
| `JWT_SECRET` | JWT 签名密钥（≥32字符） | - |
| `JWT_REFRESH_SECRET` | RefreshToken 密钥 | - |
| `PORT` | 服务端口 | `3002` |
| `NODE_ENV` | 运行环境 | `development` |
| `CORS_ORIGIN` | CORS 允许源（逗号分隔） | `http://localhost:3000` |
| `API_PREFIX` | API 路由前缀 | `/api` |
| `JWT_EXPIRES_IN` | AccessToken 过期时间 | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | RefreshToken 过期时间 | `7d` |
| `SWAGGER_ENABLED` | 是否启用 Swagger | `true` |
| `SWAGGER_PATH` | Swagger UI 路径 | `/swagger` |

## 项目结构

```
halolight-api-bun/
├── src/
│   ├── db/
│   │   ├── schema.ts           # Drizzle ORM Schema 定义（17 个实体）
│   │   ├── index.ts            # 数据库连接池
│   │   ├── migrate.ts          # 迁移脚本
│   │   └── seed.ts             # 种子数据脚本
│   ├── middleware/
│   │   ├── auth.ts             # JWT 认证中间件
│   │   ├── cors.ts             # CORS 配置
│   │   ├── error.ts            # 全局错误处理
│   │   └── logger.ts           # 请求日志中间件
│   ├── routes/                 # 路由层（Controller）
│   │   ├── auth.ts             # 认证端点
│   │   ├── users.ts            # 用户管理
│   │   ├── roles.ts            # 角色管理
│   │   ├── permissions.ts      # 权限管理
│   │   ├── teams.ts            # 团队管理
│   │   ├── documents.ts        # 文档管理
│   │   ├── notifications.ts    # 通知管理
│   │   ├── dashboard.ts        # 仪表盘统计
│   │   └── index.ts            # 路由汇总
│   ├── services/               # 业务逻辑层
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── role.service.ts
│   │   ├── permission.service.ts
│   │   ├── team.service.ts
│   │   ├── document.service.ts
│   │   ├── notification.service.ts
│   │   └── dashboard.service.ts
│   ├── swagger/                # Swagger 文档
│   │   ├── openapi.ts          # OpenAPI 规范动态生成
│   │   ├── zod-to-json.ts      # Zod Schema 转 JSON Schema
│   │   └── index.ts            # Swagger UI 路由
│   ├── pages/
│   │   └── home.ts             # 首页 HTML 模板
│   ├── utils/                  # 工具函数
│   │   ├── env.ts              # 环境变量验证（Zod）
│   │   ├── jwt.ts              # JWT 签名/验证
│   │   ├── hash.ts             # 密码哈希（Bun.password）
│   │   └── response.ts         # 统一响应格式
│   └── index.ts                # 应用入口
├── test/
│   ├── unit/                   # 单元测试
│   └── e2e/                    # E2E 测试
├── drizzle.config.ts           # Drizzle 配置
└── package.json
```

## API 模块

项目覆盖 **9 个核心业务模块**，提供 **50+ RESTful API 端点**：

| 模块 | 端点数 | 描述 |
|------|--------|------|
| **Auth** | 5 | 用户认证（登录、注册、刷新 Token、获取当前用户、登出） |
| **Users** | 7 | 用户管理（CRUD、分页、搜索、状态更新、批量删除） |
| **Roles** | 5 | 角色管理（CRUD + 权限分配） |
| **Permissions** | 4 | 权限管理 |
| **Teams** | 6 | 团队管理（CRUD、成员管理） |
| **Documents** | 5 | 文档管理（CRUD） |
| **Notifications** | 5 | 通知管理（列表、未读统计、标记已读） |
| **Dashboard** | 9 | 仪表盘统计（总览、趋势、图表数据） |

### 认证相关端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/auth/login` | 用户登录 | Public |
| POST | `/api/auth/register` | 用户注册 | Public |
| POST | `/api/auth/refresh` | 刷新令牌 | Public |
| GET | `/api/auth/me` | 获取当前用户 | JWT Required |
| POST | `/api/auth/logout` | 用户登出 | JWT Required |

### 用户管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/users` | 获取用户列表（分页、搜索、状态筛选） | JWT Required |
| GET | `/api/users/:id` | 获取用户详情 | JWT Required |
| POST | `/api/users` | 创建用户 | JWT Required |
| PATCH | `/api/users/:id` | 更新用户 | JWT Required |
| PATCH | `/api/users/:id/status` | 更新用户状态 | JWT Required |
| POST | `/api/users/batch-delete` | 批量删除用户 | JWT Required |
| DELETE | `/api/users/:id` | 删除用户 | JWT Required |

### 角色管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/roles` | 获取角色列表 | JWT Required |
| GET | `/api/roles/:id` | 获取角色详情 | JWT Required |
| POST | `/api/roles` | 创建角色 | JWT Required |
| PATCH | `/api/roles/:id` | 更新角色 | JWT Required |
| DELETE | `/api/roles/:id` | 删除角色 | JWT Required |

### 团队管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/teams` | 获取团队列表 | JWT Required |
| GET | `/api/teams/:id` | 获取团队详情 | JWT Required |
| POST | `/api/teams` | 创建团队 | JWT Required |
| PATCH | `/api/teams/:id` | 更新团队 | JWT Required |
| DELETE | `/api/teams/:id` | 删除团队 | JWT Required |
| POST | `/api/teams/:id/members` | 添加团队成员 | JWT Required |

### 仪表盘端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/dashboard/stats` | 获取统计数据 | JWT Required |
| GET | `/api/dashboard/visits` | 获取访问趋势 | JWT Required |
| GET | `/api/dashboard/sales` | 获取销售趋势 | JWT Required |
| GET | `/api/dashboard/products` | 获取产品统计 | JWT Required |
| GET | `/api/dashboard/orders` | 获取订单统计 | JWT Required |
| GET | `/api/dashboard/activities` | 获取活动记录 | JWT Required |
| GET | `/api/dashboard/system` | 获取系统概览 | JWT Required |
| GET | `/api/dashboard/pie` | 获取饼图数据 | JWT Required |
| GET | `/api/dashboard/tasks` | 获取待办任务 | JWT Required |

## 数据库模型

使用 Drizzle ORM 定义的 17 个核心实体：

- **用户认证**: `users`, `refresh_tokens`
- **RBAC 权限**: `roles`, `permissions`, `role_permissions`, `user_roles`
- **团队协作**: `teams`, `team_members`
- **文档管理**: `documents`, `document_shares`, `document_tags`, `tags`
- **文件系统**: `files`, `folders`
- **日历功能**: `calendar_events`, `event_attendees`, `event_reminders`
- **消息系统**: `conversations`, `conversation_participants`, `messages`
- **通知系统**: `notifications`
- **审计日志**: `activity_logs`

## 认证机制

### JWT 双令牌策略

```
┌─────────────┐     Login      ┌─────────────┐
│   Client    │ ─────────────> │   Server    │
└─────────────┘                └─────────────┘
      │                              │
      │  <── AccessToken (15m) ───   │
      │  <── RefreshToken (7d) ───   │
      │                              │
      │  ─── API Request ──────────> │
      │  ─── Authorization: Bearer   │
      │                              │
```

- **AccessToken**: 短期令牌（15分钟），用于 API 请求认证
- **RefreshToken**: 长期令牌（7天），用于刷新 AccessToken，支持 Token Rotation

### 响应格式

成功响应：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "xxx",
      "email": "admin@example.com",
      "name": "系统管理员",
      "status": "ACTIVE",
      "roles": ["admin"],
      "permissions": ["*:*"]
    },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

错误响应：
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }
}
```

## 常用命令

```bash
# 开发
bun run dev                 # 启动开发服务器（热重载）
bun run build               # 生产构建
bun run start               # 运行生产构建

# 代码质量
bun run lint                # ESLint 检查
bun run lint:fix            # ESLint 自动修复
bun run type-check          # TypeScript 类型检查
bun run format              # Prettier 格式化

# 测试
bun test                    # 运行单元测试
bun test --watch            # 监视模式
bun test --coverage         # 生成覆盖率报告

# 数据库
bun run db:generate         # 生成 Drizzle 迁移文件
bun run db:migrate          # 运行数据库迁移
bun run db:push             # 推送 Schema 到数据库
bun run db:studio           # 打开 Drizzle Studio
bun run db:seed             # 填充测试数据
```

## Bun 特性使用

利用 Bun 内置 API 提升性能：

```typescript
// 密码哈希（比 bcrypt 包更快）
const hash = await Bun.password.hash(password, { algorithm: 'bcrypt', cost: 10 });
const isValid = await Bun.password.verify(password, hash, 'bcrypt');

// 文件操作
const file = Bun.file('./path/to/file');
const content = await file.text();

// 快速哈希
const hash = Bun.hash(data);
```

## 与前端集成

配置前端 API 地址：

```env
# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3002/api

# Vue/Vite
VITE_API_URL=http://localhost:3002/api

# Angular
API_URL=http://localhost:3002/api
```

## 访问地址

- **API**: http://localhost:3002/api
- **Swagger UI**: http://localhost:3002/swagger
- **首页**: http://localhost:3002
- **API 信息**: http://localhost:3002/info

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-api-bun)
- [Bun 官方文档](https://bun.sh/docs)
- [Hono 官方文档](https://hono.dev/docs)
- [Drizzle ORM 文档](https://orm.drizzle.team/docs/overview)
