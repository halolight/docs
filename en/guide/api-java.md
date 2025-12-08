# Java Spring Boot Backend API

HaloLight Java Backend API, an enterprise-grade backend service built on Spring Boot 3.4.1 framework, providing a complete RBAC permission system and Swagger documentation.

## Features

- **Spring Boot 3.4.1** - Enterprise Java framework with dependency injection and annotation-driven development
- **Spring Data JPA** - Type-safe database access with PostgreSQL 16 support
- **JWT Dual-Token** - AccessToken + RefreshToken authentication mechanism
- **RBAC Permissions** - Role-based access control with wildcard permission support
- **Swagger Documentation** - Springdoc OpenAPI auto-generated interactive API docs
- **Request Validation** - Bean Validation for automatic DTO validation
- **Docker Deployment** - Multi-stage build optimization, Docker Compose one-click deployment
- **Complete Testing** - JUnit 5 unit tests + integration tests

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Spring Boot 3.4.1 |
| Language | Java 23 |
| Database | PostgreSQL 16 + Spring Data JPA |
| Authentication | Spring Security + JJWT |
| Validation | Bean Validation (jakarta.validation) |
| Documentation | Springdoc OpenAPI (Swagger UI) |
| Testing | JUnit 5 + Mockito + Spring Boot Test |
| Containerization | Docker + Docker Compose |
| Build Tool | Maven 3.9+ |

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-java.git
cd halolight-api-java

# Configure environment variables
cp .env.example .env
# Edit .env file to configure database and JWT secret

# Run development server
./mvnw spring-boot:run

# Build for production
./mvnw clean package -DskipTests
java -jar target/halolight-api-java-1.0.0.jar
```

## Project Structure

```
halolight-api-java/
├── src/main/java/com/halolight/
│   ├── controller/                 # REST Controller Layer
│   │   ├── AuthController.java     # Auth endpoints (login, register, refresh)
│   │   ├── UserController.java     # User management
│   │   ├── RoleController.java     # Role management
│   │   ├── PermissionController.java # Permission management
│   │   ├── TeamController.java     # Team management
│   │   ├── DocumentController.java # Document management
│   │   ├── FileController.java     # File management
│   │   ├── FolderController.java   # Folder management
│   │   ├── CalendarController.java # Calendar events
│   │   ├── NotificationController.java # Notifications
│   │   ├── MessageController.java  # Messaging
│   │   └── DashboardController.java # Dashboard stats
│   ├── service/                    # Business Logic Layer
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   └── ...
│   ├── domain/                     # Domain Layer
│   │   ├── entity/                 # JPA Entities (17 entities)
│   │   │   ├── User.java
│   │   │   ├── Role.java
│   │   │   ├── Permission.java
│   │   │   └── ...
│   │   └── repository/             # JPA Repository Interfaces
│   ├── web/dto/                    # Data Transfer Objects (organized by module)
│   │   ├── auth/                   # Auth-related DTOs
│   │   ├── calendar/               # Calendar-related DTOs
│   │   └── ...
│   ├── config/                     # Configuration Classes
│   │   ├── SecurityConfig.java     # Spring Security config
│   │   ├── CorsConfig.java         # CORS config
│   │   ├── OpenApiConfig.java      # Swagger config
│   │   └── CacheConfig.java        # Cache config
│   ├── security/                   # Security Components
│   │   ├── JwtTokenProvider.java   # JWT generation/validation
│   │   ├── JwtAuthenticationFilter.java # JWT auth filter
│   │   └── RateLimitFilter.java    # Rate limiting filter
│   ├── exception/                  # Exception Handling
│   │   └── GlobalExceptionHandler.java
│   └── HalolightApplication.java   # Application Entry Point
├── src/main/resources/
│   ├── application.yml             # Main config file
│   ├── application-dev.yml         # Development config
│   └── application-prod.yml        # Production config
├── Dockerfile                      # Docker multi-stage build
├── docker-compose.yml              # Docker Compose config
└── pom.xml                         # Maven config
```

## API Modules

The project contains **12 core business modules** providing **60+ RESTful API endpoints**:

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Auth** | 7 | User authentication (login, register, refresh token, get current user, logout, forgot/reset password) |
| **Users** | 6 | User management (CRUD, pagination, search, status update, password change) |
| **Roles** | 6 | Role management (CRUD + permission assignment) |
| **Permissions** | 4 | Permission management (wildcard support: `users:*`, `*`) |
| **Teams** | 6 | Team management (CRUD, member management) |
| **Documents** | 10 | Document management (CRUD, sharing, moving, tags) |
| **Files** | 10 | File management (upload, download, favorites, batch operations) |
| **Folders** | 5 | Folder management (CRUD, tree structure) |
| **Calendar** | 8 | Calendar event management (CRUD, attendees, reminders) |
| **Notifications** | 5 | Notification management (list, unread count, mark as read) |
| **Messages** | 5 | Message conversations (conversation list, send messages, read status) |
| **Dashboard** | 5 | Dashboard statistics (overview, trends, rankings) |

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
| PUT | `/api/users/{id}` | Update user | JWT Required |
| PUT | `/api/users/{id}/status` | Update user status | JWT Required |
| DELETE | `/api/users/{id}` | Delete user | JWT Required |

### Complete Endpoint List

> The following tables list all API endpoints for each business module.

#### Documents - 10 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/documents` | Document list (pagination, search) | JWT Required |
| GET | `/api/documents/{id}` | Get document details | JWT Required |
| POST | `/api/documents` | Create document | JWT Required |
| PUT | `/api/documents/{id}` | Update document content | JWT Required |
| PUT | `/api/documents/{id}/rename` | Rename document | JWT Required |
| POST | `/api/documents/{id}/move` | Move to target folder | JWT Required |
| POST | `/api/documents/{id}/tags` | Update tags | JWT Required |
| POST | `/api/documents/{id}/share` | Share document | JWT Required |
| POST | `/api/documents/{id}/unshare` | Unshare document | JWT Required |
| DELETE | `/api/documents/{id}` | Delete document | JWT Required |

