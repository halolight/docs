<script setup lang="ts">
import { useRouter, useData } from 'vitepress'
import { ref, onMounted, onUnmounted, computed } from 'vue'

const router = useRouter()
const { lang } = useData()
const countdown = ref(10)
let timer: ReturnType<typeof setInterval>

// i18n translations
const i18n = {
  'zh-CN': {
    title: '页面未找到',
    description: '抱歉，您访问的页面不存在或已被移除。',
    countdown: '秒后自动返回首页...',
    home: '返回首页',
    docs: '查看文档',
  },
  'en-US': {
    title: 'Page Not Found',
    description: 'Sorry, the page you visited does not exist or has been removed.',
    countdown: 'seconds until redirect to home...',
    home: 'Go Home',
    docs: 'View Docs',
  },
}

const t = computed(() => {
  const locale = lang.value === 'en-US' ? 'en-US' : 'zh-CN'
  return i18n[locale]
})

const isEnglish = computed(() => lang.value === 'en-US')

onMounted(() => {
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      router.go(isEnglish.value ? '/en/' : '/')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function goHome() {
  if (timer) clearInterval(timer)
  router.go(isEnglish.value ? '/en/' : '/')
}

function goDocs() {
  if (timer) clearInterval(timer)
  router.go(isEnglish.value ? '/en/guide/' : '/guide/')
}
</script>

<template>
  <div class="not-found">
    <div class="container">
      <p class="code">404</p>
      <h1 class="title">{{ t.title }}</h1>
      <p class="description">
        {{ t.description }}
      </p>
      <p class="countdown">
        {{ countdown }} {{ t.countdown }}
      </p>
      <div class="actions">
        <button class="btn primary" @click="goHome">{{ t.home }}</button>
        <button class="btn secondary" @click="goDocs">{{ t.docs }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  text-align: center;
  padding: 48px 24px;
}

.container {
  max-width: 400px;
}

.code {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 1rem 0;
}

.description {
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.countdown {
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn.primary {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.btn.primary:hover {
  background: var(--vp-c-brand-2);
}

.btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn.secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
