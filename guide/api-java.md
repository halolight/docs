# Java Spring Boot 后端 API

HaloLight Java 后端 API，基于 Spring Boot 3.4.1 框架构建的企业级后端服务，提供完整的 RBAC 权限系统和 Swagger 文档。

## 特性

- **Spring Boot 3.4.1** - 企业级 Java 框架，依赖注入、注解驱动
- **Spring Data JPA** - 类型安全的数据库访问，支持 PostgreSQL 16
- **JWT 双令牌** - AccessToken + RefreshToken 认证机制
- **RBAC 权限** - 基于角色的访问控制，支持通配符权限
- **Swagger 文档** - Springdoc OpenAPI 自动生成交互式 API 文档
- **请求验证** - Bean Validation 实现 DTO 自动验证
- **Docker 部署** - 多阶段构建优化，Docker Compose 一键部署
- **完整测试** - JUnit 5 单元测试 + 集成测试

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Spring Boot 3.4.1 |
| 语言 | Java 23 |
| 数据库 | PostgreSQL 16 + Spring Data JPA |
| 认证 | Spring Security + JJWT |
| 验证 | Bean Validation (jakarta.validation) |
| 文档 | Springdoc OpenAPI (Swagger UI) |
| 测试 | JUnit 5 + Mockito + Spring Boot Test |
| 容器化 | Docker + Docker Compose |
| 构建工具 | Maven 3.9+ |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-java.git
cd halolight-api-java

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件配置数据库和 JWT 密钥

# 运行开发服务器
./mvnw spring-boot:run

# 构建生产版本
./mvnw clean package -DskipTests
java -jar target/halolight-api-java-1.0.0.jar
```

## 项目结构

```
halolight-api-java/
├── src/main/java/com/halolight/
│   ├── controller/                 # REST 控制器层
│   │   ├── AuthController.java     # 认证端点（登录、注册、刷新令牌）
│   │   ├── UserController.java     # 用户管理
│   │   ├── RoleController.java     # 角色管理
│   │   ├── PermissionController.java # 权限管理
│   │   ├── TeamController.java     # 团队管理
│   │   ├── DocumentController.java # 文档管理
│   │   ├── FileController.java     # 文件管理
│   │   ├── FolderController.java   # 文件夹管理
│   │   ├── CalendarController.java # 日历事件
│   │   ├── NotificationController.java # 通知管理
│   │   ├── MessageController.java  # 消息管理
│   │   └── DashboardController.java # 仪表盘统计
│   ├── service/                    # 业务逻辑层
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   └── ...
│   ├── domain/                     # 领域层
│   │   ├── entity/                 # JPA 实体（17 个）
│   │   │   ├── User.java
│   │   │   ├── Role.java
│   │   │   ├── Permission.java
│   │   │   └── ...
│   │   └── repository/             # JPA Repository 接口
│   ├── web/dto/                    # 数据传输对象（按模块组织）
│   │   ├── auth/                   # 认证相关 DTO
│   │   ├── calendar/               # 日历相关 DTO
│   │   └── ...
│   ├── config/                     # 配置类
│   │   ├── SecurityConfig.java     # Spring Security 配置
│   │   ├── CorsConfig.java         # CORS 配置
│   │   ├── OpenApiConfig.java      # Swagger 配置
│   │   └── CacheConfig.java        # 缓存配置
│   ├── security/                   # 安全组件
│   │   ├── JwtTokenProvider.java   # JWT 生成/验证
│   │   ├── JwtAuthenticationFilter.java # JWT 认证过滤器
│   │   └── RateLimitFilter.java    # 限流过滤器
│   ├── exception/                  # 异常处理
│   │   └── GlobalExceptionHandler.java
│   └── HalolightApplication.java   # 应用入口
├── src/main/resources/
│   ├── application.yml             # 主配置文件
│   ├── application-dev.yml         # 开发环境配置
│   └── application-prod.yml        # 生产环境配置
├── Dockerfile                      # Docker 多阶段构建
├── docker-compose.yml              # Docker Compose 配置
└── pom.xml                         # Maven 配置
```

## API 模块

项目包含 **12 个核心业务模块**，提供 **60+ RESTful API 端点**：

| 模块 | 端点数 | 描述 |
|------|--------|------|
| **Auth** | 7 | 用户认证（登录、注册、刷新 Token、获取当前用户、登出、找回/重置密码） |
| **Users** | 6 | 用户管理（CRUD、分页、搜索、状态更新、改密） |
| **Roles** | 6 | 角色管理（CRUD + 权限分配） |
| **Permissions** | 4 | 权限管理（支持通配符权限：`users:*`, `*`） |
| **Teams** | 6 | 团队管理（CRUD、成员管理） |
| **Documents** | 10 | 文档管理（CRUD、分享、移动、标签） |
| **Files** | 10 | 文件管理（上传、下载、收藏、批量操作） |
| **Folders** | 5 | 文件夹管理（CRUD、树形结构） |
| **Calendar** | 8 | 日历事件管理（CRUD、参会人、提醒） |
| **Notifications** | 5 | 通知管理（列表、未读统计、标记已读） |
| **Messages** | 5 | 消息会话（对话列表、消息发送、已读标记） |
| **Dashboard** | 5 | 仪表盘统计（总览、趋势、排行） |

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
| PUT | `/api/users/{id}` | 更新用户 | JWT Required |
| PUT | `/api/users/{id}/status` | 更新用户状态 | JWT Required |
| DELETE | `/api/users/{id}` | 删除用户 | JWT Required |

### 完整端点清单

> 下表列出了所有业务模块的完整 API 端点。

#### 文档管理（Documents）- 10 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/documents` | 文档列表（分页、搜索） | JWT Required |
| GET | `/api/documents/{id}` | 获取文档详情 | JWT Required |
| POST | `/api/documents` | 创建文档 | JWT Required |
| PUT | `/api/documents/{id}` | 更新文档内容 | JWT Required |
| PUT | `/api/documents/{id}/rename` | 重命名文档 | JWT Required |
| POST | `/api/documents/{id}/move` | 移动到目标文件夹 | JWT Required |
| POST | `/api/documents/{id}/tags` | 更新标签 | JWT Required |
| POST | `/api/documents/{id}/share` | 分享文档 | JWT Required |
| POST | `/api/documents/{id}/unshare` | 取消分享 | JWT Required |
| DELETE | `/api/documents/{id}` | 删除文档 | JWT Required |

