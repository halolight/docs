# AWS 部署

HaloLight AWS 部署版本，面向企业级 AWS 生态的部署方案。

## 特性

- 🟠 **AWS Amplify** - 全托管的前端部署
- 📦 **S3** - 静态资源存储
- 🌐 **CloudFront** - 全球 CDN 分发
- ⚡ **Lambda@Edge** - 边缘计算
- 🔐 **IAM** - 身份和访问管理
- 📊 **CloudWatch** - 监控和日志

## 快速开始

### 方式一：Amplify Console 部署

1. 登录 AWS Amplify Console
2. 点击 “Host web app”
3. 连接 GitHub 仓库
4. 配置构建设置
5. 部署

### 方式二：Amplify CLI 部署

```bash
# 安装 Amplify CLI
npm install -g @aws-amplify/cli

# 配置 AWS 凭证
amplify configure

# 初始化项目
amplify init

# 添加托管
amplify add hosting

# 部署
amplify publish
```

## 配置文件

### amplify.yml

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## Lambda@Edge 函数

```typescript
// edge-functions/auth.ts
export async function handler(event: any) {
  const request = event.Records[0].cf.request
  const headers = request.headers

  // 验证认证
  if (!headers.authorization) {
    return {
      status: '401',
      statusDescription: 'Unauthorized',
      body: 'Unauthorized',
    }
  }

  return request
}
```

## CloudFront 配置

```json
{
  "Origins": {
    "Items": [
      {
        "DomainName": "halolight.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }
}
```

## 环境变量

在 Amplify Console 中设置：

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
AWS_REGION=ap-northeast-1
```

## IAM 策略

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "amplify:*",
        "s3:*",
        "cloudfront:*",
        "lambda:*"
      ],
      "Resource": "*"
    }
  ]
}
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-aws)
- [在线预览](https://halolight-aws.amplifyapp.com)
- [AWS Amplify 文档](https://docs.amplify.aws)
