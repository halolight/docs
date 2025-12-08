# NestJS Backend API

HaloLight NestJS Backend API, an enterprise-grade backend service built with NestJS 11 framework, providing complete RBAC permission system and Swagger documentation.

## Features

- 🏗️ **NestJS 11** - Enterprise Node.js framework with modular architecture
- 🔷 **Prisma ORM 5** - Type-safe database access with PostgreSQL 16 support
- 🔐 **JWT Dual Tokens** - AccessToken + RefreshToken authentication mechanism
- 🛡️ **RBAC Permissions** - Role-Based Access Control with wildcard permission support
- 📚 **Swagger Docs** - Auto-generated interactive API documentation
- ✅ **Type Validation** - Automatic DTO validation with class-validator
- 🐳 **Docker Deploy** - Multi-stage build optimization, one-click Docker Compose deployment
- 🧪 **Complete Testing** - Jest unit tests + E2E tests

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | NestJS 11 |
| Language | TypeScript 5.7 |
| Database | PostgreSQL 16 + Prisma ORM 5 |
| Authentication | JWT + Passport.js |
| Validation | class-validator + class-transformer |
| Documentation | Swagger/OpenAPI |
| Testing | Jest + Supertest |
| Containerization | Docker + Docker Compose |
| Package Manager | pnpm 10.23.0 |

## Quick Start

```bash
# Clone repository
git clone https://github.com/halolight/halolight-api-nestjs.git
cd halolight-api-nestjs

# Install dependencies
pnpm install

# Generate Prisma Client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Run development server
pnpm dev

# Build for production
pnpm build
pnpm start:prod
```

## Project Structure

```
halolight-api-nestjs/
├── src/
│   ├── common/                  # Shared modules
│   │   ├── decorators/          # Custom decorators (@Public, @CurrentUser, @RequirePermissions)
│   │   ├── filters/             # Global exception filters
│   │   ├── guards/              # Guards (JWT auth, permission checks)
│   │   └── interceptors/        # Interceptors (logging, transformation)
│   ├── configs/                 # Configuration modules
│   │   ├── config.module.ts     # Environment variable configuration
│   │   ├── env.validation.ts    # Environment validation (class-validator)
│   │   └── swagger.config.ts    # Swagger documentation configuration
│   ├── infrastructure/          # Infrastructure layer
│   │   └── prisma/              # Prisma ORM configuration and service
│   ├── modules/                 # Business modules (12 modules)
│   │   ├── auth/                # Authentication (login, register, refresh tokens)
│   │   ├── users/               # User management (CRUD, pagination, search)
│   │   ├── roles/               # Role management (CRUD + permission assignment)
│   │   ├── permissions/         # Permission management (wildcard support)
│   │   ├── teams/               # Team management
│   │   ├── documents/           # Document management (tags, folders)
│   │   ├── files/               # File management
│   │   ├── folders/             # Folder management (tree structure)
│   │   ├── calendar/            # Calendar event management
│   │   ├── notifications/       # Notification management
│   │   ├── messages/            # Message conversation management
│   │   └── dashboard/           # Dashboard statistics
│   ├── app.controller.ts        # Root controller (homepage, health check)
│   ├── app.service.ts           # Root service
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry (Bootstrap)
├── prisma/
│   ├── schema.prisma            # Database model definitions (17 entities)
│   └── migrations/              # Database migration history
├── test/
│   ├── app.e2e-spec.ts          # E2E tests
│   └── jest-e2e.json            # E2E Jest configuration
├── Dockerfile                   # Docker multi-stage build
├── docker-compose.yml           # Docker Compose config (API + PostgreSQL + Redis)
└── package.json
```

## API Modules

The project includes **12 core business modules** providing **90+ RESTful API endpoints**:

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Auth** | 7 | User authentication (login, register, refresh token, current user, logout, forgot/reset password) |
| **Users** | 7 | User management (CRUD, pagination, search, filtering, status update, batch delete) |
| **Roles** | 6 | Role management (CRUD + permission assignment) |
| **Permissions** | 4 | Permission management (wildcard support: `users:*`, `*`) |
| **Teams** | 7 | Team management (CRUD, member management) |
| **Documents** | 11 | Document management (CRUD, sharing, moving, tagging, renaming, batch delete) |
| **Files** | 14 | File management (upload, download, storage info, move/copy, favorite, batch delete, etc.) |
| **Folders** | 5 | Folder management (CRUD, tree structure) |
| **Calendar** | 9 | Calendar event management (CRUD, attendee management, reschedule, batch delete, etc.) |
| **Notifications** | 5 | Notification management (list, unread count, mark read, batch read, delete) |
| **Messages** | 5 | Message conversations (conversation list, send message, mark read, delete) |
| **Dashboard** | 9 | Dashboard statistics (overview, visit/sales trends, product/order/activity stats, pie chart, tasks, etc.) |

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
| GET | `/api/users` | Get user list (pagination, search, status/role filtering) | JWT Required |
| GET | `/api/users/:id` | Get user details | JWT Required |
| POST | `/api/users` | Create user | JWT Required |
| PATCH | `/api/users/:id` | Update user | JWT Required |
| PATCH | `/api/users/:id/status` | Update user status (ACTIVE/INACTIVE/SUSPENDED) | JWT Required |
| POST | `/api/users/batch-delete` | Batch delete users | JWT Required |
| DELETE | `/api/users/:id` | Delete user | JWT Required |

### Complete Endpoint List

> The table below lists all API endpoints for business modules, aligned with actual implementation and Swagger documentation.

#### Document Management (Documents) - 11 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/documents` | Document list (pagination, search, filtering) | JWT Required |
| GET | `/api/documents/:id` | Get document details | JWT Required |
| POST | `/api/documents` | Create document | JWT Required |
| PUT | `/api/documents/:id` | Update document content | JWT Required |
| PATCH | `/api/documents/:id/rename` | Rename document | JWT Required |
| POST | `/api/documents/:id/move` | Move to target folder | JWT Required |
| POST | `/api/documents/:id/tags` | Update tags | JWT Required |
| POST | `/api/documents/:id/share` | Share document with users | JWT Required |
| POST | `/api/documents/:id/unshare` | Unshare document | JWT Required |
| POST | `/api/documents/batch-delete` | Batch delete documents | JWT Required |
| DELETE | `/api/documents/:id` | Delete document | JWT Required |

#### File Management (Files) - 14 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| POST | `/api/files/upload` | Upload file | JWT Required |
| POST | `/api/files/folder` | Create folder | JWT Required |
| GET | `/api/files` | File list (filter by folder/type) | JWT Required |
| GET | `/api/files/storage` | Get storage quota and usage | JWT Required |
| GET | `/api/files/storage-info` | Get storage info (alias) | JWT Required |
| GET | `/api/files/:id` | Get file details | JWT Required |
| GET | `/api/files/:id/download-url` | Generate file download link | JWT Required |
| PATCH | `/api/files/:id/rename` | Rename file | JWT Required |
| POST | `/api/files/:id/move` | Move file to other directory | JWT Required |
| POST | `/api/files/:id/copy` | Copy file | JWT Required |
| PATCH | `/api/files/:id/favorite` | Toggle favorite status | JWT Required |
| POST | `/api/files/:id/share` | Share file | JWT Required |
| POST | `/api/files/batch-delete` | Batch delete files | JWT Required |
| DELETE | `/api/files/:id` | Delete file | JWT Required |

#### Calendar Events (Calendar) - 9 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/calendar/events` | Event list (supports date range query) | JWT Required |
| GET | `/api/calendar/events/:id` | Get event details | JWT Required |
| POST | `/api/calendar/events` | Create calendar event | JWT Required |
| PUT | `/api/calendar/events/:id` | Update event information | JWT Required |
| PATCH | `/api/calendar/events/:id/reschedule` | Reschedule event time | JWT Required |
| POST | `/api/calendar/events/:id/attendees` | Add attendees | JWT Required |
| DELETE | `/api/calendar/events/:id/attendees/:attendeeId` | Remove attendee | JWT Required |
| POST | `/api/calendar/events/batch-delete` | Batch delete events | JWT Required |
| DELETE | `/api/calendar/events/:id` | Delete event | JWT Required |

#### Notification Management (Notifications) - 5 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/notifications` | Notification list | JWT Required |
| GET | `/api/notifications/unread-count` | Get unread notification count | JWT Required |
| PUT | `/api/notifications/:id/read` | Mark single notification as read | JWT Required |
| PUT | `/api/notifications/read-all` | Mark all as read | JWT Required |
| DELETE | `/api/notifications/:id` | Delete notification | JWT Required |

#### Team Management (Teams) - 7 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/teams` | Team list (pagination, search) | JWT Required |
| GET | `/api/teams/:id` | Get team details and members | JWT Required |
| POST | `/api/teams` | Create team | JWT Required |
| PATCH | `/api/teams/:id` | Update team information | JWT Required |
| POST | `/api/teams/:id/members` | Add member to team | JWT Required |
| DELETE | `/api/teams/:id/members/:userId` | Remove member from team | JWT Required |
| DELETE | `/api/teams/:id` | Delete team | JWT Required |

#### Dashboard Statistics (Dashboard) - 9 Endpoints

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| GET | `/api/dashboard/stats` | Get statistics (users, revenue, orders, etc.) | JWT Required |
| GET | `/api/dashboard/visits` | Get visit trends (7-day data) | JWT Required |
| GET | `/api/dashboard/sales` | Get sales trends (6-month data) | JWT Required |
| GET | `/api/dashboard/products` | Get popular product rankings | JWT Required |
| GET | `/api/dashboard/orders` | Get recent order list | JWT Required |
| GET | `/api/dashboard/activities` | Get recent activity logs | JWT Required |
| GET | `/api/dashboard/pie` | Get pie chart data (category statistics) | JWT Required |
| GET | `/api/dashboard/tasks` | Get task list and statistics | JWT Required |
| GET | `/api/dashboard/overview` | Get system overview (CPU, memory, disk, etc.) | JWT Required |

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
  "password": "password123"
}
```

**Field Descriptions**:
- `email` (string, required): User email address, must be valid email format
- `password` (string, required): User password, minimum 8 characters

**Success Response** (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx1234567890",
    "email": "admin@halolight.h7ml.cn",
    "name": "Admin User",
    "avatar": "https://avatar.example.com/admin.jpg",
    "phone": "+86 138****8888",
    "status": "ACTIVE"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Request validation failed
- `401 Unauthorized`: Invalid email or password

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "password123"
  }'
```

#### 1.2 User Registration

**Endpoint**: `POST /api/auth/register`
**Permission**: Public (no authentication required)
**Description**: Register new user account

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "securePass123",
  "phone": "+86 138****8888"
}
```

**Field Descriptions**:
- `email` (string, required): User email, must be valid and unique
- `name` (string, required): User name
- `password` (string, required): Password, minimum 8 characters
- `phone` (string, optional): Phone number

**Success Response** (201):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx9876543210",
    "email": "newuser@example.com",
    "name": "New User",
    "avatar": null,
    "phone": "+86 138****8888",
    "status": "ACTIVE"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Request validation failed
- `409 Conflict`: Email already registered

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "securePass123",
    "phone": "+86 138****8888"
  }'
```

#### 1.3 Refresh Token

**Endpoint**: `POST /api/auth/refresh`
**Permission**: Public (no authentication required)
**Description**: Get new AccessToken using RefreshToken

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
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- `401 Unauthorized`: RefreshToken is invalid or expired

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

#### 1.4 Get Current User

**Endpoint**: `GET /api/auth/me`
**Permission**: JWT Required (authentication required)
**Description**: Get current logged-in user details

**Request Headers**:
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
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "roles": [
    {
      "id": "role_admin",
      "name": "Administrator",
      "permissions": ["*"]
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-12-04T12:00:00.000Z"
}
```

**Error Responses**:
- `401 Unauthorized`: Token is invalid or expired

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 1.5 User Logout

**Endpoint**: `POST /api/auth/logout`
**Permission**: JWT Required (authentication required)
**Description**: Logout current user and invalidate token

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200):
```json
{
  "message": "Successfully logged out"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 2. User Management Module (Users)

#### 2.1 Get User List

**Endpoint**: `GET /api/users`
**Permission**: JWT Required
**Description**: Get user list with pagination, search and filtering

**Query Parameters**:
- `page` (number, optional): Page number, default 1
- `limit` (number, optional): Items per page, default 10, max 100
- `search` (string, optional): Search keyword (searches name, username, or email)
- `status` (string, optional): User status filter (all | ACTIVE | INACTIVE | SUSPENDED), pass `all` or omit for all
- `role` (string, optional): Filter by role name (all | admin | user | ...), pass `all` or omit for all

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "clx1234567890",
      "email": "admin@halolight.h7ml.cn",
      "username": "admin",
      "name": "Admin User",
      "avatar": "https://avatar.example.com/admin.jpg",
      "status": "ACTIVE",
      "department": "Development",
      "position": "Senior Engineer",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-12-04T12:00:00.000Z"
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

**curl Examples**:
```bash
# Basic query
curl -X GET "http://localhost:3000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search users with status and role filtering
curl -X GET "http://localhost:3000/api/users?search=admin&status=ACTIVE&role=admin" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Use all to skip filtering
curl -X GET "http://localhost:3000/api/users?status=all&role=all" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 2.2 Get User Details

**Endpoint**: `GET /api/users/:id`
**Permission**: JWT Required
**Description**: Get user details by ID

**Path Parameters**:
- `id` (string, required): User ID

**Success Response** (200):
```json
{
  "id": "clx1234567890",
  "email": "admin@halolight.h7ml.cn",
  "name": "Admin User",
  "avatar": "https://avatar.example.com/admin.jpg",
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "roles": [
    {
      "id": "role_admin",
      "name": "Administrator"
    }
  ],
  "teams": [
    {
      "id": "team_001",
      "name": "Development Team",
      "role": "OWNER"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-12-04T12:00:00.000Z"
}
```

**Error Responses**:
- `404 Not Found`: User does not exist

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/users/clx1234567890 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 2.3 Create User

**Endpoint**: `POST /api/users`
**Permission**: JWT Required
**Description**: Create new user (admin functionality)

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "securePass123",
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "avatar": "https://avatar.example.com/newuser.jpg"
}
```

**Field Descriptions**:
- `email` (string, required): User email
- `name` (string, required): User name
- `password` (string, required): Password, minimum 8 characters
- `phone` (string, optional): Phone number
- `status` (string, optional): User status, default ACTIVE
- `avatar` (string, optional): Avatar URL

**Success Response** (201):
```json
{
  "id": "clx9876543210",
  "email": "newuser@example.com",
  "name": "New User",
  "avatar": "https://avatar.example.com/newuser.jpg",
  "phone": "+86 138****8888",
  "status": "ACTIVE",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "securePass123"
  }'
```

#### 2.4 Update User

**Endpoint**: `PATCH /api/users/:id`
**Permission**: JWT Required
**Description**: Update user information

**Path Parameters**:
- `id` (string, required): User ID

**Request Body**:
```json
{
  "name": "Updated Name",
  "phone": "+86 139****9999",
  "avatar": "https://avatar.example.com/updated.jpg",
  "status": "ACTIVE"
}
```

**Field Descriptions**: All fields are optional, only send fields that need to be updated

**Success Response** (200):
```json
{
  "id": "clx1234567890",
  "email": "admin@halolight.h7ml.cn",
  "name": "Updated Name",
  "avatar": "https://avatar.example.com/updated.jpg",
  "phone": "+86 139****9999",
  "status": "ACTIVE",
  "updatedAt": "2024-12-04T12:30:00.000Z"
}
```

**curl Example**:
```bash
curl -X PATCH http://localhost:3000/api/users/clx1234567890 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "phone": "+86 139****9999"
  }'
```

#### 2.5 Delete User

**Endpoint**: `DELETE /api/users/:id`
**Permission**: JWT Required
**Description**: Delete user (soft delete or hard delete)

**Path Parameters**:
- `id` (string, required): User ID

**Success Response** (200):
```json
{
  "message": "User successfully deleted",
  "id": "clx1234567890"
}
```

**Error Responses**:
- `404 Not Found`: User does not exist
- `403 Forbidden`: No permission to delete this user

**curl Example**:
```bash
curl -X DELETE http://localhost:3000/api/users/clx1234567890 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Role Management Module (Roles)

#### 3.1 Get Role List

**Endpoint**: `GET /api/roles`
**Permission**: JWT Required
**Description**: Get all roles list

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "role_admin",
      "name": "Administrator",
      "description": "Full system access",
      "permissions": [
        {
          "id": "perm_all",
          "name": "*",
          "description": "All permissions"
        }
      ],
      "userCount": 5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "role_user",
      "name": "Regular User",
      "description": "Basic user access",
      "permissions": [
        {
          "id": "perm_read",
          "name": "users:read",
          "description": "Read user data"
        }
      ],
      "userCount": 50,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/roles \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 3.2 Create Role

**Endpoint**: `POST /api/roles`
**Permission**: JWT Required
**Description**: Create new role

**Request Body**:
```json
{
  "name": "Editor",
  "description": "Can edit content"
}
```

**Success Response** (201):
```json
{
  "id": "role_editor",
  "name": "Editor",
  "description": "Can edit content",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Editor",
    "description": "Can edit content"
  }'
```

#### 3.3 Assign Permissions to Role

**Endpoint**: `POST /api/roles/:id/permissions`
**Permission**: JWT Required
**Description**: Assign permissions to role

**Path Parameters**:
- `id` (string, required): Role ID

**Request Body**:
```json
{
  "permissionIds": ["perm_001", "perm_002", "perm_003"]
}
```

**Success Response** (200):
```json
{
  "id": "role_editor",
  "name": "Editor",
  "permissions": [
    {
      "id": "perm_001",
      "name": "documents:create"
    },
    {
      "id": "perm_002",
      "name": "documents:update"
    },
    {
      "id": "perm_003",
      "name": "documents:delete"
    }
  ]
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/roles/role_editor/permissions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "permissionIds": ["perm_001", "perm_002", "perm_003"]
  }'
```

### 4. Permission Management Module (Permissions)

#### 4.1 Get Permission List

**Endpoint**: `GET /api/permissions`
**Permission**: JWT Required
**Description**: Get all permissions list, supports wildcard permissions

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "perm_all",
      "name": "*",
      "description": "All permissions"
    },
    {
      "id": "perm_users_all",
      "name": "users:*",
      "description": "All user operations"
    },
    {
      "id": "perm_users_create",
      "name": "users:create",
      "description": "Create users"
    },
    {
      "id": "perm_users_read",
      "name": "users:read",
      "description": "Read user data"
    },
    {
      "id": "perm_users_update",
      "name": "users:update",
      "description": "Update users"
    },
    {
      "id": "perm_users_delete",
      "name": "users:delete",
      "description": "Delete users"
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/permissions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 4.2 Create Permission

**Endpoint**: `POST /api/permissions`
**Permission**: JWT Required
**Description**: Create new permission

**Request Body**:
```json
{
  "name": "documents:publish",
  "description": "Publish documents"
}
```

**Field Descriptions**:
- `name` (string, required): Permission name, format `resource:action` or wildcard `*`
- `description` (string, optional): Permission description

**Success Response** (201):
```json
{
  "id": "perm_doc_publish",
  "name": "documents:publish",
  "description": "Publish documents",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/permissions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "documents:publish",
    "description": "Publish documents"
  }'
```

### 5. Team Management Module (Teams)

#### 5.1 Get Team List

**Endpoint**: `GET /api/teams`
**Permission**: JWT Required
**Description**: Get all teams current user belongs to

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "team_001",
      "name": "Development Team",
      "description": "Core development team",
      "owner": {
        "id": "user_001",
        "name": "Admin User"
      },
      "memberCount": 10,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/teams \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 5.2 Create Team

**Endpoint**: `POST /api/teams`
**Permission**: JWT Required
**Description**: Create new team

**Request Body**:
```json
{
  "name": "Marketing Team",
  "description": "Marketing and promotion team"
}
```

**Success Response** (201):
```json
{
  "id": "team_002",
  "name": "Marketing Team",
  "description": "Marketing and promotion team",
  "owner": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marketing Team",
    "description": "Marketing and promotion team"
  }'
```

### 6. Document Management Module (Documents)

#### 6.1 Get Document List

**Endpoint**: `GET /api/documents`
**Permission**: JWT Required
**Description**: Get document list with pagination and filtering

**Query Parameters**:
- `page` (number, optional): Page number, default 1
- `limit` (number, optional): Items per page, default 10
- `folderId` (string, optional): Filter by folder ID
- `tags` (string, optional): Filter by tags, comma separated

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "doc_001",
      "title": "API Documentation",
      "content": "Complete API documentation...",
      "folderId": "folder_001",
      "tags": ["api", "documentation"],
      "author": {
        "id": "user_001",
        "name": "Admin User"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-12-04T12:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

**curl Example**:
```bash
curl -X GET "http://localhost:3000/api/documents?page=1&limit=10&tags=api" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 6.2 Create Document

**Endpoint**: `POST /api/documents`
**Permission**: JWT Required
**Description**: Create new document

**Request Body**:
```json
{
  "title": "New Document",
  "content": "Document content in markdown format...",
  "folderId": "folder_001",
  "tags": ["guide", "tutorial"]
}
```

**Success Response** (201):
```json
{
  "id": "doc_002",
  "title": "New Document",
  "content": "Document content in markdown format...",
  "folderId": "folder_001",
  "tags": ["guide", "tutorial"],
  "author": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/documents \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Document",
    "content": "Document content...",
    "folderId": "folder_001",
    "tags": ["guide", "tutorial"]
  }'
```

### 7. File Management Module (Files)

#### 7.1 Upload File

**Endpoint**: `POST /api/files/upload`
**Permission**: JWT Required
**Description**: Upload file

**Request Headers**:
```
Content-Type: multipart/form-data
```

**Form Data**:
- `file` (File, required): File to upload
- `folderId` (string, optional): Folder ID

**Success Response** (201):
```json
{
  "id": "file_001",
  "name": "document.pdf",
  "size": 1024000,
  "mimeType": "application/pdf",
  "url": "https://storage.example.com/files/document.pdf",
  "folderId": "folder_001",
  "uploadedBy": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "folderId=folder_001"
```

#### 7.2 Get File List

**Endpoint**: `GET /api/files`
**Permission**: JWT Required
**Description**: Get file list

**Query Parameters**:
- `folderId` (string, optional): Filter by folder ID

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "file_001",
      "name": "document.pdf",
      "size": 1024000,
      "mimeType": "application/pdf",
      "url": "https://storage.example.com/files/document.pdf",
      "createdAt": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET "http://localhost:3000/api/files?folderId=folder_001" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 8. Folder Management Module (Folders)

#### 8.1 Get Folder Tree

**Endpoint**: `GET /api/folders/tree`
**Permission**: JWT Required
**Description**: Get folder tree structure

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "folder_root",
      "name": "Root Folder",
      "parentId": null,
      "children": [
        {
          "id": "folder_001",
          "name": "Documents",
          "parentId": "folder_root",
          "children": []
        },
        {
          "id": "folder_002",
          "name": "Images",
          "parentId": "folder_root",
          "children": []
        }
      ]
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/folders/tree \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 8.2 Create Folder

**Endpoint**: `POST /api/folders`
**Permission**: JWT Required
**Description**: Create new folder

**Request Body**:
```json
{
  "name": "New Folder",
  "parentId": "folder_root"
}
```

**Success Response** (201):
```json
{
  "id": "folder_003",
  "name": "New Folder",
  "parentId": "folder_root",
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/folders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Folder",
    "parentId": "folder_root"
  }'
```

### 9. Calendar Module (Calendar)

#### 9.1 Get Calendar Events

**Endpoint**: `GET /api/calendar/events`
**Permission**: JWT Required
**Description**: Get calendar events list

**Query Parameters**:
- `startDate` (string, optional): Start date (ISO 8601)
- `endDate` (string, optional): End date (ISO 8601)

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "event_001",
      "title": "Team Meeting",
      "description": "Weekly team sync",
      "startTime": "2024-12-05T10:00:00.000Z",
      "endTime": "2024-12-05T11:00:00.000Z",
      "location": "Conference Room A",
      "attendees": [
        {
          "id": "user_001",
          "name": "Admin User"
        }
      ],
      "createdAt": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET "http://localhost:3000/api/calendar/events?startDate=2024-12-01&endDate=2024-12-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 9.2 Create Calendar Event

**Endpoint**: `POST /api/calendar/events`
**Permission**: JWT Required
**Description**: Create new calendar event

**Request Body**:
```json
{
  "title": "Project Review",
  "description": "Q4 project review meeting",
  "startTime": "2024-12-10T14:00:00.000Z",
  "endTime": "2024-12-10T16:00:00.000Z",
  "location": "Conference Room B",
  "attendeeIds": ["user_001", "user_002"]
}
```

**Success Response** (201):
```json
{
  "id": "event_002",
  "title": "Project Review",
  "description": "Q4 project review meeting",
  "startTime": "2024-12-10T14:00:00.000Z",
  "endTime": "2024-12-10T16:00:00.000Z",
  "location": "Conference Room B",
  "attendees": [
    {
      "id": "user_001",
      "name": "Admin User"
    },
    {
      "id": "user_002",
      "name": "Developer User"
    }
  ],
  "createdAt": "2024-12-04T12:00:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/calendar/events \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Review",
    "startTime": "2024-12-10T14:00:00.000Z",
    "endTime": "2024-12-10T16:00:00.000Z",
    "attendeeIds": ["user_001", "user_002"]
  }'
```

### 10. Notification Module (Notifications)

#### 10.1 Get Notification List

**Endpoint**: `GET /api/notifications`
**Permission**: JWT Required
**Description**: Get current user's notification list

**Query Parameters**:
- `unreadOnly` (boolean, optional): Show only unread notifications

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "notif_001",
      "type": "SYSTEM",
      "title": "System Update",
      "message": "The system will be updated tonight",
      "isRead": false,
      "createdAt": "2024-12-04T12:00:00.000Z"
    }
  ],
  "unreadCount": 5
}
```

**curl Example**:
```bash
curl -X GET "http://localhost:3000/api/notifications?unreadOnly=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 10.2 Mark Notification as Read

**Endpoint**: `PATCH /api/notifications/:id/read`
**Permission**: JWT Required
**Description**: Mark notification as read

**Path Parameters**:
- `id` (string, required): Notification ID

**Success Response** (200):
```json
{
  "id": "notif_001",
  "isRead": true,
  "readAt": "2024-12-04T12:30:00.000Z"
}
```

**curl Example**:
```bash
curl -X PATCH http://localhost:3000/api/notifications/notif_001/read \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 11. Message Module (Messages)

#### 11.1 Get Conversation List

**Endpoint**: `GET /api/messages/conversations`
**Permission**: JWT Required
**Description**: Get all message conversations for current user

**Success Response** (200):
```json
{
  "data": [
    {
      "id": "conv_001",
      "participants": [
        {
          "id": "user_001",
          "name": "Admin User"
        },
        {
          "id": "user_002",
          "name": "Developer User"
        }
      ],
      "lastMessage": {
        "id": "msg_001",
        "content": "Hello!",
        "senderId": "user_002",
        "createdAt": "2024-12-04T12:00:00.000Z"
      },
      "unreadCount": 2,
      "updatedAt": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/messages/conversations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 11.2 Send Message

**Endpoint**: `POST /api/messages`
**Permission**: JWT Required
**Description**: Send new message

**Request Body**:
```json
{
  "conversationId": "conv_001",
  "content": "Hello, how are you?",
  "attachments": []
}
```

**Success Response** (201):
```json
{
  "id": "msg_002",
  "conversationId": "conv_001",
  "content": "Hello, how are you?",
  "sender": {
    "id": "user_001",
    "name": "Admin User"
  },
  "createdAt": "2024-12-04T12:30:00.000Z"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "conv_001",
    "content": "Hello, how are you?"
  }'
```

### 12. Dashboard Module (Dashboard)

#### 12.1 Get Statistics

**Endpoint**: `GET /api/dashboard/stats`
**Permission**: JWT Required
**Description**: Get dashboard statistics

**Success Response** (200):
```json
{
  "users": {
    "total": 1000,
    "active": 850,
    "newThisMonth": 50
  },
  "documents": {
    "total": 5000,
    "createdThisWeek": 120
  },
  "teams": {
    "total": 50,
    "activeProjects": 35
  },
  "activities": [
    {
      "id": "act_001",
      "type": "USER_LOGIN",
      "user": "Admin User",
      "timestamp": "2024-12-04T12:00:00.000Z"
    }
  ]
}
```

**curl Example**:
```bash
curl -X GET http://localhost:3000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Authentication Flow

### JWT Token Usage

All authenticated endpoints require JWT Token in request headers:

```
Authorization: Bearer <access_token>
```

### Token Refresh Flow

1. Login to get `accessToken` and `refreshToken`
2. Use `accessToken` to access protected endpoints
3. When `accessToken` expires (7 days), use `refreshToken` to call refresh endpoint
4. Get new `accessToken` and `refreshToken`

### Authentication Example (Complete Flow)

```bash
# 1. Login to get tokens
LOGIN_RESPONSE=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@halolight.h7ml.cn",
    "password": "password123"
  }')

# 2. Extract AccessToken
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')

# 3. Use Token to access protected endpoints
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. When token expires, use RefreshToken to refresh
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.refreshToken')
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
```

## Error Handling

### Standard Error Response Format

All error responses follow unified format:

```json
{
  "statusCode": 400,
  "timestamp": "2025-12-04T12:00:00.000Z",
  "path": "/api/users",
  "method": "POST",
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "email must be a valid email address"
    }
  ]
}
```

### Common Error Codes

| Status Code | Meaning | Common Scenarios |
|-------------|---------|------------------|
| 400 | Bad Request | Request validation failed |
| 401 | Unauthorized | Token invalid or expired |
| 403 | Forbidden | No permission to access resource |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Resource conflict (e.g. email already exists) |
| 422 | Unprocessable Entity | Business logic validation failed |
| 429 | Too Many Requests | Request rate limit exceeded |
| 500 | Internal Server Error | Server internal error |

### Error Handling Example

```bash
# Capture error response
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid-email"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ $HTTP_CODE -ne 201 ]; then
  echo "Error: HTTP $HTTP_CODE"
  echo "$BODY" | jq '.message'
fi
```

## Database Models

Prisma Schema includes **17 entity models**, supporting complete RBAC permission system:

```prisma
// Core user model
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  password      String
  avatar        String?
  phone         String?
  status        UserStatus @default(ACTIVE)

  // Relations
  roles         UserRole[]
  teams         TeamMember[]
  ownedTeams    Team[]
  documents     Document[]
  // ... more relations
}

// RBAC models
model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  permissions RolePermission[]
  users       UserRole[]
}

model Permission {
  id          String   @id @default(cuid())
  name        String   @unique  // Format: "users:create", "users:*", "*"
  description String?
  roles       RolePermission[]
}
```

Complete model relationships:
- User ↔ Role (many-to-many via UserRole)
- Role ↔ Permission (many-to-many via RolePermission)
- User ↔ Team (users can own teams or join as members)
- Document ↔ User (document owner and sharing)
- Folder (self-referencing for tree structure)
- ActivityLog (audit log for all operations)

## Environment Variables

```bash
# Application configuration
NODE_ENV=production
PORT=3000

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/halolight_db"

# JWT authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars
JWT_REFRESH_EXPIRES_IN=30d

# CORS configuration
CORS_ORIGIN=http://localhost:3000,https://halolight.h7ml.cn

# Optional: Redis cache
REDIS_HOST=localhost
REDIS_PORT=6379

# Optional: File upload
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_PATH=./uploads

# Optional: Rate limiting
THROTTLE_TTL=60        # seconds
THROTTLE_LIMIT=10      # requests
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Clone project
git clone https://github.com/halolight/halolight-api-nestjs.git
cd halolight-api-nestjs

# Configure environment variables
cp .env.production .env
# Edit .env file, set database password, JWT secret, etc.

# Start all services (API + PostgreSQL + Redis)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Build API Container Only

```bash
# Build image
docker build -t halolight-api-nestjs .

# Run container
docker run -d \
  --name halolight-api \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-jwt-secret" \
  halolight-api-nestjs
```

## Common Commands

```bash
# Development
pnpm dev              # Start development server (hot reload)
pnpm start:debug      # Start in debug mode

# Build
pnpm build            # Build for production
pnpm start:prod       # Run production build

# Code Quality
pnpm lint             # ESLint check
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Prettier formatting
pnpm type-check       # TypeScript type checking

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:cov         # Generate test coverage report
pnpm test:e2e         # Run E2E tests

# Database
pnpm prisma:generate  # Generate Prisma Client
pnpm prisma:migrate   # Run database migrations (development)
pnpm prisma:studio    # Open Prisma Studio (database GUI)
pnpm prisma:seed      # Run database seeding
pnpm db:reset         # Reset database
```

## Architecture Highlights

### 1. Modular Design

Each business module is independently encapsulated, following NestJS modular architecture:

```typescript
@Module({
  imports: [PrismaModule],      // Dependency injection
  controllers: [UsersController], // Route controllers
  providers: [UsersService],      // Business logic
  exports: [UsersService],        // Export for use by other modules
})
export class UsersModule {}
```

### 2. DTO Validation

Automatic validation using class-validator:

```typescript
export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
}
```

### 3. Guards and Decorators

Custom decorators and guards for authentication and authorization:

```typescript
// Public route (skip JWT verification)
@Public()
@Post('login')
async login(@Body() loginDto: LoginDto) { ... }

// Protected route (JWT required)
@Get('me')
async getCurrentUser(@CurrentUser() user: User) { ... }

// Permission control (future extension)
@RequirePermissions('users:create')
@Post()
async create(@Body() dto: CreateUserDto) { ... }
```

### 4. Global Exception Handling

Unified error response format:

```json
{
  "statusCode": 400,
  "timestamp": "2025-12-04T12:00:00.000Z",
  "path": "/api/users",
  "method": "POST",
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 5. Swagger Documentation

Auto-generated interactive API documentation, accessible at `/docs`:

- Complete API endpoint list
- Request/Response schemas
- Online testing functionality
- JWT authentication support

## Development Workflow

### 1. Create New Module

```bash
# Use NestJS CLI to generate module
nest g module modules/my-module
nest g controller modules/my-module
nest g service modules/my-module
```

### 2. Define Prisma Model

Edit `prisma/schema.prisma`:

```prisma
model MyModel {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Run migration:

```bash
pnpm prisma:migrate
```

### 3. Create DTO

```typescript
// dto/create-my-model.dto.ts
export class CreateMyModelDto {
  @ApiProperty()
  @IsString()
  name: string;
}
```

### 4. Implement Service

```typescript
@Injectable()
export class MyModuleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.myModel.findMany();
  }

  async create(dto: CreateMyModelDto) {
    return this.prisma.myModel.create({ data: dto });
  }
}
```

### 5. Implement Controller

```typescript
@Controller('my-models')
@ApiTags('MyModels')
export class MyModuleController {
  constructor(private service: MyModuleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all models' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create model' })
  create(@Body() dto: CreateMyModelDto) {
    return this.service.create(dto);
  }
}
```

## Related Links

- [Live Preview](http://halolight-api-nestjs.h7ml.cn)
- [API Documentation](http://halolight-api-nestjs.h7ml.cn/docs)
- [GitHub Repository](https://github.com/halolight/halolight-api-nestjs)
- [NestJS Official Docs](https:/docs.nestjs.com)
- [Prisma Official Docs](https://www.prisma.io/docs)
- [Issue Tracker](https://github.com/halolight/halolight-api-nestjs/issues)

## Next Steps

- Check [API Patterns](/en/development/api-patterns) to learn how to call from frontend
- Check [Authentication System](/en/development/authentication) to understand permission control
- Check [Overall Architecture](/en/development/architecture) to explore HaloLight ecosystem
