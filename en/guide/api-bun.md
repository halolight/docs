# Bun Backend API

HaloLight Bun Backend API, a high-performance backend service built with Bun + Hono + Drizzle ORM, sharing the same database (PostgreSQL/Neon) and API specification with NestJS/Java versions.

## Features

- ⚡ **Bun 1.1+** - JavaScript runtime 4x faster than Node.js
- 🔥 **Hono 4.x** - Ultra-lightweight, high-performance web framework (~14KB)
- 🗄️ **Drizzle ORM** - TypeScript-first SQL ORM with zero runtime overhead
- 🔐 **JWT Dual Token** - AccessToken + RefreshToken authentication
- 🛡️ **RBAC Authorization** - Role-based access control system
- 📚 **Swagger Docs** - Dynamically generated OpenAPI specification
- ✅ **Zod Validation** - Type-safe request data validation
- 🧪 **Complete Testing** - Bun Test unit tests + E2E tests

## Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Bun 1.1+ |
| Framework | Hono 4.x |
| Language | TypeScript 5.x |
| Database | PostgreSQL 15+ / Neon |
| ORM | Drizzle ORM 0.36+ |
| Authentication | JWT (jose) |
| Validation | Zod 3.x + @hono/zod-validator |
| Documentation | Swagger/OpenAPI |
| Testing | Bun Test |
| Package Manager | pnpm |

## Performance Comparison

| Metric | Bun | Node.js | Improvement |
|--------|-----|---------|-------------|
| Startup Time | ~100ms | ~500ms | **4x** |
| HTTP Throughput | ~50,000 req/s | ~20,000 req/s | **2.5x** |
| Memory Usage | ~30MB | ~50MB+ | **40%** |

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-bun.git
cd halolight-api-bun

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database connection string and JWT secret

# Push database schema
bun run db:push

# Seed test data (optional)
bun run db:seed

# Start development server
bun run dev

# Build for production
bun run build
bun run start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT signing secret (≥32 chars) | - |
| `JWT_REFRESH_SECRET` | RefreshToken secret | - |
| `PORT` | Server port | `3002` |
| `NODE_ENV` | Runtime environment | `development` |
| `CORS_ORIGIN` | CORS allowed origins (comma-separated) | `http://localhost:3000` |
| `API_PREFIX` | API route prefix | `/api` |
| `JWT_EXPIRES_IN` | AccessToken expiration | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | RefreshToken expiration | `7d` |
| `SWAGGER_ENABLED` | Enable Swagger | `true` |
| `SWAGGER_PATH` | Swagger UI path | `/swagger` |

## Project Structure

```
halolight-api-bun/
├── src/
│   ├── db/
│   │   ├── schema.ts           # Drizzle ORM Schema (17 entities)
│   │   ├── index.ts            # Database connection pool
│   │   ├── migrate.ts          # Migration script
│   │   └── seed.ts             # Seed data script
│   ├── middleware/
│   │   ├── auth.ts             # JWT authentication middleware
│   │   ├── cors.ts             # CORS configuration
│   │   ├── error.ts            # Global error handler
│   │   └── logger.ts           # Request logging middleware
│   ├── routes/                 # Route layer (Controllers)
│   │   ├── auth.ts             # Auth endpoints
│   │   ├── users.ts            # User management
│   │   ├── roles.ts            # Role management
│   │   ├── permissions.ts      # Permission management
│   │   ├── teams.ts            # Team management
│   │   ├── documents.ts        # Document management
│   │   ├── notifications.ts    # Notification management
│   │   ├── dashboard.ts        # Dashboard statistics
│   │   └── index.ts            # Route aggregation
│   ├── services/               # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── role.service.ts
│   │   ├── permission.service.ts
│   │   ├── team.service.ts
│   │   ├── document.service.ts
│   │   ├── notification.service.ts
│   │   └── dashboard.service.ts
│   ├── swagger/                # Swagger documentation
│   │   ├── openapi.ts          # Dynamic OpenAPI spec generation
│   │   ├── zod-to-json.ts      # Zod Schema to JSON Schema
│   │   └── index.ts            # Swagger UI routes
│   ├── pages/
│   │   └── home.ts             # Homepage HTML template
│   ├── utils/                  # Utility functions
│   │   ├── env.ts              # Environment variable validation (Zod)
│   │   ├── jwt.ts              # JWT sign/verify
│   │   ├── hash.ts             # Password hashing (Bun.password)
│   │   └── response.ts         # Unified response format
│   └── index.ts                # Application entry point
├── test/
│   ├── unit/                   # Unit tests
│   └── e2e/                    # E2E tests
├── drizzle.config.ts           # Drizzle configuration
└── package.json
```

## API Modules

The project covers **9 core business modules** with **50+ RESTful API endpoints**:

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Auth** | 5 | Authentication (login, register, refresh token, get current user, logout) |
| **Users** | 7 | User management (CRUD, pagination, search, status update, batch delete) |
| **Roles** | 5 | Role management (CRUD + permission assignment) |
| **Permissions** | 4 | Permission management |
| **Teams** | 6 | Team management (CRUD, member management) |
| **Documents** | 5 | Document management (CRUD) |
| **Notifications** | 5 | Notification management (list, unread count, mark as read) |
| **Dashboard** | 9 | Dashboard statistics (overview, trends, chart data) |

