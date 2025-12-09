# Python FastAPI Backend API

HaloLight Python Backend API, an enterprise-grade backend service built on FastAPI 0.115+ framework, providing a complete RBAC permission system and Swagger documentation.

## Features

- **FastAPI 0.115+** - Modern async Python framework with automatic OpenAPI documentation
- **SQLAlchemy 2.0** - Type-safe ORM with PostgreSQL 16 support
- **JWT Dual-Token** - AccessToken + RefreshToken authentication mechanism
- **RBAC Permissions** - Role-based access control with wildcard permission support
- **Swagger Documentation** - Auto-generated interactive API docs
- **Pydantic v2** - Powerful data validation and serialization
- **Docker Deployment** - Multi-stage build optimization, Docker Compose one-click deployment
- **Database Compatible** - Shares the same PostgreSQL database with NestJS/Java versions

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | FastAPI 0.115+ |
| Language | Python 3.11+ |
| Database | PostgreSQL 16 + SQLAlchemy 2.0 |
| Migrations | Alembic 1.14+ |
| Authentication | python-jose (JWT) |
| Validation | Pydantic v2 |
| Documentation | Swagger UI / ReDoc |
| Containerization | Docker + Docker Compose |

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-python.git
cd halolight-api-python

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -e .

# Configure environment variables
cp .env.example .env
# Edit .env file to configure database and JWT secret

# Run database migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --port 8000
```

Production build and start:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Project Structure

```
halolight-api-python/
├── app/
│   ├── main.py                     # FastAPI application entry point
│   ├── api/                        # API Router Layer
│   │   ├── auth.py                 # Auth endpoints
│   │   ├── users.py                # User management
│   │   ├── roles.py                # Role management
│   │   ├── permissions.py          # Permission management
│   │   ├── teams.py                # Team management
│   │   ├── documents.py            # Document management
│   │   ├── files.py                # File management
│   │   ├── folders.py              # Folder management
│   │   ├── calendar.py             # Calendar events
│   │   ├── notifications.py        # Notifications
│   │   ├── messages.py             # Messaging
│   │   ├── dashboard.py            # Dashboard stats
│   │   └── deps.py                 # Dependency injection
│   ├── models/                     # SQLAlchemy Models (17 entities)
│   │   ├── base.py                 # Base class and cuid generator
│   │   ├── enums.py                # Enum types
│   │   ├── user.py                 # User model
│   │   ├── role.py                 # Role and Permission models
│   │   └── ...                     # Other business models
│   ├── schemas/                    # Pydantic Schemas
│   │   ├── user.py                 # User-related DTOs
│   │   ├── role.py                 # Role-related DTOs
│   │   └── ...
│   ├── services/                   # Business Logic Layer
│   │   ├── user_service.py
│   │   ├── role_service.py
│   │   └── ...
│   └── core/                       # Core Configuration
│       ├── config.py               # Environment variables
│       ├── security.py             # JWT and password handling
│       └── database.py             # Database connection
├── alembic/                        # Database migrations
├── tests/                          # Test files
├── Dockerfile                      # Docker multi-stage build
├── docker-compose.yml              # Docker Compose config
└── pyproject.toml                  # Python project config
```

## API Modules

The project contains **12 core business modules** providing **90+ RESTful API endpoints**:

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Auth** | 7 | User authentication (login, register, refresh token, get current user, logout, forgot/reset password) |
| **Users** | 7 | User management (CRUD, pagination, search, status update, batch delete) |
| **Roles** | 6 | Role management (CRUD + permission assignment) |
| **Permissions** | 4 | Permission management (wildcard support: `users:*`, `*`) |
| **Teams** | 7 | Team management (CRUD, member management) |
| **Documents** | 11 | Document management (CRUD, sharing, moving, tags) |
| **Files** | 14 | File management (upload, download, favorites, batch operations) |
| **Folders** | 5 | Folder management (CRUD, tree structure) |
| **Calendar** | 9 | Calendar event management (CRUD, attendees, reschedule) |
| **Notifications** | 5 | Notification management (list, unread count, mark as read) |
| **Messages** | 5 | Message conversations (conversation list, send messages, read status) |
| **Dashboard** | 9 | Dashboard statistics (overview, trends, rankings) |

### Authentication Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh token | Public |
| POST | `/api/auth/forgot-password` | Send password reset email | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |
| GET | `/api/auth/me` | Get current user | JWT Required |
| POST | `/api/auth/logout` | User logout | JWT Required |

### User Management Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/users` | Get user list (pagination, search) | JWT Required |
| GET | `/api/users/{id}` | Get user details | JWT Required |
| POST | `/api/users` | Create user | JWT Required |
| PATCH | `/api/users/{id}` | Update user | JWT Required |
| PATCH | `/api/users/{id}/status` | Update user status | JWT Required |
| POST | `/api/users/batch-delete` | Batch delete users | JWT Required |
| DELETE | `/api/users/{id}` | Delete user | JWT Required |