#### Files - 10 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| POST | `/api/files/upload` | Upload file | JWT Required |
| GET | `/api/files` | File list | JWT Required |
| GET | `/api/files/storage` | Get storage quota | JWT Required |
| GET | `/api/files/{id}` | Get file details | JWT Required |
| GET | `/api/files/{id}/download` | Download file | JWT Required |
| PUT | `/api/files/{id}/rename` | Rename file | JWT Required |
| POST | `/api/files/{id}/move` | Move file | JWT Required |
| PUT | `/api/files/{id}/favorite` | Toggle favorite status | JWT Required |
| POST | `/api/files/{id}/share` | Share file | JWT Required |
| DELETE | `/api/files/{id}` | Delete file | JWT Required |

#### Calendar Events - 8 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/calendar/events` | Event list (date range query) | JWT Required |
| GET | `/api/calendar/events/{id}` | Get event details | JWT Required |
| POST | `/api/calendar/events` | Create calendar event | JWT Required |
| PUT | `/api/calendar/events/{id}` | Update event info | JWT Required |
| PUT | `/api/calendar/events/{id}/reschedule` | Reschedule event | JWT Required |
| POST | `/api/calendar/events/{id}/attendees` | Add attendee | JWT Required |
| DELETE | `/api/calendar/events/{id}/attendees/{attendeeId}` | Remove attendee | JWT Required |
| DELETE | `/api/calendar/events/{id}` | Delete event | JWT Required |

#### Notifications - 5 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/notifications` | Notification list | JWT Required |
| GET | `/api/notifications/unread-count` | Get unread count | JWT Required |
| PUT | `/api/notifications/{id}/read` | Mark single as read | JWT Required |
| PUT | `/api/notifications/read-all` | Mark all as read | JWT Required |
| DELETE | `/api/notifications/{id}` | Delete notification | JWT Required |

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

**Field Description**:
- `email` (string, required): User email, must be valid email format
- `password` (string, required): User password, minimum 6 characters

**Success Response** (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "admin@halolight.h7ml.cn",
    "name": "Admin User",
    "avatar": "https://avatar.example.com/admin.jpg",
    "status": "ACTIVE"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Request parameter validation failed
- `401 Unauthorized`: Invalid email or password

**curl Example**:
```bash
curl -X POST http://localhost:8080/api/auth/login \
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
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "name": "New User",
    "status": "ACTIVE"
  }
}
```

**curl Example**:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "securePass123"
  }'
```

#### 1.3 Refresh Token

**Endpoint**: `POST /api/auth/refresh`
**Permission**: Public (no authentication required)
**Description**: Use RefreshToken to get a new AccessToken

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
}
```

**Success Response** (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
}
```

**curl Example**:
```bash
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
  }'