### Authentication Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/refresh` | Refresh token | Public |
| GET | `/api/auth/me` | Get current user | JWT Required |
| POST | `/api/auth/logout` | User logout | JWT Required |

### User Management Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/users` | Get user list (pagination, search, status filter) | JWT Required |
| GET | `/api/users/:id` | Get user details | JWT Required |
| POST | `/api/users` | Create user | JWT Required |
| PATCH | `/api/users/:id` | Update user | JWT Required |
| PATCH | `/api/users/:id/status` | Update user status | JWT Required |
| POST | `/api/users/batch-delete` | Batch delete users | JWT Required |
| DELETE | `/api/users/:id` | Delete user | JWT Required |

### Role Management Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/roles` | Get role list | JWT Required |
| GET | `/api/roles/:id` | Get role details | JWT Required |
| POST | `/api/roles` | Create role | JWT Required |
| PATCH | `/api/roles/:id` | Update role | JWT Required |
| DELETE | `/api/roles/:id` | Delete role | JWT Required |

### Team Management Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/teams` | Get team list | JWT Required |
| GET | `/api/teams/:id` | Get team details | JWT Required |
| POST | `/api/teams` | Create team | JWT Required |
| PATCH | `/api/teams/:id` | Update team | JWT Required |
| DELETE | `/api/teams/:id` | Delete team | JWT Required |
| POST | `/api/teams/:id/members` | Add team member | JWT Required |

### Dashboard Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/dashboard/stats` | Get statistics | JWT Required |
| GET | `/api/dashboard/visits` | Get visit trends | JWT Required |
| GET | `/api/dashboard/sales` | Get sales trends | JWT Required |
| GET | `/api/dashboard/products` | Get product statistics | JWT Required |
| GET | `/api/dashboard/orders` | Get order statistics | JWT Required |
| GET | `/api/dashboard/activities` | Get activity logs | JWT Required |
| GET | `/api/dashboard/system` | Get system overview | JWT Required |
| GET | `/api/dashboard/pie` | Get pie chart data | JWT Required |
| GET | `/api/dashboard/tasks` | Get pending tasks | JWT Required |

## Database Models

17 core entities defined with Drizzle ORM:

- **User Auth**: `users`, `refresh_tokens`
- **RBAC Authorization**: `roles`, `permissions`, `role_permissions`, `user_roles`
- **Team Collaboration**: `teams`, `team_members`
- **Document Management**: `documents`, `document_shares`, `document_tags`, `tags`
- **File System**: `files`, `folders`
- **Calendar**: `calendar_events`, `event_attendees`, `event_reminders`
- **Messaging**: `conversations`, `conversation_participants`, `messages`
- **Notifications**: `notifications`
- **Audit Logs**: `activity_logs`

## Authentication Mechanism

### JWT Dual Token Strategy

```
┌─────────────┐     Login      ┌─────────────┐
│   Client    │ ─────────────> │   Server    │
└─────────────┘                └─────────────┘
      │                              │
      │  <── AccessToken (15m) ───   │
      │  <── RefreshToken (7d) ───   │
      │                              │
      │  ─── API Request ──────────> │
      │  ─── Authorization: Bearer   │
      │                              │
```

- **AccessToken**: Short-lived token (15 minutes) for API request authentication
- **RefreshToken**: Long-lived token (7 days) for refreshing AccessToken, supports Token Rotation

### Response Format

Success response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "xxx",
      "email": "admin@example.com",
      "name": "System Admin",
      "status": "ACTIVE",
      "roles": ["admin"],
      "permissions": ["*:*"]
    },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

Error response:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }
}
```

## Common Commands

```bash
# Development
bun run dev                 # Start dev server (hot reload)
bun run build               # Production build
bun run start               # Run production build

# Code Quality
bun run lint                # ESLint check
bun run lint:fix            # ESLint auto-fix
bun run type-check          # TypeScript type check
bun run format              # Prettier format

# Testing
bun test                    # Run unit tests
bun test --watch            # Watch mode
bun test --coverage         # Generate coverage report

# Database
bun run db:generate         # Generate Drizzle migration files
bun run db:migrate          # Run database migrations
bun run db:push             # Push schema to database
bun run db:studio           # Open Drizzle Studio
bun run db:seed             # Seed test data
```

## Bun-Specific Features

Leveraging Bun's built-in APIs for better performance:

```typescript
// Password hashing (faster than bcrypt package)
const hash = await Bun.password.hash(password, { algorithm: 'bcrypt', cost: 10 });
const isValid = await Bun.password.verify(password, hash, 'bcrypt');

// File operations
const file = Bun.file('./path/to/file');
const content = await file.text();

// Fast hashing
const hash = Bun.hash(data);
```

## Frontend Integration

Configure frontend API URL:

```env
# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3002/api

# Vue/Vite
VITE_API_URL=http://localhost:3002/api

# Angular
API_URL=http://localhost:3002/api
```

## Access URLs

- **API**: http://localhost:3002/api
- **Swagger UI**: http://localhost:3002/swagger
- **Homepage**: http://localhost:3002
- **API Info**: http://localhost:3002/info

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-api-bun)
- [Bun Documentation](https://bun.sh/docs)
- [Hono Documentation](https://hono.dev/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