### Complete Endpoint List

#### Documents - 11 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/documents` | Document list (pagination, search) | JWT Required |
| GET | `/api/documents/{id}` | Get document details | JWT Required |
| POST | `/api/documents` | Create document | JWT Required |
| PUT | `/api/documents/{id}` | Update document content | JWT Required |
| PATCH | `/api/documents/{id}/rename` | Rename document | JWT Required |
| POST | `/api/documents/{id}/move` | Move to target folder | JWT Required |
| POST | `/api/documents/{id}/tags` | Update tags | JWT Required |
| POST | `/api/documents/{id}/share` | Share document | JWT Required |
| POST | `/api/documents/{id}/unshare` | Unshare document | JWT Required |
| POST | `/api/documents/batch-delete` | Batch delete | JWT Required |
| DELETE | `/api/documents/{id}` | Delete document | JWT Required |

#### Files - 14 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| POST | `/api/files/upload` | Upload file | JWT Required |
| GET | `/api/files` | File list | JWT Required |
| GET | `/api/files/storage` | Get storage quota | JWT Required |
| GET | `/api/files/storage-info` | Storage info (alias) | JWT Required |
| GET | `/api/files/{id}` | Get file details | JWT Required |
| GET | `/api/files/{id}/download-url` | Get download URL | JWT Required |
| PATCH | `/api/files/{id}/rename` | Rename file | JWT Required |
| POST | `/api/files/{id}/move` | Move file | JWT Required |
| POST | `/api/files/{id}/copy` | Copy file | JWT Required |
| PATCH | `/api/files/{id}/favorite` | Toggle favorite status | JWT Required |
| POST | `/api/files/{id}/share` | Share file | JWT Required |
| POST | `/api/files/batch-delete` | Batch delete | JWT Required |
| DELETE | `/api/files/{id}` | Delete file | JWT Required |

#### Calendar Events - 9 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/calendar/events` | Event list (date range query) | JWT Required |
| GET | `/api/calendar/events/{id}` | Get event details | JWT Required |
| POST | `/api/calendar/events` | Create calendar event | JWT Required |
| PUT | `/api/calendar/events/{id}` | Update event info | JWT Required |
| PATCH | `/api/calendar/events/{id}/reschedule` | Reschedule event | JWT Required |
| POST | `/api/calendar/events/{id}/attendees` | Add attendee | JWT Required |
| DELETE | `/api/calendar/events/{id}/attendees/{attendeeId}` | Remove attendee | JWT Required |
| POST | `/api/calendar/events/batch-delete` | Batch delete | JWT Required |
| DELETE | `/api/calendar/events/{id}` | Delete event | JWT Required |

## Complete API Reference

### 1. Authentication Module (Auth)

#### 1.1 User Login

**Endpoint**: `POST /api/auth/login`
**Permission**: Public (no authentication required)
**Description**: Login with email and password, returns JWT tokens

**Request Body**:
```json
{
  "email": "admin@halolight.h7ml.cn",
  "password": "123456"
}
```

**Success Response** (200):
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

**curl Example**:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "123456"
  }'
```

#### 1.2 User Registration

**Endpoint**: `POST /api/auth/register`
**Permission**: Public (no authentication required)
**Description**: Register a new user account

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "securePass123"
}
```

**Success Response** (201):
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

#### 1.3 Refresh Token

**Endpoint**: `POST /api/auth/refresh`
**Permission**: Public (no authentication required)
**Description**: Use RefreshToken to get a new AccessToken

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response** (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2024-12-11T12:00:00.000Z"
}
```

#### 1.4 Get Current User

**Endpoint**: `GET /api/auth/me`
**Permission**: JWT Required (authentication required)
**Description**: Get detailed information of the currently logged-in user

**Request Header**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200):
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

### 2. User Management Module (Users)

#### 2.1 Get User List

**Endpoint**: `GET /api/users`
**Permission**: JWT Required
**Description**: Get user list with pagination and search support

**Query Parameters**:
- `page` (number, optional): Page number, default 1
- `limit` (number, optional): Page size, default 10
- `search` (string, optional): Search keyword
- `status` (string, optional): User status filter
- `role` (string, optional): Role filter

**Success Response** (200):
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

**curl Example**:
```bash
curl -X GET "http://localhost:8000/api/users?page=1&limit=10&search=admin" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Authentication Flow

### JWT Token Usage

All authenticated endpoints require the JWT Token in the request header:

```
Authorization: Bearer <access_token>
```

### Token Refresh Flow