#### 文件管理（Files）- 10 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/files/upload` | 上传文件 | JWT Required |
| GET | `/api/files` | 文件列表 | JWT Required |
| GET | `/api/files/storage` | 获取存储配额 | JWT Required |
| GET | `/api/files/{id}` | 获取文件详情 | JWT Required |
| GET | `/api/files/{id}/download` | 下载文件 | JWT Required |
| PUT | `/api/files/{id}/rename` | 重命名文件 | JWT Required |
| POST | `/api/files/{id}/move` | 移动文件 | JWT Required |
| PUT | `/api/files/{id}/favorite` | 切换收藏状态 | JWT Required |
| POST | `/api/files/{id}/share` | 分享文件 | JWT Required |
| DELETE | `/api/files/{id}` | 删除文件 | JWT Required |

#### 日历事件（Calendar）- 8 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/calendar/events` | 事件列表（日期范围查询） | JWT Required |
| GET | `/api/calendar/events/{id}` | 获取事件详情 | JWT Required |
| POST | `/api/calendar/events` | 创建日历事件 | JWT Required |
| PUT | `/api/calendar/events/{id}` | 更新事件信息 | JWT Required |
| PUT | `/api/calendar/events/{id}/reschedule` | 重新安排时间 | JWT Required |
| POST | `/api/calendar/events/{id}/attendees` | 添加参会人 | JWT Required |
| DELETE | `/api/calendar/events/{id}/attendees/{attendeeId}` | 移除参会人 | JWT Required |
| DELETE | `/api/calendar/events/{id}` | 删除事件 | JWT Required |

