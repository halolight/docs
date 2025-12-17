# Vercel 部署

HaloLight Vercel 部署版本，针对 Vercel 平台优化的部署方案，提供最佳的 Next.js 部署体验。

**在线预览**：[https://halolight-vercel.h7ml.cn](https://halolight-vercel.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-vercel](https://github.com/halolight/halolight-vercel)

## 特性

- ▲ **Vercel 原生** - Next.js 官方部署平台，零配置部署
- ⚡ **Edge Functions** - 边缘计算，全球低延迟
- 🌐 **全球边缘网络** - 100+ 边缘节点极速分发
- 🔄 **预览部署** - PR 自动预览环境
- 📊 **Analytics** - 内置 Web Vitals 分析
- 🔐 **环境变量** - 安全的密钥管理
- 🖼️ **Image Optimization** - 自动图片优化
- 💾 **KV/Blob/Postgres** - Vercel 存储服务

## 快速开始

### 方式一：一键部署 (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-vercel)

点击按钮后：
1. 登录 Vercel 账号 (支持 GitHub/GitLab/Bitbucket)
2. 选择团队/个人账号
3. 配置项目名称和环境变量
4. 自动克隆并部署

### 方式二：Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 克隆项目
git clone https://github.com/halolight/halolight-vercel.git
cd halolight-vercel

# 安装依赖
pnpm install

# 本地开发
pnpm dev

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

### 方式三：GitHub 集成

1. Fork [halolight-vercel](https://github.com/halolight/halolight-vercel) 仓库
2. 访问 [vercel.com/new](https://vercel.com/new)
3. 导入你的 GitHub 仓库
4. 配置环境变量
5. 点击 Deploy

## 配置文件

### vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hkg1", "sin1", "nrt1"],
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "crons": [
    {
      "path": "/api/cron/daily-report",
      "schedule": "0 9 * * *"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/proxy/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.h7ml.cn",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## 环境变量

在 Vercel 控制台 → Settings → Environment Variables 设置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `NEXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `DATABASE_URL` | 数据库连接字符串 | `postgresql://...` |
| `JWT_SECRET` | JWT 密钥 | `your-secret-key` |
| `VERCEL_URL` | 部署 URL (自动) | `your-app.vercel.app` |
| `KV_REST_API_URL` | Vercel KV URL | `https://xxx.kv.vercel-storage.com` |
| `KV_REST_API_TOKEN` | Vercel KV Token | `xxx` |

### 环境变量作用域

```
Production     - 生产环境 (main 分支)
Preview        - 预览环境 (其他分支/PR)
Development    - 本地开发 (vercel dev)
```

### CLI 管理

```bash
# 查看环境变量
vercel env ls

# 添加环境变量
vercel env add VARIABLE_NAME

# 删除环境变量
vercel env rm VARIABLE_NAME

# 拉取到本地 .env.local
vercel env pull
```

## Edge Functions

### 基础 Edge 函数

```typescript
// app/api/edge/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "World";

  return NextResponse.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    region: request.headers.get("x-vercel-id")?.split("::")[0],
  });
}
```

### 地理位置 Edge 函数

```typescript
// app/api/geo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const geo = geolocation(request);

  return NextResponse.json({
    country: geo.country,
    city: geo.city,
    region: geo.countryRegion,
    latitude: geo.latitude,
    longitude: geo.longitude,
    ip: request.ip,
  });
}
```

### Edge Middleware

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  // 获取地理位置
  const country = request.geo?.country || "US";

  // 基于位置的重定向
  if (country === "CN" && !request.nextUrl.pathname.startsWith("/cn")) {
    return NextResponse.redirect(new URL("/cn" + request.nextUrl.pathname, request.url));
  }

  // 添加自定义头
  const response = NextResponse.next();
  response.headers.set("x-country", country);

  return response;
}
```

## Serverless Functions

### API 路由

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // 获取用户列表
  const users = await getUsers({ page, limit });

  return NextResponse.json({
    success: true,
    data: users,
    pagination: { page, limit },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 创建用户
  const user = await createUser(body);

  return NextResponse.json({
    success: true,
    data: user,
  }, { status: 201 });
}
```

### 流式响应

```typescript
// app/api/stream/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const data = JSON.stringify({ count: i, timestamp: Date.now() });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

## Vercel 存储服务

### Vercel KV (Redis)

```typescript
// lib/kv.ts
import { kv } from "@vercel/kv";

// 设置值
export async function setUser(id: string, user: User) {
  await kv.set(`user:${id}`, JSON.stringify(user));
  await kv.expire(`user:${id}`, 3600); // 1 小时过期
}

// 获取值
export async function getUser(id: string): Promise<User | null> {
  const data = await kv.get<string>(`user:${id}`);
  return data ? JSON.parse(data) : null;
}

// 哈希操作
export async function setSession(sessionId: string, data: SessionData) {
  await kv.hset(`session:${sessionId}`, data);
}

// 列表操作
export async function addNotification(userId: string, notification: string) {
  await kv.lpush(`notifications:${userId}`, notification);
  await kv.ltrim(`notifications:${userId}`, 0, 99); // 保留最近 100 条
}
```

### Vercel Blob

```typescript
// lib/blob.ts
import { put, del, list } from "@vercel/blob";

// 上传文件
export async function uploadFile(file: File, folder: string) {
  const blob = await put(`${folder}/${file.name}`, file, {
    access: "public",
    contentType: file.type,
  });

  return blob.url;
}

// 删除文件
export async function deleteFile(url: string) {
  await del(url);
}

// 列出文件
export async function listFiles(prefix: string) {
  const { blobs } = await list({ prefix });
  return blobs;
}
```

### Vercel Postgres

```typescript
// lib/postgres.ts
import { sql } from "@vercel/postgres";

// 查询
export async function getUsers() {
  const { rows } = await sql`SELECT * FROM users ORDER BY created_at DESC`;
  return rows;
}

// 插入
export async function createUser(email: string, name: string) {
  const { rows } = await sql`
    INSERT INTO users (email, name)
    VALUES (${email}, ${name})
    RETURNING *
  `;
  return rows[0];
}

// 事务
export async function transferCredits(fromId: string, toId: string, amount: number) {
  await sql`BEGIN`;
  try {
    await sql`UPDATE users SET credits = credits - ${amount} WHERE id = ${fromId}`;
    await sql`UPDATE users SET credits = credits + ${amount} WHERE id = ${toId}`;
    await sql`COMMIT`;
  } catch (error) {
    await sql`ROLLBACK`;
    throw error;
  }
}
```

## Cron Jobs

### 配置定时任务

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/daily-report",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 * * 0"
    }
  ]
}
```

### Cron 处理函数

```typescript
// app/api/cron/daily-report/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 验证 Cron 密钥
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 执行定时任务
  await generateDailyReport();

  return NextResponse.json({ success: true });
}
```

## 常用命令

```bash
# 登录
vercel login

# 部署预览
vercel

# 部署生产
vercel --prod

# 本地开发 (模拟 Vercel 环境)
vercel dev

# 查看项目
vercel ls

# 查看部署
vercel inspect <deployment-url>

# 查看日志
vercel logs <deployment-url>

# 回滚
vercel rollback

# 域名管理
vercel domains ls
vercel domains add example.com

# 环境变量
vercel env ls
vercel env pull

# 项目设置
vercel project ls
vercel link
vercel unlink
```

## 监控与分析

### Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 自定义事件追踪

```typescript
// lib/analytics.ts
import { track } from "@vercel/analytics";

// 追踪自定义事件
export function trackEvent(name: string, properties?: Record<string, string | number>) {
  track(name, properties);
}

// 使用示例
trackEvent("button_click", { button_id: "submit", page: "/login" });
trackEvent("purchase", { amount: 99.99, currency: "USD" });
```

## 自定义域名

### 添加域名

```bash
# CLI 方式
vercel domains add halolight-vercel.h7ml.cn

# 查看域名
vercel domains ls

# 删除域名
vercel domains rm halolight-vercel.h7ml.cn
```

### DNS 配置

```
# A 记录
类型: A
名称: halolight-vercel
值: 76.76.21.21

# CNAME 记录 (推荐)
类型: CNAME
名称: halolight-vercel
值: cname.vercel-dns.com
```

### 通配符域名

```bash
# 添加通配符域名
vercel domains add "*.halolight.h7ml.cn"
```

## 常见问题

### Q：构建失败怎么办？

A：检查以下几点：
1. 查看构建日志中的错误信息
2. 确认 `pnpm-lock.yaml` 已提交
3. 检查 Node.js 版本兼容性
4. 确认环境变量已正确设置

### Q：如何回滚部署？

A：使用以下方式：

```bash
# CLI 回滚
vercel rollback

# 或在控制台
# Deployments → 选择之前的部署 → Promote to Production
```

### Q：Edge Function 超时？

A：优化建议：
1. Edge Functions 最大运行时间 25 秒
2. 减少外部 API 调用
3. 使用流式响应处理大数据
4. 考虑使用 Serverless Functions (最大 60 秒)

### Q：如何配置 ISR？

A：在页面中配置 revalidate：

```typescript
// app/posts/[id]/page.tsx
export const revalidate = 60; // 60 秒后重新验证

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return <Post data={post} />;
}
```

### Q：如何调试生产环境？

A：使用以下方法：
1. `vercel logs <url>` 查看实时日志
2. Vercel 控制台 → Functions → 查看执行日志
3. 使用 `console.log` 输出到日志
4. 配置 Source Maps 进行错误追踪

## 费用说明

| 计划 | 价格 | 特性 |
|------|------|------|
| Hobby | 免费 | 100GB 带宽，Serverless 100GB-Hrs |
| Pro | $20/成员/月 | 1TB 带宽，1000GB-Hrs，预览保护 |
| Enterprise | 联系销售 | 无限带宽，SLA，专属支持 |

### 用量计费

| 资源 | Hobby 免费额度 | Pro 免费额度 | 超出价格 |
|------|----------------|--------------|----------|
| 带宽 | 100GB | 1TB | $0.15/GB |
| Serverless | 100GB-Hrs | 1000GB-Hrs | $0.18/GB-Hr |
| Edge Functions | 500K 调用 | 1M 调用 | $0.65/M |
| Edge Middleware | 1M 调用 | 1M 调用 | $0.65/M |
| Image Optimization | 1000 次 | 5000 次 | $5/1000 次 |

## 与其他平台对比

| 特性 | Vercel | Netlify | Cloudflare |
|------|--------|---------|------------|
| Next.js 支持 | ✅ 官方最佳 | ✅ | ⚠️ 有限 |
| Edge Functions | ✅ | ✅ | ✅ Workers |
| 预览部署 | ✅ | ✅ | ✅ |
| 内置存储 | ✅ KV/Blob/Postgres | ❌ | ✅ KV/R2/D1 |
| 免费带宽 | 100GB | 100GB | 无限 |
| 免费构建 | 6000 分钟 | 300 分钟 | 500 次 |
| ISR 支持 | ✅ 原生 | ⚠️ 有限 | ❌ |

## 相关链接

- [在线预览](https://halolight-vercel.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-vercel)
- [Vercel 官方文档](https://vercel.com/docs)
- [Vercel CLI 文档](https://vercel.com/docs/cli)
- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions)
- [Vercel 存储服务](https://vercel.com/docs/storage)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
