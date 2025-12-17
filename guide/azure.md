# Azure 部署

HaloLight Azure 部署版本，面向企业级 Microsoft 生态的部署方案。

**在线预览**：[https://halolight-azure.h7ml.cn](https://halolight-azure.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-azure](https://github.com/halolight/halolight-azure)

## 特性

- ☁️ **Static Web Apps** - 全球分布式静态站点托管
- ⚡ **Azure Functions** - Serverless 函数计算
- 🔐 **Azure AD** - 企业身份认证与 SSO
- 🌐 **Azure CDN** - 全球 CDN 加速
- 📊 **Application Insights** - 应用性能监控
- 🔒 **企业级安全** - Microsoft 合规认证
- 🗄️ **Cosmos DB** - 全球分布式数据库
- 📦 **Container Apps** - 容器化部署支持

## 快速开始

### 方式一：GitHub Actions 部署 (推荐)

1. Fork [halolight-azure](https://github.com/halolight/halolight-azure) 仓库
2. 在 Azure Portal 创建 Static Web App
3. 选择 GitHub 作为源
4. 授权并选择仓库
5. Azure 自动生成 GitHub Actions 工作流

### 方式二：Azure CLI 部署

```bash
# 安装 Azure CLI
# macOS
brew install azure-cli

# Windows
winget install -e --id Microsoft.AzureCLI

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# 登录 Azure
az login

# 创建资源组
az group create \
  --name halolight-rg \
  --location eastasia

# 创建 Static Web App
az staticwebapp create \
  --name halolight \
  --resource-group halolight-rg \
  --source https://github.com/halolight/halolight-azure \
  --branch main \
  --app-location "/" \
  --output-location ".next" \
  --login-with-github

# 查看部署状态
az staticwebapp show \
  --name halolight \
  --resource-group halolight-rg
```

### 方式三：VS Code 扩展

1. 安装 [Azure Static Web Apps 扩展](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)
2. 登录 Azure 账号
3. 右键点击项目 → “Create Static Web App...”
4. 按向导完成配置

## 配置文件

### staticwebapp.config.json

```json
{
  "$schema": "https://json.schemastore.org/staticwebapp.config.json",
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/api/*", "/_next/*", "/static/*", "*.{css,js,json,ico,png,jpg,svg}"]
  },
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/admin/*",
      "allowedRoles": ["admin"]
    },
    {
      "route": "/login",
      "rewrite": "/.auth/login/aad"
    },
    {
      "route": "/logout",
      "redirect": "/.auth/logout"
    },
    {
      "route": "/.auth/login/github",
      "statusCode": 404
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/.auth/login/aad",
      "statusCode": 302
    },
    "404": {
      "rewrite": "/404.html"
    }
  },
  "globalHeaders": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  },
  "mimeTypes": {
    ".json": "application/json",
    ".woff2": "font/woff2"
  },
  "platform": {
    "apiRuntime": "node:20"
  }
}
```

### GitHub Actions 工作流

```yaml
# .github/workflows/azure-static-web-apps.yml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches: [main]

jobs:
  build_and_deploy:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_API_URL: /api
          NEXT_PUBLIC_MOCK: false

      - name: Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: "api"
          output_location: ".next"

  close_pull_request:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request
    steps:
      - name: Close Pull Request
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

## 环境变量

在 Azure Portal → Static Web App → Configuration 设置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `NEXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `AZURE_AD_CLIENT_ID` | Azure AD 客户端 ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `AZURE_AD_TENANT_ID` | Azure AD 租户 ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `DATABASE_URL` | 数据库连接字符串 | `mongodb://...` |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | Application Insights 连接 | `InstrumentationKey=...` |

### 设置方式

```bash
# Azure CLI 设置
az staticwebapp appsettings set \
  --name halolight \
  --resource-group halolight-rg \
  --setting-names \
    NEXT_PUBLIC_API_URL=/api \
    NEXT_PUBLIC_MOCK=false

# 查看设置
az staticwebapp appsettings list \
  --name halolight \
  --resource-group halolight-rg
```

## Azure Functions

### 基础函数

```typescript
// api/hello/index.ts
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const name = req.query.name || req.body?.name || "World";

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
    },
  };
};

export default httpTrigger;
```

### function.json 配置

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post"],
      "route": "hello"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

### 定时触发函数

```typescript
// api/scheduled-task/index.ts
import { AzureFunction, Context } from "@azure/functions";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  const timestamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("Timer is running late!");
  }

  context.log("Timer trigger executed at:", timestamp);

  // 执行定时任务
  await processScheduledTask();
};

export default timerTrigger;
```

```json
// api/scheduled-task/function.json
{
  "bindings": [
    {
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 0 9 * * *"
    }
  ]
}
```

### Cosmos DB 绑定

```typescript
// api/users/index.ts
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  documents: any[]
): Promise<void> {
  context.res = {
    status: 200,
    body: documents,
  };
};

export default httpTrigger;
```

```json
// api/users/function.json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    },
    {
      "type": "cosmosDB",
      "direction": "in",
      "name": "documents",
      "databaseName": "halolight",
      "containerName": "users",
      "connection": "CosmosDBConnection",
      "sqlQuery": "SELECT * FROM c"
    }
  ]
}
```

## Azure AD 集成

### 配置 MSAL

```typescript
// lib/msal-config.ts
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "/",
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["User.Read", "openid", "profile", "email"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
```

### MsalProvider 组件

```tsx
// providers/msal-provider.tsx
"use client";

import { MsalProvider as MsalProviderBase } from "@azure/msal-react";
import { msalInstance } from "@/lib/msal-config";

export function MsalProvider({ children }: { children: React.ReactNode }) {
  return (
    <MsalProviderBase instance={msalInstance}>
      {children}
    </MsalProviderBase>
  );
}
```

### 登录组件

```tsx
// components/auth/azure-login.tsx
"use client";

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal-config";
import { Button } from "@/components/ui/button";

export function AzureLogin() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  if (accounts.length > 0) {
    return (
      <div className="flex items-center gap-4">
        <span>Welcome, {accounts[0].name}</span>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleLogin}>
      Sign in with Microsoft
    </Button>
  );
}
```

### 获取用户信息

```typescript
// lib/graph.ts
import { graphConfig } from "./msal-config";

export async function getGraphData(accessToken: string) {
  const response = await fetch(graphConfig.graphMeEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}
```

## Application Insights

### 配置监控

```typescript
// lib/app-insights.ts
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: null },
    },
    enableAutoRouteTracking: true,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
  },
});

appInsights.loadAppInsights();

export { appInsights, reactPlugin };
```

### 自定义遥测

```typescript
// lib/telemetry.ts
import { appInsights } from "./app-insights";

// 追踪页面浏览
export function trackPageView(name: string, properties?: Record<string, string>) {
  appInsights.trackPageView({ name, properties });
}

// 追踪事件
export function trackEvent(name: string, properties?: Record<string, string>) {
  appInsights.trackEvent({ name, properties });
}

// 追踪异常
export function trackException(error: Error, severityLevel?: number) {
  appInsights.trackException({ exception: error, severityLevel });
}

// 追踪指标
export function trackMetric(name: string, average: number) {
  appInsights.trackMetric({ name, average });
}
```

## Cosmos DB 集成

### 初始化客户端

```typescript
// lib/cosmos.ts
import { CosmosClient, Database, Container } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);

let database: Database;
let usersContainer: Container;

export async function initCosmosDB() {
  const { database: db } = await client.databases.createIfNotExists({
    id: "halolight",
  });
  database = db;

  const { container } = await database.containers.createIfNotExists({
    id: "users",
    partitionKey: { paths: ["/id"] },
  });
  usersContainer = container;

  return { database, usersContainer };
}

export async function getUsers() {
  const { resources } = await usersContainer.items
    .query("SELECT * FROM c")
    .fetchAll();
  return resources;
}

export async function createUser(user: any) {
  const { resource } = await usersContainer.items.create(user);
  return resource;
}
```

## 常用命令

```bash
# 登录
az login

# 资源组管理
az group list
az group create --name halolight-rg --location eastasia
az group delete --name halolight-rg

# Static Web App 管理
az staticwebapp list
az staticwebapp show --name halolight --resource-group halolight-rg
az staticwebapp delete --name halolight --resource-group halolight-rg

# 环境配置
az staticwebapp appsettings set --name halolight --setting-names KEY=value
az staticwebapp appsettings list --name halolight

# 自定义域名
az staticwebapp hostname set --name halolight --hostname halolight-azure.h7ml.cn
az staticwebapp hostname list --name halolight

# Functions 管理
az functionapp list
az functionapp log tail --name halolight-api

# 部署
az staticwebapp environment list --name halolight
az staticwebapp users list --name halolight
```

## 自定义域名

### 添加域名

```bash
# CLI 方式
az staticwebapp hostname set \
  --name halolight \
  --hostname halolight-azure.h7ml.cn

# 查看域名配置
az staticwebapp hostname list --name halolight
```

### DNS 配置

```
# CNAME 记录
类型: CNAME
名称: halolight-azure
值: <app-name>.azurestaticapps.net

# TXT 记录 (验证所有权)
类型: TXT
名称: _dnsauth.halolight-azure
值: <validation-token>
```

### HTTPS

Azure Static Web Apps 自动配置 HTTPS：
- 自动申请免费 SSL 证书
- 自动续期
- 支持自定义证书上传

## 常见问题

### Q：部署失败怎么办？

A：检查以下几点：
1. 查看 GitHub Actions 日志
2. 确认 `app_location` 和 `output_location` 配置正确
3. 检查 Azure Static Web Apps API Token 是否有效
4. 确认 Node.js 版本兼容

### Q：API 路由 404？

A：检查 `staticwebapp.config.json` 配置：
1. 确认 `api_location` 指向正确目录
2. 检查 function.json 的 route 配置
3. 确认 Functions 已正确部署

### Q：Azure AD 登录失败？

A：检查以下配置：
1. Azure AD 应用注册的重定向 URI
2. 客户端 ID 和租户 ID 是否正确
3. API 权限是否已授权

### Q：如何启用 CORS？

A：在 `staticwebapp.config.json` 中配置：

```json
{
  "globalHeaders": {
    "Access-Control-Allow-Origin": "https://your-domain.com",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  }
}
```

## 费用说明

| 计划 | 价格 | 特性 |
|------|------|------|
| Free | 免费 | 100GB 带宽，2 自定义域名，内置身份验证 |
| Standard | $9/应用/月 | 无限带宽，5 自定义域名，SLA 99.95% |
| Enterprise | 联系销售 | 私有端点，企业 SLA，专属支持 |

### Functions 计费

| 资源 | 免费额度 | 超出价格 |
|------|----------|----------|
| 执行次数 | 100 万次/月 | $0.20/百万次 |
| 资源消耗 | 40 万 GB-s/月 | $0.000016/GB-s |

## 与其他平台对比

| 特性 | Azure Static Web Apps | Vercel | Netlify |
|------|----------------------|--------|---------|
| 全球边缘 | ✅ | ✅ | ✅ |
| Serverless Functions | ✅ Azure Functions | ✅ Edge/Serverless | ✅ Functions |
| 企业 SSO | ✅ Azure AD 原生 | ⚠️ 需集成 | ⚠️ 需集成 |
| 托管数据库 | ✅ Cosmos DB/SQL | ❌ 需外部 | ❌ 需外部 |
| 免费额度 | 100GB | 100GB | 100GB |
| 企业合规 | ✅ SOC/ISO/HIPAA | ⚠️ 有限 | ⚠️ 有限 |

## 相关链接

- [在线预览](https://halolight-azure.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-azure)
- [Azure Static Web Apps 文档](https://docs.microsoft.com/azure/static-web-apps)
- [Azure Functions 文档](https://docs.microsoft.com/azure/azure-functions)
- [Azure AD 文档](https://docs.microsoft.com/azure/active-directory)
- [MSAL.js 文档](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
