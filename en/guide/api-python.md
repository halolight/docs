# Python FastAPI Backend API

HaloLight FastAPI backend API is built on FastAPI 0.115+, providing modern asynchronous Python backend service.

**API Documentation**: [https://halolight-api-python.h7ml.cn/api/docs](https://halolight-api-python.h7ml.cn/api/docs)

**GitHub**: [https://github.com/halolight/halolight-api-python](https://github.com/halolight/halolight-api-python)

## Features

- 🔐 **JWT Dual-Token** - Access Token + Refresh Token, auto renewal
- 🛡️ **RBAC Permissions** - Role-based access control, wildcard matching
- 📡 **RESTful API** - Standardized interface design, OpenAPI docs
- 🗄️ **SQLAlchemy 2.0** - Type-safe database operations
- ✅ **Data Validation** - Request parameter validation, error handling
- 📊 **Logging System** - Request logging, error tracking
- 🐳 **Docker Support** - Containerized deployment

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Python | 3.11+ | Runtime |
| FastAPI | 0.115+ | Web Framework |
| SQLAlchemy | 2.0+ | Database ORM |
| PostgreSQL | 16 | Data Storage |
| Pydantic | v2 | Data Validation |
| JWT | python-jose | Authentication |
| Swagger UI | - | API Documentation |

## Quick Start

### Requirements

- Python >= 3.11
- pip >= 23.0
- PostgreSQL 16 (optional, defaults to SQLite)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-python.git
cd halolight-api-python

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -e .
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/halolight_db

# JWT Secret
JWT_SECRET=your-super-secret-key
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Service Config
PORT=8000
NODE_ENV=development
```

### Database Initialization

```bash
alembic upgrade head           # Run migrations
python scripts/seed.py         # Seed data
```

### Start Service

```bash
# Development mode
uvicorn app.main:app --reload --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

Visit http://localhost:8000

## Project Structure

```
halolight-api-python/
├── app/
│   ├── api/              # Controllers/Route handlers
│   │   ├── auth.py       # Auth endpoints
│   │   ├── users.py      # User management
│   │   └── ...
│   ├── services/         # Business logic layer
│   ├── models/           # Data models
│   ├── schemas/          # Request validation
│   ├── core/             # Utility functions
│   └── main.py           # App entry
├── alembic/              # Database migrations/Schema
├── tests/                # Test files
├── Dockerfile            # Docker config
├── docker-compose.yml
└── pyproject.toml
```

## API Modules

### Authentication Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh token | Public |
| POST | `/api/auth/logout` | Logout | Authenticated |
| POST | `/api/auth/forgot-password` | Forgot password | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |

### User Management Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/users` | Get user list | `users:view` |
| GET | `/api/users/:id` | Get user details | `users:view` |
| POST | `/api/users` | Create user | `users:create` |
| PUT | `/api/users/:id` | Update user | `users:update` |
| DELETE | `/api/users/:id` | Delete user | `users:delete` |
| GET | `/api/users/me` | Get current user | Authenticated |

### Complete Endpoint List

#### Document Management (Documents) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/:id` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/:id` | Update document |
| DELETE | `/api/documents/:id` | Delete document |

#### File Management (Files) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/files` | Get file list |
| GET | `/api/files/:id` | Get file details |
| POST | `/api/files/upload` | Upload file |
| PUT | `/api/files/:id` | Update file info |
| DELETE | `/api/files/:id` | Delete file |

#### Message Management (Messages) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/messages` | Get message list |
| GET | `/api/messages/:id` | Get message details |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |

#### Notification Management (Notifications) - 4 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | Get notification list |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/:id` | Delete notification |

#### Calendar Management (Calendar) - 5 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar/events` | Get event list |
| GET | `/api/calendar/events/:id` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/:id` | Update event |
| DELETE | `/api/calendar/events/:id` | Delete event |

#### Dashboard (Dashboard) - 6 endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Statistics data |
| GET | `/api/dashboard/visits` | Visit trends |
| GET | `/api/dashboard/sales` | Sales data |
| GET | `/api/dashboard/pie` | Pie chart data |
| GET | `/api/dashboard/tasks` | Task list |
| GET | `/api/dashboard/calendar` | Today's schedule |

## Authentication Mechanism

### JWT Dual-Token

```
Access Token:  15 minutes validity, used for API requests
Refresh Token: 7 days validity, used to refresh Access Token
```

### Request Header

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```python
# Token refresh example
import requests

response = requests.post(
    'http://localhost:8000/api/auth/refresh',
    json={'refreshToken': refresh_token}
)
new_tokens = response.json()
```

## Permission System

### Role Definitions

| Role | Description | Permissions |
|------|-------------|-------------|
| `super_admin` | Super Admin | `*` (all permissions) |
| `admin` | Administrator | `users:*`, `documents:*`, ... |
| `user` | Regular User | `documents:view`, `files:view`, ... |
| `guest` | Guest | `dashboard:view` |

### Permission Format

```
{resource}:{action}

Examples:
- users:view      # View users
- users:create    # Create user
- users:*         # All user operations
- *               # All permissions
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request parameter validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `VALIDATION_ERROR` | Parameter validation failed |
| 401 | `UNAUTHORIZED` | Unauthorized |
| 403 | `FORBIDDEN` | Forbidden |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 500 | `INTERNAL_ERROR` | Server error |

## Database Models

### User Model

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

### Document Model

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

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `sqlite:///./halolight.db` |
| `JWT_SECRET` | JWT signing key | - |
| `JWT_ACCESS_EXPIRES` | Access Token expiry | `15m` |
| `JWT_REFRESH_EXPIRES` | Refresh Token expiry | `7d` |
| `PORT` | Service port | `8000` |
| `NODE_ENV` | Runtime environment | `development` |
| `CORS_ORIGINS` | CORS allowed origins | `["http://localhost:3000"]` |

## Unified Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Example data"
  },
  "message": "Operation successful"
}
```

### Paginated Response

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

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": []
  }
}
```

