# Go Gin 后端 API

HaloLight Go 后端 API，基于 Gin 1.10 + GORM 2 框架构建的高性能后端服务，提供完整的 JWT 双令牌认证和 RBAC 权限系统。

## 特性

- **Gin 1.10** - 高性能 HTTP Web 框架，路由快速、内存占用小
- **GORM 2** - 强大的 ORM 库，支持自动迁移、关联查询、软删除
- **JWT 双令牌** - AccessToken + RefreshToken 认证机制，7 天 + 30 天有效期
- **RBAC 权限** - 基于角色的访问控制，支持通配符权限 (users:*, *)
- **ULID 主键** - 26 字符唯一 ID，时间排序、URL 安全
- **请求验证** - Gin Binding 自动验证请求数据
- **统一响应** - 标准化的 JSON 响应格式
- **Docker 部署** - 多阶段构建优化，镜像大小仅 20MB
- **CI/CD 就绪** - GitHub Actions 自动测试、构建、安全扫描

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Gin 1.10 |
| 语言 | Go 1.22+ |
| ORM | GORM 2 |
| 数据库 | PostgreSQL 16 |
| 认证 | JWT (golang-jwt/jwt/v5) |
| 验证 | Gin Binding + go-playground/validator |
| ID 生成 | ULID (oklog/ulid) |
| 文档 | Swagger UI |
| 测试 | Go testing + race detector |
| 容器化 | Docker + Docker Compose |

## 快速开始

### 方式 1：本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# 2. 安装 Go 1.22+
# macOS
brew install go

# Ubuntu
sudo apt install golang-1.22

# 3. 安装依赖
go mod download

# 4. 配置环境变量
cp .env.example .env
# 编辑 .env 文件配置数据库和 JWT 密钥

# 5. 启动 PostgreSQL（使用 Docker）
docker-compose up -d postgres

# 6. 运行开发服务器
go run cmd/server/main.go

# 服务将在 http://localhost:8080 启动
```

### 方式 2：Docker Compose

```bash
# 1. 克隆仓库
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# 2. 配置环境变量
cp .env.example .env

# 3. 启动所有服务
docker-compose up -d

# 访问服务
# - API: http://localhost:8080
# - Swagger: http://localhost:8080/docs
# - 健康检查: http://localhost:8080/health
```

### 方式 3：使用 Makefile

```bash
# 开发模式（热重载）
make dev

# 构建
make build

# 运行
make run

# 测试
make test

# 测试覆盖率
make test-coverage

# 代码检查
make lint

