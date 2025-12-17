# AWS 部署

HaloLight AWS 部署版本，面向企业级 AWS 生态的部署方案，支持 Amplify、S3 + CloudFront、ECS 等多种部署方式。

**在线预览**：[https://halolight-aws.h7ml.cn](https://halolight-aws.h7ml.cn)

**GitHub**：[https://github.com/halolight/halolight-aws](https://github.com/halolight/halolight-aws)

## 特性

- 🟠 **AWS Amplify** - 全托管的前端部署，Git 集成
- 📦 **S3** - 静态资源存储，无限扩展
- 🌐 **CloudFront** - 全球 CDN 分发，低延迟
- ⚡ **Lambda@Edge** - 边缘计算，SSR 支持
- 🔐 **IAM** - 细粒度身份和访问管理
- 📊 **CloudWatch** - 监控、告警和日志
- 🗄️ **RDS/DynamoDB** - 托管数据库服务
- 🔒 **WAF** - Web 应用防火墙

## 快速开始

### 方式一：Amplify Console 部署 (推荐)

1. 登录 [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. 点击 “Host web app” → “From GitHub”
3. 授权并选择 `halolight/halolight-aws` 仓库
4. 选择 `main` 分支
5. 配置构建设置 (使用默认或自定义 `amplify.yml`)
6. 配置环境变量
7. 点击 “Save and deploy”

### 方式二：Amplify CLI 部署

```bash
# 安装 Amplify CLI
npm install -g @aws-amplify/cli

# 配置 AWS 凭证
amplify configure

# 克隆项目
git clone https://github.com/halolight/halolight-aws.git
cd halolight-aws

# 初始化 Amplify 项目
amplify init

# 添加托管
amplify add hosting
# 选择: Hosting with Amplify Console
# 选择: Continuous deployment

# 发布
amplify publish
```

### 方式三：S3 + CloudFront 静态部署

```bash
# 安装 AWS CLI
brew install awscli  # macOS
# 或
pip install awscli

# 配置凭证
aws configure

# 构建静态站点
pnpm build
pnpm export  # 如果使用静态导出

# 创建 S3 存储桶
aws s3 mb s3://halolight-static --region ap-northeast-1

# 配置静态网站托管
aws s3 website s3://halolight-static \
  --index-document index.html \
  --error-document 404.html

# 上传文件
aws s3 sync out/ s3://halolight-static --delete

# 创建 CloudFront 分发
aws cloudfront create-distribution \
  --origin-domain-name halolight-static.s3.ap-northeast-1.amazonaws.com \
  --default-root-object index.html
```

## 配置文件

### amplify.yml

```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - corepack enable
            - corepack prepare pnpm@latest --activate
            - pnpm install --frozen-lockfile
        build:
          commands:
            - pnpm build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .next/cache/**/*
      buildPath: /
    appRoot: .
```

### next.config.ts (Amplify 优化)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: process.env.AMPLIFY_ENV === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
  // Amplify 需要的配置
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
```

## 环境变量

在 Amplify Console → App settings → Environment variables 设置：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | API 基础 URL | `/api` |
| `NEXT_PUBLIC_MOCK` | 启用 Mock 数据 | `false` |
| `NEXT_PUBLIC_APP_TITLE` | 应用标题 | `Admin Pro` |
| `AWS_REGION` | AWS 区域 | `ap-northeast-1` |
| `AMPLIFY_ENV` | Amplify 环境标识 | `true` |
| `DATABASE_URL` | RDS 数据库连接 | `postgresql://...` |
| `DYNAMODB_TABLE` | DynamoDB 表名 | `halolight-users` |

### 设置方式

```bash
# Amplify CLI 设置
amplify env add
amplify env checkout <env-name>

# AWS CLI 设置 (SSM Parameter Store)
aws ssm put-parameter \
  --name "/halolight/production/DATABASE_URL" \
  --value "postgresql://..." \
  --type SecureString

# 在 Amplify 中引用
# amplify.yml
build:
  commands:
    - export DATABASE_URL=$(aws ssm get-parameter --name "/halolight/production/DATABASE_URL" --with-decryption --query Parameter.Value --output text)
    - pnpm build
```

## Lambda@Edge 函数

### SSR 边缘渲染

```typescript
// edge-functions/ssr.ts
import type { CloudFrontRequestHandler } from "aws-lambda";

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  const uri = request.uri;

  // 处理 SSR 路由
  if (shouldSSR(uri)) {
    // 调用 Lambda 进行 SSR
    const response = await renderPage(uri);
    return {
      status: "200",
      statusDescription: "OK",
      headers: {
        "content-type": [{ value: "text/html; charset=utf-8" }],
        "cache-control": [{ value: "public, max-age=0, s-maxage=31536000" }],
      },
      body: response,
    };
  }

  return request;
};

function shouldSSR(uri: string): boolean {
  // 定义需要 SSR 的路由
  const ssrRoutes = ["/", "/dashboard", "/users"];
  return ssrRoutes.some((route) => uri.startsWith(route));
}
```

### 认证边缘函数

```typescript
// edge-functions/auth.ts
import type { CloudFrontRequestHandler } from "aws-lambda";
import { verify } from "jsonwebtoken";

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  // 检查保护路由
  if (isProtectedRoute(request.uri)) {
    const authHeader = headers.authorization?.[0]?.value;
    const cookieHeader = headers.cookie?.[0]?.value;

    // 从 header 或 cookie 获取 token
    const token = extractToken(authHeader, cookieHeader);

    if (!token) {
      return {
        status: "401",
        statusDescription: "Unauthorized",
        headers: {
          "content-type": [{ value: "application/json" }],
        },
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }

    try {
      // 验证 JWT
      verify(token, process.env.JWT_SECRET!);
    } catch {
      return {
        status: "401",
        statusDescription: "Invalid Token",
        body: JSON.stringify({ error: "Invalid token" }),
      };
    }
  }

  return request;
};

function isProtectedRoute(uri: string): boolean {
  const protectedPaths = ["/api/users", "/api/admin", "/dashboard"];
  return protectedPaths.some((path) => uri.startsWith(path));
}

function extractToken(authHeader?: string, cookieHeader?: string): string | null {
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  if (cookieHeader) {
    const match = cookieHeader.match(/token=([^;]+)/);
    return match ? match[1] : null;
  }
  return null;
}
```

### 地理位置重定向

```typescript
// edge-functions/geo-redirect.ts
import type { CloudFrontRequestHandler } from "aws-lambda";

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  // 获取 CloudFront 注入的地理位置信息
  const country = headers["cloudfront-viewer-country"]?.[0]?.value;
  const city = headers["cloudfront-viewer-city"]?.[0]?.value;

  // 基于地理位置重定向
  if (country === "CN" && !request.uri.startsWith("/cn/")) {
    return {
      status: "302",
      statusDescription: "Found",
      headers: {
        location: [{ value: `/cn${request.uri}` }],
      },
    };
  }

  // 添加地理位置 header
  request.headers["x-user-country"] = [{ value: country || "unknown" }];
  request.headers["x-user-city"] = [{ value: city || "unknown" }];

  return request;
};
```

## CloudFront 配置

### CloudFront 分发配置

```json
{
  "CallerReference": "halolight-distribution",
  "Comment": "HaloLight CDN Distribution",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-halolight",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": ["GET", "HEAD", "OPTIONS"],
    "CachedMethods": ["GET", "HEAD"],
    "ForwardedValues": {
      "QueryString": true,
      "Cookies": {
        "Forward": "none"
      },
      "Headers": ["Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true,
    "LambdaFunctionAssociations": [
      {
        "EventType": "viewer-request",
        "LambdaFunctionARN": "arn:aws:lambda:us-east-1:123456789:function:auth:1"
      },
      {
        "EventType": "origin-request",
        "LambdaFunctionARN": "arn:aws:lambda:us-east-1:123456789:function:ssr:1"
      }
    ]
  },
  "Origins": {
    "Items": [
      {
        "Id": "S3-halolight",
        "DomainName": "halolight-static.s3.ap-northeast-1.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": "origin-access-identity/cloudfront/E1234567890ABC"
        }
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_200",
  "HttpVersion": "http2and3",
  "IsIPV6Enabled": true
}
```

### 缓存策略

```json
{
  "Name": "HaloLight-CachePolicy",
  "DefaultTTL": 86400,
  "MaxTTL": 31536000,
  "MinTTL": 1,
  "ParametersInCacheKeyAndForwardedToOrigin": {
    "EnableAcceptEncodingGzip": true,
    "EnableAcceptEncodingBrotli": true,
    "HeadersConfig": {
      "HeaderBehavior": "whitelist",
      "Headers": ["Authorization", "Accept-Language"]
    },
    "CookiesConfig": {
      "CookieBehavior": "none"
    },
    "QueryStringsConfig": {
      "QueryStringBehavior": "whitelist",
      "QueryStrings": ["page", "limit", "search"]
    }
  }
}
```

## S3 存储桶配置

### 存储桶策略

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E1234567890ABC"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::halolight-static/*"
    }
  ]
}
```

### CORS 配置

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["https://halolight-aws.h7ml.cn", "https://halolight.h7ml.cn"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

## IAM 策略

### Amplify 部署角色

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AmplifyAccess",
      "Effect": "Allow",
      "Action": [
        "amplify:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3Access",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::halolight-*",
        "arn:aws:s3:::halolight-*/*"
      ]
    },
    {
      "Sid": "CloudFrontAccess",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetDistribution",
        "cloudfront:UpdateDistribution"
      ],
      "Resource": "*"
    },
    {
      "Sid": "LambdaAccess",
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:GetFunction",
        "lambda:EnableReplication*"
      ],
      "Resource": "arn:aws:lambda:*:*:function:halolight-*"
    },
    {
      "Sid": "SSMAccess",
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameter",
        "ssm:GetParameters"
      ],
      "Resource": "arn:aws:ssm:*:*:parameter/halolight/*"
    }
  ]
}
```

