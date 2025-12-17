# Node.js Express 后端 API

HaloLight Node.js 后端 API 基于 Express 5 + TypeScript + Prisma 构建，提供企业级 RESTful API 服务。

**API 文档**：[https://halolight-api-node.h7ml.cn/docs](https://halolight-api-node.h7ml.cn/docs)

**GitHub**：[https://github.com/halolight/halolight-api-node](https://github.com/halolight/halolight-api-node)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 🗄️ **Prisma ORM** - 类型安全的数据库操作
- ✅ **数据验证** - Zod 请求参数校验，错误处理
- 📊 **日志系统** - Pino 日志记录，请求追踪
- 🐳 **Docker 支持** - 容器化部署
- 🎯 **12 个业务模块** - 90+ RESTful 端点

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | 20+ | JavaScript 运行时 |
| Express | 5.x | Web 框架 |
| Prisma | 6.x | 数据库 ORM |
| PostgreSQL | 16 | 数据存储 |
| Zod | 3.x | 数据验证 |
| JWT | 9.x | 身份认证 |
| Pino | 9.x | 日志系统 |
| Swagger UI | 5.x | API 文档 |

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 9
- PostgreSQL (可选，默认 SQLite)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-node.git
cd halolight-api-node

# 安装依赖
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/halolight?schema=public"

# JWT 密钥（必须 ≥32 字符）
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET="your-refresh-secret-key-minimum-32-characters-long"
REFRESH_TOKEN_EXPIRES_IN=30d

# 服务配置
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### 数据库初始化

```bash
# 生成 Prisma Client
pnpm db:generate

# 推送数据库变更
pnpm db:push

# 填充种子数据（可选）
pnpm db:seed
```

### 启动服务

```bash
# 开发模式
pnpm dev

# 生产模式
pnpm build
pnpm start
```

访问 http://localhost:3001

## 项目结构

```
halolight-api-node/
├── src/
│   ├── routes/               # 控制器/路由处理
│   │   ├── auth.ts          # 认证路由
│   │   ├── users.ts         # 用户管理
│   │   ├── roles.ts         # 角色管理
│   │   ├── permissions.ts   # 权限管理
│   │   ├── teams.ts         # 团队管理
│   │   ├── documents.ts     # 文档管理
│   │   ├── files.ts         # 文件管理
│   │   ├── folders.ts       # 文件夹管理
│   │   ├── calendar.ts      # 日历事件
│   │   ├── notifications.ts # 通知管理
│   │   ├── messages.ts      # 消息管理
│   │   └── dashboard.ts     # 仪表盘统计
│   ├── services/            # 业务逻辑层
│   ├── middleware/          # 中间件
│   │   ├── auth.ts          # JWT 认证 + RBAC
│   │   ├── validate.ts      # Zod 请求验证
│   │   └── error.ts         # 全局错误处理
│   ├── utils/               # 工具函数
│   ├── config/              # 配置文件
│   │   ├── env.ts           # 环境变量
│   │   └── swagger.ts       # Swagger 配置
│   └── index.ts             # 应用入口
├── prisma/                  # 数据库迁移/Schema
│   └── schema.prisma        # 数据库模型（17+ 模型）
├── tests/                   # 测试文件
├── Dockerfile               # Docker 配置
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

#### 角色管理 (Roles) - 6 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/roles` | 获取角色列表 |
| GET | `/api/roles/:id` | 获取角色详情 |
| POST | `/api/roles` | 创建角色 |
| PUT | `/api/roles/:id` | 更新角色 |
| DELETE | `/api/roles/:id` | 删除角色 |
| PUT | `/api/roles/:id/permissions` | 分配权限 |

#### 权限管理 (Permissions) - 4 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/permissions` | 获取权限列表 |
| GET | `/api/permissions/:id` | 获取权限详情 |
| POST | `/api/permissions` | 创建权限 |
| DELETE | `/api/permissions/:id` | 删除权限 |

#### 团队管理 (Teams) - 7 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/teams` | 获取团队列表 |
| GET | `/api/teams/:id` | 获取团队详情 |
| POST | `/api/teams` | 创建团队 |
| PUT | `/api/teams/:id` | 更新团队 |
| DELETE | `/api/teams/:id` | 删除团队 |
| POST | `/api/teams/:id/members` | 添加成员 |
| DELETE | `/api/teams/:id/members/:userId` | 移除成员 |

#### 文档管理 (Documents) - 11 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/documents` | 获取文档列表 |
| GET | `/api/documents/:id` | 获取文档详情 |
| POST | `/api/documents` | 创建文档 |
| PUT | `/api/documents/:id` | 更新文档 |
| DELETE | `/api/documents/:id` | 删除文档 |
| POST | `/api/documents/:id/share` | 分享文档 |
| DELETE | `/api/documents/:id/share/:shareId` | 取消分享 |
| POST | `/api/documents/:id/tags` | 添加标签 |
| DELETE | `/api/documents/:id/tags/:tagId` | 移除标签 |
| POST | `/api/documents/:id/move` | 移动文档 |
| POST | `/api/documents/:id/copy` | 复制文档 |

#### 文件管理 (Files) - 14 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/files` | 获取文件列表 |
| GET | `/api/files/:id` | 获取文件详情 |
| POST | `/api/files/upload` | 上传文件 |
| GET | `/api/files/:id/download` | 下载文件 |
| PUT | `/api/files/:id` | 更新文件信息 |
| DELETE | `/api/files/:id` | 删除文件 |
| POST | `/api/files/:id/move` | 移动文件 |
| POST | `/api/files/:id/copy` | 复制文件 |
| POST | `/api/files/:id/share` | 分享文件 |
| GET | `/api/files/:id/versions` | 获取版本历史 |
| GET | `/api/files/storage` | 获取存储信息 |
| POST | `/api/files/batch-delete` | 批量删除 |
| POST | `/api/files/batch-move` | 批量移动 |
| POST | `/api/files/search` | 搜索文件 |

#### 文件夹管理 (Folders) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/folders` | 获取文件夹树 |
| POST | `/api/folders` | 创建文件夹 |
| PUT | `/api/folders/:id` | 更新文件夹 |
| DELETE | `/api/folders/:id` | 删除文件夹 |
| POST | `/api/folders/:id/move` | 移动文件夹 |

#### 日历管理 (Calendar) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/calendar/events` | 获取日程列表 |
| GET | `/api/calendar/events/:id` | 获取日程详情 |
| POST | `/api/calendar/events` | 创建日程 |
| PUT | `/api/calendar/events/:id` | 更新日程 |
| DELETE | `/api/calendar/events/:id` | 删除日程 |
| POST | `/api/calendar/events/:id/attendees` | 添加参会人 |
| DELETE | `/api/calendar/events/:id/attendees/:userId` | 移除参会人 |
| POST | `/api/calendar/events/:id/reminder` | 设置提醒 |
| GET | `/api/calendar/events/upcoming` | 获取即将到来的事件 |

#### 通知管理 (Notifications) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/notifications` | 获取通知列表 |
| GET | `/api/notifications/:id` | 获取通知详情 |
| PUT | `/api/notifications/:id/read` | 标记已读 |
| PUT | `/api/notifications/read-all` | 全部已读 |
| DELETE | `/api/notifications/:id` | 删除通知 |

#### 消息管理 (Messages) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/messages/conversations` | 获取会话列表 |
| GET | `/api/messages/conversations/:id` | 获取会话详情 |
| POST | `/api/messages` | 发送消息 |
| PUT | `/api/messages/:id/read` | 标记已读 |
| DELETE | `/api/messages/:id` | 删除消息 |

#### 仪表盘 (Dashboard) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/dashboard/stats` | 统计数据 |
| GET | `/api/dashboard/visits` | 访问趋势 |
| GET | `/api/dashboard/sales` | 销售数据 |
| GET | `/api/dashboard/pie` | 饼图数据 |
| GET | `/api/dashboard/tasks` | 待办任务 |
| GET | `/api/dashboard/calendar` | 今日日程 |
| GET | `/api/dashboard/activities` | 最近活动 |
| GET | `/api/dashboard/notifications` | 未读通知 |
| GET | `/api/dashboard/users` | 用户统计 |

## 认证机制

### JWT 双令牌

```
Access Token:  7 天有效期，用于 API 请求
Refresh Token: 30 天有效期，用于刷新 Access Token
```

### 请求头

```http
Authorization: Bearer <access_token>
```

### 刷新流程

```typescript
// POST /api/auth/refresh
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken: 'your_refresh_token' })
});

const { accessToken, refreshToken } = await response.json();
// 更新本地存储的令牌
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);
```

## 权限系统

### 角色定义

| 角色 | 说明 | 权限 |
|------|------|------|
| `super_admin` | 超级管理员 | `*` (所有权限) |
| `admin` | 管理员 | `users:*`, `documents:*`, `files:*`, `teams:*` |
| `user` | 普通用户 | `documents:view`, `files:view`, `calendar:*` |
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

### 权限验证示例

```typescript
// 在路由中使用权限中间件
import { requireAuth, requirePermission } from './middleware/auth';

// 需要认证
router.get('/api/users/me', requireAuth, getUserProfile);

// 需要特定权限
router.post('/api/users', requireAuth, requirePermission('users:create'), createUser);

// 需要多个权限之一
router.put('/api/users/:id', requireAuth, requirePermission(['users:update', 'users:*']), updateUser);
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
pnpm dev              # 启动开发服务器（热重载）
pnpm build            # TypeScript 编译
pnpm start            # 启动生产服务器

# 测试
pnpm test             # 运行测试
pnpm test:coverage    # 测试覆盖率

# 数据库
pnpm db:generate      # 生成 Prisma Client
pnpm db:push          # 推送数据库变更
pnpm db:migrate       # 运行迁移
pnpm db:studio        # Prisma Studio（数据库 GUI）
pnpm db:seed          # 填充种子数据

# 代码质量
pnpm lint             # ESLint 检查
pnpm lint:fix         # 自动修复
pnpm format           # Prettier 格式化
```

## 部署

### Docker

```bash
docker build -t halolight-api-node .
docker run -p 3001:3001 halolight-api-node
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
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
    restart: unless-stopped
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 生产环境配置

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host:5432/halolight
JWT_SECRET=your-production-secret-minimum-32-characters
REFRESH_TOKEN_SECRET=your-refresh-secret-minimum-32-characters
CORS_ORIGIN=https://yourdomain.com
```

## 测试

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 监听模式
pnpm test:watch
```

### 测试示例

```typescript
// tests/auth.test.ts
import request from 'supertest';
import app from '../src/index';

describe('Authentication', () => {
  it('should login successfully', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@halolight.h7ml.cn',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('accessToken');
    expect(response.body.data).toHaveProperty('refreshToken');
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@halolight.h7ml.cn',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
```

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | ~8,000 req/s | 单核，简单查询 |
| 平均响应时间 | <10ms | 本地数据库，无复杂查询 |
| 内存占用 | ~80MB | 启动后基础内存 |
| CPU 使用率 | <5% | 空闲状态 |

### 性能优化建议

- 使用连接池管理数据库连接
- 启用数据库索引优化查询
- 实现缓存策略 (Redis)
- 使用 CDN 加速静态资源
- 启用 Gzip 压缩

## 可观测性

### 日志系统

```typescript
// 使用 Pino 日志记录
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});

// 记录请求日志
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip
  }, 'Incoming request');
  next();
});
```

### 健康检查

```typescript
// GET /health
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'connected'
  };

  try {
    // 检查数据库连接
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    health.status = 'unhealthy';
    health.database = 'disconnected';
    return res.status(503).json(health);
  }

  res.json(health);
});
```

### 监控指标

```typescript
// 集成 Prometheus 指标
import promClient from 'prom-client';