# 清理
make clean
```

## 项目结构

```
halolight-api-go/
├── cmd/                          # 应用入口
│   └── server/
│       └── main.go               # 主入口文件
├── internal/                     # 内部包（不可外部导入）
│   ├── handlers/                 # HTTP 处理器层（13 个）
│   │   ├── auth_handler.go       # 认证端点（登录、注册、刷新令牌）
│   │   ├── user_handler.go       # 用户管理
│   │   ├── role_handler.go       # 角色管理
│   │   ├── permission_handler.go # 权限管理
│   │   ├── team_handler.go       # 团队管理
│   │   ├── document_handler.go   # 文档管理
│   │   ├── file_handler.go       # 文件管理
│   │   ├── folder_handler.go     # 文件夹管理
│   │   ├── calendar_handler.go   # 日历事件
│   │   ├── notification_handler.go # 通知管理
│   │   ├── message_handler.go    # 消息管理
│   │   ├── dashboard_handler.go  # 仪表盘统计
│   │   ├── home_handler.go       # 首页 + 健康检查
│   │   └── helpers.go            # 辅助函数
│   ├── middleware/               # 中间件
│   │   ├── auth.go               # JWT 认证中间件
│   │   └── cors.go               # CORS 中间件
│   ├── models/                   # GORM 数据模型（17 个）
│   │   ├── user.go               # 用户模型
│   │   ├── role.go               # 角色模型
│   │   ├── permission.go         # 权限模型
│   │   ├── refresh_token.go      # 刷新令牌
│   │   ├── team.go               # 团队模型
│   │   ├── document.go           # 文档模型
│   │   ├── file.go               # 文件模型
│   │   ├── message.go            # 消息模型
│   │   ├── calendar.go           # 日历事件
│   │   ├── notification.go       # 通知模型
│   │   ├── activity.go           # 活动日志
│   │   └── ulid.go               # ULID 生成器
│   ├── repository/               # 数据访问层
│   │   ├── user_repository.go
│   │   └── refresh_token_repository.go
│   ├── services/                 # 业务逻辑层（12 个）
│   │   ├── auth_service.go       # 认证服务
│   │   ├── user_service.go       # 用户服务
│   │   ├── role_service.go       # 角色服务
│   │   ├── permission_service.go # 权限服务
│   │   ├── team_service.go       # 团队服务
│   │   ├── document_service.go   # 文档服务
│   │   ├── file_service.go       # 文件服务
│   │   ├── folder_service.go     # 文件夹服务
│   │   ├── calendar_service.go   # 日历服务
│   │   ├── notification_service.go # 通知服务
│   │   ├── message_service.go    # 消息服务
│   │   └── dashboard_service.go  # 仪表盘服务
│   └── routes/                   # 路由配置
│       └── router.go             # 路由注册
├── pkg/                          # 公共包（可外部导入）
│   ├── config/                   # 配置管理
│   │   └── config.go             # 环境变量加载
│   ├── database/                 # 数据库连接
│   │   └── database.go           # GORM 初始化
│   └── utils/                    # 工具函数
│       ├── jwt.go                # JWT 生成/验证
│       ├── hash.go               # 密码哈希
│       └── response.go           # 响应辅助函数
├── docs/                         # 文档
│   └── swagger-ui/               # Swagger UI 静态文件
├── .github/workflows/            # GitHub Actions
│   └── ci.yml                    # CI/CD 配置
├── .env.example                  # 环境变量示例
├── .gitignore                    # Git 忽略配置
├── Dockerfile                    # Docker 多阶段构建
├── docker-compose.yml            # Docker Compose 配置
├── Makefile                      # Make 命令
├── go.mod                        # Go 模块定义
├── go.sum                        # Go 依赖锁定
├── CLAUDE.md                     # Claude 开发指南
├── NEON_SETUP.md                 # Neon 数据库配置
└── README.md                     # 项目说明
```

## API 模块

HaloLight Go API 提供 **12 个核心业务模块**，共 **90+ RESTful API 端点**：

### 1。认证模块 (Auth) - 7 个端点

```
POST   /api/auth/register         # 用户注册
POST   /api/auth/login            # 用户登录
POST   /api/auth/refresh          # 刷新令牌
POST   /api/auth/logout           # 登出
GET    /api/auth/me               # 获取当前用户
POST   /api/auth/forgot-password  # 忘记密码
POST   /api/auth/reset-password   # 重置密码
```

### 2。用户模块 (Users) - 7 个端点

```
GET    /api/users                 # 获取用户列表（分页、搜索）
GET    /api/users/:id             # 获取用户详情
POST   /api/users                 # 创建用户
PUT    /api/users/:id             # 更新用户
PATCH  /api/users/:id/status      # 更新用户状态
POST   /api/users/batch-delete    # 批量删除用户
DELETE /api/users/:id             # 删除用户
```

### 3。角色模块 (Roles) - 6 个端点

```
GET    /api/roles                 # 获取角色列表
GET    /api/roles/:id             # 获取角色详情
POST   /api/roles                 # 创建角色
PUT    /api/roles/:id             # 更新角色
POST   /api/roles/:id/permissions # 分配权限
DELETE /api/roles/:id             # 删除角色
```

### 4。权限模块 (Permissions) - 4 个端点

```
GET    /api/permissions           # 获取权限列表
GET    /api/permissions/:id       # 获取权限详情
POST   /api/permissions           # 创建权限
DELETE /api/permissions/:id       # 删除权限
```

### 5。团队模块 (Teams) - 7 个端点

```
GET    /api/teams                 # 获取团队列表
GET    /api/teams/:id             # 获取团队详情
POST   /api/teams                 # 创建团队
PATCH  /api/teams/:id             # 更新团队
DELETE /api/teams/:id             # 删除团队
POST   /api/teams/:id/members     # 添加成员
DELETE /api/teams/:id/members/:userId # 移除成员
```

### 6。文档模块 (Documents) - 11 个端点

```
GET    /api/documents             # 获取文档列表（分页、搜索）
GET    /api/documents/:id         # 获取文档详情
POST   /api/documents             # 创建文档
PUT    /api/documents/:id         # 更新文档
PATCH  /api/documents/:id/rename  # 重命名文档
POST   /api/documents/:id/move    # 移动文档
POST   /api/documents/:id/tags    # 更新标签
POST   /api/documents/:id/share   # 分享文档
POST   /api/documents/:id/unshare # 取消分享
POST   /api/documents/batch-delete # 批量删除
DELETE /api/documents/:id         # 删除文档
```

### 7。文件模块 (Files) - 14 个端点

```
POST   /api/files/upload          # 上传文件
POST   /api/files/folder          # 创建文件夹
GET    /api/files                 # 获取文件列表
GET    /api/files/storage         # 获取存储信息
GET    /api/files/storage-info    # 获取存储信息（别名）
GET    /api/files/:id             # 获取文件详情
GET    /api/files/:id/download-url # 获取下载链接
PATCH  /api/files/:id/rename      # 重命名文件
POST   /api/files/:id/move        # 移动文件
POST   /api/files/:id/copy        # 复制文件
PATCH  /api/files/:id/favorite    # 收藏/取消收藏
POST   /api/files/:id/share       # 分享文件
POST   /api/files/batch-delete    # 批量删除
DELETE /api/files/:id             # 删除文件
```

### 8。文件夹模块 (Folders) - 5 个端点

```
GET    /api/folders               # 获取文件夹列表
GET    /api/folders/tree          # 获取树形结构
GET    /api/folders/:id           # 获取文件夹详情
POST   /api/folders               # 创建文件夹
DELETE /api/folders/:id           # 删除文件夹
```

### 9。日历模块 (Calendar) - 9 个端点

```
GET    /api/calendar/events       # 获取事件列表
GET    /api/calendar/events/:id   # 获取事件详情
POST   /api/calendar/events       # 创建事件
PUT    /api/calendar/events/:id   # 更新事件
PATCH  /api/calendar/events/:id/reschedule # 重新安排
POST   /api/calendar/events/:id/attendees   # 添加参会人
DELETE /api/calendar/events/:id/attendees/:attendeeId # 移除参会人
POST   /api/calendar/events/batch-delete # 批量删除
DELETE /api/calendar/events/:id   # 删除事件
```

### 10。通知模块 (Notifications) - 5 个端点

```
GET    /api/notifications         # 获取通知列表
GET    /api/notifications/unread-count # 获取未读数量
PUT    /api/notifications/:id/read # 标记为已读
PUT    /api/notifications/read-all # 全部标记为已读
DELETE /api/notifications/:id     # 删除通知
```

### 11。消息模块 (Messages) - 5 个端点

```
GET    /api/messages/conversations # 获取会话列表
GET    /api/messages/conversations/:id # 获取会话详情
POST   /api/messages              # 发送消息
PUT    /api/messages/:id/read     # 标记消息已读
DELETE /api/messages/:id          # 删除消息
```

### 12。仪表盘模块 (Dashboard) - 9 个端点

```
GET    /api/dashboard/stats       # 获取统计数据
GET    /api/dashboard/visits      # 获取访问数据
GET    /api/dashboard/sales       # 获取销售数据
GET    /api/dashboard/products    # 获取产品数据
GET    /api/dashboard/orders      # 获取订单数据
GET    /api/dashboard/activities  # 获取活动数据
GET    /api/dashboard/pie         # 获取饼图数据
GET    /api/dashboard/tasks       # 获取任务数据
GET    /api/dashboard/overview    # 获取总览数据
```

## 认证系统

### JWT 双令牌机制

```go
// AccessToken 配置
- 有效期: 7 天 (168 小时)
- 用途: API 访问认证
- 存储: 客户端内存/localStorage