## Deployment

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

### Production Configuration

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-production-secret
```

## Testing

### Running Tests

```bash
pytest
pytest --cov=app tests/
```

### Test Examples

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

## Performance Metrics

### Benchmarks

| Metric | Value | Description |
|--------|-------|-------------|
| Request Throughput | 5000+ QPS | Single-core uvicorn |
| Avg Response Time | < 10ms | Simple queries |
| Memory Usage | ~100MB | Base runtime |
| CPU Usage | 30-50% | High load |

## Observability

### Logging System

```python
import logging

logger = logging.getLogger(__name__)
logger.info("User logged in", extra={"user_id": user.id})
```

### Health Check

```python
@app.get("/health")
async def health_check():
    return {"status": "ok", "timestamp": datetime.now()}
```

### Monitoring Metrics

```python
# Prometheus metrics endpoint
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

## Common Commands

```bash
# Development
uvicorn app.main:app --reload --port 8000

# Build
pip install -e .

# Testing
pytest
pytest --cov=app tests/

# Database
alembic upgrade head
alembic revision --autogenerate -m "description"

# Code Quality
black app tests
ruff check app tests --fix
```

## FAQ

### Q: How to configure database connection pool?

A: Configure SQLAlchemy connection pool in `core/database.py`

```python
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30
)
```

### Q: How to enable CORS?

A: Configure CORS middleware in `main.py`

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

### Q: How to implement file upload?

A: Use FastAPI's `UploadFile` type

```python
from fastapi import UploadFile, File

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    # Process file contents
    return {"filename": file.filename}
```

## Development Tools

### Recommended Tools/Plugins

- **Black** - Python code formatter
- **Ruff** - Fast linter
- **mypy** - Type checker
- **pytest** - Testing framework

## Architecture Features

### Async Advantages

FastAPI is based on Python's asyncio, supporting high-concurrency asynchronous operations:

```python
@app.get("/api/async-example")
async def async_endpoint():
    result = await async_database_query()
    return result
```

### Automatic Documentation

FastAPI automatically generates OpenAPI (Swagger) documentation with no extra configuration:

- Swagger UI: `/docs`
- ReDoc: `/redoc`
- OpenAPI Schema: `/openapi.json`

### Dependency Injection System

```python
from fastapi import Depends

def get_current_user(token: str = Depends(oauth2_scheme)):
    return verify_token(token)

@app.get("/api/protected")
async def protected_route(user = Depends(get_current_user)):
    return {"user": user}
```

## Backend Comparison

| Feature | FastAPI | NestJS | Go Fiber | Spring Boot |
|---------|---------|--------|----------|-------------|
| Language | Python | TypeScript | Go | Java |
| ORM | SQLAlchemy | Prisma | GORM | JPA |
| Performance | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |

## Related Links

- [API Documentation](https://halolight-api-python.h7ml.cn/api/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-python)
- [FastAPI Official Docs](https://fastapi.tiangolo.com/)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