#### 通知管理（Notifications）- 5 个端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/notifications` | 通知列表 | JWT Required |
| GET | `/api/notifications/unread-count` | 获取未读数量 | JWT Required |
| PUT | `/api/notifications/{id}/read` | 标记单条已读 | JWT Required |
| PUT | `/api/notifications/read-all` | 全部标记已读 | JWT Required |
| DELETE | `/api/notifications/{id}` | 删除通知 | JWT Required |

## 完整 API 参考

### 1. 认证模块 (Auth)

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

**字段说明**：
- `email` (string，必填)：用户邮箱，需符合邮箱格式
- `password` (string，必填)：用户密码，最少 6 个字符

**成功响应** (200)：
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

**错误响应**：
- `400 Bad Request`：请求参数验证失败
- `401 Unauthorized`：邮箱或密码错误

**curl 示例**：
```bash
curl -X POST http://localhost:8080/api/auth/login \
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

**curl 示例**：
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "securePass123"
  }'
```

#### 1.3 刷新令牌

**端点**：`POST /api/auth/refresh`
**权限**：Public (无需认证)
**描述**：使用 RefreshToken 获取新的 AccessToken

**请求体**：
```json
{
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
}
```

**成功响应** (200)：
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
  }'
```

#### 1.4 获取当前用户

**端点**：`GET /api/auth/me`
**权限**：JWT Required (需要认证)
**描述**：获取当前登录用户的详细信息

**请求头**：
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

**成功响应** (200)：
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

**curl 示例**：
```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9..."
```

### 2. 用户管理模块 (Users)

#### 2.1 获取用户列表

**端点**：`GET /api/users`
**权限**：JWT Required
**描述**：获取用户列表，支持分页和搜索

**查询参数**：
- `page` (number，可选)：页码，默认 0
- `size` (number，可选)：每页数量，默认 10
- `search` (string，可选)：搜索关键词
- `status` (string，可选)：用户状态过滤

**成功响应** (200)：
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

**curl 示例**：
```bash
curl -X GET "http://localhost:8080/api/users?page=0&size=10&search=admin" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 2.2 获取用户详情

**端点**：`GET /api/users/{id}`
**权限**：JWT Required
**描述**：根据用户 ID 获取详细信息

**成功响应** (200)：
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
      "name": "ADMIN"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. 角色管理模块 (Roles)

#### 3.1 获取角色列表

**端点**：`GET /api/roles`
**权限**：JWT Required
**描述**：获取所有角色列表

**成功响应** (200)：
```json
{
  "content": [
    {
      "id": 1,
      "name": "ADMIN",
      "description": "系统管理员",
      "permissions": [
        {
          "id": 1,
          "name": "*",
          "description": "全部权限"
        }
      ],
      "userCount": 5
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:8080/api/roles \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 3.2 创建角色

**端点**：`POST /api/roles`
**权限**：JWT Required
**描述**：创建新角色

**请求体**：
```json
{
  "name": "EDITOR",
  "description": "内容编辑员"
}
```

**成功响应** (201)：
```json
{
  "id": 2,
  "name": "EDITOR",
  "description": "内容编辑员",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl 示例**：
```bash
curl -X POST http://localhost:8080/api/roles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "EDITOR",
    "description": "内容编辑员"
  }'
```

### 4. 权限管理模块 (Permissions)

#### 4.1 获取权限列表

**端点**：`GET /api/permissions`
**权限**：JWT Required
**描述**：获取所有权限列表

**成功响应** (200)：
```json
{
  "content": [
    {
      "id": 1,
      "name": "*",
      "description": "全部权限"
    },
    {
      "id": 2,
      "name": "users:*",
      "description": "用户管理全部操作"
    },
    {
      "id": 3,
      "name": "users:read",
      "description": "读取用户信息"
    }
  ]
}
```

**curl 示例**：
```bash
curl -X GET http://localhost:8080/api/permissions \
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
3. 当 `accessToken` 过期 (默认 24 小时)，使用 `refreshToken` 调用刷新接口
4. 获取新的 `accessToken` 和 `refreshToken`

### 认证示例 (完整流程)

```bash
# 1. 登录获取令牌
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "123456"
  }')

# 2. 提取 AccessToken
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')

# 3. 使用 Token 访问受保护接口
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. Token 过期后，使用 RefreshToken 刷新
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