// RefreshToken 配置
- 有效期: 30 天 (720 小时)
- 用途: 刷新 AccessToken
- 存储: 数据库 + 客户端（HttpOnly Cookie 推荐）
```

### 认证流程

#### 1。用户注册

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "SecurePass123!"
}

# 响应
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "01J9XQZV8M5N3P7K2RGWT4HFBA",
      "email": "user@example.com",
      "username": "john_doe",
      "name": "John Doe",
      "status": "ACTIVE",
      "createdAt": "2024-12-10T00:00:00Z"
    }
  }
}
```

#### 2。用户登录

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

# 响应（同注册）
```

#### 3。刷新令牌

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

# 响应
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIs..." # 新的 AccessToken
}
```

#### 4。获取当前用户

```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# 响应
{
  "success": true,
  "data": {
    "id": "01J9XQZV8M5N3P7K2RGWT4HFBA",
    "email": "user@example.com",
    "username": "john_doe",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "status": "ACTIVE",
    "roles": [
      {
        "id": "01J9XQZ...",
        "name": "user",
        "label": "普通用户"
      }
    ],
    "createdAt": "2024-12-10T00:00:00Z"
  }
}
```

### 使用认证

在需要认证的请求中，添加 `Authorization` 头：

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     http://localhost:8080/api/users
```

## RBAC 权限系统

### 权限格式

```
格式: resource:action
示例:
  - users:view      # 查看用户
  - users:create    # 创建用户
  - users:*         # 用户模块所有权限
  - *               # 所有权限（超级管理员）
