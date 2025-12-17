# Cloudflare 部署

HaloLight Cloudflare 部署版本，基于 Next.js 15 App Router + React 19 构建，使用 `@opennextjs/cloudflare` 适配器部署到 Cloudflare Workers/Pages 边缘运行时，实现全球 300+ 节点低延迟访问。

**在线预览**：[https://halolight-cloudflare.h7ml.cn/](https://halolight-cloudflare.h7ml.cn/)

**GitHub**：[https://github.com/halolight/halolight-cloudflare](https://github.com/halolight/halolight-cloudflare)

## 特性

- ☁️ **Cloudflare Workers** - 全球边缘计算，< 50ms 冷启动
- 📄 **Cloudflare Pages** - 静态资源全球分发
- 💾 **KV 存储** - 全球分布式键值存储
- 🗄️ **D1 数据库** - 边缘 SQLite 数据库
- 📦 **R2 对象存储** - S3 兼容，零出口费
- 🤖 **Workers AI** - 边缘 AI 推理
- 🔄 **Durable Objects** - 有状态边缘对象
- 📊 **Analytics Engine** - 实时分析引擎
- 🔒 **Zero Trust** - 企业级安全访问
- 🌐 **300+ 全球节点** - 极致低延迟

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

## 快速部署

### 方式一：Wrangler CLI (推荐)

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 克隆项目
git clone https://github.com/halolight/halolight-cloudflare.git
cd halolight-cloudflare

# 安装依赖
pnpm install

# 部署
pnpm deploy
```

### 方式二：Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 Workers & Pages
3. 点击 “Create application” → “Pages”
4. 选择 “Connect to Git”
5. 授权并选择 `halolight/halolight-cloudflare` 仓库
6. 配置构建设置：
   - Build command: `pnpm build`
   - Build output directory: `.open-next`
7. 添加环境变量
8. 点击 “Save and Deploy”

### 方式三：GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: /api
          NEXT_PUBLIC_MOCK: false

      - name: Deploy
        run: pnpm deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
```

## 配置文件

### wrangler.jsonc

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "halolight",
  "compatibility_date": "2024-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "main": ".open-next/worker.js",
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  // KV 存储
  "kv_namespaces": [
    {
      "binding": "CACHE_KV",
      "id": "your-kv-namespace-id"
    }
  ],
  // D1 数据库
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "halolight-db",
      "database_id": "your-d1-database-id"
    }
  ],
  // R2 对象存储
  "r2_buckets": [
    {
      "binding": "STORAGE",
      "bucket_name": "halolight-assets"
    }
  ],
  // Durable Objects
  "durable_objects": {
    "bindings": [
      {
        "name": "COUNTER",
        "class_name": "Counter"
      }
    ]
  },
  // AI 绑定
  "ai": {
    "binding": "AI"
  },
  // 环境变量
  "vars": {
    "ENVIRONMENT": "production"
  }
}
```

### open-next.config.ts

```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
  // ISR 缓存配置
  incrementalCache: r2IncrementalCache,

  // 或使用 KV 缓存
  // incrementalCache: kvIncrementalCache,
});
```

## 环境变量

### 本地开发 (。dev.vars)

```bash
# .dev.vars
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_MOCK=true
NEXT_PUBLIC_APP_TITLE=HaloLight
NEXT_PUBLIC_BRAND_NAME=HaloLight
NEXT_PUBLIC_DEMO_EMAIL=admin@halolight.h7ml.cn
NEXT_PUBLIC_DEMO_PASSWORD=Admin@123
NEXT_PUBLIC_SHOW_DEMO_HINT=true
```

### 生产环境

在 Cloudflare Dashboard → Workers & Pages → 项目 → Settings → Variables 设置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `NEXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `NEXT_PUBLIC_BRAND_NAME` | 品牌名称 | `HaloLight` |
| `JWT_SECRET` | JWT 密钥 | `your-secret-key` |
| `DATABASE_URL` | D1 连接 (自动绑定) | - |

