# AI Assistant

HaloLight AI service is built with Hono + LangChain.js, providing RAG retrieval-augmented generation, action execution, and multi-model automatic fallback.

**Live Preview**: Internal API service (no standalone demo)

**GitHub**: [https://github.com/halolight/halolight-ai](https://github.com/halolight/halolight-ai)

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Hono | latest | Lightweight HTTP framework |
| LangChain.js | latest | LLM orchestration + RAG pipeline |
| pgvector | latest | PostgreSQL vector search extension |
| Drizzle ORM | latest | TypeScript ORM & migrations |
| PostgreSQL | 14+ | Persistence and vector storage |
| Node.js | 22+ | Runtime |
| Zod | latest | Data validation |

## Directory Structure

```
halolight-ai/
├── src/
│   ├── index.ts                    # Application entry
│   ├── routes/                     # API routes
│   │   ├── chat.ts                 # Chat interface
│   │   ├── actions.ts              # Action execution
│   │   ├── history.ts              # History records
│   │   └── knowledge.ts            # Knowledge base management
│   ├── services/
│   │   ├── llm/                    # LLM service layer
│   │   │   ├── openai.ts
│   │   │   ├── anthropic.ts
│   │   │   └── factory.ts          # Model factory (auto fallback)
│   │   ├── rag/                    # RAG pipeline
│   │   │   ├── embeddings.ts       # Document chunking & embedding
│   │   │   ├── retriever.ts        # Vector retrieval
│   │   │   └── pipeline.ts         # RAG pipeline
│   │   ├── actions/                # Action execution system
│   │   │   ├── executor.ts         # Action executor
│   │   │   ├── registry.ts         # Action registry
│   │   │   └── permissions.ts      # Permission validation
│   │   └── memory/
│   │       └── conversation.ts     # Conversation memory management
│   ├── db/
│   │   ├── schema.ts               # Drizzle Schema (with pgvector)
│   │   └── client.ts               # Database client
│   ├── middleware/
│   │   ├── auth.ts                 # Authentication middleware
│   │   └── tenant.ts               # Tenant isolation
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── drizzle/                        # Migration files
├── drizzle.config.ts
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Quick Start

### Prerequisites

- Node.js >= 22.0.0
- PostgreSQL >= 14 (with pgvector extension)
- At least one LLM provider API Key configured

### Installation

```bash
# Clone repository
git clone https://github.com/halolight/halolight-ai.git
cd halolight-ai

# Install dependencies
pnpm install
```

### Environment Variables

```bash
cp .env.example .env
```

Key configurations:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/halolight_ai

# LLM Providers (configure at least one)
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...
# or
AZURE_OPENAI_API_KEY=...

# RAG Configuration
CHUNK_SIZE=1000              # Document chunk size
CHUNK_OVERLAP=200            # Chunk overlap
RETRIEVAL_TOP_K=5            # Retrieval count

# Conversation Configuration
MAX_CONVERSATION_HISTORY=20  # Conversation history length
ENABLE_STREAMING=true        # Enable streaming response
ENABLE_AUDIT_LOG=true        # Enable audit logging

# Production
JWT_SECRET=your-secret-key
CORS_ORIGINS=https://your-domain.com
```

### Initialize Database

```bash
# Generate migration files
pnpm db:generate

# Run migrations
pnpm db:migrate

# Or push schema directly (development)
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

### Start Development Server

```bash
pnpm dev
```

Service will start at `http://localhost:3000`.

### Production Build

```bash
pnpm build
pnpm start
```

## Core Features

### 1. Multi-Model Support

The system automatically detects available LLM providers and falls back by priority:

```
Azure OpenAI (1) → OpenAI (2) → Anthropic (3) → Ollama (4)
```

### 2. RAG Knowledge Base

| Step | Description | Configuration |
|------|-------------|---------------|
| Document Chunking | RecursiveCharacterTextSplitter | 1000 chars, 200 overlap |
| Vector Embedding | OpenAI Embeddings | text-embedding-3-small |
| Vector Storage | pgvector | 1536 dimensions |
| Retrieval | Cosine similarity | Top-K (default 5) |
| Context Injection | Inject retrieval results into LLM prompt | - |

### 3. Streaming Response

Enable SSE streaming output to reduce first-token latency:

```bash
POST /api/ai/chat/stream
Content-Type: application/json

{
  "message": "Hello",
  "streaming": true
}
```

### 4. Permission Control

Role-based access control (RBAC):

| Role | Permission Level |
|------|------------------|
| `super_admin` | Highest permission |
| `admin` | Admin permission |
| `user` | Regular user |
| `guest` | Guest |

Sensitive operations require confirmation (`_confirmed: true`).

### 5. Conversation Memory

- Stored in `conversations` and `messages` tables
- Retains last 20 messages by default
- Supports multi-turn conversation context

### 6. Tenant Isolation

All data operations are based on `TenantContext`:

```typescript
interface TenantContext {
  tenantId: string;
  userId: string;
  role: UserRole;
}
```

Extracted from request headers:
- `X-Tenant-ID`
- `X-User-ID`
- `X-User-Role`

## API Endpoints

### Health Check

```bash
GET /health
GET /health/ready
GET /api/ai/info
```

### Chat

```bash
# Send message
POST /api/ai/chat
Content-Type: application/json

{
  "message": "Hello, introduce HaloLight",
  "conversationId": "uuid",    // optional
  "includeContext": true,
  "maxContextDocs": 5
}

# Streaming response
POST /api/ai/chat/stream
```

### Action Execution

```bash
# Execute action
POST /api/ai/actions/execute
Content-Type: application/json

{
  "action": "query_users",
  "params": {
    "role": "admin",
    "limit": 10
  }
}

# Get available actions
GET /api/ai/actions/available

# Get action details
GET /api/ai/actions/:name
```

### History

```bash
GET /api/ai/history?limit=10
GET /api/ai/history/:id
DELETE /api/ai/history/:id
PATCH /api/ai/history/:id
```

### Knowledge Base

```bash
# Import document
POST /api/ai/knowledge/ingest
Content-Type: application/json

{
  "content": "Document content...",
  "metadata": {
    "title": "Document Title",
    "category": "Technical Documentation"
  },
  "source": "manual",
  "sourceId": "doc-001"
}

# Batch import
POST /api/ai/knowledge/batch-ingest

# List documents
GET /api/ai/knowledge?limit=50&offset=0

# Delete document
DELETE /api/ai/knowledge/:id
```

### Authentication

All `/api/*` endpoints require the following headers (optional in development):

```
X-Tenant-ID: your-tenant-id
X-User-ID: your-user-id
X-User-Role: admin | user | guest
```

## Deployment

### Docker

```bash
# Build image
docker build -t halolight-ai .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e OPENAI_API_KEY=sk-... \
  halolight-ai
```

### Docker Compose

```bash
docker-compose up -d
```

### Production Requirements

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV=production`
- At least one LLM provider API Key
- `JWT_SECRET`: Secret key for authentication
- `CORS_ORIGINS`: Allowed cross-origin sources

## Troubleshooting

### Database Connection Failed

```bash
# Check if PostgreSQL is running
psql $DATABASE_URL -c "SELECT 1"

# Check pgvector extension
psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS vector"
```

### LLM Provider Errors

```bash
# Check available providers
curl http://localhost:3000/api/ai/info
```

### Inaccurate Vector Retrieval

- Increase `RETRIEVAL_TOP_K` value
- Adjust `CHUNK_SIZE` and `CHUNK_OVERLAP`
- Use hybrid retrieval (vector + keyword)

## Related Projects

- [halolight](https://github.com/halolight/halolight) - Next.js frontend
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue frontend
- [halolight-docs](https://github.com/halolight/docs) - Documentation