1. Get `accessToken` and `refreshToken` from the login endpoint
2. Use `accessToken` to access protected endpoints
3. When `accessToken` expires (default 7 days), use `refreshToken` to call the refresh endpoint
4. Get new `accessToken` and `refreshToken` (token rotation)

### Authentication Example (Complete Flow)

```bash
# 1. Login to get tokens
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "123456"
  }')

# 2. Extract AccessToken
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')

# 3. Use Token to access protected endpoints
curl -X GET http://localhost:8000/api/users \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. When token expires, use RefreshToken to refresh
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
curl -X POST http://localhost:8000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

## Error Handling

### Standard Error Response Format

All error responses follow a unified format:

```json
{
  "detail": "Error message description"
}
```

Or validation errors:

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

### Common Error Codes

| Status Code | Meaning | Common Scenarios |
|-------------|---------|------------------|
| 400 | Bad Request | Request parameter validation failed |
| 401 | Unauthorized | Invalid or expired token |
| 403 | Forbidden | No permission to access resource |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Resource conflict (e.g., email already exists) |
| 422 | Unprocessable Entity | Request body validation failed |
| 500 | Internal Server Error | Server internal error |

## Database Models

SQLAlchemy models include **17 entities**, supporting a complete RBAC permission system:

```python
# Core User Model
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

    # Relationships
    roles: Mapped[list["UserRole"]] = relationship(back_populates="user")
    teams: Mapped[list["TeamMember"]] = relationship(back_populates="user")

# RBAC Role Model
class Role(Base):
    __tablename__ = "roles"

    id: Mapped[str] = mapped_column(String(25), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    label: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)

    # Relationships
    permissions: Mapped[list["RolePermission"]] = relationship(back_populates="role")

# Permission Model
class Permission(Base):
    __tablename__ = "permissions"

    id: Mapped[str] = mapped_column(String(25), primary_key=True)
    action: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
```

## Environment Variables

```bash
# Application Config
DEBUG=false
ENVIRONMENT=production
API_PREFIX=/api

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/halolight_db
DATABASE_ECHO=false

# JWT Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_REFRESH_SECRET_KEY=your-refresh-secret-key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 days
JWT_REFRESH_TOKEN_EXPIRE_DAYS=30

# CORS Config
CORS_ORIGINS=["http://localhost:3000","https://halolight.h7ml.cn"]

# Security
PASSWORD_MIN_LENGTH=8
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Clone project
git clone https://github.com/halolight/halolight-api-python.git
cd halolight-api-python

# Configure environment variables
cp .env.example .env
# Edit .env file

# Start all services (API + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### Build API Container Only

```bash
# Build image
docker build -t halolight-api-python .

# Run container
docker run -d \
  --name halolight-api \
  -p 8000:8000 \
  --env-file .env \
  halolight-api-python
```

## Common Commands

```bash
# Development
uvicorn app.main:app --reload --port 8000    # Start development server

# Code Quality
black app tests                              # Code formatting
ruff check app tests                         # Lint check
ruff check app tests --fix                   # Lint auto-fix
mypy app                                     # Type checking

# Testing
pytest                                       # Run tests
pytest --cov=app tests/                      # Test coverage

# Database Migrations
alembic revision --autogenerate -m "desc"    # Create migration
alembic upgrade head                         # Apply migrations
alembic downgrade -1                         # Rollback one version
```

## Architecture Features

### 1. Layered Architecture

Follows FastAPI layered architecture:

```python
# Router Layer
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

# Service Layer
class UserService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_list(self, page: int, limit: int) -> tuple[list[User], int]:
        query = self.db.query(User)
        total = query.count()
        users = query.offset((page - 1) * limit).limit(limit).all()
        return users, total
```

### 2. Pydantic Validation

Uses Pydantic v2 for automatic validation:

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

### 3. Dependency Injection

FastAPI's dependency injection system:

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

### 4. Swagger Documentation

Auto-generated interactive API docs at `/api/docs`:

- Complete API endpoint list
- Request/Response schemas
- Online testing functionality
- JWT authentication support

## Database Compatibility

This project shares the same PostgreSQL database with NestJS/Java versions:

- Table names match Prisma schema (e.g., `users`, `roles`, `teams`)
- Primary keys use cuid format strings
- ENUM types reuse Prisma-created types (`create_type=False`)
- Supports running multiple backend versions simultaneously

## Related Links

- [Live Preview](http://halolight-api-python.h7ml.cn)
- [API Documentation](http://halolight-api-python.h7ml.cn/api/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-python)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://www.sqlalchemy.org/)
- [Issue Tracker](https://github.com/halolight/halolight-api-python/issues)

## Next Steps

- Check [API Design Patterns](/en/development/api-patterns) for frontend integration
- Review [Authentication System](/en/development/authentication) for permission control implementation
- See [Overall Architecture](/en/development/architecture) for the HaloLight ecosystem
