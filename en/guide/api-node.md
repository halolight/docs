# Node.js Backend API

HaloLight Node.js backend API service, an enterprise-grade RESTful API built with Express 5 + TypeScript + Prisma.

## Features

- ⚡ **Express 5** - Latest Express framework
- 📘 **TypeScript 5** - Full type support
- 🔷 **Prisma 6 ORM** - Type-safe database access
- 🔐 **Dual JWT Authentication** - Access Token + Refresh Token
- 🛡️ **RBAC Permission System** - Role-based access control
- ✅ **Zod Validation** - Request data validation
- 📚 **Swagger Documentation** - Interactive API docs
- 🐳 **Docker Support** - One-click containerized deployment
- 🗄️ **PostgreSQL 16** - Production-grade database
- 🎯 **12 Business Modules** - 90+ RESTful endpoints

## Live Demo

- **API URL**: https://halolight-api-node.h7ml.cn
- **Swagger Docs**: https://halolight-api-node.h7ml.cn/docs
- **Alternative URL**: https://api-node.halolight.h7ml.cn

## Quick Start

### Docker Deployment (Recommended)

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-node.git
cd halolight-api-node

# Configure environment
cp .env.docker .env
nano .env  # Update JWT_SECRET and database password

# Start services
docker compose up -d

# Access services
# API: http://localhost:3001
# Swagger: http://localhost:3001/docs
```

### Local Development

```bash
# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
nano .env  # Configure database and JWT secrets

# Generate Prisma Client
pnpm db:generate

# Initialize database
pnpm db:push

# Start development server
pnpm dev
```

## Project Structure

```
halolight-api-node/
├── src/
│   ├── index.ts              # Application entry
│   ├── config/
│   │   ├── env.ts            # Environment configuration
│   │   └── swagger.ts        # Swagger configuration
│   ├── routes/               # Route definitions (12 modules)
│   │   ├── auth.ts           # Authentication routes
│   │   ├── users.ts          # User management
│   │   ├── roles.ts          # Role management
│   │   ├── permissions.ts    # Permission management
│   │   ├── teams.ts          # Team management
│   │   ├── documents.ts      # Document management
│   │   ├── files.ts          # File management
│   │   ├── folders.ts        # Folder management
│   │   ├── calendar.ts       # Calendar events
│   │   ├── notifications.ts  # Notification management
│   │   ├── messages.ts       # Message management
│   │   └── dashboard.ts      # Dashboard statistics
│   ├── services/             # Business logic layer
│   ├── middleware/           # Middleware
│   │   ├── auth.ts           # JWT auth + RBAC
│   │   ├── validate.ts       # Zod request validation
│   │   └── error.ts          # Global error handling
│   └── utils/                # Utility functions
├── prisma/
│   └── schema.prisma         # Database models (17+ models)
├── Dockerfile                # Docker image
├── docker-compose.yml        # Container orchestration
└── package.json
```

## Core Features

### Authentication System

- ✅ User login/registration
- ✅ Dual JWT token mechanism (Access Token + Refresh Token)
- ✅ Token refresh
- ✅ Forgot password / Reset password
- ✅ User logout

### Permission System

- ✅ RBAC permission control
- ✅ Role management (CRUD)
- ✅ Permission management (CRUD)
- ✅ User role assignment
- ✅ Permission wildcard support (`users:*`, `*`)

### Business Modules

| Module | Endpoints | Description |
|--------|-----------|-------------|
| Auth | 7 | Login, register, refresh token, forgot/reset password |
| Users | 7 | CRUD, pagination, search, status update, batch delete |
| Roles | 6 | CRUD, permission assignment |
| Permissions | 4 | CRUD |
| Teams | 7 | CRUD, member management |
| Documents | 11 | CRUD, sharing, tags, move |
| Files | 14 | Upload, download, storage info, move, copy |
| Folders | 5 | Tree structure management |
| Calendar | 9 | Events, attendee management |
| Notifications | 5 | Notification management |
| Messages | 5 | Conversations, messages |
| Dashboard | 9 | Statistics data |

## API Endpoint Examples

### Authentication

```typescript
// POST /api/auth/login - User login
Request:
{
  "email": "admin@halolight.h7ml.cn",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "cm4gn...",
      "email": "admin@halolight.h7ml.cn",
      "name": "Admin"
    }
  }
}

// POST /api/auth/refresh - Refresh token
Request:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "new_access_token",
    "refreshToken": "new_refresh_token"
  }
}
```

### User Management

```typescript
// GET /api/users?page=1&limit=10&search=john
// Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Environment Variables

```bash
# Server Configuration
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/halolight?schema=public"

# JWT Configuration (must be ≥32 characters)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET="your-refresh-secret-key-minimum-32-characters-long"
REFRESH_TOKEN_EXPIRES_IN=30d

# CORS
CORS_ORIGIN="http://localhost:3000"
```

## Docker Deployment

### Standalone Deployment (with database)

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Shared Database Deployment

To share a database with NestJS and Java APIs:

```bash
# 1. Modify DATABASE_URL in .env
DATABASE_URL="postgresql://user:pass@shared-db:5432/halolight"

# 2. Comment out postgres service in docker-compose.yml

# 3. Ensure all services use the same JWT secrets
JWT_SECRET="same-secret-for-all-services"
```

## Database Models

Main models include:

- **User** - Users (with role associations)
- **Role** - Roles
- **Permission** - Permissions
- **RefreshToken** - Refresh tokens
- **Team / TeamMember** - Team management
- **Document / DocumentShare / Tag** - Document system
- **File / Folder** - File system
- **CalendarEvent / EventAttendee** - Calendar system
- **Conversation / Message** - Messaging system
- **Notification** - Notification system
- **ActivityLog** - Activity logs

## Development Commands

```bash
# Development
pnpm dev              # Start dev server (hot reload)
pnpm build            # TypeScript compilation
pnpm start            # Start production server

# Code Quality
pnpm lint             # ESLint check
pnpm lint:fix         # Auto fix
pnpm format           # Prettier formatting

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push database changes
pnpm db:migrate       # Run migrations
pnpm db:studio        # Prisma Studio (database GUI)
pnpm db:seed          # Seed database
```

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | 20+ | JavaScript runtime |
| TypeScript | 5.x | Type-safe JavaScript |
| Express | 5.x | Web framework |
| Prisma | 6.x | ORM |
| PostgreSQL | 16 | Database |
| Zod | 3.x | Schema validation |
| JWT | 9.x | Authentication |
| Pino | 9.x | Logging system |
| Swagger UI | 5.x | API documentation |

## Performance Optimization

- ✅ Connection pool management
- ✅ Database index optimization
- ✅ Request log sanitization
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Security headers (Helmet)
- ✅ Health check endpoint

## Related Links

- **GitHub**: https://github.com/halolight/halolight-api-node
- **API Documentation**: https://halolight-api-node.h7ml.cn/docs
- **Health Check**: https://halolight-api-node.h7ml.cn/health
- **Project Docs**: https://halolight.docs.h7ml.cn
- **Express Docs**: https://expressjs.com/
- **Prisma Docs**: https://www.prisma.io/docs

## License

MIT License