### 最小权限原则

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOnlyAccess",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "rds:DescribeDBInstances"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-northeast-1"
        }
      }
    }
  ]
}
```

## DynamoDB 集成

### 表定义

```typescript
// lib/dynamodb.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE || "halolight-users";

export async function getUser(userId: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { pk: `USER#${userId}`, sk: "PROFILE" },
  });

  const response = await docClient.send(command);
  return response.Item;
}

export async function createUser(user: User) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      pk: `USER#${user.id}`,
      sk: "PROFILE",
      ...user,
      createdAt: new Date().toISOString(),
    },
  });

  await docClient.send(command);
  return user;
}

export async function getUsersByRole(role: string) {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "GSI1",
    KeyConditionExpression: "gsi1pk = :role",
    ExpressionAttributeValues: {
      ":role": `ROLE#${role}`,
    },
  });

  const response = await docClient.send(command);
  return response.Items;
}
```

### CloudFormation 模板

```yaml
# cloudformation/dynamodb.yml
AWSTemplateFormatVersion: '2010-09-09'
Description: HaloLight DynamoDB Tables

Resources:
  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: halolight-users
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: pk
          AttributeType: S
        - AttributeName: sk
          AttributeType: S
        - AttributeName: gsi1pk
          AttributeType: S
        - AttributeName: gsi1sk
          AttributeType: S
      KeySchema:
        - AttributeName: pk
          KeyType: HASH
        - AttributeName: sk
          KeyType: RANGE
      GlobalSecondaryIndexes:
        - IndexName: GSI1
          KeySchema:
            - AttributeName: gsi1pk
              KeyType: HASH
            - AttributeName: gsi1sk
              KeyType: RANGE
          Projection:
            ProjectionType: ALL
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true
      Tags:
        - Key: Project
          Value: HaloLight
