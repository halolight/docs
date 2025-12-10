# Node.js 后端 API

HaloLight Node.js 后端 API 服务，基于 Express 5 + TypeScript + Prisma 构建的企业级 RESTful API。

## 特性

- ⚡ **Express 5** - 最新版 Express 框架
- 📘 **TypeScript 5** - 完整的类型支持
- 🔷 **Prisma 6 ORM** - 类型安全的数据库访问
- 🔐 **JWT 双令牌认证** - Access Token + Refresh Token
- 🛡️ **RBAC 权限系统** - 基于角色的访问控制
- ✅ **Zod 验证** - 请求数据验证
- 📚 **Swagger 文档** - 完整的 API 交互文档
- 🐳 **Docker 支持** - 一键容器化部署
- 🗄️ **PostgreSQL 16** - 生产级数据库
- 🎯 **12 个业务模块** - 90+ RESTful 端点

## 在线演示

- **API 地址**：https://halolight-api-node.h7ml.cn
- **Swagger 文档**：https://halolight-api-node.h7ml.cn/docs
- **备用地址**：https://api-node.halolight.h7ml.cn

## 快速开始

### Docker 部署 (推荐)

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-node.git
cd halolight-api-node

# 配置环境变量
cp .env.docker .env
nano .env  # 修改 JWT_SECRET 和数据库密码

# 启动服务
docker compose up -d

# 访问服务
# API: http://localhost:3001
# Swagger: http://localhost:3001/docs
```

### 本地开发

```bash
# 安装依赖
pnpm install

# 配置环境
cp .env.example .env
nano .env  # 配置数据库和 JWT 密钥

# 生成 Prisma Client
pnpm db:generate

# 初始化数据库
pnpm db:push

# 启动开发服务器
pnpm dev
```

## 项目结构

```
halolight-api-node/
├── src/
│   ├── index.ts              # 应用入口
│   ├── config/
│   │   ├── env.ts            # 环境变量配置
│   │   └── swagger.ts        # Swagger 配置
│   ├── routes/               # 路由定义（12个模块）
│   │   ├── auth.ts           # 认证路由
│   │   ├── users.ts          # 用户管理
│   │   ├── roles.ts          # 角色管理
│   │   ├── permissions.ts    # 权限管理
│   │   ├── teams.ts          # 团队管理
│   │   ├── documents.ts      # 文档管理
│   │   ├── files.ts          # 文件管理
│   │   ├── folders.ts        # 文件夹管理
│   │   ├── calendar.ts       # 日历事件
│   │   ├── notifications.ts  # 通知管理
│   │   ├── messages.ts       # 消息管理
│   │   └── dashboard.ts      # 仪表盘统计
│   ├── services/             # 业务逻辑层
│   ├── middleware/           # 中间件
│   │   ├── auth.ts           # JWT 认证 + RBAC
│   │   ├── validate.ts       # Zod 请求验证
│   │   └── error.ts          # 全局错误处理
│   └── utils/                # 工具函数
├── prisma/
│   └── schema.prisma         # 数据库模型（17+ 模型）
├── Dockerfile                # Docker 镜像
├── docker-compose.yml        # 容器编排
└── package.json
```

## 核心功能

### 认证系统

- ✅ 用户登录/注册
- ✅ JWT 双令牌机制 (Access Token + Refresh Token)
- ✅ 令牌刷新
- ✅ 忘记密码/重置密码
- ✅ 用户登出

### 权限系统

- ✅ RBAC 权限控制
- ✅ 角色管理 (CRUD)
- ✅ 权限管理 (CRUD)
- ✅ 用户角色分配
- ✅ 权限通配符支持 (`users:*`，`*`)

### 业务模块

| 模块 | 端点数 | 说明 |
|------|--------|------|
| 认证（Auth） | 7 | 登录、注册、刷新令牌、忘记/重置密码 |
| 用户（Users） | 7 | CRUD、分页搜索、状态更新、批量删除 |
| 角色（Roles） | 6 | CRUD、权限分配 |
| 权限（Permissions） | 4 | CRUD |
| 团队（Teams） | 7 | CRUD、成员管理 |
| 文档（Documents） | 11 | CRUD、分享、标签、移动 |
| 文件（Files） | 14 | 上传、下载、存储信息、移动、复制 |
| 文件夹（Folders） | 5 | 树形结构管理 |
| 日历（Calendar） | 9 | 事件、参会人管理 |
| 通知（Notifications） | 5 | 通知管理 |
| 消息（Messages） | 5 | 会话、消息 |
| 仪表盘（Dashboard） | 9 | 统计数据 |

## API 端点示例

### 认证接口

```typescript
// POST /api/auth/login - 用户登录
Request:
{
  "email": "admin@halolight.h7ml.cn",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "cm4gn...",
      "email": "admin@halolight.h7ml.cn",
      "name": "Admin"
    }
  }
}