const register = new promClient.Registry();

// 默认指标
promClient.collectDefaultMetrics({ register });

// 自定义指标
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// 暴露指标端点
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});
```

## 常见问题

### Q：如何在多服务间共享数据库？

A：配置相同的 `DATABASE_URL` 并确保使用相同的 Prisma Schema。

```env
# 所有服务使用相同的数据库连接
DATABASE_URL="postgresql://user:pass@shared-db:5432/halolight"
```

```bash
# 确保 Schema 一致
pnpm db:push
```

### Q：JWT 令牌过期如何自动刷新？

A：在前端拦截器中检测 401 错误，自动调用刷新接口。

```typescript
// Axios 拦截器示例
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post('/api/auth/refresh', { refreshToken });

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        // 刷新失败，跳转登录页
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
```

### Q：如何实现文件上传限制？

A：使用 multer 中间件配置文件大小和类型限制。

```typescript
import multer from 'multer';

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('不支持的文件类型'));
    }
  }
});

router.post('/api/files/upload', upload.single('file'), uploadFile);
```

### Q：如何启用 HTTPS？

A：使用 Nginx 反向代理或在 Express 中配置 SSL 证书。

```typescript
// Express 中启用 HTTPS
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});
```

## 开发工具

### 推荐插件/工具

- **Prisma Studio** - 可视化数据库管理工具 (`pnpm db:studio`)
- **Postman** - API 测试工具 (可导入 Swagger 文档)
- **VSCode Extension Pack** - ESLint + Prettier + TypeScript
- **Docker Desktop** - 容器管理
- **pgAdmin** - PostgreSQL 数据库管理

### VSCode 配置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 与其他后端对比

| 特性 | Express | NestJS | Fastify | Koa |
|------|---------|--------|---------|-----|
| 语言 | JavaScript/TypeScript | TypeScript | JavaScript/TypeScript | JavaScript/TypeScript |
| 性能 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 生态系统 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 内置功能 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| 社区支持 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

### 为什么选择 Express？

- **成熟稳定** - 超过 10 年的生产验证
- **灵活性高** - 最小化框架，可自由组合中间件
- **生态丰富** - 海量第三方插件和工具
- **学习成本低** - 简单易懂，适合快速上手
- **社区活跃** - 大量文档和问题解答

## 相关链接

- [API 文档](https://halolight-api-node.h7ml.cn/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-node)
- [Express 官方文档](https://expressjs.com/)
- [Prisma 文档](https://www.prisma.io/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