### Wrangler CLI 设置

```bash
# 设置普通变量
wrangler secret put JWT_SECRET

# 批量设置
wrangler deploy --var ENVIRONMENT:production

# 查看变量
wrangler secret list
```

## Workers 服务详解

### KV 存储

全球分布式键值存储，适合会话缓存、配置数据等场景。

```typescript
// lib/kv.ts
import { getRequestContext } from "@opennextjs/cloudflare";

export async function getFromKV(key: string) {
  const { env } = getRequestContext();
  return await env.CACHE_KV.get(key, { type: "json" });
}

export async function setToKV(key: string, value: any, ttl?: number) {
  const { env } = getRequestContext();
  await env.CACHE_KV.put(key, JSON.stringify(value), {
    expirationTtl: ttl || 3600, // 默认 1 小时
  });
}

export async function deleteFromKV(key: string) {
  const { env } = getRequestContext();
  await env.CACHE_KV.delete(key);
}

// 使用示例：会话管理
export async function getSession(sessionId: string) {
  return await getFromKV(`session:${sessionId}`);
}

export async function setSession(sessionId: string, data: SessionData) {
  await setToKV(`session:${sessionId}`, data, 86400); // 24 小时
}
```

### D1 数据库

边缘 SQLite 数据库，支持 SQL 查询。

```typescript
// lib/db.ts
import { getRequestContext } from "@opennextjs/cloudflare";

export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  const { env } = getRequestContext();
  const stmt = env.DB.prepare(sql);

  if (params) {
    const result = await stmt.bind(...params).all();
    return result.results as T[];
  }

  const result = await stmt.all();
  return result.results as T[];
}

export async function execute(sql: string, params?: any[]) {
  const { env } = getRequestContext();
  const stmt = env.DB.prepare(sql);

  if (params) {
    return await stmt.bind(...params).run();
  }

  return await stmt.run();
}

// 使用示例
export async function getUsers(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return await query<User>(
    "SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );
}

export async function createUser(user: CreateUserInput) {
  return await execute(
    "INSERT INTO users (email, name, role) VALUES (?, ?, ?)",
    [user.email, user.name, user.role || "user"]
  );
}
```

### D1 数据库迁移

```bash
# 创建数据库
wrangler d1 create halolight-db

# 创建迁移
wrangler d1 migrations create halolight-db init

# 编辑迁移文件 migrations/0001_init.sql
```

```sql
-- migrations/0001_init.sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

```bash
# 应用迁移（本地）
wrangler d1 migrations apply halolight-db --local

# 应用迁移（生产）
wrangler d1 migrations apply halolight-db --remote
```

### R2 对象存储

S3 兼容的对象存储，零出口费。

```typescript
// lib/r2.ts
import { getRequestContext } from "@opennextjs/cloudflare";

export async function uploadFile(
  key: string,
  file: ArrayBuffer | ReadableStream,
  contentType: string
) {
  const { env } = getRequestContext();

  await env.STORAGE.put(key, file, {
    httpMetadata: {
      contentType,
    },
  });

  return `https://your-bucket.r2.cloudflarestorage.com/${key}`;
}

export async function getFile(key: string) {
  const { env } = getRequestContext();
  return await env.STORAGE.get(key);
}

export async function deleteFile(key: string) {
  const { env } = getRequestContext();
  await env.STORAGE.delete(key);
}

export async function listFiles(prefix?: string, limit = 100) {
  const { env } = getRequestContext();
  const options: R2ListOptions = { limit };

  if (prefix) {
    options.prefix = prefix;
  }

  const list = await env.STORAGE.list(options);
  return list.objects;
}

