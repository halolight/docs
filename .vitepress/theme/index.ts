import { h, onMounted, watch, nextTick } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import NotFound from './NotFound.vue'
import Footer from './Footer.vue'
import Comment from './Comment.vue'
import BackToTop from './BackToTop.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(NotFound),
      'layout-bottom': () => h(Footer),
      'doc-after': () => h(Comment),
      'aside-outline-after': () => h(BackToTop),
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

    onMounted(() => {
      initZoom()
    })

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
} satisfies Theme
