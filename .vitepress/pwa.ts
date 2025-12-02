import type { PwaOptions } from '@vite-pwa/vitepress'
import { SITE_DESCRIPTION } from './head'

export const pwaOptions: Partial<PwaOptions> = {
  mode: 'production',
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'logo.svg', 'apple-touch-icon.png'],
  manifest: {
    name: 'HaloLight Docs',
    short_name: 'HaloLight',
    description: SITE_DESCRIPTION,
    theme_color: '#5b8def',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    // 排除 HTML 文件，避免缓存导致部署后不更新
    globPatterns: ['**/*.{css,js,svg,png,ico,txt,woff2}'],
    // HTML 使用 NetworkFirst 策略，优先获取最新版本
    navigateFallback: undefined,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}
