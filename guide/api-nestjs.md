# NestJS 后端 API

HaloLight NestJS 后端 API，基于 NestJS 11 框架构建的企业级后端服务，提供完整的 RBAC 权限系统和 Swagger 文档。

## 特性

- 🏗️ **NestJS 11** - 企业级 Node.js 框架，模块化架构
- 🔷 **Prisma ORM 5** - 类型安全的数据库访问，支持 PostgreSQL 16
- 🔐 **JWT 双令牌** - AccessToken + RefreshToken 认证机制
- 🛡️ **RBAC 权限** - 基于角色的访问控制，支持通配符权限
- 📚 **Swagger 文档** - 自动生成交互式 API 文档
- ✅ **类型验证** - class-validator 实现 DTO 自动验证
- 🐳 **Docker 部署** - 多阶段构建优化，Docker Compose 一键部署
- 🧪 **完整测试** - Jest 单元测试 + E2E 测试

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | NestJS 11 |
| 语言 | TypeScript 5.7 |
| 数据库 | PostgreSQL 16 + Prisma ORM 5 |
| 认证 | JWT + Passport.js |
| 验证 | class-validator + class-transformer |
| 文档 | Swagger/OpenAPI |
| 测试 | Jest + Supertest |
| 容器化 | Docker + Docker Compose |
| 包管理 | pnpm 10.23.0 |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-nestjs.git
cd halolight-api-nestjs

# 安装依赖
pnpm install

# 生成 Prisma Client
pnpm prisma:generate

# 运行数据库迁移
pnpm prisma:migrate

# 运行开发服务器
pnpm dev

# 构建生产版本
pnpm build
pnpm start:prod
```

## 项目结构

```
halolight-api-nestjs/
├── src/
│   ├── common/                  # 共享模块
│   │   ├── decorators/          # 自定义装饰器（@Public, @CurrentUser, @RequirePermissions）
│   │   ├── filters/             # 全局异常过滤器
│   │   ├── guards/              # 守卫（JWT 认证、权限校验）
│   │   └── interceptors/        # 拦截器（日志、转换）
│   ├── configs/                 # 配置模块
│   │   ├── config.module.ts     # 环境变量配置
│   │   ├── env.validation.ts    # 环境变量验证（class-validator）
│   │   └── swagger.config.ts    # Swagger 文档配置
│   ├── infrastructure/          # 基础设施层
│   │   └── prisma/              # Prisma ORM 配置与服务
│   ├── modules/                 # 业务模块（12 个）
│   │   ├── auth/                # 认证模块（登录、注册、刷新令牌）
│   │   ├── users/               # 用户管理（CRUD、分页、搜索）
│   │   ├── roles/               # 角色管理（CRUD + 权限分配）
│   │   ├── permissions/         # 权限管理（通配符支持）
│   │   ├── teams/               # 团队管理
│   │   ├── documents/           # 文档管理（标签、文件夹）
│   │   ├── files/               # 文件管理
│   │   ├── folders/             # 文件夹管理（树形结构）
│   │   ├── calendar/            # 日历事件管理
│   │   ├── notifications/       # 通知管理
│   │   ├── messages/            # 消息会话管理
│   │   └── dashboard/           # 仪表盘统计
│   ├── app.controller.ts        # 根控制器（首页、健康检查）
│   ├── app.service.ts           # 根服务
│   ├── app.module.ts            # 根模块
│   └── main.ts                  # 应用入口（Bootstrap）
├── prisma/
│   ├── schema.prisma            # 数据库模型定义（17 个实体）
│   └── migrations/              # 数据库迁移历史
├── test/
│   ├── app.e2e-spec.ts          # E2E 测试
│   └── jest-e2e.json            # E2E Jest 配置
├── Dockerfile                   # Docker 多阶段构建
├── docker-compose.yml           # Docker Compose 配置（API + PostgreSQL + Redis）
└── package.json
```

## API 模块

项目包含 **12 个核心业务模块**，提供 **90+ RESTful API 端点**：

| 模块 | 端点数 | 描述 |
|------|--------|------|
| **Auth** | 7 | 用户认证（登录、注册、刷新 Token、获取当前用户、登出、找回/重置密码） |
| **Users** | 7 | 用户管理（CRUD、分页、搜索、过滤、状态更新、批量删除） |
| **Roles** | 6 | 角色管理（CRUD + 权限分配） |
| **Permissions** | 4 | 权限管理（支持通配符权限：`users:*`, `*`） |
| **Teams** | 7 | 团队管理（CRUD、成员管理） |
| **Documents** | 11 | 文档管理（CRUD、分享、移动、标签、重命名、批量删除） |
| **Files** | 14 | 文件管理（上传、下载、存储信息、移动/复制、收藏、批量删除等） |
| **Folders** | 5 | 文件夹管理（CRUD、树形结构） |
| **Calendar** | 9 | 日历事件管理（CRUD、参会人管理、改期、批量删除等） |
| **Notifications** | 5 | 通知管理（列表、未读统计、标记已读、批量已读、删除） |
| **Messages** | 5 | 消息会话（对话列表、消息发送、已读标记、删除） |
| **Dashboard** | 9 | 仪表盘统计（总览、访问/销售趋势、产品/订单/活动统计、饼图、任务等） |

### 认证相关端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/auth/login` | 用户登录 | Public |
| POST | `/api/auth/register` | 用户注册 | Public |
| POST | `/api/auth/refresh` | 刷新令牌 | Public |
| POST | `/api/auth/forgot-password` | 发送密码重置邮件 | Public |
| POST | `/api/auth/reset-password` | 重置密码 | Public |
| GET | `/api/auth/me` | 获取当前用户 | JWT Required |
| POST | `/api/auth/logout` | 用户登出 | JWT Required |