```

## RDS 数据库

### 连接配置

```typescript
// lib/rds.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function query<T>(text: string, params?: any[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function getUsers() {
  return query<User>("SELECT * FROM users ORDER BY created_at DESC");
}
```

## CloudWatch 监控

### 自定义指标

```typescript
// lib/cloudwatch.ts
import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

const client = new CloudWatchClient({ region: process.env.AWS_REGION });

export async function putMetric(name: string, value: number, unit: string = "Count") {
  const command = new PutMetricDataCommand({
    Namespace: "HaloLight",
    MetricData: [
      {
        MetricName: name,
        Value: value,
        Unit: unit,
        Dimensions: [
          {
            Name: "Environment",
            Value: process.env.NODE_ENV || "development",
          },
        ],
      },
    ],
  });

  await client.send(command);
}

// 使用示例
export async function trackApiRequest(endpoint: string, duration: number) {
  await putMetric(`API_${endpoint}_Requests`, 1, "Count");
  await putMetric(`API_${endpoint}_Duration`, duration, "Milliseconds");
}
```

### 告警配置

```yaml
# cloudformation/alarms.yml
AWSTemplateFormatVersion: '2010-09-09'
Description: HaloLight CloudWatch Alarms

Resources:
  HighErrorRateAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: HaloLight-HighErrorRate
      AlarmDescription: Alarm when error rate exceeds 5%
      MetricName: 5XXError
      Namespace: AWS/CloudFront
      Statistic: Average
      Period: 300
      EvaluationPeriods: 2
      Threshold: 5
      ComparisonOperator: GreaterThanThreshold
      AlarmActions:
        - !Ref AlertSNSTopic
      Dimensions:
        - Name: DistributionId
          Value: !Ref CloudFrontDistribution

  AlertSNSTopic:
    Type: AWS::SNS::Topic
    Properties:
      TopicName: halolight-alerts
      Subscription:
        - Protocol: email
          Endpoint: admin@halolight.h7ml.cn