```

#### 1.4 Get Current User

**Endpoint**: `GET /api/auth/me`
**Permission**: JWT Required (authentication required)
**Description**: Get detailed information of the currently logged-in user

**Request Header**:
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

**Success Response** (200):
```json
{
  "id": 1,
  "email": "admin@halolight.h7ml.cn",
  "name": "Admin User",
  "avatar": "https://avatar.example.com/admin.jpg",
  "status": "ACTIVE",
  "roles": [
    {
      "id": 1,
      "name": "ADMIN",
      "permissions": ["*"]
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9..."
```

### 2. User Management Module (Users)

#### 2.1 Get User List

**Endpoint**: `GET /api/users`
**Permission**: JWT Required
**Description**: Get user list with pagination and search support

**Query Parameters**:
- `page` (number, optional): Page number, default 0
- `size` (number, optional): Page size, default 10
- `search` (string, optional): Search keyword
- `status` (string, optional): User status filter

**Success Response** (200):
```json
{
  "content": [
    {
      "id": 1,
      "email": "admin@halolight.h7ml.cn",
      "name": "Admin User",
      "avatar": "https://avatar.example.com/admin.jpg",
      "status": "ACTIVE",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalElements": 100,
  "totalPages": 10,
  "number": 0,
  "size": 10
}
```

**curl Example**:
```bash
curl -X GET "http://localhost:8080/api/users?page=0&size=10&search=admin" \
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
3. When `accessToken` expires (default 24 hours), use `refreshToken` to call the refresh endpoint
4. Get new `accessToken` and `refreshToken`

### Authentication Example (Complete Flow)

```bash
# 1. Login to get tokens
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "123456"
  }')

# 2. Extract AccessToken
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')

# 3. Use Token to access protected endpoints
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. When token expires, use RefreshToken to refresh
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

## Error Handling

### Standard Error Response Format

All error responses follow a unified format:

```json
{
  "timestamp": "2025-12-04T12:00:00.000Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users",
  "details": [
    {
      "field": "email",
      "message": "must be a valid email address"
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
| 422 | Unprocessable Entity | Business logic validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server internal error |

## Database Models

Spring Data JPA entities include **17 models**, supporting a complete RBAC permission system:

```java
// Core User Entity
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    private String password;
    private String avatar;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;

    @ManyToMany
    @JoinTable(name = "user_roles")
    private Set<Role> roles;

    // ... more relationships
}

// RBAC Role Entity
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private String description;

    @ManyToMany
    @JoinTable(name = "role_permissions")
    private Set<Permission> permissions;
}

// Permission Entity
@Entity
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;  // Format: "users:create", "users:*", "*"

    private String description;
}
```

## Environment Variables

```bash
# Application Config
SPRING_PROFILES_ACTIVE=production
PORT=8080

# Database (PostgreSQL)
DATABASE_URL=jdbc:postgresql://localhost:5432/halolight_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRATION=86400000        # AccessToken expiration (ms, default 24 hours)
JWT_REFRESH_EXPIRATION=604800000  # RefreshToken expiration (ms, default 7 days)

# CORS Config
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://halolight.h7ml.cn
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Clone project
git clone https://github.com/halolight/halolight-api-java.git
cd halolight-api-java

# Configure environment variables
cp .env.example .env
# Edit .env file

# Start all services (API + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Build API Container Only

```bash
# Build image
docker build -t halolight-api-java .

# Run container
docker run -d \
  --name halolight-api \
  -p 8080:8080 \
  --env-file .env \
  halolight-api-java
```

## Common Commands

```bash
# Development
./mvnw spring-boot:run              # Start development server

# Build
./mvnw clean package                # Build JAR
./mvnw clean package -DskipTests    # Build without tests

# Testing
./mvnw test                         # Run unit tests
./mvnw test -Dtest=UserServiceTest  # Run specific test class
./mvnw verify                       # Run all tests
./mvnw test jacoco:report           # Generate coverage report
```

## Architecture Features

### 1. Layered Architecture

Follows Spring Boot layered architecture:

```java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public Page<UserDTO> getUsers(Pageable pageable) {
        return userService.findAll(pageable);
    }
}

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Page<UserDTO> findAll(Pageable pageable) {
        return userRepository.findAll(pageable)
            .map(UserMapper::toDTO);
    }
}
```

### 2. DTO Validation

Uses Bean Validation for automatic validation:

```java
public class CreateUserRequest {
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Name cannot be empty")
    private String name;
}
```

### 3. Global Exception Handling

Unified error response format:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        // Handle validation errors
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex) {
        // Handle resource not found
    }
}
```

### 4. Swagger Documentation

Auto-generated interactive API docs at `/api/swagger-ui`:

- Complete API endpoint list
- Request/Response schemas
- Online testing functionality
- JWT authentication support

## Observability

Project integrates Spring Actuator + Micrometer:

| Endpoint | Description |
|----------|-------------|
| `/actuator/health` | Health check |
| `/actuator/metrics` | Application metrics |
| `/actuator/prometheus` | Prometheus format metrics |
| `/actuator/info` | Application info |

## Related Links

- [Live Preview](http://halolight-api-java.h7ml.cn)
- [API Documentation](http://halolight-api-java.h7ml.cn/api/swagger-ui)
- [GitHub Repository](https://github.com/halolight/halolight-api-java)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA Documentation](https://spring.io/projects/spring-data-jpa)
- [Issue Tracker](https://github.com/halolight/halolight-api-java/issues)

## Next Steps

- Check [API Design Patterns](/en/development/api-patterns) for frontend integration
- Review [Authentication System](/en/development/authentication) for permission control implementation
- See [Overall Architecture](/en/development/architecture) for the HaloLight ecosystem