// POST /api/auth/refresh - 刷新令牌
Request:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "new_access_token",
    "refreshToken": "new_refresh_token"
  }
}
```

### 用户管理

```typescript
// GET /api/users?page=1&limit=10&search=john
// Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## 环境变量

```bash
# 服务器配置
NODE_ENV=production
PORT=3001

# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/halolight?schema=public"

# JWT 配置（必须 ≥32 字符）
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET="your-refresh-secret-key-minimum-32-characters-long"
REFRESH_TOKEN_EXPIRES_IN=30d

# CORS
CORS_ORIGIN="http://localhost:3000"
```

## Docker 部署

### 独立部署 (自带数据库)

```bash
# 启动所有服务
docker compose up -d

# 查看日志
docker compose logs -f

# 停止服务
docker compose down
```

### 共享数据库部署

如需与 NestJS、Java API 共享同一数据库：

```bash
# 1. 修改 .env 的 DATABASE_URL
DATABASE_URL="postgresql://user:pass@shared-db:5432/halolight"

# 2. 在 docker-compose.yml 中注释掉 postgres 服务

# 3. 确保所有服务使用相同的 JWT 密钥
JWT_SECRET="same-secret-for-all-services"
```

## 数据库模型

主要模型包括：

- **User** - 用户 (含角色关联)
- **Role** - 角色
- **Permission** - 权限
- **RefreshToken** - 刷新令牌
- **Team / TeamMember** - 团队管理
- **Document / DocumentShare / Tag** - 文档系统
- **File / Folder** - 文件系统
- **CalendarEvent / EventAttendee** - 日历系统
- **Conversation / Message** - 消息系统
- **Notification** - 通知系统
- **ActivityLog** - 活动日志

## 开发命令

```bash
# 开发
pnpm dev              # 启动开发服务器（热重载）
pnpm build            # TypeScript 编译
pnpm start            # 启动生产服务器

# 代码质量
pnpm lint             # ESLint 检查
pnpm lint:fix         # 自动修复
pnpm format           # Prettier 格式化

# 数据库
pnpm db:generate      # 生成 Prisma Client
pnpm db:push          # 推送数据库变更
pnpm db:migrate       # 运行迁移
pnpm db:studio        # Prisma Studio（数据库 GUI）
pnpm db:seed          # 填充种子数据
```

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | 20+ | JavaScript 运行时 |
| TypeScript | 5.x | 类型安全的 JavaScript |
| Express | 5.x | Web 框架 |
| Prisma | 6.x | ORM |
| PostgreSQL | 16 | 数据库 |
| Zod | 3.x | Schema 验证 |
| JWT | 9.x | 身份认证 |
| Pino | 9.x | 日志系统 |
| Swagger UI | 5.x | API 文档 |

## 性能优化

- ✅ 连接池管理
- ✅ 数据库索引优化
- ✅ 请求日志脱敏
- ✅ 错误处理中间件
- ✅ CORS 配置
- ✅ 安全头部 (Helmet)
- ✅ 健康检查端点

## 相关链接

- **GitHub**: https://github.com/halolight/halolight-api-node
- **API 文档**：https://halolight-api-node.h7ml.cn/docs
- **健康检查**：https://halolight-api-node.h7ml.cn/health
- **项目文档**：https://halolight.docs.h7ml.cn
- **Express 文档**：https://expressjs.com/
- **Prisma 文档**：https://www.prisma.io/docs

## 许可证

MIT License