```

### 内置角色

| 角色 | 权限 | 描述 |
|------|------|------|
| **admin** | `*` | 超级管理员，所有权限 |
| **user** | `users:view`, `documents:*`, `files:*` | 普通用户，管理自己的文档和文件 |
| **guest** | `users:view`, `documents:view` | 访客，只读权限 |

### 分配权限

```bash
# 1. 创建角色
POST /api/roles
{
  "name": "editor",
  "label": "编辑",
  "description": "可以编辑文档"
}

# 2. 分配权限
POST /api/roles/{roleId}/permissions
{
  "permissionIds": ["permission_id_1", "permission_id_2"]
}

# 3. 给用户分配角色（通过更新用户）
PUT /api/users/{userId}
{
  "roleIds": ["role_id_1", "role_id_2"]
}
```

## 数据库模型

### 核心模型

```go
// 用户模型
type User struct {
    ID          string    `gorm:"primaryKey;type:char(26)"`
    Email       string    `gorm:"uniqueIndex;size:191;not null"`
    Username    string    `gorm:"uniqueIndex;size:100;not null"`
    Password    string    `gorm:"size:255;not null"`
    Name        string    `gorm:"size:191;not null"`
    Avatar      *string   `gorm:"size:255"`
    Status      UserStatus `gorm:"type:varchar(20);default:ACTIVE"`
    QuotaUsed   int64     `gorm:"default:0"`
    CreatedAt   time.Time
    UpdatedAt   time.Time

    // 关联
    Roles       []Role    `gorm:"many2many:user_roles"`
}

// 角色模型
type Role struct {
    ID          string    `gorm:"primaryKey;type:char(26)"`
    Name        string    `gorm:"uniqueIndex;size:100;not null"`
    Label       string    `gorm:"size:191;not null"`
    Description *string   `gorm:"type:text"`
    CreatedAt   time.Time
    UpdatedAt   time.Time

    // 关联
    Permissions []Permission `gorm:"many2many:role_permissions"`
}

// 刷新令牌模型
type RefreshToken struct {
    ID        string    `gorm:"primaryKey;type:char(26)"`
    UserID    string    `gorm:"index;type:char(26);not null"`
    Token     string    `gorm:"uniqueIndex;size:500;not null"`
    ExpiresAt time.Time `gorm:"index;not null"`
    CreatedAt time.Time
}
```

### 数据库迁移

GORM 自动迁移：

```go
db.AutoMigrate(
    &models.User{},
    &models.Role{},
    &models.Permission{},
    &models.RefreshToken{},
    &models.Team{},
    &models.Document{},
    &models.File{},
    // ... 其他模型
)
```

## 环境变量

### 完整配置 (。env)

```bash
# 应用配置
APP_ENV=development          # 环境: development/production
APP_PORT=8080                # 端口

