<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// i18n config
const i18n = {
  'zh-CN': {
    title: '欢迎',
    body: [
      'HaloLight 多框架管理后台文档已上线!',
      '支持 12+ 框架版本，欢迎体验。',
    ],
    buttons: [
      { text: '在线预览', link: 'https://halolight.h7ml.cn/', primary: true },
      { text: 'GitHub', link: 'https://github.com/halolight', primary: false },
    ],
    toggleTitle: '公告',
  },
  'en-US': {
    title: 'Welcome',
    body: [
      'HaloLight multi-framework admin dashboard docs is now live!',
      'Supports 12+ framework versions. Welcome to try.',
    ],
    buttons: [
      { text: 'Live Preview', link: 'https://halolight.h7ml.cn/', primary: true },
      { text: 'GitHub', link: 'https://github.com/halolight', primary: false },
    ],
    toggleTitle: 'Announcement',
  },
}

const config = computed(() => {
  return i18n[lang.value as keyof typeof i18n] || i18n['zh-CN']
})

// isOpen controls expanded/collapsed state
const isOpen = ref(true)
const STORAGE_KEY = 'vp-announcement-minimized'

onMounted(() => {
  // Check if user minimized the announcement in current session
  const minimized = sessionStorage.getItem(STORAGE_KEY)
  if (minimized === 'true') {
    isOpen.value = false
  }
})

function toggle() {
  isOpen.value = !isOpen.value
  sessionStorage.setItem(STORAGE_KEY, isOpen.value ? 'false' : 'true')
}

function minimize() {
  isOpen.value = false
  sessionStorage.setItem(STORAGE_KEY, 'true')
}
</script>

<template>
  <!-- Toggle Button (shown when minimized) -->
  <button
    v-show="!isOpen"
    class="announcement-toggle"
    :title="config.toggleTitle"
    @click="toggle"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
    <span class="badge">1</span>
  </button>

  <!-- Full Announcement Panel -->
  <Transition name="announcement">
    <div v-show="isOpen" class="announcement-container">
      <div class="announcement-header">
        <span class="announcement-icon">🔔</span>
        <span class="announcement-title">{{ config.title }}</span>
        <button class="announcement-close" :title="lang === 'en-US' ? 'Minimize' : '最小化'" @click="minimize">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div class="announcement-body">
        <p v-for="(text, index) in config.body" :key="index">{{ text }}</p>
      </div>
      <div class="announcement-footer">
        <a
          v-for="(btn, index) in config.buttons"
          :key="index"
          :href="btn.link"
          target="_blank"
          rel="noopener noreferrer"
          :class="['announcement-btn', btn.primary ? 'primary' : 'secondary']"
        >
          {{ btn.text }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Toggle Button */
.announcement-toggle {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 100;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.announcement-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.announcement-toggle .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-danger-1);
  color: white;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Full Panel */
.announcement-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 100;
  width: 320px;
  background: var(--vp-c-bg-elevated);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.announcement-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--vp-c-brand-1);
  color: white;
}

.announcement-icon {
  font-size: 16px;
}

.announcement-title {
  flex: 1;
  font-weight: 600;
  font-size: 14px;
}

.announcement-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.announcement-close:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.announcement-body {
  padding: 16px;
  background: var(--vp-c-bg);
}

.announcement-body p {
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.announcement-body p:last-child {
  margin-bottom: 0;
}

.announcement-footer {
  display: flex;
  gap: 12px;
  padding: 0 16px 16px;
  background: var(--vp-c-bg);
}

.announcement-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.announcement-btn.primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.announcement-btn.primary:hover {
  background: var(--vp-c-brand-2);
}

.announcement-btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.announcement-btn.secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}

/* Animation */
.announcement-enter-active,
.announcement-leave-active {
  transition: all 0.3s ease;
}

.announcement-enter-from,
.announcement-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Mobile */
@media (max-width: 768px) {
  .announcement-toggle {
    top: auto;
    bottom: 140px;
    right: 16px;
  }

  .announcement-container {
    top: auto;
    bottom: 80px;
    right: 16px;
    left: 16px;
    width: auto;
  }
}
</style>