// API 路由：文件上传
// app/api/upload/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const key = `uploads/${Date.now()}-${file.name}`;
  const buffer = await file.arrayBuffer();
  const url = await uploadFile(key, buffer, file.type);

  return Response.json({ url, key });
}
```

### Workers AI

边缘 AI 推理，支持多种模型。

```typescript
// lib/ai.ts
import { getRequestContext } from "@opennextjs/cloudflare";

// 文本生成
export async function generateText(prompt: string) {
  const { env } = getRequestContext();

  const response = await env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
    prompt,
    max_tokens: 512,
  });

  return response.response;
}

// 文本嵌入
export async function getEmbedding(text: string) {
  const { env } = getRequestContext();

  const response = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
    text: [text],
  });

  return response.data[0];
}

// 图片生成
export async function generateImage(prompt: string) {
  const { env } = getRequestContext();

  const response = await env.AI.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
    prompt,
  });

  return response; // ArrayBuffer
}

// 图片分类
export async function classifyImage(imageBuffer: ArrayBuffer) {
  const { env } = getRequestContext();

  const response = await env.AI.run("@cf/microsoft/resnet-50", {
    image: [...new Uint8Array(imageBuffer)],
  });

  return response;
}

// API 路由：AI 聊天
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { message } = await request.json();

  const response = await generateText(`User: ${message}\nAssistant:`);

  return Response.json({ response });
}
```

### Durable Objects

有状态边缘对象，适合实时协作、计数器等场景。

```typescript
// lib/counter.ts
export class Counter {
  state: DurableObjectState;
  value: number = 0;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage.get<number>("value");
      this.value = stored || 0;
    });
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    switch (url.pathname) {
      case "/increment":
        this.value++;
        await this.state.storage.put("value", this.value);
        return Response.json({ value: this.value });

      case "/decrement":
        this.value--;
        await this.state.storage.put("value", this.value);
        return Response.json({ value: this.value });

      case "/value":
        return Response.json({ value: this.value });

      default:
        return new Response("Not found", { status: 404 });
    }
  }
}

// 使用 Durable Object
// app/api/counter/route.ts
import { getRequestContext } from "@opennextjs/cloudflare";

export async function GET() {
  const { env } = getRequestContext();
  const id = env.COUNTER.idFromName("global");
  const stub = env.COUNTER.get(id);

  const response = await stub.fetch("https://counter/value");
  return response;
}

export async function POST() {
  const { env } = getRequestContext();
  const id = env.COUNTER.idFromName("global");
  const stub = env.COUNTER.get(id);

  const response = await stub.fetch("https://counter/increment");
  return response;
}
```

### Queues 消息队列

异步任务处理。

```typescript
// 发送消息到队列
// app/api/tasks/route.ts
import { getRequestContext } from "@opennextjs/cloudflare";

export async function POST(request: Request) {
  const { env } = getRequestContext();
  const task = await request.json();

  await env.MY_QUEUE.send({
    type: "email",
    to: task.email,
    subject: task.subject,
    body: task.body,
  });

  return Response.json({ success: true, message: "Task queued" });
}

// 队列消费者 (在 wrangler.jsonc 中配置)
export default {
  async queue(batch: MessageBatch, env: Env) {
    for (const message of batch.messages) {
      const task = message.body as EmailTask;

      try {
        await sendEmail(task);
        message.ack();
      } catch (error) {
        message.retry();
      }
    }
  },
};
```

## 常用命令

```bash
# 认证
wrangler login                    # 浏览器登录
wrangler logout                   # 登出
wrangler whoami                   # 查看当前用户

# 开发
pnpm dev                          # 启动开发服务器 (Node.js)
pnpm preview                      # 本地预览 (Workers 环境)
wrangler dev                      # Wrangler 开发模式

# 部署
pnpm deploy                       # 构建并部署
wrangler deploy                   # 仅部署
wrangler rollback                 # 回滚到上一版本

