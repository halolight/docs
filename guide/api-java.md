# Java Spring Boot 后端 API

HaloLight Spring Boot 后端 API 基于 Spring Boot 3.4.1 构建，提供企业级后端服务和完整的 JWT 双令牌认证。

**API 文档**：[https://halolight-api-java.h7ml.cn/api/swagger-ui](https://halolight-api-java.h7ml.cn/api/swagger-ui)

**GitHub**：[https://github.com/halolight/halolight-api-java](https://github.com/halolight/halolight-api-java)

## 特性

- 🔐 **JWT 双令牌** - Access Token + Refresh Token，自动续期
- 🛡️ **RBAC 权限** - 基于角色的访问控制，通配符匹配
- 📡 **RESTful API** - 标准化接口设计，OpenAPI 文档
- 🗄️ **Spring Data JPA** - 类型安全的数据库操作
- ✅ **数据验证** - Bean Validation 请求参数校验
- 📊 **日志系统** - 请求日志，错误追踪
- 🐳 **Docker 支持** - 多阶段构建，容器化部署

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Java | 23 | 运行时 |
| Spring Boot | 3.4.1 | Web 框架 |
| Spring Data JPA | 3.4.1 | 数据库 ORM |
| PostgreSQL | 16 | 数据存储 |
| Bean Validation | jakarta.validation | 数据验证 |
| JWT | JJWT | 身份认证 |
| Springdoc OpenAPI | 2.7.0 | API 文档 |

## 快速开始

### 环境要求

- Java >= 17
- Maven >= 3.9
- PostgreSQL 16 (可选，默认 H2)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-java.git
cd halolight-api-java

# 安装依赖
./mvnw clean install
```

### 环境变量

```bash
cp .env.example .env
```

```env
# 数据库
DATABASE_URL=jdbc:postgresql://localhost:5432/halolight_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password

# JWT 密钥
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# 服务配置
PORT=8080
SPRING_PROFILES_ACTIVE=production
```

### 数据库初始化

```bash
# 自动创建表结构（首次启动）
./mvnw spring-boot:run

# 运行种子数据（可选）
./mvnw exec:java -Dexec.mainClass="com.halolight.seed.DataSeeder"
```

### 启动服务

```bash
# 开发模式
./mvnw spring-boot:run

# 生产模式
./mvnw clean package -DskipTests
java -jar target/halolight-api-java-1.0.0.jar
```

访问 http://localhost:8080

## 项目结构

```
halolight-api-java/
├── src/main/java/com/halolight/
│   ├── controller/              # 控制器/路由处理
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   └── ...
│   ├── service/                 # 业务逻辑层
│   │   ├── AuthService.java
│   │   └── ...
│   ├── domain/                  # 数据模型
│   │   ├── entity/              # JPA 实体
│   │   └── repository/          # Repository 接口
│   ├── config/                  # 中间件/配置
│   │   ├── SecurityConfig.java
│   │   └── ...
│   ├── web/dto/                 # 请求验证 DTO
│   ├── security/                # 安全组件
│   └── HalolightApplication.java  # 应用入口
├── src/main/resources/          # 资源文件
│   ├── application.yml
│   └── application-*.yml
├── src/test/                    # 测试文件
├── Dockerfile                   # Docker 配置
├── docker-compose.yml
└── pom.xml                      # Maven 配置
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
| GET | `/api/auth/me` | 获取当前用户 | 需认证 |

### 用户管理端点

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/users` | 获取用户列表 | `users:view` |
| GET | `/api/users/{id}` | 获取用户详情 | `users:view` |
| POST | `/api/users` | 创建用户 | `users:create` |
| PUT | `/api/users/{id}` | 更新用户 | `users:update` |
| PUT | `/api/users/{id}/status` | 更新用户状态 | `users:update` |
| DELETE | `/api/users/{id}` | 删除用户 | `users:delete` |

### 完整端点清单

#### 角色管理 (Roles) - 6 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/roles` | 获取角色列表 |
| GET | `/api/roles/{id}` | 获取角色详情 |
| POST | `/api/roles` | 创建角色 |
| PUT | `/api/roles/{id}` | 更新角色 |
| POST | `/api/roles/{id}/permissions` | 分配权限 |
| DELETE | `/api/roles/{id}` | 删除角色 |

#### 权限管理 (Permissions) - 4 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/permissions` | 获取权限列表 |
| POST | `/api/permissions` | 创建权限 |
| PUT | `/api/permissions/{id}` | 更新权限 |
| DELETE | `/api/permissions/{id}` | 删除权限 |

#### 文档管理 (Documents) - 10 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/documents` | 获取文档列表 |
| GET | `/api/documents/{id}` | 获取文档详情 |
| POST | `/api/documents` | 创建文档 |
| PUT | `/api/documents/{id}` | 更新文档 |
| PUT | `/api/documents/{id}/rename` | 重命名文档 |
| POST | `/api/documents/{id}/move` | 移动文档 |
| POST | `/api/documents/{id}/tags` | 更新标签 |
| POST | `/api/documents/{id}/share` | 分享文档 |
| POST | `/api/documents/{id}/unshare` | 取消分享 |
| DELETE | `/api/documents/{id}` | 删除文档 |

#### 文件管理 (Files) - 10 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/files/upload` | 上传文件 |
| GET | `/api/files` | 获取文件列表 |
| GET | `/api/files/storage` | 获取存储配额 |
| GET | `/api/files/{id}` | 获取文件详情 |
| GET | `/api/files/{id}/download` | 下载文件 |
| PUT | `/api/files/{id}/rename` | 重命名文件 |
| POST | `/api/files/{id}/move` | 移动文件 |
| PUT | `/api/files/{id}/favorite` | 切换收藏 |
| POST | `/api/files/{id}/share` | 分享文件 |
| DELETE | `/api/files/{id}` | 删除文件 |

#### 团队管理 (Teams) - 6 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/teams` | 获取团队列表 |
| GET | `/api/teams/{id}` | 获取团队详情 |
| POST | `/api/teams` | 创建团队 |
| PUT | `/api/teams/{id}` | 更新团队 |
| POST | `/api/teams/{id}/members` | 添加成员 |
| DELETE | `/api/teams/{id}/members/{userId}` | 移除成员 |

#### 消息管理 (Messages) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/messages/conversations` | 获取会话列表 |
| GET | `/api/messages/conversations/{userId}` | 获取会话消息 |
| POST | `/api/messages` | 发送消息 |
| PUT | `/api/messages/{id}/read` | 标记已读 |
| DELETE | `/api/messages/{id}` | 删除消息 |

#### 通知管理 (Notifications) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/notifications` | 获取通知列表 |
| GET | `/api/notifications/unread-count` | 获取未读数量 |
| PUT | `/api/notifications/{id}/read` | 标记单条已读 |
| PUT | `/api/notifications/read-all` | 全部已读 |
| DELETE | `/api/notifications/{id}` | 删除通知 |

#### 日历管理 (Calendar) - 8 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/calendar/events` | 获取日程列表 |
| GET | `/api/calendar/events/{id}` | 获取日程详情 |
| POST | `/api/calendar/events` | 创建日程 |
| PUT | `/api/calendar/events/{id}` | 更新日程 |
| PUT | `/api/calendar/events/{id}/reschedule` | 重新安排 |
| POST | `/api/calendar/events/{id}/attendees` | 添加参会人 |
| DELETE | `/api/calendar/events/{id}/attendees/{attendeeId}` | 移除参会人 |
| DELETE | `/api/calendar/events/{id}` | 删除日程 |

#### 仪表盘 (Dashboard) - 5 个端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/dashboard/stats` | 统计数据 |
| GET | `/api/dashboard/visits` | 访问趋势 |
| GET | `/api/dashboard/sales` | 销售数据 |
| GET | `/api/dashboard/pie` | 饼图数据 |
| GET | `/api/dashboard/tasks` | 待办任务 |

## 认证机制

### JWT 双令牌

```
Access Token:  24 小时有效期，用于 API 请求
Refresh Token: 7 天有效期，用于刷新 Access Token
```

### 请求头

```http
Authorization: Bearer <access_token>
```

### 刷新流程

```java
// 前端自动刷新示例
@Component
public class JwtTokenInterceptor {
    public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        Response response = chain.proceed(request);

        // 401 自动刷新
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

## 权限系统

### 角色定义

| 角色 | 说明 | 权限 |
|------|------|------|
| `super_admin` | 超级管理员 | `*` (所有权限) |
| `admin` | 管理员 | `users:*`, `documents:*`, `roles:*` |
| `user` | 普通用户 | `documents:view`, `files:view` |
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

### 权限检查

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

## 错误处理

### 错误响应格式

```json
{
  "timestamp": "2025-12-04T12:00:00.000Z",
  "status": 400,
  "error": "Bad Request",
  "message": "请求参数验证失败",
  "path": "/api/users",
  "details": [
    { "field": "email", "message": "邮箱格式不正确" }
  ]
}
```

### 错误码

| 状态码 | 错误码 | 说明 |
|--------|--------|------|
| 400 | `Bad Request` | 参数验证失败 |
| 401 | `Unauthorized` | 未授权 |
| 403 | `Forbidden` | 无权限 |
| 404 | `Not Found` | 资源不存在 |
| 409 | `Conflict` | 资源冲突 |
| 422 | `Unprocessable Entity` | 业务逻辑错误 |
| 429 | `Too Many Requests` | 请求频率超限 |
| 500 | `Internal Server Error` | 服务器错误 |

## 数据库模型

Spring Data JPA 实体包含 **17 个模型**：

```java
// 用户实体
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

// 角色实体
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

**完整实体列表**：
- User，Role，Permission (RBAC 核心)
- Team，TeamMember (团队管理)
- Document，File，Folder (文档/文件)
- CalendarEvent，EventAttendee (日历)
- Notification，Message，Conversation (通知/消息)
- Dashboard，Visit，Sale (仪表盘统计)

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `SPRING_PROFILES_ACTIVE` | 运行环境 | `development` |
| `PORT` | 服务端口 | `8080` |
| `DATABASE_URL` | 数据库连接 | `jdbc:postgresql://localhost:5432/halolight_db` |
| `DATABASE_USERNAME` | 数据库用户名 | `postgres` |
| `DATABASE_PASSWORD` | 数据库密码 | - |
| `JWT_SECRET` | JWT 密钥（至少 32 字符） | - |
| `JWT_EXPIRATION` | AccessToken 过期时间（毫秒） | `86400000` (24h) |
| `JWT_REFRESH_EXPIRATION` | RefreshToken 过期时间（毫秒） | `604800000` (7d) |
| `CORS_ALLOWED_ORIGINS` | CORS 允许源 | `http://localhost:3000` |

### 使用方式

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

## 常用命令

```bash
# 开发
./mvnw spring-boot:run                # 启动开发服务器
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev  # 指定环境

# 构建
./mvnw clean package                  # 构建 JAR 包
./mvnw clean package -DskipTests      # 跳过测试构建
./mvnw clean install                  # 安装到本地仓库

# 测试
./mvnw test                           # 运行所有测试
./mvnw test -Dtest=UserServiceTest    # 运行指定测试
./mvnw verify                         # 运行集成测试
./mvnw test jacoco:report             # 生成覆盖率报告

# 数据库
./mvnw flyway:migrate                 # 运行迁移（如使用 Flyway）
./mvnw liquibase:update               # 更新 Schema（如使用 Liquibase）

# 代码质量
./mvnw checkstyle:check               # 代码风格检查
./mvnw spotbugs:check                 # 静态分析
```

## 部署

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

### 生产环境配置

```env
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=jdbc:postgresql://prod-db.example.com:5432/halolight
DATABASE_USERNAME=halolight_user
DATABASE_PASSWORD=your-production-password
JWT_SECRET=your-production-secret-min-32-chars
CORS_ALLOWED_ORIGINS=https://halolight.h7ml.cn
```

## 测试

### 运行测试

```bash
./mvnw test                           # 运行单元测试
./mvnw test jacoco:report             # 生成覆盖率报告
./mvnw verify                         # 运行集成测试
```

### 测试示例

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

## 性能指标

### 基准测试

| 指标 | 数值 | 说明 |
|------|------|------|
| 请求吞吐量 | ~3000 QPS | 简单查询，4 核 8GB |
| 平均响应时间 | 15-30ms | P50，数据库查询 |
| P95 响应时间 | 50-100ms | 包含复杂查询 |
| 内存占用 | 256-512 MB | 稳定运行状态 |
| CPU 使用率 | 10-30% | 中等负载 |

### 性能测试

```bash
# 使用 Apache Bench
ab -n 10000 -c 100 -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/api/users

# 使用 wrk
wrk -t4 -c100 -d30s -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/api/users
```

## 可观测性

### 日志系统

```java
// Logback 配置
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

### 健康检查

```java
@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // 检查数据库连接
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

**端点**：`GET /actuator/health`

```json
{
  "status": "UP",
  "components": {
    "db": { "status": "UP" },
    "diskSpace": { "status": "UP" }
  }
}
```

### 监控指标

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

**Prometheus 端点**：`GET /actuator/prometheus`

## 常见问题

### Q：如何修改 JWT 过期时间？

A：在 `.env` 或 `application.yml` 中配置：

```env
JWT_EXPIRATION=3600000          # 1 小时（毫秒）
JWT_REFRESH_EXPIRATION=86400000  # 1 天（毫秒）
```

### Q：如何启用 HTTPS？

A：生成证书并配置 Spring Boot：

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
# 生成自签名证书（开发环境）
keytool -genkeypair -alias halolight -keyalg RSA -keysize 2048 \
  -storetype PKCS12 -keystore keystore.p12 -validity 365
```

### Q：如何处理数据库连接池配置？

A：使用 HikariCP (Spring Boot 默认)：

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

### Q：如何实现分页和排序？

A：使用 Spring Data JPA Pageable：

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

## 开发工具

### 推荐插件/工具

- **IntelliJ IDEA** - 官方推荐 IDE，集成 Spring Boot 支持
- **Spring Boot DevTools** - 热重载，自动重启
- **Lombok** - 减少样板代码
- **MapStruct** - DTO 映射生成
- **JaCoCo** - 代码覆盖率工具
- **Postman/Insomnia** - API 测试工具

## 与其他后端对比

| 特性 | Spring Boot | NestJS | FastAPI | Go Fiber |
|------|-------------|--------|---------|----------|
| 语言 | Java | TypeScript | Python | Go |
| ORM | JPA/Hibernate | Prisma | SQLAlchemy | GORM |
| 性能 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 学习曲线 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 企业级 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| 生态系统 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 社区支持 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 相关链接

- [API 文档](https://halolight-api-java.h7ml.cn/api/swagger-ui)
- [GitHub 仓库](https://github.com/halolight/halolight-api-java)
- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
