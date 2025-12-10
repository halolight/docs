# Python FastAPI 后端 API

HaloLight Python 后端 API，基于 FastAPI 0.115+ 框架构建的企业级后端服务，提供完整的 RBAC 权限系统和 Swagger 文档。

## 特性

- **FastAPI 0.115+** - 现代化异步 Python 框架，自动生成 OpenAPI 文档
- **SQLAlchemy 2.0** - 类型安全的 ORM，支持 PostgreSQL 16
- **JWT 双令牌** - AccessToken + RefreshToken 认证机制
- **RBAC 权限** - 基于角色的访问控制，支持通配符权限
- **Swagger 文档** - 自动生成交互式 API 文档
- **Pydantic v2** - 强大的数据验证和序列化
- **Docker 部署** - 多阶段构建优化，Docker Compose 一键部署
- **数据库兼容** - 与 NestJS/Java 版本共用同一 PostgreSQL 数据库

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | FastAPI 0.115+ |
| 语言 | Python 3.11+ |
| 数据库 | PostgreSQL 16 + SQLAlchemy 2.0 |
| 迁移 | Alembic 1.14+ |
| 认证 | python-jose (JWT) |
| 验证 | Pydantic v2 |
| 文档 | Swagger UI / ReDoc |
| 容器化 | Docker + Docker Compose |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-python.git
cd halolight-api-python

# 创建虚拟环境
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 安装依赖
pip install -e .

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件配置数据库和 JWT 密钥

# 运行数据库迁移
alembic upgrade head

# 启动开发服务器
uvicorn app.main:app --reload --port 8000
```

生产构建与启动：

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 项目结构

```
halolight-api-python/
├── app/
│   ├── main.py                     # FastAPI 应用入口
│   ├── api/                        # API 路由层
│   │   ├── auth.py                 # 认证端点
│   │   ├── users.py                # 用户管理
│   │   ├── roles.py                # 角色管理
│   │   ├── permissions.py          # 权限管理
│   │   ├── teams.py                # 团队管理
│   │   ├── documents.py            # 文档管理
│   │   ├── files.py                # 文件管理
│   │   ├── folders.py              # 文件夹管理
│   │   ├── calendar.py             # 日历事件
│   │   ├── notifications.py        # 通知管理
│   │   ├── messages.py             # 消息管理
│   │   ├── dashboard.py            # 仪表盘统计
│   │   └── deps.py                 # 依赖注入
│   ├── models/                     # SQLAlchemy 模型（17 个）
│   │   ├── base.py                 # 基类和 cuid 生成器
│   │   ├── enums.py                # 枚举类型
│   │   ├── user.py                 # 用户模型
│   │   ├── role.py                 # 角色和权限模型
│   │   └── ...                     # 其他业务模型
│   ├── schemas/                    # Pydantic 模式
│   │   ├── user.py                 # 用户相关 DTO
│   │   ├── role.py                 # 角色相关 DTO
│   │   └── ...
│   ├── services/                   # 业务逻辑层
│   │   ├── user_service.py
│   │   ├── role_service.py
│   │   └── ...
│   └── core/                       # 核心配置
│       ├── config.py               # 环境变量配置
│       ├── security.py             # JWT 和密码处理
│       └── database.py             # 数据库连接
├── alembic/                        # 数据库迁移
├── tests/                          # 测试文件
├── Dockerfile                      # Docker 多阶段构建
├── docker-compose.yml              # Docker Compose 配置
└── pyproject.toml                  # Python 项目配置
```

## API 模块

项目包含 **12 个核心业务模块**，提供 **90+ RESTful API 端点**：

| 模块 | 端点数 | 描述 |
|------|--------|------|
| **Auth** | 7 | 用户认证（登录、注册、刷新 Token、获取当前用户、登出、找回/重置密码） |
| **Users** | 7 | 用户管理（CRUD、分页、搜索、状态更新、批量删除） |
| **Roles** | 6 | 角色管理（CRUD + 权限分配） |
| **Permissions** | 4 | 权限管理（支持通配符权限：`users:*`, `*`） |
| **Teams** | 7 | 团队管理（CRUD、成员管理） |
| **Documents** | 11 | 文档管理（CRUD、分享、移动、标签） |
| **Files** | 14 | 文件管理（上传、下载、收藏、批量操作） |
| **Folders** | 5 | 文件夹管理（CRUD、树形结构） |
| **Calendar** | 9 | 日历事件管理（CRUD、参会人、改期） |
| **Notifications** | 5 | 通知管理（列表、未读统计、标记已读） |
| **Messages** | 5 | 消息会话（对话列表、消息发送、已读标记） |
| **Dashboard** | 9 | 仪表盘统计（总览、趋势、排行） |

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
| GET | `/api/users` | 获取用户列表（分页、搜索） | JWT Required |
| GET | `/api/users/{id}` | 获取用户详情 | JWT Required |
| POST | `/api/users` | 创建用户 | JWT Required |
| PATCH | `/api/users/{id}` | 更新用户 | JWT Required |
| PATCH | `/api/users/{id}/status` | 更新用户状态 | JWT Required |
| POST | `/api/users/batch-delete` | 批量删除用户 | JWT Required |
| DELETE | `/api/users/{id}` | 删除用户 | JWT Required |

### 完整端点清单

#### 文档管理 (Documents)- 11 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/documents` | 文档列表（分页、搜索） | JWT Required |
| GET | `/api/documents/{id}` | 获取文档详情 | JWT Required |
| POST | `/api/documents` | 创建文档 | JWT Required |
| PUT | `/api/documents/{id}` | 更新文档内容 | JWT Required |
| PATCH | `/api/documents/{id}/rename` | 重命名文档 | JWT Required |
| POST | `/api/documents/{id}/move` | 移动到目标文件夹 | JWT Required |
| POST | `/api/documents/{id}/tags` | 更新标签 | JWT Required |
| POST | `/api/documents/{id}/share` | 分享文档 | JWT Required |
| POST | `/api/documents/{id}/unshare` | 取消分享 | JWT Required |
| POST | `/api/documents/batch-delete` | 批量删除 | JWT Required |
| DELETE | `/api/documents/{id}` | 删除文档 | JWT Required |

