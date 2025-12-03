import type { HeadConfig } from 'vitepress'

// Site Configuration
export const SITE_URL = 'https://halolight.docs.h7ml.cn'
export const SITE_TITLE = 'HaloLight'

// Localized Content
export const SITE_CONTENT = {
  zh: {
    description: 'HaloLight 多框架管理后台解决方案文档 - 一套设计规范，多框架实现的企业级 Admin Dashboard，支持 Next.js、Vue、Angular 等 12 种框架',
    keywords: 'HaloLight,Admin,Dashboard,管理后台,Next.js,Vue,React,Angular,TypeScript,Tailwind CSS,shadcn/ui,企业级,多框架',
    ogLocale: 'zh_CN',
  },
  en: {
    description: 'HaloLight Multi-Framework Admin Dashboard Documentation - One design specification, multiple framework implementations for enterprise-level solutions, supporting 12+ frameworks',
    keywords: 'HaloLight,Admin,Dashboard,Next.js,Vue,React,Angular,TypeScript,Tailwind CSS,shadcn/ui,Enterprise,Multi-Framework',
    ogLocale: 'en_US',
  },
}

// For backward compatibility
export const SITE_DESCRIPTION = SITE_CONTENT.zh.description
export const SITE_KEYWORDS = SITE_CONTENT.zh.keywords

// Common head config (shared across all locales)
export const head: HeadConfig[] = [
  // Favicon
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
  ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5b8def' }],

  // SEO Meta Tags
  ['meta', { name: 'author', content: 'HaloLight Team' }],
  ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
  ['meta', { name: 'googlebot', content: 'index, follow' }],
  ['meta', { name: 'bingbot', content: 'index, follow' }],
  ['meta', { name: 'generator', content: 'VitePress' }],

  // Open Graph (defaults, will be overridden per locale)
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:site_name', content: SITE_TITLE }],
  ['meta', { property: 'og:title', content: SITE_TITLE }],
  ['meta', { property: 'og:url', content: SITE_URL }],
  ['meta', { property: 'og:image', content: `${SITE_URL}/og-image.png` }],
  ['meta', { property: 'og:image:width', content: '1200' }],
  ['meta', { property: 'og:image:height', content: '630' }],
  ['meta', { property: 'og:image:alt', content: 'HaloLight - Multi-Framework Admin Dashboard' }],

  // Twitter Card
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'twitter:site', content: '@halolight' }],
  ['meta', { name: 'twitter:creator', content: '@h7ml' }],
  ['meta', { name: 'twitter:title', content: SITE_TITLE }],
  ['meta', { name: 'twitter:image', content: `${SITE_URL}/og-image.png` }],

  // Theme Color
  ['meta', { name: 'theme-color', content: '#5b8def', media: '(prefers-color-scheme: light)' }],
  ['meta', { name: 'theme-color', content: '#1a1a2e', media: '(prefers-color-scheme: dark)' }],
  ['meta', { name: 'msapplication-TileColor', content: '#5b8def' }],
  ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],

  // PWA
  ['meta', { name: 'application-name', content: SITE_TITLE }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
  ['meta', { name: 'apple-mobile-web-app-title', content: SITE_TITLE }],
  ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'format-detection', content: 'telephone=no' }],
  ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],

  // RSS
  ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'HaloLight RSS Feed', href: '/feed.xml' }],
  ['link', { rel: 'alternate', type: 'application/atom+xml', title: 'HaloLight Atom Feed', href: '/atom.xml' }],

  // Canonical
  ['link', { rel: 'canonical', href: SITE_URL }],

  // Preconnect for performance
  ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ['link', { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }],

  // Structured Data (JSON-LD)
  ['script', { type: 'application/ld+json' }, JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': SITE_TITLE,
    'url': SITE_URL,
    'description': SITE_CONTENT.en.description,
    'author': {
      '@type': 'Organization',
      'name': 'HaloLight Team',
      'url': 'https://github.com/halolight',
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  })],

  // 51.la Analytics
  ['script', { charset: 'UTF-8', id: 'LA_COLLECT', src: '//sdk.51.la/js-sdk-pro.min.js?id=L1NaKSoU1jvMh9mE&ck=L1NaKSoU1jvMh9mE&autoTrack=true&hashMode=true&screenRecord=true' }],

  // Google Analytics
  ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XMS590XWNN' }],
  ['script', {}, `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-XMS590XWNN');`],
]

// Locale-specific head configs
export const zhHead: HeadConfig[] = [
  ['meta', { name: 'keywords', content: SITE_CONTENT.zh.keywords }],
  ['meta', { name: 'description', content: SITE_CONTENT.zh.description }],
  ['meta', { property: 'og:description', content: SITE_CONTENT.zh.description }],
  ['meta', { property: 'og:locale', content: SITE_CONTENT.zh.ogLocale }],
  ['meta', { name: 'twitter:description', content: SITE_CONTENT.zh.description }],
]

export const enHead: HeadConfig[] = [
  ['meta', { name: 'keywords', content: SITE_CONTENT.en.keywords }],
  ['meta', { name: 'description', content: SITE_CONTENT.en.description }],
  ['meta', { property: 'og:description', content: SITE_CONTENT.en.description }],
  ['meta', { property: 'og:locale', content: SITE_CONTENT.en.ogLocale }],
  ['meta', { name: 'twitter:description', content: SITE_CONTENT.en.description }],
]
