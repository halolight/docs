# Vercel 部署

HaloLight Vercel 部署版本，针对 Vercel 平台优化的部署方案，提供最佳的 Next.js 部署体验。

## 特性

- ▲ **Vercel 原生** - Next.js 官方部署平台
- ⚡ **Edge Functions** - 边缘计算支持
- 🌐 **全球边缘网络** - 极速访问体验
- 🔄 **预览部署** - PR 自动预览环境
- 📊 **Analytics** - 内置分析功能
- 🔐 **环境变量** - 安全的环境变量管理

## 快速开始

### 方式一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/halolight/halolight-vercel)

### 方式二：手动部署

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-vercel.git
cd halolight-vercel

# 安装依赖
pnpm install

# 本地开发
pnpm dev

# 构建
pnpm build
```

## 配置文件

### vercel.json

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hkg1", "sin1"],
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

## 环境变量

在 Vercel 控制台设置：

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_USE_MOCK=false
DATABASE_URL=postgresql://...
```

## Edge Functions

```typescript
// app/api/edge/route.ts
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ message: 'Hello from Edge!' }), {
    headers: { 'content-type': 'application/json' },
  })
}
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-vercel)
- [在线预览](https://halolight-vercel.vercel.app)
- [Vercel 文档](https://vercel.com/docs)