```

## 常用命令

```bash
# Amplify CLI
amplify status                    # 查看状态
amplify push                      # 推送后端更改
amplify publish                   # 发布前端和后端
amplify env list                  # 列出环境
amplify env checkout prod         # 切换环境
amplify delete                    # 删除项目

# AWS CLI - S3
aws s3 ls                         # 列出存储桶
aws s3 sync ./out s3://bucket     # 同步文件
aws s3 rm s3://bucket --recursive # 清空存储桶

# AWS CLI - CloudFront
aws cloudfront create-invalidation \
  --distribution-id E1234567890 \
  --paths "/*"                    # 刷新缓存

# AWS CLI - Lambda
aws lambda update-function-code \
  --function-name halolight-ssr \
  --zip-file fileb://function.zip # 更新函数

# AWS CLI - CloudWatch
aws logs tail /aws/lambda/halolight --follow  # 查看日志

# AWS CLI - SSM
aws ssm get-parameter --name "/halolight/prod/DATABASE_URL" --with-decryption
```

## 自定义域名

### Route 53 配置

```bash
# 创建托管区域
aws route53 create-hosted-zone \
  --name halolight-aws.h7ml.cn \
  --caller-reference $(date +%s)

# 添加 A 记录 (指向 CloudFront)
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890 \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "halolight-aws.h7ml.cn",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "d1234567890.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }'
```

### ACM 证书

```bash
# 请求证书 (必须在 us-east-1 区域)
aws acm request-certificate \
  --domain-name halolight-aws.h7ml.cn \
  --validation-method DNS \
  --region us-east-1

# 验证后关联到 CloudFront
aws cloudfront update-distribution \
  --id E1234567890 \
  --viewer-certificate '{
    "ACMCertificateArn": "arn:aws:acm:us-east-1:123456789:certificate/xxx",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  }'
```

## 常见问题

### Q：Amplify 构建失败？

A：检查以下几点：
1. 查看构建日志中的错误信息
2. 确认 Node.js 版本兼容 (Amplify 默认使用 Node 18)
3. 检查 `amplify.yml` 配置是否正确
4. 确认环境变量已设置

### Q：CloudFront 缓存问题？

A：刷新缓存：
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234567890 \
  --paths "/*"
```

### Q：Lambda@Edge 部署限制？

A：注意事项：
1. Lambda@Edge 必须在 `us-east-1` 区域创建
2. 函数包大小限制：1MB (压缩后)
3. 运行时限制：5 秒 (viewer request/response)，30 秒 (origin request/response)
4. 内存限制：128MB - 10GB

### Q：如何查看 CloudWatch 日志？

A：使用 AWS CLI 或控制台：
```bash
# CLI 查看日志
aws logs tail /aws/lambda/halolight-ssr --follow

# 或在控制台
# CloudWatch → Log groups → /aws/lambda/halolight-ssr
```

## 费用说明

| 服务 | 免费额度 | 超出价格 |
|------|----------|----------|
| Amplify 构建 | 1000 分钟/月 | $0.01/分钟 |
| Amplify 托管 | 15GB 存储，5GB 传输 | $0.023/GB |
| S3 存储 | 5GB | $0.025/GB |
| CloudFront | 1TB 传输/月 | $0.085/GB |
| Lambda@Edge | 1M 请求/月 | $0.60/M 请求 |
| Route 53 | - | $0.50/托管区域 |

## 与其他平台对比

| 特性 | AWS Amplify | Vercel | Netlify |
|------|-------------|--------|---------|
| 全球边缘 | ✅ CloudFront | ✅ | ✅ |
| SSR 支持 | ✅ Lambda@Edge | ✅ 原生 | ✅ |
| 托管数据库 | ✅ RDS/DynamoDB | ✅ Postgres | ❌ 需外部 |
| 免费带宽 | 5GB | 100GB | 100GB |
| 企业功能 | ✅ IAM/VPC | ⚠️ 有限 | ⚠️ 有限 |
| 学习曲线 | 较陡 | 平缓 | 平缓 |

## 相关链接

- [在线预览](https://halolight-aws.h7ml.cn)
- [GitHub 仓库](https://github.com/halolight/halolight-aws)
- [AWS Amplify 文档](https://docs.amplify.aws)
- [AWS CloudFront 文档](https://docs.aws.amazon.com/cloudfront)
- [AWS Lambda@Edge 文档](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html)
- [AWS S3 文档](https://docs.aws.amazon.com/s3)
- [HaloLight 文档](https://docs.halolight.h7ml.cn)
