# Go Gin Backend API

HaloLight Go backend API built with Gin 1.10 + GORM 2, providing complete JWT dual-token authentication and RBAC permission system.

## Features

- **Gin 1.10** - High-performance HTTP web framework with fast routing
- **GORM 2** - Powerful ORM library with auto-migration and associations
- **JWT Dual Tokens** - AccessToken + RefreshToken (7 days + 30 days validity)
- **RBAC Permissions** - Role-based access control with wildcard support (users:*, *)
- **ULID Primary Keys** - 26-character unique IDs, time-sortable and URL-safe
- **Request Validation** - Automatic validation with Gin Binding
- **Unified Response** - Standardized JSON response format
- **Docker Deployment** - Multi-stage build optimized, only 20MB image size
- **CI/CD Ready** - GitHub Actions with automated testing and security scanning

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Gin 1.10 |
| Language | Go 1.22+ |
| ORM | GORM 2 |
| Database | PostgreSQL 16 |
| Authentication | JWT (golang-jwt/jwt/v5) |
| Validation | Gin Binding + go-playground/validator |
| ID Generation | ULID (oklog/ulid) |
| Documentation | Swagger UI |
| Testing | Go testing + race detector |
| Containerization | Docker + Docker Compose |

## Quick Start

### Method 1: Local Development

```bash
# 1. Clone repository
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# 2. Install Go 1.22+
# macOS
brew install go

# Ubuntu
sudo apt install golang-1.22

# 3. Install dependencies
go mod download

# 4. Configure environment
cp .env.example .env
# Edit .env file to configure database and JWT secret

# 5. Start PostgreSQL (using Docker)
docker-compose up -d postgres

# 6. Run development server
go run cmd/server/main.go

# Server will start at http://localhost:8080
```

### Method 2: Docker Compose

```bash
# 1. Clone repository
git clone https://github.com/halolight/halolight-api-go.git
cd halolight-api-go

# 2. Configure environment
cp .env.example .env

# 3. Start all services
docker-compose up -d

# Access services
# - API: http://localhost:8080
# - Swagger: http://localhost:8080/docs
# - Health Check: http://localhost:8080/health
```

### Method 3: Using Makefile

```bash
# Development mode (hot reload)
make dev

# Build
make build

# Run
make run

# Test
make test

# Test coverage
make test-coverage

# Lint
make lint

# Clean
make clean
```

## Project Structure

```
halolight-api-go/
├── cmd/                          # Application entry
│   └── server/
│       └── main.go               # Main entry point
├── internal/                     # Internal packages
│   ├── handlers/                 # HTTP handlers (13 modules)
│   │   ├── auth_handler.go       # Auth endpoints
│   │   ├── user_handler.go       # User management
│   │   ├── role_handler.go       # Role management
│   │   ├── permission_handler.go # Permission management
│   │   ├── team_handler.go       # Team management
│   │   ├── document_handler.go   # Document management
│   │   ├── file_handler.go       # File management
│   │   ├── folder_handler.go     # Folder management
│   │   ├── calendar_handler.go   # Calendar events
│   │   ├── notification_handler.go # Notifications
│   │   ├── message_handler.go    # Messaging
│   │   ├── dashboard_handler.go  # Dashboard stats
│   │   └── home_handler.go       # Home + Health check
│   ├── middleware/               # Middleware
│   │   ├── auth.go               # JWT authentication
│   │   └── cors.go               # CORS middleware
│   ├── models/                   # GORM models (17 models)
│   │   ├── user.go               # User model
│   │   ├── role.go               # Role model
│   │   ├── permission.go         # Permission model
│   │   ├── refresh_token.go      # Refresh token
│   │   ├── team.go               # Team model
│   │   ├── document.go           # Document model
│   │   ├── file.go               # File model
│   │   └── ulid.go               # ULID generator
│   ├── repository/               # Data access layer
│   │   ├── user_repository.go
│   │   └── refresh_token_repository.go
│   ├── services/                 # Business logic (12 services)
│   │   ├── auth_service.go
│   │   ├── user_service.go
│   │   ├── role_service.go
│   │   └── ...
│   └── routes/                   # Route configuration
│       └── router.go
├── pkg/                          # Public packages
│   ├── config/                   # Configuration
│   ├── database/                 # Database connection
│   └── utils/                    # Utilities (JWT, hash)
├── docs/                         # Documentation
│   └── swagger-ui/               # Swagger UI
├── .github/workflows/            # GitHub Actions
├── Dockerfile                    # Multi-stage build
├── docker-compose.yml            # Docker Compose
├── Makefile                      # Make commands
└── go.mod                        # Go module definition
```