### 用户管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/users` | 获取用户列表（分页、搜索、状态/角色筛选） | JWT Required |
| GET | `/api/users/:id` | 获取用户详情 | JWT Required |
| POST | `/api/users` | 创建用户 | JWT Required |
| PATCH | `/api/users/:id` | 更新用户 | JWT Required |
| PATCH | `/api/users/:id/status` | 更新用户状态（ACTIVE/INACTIVE/SUSPENDED） | JWT Required |
| POST | `/api/users/batch-delete` | 批量删除用户 | JWT Required |
| DELETE | `/api/users/:id` | 删除用户 | JWT Required |

### 完整端点清单

> 下表列出了所有业务模块的完整 API 端点，确保与实际实现和 Swagger 文档对齐。

#### 文档管理 (Documents)- 11 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/documents` | 文档列表（分页、搜索、过滤） | JWT Required |
| GET | `/api/documents/:id` | 获取文档详情 | JWT Required |
| POST | `/api/documents` | 创建文档 | JWT Required |
| PUT | `/api/documents/:id` | 更新文档内容 | JWT Required |
| PATCH | `/api/documents/:id/rename` | 重命名文档 | JWT Required |
| POST | `/api/documents/:id/move` | 移动到目标文件夹 | JWT Required |
| POST | `/api/documents/:id/tags` | 更新标签 | JWT Required |
| POST | `/api/documents/:id/share` | 分享文档给用户 | JWT Required |
| POST | `/api/documents/:id/unshare` | 取消分享 | JWT Required |
| POST | `/api/documents/batch-delete` | 批量删除文档 | JWT Required |
| DELETE | `/api/documents/:id` | 删除文档 | JWT Required |

#### 文件管理 (Files)- 14 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/files/upload` | 上传文件 | JWT Required |
| POST | `/api/files/folder` | 创建文件夹 | JWT Required |
| GET | `/api/files` | 文件列表（可按文件夹/类型筛选） | JWT Required |
| GET | `/api/files/storage` | 获取存储配额和使用情况 | JWT Required |
| GET | `/api/files/storage-info` | 获取存储信息（别名） | JWT Required |
| GET | `/api/files/:id` | 获取文件详情 | JWT Required |
| GET | `/api/files/:id/download-url` | 生成文件下载链接 | JWT Required |
| PATCH | `/api/files/:id/rename` | 重命名文件 | JWT Required |
| POST | `/api/files/:id/move` | 移动文件到其他目录 | JWT Required |
| POST | `/api/files/:id/copy` | 复制文件 | JWT Required |
| PATCH | `/api/files/:id/favorite` | 切换收藏状态 | JWT Required |
| POST | `/api/files/:id/share` | 分享文件 | JWT Required |
| POST | `/api/files/batch-delete` | 批量删除文件 | JWT Required |
| DELETE | `/api/files/:id` | 删除文件 | JWT Required |

#### 日历事件 (Calendar)- 9 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/calendar/events` | 事件列表（支持日期范围查询） | JWT Required |
| GET | `/api/calendar/events/:id` | 获取事件详情 | JWT Required |
| POST | `/api/calendar/events` | 创建日历事件 | JWT Required |
| PUT | `/api/calendar/events/:id` | 更新事件信息 | JWT Required |
| PATCH | `/api/calendar/events/:id/reschedule` | 重新安排事件时间 | JWT Required |
| POST | `/api/calendar/events/:id/attendees` | 添加参会人 | JWT Required |
| DELETE | `/api/calendar/events/:id/attendees/:attendeeId` | 移除参会人 | JWT Required |
| POST | `/api/calendar/events/batch-delete` | 批量删除事件 | JWT Required |
| DELETE | `/api/calendar/events/:id` | 删除事件 | JWT Required |

#### 通知管理 (Notifications)- 5 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/notifications` | 通知列表 | JWT Required |
| GET | `/api/notifications/unread-count` | 获取未读通知数量 | JWT Required |
| PUT | `/api/notifications/:id/read` | 标记单条通知为已读 | JWT Required |
| PUT | `/api/notifications/read-all` | 全部标记为已读 | JWT Required |
| DELETE | `/api/notifications/:id` | 删除通知 | JWT Required |

