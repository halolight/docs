# AWS Deployment

HaloLight AWS deployment version, enterprise-grade deployment solution for AWS ecosystem.

## Features

- 🟠 **AWS Amplify** - Fully managed frontend deployment
- 📦 **S3** - Static asset storage
- 🌐 **CloudFront** - Global CDN distribution
- ⚡ **Lambda@Edge** - Edge computing
- 🔐 **IAM** - Identity and access management
- 📊 **CloudWatch** - Monitoring and logging

## Quick Start

### Method 1: Amplify Console Deploy

1. Login to AWS Amplify Console
2. Click "Host web app"
3. Connect GitHub repository
4. Configure build settings
5. Deploy

### Method 2: Amplify CLI Deploy

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure AWS credentials
amplify configure

# Initialize project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

## Configuration File

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

## Lambda@Edge Functions

```typescript
// edge-functions/auth.ts
export async function handler(event: any) {
  const request = event.Records[0].cf.request
  const headers = request.headers

  // Verify authentication
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

## CloudFront Configuration

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

## Environment Variables

Set in Amplify Console:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
AWS_REGION=ap-northeast-1
```

## IAM Policy

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

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-aws)
- [Live Preview](https://halolight-aws.amplifyapp.com)
- [AWS Amplify Documentation](https://docs.amplify.aws)
