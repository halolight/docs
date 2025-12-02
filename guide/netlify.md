# Netlify 部署

HaloLight Netlify 部署版本，针对 Netlify 平台优化的部署方案。

## 特性

- 🔷 **Netlify 集成** - 原生 Netlify 部署支持
- ⚡ **全球 CDN** - 全球边缘节点加速
- 🔄 **自动 CI/CD** - Git 推送自动部署
- 📝 **表单处理** - 内置表单提交处理
- 🔐 **Identity** - Netlify Identity 集成
- 🌐 **Functions** - Serverless 函数支持

## 快速开始

### 方式一：一键部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/halolight/halolight-netlify)

### 方式二：手动部署

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-netlify.git
cd halolight-netlify

# 安装依赖
pnpm install

# 本地开发
pnpm dev

# 构建
pnpm build
```

## 配置文件

### netlify.toml

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 环境变量

在 Netlify 控制台设置：

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_USE_MOCK=false
```

## Serverless Functions

```typescript
// netlify/functions/hello.ts
import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' }),
  }
}
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-netlify)
- [在线预览](https://halolight-netlify.netlify.app)
- [Netlify 文档](https://docs.netlify.com)
