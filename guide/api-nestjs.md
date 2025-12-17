# TypeScript NestJS 后端 API

HaloLight NestJS 后端 API 基于 NestJS 11 构建，提供企业级后端服务和完整的 RBAC 权限系统。

**API 文档**：[https://halolight-api-nestjs.h7ml.cn/docs](https://halolight-api-nestjs.h7ml.cn/docs)

**GitHub**：[https://github.com/halolight/halolight-api-nestjs](https://github.com/halolight/halolight-api-nestjs)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 🗄️ **Prisma ORM** - 类型安全的数据库操作
- ✅ **数据验证** - 请求参数校验，错误处理
- 📊 **日志系统** - 请求日志，错误追踪
- 🐳 **Docker 支持** - 容器化部署

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| TypeScript | 5.7 | 运行时 |
| NestJS | 11 | Web 框架 |
| Prisma | 5 | 数据库 ORM |
| PostgreSQL | 16 | 数据存储 |
| class-validator | - | 数据验证 |
| JWT | - | 身份认证 |
| Swagger | - | API 文档 |

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- PostgreSQL (可选，默认 SQLite)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-nestjs.git
cd halolight-api-nestjs

# 安装依赖
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/halolight_db

# JWT 密钥
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# 服务配置
PORT=3000
NODE_ENV=development
```

### 数据库初始化

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

### 启动服务

```bash
# 开发模式
pnpm dev

# 生产模式
pnpm build
pnpm start:prod
```

访问 http://localhost:3000

## 项目结构

```
halolight-api-nestjs/
├── src/
│   ├── common/                  # 共享模块
│   ├── configs/                 # 配置模块
│   ├── infrastructure/          # 基础设施层
│   ├── modules/                 # 业务模块（12 个）
│   │   ├── auth/                # 认证模块
│   │   ├── users/               # 用户管理
│   │   ├── roles/               # 角色管理
│   │   ├── permissions/         # 权限管理
│   │   ├── teams/               # 团队管理
│   │   ├── documents/           # 文档管理
│   │   ├── files/               # 文件管理
│   │   ├── folders/             # 文件夹管理
│   │   ├── calendar/            # 日历管理
│   │   ├── notifications/       # 通知管理
│   │   ├── messages/            # 消息管理
│   │   └── dashboard/           # 仪表盘统计
│   ├── app.controller.ts        # 根控制器
│   ├── app.service.ts           # 根服务
│   ├── app.module.ts            # 根模块
│   └── main.ts                  # 应用入口
├── prisma/
│   ├── schema.prisma            # 数据库模型定义
│   └── migrations/              # 数据库迁移历史
├── test/                        # 测试文件
├── Dockerfile                   # Docker 配置
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

#### 文档管理 (Documents) - 11 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/documents` | 获取文档列表 |
| GET | `/api/documents/:id` | 获取文档详情 |
| POST | `/api/documents` | 创建文档 |
| PUT | `/api/documents/:id` | 更新文档 |
| DELETE | `/api/documents/:id` | 删除文档 |

#### 文件管理 (Files) - 14 个端点

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

#### 通知管理 (Notifications) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/notifications` | 获取通知列表 |
| PUT | `/api/notifications/:id/read` | 标记已读 |
| PUT | `/api/notifications/read-all` | 全部已读 |
| DELETE | `/api/notifications/:id` | 删除通知 |

#### 日历管理 (Calendar) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/calendar/events` | 获取日程列表 |
| GET | `/api/calendar/events/:id` | 获取日程详情 |
| POST | `/api/calendar/events` | 创建日程 |
| PUT | `/api/calendar/events/:id` | 更新日程 |
| DELETE | `/api/calendar/events/:id` | 删除日程 |

#### 仪表盘 (Dashboard) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/dashboard/stats` | 统计数据 |
| GET | `/api/dashboard/visits` | 访问趋势 |
| GET | `/api/dashboard/sales` | 销售数据 |
| GET | `/api/dashboard/pie` | 饼图数据 |
| GET | `/api/dashboard/tasks` | 待办任务 |
| GET | `/api/dashboard/overview` | 系统概览 |

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
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
});

const { accessToken, refreshToken: newRefreshToken } = await response.json();
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
pnpm dev              # 启动开发服务器
pnpm start:debug      # 调试模式

# 构建
pnpm build            # 构建生产版本
pnpm start:prod       # 运行生产版本

# 测试
pnpm test             # 运行单元测试
pnpm test:e2e         # 运行 E2E 测试
pnpm test:cov         # 生成覆盖率报告

# 数据库
pnpm prisma:generate  # 生成 Prisma Client
pnpm prisma:migrate   # 运行迁移
pnpm prisma:studio    # Prisma Studio GUI
pnpm prisma:seed      # 运行种子数据

# 代码质量
pnpm lint             # ESLint 检查
pnpm lint:fix         # 自动修复
pnpm format           # Prettier 格式化
```

## 部署

### Docker

```bash
docker build -t halolight-api-nestjs .
docker run -p 3000:3000 halolight-api-nestjs
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
      - "3000:3000"
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
pnpm test             # 单元测试
pnpm test:e2e         # E2E 测试
pnpm test:cov         # 覆盖率报告
```

### 测试示例

```typescript
describe('AuthController', () => {
  it('should login user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });
});
```

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | 5000+ QPS | 单核 CPU |
| 平均响应时间 | <50ms | 简单查询 |
| 内存占用 | ~150MB | 启动后 |
| CPU 使用率 | <30% | 正常负载 |

## 可观测性

### 日志系统

```typescript
// 日志配置
import { WinstonModule } from 'nest-winston';

WinstonModule.forRoot({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 健康检查

```typescript
// GET /health
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" }
  }
}
```

### 监控指标

```typescript
// Prometheus 指标端点
// GET /metrics
http_requests_total{method="GET",status="200"} 1234
http_request_duration_seconds{quantile="0.99"} 0.052
```

## 常见问题

### Q：如何配置数据库连接？

A：在 `.env` 文件中设置 `DATABASE_URL`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/halolight"
```

### Q：如何处理文件上传？

A：使用 `@nestjs/platform-express` 的 `FileInterceptor`

```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return { filename: file.originalname };
}
```

## 开发工具

### 推荐插件/工具

- **Prisma Studio** - 数据库可视化管理
- **Swagger UI** - API 文档和测试
- **Postman** - API 调试工具
- **NestJS CLI** - 代码生成工具

## 与其他后端对比

| 特性 | NestJS | FastAPI | Spring Boot | Laravel |
|------|--------|---------|-------------|---------|
| 语言 | TypeScript | Python | Java | PHP |
| ORM | Prisma | SQLAlchemy | JPA | Eloquent |
| 性能 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |

## 相关链接

- [API 文档](https://halolight-api-nestjs.h7ml.cn/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-nestjs)
- [NestJS 官方文档](https://docs.nestjs.com)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
