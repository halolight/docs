# Azure Deployment

HaloLight Azure deployment version, enterprise-grade deployment solution for Microsoft ecosystem.

## Features

- ☁️ **Azure Static Web Apps** - Static site hosting
- ⚡ **Azure Functions** - Serverless functions
- 🔐 **Azure AD** - Enterprise identity authentication
- 🌐 **Azure CDN** - Global CDN acceleration
- 📊 **Application Insights** - Application monitoring
- 🔒 **Enterprise Security** - Microsoft security compliance

## Quick Start

### Method 1: GitHub Actions Deploy

1. Fork repository to your GitHub
2. Create Static Web App in Azure Portal
3. Connect GitHub repository
4. Automatically generate GitHub Actions workflow

### Method 2: Azure CLI Deploy

```bash
# Login to Azure
az login

# Create resource group
az group create --name halolight-rg --location eastasia

# Create Static Web App
az staticwebapp create \
  --name halolight \
  --resource-group halolight-rg \
  --source https://github.com/halolight/halolight-azure \
  --branch main \
  --app-location "/" \
  --output-location ".next" \
  --login-with-github
```

## Configuration File

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

## Azure AD Integration

```typescript
// Configure Azure AD authentication
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`,
    redirectUri: process.env.AZURE_AD_REDIRECT_URI,
  },
}
```

## Environment Variables

Set in Azure Portal:

```bash
NEXT_PUBLIC_API_URL=https://your-app.azurestaticapps.net
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_TENANT_ID=your-tenant-id
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-azure)
- [Live Preview](https://halolight-azure.azurestaticapps.net)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps)