## 错误处理

### 标准错误响应格式

所有错误响应遵循统一格式：

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

### 常见错误码

| 状态码 | 含义 | 常见场景 |
|--------|------|----------|
| 400 | Bad Request | 请求参数验证失败 |
| 401 | Unauthorized | Token 无效或已过期 |
| 403 | Forbidden | 无权限访问资源 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突（如邮箱已存在） |
| 422 | Unprocessable Entity | 业务逻辑验证失败 |
| 429 | Too Many Requests | 请求频率超限 |
| 500 | Internal Server Error | 服务器内部错误 |

## 数据库模型

Spring Data JPA 实体包含 **17 个模型**，支持完整的 RBAC 权限系统：

```java
// 核心用户实体
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

    // ... 更多关系
}

// RBAC 角色实体
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

// 权限实体
@Entity
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;  // 格式: "users:create", "users:*", "*"

    private String description;
}
```

## 环境变量

```bash
# 应用配置
SPRING_PROFILES_ACTIVE=production
PORT=8080

# 数据库（PostgreSQL）
DATABASE_URL=jdbc:postgresql://localhost:5432/halolight_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password

# JWT 认证
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRATION=86400000        # AccessToken 过期时间（毫秒，默认 24 小时）
JWT_REFRESH_EXPIRATION=604800000  # RefreshToken 过期时间（毫秒，默认 7 天）

# CORS 配置
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://halolight.h7ml.cn
```

## Docker 部署

### 使用 Docker Compose (推荐)

```bash
# 克隆项目
git clone https://github.com/halolight/halolight-api-java.git
cd halolight-api-java

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 启动所有服务（API + PostgreSQL）
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down
```

### 仅构建 API 容器

```bash
# 构建镜像
docker build -t halolight-api-java .

# 运行容器
docker run -d \
  --name halolight-api \
  -p 8080:8080 \
  --env-file .env \
  halolight-api-java
```

## 常用命令

```bash
# 开发
./mvnw spring-boot:run              # 启动开发服务器

# 构建
./mvnw clean package                # 构建 JAR 包
./mvnw clean package -DskipTests    # 跳过测试构建

# 测试
./mvnw test                         # 运行单元测试
./mvnw test -Dtest=UserServiceTest  # 运行指定测试类
./mvnw verify                       # 运行所有测试
./mvnw test jacoco:report           # 生成覆盖率报告
```

## 架构特点

### 1. 分层架构

遵循 Spring Boot 分层架构：

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

### 2. DTO 验证

使用 Bean Validation 进行自动验证：

```java
public class CreateUserRequest {
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @NotBlank(message = "密码不能为空")
    @Size(min = 6, message = "密码至少 6 个字符")
    private String password;

    @NotBlank(message = "姓名不能为空")
    private String name;
}
```

### 3. 全局异常处理

统一的错误响应格式：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        // 处理验证错误
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex) {
        // 处理资源不存在
    }
}
```

### 4. Swagger 文档

自动生成交互式 API 文档，访问 `/api/swagger-ui`：

- 完整的 API 端点列表
- 请求/响应 Schema
- 在线测试功能
- JWT 认证支持

## 可观测性

项目集成 Spring Actuator + Micrometer：

| 端点 | 说明 |
|------|------|
| `/actuator/health` | 健康检查 |
| `/actuator/metrics` | 应用指标 |
| `/actuator/prometheus` | Prometheus 格式指标 |
| `/actuator/info` | 应用信息 |

## 相关链接

- [在线预览](http://halolight-api-java.h7ml.cn)
- [API 文档](http://halolight-api-java.h7ml.cn/api/swagger-ui)
- [GitHub 仓库](https://github.com/halolight/halolight-api-java)
- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [Spring Data JPA 文档](https://spring.io/projects/spring-data-jpa)
- [问题反馈](https://github.com/halolight/halolight-api-java/issues)

## 下一步

- 查看 [API 设计规范](/development/api-patterns)了解前端调用方式
- 查看[认证系统](/development/authentication)了解权限控制实现
- 查看[整体架构](/development/architecture)了解 HaloLight 生态系统
