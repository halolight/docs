# Fly.io Deployment

HaloLight Fly.io deployment version, global edge deployment solution.

## Features

- ✈️ **Global Edge** - Deploy to multiple regions worldwide
- 📈 **Auto Scaling** - Automatic scaling on demand
- 💾 **Volumes** - Persistent storage support
- 🔒 **Private Network** - Built-in private networking
- 📊 **Monitoring Metrics** - Prometheus metrics support
- 🔄 **Blue-Green Deployment** - Zero-downtime deployment

## Quick Start

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Initialize application
fly launch

# Deploy
fly deploy
```

## Configuration File

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

## Adding Volumes

```bash
# Create persistent storage
fly volumes create halolight_data --region hkg --size 10

# Mount in fly.toml
[mounts]
  source = "halolight_data"
  destination = "/data"
```

## Adding Database

```bash
# Create PostgreSQL
fly postgres create --name halolight-db

# Attach to application
fly postgres attach halolight-db
```

## Multi-Region Deployment

```bash
# Add regions
fly regions add sin nrt

# Scale instances
fly scale count 3
```

## Related Links

- [GitHub Repository](https://github.com/halolight/halolight-fly)
- [Live Preview](https://halolight.fly.dev)
- [Fly.io Documentation](https://fly.io/docs)