#### 文件管理 (Files)- 14 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/files/upload` | 上传文件 | JWT Required |
| GET | `/api/files` | 文件列表 | JWT Required |
| GET | `/api/files/storage` | 获取存储配额 | JWT Required |
| GET | `/api/files/storage-info` | 存储信息（别名） | JWT Required |
| GET | `/api/files/{id}` | 获取文件详情 | JWT Required |
| GET | `/api/files/{id}/download-url` | 获取下载链接 | JWT Required |
| PATCH | `/api/files/{id}/rename` | 重命名文件 | JWT Required |
| POST | `/api/files/{id}/move` | 移动文件 | JWT Required |
| POST | `/api/files/{id}/copy` | 复制文件 | JWT Required |
| PATCH | `/api/files/{id}/favorite` | 切换收藏状态 | JWT Required |
| POST | `/api/files/{id}/share` | 分享文件 | JWT Required |
| POST | `/api/files/batch-delete` | 批量删除 | JWT Required |
| DELETE | `/api/files/{id}` | 删除文件 | JWT Required |

#### 日历事件 (Calendar)- 9 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/calendar/events` | 事件列表（日期范围查询） | JWT Required |
| GET | `/api/calendar/events/{id}` | 获取事件详情 | JWT Required |
| POST | `/api/calendar/events` | 创建日历事件 | JWT Required |
| PUT | `/api/calendar/events/{id}` | 更新事件信息 | JWT Required |
| PATCH | `/api/calendar/events/{id}/reschedule` | 重新安排时间 | JWT Required |
| POST | `/api/calendar/events/{id}/attendees` | 添加参会人 | JWT Required |
| DELETE | `/api/calendar/events/{id}/attendees/{attendeeId}` | 移除参会人 | JWT Required |
| POST | `/api/calendar/events/batch-delete` | 批量删除 | JWT Required |
| DELETE | `/api/calendar/events/{id}` | 删除事件 | JWT Required |

