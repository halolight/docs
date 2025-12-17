# Bun Hono 后端 API

HaloLight Bun 后端 API 基于 Bun + Hono + Drizzle ORM 构建，提供超高性能后端服务。

**API 文档**：[https://halolight-api-bun.h7ml.cn/docs](https://halolight-api-bun.h7ml.cn/docs)

**GitHub**：[https://github.com/halolight/halolight-api-bun](https://github.com/halolight/halolight-api-bun)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 🗄️ **Drizzle ORM** - 类型安全的数据库操作
- ✅ **数据验证** - 请求参数校验，错误处理
- 📊 **日志系统** - 请求日志，错误追踪
- 🐳 **Docker 支持** - 容器化部署
- ⚡ **极速性能** - 比 Node.js 快 4 倍

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Bun | 1.1+ | 运行时 |
| Hono | 4.x | Web 框架 |
| Drizzle ORM | 0.36+ | 数据库 ORM |
| PostgreSQL | 15+ | 数据存储 |
| Zod | 3.x | 数据验证 |
| JWT | - | 身份认证 |
| Swagger | - | API 文档 |

## 快速开始

### 环境要求

- Bun >= 1.1
- pnpm >= 8.0
- PostgreSQL (可选，默认 SQLite)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-bun.git
cd halolight-api-bun

# 安装依赖
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/halolight

# JWT 密钥
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# 服务配置
PORT=3002
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
API_PREFIX=/api
```

### 数据库初始化

```bash
bun run db:push
bun run db:seed
```

### 启动服务

```bash
# 开发模式
bun run dev

# 生产模式
bun run build
bun run start
```

访问 http://localhost:3002

## 项目结构

```
halolight-api-bun/
├── src/
│   ├── routes/          # 控制器/路由处理
│   ├── services/        # 业务逻辑层
│   ├── db/              # 数据模型
│   ├── middleware/      # 中间件
│   ├── utils/           # 工具函数
│   └── index.ts         # 应用入口
├── test/                # 测试文件
├── Dockerfile           # Docker 配置
├── docker-compose.yml
└── package.json
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
// 刷新令牌示例
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    refreshToken: 'your_refresh_token'
  })
});

const { accessToken, refreshToken } = await response.json();
```

## 权限系统

### 角色定义

| 角色 | 说明 | 权限 |
|------|------|------|
| `super_admin` | 超级管理员 | `*` (所有权限) |
| `admin` | 管理员 | `users:*`, `documents:*`, ... |
| `user` | 普通用户 | `documents:view`, `files:view`, ... |
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
bun run dev                 # 启动开发服务器
bun run build               # 生产构建
bun run start               # 运行生产版本

# 构建
bun run build               # 构建生产版本

# 测试
bun test                    # 运行单元测试
bun test --coverage         # 生成覆盖率报告

# 数据库
bun run db:push             # 推送 Schema 到数据库
bun run db:generate         # 生成迁移文件
bun run db:migrate          # 运行数据库迁移
bun run db:seed             # 填充测试数据
bun run db:studio           # 打开 Drizzle Studio

# 代码质量
bun run lint                # ESLint 检查
bun run lint:fix            # ESLint 自动修复
bun run type-check          # TypeScript 类型检查
```

## 部署

### Docker

```bash
docker build -t halolight-api-bun .
docker run -p 3002:3002 halolight-api-bun
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
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 生产环境配置

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-production-secret
```

## 测试

### 运行测试

```bash
bun test                    # 运行所有测试
bun test --coverage         # 生成覆盖率报告
```

### 测试示例

```typescript
// 认证测试示例
import { describe, test, expect } from 'bun:test';

describe('Auth API', () => {
  test('should login successfully', async () => {
    const response = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      })
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.accessToken).toBeDefined();
  });
});
```

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | ~50,000 req/s | 单核，简单路由 |
| 平均响应时间 | <5ms | 本地数据库 |
| 内存占用 | ~30MB | 冷启动 |
| CPU 使用率 | <10% | 空闲状态 |

## 可观测性

### 日志系统

```typescript
// 日志配置示例
import { logger } from './utils/logger';

logger.info('User logged in', { userId: user.id });
logger.error('Database error', { error: err.message });
```

### 健康检查

```typescript
// GET /health
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### 监控指标

```typescript
// Prometheus metrics 端点
app.get('/metrics', async (c) => {
  return c.text(await register.metrics());
});
```

## 常见问题

### Q：如何配置数据库连接？

A：在 `.env` 文件中设置 `DATABASE_URL`：

```env
DATABASE_URL=postgresql://user:password@localhost:5432/halolight
```

### Q：如何使用 Bun 内置密码哈希？

A：使用 `Bun.password` API：

```typescript
// 哈希密码
const hash = await Bun.password.hash(password, {
  algorithm: 'bcrypt',
  cost: 10
});

// 验证密码
const isValid = await Bun.password.verify(password, hash, 'bcrypt');
```

## 开发工具

### 推荐插件/工具

- **Drizzle Studio** - 可视化数据库管理工具
- **Hoppscotch/Postman** - API 测试工具
- **ESLint + Prettier** - 代码格式化
- **Bun VSCode Extension** - Bun 语法支持

## 与其他后端对比

| 特性 | Bun + Hono | NestJS | FastAPI | Spring Boot |
|------|-----------|--------|---------|-------------|
| 语言 | TypeScript | TypeScript | Python | Java |
| ORM | Drizzle | Prisma | SQLAlchemy | JPA |
| 性能 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## 相关链接

- [API 文档](https://halolight-api-bun.h7ml.cn/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-bun)
- [Bun 官方文档](https://bun.sh/docs)
- [Hono 官方文档](https://hono.dev/docs)
- [Drizzle ORM 文档](https://orm.drizzle.team/docs/overview)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