# KV 管理
wrangler kv namespace list        # 列出 KV 命名空间
wrangler kv namespace create <name>  # 创建 KV 命名空间
wrangler kv key list --namespace-id <id>  # 列出键
wrangler kv key get <key> --namespace-id <id>  # 获取值
wrangler kv key put <key> <value> --namespace-id <id>  # 设置值

# D1 数据库
wrangler d1 list                  # 列出数据库
wrangler d1 create <name>         # 创建数据库
wrangler d1 execute <db> --command "SELECT * FROM users"  # 执行 SQL
wrangler d1 migrations list <db>  # 列出迁移
wrangler d1 migrations apply <db> # 应用迁移

# R2 存储
wrangler r2 bucket list           # 列出存储桶
wrangler r2 bucket create <name>  # 创建存储桶
wrangler r2 object list <bucket>  # 列出对象
wrangler r2 object get <bucket> <key>  # 获取对象

# 日志
wrangler tail                     # 实时日志
wrangler tail --format pretty     # 格式化日志

# 密钥管理
wrangler secret list              # 列出密钥
wrangler secret put <name>        # 设置密钥
wrangler secret delete <name>     # 删除密钥

# 类型生成
pnpm cf-typegen                   # 生成 Cloudflare 环境类型
```

## 自定义域名

### 添加域名

```bash
# 方式一：Cloudflare Dashboard
# Workers & Pages → 项目 → Custom domains → Add custom domain

# 方式二：API
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/domains" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  --data '{"name":"halolight-cloudflare.h7ml.cn"}'
```

### DNS 配置

如果域名已在 Cloudflare：

```
# 自动配置，无需手动设置
```

如果域名在其他服务商：

```
# CNAME 记录
类型: CNAME
名称: halolight-cloudflare
值: <project-name>.pages.dev

# 或使用自定义域名
类型: CNAME
名称: halolight-cloudflare
值: <custom-domain-target>.pages.dev
```

### SSL/TLS

Cloudflare Pages 自动配置 HTTPS：
- 自动申请 SSL 证书
- 自动续期
- 默认启用 TLS 1.3
- 支持 HTTP/2 和 HTTP/3

### 边缘证书设置

```bash
# 在 Cloudflare Dashboard → SSL/TLS → Edge Certificates

# 推荐配置：
# - SSL Mode: Full (strict)
# - Minimum TLS Version: TLS 1.2
# - TLS 1.3: Enabled
# - Automatic HTTPS Rewrites: Enabled
```

## 常见问题

### Q：“Cannot find module ‘fs’” 错误？

A：Edge Runtime 不支持 Node.js 内置模块。解决方案：
1. 使用 Web API 替代
2. 确保代码仅在客户端运行
3. 使用 `nodejs_compat` 兼容标志

```jsonc
// wrangler.jsonc
{
  "compatibility_flags": ["nodejs_compat"]
}
```

### Q：构建体积过大？

A：优化建议：
1. 检查依赖是否有 Node.js 专用代码
2. 使用动态导入拆分代码
3. 移除未使用的依赖
4. 使用 `@cloudflare/next-on-pages` 分析器

```bash
npx @cloudflare/next-on-pages --info
```

### Q：冷启动慢？

A：优化方案：
1. 减少 Worker 脚本体积
2. 使用 Smart Placement 就近部署
3. 预热关键路径
4. 考虑使用 Durable Objects 保持状态

### Q：D1 数据库连接超时？

A：D1 是边缘数据库，注意：
1. 单次查询限制 100ms CPU 时间
2. 批量操作使用事务
3. 避免复杂 JOIN 查询

```typescript
// 使用批量操作
const batch = [
  db.prepare("INSERT INTO users VALUES (?, ?)").bind(1, "Alice"),
  db.prepare("INSERT INTO users VALUES (?, ?)").bind(2, "Bob"),
];
await db.batch(batch);
```

### Q：KV 读取延迟高？

A：KV 特性：
- 写入后约 60 秒全球同步
- 适合读多写少场景
- 高频写入使用 Durable Objects

### Q：如何调试生产环境？

A：使用以下方法：
1. `wrangler tail` 实时查看日志
2. 添加 `console.log` 输出调试信息
3. 使用 Cloudflare Dashboard → Workers → 日志

```bash
# 实时日志
wrangler tail --format pretty

