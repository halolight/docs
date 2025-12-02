# Deno KV + Hono 后端脚手架

HaloLight Deno 后端脚手架，基于 Deno KV 和 Hono 框架构建的现代化后端 API 服务。

## 特性

- 🦕 **Deno 原生** - 使用 Deno 运行时，内置 TypeScript 支持
- 🔥 **Hono 框架** - 轻量级、高性能的 Web 框架
- 💾 **Deno KV** - 内置键值存储，无需外部数据库
- 🔐 **JWT 鉴权** - 完整的认证授权系统
- 🛡️ **RBAC 权限** - 基于角色的访问控制
- 📡 **RESTful API** - 标准化的 API 设计

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-deno.git
cd halolight-deno

# 运行开发服务器
deno task dev

# 运行生产服务器
deno task start
```

## 项目结构

```
halolight-deno/
├── src/
│   ├── routes/       # API 路由
│   ├── middleware/   # 中间件
│   ├── services/     # 业务逻辑
│   ├── utils/        # 工具函数
│   └── main.ts       # 入口文件
├── deno.json         # Deno 配置
└── README.md
```

## API 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/register | 用户注册 |
| GET | /api/users | 获取用户列表 |
| GET | /api/users/:id | 获取用户详情 |

## 环境变量

```bash
JWT_SECRET=your-secret-key
DENO_KV_PATH=./data/kv.db
```

## 部署

支持部署到 Deno Deploy：

```bash
deployctl deploy --project=your-project src/main.ts
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-deno)
- [在线预览](https://halolight-deno.deno.dev)
- [Deno 官方文档](https://deno.land/manual)
- [Hono 官方文档](https://hono.dev)
