<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'

interface Props {
  threshold?: number
  duration?: number
  showProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 300,
  duration: 500,
  showProgress: true,
})

const { lang } = useData()

// i18n
const ariaLabel = computed(() => {
  const isEn = lang.value === 'en-US'
  return isEn
    ? `Back to top (${scrollPercent.value}%)`
    : `返回顶部 (${scrollPercent.value}%)`
})

const isVisible = ref(false)
const scrollPercent = ref(0)

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const percent = scrollHeight > 0 ? Math.min(Math.round((scrollTop / scrollHeight) * 100), 100) : 0

  scrollPercent.value = percent
  isVisible.value = scrollTop > props.threshold
}

const scrollToTop = () => {
  const startPosition = window.scrollY
  const startTime = performance.now()

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progressRatio = Math.min(elapsed / props.duration, 1)
    const easeProgress = easeOutCubic(progressRatio)

    window.scrollTo(0, startPosition * (1 - easeProgress))

    if (progressRatio < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

const progressStyle = computed(() => {
  const circumference = 2 * Math.PI * 46
  const offset = circumference * (1 - scrollPercent.value / 100)
  return {
    strokeDasharray: `${circumference}`,
    strokeDashoffset: `${offset}`,
  }
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="back-to-top">
    <button
      v-if="isVisible"
      class="back-to-top-btn"
      :class="{ 'with-progress': showProgress }"
      :aria-label="ariaLabel"
      @click="scrollToTop"
    >
      <!-- Progress Ring -->
      <svg
        v-if="showProgress"
        class="progress-ring"
        viewBox="0 0 100 100"
      >
        <!-- Background Ring -->
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          class="ring-bg"
        />
        <!-- Progress Ring -->
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          class="ring-progress"
          :style="progressStyle"
        />
      </svg>

      <!-- Content -->
      <div class="btn-content">
        <span v-if="showProgress" class="percent">{{ scrollPercent }}%</span>
        <svg
          class="arrow-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </div>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top-btn {
  position: fixed;
  bottom: 80px;
  right: 24px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.25s ease;
}

.back-to-top-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.back-to-top-btn.with-progress {
  width: 56px;
  height: 56px;
}

.progress-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  color: var(--vp-c-divider);
}

.ring-progress {
  color: var(--vp-c-brand-1);
  transition: stroke-dashoffset 0.3s ease;
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.percent {
  font-size: 10px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.arrow-icon {
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.back-to-top-btn:hover .arrow-icon {
  color: var(--vp-c-brand-1);
}

/* Transition Animation */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

@media (max-width: 768px) {
  .back-to-top-btn {
    right: 16px;
    bottom: 72px;
    width: 44px;
    height: 44px;
  }

  .back-to-top-btn.with-progress {
    width: 48px;
    height: 48px;
  }
}
</style>