# 过滤错误
wrangler tail --status error
```

### Q：ISR 不生效？

A：确保配置 R2 缓存：

```typescript
// open-next.config.ts
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

并在 `wrangler.jsonc` 中绑定 R2 bucket。

## 费用说明

### Workers 计费

| 计划 | 价格 | 包含额度 |
|------|------|----------|
| Free | 免费 | 10 万请求/天 |
| Paid | $5/月起 | 1000 万请求/月 |

### 详细费用

| 资源 | 免费额度 | 超出价格 |
|------|----------|----------|
| Workers 请求 | 10 万/天 | $0.15/百万 |
| CPU 时间 | 10ms/请求 | $0.02/百万 ms |
| KV 读取 | 10 万/天 | $0.50/百万 |
| KV 写入 | 1 千/天 | $5.00/百万 |
| D1 读取 | 500 万/天 | $0.001/百万 |
| D1 写入 | 10 万/天 | $1.00/百万 |
| R2 存储 | 10GB | $0.015/GB/月 |
| R2 A 类操作 | 100 万/月 | $4.50/百万 |
| R2 B 类操作 | 1000 万/月 | $0.36/百万 |
| Workers AI | 按模型计费 | 见官网 |

### 性价比配置

```jsonc
// 小型项目（免费）
{
  "compatibility_flags": ["nodejs_compat"],
  // 使用 KV 缓存，不使用 R2
}

// 中型项目（$5-20/月）
{
  "kv_namespaces": [...],
  "d1_databases": [...],
  // 添加 D1 数据库
}

// 大型项目（$50+/月）
{
  "kv_namespaces": [...],
  "d1_databases": [...],
  "r2_buckets": [...],
  "durable_objects": {...},
  // 全功能配置
}
```

## 与其他平台对比

| 特性 | Cloudflare | Vercel Edge | AWS Lambda@Edge |
|------|------------|-------------|-----------------|
| 全球节点 | 300+ | 无公开数据 | 13 |
| 冷启动 | < 50ms | < 100ms | 100-500ms |
| 免费请求 | 10 万/天 | 100 万/月 | 100 万/月 |
| 边缘数据库 | ✅ D1 | ❌ | ❌ |
| KV 存储 | ✅ 内置 | ✅ Vercel KV | ❌ 需外部 |
| 对象存储 | ✅ R2 (零出口费) | ✅ Vercel Blob | ✅ S3 (有出口费) |
| AI 推理 | ✅ Workers AI | ❌ | ✅ SageMaker |
| 实时协作 | ✅ Durable Objects | ❌ | ❌ |
| 消息队列 | ✅ Queues | ❌ | ✅ SQS |
| 脚本大小限制 | 10MB | 4MB | 50MB |
| 执行时间限制 | 30s | 25s | 30s |

## 部署架构

```
用户请求 → Cloudflare CDN (300+ 节点)
              ↓
         Cloudflare Workers (Edge)
              ↓
    ┌─────────┼─────────┬─────────┐
    ↓         ↓         ↓         ↓
   KV       D1        R2      外部 API
 (缓存)   (数据库)  (存储)    (后端)
```

## 相关链接

- [在线预览 (Cloudflare)](https://halolight-cloudflare.h7ml.cn)
- [在线预览 (原版 Vercel)](https://halolight.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-cloudflare)
- [OpenNext 文档](https://opennext.js.org/cloudflare)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Cloudflare R2 文档](https://developers.cloudflare.com/r2/)
- [Cloudflare KV 文档](https://developers.cloudflare.com/kv/)
- [Workers AI 文档](https://developers.cloudflare.com/workers-ai/)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
