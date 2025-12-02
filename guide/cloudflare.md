# Cloudflare 版本

HaloLight Cloudflare 版本基于 Next.js 15 App Router + React 19 构建，使用 `@opennextjs/cloudflare` 适配 Cloudflare Workers/Pages 边缘运行时，实现全球低延迟访问。

**在线预览**：[https://halolight-cloudflare.h7ml.cn/](https://halolight-cloudflare.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-cloudflare](https://github.com/halolight/halolight-cloudflare)

## 与原版差异

| 特性 | 原版 (Next.js) | Cloudflare 版 |
|------|----------------|---------------|
| Next.js | 14.x | 15.5.x |
| React | 18.x | 19.x |
| 运行时 | Node.js (Vercel) | Cloudflare Workers (Edge) |
| 部署平台 | Vercel / Docker | Cloudflare Pages |
| 开发工具 | webpack | Turbopack |
| 部署命令 | `pnpm build && pnpm start` | `pnpm deploy` |
| SSR 位置 | 服务器/Serverless | 全球边缘节点 |
| 冷启动 | 取决于平台 | < 50ms |

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 15.5.x | React 全栈框架 |
| React | 19.x | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS |
| @opennextjs/cloudflare | 1.x | Cloudflare 适配层 |
| Wrangler | 4.x | Cloudflare CLI |
| shadcn/ui | latest | UI 组件库 |
| Zustand | 5.x | 状态管理 |
| TanStack Query | 5.x | 服务端状态 |
| Vitest | 4.x | 单元测试 |
| Mock.js | 1.x | 数据模拟 |

## 目录结构

```
halolight-cloudflare/
├── src/
│   ├── app/                      # App Router 页面
│   │   ├── (dashboard)/          # 管理后台路由组
│   │   ├── (auth)/               # 认证路由组
│   │   ├── (legal)/              # 法律条款路由组
│   │   ├── layout.tsx            # 根布局
│   │   └── page.tsx              # 首页
│   ├── components/               # React 组件
│   │   ├── ui/                   # shadcn/ui 组件
│   │   ├── layout/               # 布局组件
│   │   └── dashboard/            # 仪表盘组件
│   ├── hooks/                    # React Hooks
│   ├── stores/                   # Zustand Stores
│   ├── lib/                      # 工具库
│   ├── mock/                     # Mock 数据
│   ├── providers/                # Context Providers
│   ├── config/                   # 配置文件
│   └── __tests__/                # 单元测试
├── public/                       # 静态资源
├── .github/workflows/            # GitHub Actions CI
├── .open-next/                   # OpenNext 构建产物（自动生成）
├── coverage/                     # 测试覆盖率（自动生成）
├── cloudflare-env.d.ts           # Cloudflare 环境类型
├── vitest.config.ts              # Vitest 测试配置
├── open-next.config.ts           # OpenNext 配置
├── wrangler.jsonc                # Wrangler 配置
├── next.config.ts                # Next.js 配置
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- Wrangler CLI (需登录 Cloudflare)

### 安装

```bash
git clone https://github.com/halolight/halolight-cloudflare.git
cd halolight-cloudflare
pnpm install
```

### 环境变量

```bash
cp .dev.vars.example .dev.vars
```

```bash
# .dev.vars 示例
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_MOCK=true
NEXT_PUBLIC_APP_TITLE=HaloLight
NEXT_PUBLIC_BRAND_NAME=HaloLight
NEXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NEXT_PUBLIC_DEMO_PASSWORD=Admin@123
```

### 启动开发

```bash
pnpm dev
```

访问 http://localhost:3000

### 本地预览 (Edge 环境)

```bash
pnpm preview
```

模拟 Cloudflare Workers 环境，检测 Edge Runtime 兼容性问题。

### 部署到 Cloudflare

```bash
wrangler login   # 首次需要登录
pnpm deploy      # 构建并部署
```

## 常用脚本

```bash
pnpm dev          # 启动开发服务器（Turbopack，Node.js 环境）
pnpm build        # Next.js 生产构建
pnpm preview      # 本地预览 Cloudflare 环境
pnpm deploy       # 部署到 Cloudflare
pnpm upload       # 仅上传不部署
pnpm lint         # ESLint 检查
pnpm type-check   # TypeScript 类型检查
pnpm test         # 运行单元测试（watch 模式）
pnpm test:run     # 运行单元测试（单次）
pnpm test:coverage # 运行测试并生成覆盖率报告
pnpm cf-typegen   # 生成 Cloudflare 环境类型
```

## Edge Runtime 约束

Cloudflare Workers 是边缘运行时，部分 Node.js API 不可用：

**不可用的 API**：
- `fs` - 文件系统操作
- `child_process` - 子进程
- `net`、`dgram` - 原生网络套接字
- `crypto.createCipher` 等旧加密 API

**部分可用** (通过 nodejs_compat)：
- `Buffer` - 二进制数据处理
- `process.env` - 环境变量
- `crypto` 部分 API - 如 `randomUUID()`

::: warning 注意
使用 `@opennextjs/cloudflare` 时，整个应用自动运行在边缘环境，无需手动声明 `export const runtime = 'edge'`。
:::

## Cloudflare 服务集成

### 可用服务

| 服务 | 用途 | 说明 |
|------|------|------|
| KV | 键值存储 | 全球分布式缓存 |
| D1 | SQLite 数据库 | 边缘 SQL 数据库 |
| R2 | 对象存储 | S3 兼容存储 |
| Queues | 消息队列 | 异步任务处理 |
| Durable Objects | 有状态对象 | 实时协作 |
| Workers AI | AI 推理 | 边缘 AI 模型 |

### 使用示例

```ts
import { getRequestContext } from '@opennextjs/cloudflare';

export async function GET() {
  const { env } = getRequestContext();
  const value = await env.MY_KV.get('key');
  return Response.json({ value });
}
```

### 配置 KV 存储

```jsonc
// wrangler.jsonc
{
  "kv_namespaces": [
    { "binding": "MY_KV", "id": "xxx" }
  ]
}
```

### 配置 D1 数据库

```jsonc
// wrangler.jsonc
{
  "d1_databases": [
    { "binding": "MY_DB", "database_id": "xxx" }
  ]
}
```

## SSR/SSG/ISR 支持

| 渲染模式 | 支持状态 | 说明 |
|----------|----------|------|
| SSR | ✅ 支持 | 每次请求在边缘渲染 |
| SSG | ✅ 支持 | 构建时生成静态页面 |
| ISR | ⚠️ 部分 | 需配置 R2 缓存 |

### 启用 ISR

```ts
// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

## CI/CD

项目已配置完整的 GitHub Actions CI 工作流：

| Job | 说明 |
|-----|------|
| **lint** | ESLint + TypeScript 类型检查 |
| **test** | Vitest 单元测试 + Codecov 覆盖率 |
| **build** | OpenNext Cloudflare 生产构建 |
| **security** | 依赖安全审计 |
| **dependency-review** | PR 依赖变更审查 |

### 部署工作流示例

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
```

## 部署架构

```
用户请求 → Cloudflare CDN → Workers (Edge) → KV/D1/R2/外部 API
                ↓
          全球 300+ 节点
          就近响应 < 50ms
```

## 配额限制

| 限制项 | 免费版 | 付费版 |
|--------|--------|--------|
| Worker 脚本大小 | 1MB（压缩后） | 10MB |
| CPU 时间 | 10-50ms | 数秒 |
| 内存 | 128MB | 128MB |
| 子请求数 | 50 | 1000 |
| 请求持续时间 | 30s | 30s |

::: tip 参考
实际限制请查阅 [Cloudflare 官方文档](https://developers.cloudflare.com/workers/platform/limits/)。
:::

## 版本回滚

Cloudflare Pages 保留历史部署，支持以下回滚方式：

1. **Dashboard 回滚**：
   - Cloudflare Dashboard → Workers & Pages → 项目 → Deployments
   - 选择历史版本 → “Rollback to this deployment”

2. **重新部署指定提交**：
   ```bash
   git checkout <commit-hash>
   pnpm deploy
   ```

## 常见问题

### “Cannot find module ‘fs’” 错误

Edge Runtime 不支持 Node.js 内置模块。使用 Web API 替代或确保该代码仅在客户端运行。

### 构建体积过大

- 检查依赖是否有 Node.js 专用代码
- 使用动态导入拆分代码
- 移除未使用的依赖

### 冷启动慢

- 减少 Worker 脚本体积
- 使用 Smart Placement 就近部署
- 预热关键路径

## 相关链接

- [在线预览 (Cloudflare)](https://halolight-cloudflare.h7ml.cn)
- [在线预览 (原版 Vercel)](https://halolight.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-cloudflare)
- [OpenNext 文档](https://opennext.js.org/cloudflare)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
