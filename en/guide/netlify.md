# Netlify Deployment

HaloLight Netlify deployment edition, a one-click deployment solution optimized for the Netlify platform.

**Live Preview**: [https://halolight-netlify.h7ml.cn](https://halolight-netlify.h7ml.cn)

**GitHub**: [https://github.com/halolight/halolight-netlify](https://github.com/halolight/halolight-netlify)

## Features

- 🔷 **One-Click Deploy** - Deploy to Netlify button for fast launch
- ⚡ **Global CDN** - 300+ edge nodes for lightning-fast delivery
- 🔄 **Automatic CI/CD** - Git push triggers auto build and deploy
- 📝 **Form Handling** - Backend-free form submissions
- 🔐 **Identity** - Built-in user authentication service
- 🌐 **Functions** - Serverless functions (AWS Lambda)
- 🔗 **Split Testing** - A/B testing and traffic splitting
- 📊 **Analytics** - Server-side analytics (paid)

## Quick Start

### Method 1: One-Click Deploy (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/halolight/halolight-netlify)

After clicking the button:
1. Sign in to Netlify (supports GitHub/GitLab/Bitbucket)
2. Authorize repository access
3. Configure environment variables
4. Auto-clone and deploy

### Method 2: CLI Deploy

\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Sign in to Netlify
netlify login

# Clone project
git clone https://github.com/halolight/halolight-netlify.git
cd halolight-netlify

# Install dependencies
pnpm install

# Initialize Netlify site
netlify init

# Local development (with Functions)
netlify dev

# Deploy to production
netlify deploy --prod
\`\`\`

### Method 3: GitHub Integration

1. Fork the [halolight-netlify](https://github.com/halolight/halolight-netlify) repository
2. In the Netlify console click "Add new site" → "Import an existing project"
3. Choose GitHub and authorize
4. Select your Fork
5. Configure build settings and deploy

## Configuration Files

### netlify.toml

\`\`\`toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  PNPM_VERSION = "9"

# Next.js plugin (auto handles SSR/ISR)
[[plugins]]
  package = "@netlify/plugin-nextjs"

# Production
[context.production]
  command = "pnpm build"

[context.production.environment]
  NEXT_PUBLIC_MOCK = "false"

# Preview (branch deploy)
[context.deploy-preview]
  command = "pnpm build"

[context.deploy-preview.environment]
  NEXT_PUBLIC_MOCK = "true"

# Branch deploys
[context.branch-deploy]
  command = "pnpm build"

# Redirect rules
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

# SPA fallback
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

# Custom headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
\`\`\`

### package.json Scripts

\`\`\`json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "netlify:dev": "netlify dev",
    "netlify:build": "netlify build",
    "netlify:deploy": "netlify deploy --prod"
  }
}
\`\`\`

## Environment Variables

In Netlify console → Site settings → Environment variables:

| Variable | Description | Example |
|--------|------|------|
| \`NODE_ENV\` | Runtime environment | \`production\` |
| \`NEXT_PUBLIC_API_URL\` | Base API URL | \`/api\` |
| \`NEXT_PUBLIC_MOCK\` | Enable mock data | \`false\` |
| \`NEXT_PUBLIC_APP_TITLE\` | App title | \`Admin Pro\` |
| \`DATABASE_URL\` | Database connection | \`postgresql://...\` |

### Environment Variable Scopes

Netlify supports per-context variables:

\`\`\`
Production     - Production environment variables
Deploy Preview - PR preview variables
Branch Deploy  - Branch deploy variables
All            - Shared across all environments
\`\`\`

## Serverless Functions

### Basic Function

\`\`\`typescript
// netlify/functions/hello.ts
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const { httpMethod, body, queryStringParameters } = event;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello from Netlify Functions!",
      method: httpMethod,
      query: queryStringParameters,
    }),
  };
};
\`\`\`

### Background Function (Long Running)

\`\`\`typescript
// netlify/functions/background-task.ts
import type { BackgroundHandler } from "@netlify/functions";

export const handler: BackgroundHandler = async (event) => {
  // Maximum runtime 15 minutes
  console.log("Processing background task...");

  // Perform time-consuming operations
  await processLongRunningTask(event.body);

  // Background functions don't return a response
};

// Configure as background function
export const config = {
  type: "background",
};
\`\`\`

### Scheduled Functions

\`\`\`typescript
// netlify/functions/daily-report.ts
import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  console.log("Generating daily report...");

  await generateReport();

  return {
    statusCode: 200,
    body: "Report generated",
  };
};

// Run daily at 9:00 UTC
export const config = {
  schedule: "0 9 * * *",
};
\`\`\`

### Edge Functions

\`\`\`typescript
// netlify/edge-functions/geolocation.ts
import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const { country, city } = context.geo;

  // Geo-based response
  return new Response(
    JSON.stringify({
      country,
      city,
      message: \`Hello from \${city}, \${country}!\`,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const config = {
  path: "/api/geo",
};
\`\`\`

## Netlify Identity

### Configure Authentication

\`\`\`typescript
// lib/netlify-identity.ts
import netlifyIdentity from "netlify-identity-widget";

// Initialize
netlifyIdentity.init({
  container: "#netlify-modal",
  locale: "zh",
});

// Login
export function login() {
  netlifyIdentity.open("login");
}

// Signup
export function signup() {
  netlifyIdentity.open("signup");
}

// Logout
export function logout() {
  netlifyIdentity.logout();
}

// Get current user
export function getCurrentUser() {
  return netlifyIdentity.currentUser();
}

// Listen for auth state
netlifyIdentity.on("login", (user) => {
  console.log("User logged in:", user);
  netlifyIdentity.close();
});

netlifyIdentity.on("logout", () => {
  console.log("User logged out");
});
\`\`\`

### Protected Function

\`\`\`typescript
// netlify/functions/protected.ts
import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const { user } = event.context.clientContext || {};

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello \${user.email}!`,
      roles: user.app_metadata?.roles || [],
    }),
  };
};
```

## Form Handling

### HTML Form

\`\`\`html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden">
    <label>Don't fill this out: <input name="bot-field" /></label>
  </p>
  <p>
    <label>Email: <input type="email" name="email" required /></label>
  </p>
  <p>
    <label>Message: <textarea name="message" required></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
\`\`\`

### React Form

\`\`\`tsx
// components/ContactForm.tsx
"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      {/* Form fields */}
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      {status === "success" && <p>Message sent!</p>}
      {status === "error" && <p>Error sending message</p>}
    </form>
  );
}
\`\`\`

## Common Commands

\`\`\`bash
# Sign in
netlify login

# View site status
netlify status

# Local development
netlify dev

# Build
netlify build

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site
netlify open

# Open dashboard
netlify open:admin

# View logs
netlify logs

# Environment variables
netlify env:list
netlify env:set KEY value
netlify env:unset KEY

# Link to site
netlify link

# Unlink
netlify unlink
\`\`\`

## Monitoring and Logs

### View Logs

\`\`\`bash
# CLI view logs
netlify logs

# Live log stream
netlify logs --live

# Function logs
netlify logs:function hello
\`\`\`

### Build Plugins

\`\`\`toml
# netlify.toml

# Performance analysis
[[plugins]]
  package = "netlify-plugin-lighthouse"

# Cache optimization
[[plugins]]
  package = "netlify-plugin-cache"
  [plugins.inputs]
    paths = [".next/cache", "node_modules/.cache"]

# Commit status notifications
[[plugins]]
  package = "netlify-plugin-checklinks"
\`\`\`

## Custom Domains

### Add Domain

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain

### DNS Configuration

\`\`\`
# A record (root)
Type: A
Name: @
Value: 75.2.60.5

# CNAME record (subdomain)
Type: CNAME
Name: www
Value: your-site.netlify.app
\`\`\`

### HTTPS

Netlify configures HTTPS automatically:
- Automatically requests Let's Encrypt certificates
- Auto renewal
- Enforces HTTPS redirects

## Branch Deploys and Previews

### Deploy Contexts

| Context | Trigger | URL format |
|--------|----------|----------|
| Production | main branch push | \`your-site.netlify.app\` |
| Deploy Preview | PR created/updated | \`deploy-preview-123--your-site.netlify.app\` |
| Branch Deploy | Other branch push | \`branch-name--your-site.netlify.app\` |

### Lock Deploys

\`\`\`bash
# Lock current deploy (stop auto deploys)
netlify deploy:lock

# Unlock
netlify deploy:unlock
\`\`\`

## FAQ

### Q: What if the build fails?

A: Check the following:
1. Review build logs and ensure dependencies install correctly
2. Confirm \`pnpm-lock.yaml\` is committed
3. Check Node.js version (build.environment.NODE_VERSION)
4. Verify the build command is correct

### Q: How to roll back a deployment?

A: On the Deploys page:
1. Find a previous successful deploy
2. Click "Publish deploy"
3. Or use CLI: \`netlify rollback\`

### Q: Functions cold starts are slow?

A: Optimization tips:
1. Reduce function bundle size
2. Use Edge Functions (no cold start)
3. Use Background Functions for heavy tasks

### Q: How to set redirects?

A: Configure in \`netlify.toml\` or \`_redirects\`:

\`\`\`toml
# netlify.toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301

# Proxy
[[redirects]]
  from = "/api/*"
  to = "https://api.example.com/:splat"
  status = 200
\`\`\`

## Pricing

| Plan | Price | Features |
|------|------|------|
| Starter | Free | 100GB bandwidth, 300 build minutes |
| Pro | $19/member/month | 1TB bandwidth, 25000 build minutes |
| Business | $99/member/month | Custom SLA, SSO |
| Enterprise | Contact sales | Dedicated support, compliance |

### Functions Quotas

| Plan | Invocations | Runtime |
|------|----------|----------|
| Starter | 125K/month | 100 hours |
| Pro | Unlimited | 1000 hours |

## Comparison With Other Platforms

| Feature | Netlify | Vercel | Cloudflare |
|------|---------|--------|------------|
| One-click deploy | ✅ | ✅ | ✅ |
| Edge Functions | ✅ | ✅ | ✅ |
| Form handling | ✅ Built-in | ❌ External | ❌ External |
| Identity | ✅ Built-in | ❌ External | ✅ Access |
| Free bandwidth | 100GB | 100GB | Unlimited |
| Free builds | 300 minutes | 6000 minutes | 500 runs |
| Split Testing | ✅ | ⚠️ Limited | ❌ |

## Related Links

- [Live Preview](https://halolight-netlify.h7ml.cn)
- [GitHub Repository](https://github.com/halolight/halolight-netlify)
- [Netlify Docs](https://docs.netlify.com)
- [Netlify CLI Docs](https://cli.netlify.com)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview)
- [HaloLight Docs](https://docs.halolight.h7ml.cn)
