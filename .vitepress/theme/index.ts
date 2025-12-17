import { h, onMounted, watch, nextTick } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import { setupLocaleRedirect, saveUserLocalePreference, getCurrentLocale } from './locale-redirect'
import NotFound from './NotFound.vue'
import Footer from './Footer.vue'
import Comment from './Comment.vue'
import BackToTop from './BackToTop.vue'
import SeoMeta from '../components/SeoMeta.vue'
// import Announcement from './Announcement.vue'
import { AiChat } from './ai-chat'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound),
      // 'layout-top': () => h(Announcement),
      'layout-bottom': () => [h(Footer), h(AiChat)],
      'doc-after': () => h(Comment),
      'aside-outline-after': () => h(BackToTop),
      'doc-before': () => h(SeoMeta), // SEO Meta 标签
    })
  },
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
  },
  setup() {
    const route = useRoute()

    const initZoom = () => {
      mediumZoom('.main img', {
        background: 'var(--vp-c-bg)',
      })
    }

    // Track previous locale to detect manual language switches
    let previousLocale: string | null = null

    onMounted(() => {
      // Initialize image zoom
      initZoom()

      // Setup automatic locale redirect based on browser language
      setupLocaleRedirect()

      // Store initial locale
      if (typeof window !== 'undefined') {
        previousLocale = getCurrentLocale(window.location.pathname)
      }
    })

    watch(
      () => route.path,
      (newPath: string) => {
        // Reinitialize zoom on route change
        nextTick(() => initZoom())

        // Detect manual locale change and save preference
        if (typeof window !== 'undefined') {
          const currentLocale = getCurrentLocale(newPath)

          // If locale changed, save preference
          if (previousLocale !== null && currentLocale !== previousLocale) {
            console.debug('[VitePress] Detected manual locale change:', previousLocale, '→', currentLocale)
            saveUserLocalePreference(currentLocale)
          }
          previousLocale = currentLocale
        }
      }
    )
  },
} satisfies Theme