## API Modules

HaloLight Go API provides **12 core business modules** with **90+ RESTful API endpoints**:

### 1. Authentication (7 endpoints)

```
POST   /api/auth/register         # User registration
POST   /api/auth/login            # User login
POST   /api/auth/refresh          # Refresh token
POST   /api/auth/logout           # Logout
GET    /api/auth/me               # Get current user
POST   /api/auth/forgot-password  # Forgot password
POST   /api/auth/reset-password   # Reset password
```

### 2. Users (7 endpoints)

```
GET    /api/users                 # List users (pagination, search)
GET    /api/users/:id             # Get user details
POST   /api/users                 # Create user
PUT    /api/users/:id             # Update user
PATCH  /api/users/:id/status      # Update user status
POST   /api/users/batch-delete    # Batch delete users
DELETE /api/users/:id             # Delete user
```

### 3. Roles (6 endpoints)

```
GET    /api/roles                 # List roles
GET    /api/roles/:id             # Get role details
POST   /api/roles                 # Create role
PUT    /api/roles/:id             # Update role
POST   /api/roles/:id/permissions # Assign permissions
DELETE /api/roles/:id             # Delete role
```

### 4. Permissions (4 endpoints)

```
GET    /api/permissions           # List permissions
GET    /api/permissions/:id       # Get permission details
POST   /api/permissions           # Create permission
DELETE /api/permissions/:id       # Delete permission
```

### 5. Teams (7 endpoints)

```
GET    /api/teams                 # List teams
GET    /api/teams/:id             # Get team details
POST   /api/teams                 # Create team
PATCH  /api/teams/:id             # Update team
DELETE /api/teams/:id             # Delete team
POST   /api/teams/:id/members     # Add member
DELETE /api/teams/:id/members/:userId # Remove member
```

### 6. Documents (11 endpoints)

```
GET    /api/documents             # List documents (pagination, search)
GET    /api/documents/:id         # Get document details
POST   /api/documents             # Create document
PUT    /api/documents/:id         # Update document
PATCH  /api/documents/:id/rename  # Rename document
POST   /api/documents/:id/move    # Move document
POST   /api/documents/:id/tags    # Update tags
POST   /api/documents/:id/share   # Share document
POST   /api/documents/:id/unshare # Unshare document
POST   /api/documents/batch-delete # Batch delete
DELETE /api/documents/:id         # Delete document
```

### 7. Files (14 endpoints)

```
POST   /api/files/upload          # Upload file
POST   /api/files/folder          # Create folder
GET    /api/files                 # List files
GET    /api/files/storage         # Get storage info
GET    /api/files/storage-info    # Get storage info (alias)
GET    /api/files/:id             # Get file details
GET    /api/files/:id/download-url # Get download URL
PATCH  /api/files/:id/rename      # Rename file
POST   /api/files/:id/move        # Move file
POST   /api/files/:id/copy        # Copy file
PATCH  /api/files/:id/favorite    # Toggle favorite
POST   /api/files/:id/share       # Share file
POST   /api/files/batch-delete    # Batch delete
DELETE /api/files/:id             # Delete file
```

### 8. Folders (5 endpoints)

```
GET    /api/folders               # List folders
GET    /api/folders/tree          # Get folder tree
GET    /api/folders/:id           # Get folder details
POST   /api/folders               # Create folder
DELETE /api/folders/:id           # Delete folder
```

### 9. Calendar (9 endpoints)

