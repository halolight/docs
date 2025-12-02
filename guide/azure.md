# Azure 部署

HaloLight Azure 部署版本，面向企业级 Microsoft 生态的部署方案。

## 特性

- ☁️ **Azure Static Web Apps** - 静态站点托管
- ⚡ **Azure Functions** - Serverless 函数
- 🔐 **Azure AD** - 企业身份认证
- 🌐 **Azure CDN** - 全球 CDN 加速
- 📊 **Application Insights** - 应用监控
- 🔒 **企业级安全** - Microsoft 安全合规

## 快速开始

### 方式一：GitHub Actions 部署

1. Fork 仓库到你的 GitHub
2. 在 Azure Portal 创建 Static Web App
3. 连接 GitHub 仓库
4. 自动生成 GitHub Actions 工作流

### 方式二：Azure CLI 部署

```bash
# 登录 Azure
az login

# 创建资源组
az group create --name halolight-rg --location eastasia

# 创建 Static Web App
az staticwebapp create \
  --name halolight \
  --resource-group halolight-rg \
  --source https://github.com/halolight/halolight-azure \
  --branch main \
  --app-location "/" \
  --output-location ".next" \
  --login-with-github
```

## 配置文件

### staticwebapp.config.json

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/api/*", "/_next/*", "/static/*"]
  },
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "globalHeaders": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff"
  },
  "mimeTypes": {
    ".json": "application/json"
  }
}
```

## Azure Functions

```typescript
// api/hello/index.ts
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res = {
    status: 200,
    body: { message: "Hello from Azure Functions!" }
  }
}

export default httpTrigger
```

## Azure AD 集成

```typescript
// 配置 Azure AD 认证
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`,
    redirectUri: process.env.AZURE_AD_REDIRECT_URI,
  },
}
```

## 环境变量

在 Azure Portal 中设置：

```bash
NEXT_PUBLIC_API_URL=https://your-app.azurestaticapps.net
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_TENANT_ID=your-tenant-id
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-azure)
- [在线预览](https://halolight-azure.azurestaticapps.net)
- [Azure Static Web Apps 文档](https://docs.microsoft.com/azure/static-web-apps)
