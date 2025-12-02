# Node.js 后端 API

HaloLight Node.js 后端 API，基于 NestJS/Fastify 框架构建的企业级后端服务。

## 特性

- 🟩 **Node.js** - JavaScript/TypeScript 运行时
- 🏗️ **NestJS/Fastify** - 可选的企业级框架
- 🔐 **JWT 鉴权** - 完整的认证授权系统
- 🛡️ **RBAC 权限** - 基于角色的访问控制
- 📊 **GraphQL** - 灵活的查询语言支持
- 🔷 **Prisma ORM** - 类型安全的数据库访问
- 📡 **RESTful API** - 标准化的 API 设计

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-api-node.git
cd halolight-api-node

# 安装依赖
pnpm install

# 生成 Prisma 客户端
pnpm prisma generate

# 运行数据库迁移
pnpm prisma migrate dev

# 运行开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 项目结构

```
halolight-api-node/
├── src/
│   ├── modules/      # 功能模块
│   │   ├── auth/     # 认证模块
│   │   ├── users/    # 用户模块
│   │   └── ...
│   ├── common/       # 公共模块
│   ├── config/       # 配置
│   └── main.ts       # 入口文件
├── prisma/
│   └── schema.prisma # 数据库模型
└── package.json
```

## API 端点

### REST API

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/register | 用户注册 |
| GET | /api/users | 获取用户列表 |
| GET | /api/users/:id | 获取用户详情 |

### GraphQL

```graphql
query {
  users {
    id
    name
    email
  }
}

mutation {
  createUser(input: { name: "John", email: "john@example.com" }) {
    id
    name
  }
}
```

## 环境变量

```bash
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/halolight"

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# 应用
PORT=3000
NODE_ENV=development
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-api-node)
- [API 文档](https://halolight-api-node.h7ml.cn/api)
- [GraphQL Playground](https://halolight-api-node.h7ml.cn/graphql)