#### 团队管理 (Teams)- 7 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/teams` | 团队列表（分页、搜索） | JWT Required |
| GET | `/api/teams/:id` | 获取团队详情和成员 | JWT Required |
| POST | `/api/teams` | 创建团队 | JWT Required |
| PATCH | `/api/teams/:id` | 更新团队信息 | JWT Required |
| POST | `/api/teams/:id/members` | 添加成员到团队 | JWT Required |
| DELETE | `/api/teams/:id/members/:userId` | 从团队移除成员 | JWT Required |
| DELETE | `/api/teams/:id` | 删除团队 | JWT Required |

#### 仪表盘统计 (Dashboard)- 9 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/dashboard/stats` | 获取统计数据（用户、收入、订单等） | JWT Required |
| GET | `/api/dashboard/visits` | 获取访问趋势（7 天数据） | JWT Required |
| GET | `/api/dashboard/sales` | 获取销售趋势（6 个月数据） | JWT Required |
| GET | `/api/dashboard/products` | 获取热门产品排名 | JWT Required |
| GET | `/api/dashboard/orders` | 获取最近订单列表 | JWT Required |
| GET | `/api/dashboard/activities` | 获取最近活动日志 | JWT Required |
| GET | `/api/dashboard/pie` | 获取饼图数据（分类统计） | JWT Required |
| GET | `/api/dashboard/tasks` | 获取任务列表和统计 | JWT Required |
| GET | `/api/dashboard/overview` | 获取系统概览（CPU、内存、磁盘等） | JWT Required |

##完整 API 参考

### 1。认证模块 (Auth)

#### 1.1 用户登录

**端点**：`POST /api/auth/login`
**权限**：Public (无需认证)
**描述**：使用邮箱和密码登录，返回 JWT 令牌

**请求体**：
```json
{
  "email": "admin@halolight.h7ml.cn",
  "password": "password123"
}
```

**字段说明**：
- `email` (string，必填)：用户邮箱，需符合邮箱格式
- `password` (string，必填)：用户密码，最少 8 个字符

**成功响应** (200)：
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx1234567890",
    "email": "admin@halolight.h7ml.cn",
    "name": "Admin User",
    "avatar": "https://avatar.example.com/admin.jpg",
    "phone": "+86 138****8888",
    "status": "ACTIVE"
  }
}
```

**错误响应**：
- `400 Bad Request`：请求参数验证失败
- `401 Unauthorized`：邮箱或密码错误

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "password123"
  }'
```

#### 1.2 用户注册

**端点**：`POST /api/auth/register`
**权限**：Public (无需认证)
**描述**：注册新用户账号

**请求体**：
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "securePass123",
  "phone": "+86 138****8888"
}
```

**字段说明**：
- `email` (string，必填)：用户邮箱，需符合邮箱格式且唯一
- `name` (string，必填)：用户姓名
- `password` (string，必填)：密码，最少 8 个字符
- `phone` (string，可选)：手机号码

**成功响应** (201)：
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx9876543210",
    "email": "newuser@example.com",
    "name": "New User",
    "avatar": null,
    "phone": "+86 138****8888",
    "status": "ACTIVE"
  }
}
```

**错误响应**：
- `400 Bad Request`：请求参数验证失败
- `409 Conflict`：邮箱已被注册

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "securePass123",
    "phone": "+86 138****8888"
  }'
