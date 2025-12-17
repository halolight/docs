# Go Fiber 后端 API

HaloLight Go Fiber 后端 API 基于 Fiber 3.0 构建，提供高性能 Go 后端服务和完整的 JWT 双令牌认证。

**API 文档**：[https://halolight-api-go.h7ml.cn/docs](https://halolight-api-go.h7ml.cn/docs)

**GitHub**：[https://github.com/halolight/halolight-api-go](https://github.com/halolight/halolight-api-go)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 🗄️ **GORM 2** - 类型安全的数据库操作
- ✅ **数据验证** - 请求参数校验，错误处理
- 📊 **日志系统** - 请求日志，错误追踪
- 🐳 **Docker 支持** - 容器化部署

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Go | 1.22+ | 运行时 |
| Fiber | 3.0 | Web 框架 |
| GORM | 2.0 | 数据库 ORM |
| PostgreSQL | 16 | 数据存储 |
| go-playground/validator | v10 | 数据验证 |
| JWT | golang-jwt/jwt/v5 | 身份认证 |
| Swagger UI | - | API 文档 |

## 快速开始

### 环境要求

- Go >= 1.22
- PostgreSQL 16 (可选，默认 SQLite)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# 安装依赖
go mod download
```

### 环境变量

```bash
cp .env.example .env
```

```env
# 数据库
DATABASE_URL=postgresql://user:pass@localhost:5432/halolight?sslmode=disable

# JWT 密钥
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=7d
JWT_REFRESH_EXPIRES=30d

# 服务配置
PORT=8080
APP_ENV=development
```

### 数据库初始化

```bash
# GORM 自动迁移
go run cmd/server/main.go

# 或使用 Makefile
make migrate
```

### 启动服务

```bash
# 开发模式
go run cmd/server/main.go

# 生产模式
make build
./bin/server
```

访问 http://localhost:8080

## 项目结构

```
halolight-api-go/
├── cmd/
│   └── server/
│       └── main.go              # 应用入口
├── internal/
│   ├── handlers/                # 控制器/路由处理
│   │   ├── auth_handler.go      # 认证端点
│   │   ├── user_handler.go      # 用户管理
│   │   ├── role_handler.go      # 角色管理
│   │   ├── permission_handler.go # 权限管理
│   │   ├── team_handler.go      # 团队管理
│   │   ├── document_handler.go  # 文档管理
│   │   ├── file_handler.go      # 文件管理
│   │   ├── folder_handler.go    # 文件夹管理
│   │   ├── calendar_handler.go  # 日历事件
│   │   ├── notification_handler.go # 通知管理
│   │   ├── message_handler.go   # 消息管理
│   │   ├── dashboard_handler.go # 仪表盘统计
│   │   └── home_handler.go      # 首页 + 健康检查
│   ├── services/                # 业务逻辑层
│   │   ├── auth_service.go
│   │   ├── user_service.go
│   │   └── ...
│   ├── models/                  # 数据模型
│   │   ├── user.go
│   │   ├── role.go
│   │   └── ...
│   ├── middleware/              # 中间件
│   │   ├── auth.go
│   │   └── cors.go
│   └── routes/                  # 路由配置
│       └── router.go
├── pkg/
│   ├── config/                  # 配置管理
│   ├── database/                # 数据库连接
│   └── utils/                   # 工具函数
├── docs/                        # 文档
├── .github/workflows/           # GitHub Actions
├── Dockerfile                   # Docker 配置
├── docker-compose.yml
└── go.mod
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
| GET | `/api/auth/me` | 获取当前用户 | 需认证 |

### 用户管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/users` | 获取用户列表 | `users:view` |
| GET | `/api/users/:id` | 获取用户详情 | `users:view` |
| POST | `/api/users` | 创建用户 | `users:create` |
| PUT | `/api/users/:id` | 更新用户 | `users:update` |
| DELETE | `/api/users/:id` | 删除用户 | `users:delete` |
| PATCH | `/api/users/:id/status` | 更新用户状态 | `users:update` |
| POST | `/api/users/batch-delete` | 批量删除用户 | `users:delete` |

### 完整端点清单

#### 角色管理 (Roles) - 6 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/roles` | 获取角色列表 |
| GET | `/api/roles/:id` | 获取角色详情 |
| POST | `/api/roles` | 创建角色 |
| PUT | `/api/roles/:id` | 更新角色 |
| POST | `/api/roles/:id/permissions` | 分配权限 |
| DELETE | `/api/roles/:id` | 删除角色 |

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
| PATCH | `/api/teams/:id` | 更新团队 |
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
| PATCH | `/api/documents/:id/rename` | 重命名文档 |
| POST | `/api/documents/:id/move` | 移动文档 |
| POST | `/api/documents/:id/tags` | 更新标签 |
| POST | `/api/documents/:id/share` | 分享文档 |
| POST | `/api/documents/:id/unshare` | 取消分享 |
| POST | `/api/documents/batch-delete` | 批量删除 |
| DELETE | `/api/documents/:id` | 删除文档 |

#### 文件管理 (Files) - 14 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/files/upload` | 上传文件 |
| POST | `/api/files/folder` | 创建文件夹 |
| GET | `/api/files` | 获取文件列表 |
| GET | `/api/files/storage` | 获取存储信息 |
| GET | `/api/files/:id` | 获取文件详情 |
| GET | `/api/files/:id/download-url` | 获取下载链接 |
| PATCH | `/api/files/:id/rename` | 重命名文件 |
| POST | `/api/files/:id/move` | 移动文件 |
| POST | `/api/files/:id/copy` | 复制文件 |
| PATCH | `/api/files/:id/favorite` | 收藏/取消收藏 |
| POST | `/api/files/:id/share` | 分享文件 |
| POST | `/api/files/batch-delete` | 批量删除 |
| DELETE | `/api/files/:id` | 删除文件 |

#### 文件夹管理 (Folders) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/folders` | 获取文件夹列表 |
| GET | `/api/folders/tree` | 获取树形结构 |
| GET | `/api/folders/:id` | 获取文件夹详情 |
| POST | `/api/folders` | 创建文件夹 |
| DELETE | `/api/folders/:id` | 删除文件夹 |

#### 消息管理 (Messages) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/messages/conversations` | 获取会话列表 |
| GET | `/api/messages/conversations/:id` | 获取会话详情 |
| POST | `/api/messages` | 发送消息 |
| PUT | `/api/messages/:id/read` | 标记已读 |
| DELETE | `/api/messages/:id` | 删除消息 |

#### 通知管理 (Notifications) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/notifications` | 获取通知列表 |
| GET | `/api/notifications/unread-count` | 获取未读数量 |
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
| PATCH | `/api/calendar/events/:id/reschedule` | 重新安排 |
| POST | `/api/calendar/events/:id/attendees` | 添加参会人 |
| DELETE | `/api/calendar/events/:id/attendees/:attendeeId` | 移除参会人 |
| POST | `/api/calendar/events/batch-delete` | 批量删除 |
| DELETE | `/api/calendar/events/:id` | 删除日程 |

#### 仪表盘 (Dashboard) - 9 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/dashboard/stats` | 统计数据 |
| GET | `/api/dashboard/visits` | 访问趋势 |
| GET | `/api/dashboard/sales` | 销售数据 |
| GET | `/api/dashboard/products` | 产品数据 |
| GET | `/api/dashboard/orders` | 订单数据 |
| GET | `/api/dashboard/activities` | 活动数据 |
| GET | `/api/dashboard/pie` | 饼图数据 |
| GET | `/api/dashboard/tasks` | 待办任务 |
| GET | `/api/dashboard/overview` | 总览数据 |

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

```go
// 刷新令牌示例
func RefreshToken(c *fiber.Ctx) error {
    type RefreshRequest struct {
        RefreshToken string `json:"refreshToken"`
    }

    var req RefreshRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "success": false,
            "message": "Invalid request",
        })
    }

    // 验证 refresh token
    claims, err := utils.ValidateToken(req.RefreshToken)
    if err != nil {
        return c.Status(401).JSON(fiber.Map{
            "success": false,
            "message": "Invalid refresh token",
        })
    }

    // 生成新的 access token
    accessToken, err := utils.GenerateAccessToken(claims.UserID)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{
            "success": false,
            "message": "Failed to generate token",
        })
    }

    return c.JSON(fiber.Map{
        "success": true,
        "accessToken": accessToken,
    })
}
```

## 权限系统

### 角色定义

| 角色 | 说明 | 权限 |
|------|------|------|
| `super_admin` | 超级管理员 | `*` (所有权限) |
| `admin` | 管理员 | `users:*`, `documents:*`, `files:*`, `teams:*` |
| `user` | 普通用户 | `documents:view`, `documents:create`, `files:*` |
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
go run cmd/server/main.go

# 构建
go build -o bin/server cmd/server/main.go

# 测试
go test ./...

# 数据库
make migrate

# 代码质量
go vet ./...
golangci-lint run
```

## 部署

### Docker

```bash
docker build -t halolight-api-go .
docker run -p 8080:8080 halolight-api-go
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
      - "8080:8080"
    environment:
      - APP_ENV=production
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
APP_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-production-secret
```

## 测试

### 运行测试

```bash
# 单元测试
go test ./...

# 测试覆盖率
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

### 测试示例

```go
func TestUserLogin(t *testing.T) {
    app := fiber.New()

    // 设置路由
    app.Post("/api/auth/login", handlers.Login)

    // 准备测试数据
    reqBody := `{"email":"test@example.com","password":"password123"}`
    req := httptest.NewRequest("POST", "/api/auth/login", strings.NewReader(reqBody))
    req.Header.Set("Content-Type", "application/json")

    // 执行请求
    resp, _ := app.Test(req)

    // 验证响应
    assert.Equal(t, 200, resp.StatusCode)
}
```

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | 10,000+ QPS | 单机，8 核 CPU |
| 平均响应时间 | < 10ms | 简单查询 |
| 内存占用 | ~50MB | 空闲状态 |
| CPU 使用率 | < 10% | 空闲状态 |

## 可观测性

### 日志系统

```go
// 日志配置
logger := log.New(os.Stdout, "API: ", log.LstdFlags)

app.Use(func(c *fiber.Ctx) error {
    start := time.Now()
    err := c.Next()
    logger.Printf("%s %s %s %v",
        c.Method(),
        c.Path(),
        c.IP(),
        time.Since(start),
    )
    return err
})
```

### 健康检查

```go
// 健康检查端点
app.Get("/health", func(c *fiber.Ctx) error {
    return c.JSON(fiber.Map{
        "status": "healthy",
        "timestamp": time.Now(),
        "database": db.Ping() == nil,
    })
})
```

### 监控指标

```go
// Prometheus 指标
import "github.com/prometheus/client_golang/prometheus"

var (
    requestCounter = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "api_requests_total",
            Help: "Total API requests",
        },
        []string{"method", "path", "status"},
    )
)
```

## 常见问题

### Q：JWT 密钥长度要求？

A：JWT 密钥至少 32 字符，建议使用 64 字符以上的随机字符串。

```bash
# 生成安全密钥
openssl rand -base64 64
```

### Q：数据库连接失败？

A：检查数据库配置和网络连接。

```bash
# 检查 PostgreSQL 状态
docker-compose ps postgres

# 测试连接
psql -h localhost -U postgres -d halolight
```

## 开发工具

### 推荐插件/工具

- **Air** - Go 热重载工具
- **golangci-lint** - Go 代码检查
- **goose** - 数据库迁移工具
- **mockery** - Mock 生成工具

## 与其他后端对比

| 特性 | Go Fiber | NestJS | FastAPI | Spring Boot |
|------|----------|--------|---------|-------------|
| 语言 | Go | TypeScript | Python | Java |
| ORM | GORM | Prisma | SQLAlchemy | JPA |
| 性能 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## 相关链接

- [API 文档](https://halolight-api-go.h7ml.cn/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-go)
- [Fiber 官方文档](https://docs.gofiber.io)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
