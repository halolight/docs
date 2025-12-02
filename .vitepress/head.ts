import type { HeadConfig } from 'vitepress'

const SITE_URL = 'https://halolight.docs.h7ml.cn'
const SITE_TITLE = 'HaloLight'
const SITE_DESCRIPTION = 'HaloLight 多框架管理后台解决方案文档 - 一套设计规范，多框架实现的企业级 Admin Dashboard，支持 Next.js、Vue、Angular 等 12 种框架'
const SITE_KEYWORDS = 'HaloLight,Admin,Dashboard,管理后台,Next.js,Vue,React,Angular,TypeScript,Tailwind CSS,shadcn/ui,企业级,多框架'

export const head: HeadConfig[] = [
  // Favicon
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],

  // SEO Meta Tags
  ['meta', { name: 'keywords', content: SITE_KEYWORDS }],
  ['meta', { name: 'author', content: 'HaloLight Team' }],
  ['meta', { name: 'robots', content: 'index, follow' }],
  ['meta', { name: 'googlebot', content: 'index, follow' }],

  // Open Graph
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:site_name', content: SITE_TITLE }],
  ['meta', { property: 'og:title', content: SITE_TITLE }],
  ['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
  ['meta', { property: 'og:url', content: SITE_URL }],
  ['meta', { property: 'og:image', content: `${SITE_URL}/og-image.png` }],
  ['meta', { property: 'og:locale', content: 'zh_CN' }],

  // Twitter Card
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'twitter:title', content: SITE_TITLE }],
  ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION }],
  ['meta', { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }],

  // Theme Color
  ['meta', { name: 'theme-color', content: '#5b8def' }],
  ['meta', { name: 'msapplication-TileColor', content: '#5b8def' }],

  // PWA
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
  ['meta', { name: 'apple-mobile-web-app-title', content: SITE_TITLE }],
  ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],

  // RSS
  ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'HaloLight RSS Feed', href: '/feed.xml' }],

  // Canonical
  ['link', { rel: 'canonical', href: SITE_URL }],

  // 51.la 统计
  ['script', { charset: 'UTF-8', id: 'LA_COLLECT', src: '//sdk.51.la/js-sdk-pro.min.js?id=L1NaKSoU1jvMh9mE&ck=L1NaKSoU1jvMh9mE&autoTrack=true&hashMode=true&screenRecord=true' }],

  // Google Analytics
  ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XMS590XWNN' }],
  ['script', {}, `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-XMS590XWNN');`],
]

export { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS }
