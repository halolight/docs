# Check-in Scheduler Platform

HaloLight Action is a modern check-in scheduler platform built with Next.js 14 App Router and Supabase, supporting multi-platform automatic check-ins, task scheduling, execution tracking, and push notifications.

**Live Preview**: [https://halolight-action.h7ml.cn](https://halolight-action.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-action](https://github.com/halolight/halolight-action)

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 14.2 | App Router architecture |
| TypeScript | 5.7 | Type safety |
| Supabase | latest | PostgreSQL + Auth + RLS |
| Tailwind CSS | 3.4 | Utility-first CSS |
| shadcn/ui | latest | Radix UI component library |
| TanStack Query | 5.x | Server state management |
| Zustand | 5.x | Client state management |
| Framer Motion | latest | Smooth animations |
| Vitest | latest | Unit testing |

## Core Features

### Automated Check-in Tasks

- **Multi-platform Support**: V2EX, GitHub, Juejin, CSDN, Bilibili, etc.
- **Cron Scheduling**: Flexible cron expressions
- **Priority Queue**: Task priority management
- **Manual Trigger**: Support instant execution
- **Enable/Disable**: Flexible task state control

### Data Monitoring & Analytics

- **Check-in Records**: Complete execution history, success rate statistics
- **Execution Analysis**: Duration analysis, error tracking
- **Push Logs**: Multi-channel push history, status monitoring
- **Backend Pagination**: Element UI style, supports large datasets

### Multi-channel Push Notifications

- **12 Push Services**: ServerChan, DingTalk, WeCom, Feishu, Telegram, Discord, Bark, etc.
- **Integrated push-all-in-one**: Unified push interface
- **Push Testing**: Instant configuration verification
- **Default Channel**: Flexible notification routing

### Complete Permission System

- **Supabase RLS**: Database-level row-level security
- **Role Management**: super_admin / admin / user / guest
- **API Tokens**: Fine-grained API access control
- **Audit Logs**: Operation tracking

## Directory Structure

```
halolight-action/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/             # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (dashboard)/        # Dashboard pages (15 feature pages)
│   │   ├── dashboard/      # Dashboard home
│   │   ├── signin-tasks/   # Check-in task management
│   │   ├── signin-records/ # Check-in records
│   │   ├── push-logs/      # Push logs
│   │   ├── scheduled-tasks/# Scheduled tasks
│   │   ├── notifications/  # Notification center
│   │   ├── data-dictionary/# Data dictionary
│   │   ├── users/          # User management
│   │   └── settings/       # Settings
│   │       ├── profile/
│   │       ├── appearance/
│   │       ├── push-channels/
│   │       └── api-proxy/
│   └── api/                # API routes
│       ├── cron/           # Cron job execution
│       ├── signin/         # Check-in execution
│       └── push/test/      # Push testing
├── components/             # React components
│   ├── ui/                 # shadcn/ui base components
│   ├── layout/             # Layout components
│   └── auth/               # Auth components
├── hooks/                  # React Query Hooks
├── lib/                    # Utilities
│   ├── supabase/           # Supabase client
│   ├── dal/                # Data access layer
│   ├── cron/               # Cron executor
│   └── push/               # Push service wrapper
├── providers/              # Context Providers
├── stores/                 # Zustand state management
├── types/                  # TypeScript type definitions
└── supabase/migrations/    # Database migration scripts
```

## Quick Start

### Requirements

- Node.js >= 24.0.0
- pnpm >= 10.x
- Supabase account (required)

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-action.git
cd halolight-action

# Install dependencies
pnpm install
```

### Environment Variables

```bash
cat > .env.local <<'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_NAME=HaloLight Action
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

### Supabase Setup

1. Create a project in [Supabase Dashboard](https://supabase.com/dashboard)
2. Execute `supabase/migrations/init.sql` in **SQL Editor**
3. Copy **Project URL** and **anon public key** to `.env.local`
4. (Optional) Run `pnpm generate:types` to generate type definitions

### Start Development Server

```bash
pnpm dev
# Visit http://localhost:3000
```

### Default Test Account

- **Email**: `admin@action.h7ml.cn`
- **Password**: `Admin@123`

## Database Schema

### Core Tables

| Table | Description | Key Features |
|-------|-------------|--------------|
| signin_tasks | Check-in task config | Cron scheduling, priority, credentials |
| signin_records | Check-in execution records | History tracking, success rate stats |
| push_channels | Push channel config | 12 push services, testing & default channel |
| push_logs | Push execution logs | Push history, error tracking |
| data_dictionary | Data dictionary config | System config, multi-type support |
| notifications | System notifications | User messages, notification center |
| cron_jobs | Cron job config | HTTP request scheduling |
| users | User info | Auth, role management |
| user_tokens | API tokens | Access control, token management |

### Row Level Security (RLS)

- **User Isolation**: Users can only access their own data
- **Role Permissions**: Admins have higher permissions
- **System Protection**: System configs are protected, cannot be deleted
- **Audit Trail**: All operations are traceable

## Common Commands

```bash
# Development
pnpm dev                # Start development server
pnpm build              # Production build
pnpm start              # Start production server

# Quality Checks
pnpm lint               # ESLint check
pnpm type-check         # TypeScript type check
pnpm format             # Prettier format
pnpm ci                 # Full CI check

# Testing
pnpm test               # Run tests (watch)
pnpm test:run           # Run tests (once)
pnpm test:coverage      # Test coverage report

# Supabase
pnpm generate:types     # Generate types from Supabase
```

## Deployment

### Vercel (Recommended)

One-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-action)

### Manual Deployment

```bash
# Build
pnpm build

# Start production server
pnpm start
```

### Vercel Cron Jobs

Add in Vercel project settings:

- **Schedule**: `0 8 * * *` (daily at 8 AM)
- **Path**: `/api/cron`

## Security Notes

### Important Reminders

1. **Don't commit secrets**:
   - Don't commit `.env.local` to Git
   - Don't expose Supabase keys in Issues/PRs
   - Don't hardcode sensitive info in code

2. **Use correct keys**:
   - Frontend uses `anon public key` (safe)
   - Frontend should NOT use `service_role key` (dangerous)

3. **Credential storage**:
   - Check-in task credentials should be encrypted
   - Consider Supabase Vault or external key management for production

4. **RLS policies**:
   - Regularly review RLS policies
   - Test unauthorized access scenarios
   - Always enable RLS for new tables

## Relationship with HaloLight Series

| Project | Backend | Features |
|---------|---------|----------|
| halolight | Mock.js | Frontend demo, no backend needed |
| halolight-action | Supabase | Check-in scheduler, real backend |
| halolight-vue | Mock.js | Vue 3.5 implementation |
| halolight-angular | Mock.js | Angular implementation |

## Related Projects

- [halolight](https://github.com/halolight/halolight) - Next.js 14 reference implementation
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 3.5 implementation
- [halolight-angular](https://github.com/halolight/halolight-angular) - Angular implementation
- [docs](https://github.com/halolight/docs) - Documentation
