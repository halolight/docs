# Go 后端 API

HaloLight Go 后端 API，基于 Gin/Fiber 框架构建的高性能后端服务。

## 特性

- 🐹 **Go 语言** - 高性能、并发友好
- 🔥 **Gin/Fiber** - 可选的 Web 框架
- 🔐 **JWT 鉴权** - 完整的认证授权系统
- 🛡️ **RBAC 权限** - 基于角色的访问控制
- 🐘 **PostgreSQL** - 关系型数据库支持
- 🔴 **Redis 缓存** - 高性能缓存层
- 📡 **RESTful API** - 标准化的 API 设计

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# 安装依赖
go mod download

# 运行开发服务器
go run main.go

# 构建生产版本
go build -o server main.go
```

## 项目结构

```
halolight-api-go/
├── cmd/              # 入口文件
├── internal/
│   ├── api/          # API 处理器
│   ├── middleware/   # 中间件
│   ├── models/       # 数据模型
│   ├── repository/   # 数据访问层
│   └── service/      # 业务逻辑层
├── pkg/              # 公共包
├── configs/          # 配置文件
└── main.go
```

## API 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/v1/auth/login | 用户登录 |
| POST | /api/v1/auth/register | 用户注册 |
| GET | /api/v1/users | 获取用户列表 |
| GET | /api/v1/users/:id | 获取用户详情 |
| PUT | /api/v1/users/:id | 更新用户 |
| DELETE | /api/v1/users/:id | 删除用户 |

## 环境变量

```bash
# 数据库
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=halolight

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-api-go)
- [API 文档](https://halolight-api-go.h7ml.cn/swagger)