## 完整 API 参考

### 1。认证模块 (Auth)

#### 1.1 用户登录

**端点**：`POST /api/auth/login`
**权限**：Public (无需认证)
**描述**：使用邮箱和密码登录，返回 JWT 令牌

**请求体**：
```json
{
  "email": "admin@halolight.h7ml.cn",
  "password": "123456"
}
```

**成功响应** (200)：
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2024-12-11T12:00:00.000Z",
  "user": {
    "id": "clx1234567890",
    "email": "admin@halolight.h7ml.cn",
    "name": "Admin User",
    "avatar": "https://avatar.example.com/admin.jpg",
    "status": "ACTIVE"
  }
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "123456"
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
  "password": "securePass123"
}
```

**成功响应** (201)：
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2024-12-11T12:00:00.000Z",
  "user": {
    "id": "clx9876543210",
    "email": "newuser@example.com",
    "name": "New User",
    "status": "ACTIVE"
  }
}
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
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2024-12-11T12:00:00.000Z"
}
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
  "status": "ACTIVE",
  "roles": [
    {
      "id": "clx0000000001",
      "name": "ADMIN",
      "permissions": ["*"]
    }
  ],
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### 2。用户管理模块 (Users)

#### 2.1 获取用户列表

**端点**：`GET /api/users`
**权限**：JWT Required
**描述**：获取用户列表，支持分页和搜索

**查询参数**：
- `page` (number，可选)：页码，默认 1
- `limit` (number，可选)：每页数量，默认 10
- `search` (string，可选)：搜索关键词
- `status` (string，可选)：用户状态过滤
- `role` (string，可选)：角色过滤

**成功响应** (200)：
```json
{
  "data": [
    {
      "id": "clx1234567890",
      "email": "admin@halolight.h7ml.cn",
      "name": "Admin User",
      "avatar": "https://avatar.example.com/admin.jpg",
      "status": "ACTIVE",
      "created_at": "2024-01-01T00:00:00.000Z"
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
curl -X GET "http://localhost:8000/api/users?page=1&limit=10&search=admin" \
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
3. 当 `accessToken` 过期 (默认 7 天)，使用 `refreshToken` 调用刷新接口
4. 获取新的 `accessToken` 和 `refreshToken` (令牌轮换)

### 认证示例 (完整流程)

```bash
# 1. 登录获取令牌
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "123456"
  }')

# 2. 提取 AccessToken
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')

# 3. 使用 Token 访问受保护接口
curl -X GET http://localhost:8000/api/users \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. Token 过期后，使用 RefreshToken 刷新
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
curl -X POST http://localhost:8000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

## 错误处理

### 标准错误响应格式

所有错误响应遵循统一格式：

```json
{
  "detail": "Error message description"
}
```

或验证错误：

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
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
| 422 | Unprocessable Entity | 请求体验证失败 |
| 500 | Internal Server Error | 服务器内部错误 |

## 数据库模型

SQLAlchemy 模型包含 **17 个实体**，支持完整的 RBAC 权限系统：

```python
# 核心用户模型
class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(25), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar: Mapped[str | None] = mapped_column(String(500))
    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus), default=UserStatus.ACTIVE
    )

    # 关系
    roles: Mapped[list["UserRole"]] = relationship(back_populates="user")
    teams: Mapped[list["TeamMember"]] = relationship(back_populates="user")

# RBAC 角色模型
class Role(Base):
    __tablename__ = "roles"

    id: Mapped[str] = mapped_column(String(25), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    label: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)

    # 关系
    permissions: Mapped[list["RolePermission"]] = relationship(back_populates="role")

# 权限模型
class Permission(Base):
    __tablename__ = "permissions"

    id: Mapped[str] = mapped_column(String(25), primary_key=True)
    action: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
```

## 环境变量

```bash
# 应用配置
DEBUG=false
ENVIRONMENT=production
API_PREFIX=/api

# 数据库（PostgreSQL）
DATABASE_URL=postgresql://user:password@localhost:5432/halolight_db
DATABASE_ECHO=false

# JWT 认证
JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_REFRESH_SECRET_KEY=your-refresh-secret-key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 天
JWT_REFRESH_TOKEN_EXPIRE_DAYS=30

# CORS 配置
CORS_ORIGINS=["http://localhost:3000","https://halolight.h7ml.cn"]

# 安全
PASSWORD_MIN_LENGTH=8
```

## Docker 部署

### 使用 Docker Compose (推荐)

```bash
# 克隆项目
git clone https://github.com/halolight/halolight-api-python.git
cd halolight-api-python

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 启动所有服务（API + PostgreSQL）
docker-compose up -d

# 查看日志
docker-compose logs -f api

# 停止服务
docker-compose down
```

### 仅构建 API 容器

```bash
# 构建镜像
docker build -t halolight-api-python .

# 运行容器
docker run -d \
  --name halolight-api \
  -p 8000:8000 \
  --env-file .env \
  halolight-api-python
```

## 常用命令

```bash
# 开发
uvicorn app.main:app --reload --port 8000    # 启动开发服务器

# 代码质量
black app tests                              # 代码格式化
ruff check app tests                         # Lint 检查
ruff check app tests --fix                   # Lint 自动修复
mypy app                                     # 类型检查

# 测试
pytest                                       # 运行测试
pytest --cov=app tests/                      # 测试覆盖率

# 数据库迁移
alembic revision --autogenerate -m "描述"    # 创建迁移
alembic upgrade head                         # 应用迁移
alembic downgrade -1                         # 回滚一个版本
```

## 架构特点

### 1。分层架构

遵循 FastAPI 分层架构：

```python
# Router 层
@router.get("", response_model=UserListResponse)
async def list_users(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_active_user)],
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
) -> UserListResponse:
    user_service = UserService(db)
    users, total = user_service.get_list(page=page, limit=limit)
    return UserListResponse(data=users, meta=PaginationMeta(...))

