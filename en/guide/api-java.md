# Java Spring Boot Backend API

HaloLight Spring Boot backend API is built on Spring Boot 3.4.1, providing enterprise-grade backend service with complete JWT dual-token authentication.

**API Documentation**: [https://halolight-api-java.h7ml.cn/api/swagger-ui](https://halolight-api-java.h7ml.cn/api/swagger-ui)

**GitHub**: [https://github.com/halolight/halolight-api-java](https://github.com/halolight/halolight-api-java)

## Features

- 🔐 **JWT Dual-Token** - Access Token + Refresh Token, automatic renewal
- 🛡️ **RBAC Permissions** - Role-based access control, wildcard matching
- 📡 **RESTful API** - Standardized interface design, OpenAPI documentation
- 🗄️ **Spring Data JPA** - Type-safe database operations
- ✅ **Data Validation** - Bean Validation request parameter validation
- 📊 **Logging System** - Request logs, error tracking
- 🐳 **Docker Support** - Multi-stage build, containerized deployment

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Java | 23 | Runtime |
| Spring Boot | 3.4.1 | Web Framework |
| Spring Data JPA | 3.4.1 | Database ORM |
| PostgreSQL | 16 | Data Storage |
| Bean Validation | jakarta.validation | Data Validation |
| JWT | JJWT | Authentication |
| Springdoc OpenAPI | 2.7.0 | API Documentation |

## Quick Start

### Requirements

- Java >= 17
- Maven >= 3.9
- PostgreSQL 16 (optional, defaults to H2)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-java.git
cd halolight-api-java

# Install dependencies
./mvnw clean install
```

### Environment Variables

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL=jdbc:postgresql://localhost:5432/halolight_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Service Configuration
PORT=8080
SPRING_PROFILES_ACTIVE=production
```

### Database Initialization

```bash
# Auto-create tables (first run)
./mvnw spring-boot:run

# Run seed data (optional)
./mvnw exec:java -Dexec.mainClass="com.halolight.seed.DataSeeder"
```

### Start Service

```bash
# Development mode
./mvnw spring-boot:run

# Production mode
./mvnw clean package -DskipTests
java -jar target/halolight-api-java-1.0.0.jar
```

Visit http://localhost:8080

## Directory Structure

```
halolight-api-java/
├── src/main/java/com/halolight/
│   ├── controller/              # Controllers/Route handlers
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   └── ...
│   ├── service/                 # Business logic layer
│   │   ├── AuthService.java
│   │   └── ...
│   ├── domain/                  # Data models
│   │   ├── entity/              # JPA Entities
│   │   └── repository/          # Repository interfaces
│   ├── config/                  # Middleware/Configuration
│   │   ├── SecurityConfig.java
│   │   └── ...
│   ├── web/dto/                 # Request validation DTOs
│   ├── security/                # Security components
│   └── HalolightApplication.java  # Application entry
├── src/main/resources/          # Resource files
│   ├── application.yml
│   └── application-*.yml
├── src/test/                    # Test files
├── Dockerfile                   # Docker configuration
├── docker-compose.yml
└── pom.xml                      # Maven configuration
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
| GET | `/api/auth/me` | Get current user | Authenticated |

### User Management Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/users` | Get user list | `users:view` |
| GET | `/api/users/{id}` | Get user details | `users:view` |
| POST | `/api/users` | Create user | `users:create` |
| PUT | `/api/users/{id}` | Update user | `users:update` |
| PUT | `/api/users/{id}/status` | Update user status | `users:update` |
| DELETE | `/api/users/{id}` | Delete user | `users:delete` |

### Complete Endpoint List

#### Role Management (Roles) - 6 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/roles` | Get role list |
| GET | `/api/roles/{id}` | Get role details |
| POST | `/api/roles` | Create role |
| PUT | `/api/roles/{id}` | Update role |
| POST | `/api/roles/{id}/permissions` | Assign permissions |
| DELETE | `/api/roles/{id}` | Delete role |

#### Permission Management (Permissions) - 4 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/permissions` | Get permission list |
| POST | `/api/permissions` | Create permission |
| PUT | `/api/permissions/{id}` | Update permission |
| DELETE | `/api/permissions/{id}` | Delete permission |

#### Document Management (Documents) - 10 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/documents` | Get document list |
| GET | `/api/documents/{id}` | Get document details |
| POST | `/api/documents` | Create document |
| PUT | `/api/documents/{id}` | Update document |
| PUT | `/api/documents/{id}/rename` | Rename document |
| POST | `/api/documents/{id}/move` | Move document |
| POST | `/api/documents/{id}/tags` | Update tags |
| POST | `/api/documents/{id}/share` | Share document |
| POST | `/api/documents/{id}/unshare` | Unshare document |
| DELETE | `/api/documents/{id}` | Delete document |

#### File Management (Files) - 10 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/files/upload` | Upload file |
| GET | `/api/files` | Get file list |
| GET | `/api/files/storage` | Get storage quota |
| GET | `/api/files/{id}` | Get file details |
| GET | `/api/files/{id}/download` | Download file |
| PUT | `/api/files/{id}/rename` | Rename file |
| POST | `/api/files/{id}/move` | Move file |
| PUT | `/api/files/{id}/favorite` | Toggle favorite |
| POST | `/api/files/{id}/share` | Share file |
| DELETE | `/api/files/{id}` | Delete file |

#### Team Management (Teams) - 6 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/teams` | Get team list |
| GET | `/api/teams/{id}` | Get team details |
| POST | `/api/teams` | Create team |
| PUT | `/api/teams/{id}` | Update team |
| POST | `/api/teams/{id}/members` | Add member |
| DELETE | `/api/teams/{id}/members/{userId}` | Remove member |

#### Message Management (Messages) - 5 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/messages/conversations` | Get conversation list |
| GET | `/api/messages/conversations/{userId}` | Get conversation messages |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/{id}/read` | Mark as read |
| DELETE | `/api/messages/{id}` | Delete message |

#### Notification Management (Notifications) - 5 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notifications` | Get notification list |
| GET | `/api/notifications/unread-count` | Get unread count |
| PUT | `/api/notifications/{id}/read` | Mark single as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| DELETE | `/api/notifications/{id}` | Delete notification |

#### Calendar Management (Calendar) - 8 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/calendar/events` | Get event list |
| GET | `/api/calendar/events/{id}` | Get event details |
| POST | `/api/calendar/events` | Create event |
| PUT | `/api/calendar/events/{id}` | Update event |
| PUT | `/api/calendar/events/{id}/reschedule` | Reschedule |
| POST | `/api/calendar/events/{id}/attendees` | Add attendee |
| DELETE | `/api/calendar/events/{id}/attendees/{attendeeId}` | Remove attendee |
| DELETE | `/api/calendar/events/{id}` | Delete event |

#### Dashboard (Dashboard) - 5 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Statistics data |
| GET | `/api/dashboard/visits` | Visit trends |
| GET | `/api/dashboard/sales` | Sales data |
| GET | `/api/dashboard/pie` | Pie chart data |
| GET | `/api/dashboard/tasks` | Pending tasks |

## Authentication Mechanism

### JWT Dual-Token

```
Access Token:  24-hour validity, used for API requests
Refresh Token: 7-day validity, used to refresh Access Token
```

### Request Header

```http
Authorization: Bearer <access_token>
```

### Refresh Flow

```java
// Frontend auto-refresh example
@Component
public class JwtTokenInterceptor {
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        Response response = chain.proceed(request);

        // 401 auto refresh
        if (response.code() == 401) {
            String newToken = refreshToken(refreshToken);
            Request newRequest = request.newBuilder()
                .header("Authorization", "Bearer " + newToken)
                .build();
            return chain.proceed(newRequest);
        }

        return response;
    }
}
```

## Permission System

### Role Definitions

| Role | Description | Permissions |
|------|-------------|-------------|
| `super_admin` | Super Administrator | `*` (all permissions) |
| `admin` | Administrator | `users:*`, `documents:*`, `roles:*` |
| `user` | Regular User | `documents:view`, `files:view` |
| `guest` | Guest | `dashboard:view` |

### Permission Format

```
{resource}:{action}

Examples:
- users:view      # View users
- users:create    # Create users
- users:*         # All user operations
- *               # All permissions
```

### Permission Check

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PreAuthorize("hasPermission('users:view')")
    @GetMapping
    public Page<UserDTO> getUsers(Pageable pageable) {
        return userService.findAll(pageable);
    }

    @PreAuthorize("hasPermission('users:create')")
    @PostMapping
    public UserDTO createUser(@Valid @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }
}
```

## Error Handling

### Error Response Format

```json
{
  "timestamp": "2025-12-04T12:00:00.000Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users",
  "details": [
    { "field": "email", "message": "must be a valid email address" }
  ]
}
```

### Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `Bad Request` | Parameter validation failed |
| 401 | `Unauthorized` | Unauthorized |
| 403 | `Forbidden` | No permission |
| 404 | `Not Found` | Resource not found |
| 409 | `Conflict` | Resource conflict |
| 422 | `Unprocessable Entity` | Business logic error |
| 429 | `Too Many Requests` | Rate limit exceeded |
| 500 | `Internal Server Error` | Server error |

## Database Models

Spring Data JPA entities include **17 models**:

```java
// User Entity
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
    @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

// Role Entity
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

**Complete Entity List**:
- User, Role, Permission (RBAC core)
- Team, TeamMember (team management)
- Document, File, Folder (document/file)
- CalendarEvent, EventAttendee (calendar)
- Notification, Message, Conversation (notification/message)
- Dashboard, Visit, Sale (dashboard statistics)

## Environment Variables

| Variable Name | Description | Default Value |
|---------------|-------------|---------------|
| `SPRING_PROFILES_ACTIVE` | Runtime environment | `development` |
| `PORT` | Service port | `8080` |
| `DATABASE_URL` | Database connection | `jdbc:postgresql://localhost:5432/halolight_db` |
| `DATABASE_USERNAME` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT secret (min 32 chars) | - |
| `JWT_EXPIRATION` | AccessToken expiration (ms) | `86400000` (24h) |
| `JWT_REFRESH_EXPIRATION` | RefreshToken expiration (ms) | `604800000` (7d) |
| `CORS_ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |

### Usage

```yaml
# application.yml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}

jwt:
  secret: ${JWT_SECRET}
  expiration: ${JWT_EXPIRATION:86400000}
  refreshExpiration: ${JWT_REFRESH_EXPIRATION:604800000}
```

## Common Commands

```bash
# Development
./mvnw spring-boot:run                # Start development server
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev  # Specify environment

# Build
./mvnw clean package                  # Build JAR
./mvnw clean package -DskipTests      # Build without tests
./mvnw clean install                  # Install to local repository

# Testing
./mvnw test                           # Run all tests
./mvnw test -Dtest=UserServiceTest    # Run specific test
./mvnw verify                         # Run integration tests
./mvnw test jacoco:report             # Generate coverage report

# Database
./mvnw flyway:migrate                 # Run migrations (if using Flyway)
./mvnw liquibase:update               # Update schema (if using Liquibase)

# Code Quality
./mvnw checkstyle:check               # Code style check
./mvnw spotbugs:check                 # Static analysis
```

## Deployment

### Docker

```bash
docker build -t halolight-api-java .
docker run -p 8080:8080 --env-file .env halolight-api-java
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
      - SPRING_PROFILES_ACTIVE=production
      - DATABASE_URL=jdbc:postgresql://db:5432/halolight
      - DATABASE_USERNAME=postgres
      - DATABASE_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: halolight
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Production Environment Configuration

```env
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:postgresql://prod-db.example.com:5432/halolight
DATABASE_USERNAME=halolight_user
DATABASE_PASSWORD=your-production-password
JWT_SECRET=your-production-secret-min-32-chars
CORS_ALLOWED_ORIGINS=https://halolight.h7ml.cn
```

## Testing

### Run Tests

```bash
./mvnw test                           # Run unit tests
./mvnw test jacoco:report             # Generate coverage report
./mvnw verify                         # Run integration tests
```

### Test Example

```java
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testLogin() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("admin@halolight.h7ml.cn");
        request.setPassword("123456");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }

    @Test
    @WithMockUser(authorities = {"users:view"})
    public void testGetUsers() throws Exception {
        mockMvc.perform(get("/api/users")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }
}
```

## Performance Metrics

### Benchmark

| Metric | Value | Description |
|--------|-------|-------------|
| Request Throughput | ~3000 QPS | Simple queries, 4 cores 8GB |
| Average Response Time | 15-30ms | P50, database queries |
| P95 Response Time | 50-100ms | Including complex queries |
| Memory Usage | 256-512 MB | Stable running state |
| CPU Usage | 10-30% | Medium load |

### Performance Testing

```bash
# Using Apache Bench
ab -n 10000 -c 100 -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/api/users

# Using wrk
wrk -t4 -c100 -d30s -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/api/users
```

## Observability

### Logging System

```java
// Logback configuration
@Slf4j
@RestController
public class UserController {

    @GetMapping("/api/users/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        log.info("Fetching user with id: {}", id);
        try {
            return userService.findById(id);
        } catch (Exception e) {
            log.error("Error fetching user {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }
}
```

### Health Check

```java
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Check database connection
        boolean dbUp = checkDatabase();

        if (dbUp) {
            return Health.up()
                .withDetail("database", "Available")
                .build();
        }

        return Health.down()
            .withDetail("database", "Unavailable")
            .build();
    }
}
```

**Endpoint**: `GET /actuator/health`

```json
{
  "status": "UP",
  "components": {
    "db": { "status": "UP" },
    "diskSpace": { "status": "UP" }
  }
}
```

### Monitoring Metrics

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  metrics:
    export:
      prometheus:
        enabled: true
```

**Prometheus Endpoint**: `GET /actuator/prometheus`

## FAQ

### Q: How to modify JWT expiration time?

A: Configure in `.env` or `application.yml`:

```env
JWT_EXPIRATION=3600000          # 1 hour (milliseconds)
JWT_REFRESH_EXPIRATION=86400000  # 1 day (milliseconds)
```

### Q: How to enable HTTPS?

A: Generate certificate and configure Spring Boot:

```yaml
# application.yml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: your-password
    key-store-type: PKCS12
```

```bash
# Generate self-signed certificate (development)
keytool -genkeypair -alias halolight -keyalg RSA -keysize 2048 \
  -storetype PKCS12 -keystore keystore.p12 -validity 365
```

### Q: How to configure database connection pool?

A: Use HikariCP (Spring Boot default):

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

### Q: How to implement pagination and sorting?

A: Use Spring Data JPA Pageable:

```java
@GetMapping("/api/users")
public Page<UserDTO> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "id,desc") String sort
) {
    String[] sortParams = sort.split(",");
    Sort.Direction direction = sortParams.length > 1 &&
        sortParams[1].equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParams[0]));
    return userService.findAll(pageable);
}
```

## Development Tools

### Recommended Plugins/Tools

- **IntelliJ IDEA** - Official recommended IDE with Spring Boot support
- **Spring Boot DevTools** - Hot reload, automatic restart
- **Lombok** - Reduce boilerplate code
- **MapStruct** - DTO mapping generation
- **JaCoCo** - Code coverage tool
- **Postman/Insomnia** - API testing tools

## Comparison with Other Backends

| Feature | Spring Boot | NestJS | FastAPI | Go Fiber |
|---------|-------------|--------|---------|----------|
| Language | Java | TypeScript | Python | Go |
| ORM | JPA/Hibernate | Prisma | SQLAlchemy | GORM |
| Performance | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Learning Curve | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Enterprise-Grade | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Ecosystem | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Community Support | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## Related Links

- [API Documentation](https://halolight-api-java.h7ml.cn/api/swagger-ui)
- [GitHub Repository](https://github.com/halolight/halolight-api-java)
- [Spring Boot Official Documentation](https://spring.io/projects/spring-boot)
- [HaloLight Documentation](https://docs.halolight.h7ml.cn)
