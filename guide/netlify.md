# Netlify 部署

HaloLight Netlify 部署版本，针对 Netlify 平台优化的一键部署方案。

**在线预览**：[https://halolight-netlify.h7ml.cn](https://halolight-netlify.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-netlify](https://github.com/halolight/halolight-netlify)

## 特性

- 🔷 **一键部署** - Deploy to Netlify 按钮快速上线
- ⚡ **全球 CDN** - 300+ 边缘节点极速分发
- 🔄 **自动 CI/CD** - Git 推送自动构建部署
- 📝 **表单处理** - 无需后端的表单提交
- 🔐 **Identity** - 内置用户认证服务
- 🌐 **Functions** - Serverless 函数 (AWS Lambda)
- 🔗 **Split Testing** - A/B 测试与分流
- 📊 **Analytics** - 服务端分析 (付费)

## 快速开始

### 方式一：一键部署 (推荐)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/halolight/halolight-netlify)

点击按钮后：
1. 登录 Netlify 账号 (支持 GitHub/GitLab/Bitbucket)
2. 授权访问仓库
3. 配置环境变量
4. 自动克隆并部署

### 方式二：CLI 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 克隆项目
git clone https://github.com/halolight/halolight-netlify.git
cd halolight-netlify

# 安装依赖
pnpm install

# 初始化 Netlify 站点
netlify init

# 本地开发 (带 Functions)
netlify dev

# 部署到生产
netlify deploy --prod
```

### 方式三：GitHub 集成

1. Fork [halolight-netlify](https://github.com/halolight/halolight-netlify) 仓库
2. 在 Netlify 控制台点击 “Add new site” → “Import an existing project”
3. 选择 GitHub 并授权
4. 选择你的 Fork 仓库
5. 配置构建设置并部署

## 配置文件

### netlify.toml

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "9"

# Next.js 插件 (自动处理 SSR/ISR)
[[plugins]]
  package = "@netlify/plugin-nextjs"

# 生产环境
[context.production]
  command = "pnpm build"

[context.production.environment]
  NEXT_PUBLIC_MOCK = "false"

# 预览环境 (分支部署)
[context.deploy-preview]
  command = "pnpm build"

[context.deploy-preview.environment]
  NEXT_PUBLIC_MOCK = "true"

# 分支部署
[context.branch-deploy]
  command = "pnpm build"

# 重定向规则
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

# SPA 回退
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

# 自定义头
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### package.json 脚本

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "netlify:dev": "netlify dev",
    "netlify:build": "netlify build",
    "netlify:deploy": "netlify deploy --prod"
  }
}
```

## 环境变量

在 Netlify 控制台 → Site settings → Environment variables 设置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NODE_ENV` | 运行环境 | `production` |
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `NEXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `DATABASE_URL` | 数据库连接 | `postgresql://...` |

### 环境变量作用域

Netlify 支持按部署上下文配置变量：

```
Production     - 生产环境变量
Deploy Preview - PR 预览环境变量
Branch Deploy  - 分支部署变量
All            - 所有环境共享
```

## Serverless Functions

### 基础函数

```typescript
// netlify/functions/hello.ts
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const { httpMethod, body, queryStringParameters } = event;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello from Netlify Functions!",
      method: httpMethod,
      query: queryStringParameters,
    }),
  };
};
```

### 后台函数 (长时间运行)

```typescript
// netlify/functions/background-task.ts
import type { BackgroundHandler } from "@netlify/functions";

export const handler: BackgroundHandler = async (event) => {
  // 最长运行 15 分钟
  console.log("Processing background task...");

  // 执行耗时操作
  await processLongRunningTask(event.body);

  // 后台函数不返回响应
};

// 配置为后台函数
export const config = {
  type: "background",
};
```

### 定时函数 (Scheduled Functions)

```typescript
// netlify/functions/daily-report.ts
import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  console.log("Generating daily report...");

  await generateReport();

  return {
    statusCode: 200,
    body: "Report generated",
  };
};

// 每天 UTC 9:00 执行
export const config = {
  schedule: "0 9 * * *",
};
```

### Edge Functions

```typescript
// netlify/edge-functions/geolocation.ts
import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const { country, city } = context.geo;

  // 基于地理位置的响应
  return new Response(
    JSON.stringify({
      country,
      city,
      message: `Hello from ${city}, ${country}!`,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const config = {
  path: "/api/geo",
};
```

## Netlify Identity

### 配置认证

```typescript
// lib/netlify-identity.ts
import netlifyIdentity from "netlify-identity-widget";

// 初始化
netlifyIdentity.init({
  container: "#netlify-modal",
  locale: "zh",
});

// 登录
export function login() {
  netlifyIdentity.open("login");
}

// 注册
export function signup() {
  netlifyIdentity.open("signup");
}

// 登出
export function logout() {
  netlifyIdentity.logout();
}

// 获取当前用户
export function getCurrentUser() {
  return netlifyIdentity.currentUser();
}

// 监听认证状态
netlifyIdentity.on("login", (user) => {
  console.log("User logged in:", user);
  netlifyIdentity.close();
});

netlifyIdentity.on("logout", () => {
  console.log("User logged out");
});
```

### 保护函数

```typescript
// netlify/functions/protected.ts
import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const { user } = event.context.clientContext || {};

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${user.email}!`,
      roles: user.app_metadata?.roles || [],
    }),
  };
};
```

## 表单处理

### HTML 表单

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden">
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>
  <p>
    <label>Email: <input type="email" name="email" required /></label>
  </p>
  <p>
    <label>Message: <textarea name="message" required></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
```