# Service 层
class UserService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_list(self, page: int, limit: int) -> tuple[list[User], int]:
        query = self.db.query(User)
        total = query.count()
        users = query.offset((page - 1) * limit).limit(limit).all()
        return users, total
```

### 2。Pydantic 验证

使用 Pydantic v2 进行自动验证：

```python
class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=255)
    password: str = Field(..., min_length=8)

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    avatar: str | None = None
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
```

### 3。依赖注入

FastAPI 的依赖注入系统：

```python
async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[Session, Depends(get_db)],
) -> User:
    payload = decode_access_token(token)
    user = db.query(User).filter(User.id == payload["sub"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def check_permission(required_permission: str):
    async def permission_checker(
        current_user: Annotated[User, Depends(get_current_active_user)],
    ) -> User:
        if not has_permission(current_user, required_permission):
            raise HTTPException(status_code=403, detail="Permission denied")
        return current_user
    return permission_checker
```

### 4。Swagger 文档

自动生成交互式 API 文档，访问 `/api/docs`：

- 完整的 API 端点列表
- 请求/响应 Schema
- 在线测试功能
- JWT 认证支持

## 数据库兼容性

本项目与 NestJS/Java 版本共用同一 PostgreSQL 数据库：

- 表名与 Prisma schema 一致 (如 `users`、`roles`、`teams`)
- 主键使用 cuid 格式字符串
- ENUM 类型复用 Prisma 创建的类型 (`create_type=False`)
- 支持同时运行多个后端版本

## 相关链接

- [在线预览](http://halolight-api-python.h7ml.cn)
- [API 文档](http://halolight-api-python.h7ml.cn/api/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-python)
- [FastAPI 官方文档](https://fastapi.tiangolo.com/)
- [SQLAlchemy 文档](https://www.sqlalchemy.org/)
- [问题反馈](https://github.com/halolight/halolight-api-python/issues)

## 下一步

- 查看 [API 设计规范](/development/api-patterns)了解前端调用方式
- 查看[认证系统](/development/authentication)了解权限控制实现
- 查看[整体架构](/development/architecture)了解 HaloLight 生态系统
