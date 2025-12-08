import type { DefaultTheme } from 'vitepress'

// 框架版本预览链接
const frameworkPreviews: DefaultTheme.NavItemWithLink[] = [
  { text: '🟦 Next.js', link: 'https://halolight.h7ml.cn/' },
  { text: '⚛️ React', link: 'https://halolight-react.h7ml.cn/' },
  { text: '💚 Vue', link: 'https://halolight-vue.h7ml.cn/' },
  { text: '🔺 Angular', link: 'https://halolight-angular.h7ml.cn/' },
  { text: '🌿 Nuxt', link: 'https://halolight-nuxt.h7ml.cn/' },
  { text: '🧡 SvelteKit', link: 'https://halolight-svelte.h7ml.cn/' },
  { text: '🪐 Astro', link: 'https://halolight-astro.h7ml.cn/' },
  { text: '💠 Solid.js', link: 'https://halolight-solid.h7ml.cn/' },
  { text: '⚡ Qwik', link: 'https://halolight-qwik.h7ml.cn/' },
  { text: '🎸 Remix', link: 'https://halolight-remix.h7ml.cn/' },
  { text: '🪶 Preact', link: 'https://halolight-preact.h7ml.cn/' },
  { text: '🔥 Lit', link: 'https://halolight-lit.h7ml.cn/' },
  { text: '🦖 Fresh (Deno)', link: 'https://halolight-fresh.h7ml.cn/' },
]

// 部署版本预览链接
const deployPreviews: DefaultTheme.NavItemWithLink[] = [
  { text: '☁️ Cloudflare', link: 'https://halolight-cloudflare.h7ml.cn/' },
  { text: '▲ Vercel', link: 'https://halolight-vercel.h7ml.cn/' },
  { text: '🔷 Netlify', link: 'https://halolight-netlify.h7ml.cn/' },
  { text: '🚂 Railway', link: 'https://halolight-railway.h7ml.cn/' },
  { text: '✈️ Fly.io', link: 'https://halolight-fly.h7ml.cn/' },
  { text: '☁️ Azure', link: 'https://halolight-azure.h7ml.cn/' },
  { text: '🟠 AWS', link: 'https://halolight-aws.h7ml.cn/' },
]

// 后端服务预览链接
const backendPreviews: DefaultTheme.NavItemWithLink[] = [
  { text: '🦕 Deno API', link: 'https://halolight-deno.h7ml.cn/' },
  { text: '🐹 Go API', link: 'https://halolight-api-go.h7ml.cn/' },
  { text: '🟩 Node.js API', link: 'https://halolight-api-node.h7ml.cn/' },
  { text: '🏗️ NestJS API', link: 'https://halolight-api-nestjs.h7ml.cn/' },
  { text: '☕ Java API', link: 'https://halolight-api-java.h7ml.cn/' },
  { text: '🛠️ Admin', link: 'https://halolight-admin.h7ml.cn/' },
]

// 中文导航栏配置
export const zhNav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  { text: '指南', link: '/guide/' },
  { text: '开发', link: '/development/' },
  {
    text: '预览',
    items: [
      {
        text: '框架版本',
        items: frameworkPreviews,
      },
      {
        text: '部署版本',
        items: deployPreviews,
      },
      {
        text: '后端服务',
        items: backendPreviews,
      },
    ],
  },
  {
    text: 'GitHub',
    items: [
      { text: '🏠 组织主页', link: 'https://github.com/halolight' },
      { text: '📚 文档仓库', link: 'https://github.com/halolight/docs' },
      { text: '🟦 Next.js 仓库', link: 'https://github.com/halolight/halolight' },
      { text: '💚 Vue 仓库', link: 'https://github.com/halolight/halolight-vue' },
    ],
  },
]

// 英文导航栏配置
export const enNav: DefaultTheme.NavItem[] = [
  { text: 'Home', link: '/en/' },
  { text: 'Guide', link: '/en/guide/' },
  { text: 'Development', link: '/en/development/' },
  {
    text: 'Preview',
    items: [
      {
        text: 'Framework Versions',
        items: frameworkPreviews,
      },
      {
        text: 'Deployment Options',
        items: deployPreviews,
      },
      {
        text: 'Backend Services',
        items: backendPreviews,
      },
    ],
  },
  {
    text: 'GitHub',
    items: [
      { text: '🏠 Organization', link: 'https://github.com/halolight' },
      { text: '📚 Docs Repo', link: 'https://github.com/halolight/docs' },
      { text: '🟦 Next.js Repo', link: 'https://github.com/halolight/halolight' },
      { text: '💚 Vue Repo', link: 'https://github.com/halolight/halolight-vue' },
    ],
  },
]