### React 表单

```tsx
// components/ContactForm.tsx
"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      {/* 表单字段 */}
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      {status === "success" && <p>Message sent!</p>}
      {status === "error" && <p>Error sending message</p>}
    </form>
  );
}
```

## 常用命令

```bash
# 登录
netlify login

# 查看站点状态
netlify status

# 本地开发
netlify dev

# 构建
netlify build

# 部署预览
netlify deploy

# 部署到生产
netlify deploy --prod

# 打开站点
netlify open

# 打开控制台
netlify open:admin

# 查看日志
netlify logs

# 环境变量
netlify env:list
netlify env:set KEY value
netlify env:unset KEY

# 链接到站点
netlify link

# 取消链接
netlify unlink
```

## 监控与日志

### 查看日志

```bash
# CLI 查看日志
netlify logs

# 实时日志流
netlify logs --live

# 查看函数日志
netlify logs:function hello
```

### Build Plugins

```toml
# netlify.toml

# 性能分析
[[plugins]]
  package = "netlify-plugin-lighthouse"

# 缓存优化
[[plugins]]
  package = "netlify-plugin-cache"
  [plugins.inputs]
    paths = [".next/cache", "node_modules/.cache"]

# 提交状态通知
[[plugins]]
  package = "netlify-plugin-checklinks"
```

## 自定义域名

### 添加域名

1. 进入站点设置 → Domain management
2. 点击 “Add custom domain”
3. 输入你的域名

### DNS 配置

```
# A 记录 (根域名)
类型: A
名称: @
值: 75.2.60.5

# CNAME 记录 (子域名)
类型: CNAME
名称: www
值: your-site.netlify.app
```

### HTTPS

Netlify 自动配置 HTTPS：
- 自动申请 Let's Encrypt 证书
- 自动续期
- 强制 HTTPS 重定向

## 分支部署与预览

### Deploy Contexts

| 上下文 | 触发条件 | URL 格式 |
|--------|----------|----------|
| Production | main 分支 push | `your-site.netlify.app` |
| Deploy Preview | PR 创建/更新 | `deploy-preview-123--your-site.netlify.app` |
| Branch Deploy | 其他分支 push | `branch-name--your-site.netlify.app` |

### 锁定部署

```bash
# 锁定当前部署 (停止自动部署)
netlify deploy:lock

# 解锁
netlify deploy:unlock
```

## 常见问题

### Q：构建失败怎么办？

A：检查以下几点：
1. 查看构建日志，确认依赖安装正确
2. 确认 `pnpm-lock.yaml` 已提交
3. 检查 Node.js 版本 (build.environment.NODE_VERSION)
4. 确认构建命令正确

### Q：如何回滚部署？

A：在 Deploys 页面：
1. 找到之前的成功部署
2. 点击 “Publish deploy”
3. 或使用 CLI：`netlify rollback`

### Q：Functions 冷启动慢？

A：优化建议：
1. 减少函数包大小
2. 使用 Edge Functions (无冷启动)
3. 使用 Background Functions 处理耗时任务

### Q：如何设置重定向？

A：在 `netlify.toml` 或 `_redirects` 文件中配置：

```toml
# netlify.toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301

# 代理
[[redirects]]
  from = "/api/*"
  to = "https://api.example.com/:splat"
  status = 200
```

## 费用说明

| 计划 | 价格 | 特性 |
|------|------|------|
| Starter | 免费 | 100GB 带宽，300 分钟构建 |
| Pro | $19/成员/月 | 1TB 带宽，25000 分钟构建 |
| Business | $99/成员/月 | 自定义 SLA，SSO |
| Enterprise | 联系销售 | 专属支持，合规认证 |

### Functions 配额

| 计划 | 调用次数 | 运行时间 |
|------|----------|----------|
| Starter | 125K/月 | 100 小时 |
| Pro | 无限 | 1000 小时 |

## 与其他平台对比

| 特性 | Netlify | Vercel | Cloudflare |
|------|---------|--------|------------|
| 一键部署 | ✅ | ✅ | ✅ |
| Edge Functions | ✅ | ✅ | ✅ |
| 表单处理 | ✅ 内置 | ❌ 需外部 | ❌ 需外部 |
| Identity | ✅ 内置 | ❌ 需外部 | ✅ Access |
| 免费带宽 | 100GB | 100GB | 无限 |
| 免费构建 | 300 分钟 | 6000 分钟 | 500 次 |
| Split Testing | ✅ | ⚠️ 有限 | ❌ |

## 相关链接

- [在线预览](https://halolight-netlify.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-netlify)
- [Netlify 官方文档](https://docs.netlify.com)
- [Netlify CLI 文档](https://cli.netlify.com)
- [Netlify Functions 文档](https://docs.netlify.com/functions/overview)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
