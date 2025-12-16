# 签到定时任务平台

HaloLight Action 是基于 Next.js 14 App Router 和 Supabase 构建的现代化签到定时任务平台，支持多平台自动签到、任务调度、执行记录追踪和推送通知。

**在线预览**：[https://halolight-action.vercel.app](https://halolight-action.vercel.app)

**GitHub**：[https://github.com/halolight/halolight-action](https://github.com/halolight/halolight-action)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 14.2 | App Router 架构 |
| TypeScript | 5.7 | 类型安全 |
| Supabase | latest | PostgreSQL + Auth + RLS |
| Tailwind CSS | 3.4 | 原子化 CSS |
| shadcn/ui | latest | Radix UI 组件库 |
| TanStack Query | 5.x | 服务端状态管理 |
| Zustand | 5.x | 客户端状态管理 |
| Framer Motion | latest | 流畅动画 |
| Vitest | latest | 单元测试 |

## 核心特性

### 签到任务自动化

- **多平台支持**：V2EX、GitHub、掘金、CSDN、B 站等
- **Cron 调度**：灵活的定时表达式
- **优先级队列**：任务优先级管理
- **手动触发**：支持即时执行
- **启用/禁用**：灵活控制任务状态

### 数据监控与分析

- **签到记录**：完整执行历史、成功率统计
- **执行分析**：耗时分析、错误追踪
- **推送日志**：多渠道推送历史、状态监控
- **后端分页**：Element UI 风格、支持大数据量

### 多渠道推送通知

- **12 种推送服务**：Server 酱、钉钉、企微、飞书、Telegram、Discord、Bark 等
- **集成 push-all-in-one**：统一推送接口
- **推送测试**：配置即时验证
- **默认渠道**：灵活的通知路由

### 完整的权限系统

- **Supabase RLS**：数据库级别的行级安全
- **角色管理**：super_admin / admin / user / guest
- **API 令牌**：细粒度的 API 访问控制
- **审计日志**：操作记录追踪

## 目录结构

```
halolight-action/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/             # 认证页面
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (dashboard)/        # 仪表盘页面 (15个功能页面)
│   │   ├── dashboard/      # 仪表盘首页
│   │   ├── signin-tasks/   # 签到任务管理
│   │   ├── signin-records/ # 签到记录查看
│   │   ├── push-logs/      # 推送日志
│   │   ├── scheduled-tasks/# 定时任务
│   │   ├── notifications/  # 通知中心
│   │   ├── data-dictionary/# 数据字典
│   │   ├── users/          # 用户管理
│   │   └── settings/       # 设置
│   │       ├── profile/
│   │       ├── appearance/
│   │       ├── push-channels/
│   │       └── api-proxy/
│   └── api/                # API 路由
│       ├── cron/           # 定时任务执行
│       ├── signin/         # 签到执行
│       └── push/test/      # 推送测试
├── components/             # React 组件
│   ├── ui/                 # shadcn/ui 基础组件
│   ├── layout/             # 布局组件
│   └── auth/               # 认证组件
├── hooks/                  # React Query Hooks
├── lib/                    # 工具库
│   ├── supabase/           # Supabase 客户端
│   ├── dal/                # 数据访问层
│   ├── cron/               # Cron 执行器
│   └── push/               # 推送服务封装
├── providers/              # Context Providers
├── stores/                 # Zustand 状态管理
├── types/                  # TypeScript 类型定义
└── supabase/migrations/    # 数据库迁移脚本
```

## 快速开始

### 环境要求

- Node.js >= 24.0.0
- pnpm >= 10.x
- Supabase 账号 (必需)

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-action.git
cd halolight-action

# 安装依赖
pnpm install
```

### 环境变量

```bash
cat > .env.local <<'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_NAME=HaloLight Action
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

### Supabase 初始化

1. 在 [Supabase Dashboard](https://supabase.com/dashboard) 创建项目
2. 在 **SQL Editor** 执行 `supabase/migrations/init.sql`
3. 复制 **Project URL** 和 **anon public key** 到 `.env.local`
4. (可选) 运行 `pnpm generate:types` 生成类型定义

### 启动开发服务器

```bash
pnpm dev
# 访问 http://localhost:3000
```

### 默认测试账号

- **Email**：`admin@action.h7ml.cn`
- **Password**：`Admin@123`

## 数据库架构

### 核心数据表

| 表名 | 说明 | 关键功能 |
|------|------|----------|
| signin_tasks | 签到任务配置 | Cron 调度、优先级、凭证管理 |
| signin_records | 签到执行记录 | 历史追踪、成功率统计 |
| push_channels | 推送渠道配置 | 12种推送服务、测试与默认渠道 |
| push_logs | 推送执行日志 | 推送历史、错误追踪 |
| data_dictionary | 数据字典配置 | 系统配置、多类型支持 |
| notifications | 系统通知 | 用户消息、通知中心 |
| cron_jobs | 定时任务配置 | HTTP 请求调度 |
| users | 用户信息 | 认证授权、角色管理 |
| user_tokens | API 令牌 | 访问控制、令牌管理 |

### Row Level Security (RLS)

- **用户隔离**：用户只能访问自己的数据
- **角色权限**：管理员拥有更高权限
- **系统保护**：系统配置受保护，不可删除
- **审计追踪**：所有操作可追溯

## 常用命令

```bash
# 开发
pnpm dev                # 启动开发服务器
pnpm build              # 生产构建
pnpm start              # 启动生产服务器

# 质量检查
pnpm lint               # ESLint 检查
pnpm type-check         # TypeScript 类型检查
pnpm format             # Prettier 格式化
pnpm ci                 # 完整 CI 检查

# 测试
pnpm test               # 运行测试 (watch)
pnpm test:run           # 运行测试 (单次)
pnpm test:coverage      # 测试覆盖率报告

# Supabase
pnpm generate:types     # 从 Supabase 生成类型
```

## 部署

### Vercel (推荐)

一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-action)

### 手动部署

```bash
# 构建
pnpm build

# 启动生产服务器
pnpm start
```

### Vercel Cron Jobs

在 Vercel 项目设置中添加：

- **Schedule**：`0 8 * * *` (每天早上 8 点)
- **Path**：`/api/cron`

## 安全注意事项

### 重要提醒

1. **不要提交密钥**：
   - 不要将 `.env.local` 提交到 Git
   - 不要在 Issue/PR 中泄露 Supabase 密钥
   - 不要硬编码敏感信息到代码中

2. **使用正确的密钥**：
   - 前端使用 `anon public key` (安全)
   - 前端不要使用 `service_role key` (危险)

3. **凭证存储**：
   - 签到任务的凭证建议加密存储
   - 生产环境考虑使用 Supabase Vault 或外部密钥管理服务

4. **RLS 策略**：
   - 定期审查 RLS 策略
   - 测试未授权访问场景
   - 新增表务必启用 RLS

## 与 halolight 系列的关系

| 项目 | 后端 | 特点 |
|------|------|------|
| halolight | Mock.js | 纯前端演示，无需后端服务 |
| halolight-action | Supabase | 签到定时任务平台，真实后端 |
| halolight-vue | Mock.js | Vue 3.5 实现 |
| halolight-angular | Mock.js | Angular 实现 |

## 相关项目

- [halolight](https://github.com/halolight/halolight) - Next.js 14 参考实现
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 3.5 实现
- [halolight-angular](https://github.com/halolight/halolight-angular) - Angular 实现
- [docs](https://github.com/halolight/docs) - 文档与规范