```
GET    /api/calendar/events       # List events
GET    /api/calendar/events/:id   # Get event details
POST   /api/calendar/events       # Create event
PUT    /api/calendar/events/:id   # Update event
PATCH  /api/calendar/events/:id/reschedule # Reschedule event
POST   /api/calendar/events/:id/attendees   # Add attendee
DELETE /api/calendar/events/:id/attendees/:attendeeId # Remove attendee
POST   /api/calendar/events/batch-delete # Batch delete
DELETE /api/calendar/events/:id   # Delete event
```

### 10. Notifications (5 endpoints)

```
GET    /api/notifications         # List notifications
GET    /api/notifications/unread-count # Get unread count
PUT    /api/notifications/:id/read # Mark as read
PUT    /api/notifications/read-all # Mark all as read
DELETE /api/notifications/:id     # Delete notification
```

### 11. Messages (5 endpoints)

```
GET    /api/messages/conversations # List conversations
GET    /api/messages/conversations/:id # Get conversation details
POST   /api/messages              # Send message
PUT    /api/messages/:id/read     # Mark message as read
DELETE /api/messages/:id          # Delete message
```

### 12. Dashboard (9 endpoints)

```
GET    /api/dashboard/stats       # Get statistics
GET    /api/dashboard/visits      # Get visit data
GET    /api/dashboard/sales       # Get sales data
GET    /api/dashboard/products    # Get product data
GET    /api/dashboard/orders      # Get order data
GET    /api/dashboard/activities  # Get activity data
GET    /api/dashboard/pie         # Get pie chart data
GET    /api/dashboard/tasks       # Get task data
GET    /api/dashboard/overview    # Get overview data
```

## Authentication System

### JWT Dual Token Mechanism

```go
// AccessToken Configuration
- Validity: 7 days (168 hours)
- Purpose: API access authentication
- Storage: Client memory/localStorage

// RefreshToken Configuration
- Validity: 30 days (720 hours)
- Purpose: Refresh AccessToken
- Storage: Database + Client (HttpOnly Cookie recommended)
```

### Authentication Flow

#### 1. User Registration

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "SecurePass123!"
}

# Response
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

#### 2. User Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

# Response (same as registration)
```

#### 3. Refresh Token

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

# Response
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIs..." # New AccessToken
}
```

#### 4. Get Current User

```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# Response
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
        "label": "Regular User"
      }
    ],
    "createdAt": "2024-12-10T00:00:00Z"
  }
}
```

### Using Authentication

Add `Authorization` header to authenticated requests:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     http://localhost:8080/api/users
```

## RBAC Permission System

### Permission Format

```
Format: resource:action
Examples:
  - users:view      # View users
  - users:create    # Create users
  - users:*         # All user permissions
  - *               # All permissions (super admin)
```

### Built-in Roles

| Role | Permissions | Description |
|------|-------------|-------------|
| **admin** | `*` | Super admin with all permissions |
| **user** | `users:view`, `documents:*`, `files:*` | Regular user, manage own documents and files |
| **guest** | `users:view`, `documents:view` | Guest with read-only access |

### Assign Permissions

```bash
# 1. Create role
POST /api/roles
{
  "name": "editor",
  "label": "Editor",
  "description": "Can edit documents"
}

# 2. Assign permissions
POST /api/roles/{roleId}/permissions
{
  "permissionIds": ["permission_id_1", "permission_id_2"]
}

# 3. Assign role to user
PUT /api/users/{userId}
{
  "roleIds": ["role_id_1", "role_id_2"]
}
```

## Database Models

### Core Models

```go
// User Model
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

    // Relations
    Roles       []Role    `gorm:"many2many:user_roles"`
}

// Role Model
type Role struct {
    ID          string    `gorm:"primaryKey;type:char(26)"`
    Name        string    `gorm:"uniqueIndex;size:100;not null"`
    Label       string    `gorm:"size:191;not null"`
    Description *string   `gorm:"type:text"`
    CreatedAt   time.Time
    UpdatedAt   time.Time

    // Relations
    Permissions []Permission `gorm:"many2many:role_permissions"`
}

