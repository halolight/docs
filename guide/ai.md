# AI 智能助理

HaloLight AI 服务基于 Hono + LangChain.js 构建，提供 RAG 检索增强、动作执行和多模型自动降级。

**在线预览**：内部 API 服务 (无独立 Demo)

**GitHub**：[https://github.com/halolight/halolight-ai](https://github.com/halolight/halolight-ai)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Hono | latest | 轻量 HTTP 框架 |
| LangChain.js | latest | LLM 编排 + RAG 管道 |
| pgvector | latest | PostgreSQL 向量检索扩展 |
| Drizzle ORM | latest | TypeScript ORM & 迁移 |
| PostgreSQL | 14+ | 持久化与向量存储 |
| Node.js | 22+ | 运行时 |
| Zod | latest | 数据验证 |

## 目录结构

```
halolight-ai/
├── src/
│   ├── index.ts                    # 应用入口
│   ├── routes/                     # API 路由
│   │   ├── chat.ts                 # 对话接口
│   │   ├── actions.ts              # 动作执行
│   │   ├── history.ts              # 历史记录
│   │   └── knowledge.ts            # 知识库管理
│   ├── services/
│   │   ├── llm/                    # LLM 服务层
│   │   │   ├── openai.ts
│   │   │   ├── anthropic.ts
│   │   │   └── factory.ts          # 模型工厂 (自动降级)
│   │   ├── rag/                    # RAG 管道
│   │   │   ├── embeddings.ts       # 文档分块与嵌入
│   │   │   ├── retriever.ts        # 向量检索
│   │   │   └── pipeline.ts         # RAG 管道
│   │   ├── actions/                # 动作执行系统
│   │   │   ├── executor.ts         # 动作执行器
│   │   │   ├── registry.ts         # 动作注册表
│   │   │   └── permissions.ts      # 权限校验
│   │   └── memory/
│   │       └── conversation.ts     # 对话记忆管理
│   ├── db/
│   │   ├── schema.ts               # Drizzle Schema (含 pgvector)
│   │   └── client.ts               # 数据库客户端
│   ├── middleware/
│   │   ├── auth.ts                 # 认证中间件
│   │   └── tenant.ts               # 租户隔离
│   └── types/
│       └── index.ts                # TypeScript 类型定义
├── drizzle/                        # 迁移文件
├── drizzle.config.ts
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 快速开始

### 前置要求

- Node.js >= 22.0.0
- PostgreSQL >= 14 (with pgvector extension)
- 至少配置一个 LLM 提供商 API Key

### 安装

```bash
# 克隆仓库
git clone https://github.com/halolight/halolight-ai.git
cd halolight-ai

# 安装依赖
pnpm install
```

### 环境变量

```bash
cp .env.example .env
```

关键配置项：

```env
# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/halolight_ai

# LLM 提供商 (至少配置一个)
OPENAI_API_KEY=sk-...
# 或
ANTHROPIC_API_KEY=sk-ant-...
# 或
AZURE_OPENAI_API_KEY=...

# RAG 配置
CHUNK_SIZE=1000              # 文档分块大小
CHUNK_OVERLAP=200            # 分块重叠
RETRIEVAL_TOP_K=5            # 检索数量

# 对话配置
MAX_CONVERSATION_HISTORY=20  # 对话历史长度
ENABLE_STREAMING=true        # 启用流式响应
ENABLE_AUDIT_LOG=true        # 启用审计日志

# 生产环境
JWT_SECRET=your-secret-key
CORS_ORIGINS=https://your-domain.com
```

### 初始化数据库

```bash
# 生成迁移文件
pnpm db:generate

# 运行迁移
pnpm db:migrate

# 或直接推送 schema (开发环境)
pnpm db:push

# 打开 Drizzle Studio
pnpm db:studio
```

### 启动开发服务器

```bash
pnpm dev
```

服务将在 `http://localhost:3000` 启动。

### 生产构建

```bash
pnpm build
pnpm start
```

## 核心功能

### 多模型支持

系统会自动检测可用的 LLM 提供商并按优先级降级：

```
Azure OpenAI (1) → OpenAI (2) → Anthropic (3) → Ollama (4)
```

### RAG 知识库

| 步骤 | 说明 | 配置 |
|------|------|------|
| 文档分块 | RecursiveCharacterTextSplitter | 1000 字符, 200 重叠 |
| 向量嵌入 | OpenAI Embeddings | text-embedding-3-small |
| 向量存储 | pgvector | 1536 维 |
| 检索 | 余弦相似度 | Top-K (默认 5) |
| 上下文注入 | 将检索结果注入 LLM 提示词 | - |

### 流式响应

启用 SSE 流式输出，降低首字延迟：

```bash
POST /api/ai/chat/stream
Content-Type: application/json

{
  "message": "你好",
  "streaming": true
}
```

### 权限控制

基于角色的访问控制 (RBAC)：

| 角色 | 权限级别 |
|------|----------|
| `super_admin` | 最高权限 |
| `admin` | 管理权限 |
| `user` | 普通用户 |
| `guest` | 访客 |

敏感操作需要二次确认 (`_confirmed: true`)。

### 对话记忆

- 存储在 `conversations` 和 `messages` 表
- 默认保留最近 20 条消息
- 支持多轮对话上下文

### 租户隔离

所有数据操作都基于 `TenantContext`：

```typescript
interface TenantContext {
  tenantId: string;
  userId: string;
  role: UserRole;
}
```

从请求头提取：
- `X-Tenant-ID`
- `X-User-ID`
- `X-User-Role`

## API 端点

### 健康检查

```bash
GET /health
GET /health/ready
GET /api/ai/info
```

### 对话

```bash
# 发送消息
POST /api/ai/chat
Content-Type: application/json

{
  "message": "你好，介绍一下 HaloLight",
  "conversationId": "uuid",    // 可选
  "includeContext": true,
  "maxContextDocs": 5
}

# 流式响应
POST /api/ai/chat/stream
```

### 动作执行

```bash
# 执行动作
POST /api/ai/actions/execute
Content-Type: application/json

{
  "action": "query_users",
  "params": {
    "role": "admin",
    "limit": 10
  }
}

# 获取可用动作
GET /api/ai/actions/available

# 获取动作详情
GET /api/ai/actions/:name
```

### 历史记录

```bash
GET /api/ai/history?limit=10
GET /api/ai/history/:id
DELETE /api/ai/history/:id
PATCH /api/ai/history/:id
```

### 知识库

```bash
# 导入文档
POST /api/ai/knowledge/ingest
Content-Type: application/json

{
  "content": "文档内容...",
  "metadata": {
    "title": "文档标题",
    "category": "技术文档"
  },
  "source": "manual",
  "sourceId": "doc-001"
}

# 批量导入
POST /api/ai/knowledge/batch-ingest

# 列出文档
GET /api/ai/knowledge?limit=50&offset=0

# 删除文档
DELETE /api/ai/knowledge/:id
```

### 认证

所有 `/api/*` 端点需要以下请求头 (开发环境可省略)：

```
X-Tenant-ID: your-tenant-id
X-User-ID: your-user-id
X-User-Role: admin | user | guest
```

## 部署

### Docker

```bash
# 构建镜像
docker build -t halolight-ai .

# 运行容器
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e OPENAI_API_KEY=sk-... \
  halolight-ai
```

### Docker Compose

```bash
docker-compose up -d
```

### 生产环境必备

- `DATABASE_URL`：PostgreSQL 连接字符串
- `NODE_ENV=production`
- 至少一个 LLM 提供商 API Key
- `JWT_SECRET`：用于认证的密钥
- `CORS_ORIGINS`：允许的跨域来源

## 故障排查

### 数据库连接失败

```bash
# 检查 PostgreSQL 是否运行
psql $DATABASE_URL -c "SELECT 1"

# 检查 pgvector 扩展
psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS vector"
```

### LLM 提供商错误

```bash
# 检查可用提供商
curl http://localhost:3000/api/ai/info
```

### 向量检索不准确

- 增加 `RETRIEVAL_TOP_K` 值
- 调整 `CHUNK_SIZE` 和 `CHUNK_OVERLAP`
- 使用混合检索 (向量 + 关键词)

## 相关项目

- [halolight](https://github.com/halolight/halolight) - Next.js 前端
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 前端
- [halolight-docs](https://github.com/halolight/docs) - 文档