```

#### 1.3 刷新令牌

**端点**：`POST /api/auth/refresh`
**权限**：Public (无需认证)
**描述**：使用 RefreshToken 获取新的 AccessToken

**请求体**：
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**成功响应** (200)：
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**错误响应**：
- `401 Unauthorized`：RefreshToken 无效或已过期

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

#### 1.4 获取当前用户

**端点**：`GET /api/auth/me`
**权限**：JWT Required (需要认证)
**描述**：获取当前登录用户的详细信息

**请求头**：
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**成功响应** (200)：
```json
{
  "id": "clx1234567890",
  "email": "admin@halolight.h7ml.cn",
  "name": "Admin User",
  "avatar": "https://avatar.example.com/admin.jpg",
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "roles": [
    {
      "id": "role_admin",
      "name": "Administrator",
      "permissions": ["*"]
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-12-04T12:00:00.000Z"
}
```

**错误响应**：
- `401 Unauthorized`：Token 无效或已过期

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 1.5 用户登出

**端点**：`POST /api/auth/logout`
**权限**：JWT Required (需要认证)
**描述**：登出当前用户，使令牌失效

**请求头**：
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**成功响应** (200)：
```json
{
  "message": "Successfully logged out"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 2。用户管理模块 (Users)

#### 2.1 获取用户列表

**端点**：`GET /api/users`
**权限**：JWT Required
**描述**：获取用户列表，支持分页、搜索和过滤

**查询参数**：
- `page` (number，可选)：页码，默认 1
- `limit` (number，可选)：每页数量，默认 10，最大 100
- `search` (string，可选)：搜索关键词 (搜索姓名、用户名或邮箱)
- `status` (string，可选)：用户状态过滤 (all | ACTIVE | INACTIVE | SUSPENDED)，传 `all` 或不传表示全部
- `role` (string，可选)：按角色名筛选 (all | admin | user | ...)，传 `all` 或不传表示全部

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "clx1234567890",
      "email": "admin@halolight.h7ml.cn",
      "username": "admin",
      "name": "Admin User",
      "avatar": "https://avatar.example.com/admin.jpg",
      "status": "ACTIVE",
      "department": "研发部",
      "position": "高级工程师",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-12-04T12:00:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

**curl 示例**：
```bash
# 基本查询
curl -X GET "http://localhost:3000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 搜索用户（状态和角色筛选）
curl -X GET "http://localhost:3000/api/users?search=admin&status=ACTIVE&role=admin" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 使用 all 跳过筛选
curl -X GET "http://localhost:3000/api/users?status=all&role=all" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 2.2 获取用户详情

**端点**：`GET /api/users/:id`
**权限**：JWT Required
**描述**：根据用户 ID 获取用户详细信息

**路径参数**：
- `id` (string，必填)：用户 ID

**成功响应** (200)：
```json
{
  "id": "clx1234567890",
  "email": "admin@halolight.h7ml.cn",
  "name": "Admin User",
  "avatar": "https://avatar.example.com/admin.jpg",
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "roles": [
    {
      "id": "role_admin",
      "name": "Administrator"
    }
  ],
  "teams": [
    {
      "id": "team_001",
      "name": "Development Team",
      "role": "OWNER"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-12-04T12:00:00.000Z"
}
```

**错误响应**：
- `404 Not Found`：用户不存在

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/users/clx1234567890 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 2.3 创建用户

**端点**：`POST /api/users`
**权限**：JWT Required
**描述**：创建新用户 (管理员功能)

**请求体**：
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "securePass123",
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "avatar": "https://avatar.example.com/newuser.jpg"
}
```

**字段说明**：
- `email` (string，必填)：用户邮箱
- `name` (string，必填)：用户姓名
- `password` (string，必填)：密码，最少 8 个字符
- `phone` (string，可选)：手机号码
- `status` (string，可选)：用户状态，默认 ACTIVE
- `avatar` (string，可选)：头像 URL

**成功响应** (201)：
```json
{
  "id": "clx9876543210",
  "email": "newuser@example.com",
  "name": "New User",
  "avatar": "https://avatar.example.com/newuser.jpg",
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "securePass123"
  }'
```

#### 2.4 更新用户

**端点**：`PATCH /api/users/:id`
**权限**：JWT Required
**描述**：更新用户信息

**路径参数**：
- `id` (string，必填)：用户 ID

**请求体**：
```json
{
  "name": "Updated Name",
  "phone": "+86 139****9999",
  "avatar": "https://avatar.example.com/updated.jpg",
  "status": "ACTIVE"
}
```

**字段说明**：所有字段均为可选，只需传递需要更新的字段

**成功响应** (200)：
```json
{
  "id": "clx1234567890",
  "email": "admin@halolight.h7ml.cn",
  "name": "Updated Name",
  "avatar": "https://avatar.example.com/updated.jpg",
  "phone": "+86 139****9999",
  "status": "ACTIVE",
  "updatedAt": "2024-12-04T12:30:00.000Z"
}
```

**curl 示例**：
```bash
curl -X PATCH http://localhost:3000/api/users/clx1234567890 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "phone": "+86 139****9999"
  }'
```

#### 2.5 删除用户

**端点**：`DELETE /api/users/:id`
**权限**：JWT Required
**描述**：删除用户 (软删除或硬删除)

**路径参数**：
- `id` (string，必填)：用户 ID

**成功响应** (200)：
```json
{
  "message": "User successfully deleted",
  "id": "clx1234567890"
}
```

**错误响应**：
- `404 Not Found`：用户不存在
- `403 Forbidden`：无权限删除该用户

**curl 示例**：
```bash
curl -X DELETE http://localhost:3000/api/users/clx1234567890 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3。角色管理模块 (Roles)

#### 3.1 获取角色列表

**端点**：`GET /api/roles`
**权限**：JWT Required
**描述**：获取所有角色列表

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "role_admin",
      "name": "Administrator",
      "description": "Full system access",
      "permissions": [
        {
          "id": "perm_all",
          "name": "*",
          "description": "All permissions"
        }
      ],
      "userCount": 5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "role_user",
      "name": "Regular User",
      "description": "Basic user access",
      "permissions": [
        {
          "id": "perm_read",
          "name": "users:read",
          "description": "Read user data"
        }
      ],
      "userCount": 50,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/roles \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 3.2 创建角色

**端点**：`POST /api/roles`
**权限**：JWT Required
**描述**：创建新角色

**请求体**：
```json
{
  "name": "Editor",
  "description": "Can edit content"
}
```

**成功响应** (201)：
```json
{
  "id": "role_editor",
  "name": "Editor",
  "description": "Can edit content",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Editor",
    "description": "Can edit content"
  }'
```

#### 3.3 分配权限给角色

**端点**：`POST /api/roles/:id/permissions`
**权限**：JWT Required
**描述**：为角色分配权限

**路径参数**：
- `id` (string，必填)：角色 ID

**请求体**：
```json
{
  "permissionIds": ["perm_001", "perm_002", "perm_003"]
}
```

**成功响应** (200)：
```json
{
  "id": "role_editor",
  "name": "Editor",
  "permissions": [
    {
      "id": "perm_001",
      "name": "documents:create"
    },
    {
      "id": "perm_002",
      "name": "documents:update"
    },
    {
      "id": "perm_003",
      "name": "documents:delete"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/roles/role_editor/permissions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "permissionIds": ["perm_001", "perm_002", "perm_003"]
  }'
```

### 4。权限管理模块 (Permissions)

#### 4.1 获取权限列表

**端点**：`GET /api/permissions`
**权限**：JWT Required
**描述**：获取所有权限列表，支持通配符权限

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "perm_all",
      "name": "*",
      "description": "All permissions"
    },
    {
      "id": "perm_users_all",
      "name": "users:*",
      "description": "All user operations"
    },
    {
      "id": "perm_users_create",
      "name": "users:create",
      "description": "Create users"
    },
    {
      "id": "perm_users_read",
      "name": "users:read",
      "description": "Read user data"
    },
    {
      "id": "perm_users_update",
      "name": "users:update",
      "description": "Update users"
    },
    {
      "id": "perm_users_delete",
      "name": "users:delete",
      "description": "Delete users"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/permissions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 4.2 创建权限

**端点**：`POST /api/permissions`
**权限**：JWT Required
**描述**：创建新权限

**请求体**：
```json
{
  "name": "documents:publish",
  "description": "Publish documents"
}
```

**字段说明**：
- `name` (string，必填)：权限名称，格式为 `resource:action` 或使用通配符 `*`
- `description` (string，可选)：权限描述

**成功响应** (201)：
```json
{
  "id": "perm_doc_publish",
  "name": "documents:publish",
  "description": "Publish documents",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/permissions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "documents:publish",
    "description": "Publish documents"
  }'
```

### 5。团队管理模块 (Teams)

#### 5.1 获取团队列表

**端点**：`GET /api/teams`
**权限**：JWT Required
**描述**：获取当前用户所属的所有团队

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "team_001",
      "name": "Development Team",
      "description": "Core development team",
      "owner": {
        "id": "user_001",
        "name": "Admin User"
      },
      "memberCount": 10,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/teams \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 5.2 创建团队

**端点**：`POST /api/teams`
**权限**：JWT Required
**描述**：创建新团队

**请求体**：
```json
{
  "name": "Marketing Team",
  "description": "Marketing and promotion team"
}
```

**成功响应** (201)：
```json
{
  "id": "team_002",
  "name": "Marketing Team",
  "description": "Marketing and promotion team",
  "owner": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marketing Team",
    "description": "Marketing and promotion team"
  }'
```

### 6。文档管理模块 (Documents)

#### 6.1 获取文档列表

**端点**：`GET /api/documents`
**权限**：JWT Required
**描述**：获取文档列表，支持分页和过滤

**查询参数**：
- `page` (number，可选)：页码，默认 1
- `limit` (number，可选)：每页数量，默认 10
- `folderId` (string，可选)：文件夹 ID 过滤
- `tags` (string，可选)：标签过滤，逗号分隔

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "doc_001",
      "title": "API Documentation",
      "content": "Complete API documentation...",
      "folderId": "folder_001",
      "tags": ["api", "documentation"],
      "author": {
        "id": "user_001",
        "name": "Admin User"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-12-04T12:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

**curl 示例**：
```bash
curl -X GET "http://localhost:3000/api/documents?page=1&limit=10&tags=api" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 6.2 创建文档

**端点**：`POST /api/documents`
**权限**：JWT Required
**描述**：创建新文档

**请求体**：
```json
{
  "title": "New Document",
  "content": "Document content in markdown format...",
  "folderId": "folder_001",
  "tags": ["guide", "tutorial"]
}
```

**成功响应** (201)：
```json
{
  "id": "doc_002",
  "title": "New Document",
  "content": "Document content in markdown format...",
  "folderId": "folder_001",
  "tags": ["guide", "tutorial"],
  "author": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/documents \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Document",
    "content": "Document content...",
    "folderId": "folder_001",
    "tags": ["guide", "tutorial"]
  }'
```

### 7。文件管理模块 (Files)

#### 7.1 上传文件

**端点**：`POST /api/files/upload`
**权限**：JWT Required
**描述**：上传文件

**请求头**：
```
Content-Type: multipart/form-data
```

**表单数据**：
- `file` (File，必填)：要上传的文件
- `folderId` (string，可选)：文件夹 ID

**成功响应** (201)：
```json
{
  "id": "file_001",
  "name": "document.pdf",
  "size": 1024000,
  "mimeType": "application/pdf",
  "url": "https://storage.example.com/files/document.pdf",
  "folderId": "folder_001",
  "uploadedBy": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "folderId=folder_001"
```

#### 7.2 获取文件列表

**端点**：`GET /api/files`
**权限**：JWT Required
**描述**：获取文件列表

**查询参数**：
- `folderId` (string，可选)：文件夹 ID 过滤

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "file_001",
      "name": "document.pdf",
      "size": 1024000,
      "mimeType": "application/pdf",
      "url": "https://storage.example.com/files/document.pdf",
      "createdAt": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET "http://localhost:3000/api/files?folderId=folder_001" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 8。文件夹管理模块 (Folders)

#### 8.1 获取文件夹树

**端点**：`GET /api/folders/tree`
**权限**：JWT Required
**描述**：获取文件夹树形结构

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "folder_root",
      "name": "Root Folder",
      "parentId": null,
      "children": [
        {
          "id": "folder_001",
          "name": "Documents",
          "parentId": "folder_root",
          "children": []
        },
        {
          "id": "folder_002",
          "name": "Images",
          "parentId": "folder_root",
          "children": []
        }
      ]
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/folders/tree \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 8.2 创建文件夹

**端点**：`POST /api/folders`
**权限**：JWT Required
**描述**：创建新文件夹

**请求体**：
```json
{
  "name": "New Folder",
  "parentId": "folder_root"
}
```

**成功响应** (201)：
```json
{
  "id": "folder_003",
  "name": "New Folder",
  "parentId": "folder_root",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/folders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Folder",
    "parentId": "folder_root"
  }'
```

### 9。日历模块 (Calendar)

#### 9.1 获取日历事件

**端点**：`GET /api/calendar/events`
**权限**：JWT Required
**描述**：获取日历事件列表

**查询参数**：
- `startDate` (string，可选)：开始日期 (ISO 8601)
- `endDate` (string，可选)：结束日期 (ISO 8601)

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "event_001",
      "title": "Team Meeting",
      "description": "Weekly team sync",
      "startTime": "2024-12-05T10:00:00.000Z",
      "endTime": "2024-12-05T11:00:00.000Z",
      "location": "Conference Room A",
      "attendees": [
        {
          "id": "user_001",
          "name": "Admin User"
        }
      ],
      "createdAt": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET "http://localhost:3000/api/calendar/events?startDate=2024-12-01&endDate=2024-12-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 9.2 创建日历事件

**端点**：`POST /api/calendar/events`
**权限**：JWT Required
**描述**：创建新的日历事件

**请求体**：
```json
{
  "title": "Project Review",
  "description": "Q4 project review meeting",
  "startTime": "2024-12-10T14:00:00.000Z",
  "endTime": "2024-12-10T16:00:00.000Z",
  "location": "Conference Room B",
  "attendeeIds": ["user_001", "user_002"]
}
```

**成功响应** (201)：
```json
{
  "id": "event_002",
  "title": "Project Review",
  "description": "Q4 project review meeting",
  "startTime": "2024-12-10T14:00:00.000Z",
  "endTime": "2024-12-10T16:00:00.000Z",
  "location": "Conference Room B",
  "attendees": [
    {
      "id": "user_001",
      "name": "Admin User"
    },
    {
      "id": "user_002",
      "name": "Developer User"
    }
  ],
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/calendar/events \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Review",
    "startTime": "2024-12-10T14:00:00.000Z",
    "endTime": "2024-12-10T16:00:00.000Z",
    "attendeeIds": ["user_001", "user_002"]
  }'
```

### 10。通知模块 (Notifications)

#### 10.1 获取通知列表

**端点**：`GET /api/notifications`
**权限**：JWT Required
**描述**：获取当前用户的通知列表

**查询参数**：
- `unreadOnly` (boolean，可选)：仅显示未读通知

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "notif_001",
      "type": "SYSTEM",
      "title": "System Update",
      "message": "The system will be updated tonight",
      "isRead": false,
      "createdAt": "2024-12-04T12:00:00.000Z"
    }
  ],
  "unreadCount": 5
}
```

**curl 示例**：
```bash
curl -X GET "http://localhost:3000/api/notifications?unreadOnly=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 10.2 标记通知为已读

**端点**：`PATCH /api/notifications/:id/read`
**权限**：JWT Required
**描述**：标记指定通知为已读

**路径参数**：
- `id` (string，必填)：通知 ID

**成功响应** (200)：
```json
{
  "id": "notif_001",
  "isRead": true,
  "readAt": "2024-12-04T12:30:00.000Z"
}
```

**curl 示例**：
```bash
curl -X PATCH http://localhost:3000/api/notifications/notif_001/read \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 11。消息模块 (Messages)

#### 11.1 获取会话列表

**端点**：`GET /api/messages/conversations`
**权限**：JWT Required
**描述**：获取当前用户的所有消息会话

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "conv_001",
      "participants": [
        {
          "id": "user_001",
          "name": "Admin User"
        },
        {
          "id": "user_002",
          "name": "Developer User"
        }
      ],
      "lastMessage": {
        "id": "msg_001",
        "content": "Hello!",
        "senderId": "user_002",
        "createdAt": "2024-12-04T12:00:00.000Z"
      },
      "unreadCount": 2,
      "updatedAt": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/messages/conversations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 11.2 发送消息

**端点**：`POST /api/messages`
**权限**：JWT Required
**描述**：发送新消息

**请求体**：
```json
{
  "conversationId": "conv_001",
  "content": "Hello, how are you?",
  "attachments": []
}
```

**成功响应** (201)：
```json
{
  "id": "msg_002",
  "conversationId": "conv_001",
  "content": "Hello, how are you?",
  "sender": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:30:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "conv_001",
    "content": "Hello, how are you?"
  }'
```

### 12。仪表盘模块 (Dashboard)

#### 12.1 获取统计数据

**端点**：`GET /api/dashboard/stats`
**权限**：JWT Required
**描述**：获取仪表盘统计数据

**成功响应** (200)：
```json
{
  "users": {
    "total": 1000,
    "active": 850,
    "newThisMonth": 50
  },
  "documents": {
    "total": 5000,
    "createdThisWeek": 120
  },
  "teams": {
    "total": 50,
    "activeProjects": 35
  },
  "activities": [
    {
      "id": "act_001",
      "type": "USER_LOGIN",
      "user": "Admin User",
      "timestamp": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:3000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 认证流程

### JWT 令牌使用

所有需要认证的接口都需要在请求头中携带 JWT Token：

```
Authorization: Bearer <access_token>
```

### 令牌刷新流程

1. 使用登录接口获取 `accessToken` 和 `refreshToken`
2. 使用 `accessToken` 访问受保护的接口
3. 当 `accessToken` 过期 (7 天)，使用 `refreshToken` 调用刷新接口
4. 获取新的 `accessToken` 和 `refreshToken`

### 认证示例 (完整流程)

```bash
# 1. 登录获取令牌
LOGIN_RESPONSE=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "password123"
  }')

# 2. 提取 AccessToken
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')

# 3. 使用 Token 访问受保护接口
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. Token 过期后，使用 RefreshToken 刷新
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

## 错误处理

### 标准错误响应格式

所有错误响应遵循统一格式：

```json
{
  "statusCode": 400,
  "timestamp": "2025-12-04T12:00:00.000Z",
  "path": "/api/users",
  "method": "POST",
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "email must be a valid email address"
    }
  ]
}
```

### 常见错误码

| 状态码 | 含义 | 常见场景 |
|--------|------|----------|
| 400 | Bad Request | 请求参数验证失败 |
| 401 | Unauthorized | Token 无效或已过期 |
| 403 | Forbidden | 无权限访问资源 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突（如邮箱已存在） |
| 422 | Unprocessable Entity | 业务逻辑验证失败 |
| 429 | Too Many Requests | 请求频率超限 |
| 500 | Internal Server Error | 服务器内部错误 |

### 错误处理示例

```bash
# 捕获错误响应
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid-email"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ $HTTP_CODE -ne 201 ]; then
  echo "Error: HTTP $HTTP_CODE"
  echo "$BODY" | jq '.message'
fi
```

## 数据库模型

Prisma Schema 包含 **17 个实体模型**，支持完整的 RBAC 权限系统：

```prisma
// 核心用户模型
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  password      String
  avatar        String?
  phone         String?
  status        UserStatus @default(ACTIVE)

  // 关系
  roles         UserRole[]
  teams         TeamMember[]
  ownedTeams    Team[]
  documents     Document[]
  // ... 更多关系
}

// RBAC 模型
model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  permissions RolePermission[]
  users       UserRole[]
}

model Permission {
  id          String   @id @default(cuid())
  name        String   @unique  // 格式: "users:create", "users:*", "*"
  description String?
  roles       RolePermission[]
}
```

完整的模型关系：
- User ↔ Role (多对多，通过 UserRole)
- Role ↔ Permission (多对多，通过 RolePermission)
- User ↔ Team (用户可以拥有团队或作为成员加入)
- Document ↔ User (文档所有者和共享关系)
- Folder (自引用，支持树形结构)
- ActivityLog (审计日志，记录所有操作)

## 环境变量

```bash
# 应用配置
NODE_ENV=production
PORT=3000

# 数据库（PostgreSQL）
DATABASE_URL="postgresql://user:password@localhost:5432/halolight_db"

# JWT 认证
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars
JWT_REFRESH_EXPIRES_IN=30d

# CORS 配置
CORS_ORIGIN=http://localhost:3000,https://halolight.h7ml.cn

# 可选：Redis 缓存
REDIS_HOST=localhost
REDIS_PORT=6379

# 可选：文件上传
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_PATH=./uploads

# 可选：限流配置
THROTTLE_TTL=60        # 秒
THROTTLE_LIMIT=10      # 请求数
```

## Docker 部署

### 使用 Docker Compose (推荐)

```bash
# 克隆项目
git clone https://github.com/halolight/halolight-api-nestjs.git
cd halolight-api-nestjs

# 配置环境变量
cp .env.production .env
# 编辑 .env 文件，设置数据库密码、JWT 密钥等

# 启动所有服务（API + PostgreSQL + Redis）
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down
```

### 仅构建 API 容器

```bash
# 构建镜像
docker build -t halolight-api-nestjs .

# 运行容器
docker run -d \
  --name halolight-api \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-jwt-secret" \
  halolight-api-nestjs
```

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（热重载）
pnpm start:debug      # 调试模式启动

# 构建
pnpm build            # 构建生产版本
pnpm start:prod       # 运行生产构建

# 代码质量
pnpm lint             # ESLint 检查
pnpm lint:fix         # 自动修复 ESLint 问题
pnpm format           # Prettier 格式化
pnpm type-check       # TypeScript 类型检查

# 测试
pnpm test             # 运行单元测试
pnpm test:watch       # 监听模式运行测试
pnpm test:cov         # 生成测试覆盖率报告
pnpm test:e2e         # 运行 E2E 测试

# 数据库
pnpm prisma:generate  # 生成 Prisma Client
pnpm prisma:migrate   # 运行数据库迁移（开发环境）
pnpm prisma:studio    # 打开 Prisma Studio（数据库 GUI）
pnpm prisma:seed      # 运行数据库种子
pnpm db:reset         # 重置数据库
```

## 架构特点

### 1。模块化设计

每个业务模块独立封装，遵循 NestJS 模块化架构：

```typescript
@Module({
  imports: [PrismaModule],      // 依赖注入
  controllers: [UsersController], // 路由控制器
  providers: [UsersService],      // 业务逻辑
  exports: [UsersService],        // 导出供其他模块使用
})
export class UsersModule {}
```

### 2。DTO 验证

使用 class-validator 进行自动验证：

```typescript
export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
}
```

### 3。守卫和装饰器

使用自定义装饰器和守卫实现认证授权：

```typescript
// 公开路由（跳过 JWT 验证）
@Public()
@Post('login')
async login(@Body() loginDto: LoginDto) { ... }

// 受保护路由（需要 JWT）
@Get('me')
async getCurrentUser(@CurrentUser() user: User) { ... }

// 权限控制（未来扩展）
@RequirePermissions('users:create')
@Post()
async create(@Body() dto: CreateUserDto) { ... }
```

### 4。全局异常处理

统一的错误响应格式：

```json
{
  "statusCode": 400,
  "timestamp": "2025-12-04T12:00:00.000Z",
  "path": "/api/users",
  "method": "POST",
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 5。Swagger 文档

自动生成交互式 API 文档，访问 `/docs`：

- 完整的 API 端点列表
- 请求/响应 Schema
- 在线测试功能
- JWT 认证支持

## 开发工作流

### 1。创建新模块

```bash
# 使用 NestJS CLI 生成模块
nest g module modules/my-module
nest g controller modules/my-module
nest g service modules/my-module
```

### 2。定义 Prisma 模型

编辑 `prisma/schema.prisma`：

```prisma
model MyModel {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

运行迁移：

```bash
pnpm prisma:migrate
```

### 3。创建 DTO

```typescript
// dto/create-my-model.dto.ts
export class CreateMyModelDto {
  @ApiProperty()
  @IsString()
  name: string;
}
```

### 4。实现服务

```typescript
@Injectable()
export class MyModuleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.myModel.findMany();
  }

  async create(dto: CreateMyModelDto) {
    return this.prisma.myModel.create({ data: dto });
  }
}
```

### 5。实现控制器

```typescript
@Controller('my-models')
@ApiTags('MyModels')
export class MyModuleController {
  constructor(private service: MyModuleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all models' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create model' })
  create(@Body() dto: CreateMyModelDto) {
    return this.service.create(dto);
  }
}
```

## 相关链接

- [在线预览](http://halolight-api-nestjs.h7ml.cn)
- [API 文档](http://halolight-api-nestjs.h7ml.cn/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-nestjs)
- [NestJS 官方文档](https:/docs.nestjs.com)
- [Prisma 官方文档](https://www.prisma.io/docs)
- [问题反馈](https://github.com/halolight/halolight-api-nestjs/issues)

## 下一步

- 查看 [API 设计规范](/development/api-patterns)了解前端调用方式
- 查看[认证系统](/development/authentication)了解权限控制实现
- 查看[整体架构](/development/architecture)了解 HaloLight 生态系统