// Refresh Token Model
type RefreshToken struct {
    ID        string    `gorm:"primaryKey;type:char(26)"`
    UserID    string    `gorm:"index;type:char(26);not null"`
    Token     string    `gorm:"uniqueIndex;size:500;not null"`
    ExpiresAt time.Time `gorm:"index;not null"`
    CreatedAt time.Time
}
```

### Database Migration

GORM auto-migration:

```go
db.AutoMigrate(
    &models.User{},
    &models.Role{},
    &models.Permission{},
    &models.RefreshToken{},
    &models.Team{},
    &models.Document{},
    &models.File{},
    // ... other models
)
```

## Environment Variables

### Complete Configuration (.env)

```bash
# Application
APP_ENV=development          # Environment: development/production
APP_PORT=8080                # Port

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars  # JWT secret (min 32 chars)
JWT_EXPIRE_MINUTES=10080     # AccessToken validity (minutes) = 7 days

# Database
DB_HOST=localhost            # Database host
DB_PORT=5432                 # Database port
DB_USER=postgres             # Database user
DB_PASSWORD=postgres         # Database password
DB_NAME=halolight            # Database name
DB_SSLMODE=disable           # SSL mode: disable/require
```

### Neon PostgreSQL Configuration

```bash
# Neon Database (recommended for production)
DB_HOST=your-project.neon.tech
DB_PORT=5432
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=halolight_prod
DB_SSLMODE=require           # Neon requires SSL
```

## Unified Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Data content
  },
  "message": "Operation successful"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [
    // Data list
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

## Docker Deployment

### Dockerfile Features

- **Multi-stage Build**: Separate Builder and Runtime
- **Small Size**: Final image only 20MB (using distroless/base-debian12)
- **Secure**: Runs as non-root user
- **Optimized**: CGO_ENABLED=0, static compilation

### Deployment Commands

```bash
# Build image
docker build -t halolight-api-go:latest .

# Start services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Restart service
docker-compose restart api
```

## Testing

### Run Tests

```bash
# Unit tests
go test ./...

# With coverage
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# Race detection
go test -race ./...

# Verbose output
go test -v ./...
```

### CI/CD

Project uses GitHub Actions for automated testing and building:

- ✅ **Code Quality**: go vet, golangci-lint
- ✅ **Unit Tests**: go test -race
- ✅ **Security Scan**: gosec, govulncheck
- ✅ **Multi-platform Build**: Linux, macOS, Windows
- ✅ **Docker Build**: Automated image push

## Performance Metrics

| Metric | Value |
|--------|-------|
| Response Time | < 10ms (average) |
| Concurrent Processing | 10,000+ QPS |
| Memory Usage | ~50MB (idle) |
| Docker Image | ~20MB |
| Startup Time | < 1s |

## Common Issues

### 1. JWT Secret Requirements

```bash
# Generate secure JWT secret
openssl rand -base64 64

# Set in .env
JWT_SECRET=generated_secret
```

### 2. Database Connection Failed

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart database
docker-compose restart postgres

# View database logs
docker-compose logs postgres
```

### 3. Port Conflict

```bash
# Modify port in .env
APP_PORT=8081

# Or modify docker-compose.yml
ports:
  - "8081:8080"
```

### 4. CORS Error

Frontend needs to configure correct API address. CORS middleware is configured to allow all origins (development environment).

For production, modify `internal/middleware/cors.go`:

```go
config.AddAllowOrigins("https://your-frontend.com")
```

## Development Tools

### Recommended VSCode Extensions

- **Go** - Go language support
- **Go Test Explorer** - Test management
- **REST Client** - API testing
- **Docker** - Docker support

### Recommended Tools

- **Air** - Hot reload
- **goose** - Database migration
- **wire** - Dependency injection
- **mockery** - Mock generation

## Related Links

- 📘 [GitHub Repository](https://github.com/halolight/halolight-api-go)
- 📖 [Documentation](https://halolight.docs.h7ml.cn/en/guide/api-go)
- 🔵 [API Homepage](http://localhost:8080/)
- 📄 [Swagger Docs](http://localhost:8080/docs)
- 💚 [Health Check](http://localhost:8080/health)

## License

MIT License - See [LICENSE](https://github.com/halolight/halolight-api-go/blob/main/LICENSE) file for details
