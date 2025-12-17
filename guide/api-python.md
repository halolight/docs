# Python FastAPI 后端 API

HaloLight FastAPI 后端 API 基于 FastAPI 0.115+ 构建，提供现代化异步 Python 后端服务。

**API 文档**：[https://halolight-api-python.h7ml.cn/api/docs](https://halolight-api-python.h7ml.cn/api/docs)

**GitHub**：[https://github.com/halolight/halolight-api-python](https://github.com/halolight/halolight-api-python)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 🗄️ **SQLAlchemy 2.0** - 类型安全的数据库操作
- ✅ **数据验证** - 请求参数校验，错误处理
- 📊 **日志系统** - 请求日志，错误追踪
- 🐳 **Docker 支持** - 容器化部署

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Python | 3.11+ | 运行时 |
| FastAPI | 0.115+ | Web 框架 |
| SQLAlchemy | 2.0+ | 数据库 ORM |
| PostgreSQL | 16 | 数据存储 |
| Pydantic | v2 | 数据验证 |
| JWT | python-jose | 身份认证 |
| Swagger UI | - | API 文档 |

## 快速开始

### 环境要求

- Python >= 3.11
- pip >= 23.0
- PostgreSQL 16 (可选，默认 SQLite)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-python.git
cd halolight-api-python

# 创建虚拟环境
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 安装依赖
pip install -e .
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
PORT=8000
NODE_ENV=development
```

### 数据库初始化

```bash
alembic upgrade head           # 运行迁移
python scripts/seed.py         # 填充种子数据
```

### 启动服务

```bash
# 开发模式
uvicorn app.main:app --reload --port 8000

# 生产模式
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

访问 http://localhost:8000

## 项目结构

```
halolight-api-python/
├── app/
│   ├── api/              # 控制器/路由处理
│   │   ├── auth.py       # 认证端点
│   │   ├── users.py      # 用户管理
│   │   └── ...
│   ├── services/         # 业务逻辑层
│   ├── models/           # 数据模型
│   ├── schemas/          # 请求验证
│   ├── core/             # 工具函数
│   └── main.py           # 应用入口
├── alembic/              # 数据库迁移/Schema
├── tests/                # 测试文件
├── Dockerfile            # Docker 配置
├── docker-compose.yml
└── pyproject.toml
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

```python
# 刷新令牌示例
import requests

response = requests.post(
    'http://localhost:8000/api/auth/refresh',
    json={'refreshToken': refresh_token}
)
new_tokens = response.json()
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

## 数据库模型

### 用户模型

```python
# app/models/user.py
from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
```

### 文档模型

```python
# app/models/document.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("User", back_populates="documents")
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `DATABASE_URL` | 数据库连接字符串 | `sqlite:///./halolight.db` |
| `JWT_SECRET` | JWT 签名密钥 | - |
| `JWT_ACCESS_EXPIRES` | Access Token 过期时间 | `15m` |
| `JWT_REFRESH_EXPIRES` | Refresh Token 过期时间 | `7d` |
| `PORT` | 服务端口 | `8000` |
| `NODE_ENV` | 运行环境 | `development` |
| `CORS_ORIGINS` | CORS 允许的源 | `["http://localhost:3000"]` |

## 统一响应格式

### 成功响应

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "示例数据"
  },
  "message": "操作成功"
}
```

### 分页响应

```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": []
  }
}
```

## 部署

### Docker

```bash
docker build -t halolight-api-python .
docker run -p 8000:8000 halolight-api-python
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
      - "8000:8000"
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
pytest
pytest --cov=app tests/
```

### 测试示例

```python
def test_login_success(client):
    response = client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "123456"}
    )
    assert response.status_code == 200
    assert "accessToken" in response.json()

def test_get_users_with_permission(client, admin_token):
    response = client.get(
        "/api/users",
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert response.status_code == 200
    assert isinstance(response.json()["data"], list)
```

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | 5000+ QPS | 单核 uvicorn |
| 平均响应时间 | < 10ms | 简单查询 |
| 内存占用 | ~100MB | 基础运行 |
| CPU 使用率 | 30-50% | 高负载 |

## 可观测性

### 日志系统

```python
import logging

logger = logging.getLogger(__name__)
logger.info("User logged in", extra={"user_id": user.id})
```

### 健康检查

```python
@app.get("/health")
async def health_check():
    return {"status": "ok", "timestamp": datetime.now()}
```

### 监控指标

```python
# Prometheus metrics endpoint
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

## 常用命令

```bash
# 开发
uvicorn app.main:app --reload --port 8000

# 构建
pip install -e .

# 测试
pytest
pytest --cov=app tests/

# 数据库
alembic upgrade head
alembic revision --autogenerate -m "描述"

# 代码质量
black app tests
ruff check app tests --fix
```

## 常见问题

### Q：如何配置数据库连接池？

A：在 `core/database.py` 中配置 SQLAlchemy 连接池参数

```python
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30
)
```

### Q：如何启用 CORS？

A：在 `main.py` 中配置 CORS 中间件

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Q：如何实现文件上传？

A：使用 FastAPI 的 `UploadFile` 类型

```python
from fastapi import UploadFile, File

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    # 处理文件内容
    return {"filename": file.filename}
```

## 开发工具

### 推荐插件/工具

- **Black** - Python 代码格式化
- **Ruff** - 快速 Linter
- **mypy** - 类型检查
- **pytest** - 测试框架

## 架构特点

### 异步优势

FastAPI 基于 Python 的 asyncio，支持高并发异步操作：

```python
@app.get("/api/async-example")
async def async_endpoint():
    result = await async_database_query()
    return result
```

### 自动文档生成

FastAPI 自动生成 OpenAPI (Swagger) 文档，无需额外配置：

- Swagger UI: `/docs`
- ReDoc: `/redoc`
- OpenAPI Schema: `/openapi.json`

### 依赖注入系统

```python
from fastapi import Depends

def get_current_user(token: str = Depends(oauth2_scheme)):
    return verify_token(token)

@app.get("/api/protected")
async def protected_route(user = Depends(get_current_user)):
    return {"user": user}
```

## 与其他后端对比

| 特性 | FastAPI | NestJS | Go Fiber | Spring Boot |
|------|---------|--------|----------|-------------|
| 语言 | Python | TypeScript | Go | Java |
| ORM | SQLAlchemy | Prisma | GORM | JPA |
| 性能 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 学习曲线 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## 相关链接

- [API 文档](https://halolight-api-python.h7ml.cn/api/docs)
- [GitHub 仓库](https://github.com/halolight/halolight-api-python)
- [FastAPI 官方文档](https://fastapi.tiangolo.com/)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