# JWT 配置
JWT_SECRET=your-super-secret-key-min-32-chars  # JWT 密钥（至少 32 字符）
JWT_EXPIRE_MINUTES=10080     # AccessToken 有效期（分钟）= 7 天

# 数据库配置
DB_HOST=localhost            # 数据库主机
DB_PORT=5432                 # 数据库端口
DB_USER=postgres             # 数据库用户
DB_PASSWORD=postgres         # 数据库密码
DB_NAME=halolight            # 数据库名称
DB_SSLMODE=disable           # SSL 模式: disable/require
```

### Neon PostgreSQL 配置

```bash
# Neon 数据库（生产环境推荐）
DB_HOST=your-project.neon.tech
DB_PORT=5432
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=halolight_prod
DB_SSLMODE=require           # Neon 需要 SSL
```

## 统一响应格式

### 成功响应

```json
{
  "success": true,
  "data": {
    // 数据内容
  },
  "message": "操作成功"
}
```

### 分页响应

```json
{
  "success": true,
  "data": [
    // 数据列表
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

### 错误响应

```json
{
  "success": false,
  "message": "错误信息"
}
```

## Docker 部署

### Dockerfile 特点

- **多阶段构建**：Builder + Runtime 分离
- **小体积**：最终镜像仅 20MB (使用 distroless/base-debian12)
- **安全**：使用非 root 用户运行
- **优化**：CGO_ENABLED=0，静态编译

### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres
      - DB_PASSWORD=postgres
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

### 部署命令

```bash
# 构建镜像
docker build -t halolight-api-go:latest .

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f api

# 停止服务
docker-compose down

# 重启服务
docker-compose restart api
```

## 测试

### 运行测试

```bash
# 单元测试
go test ./...

# 带覆盖率
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# 竞态检测
go test -race ./...

# 详细输出
go test -v ./...
```

### CI/CD

项目使用 GitHub Actions 进行自动化测试和构建：

- ✅ **代码检查**：go vet，golangci-lint
- ✅ **单元测试**：go test -race
- ✅ **安全扫描**：gosec，govulncheck
- ✅ **多平台构建**：Linux，macOS，Windows
- ✅ **Docker 构建**：自动推送镜像

## 性能指标

| 指标 | 数值 |
|------|------|
| 响应时间 | < 10ms（平均）|
| 并发处理 | 10,000+ QPS |
| 内存占用 | ~50MB（空闲）|
| Docker 镜像 | ~20MB |
| 启动时间 | < 1s |

## 常见问题

### 1。JWT 密钥要求

```bash
# 生成安全的 JWT 密钥
openssl rand -base64 64

# 设置到 .env
JWT_SECRET=生成的密钥
```

### 2。数据库连接失败

```bash
# 检查 PostgreSQL 是否运行
docker-compose ps postgres

# 重启数据库
docker-compose restart postgres

# 查看数据库日志
docker-compose logs postgres
```

### 3。端口冲突

```bash
# 修改 .env 中的端口
APP_PORT=8081

# 或修改 docker-compose.yml
ports:
  - "8081:8080"
```

### 4。CORS 错误

前端需要配置正确的 API 地址，CORS 中间件已配置为允许所有源 (开发环境)。

生产环境建议修改 `internal/middleware/cors.go`：

```go
config.AddAllowOrigins("https://your-frontend.com")
```

## 开发工具

### 推荐 VSCode 插件

- **Go** - Go 语言支持
- **Go Test Explorer** - 测试管理
- **REST Client** - API 测试
- **Docker** - Docker 支持

### 推荐工具

- **Air** - 热重载
- **goose** - 数据库迁移
- **wire** - 依赖注入
- **mockery** - Mock 生成

## 相关链接

- 📘 [GitHub 仓库](https://github.com/halolight/halolight-api-go)
- 📖 [在线文档](https://halolight.docs.h7ml.cn/guide/api-go)
- 🔵 [API 首页](http://localhost:8080/)
- 📄 [Swagger 文档](http://localhost:8080/docs)
- 💚 [健康检查](http://localhost:8080/health)

## 许可证

MIT License - 详见 [LICENSE](https://github.com/halolight/halolight-api-go/blob/main/LICENSE) 文件
