# Fly.io 部署

HaloLight Fly.io 部署版本，全球边缘部署方案。

## 特性

- ✈️ **全球边缘** - 部署到全球多个区域
- 📈 **自动扩缩容** - 按需自动扩展
- 💾 **Volumes** - 持久化存储支持
- 🔒 **私有网络** - 内置私有网络
- 📊 **监控指标** - Prometheus 指标支持
- 🔄 **蓝绿部署** - 零停机部署

## 快速开始

```bash
# 安装 Fly CLI
curl -L https://fly.io/install.sh | sh

# 登录
fly auth login

# 初始化应用
fly launch

# 部署
fly deploy
```

## 配置文件

### fly.toml

```toml
app = "halolight"
primary_region = "hkg"

[build]
  dockerfile = "Dockerfile"

[env]
  NODE_ENV = "production"
  PORT = "3000"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

[[services]]
  protocol = "tcp"
  internal_port = 3000

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

  [[services.http_checks]]
    interval = "10s"
    timeout = "2s"
    path = "/api/health"

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512
```

## 添加 Volumes

```bash
# 创建持久化存储
fly volumes create halolight_data --region hkg --size 10

# 在 fly.toml 中挂载
[mounts]
  source = "halolight_data"
  destination = "/data"
```

## 添加数据库

```bash
# 创建 PostgreSQL
fly postgres create --name halolight-db

# 连接到应用
fly postgres attach halolight-db
```

## 多区域部署

```bash
# 添加区域
fly regions add sin nrt

# 扩展实例
fly scale count 3
```

## 相关链接

- [GitHub 仓库](https://github.com/halolight/halolight-fly)
- [在线预览](https://halolight.fly.dev)
- [Fly.io 文档](https://fly.io/docs)
