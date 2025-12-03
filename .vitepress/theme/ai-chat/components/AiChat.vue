<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'
import { marked } from 'marked'
import type { Message, Session, Settings, UIState, ProviderId, PageContext } from '../types'
import { PROVIDERS } from '../types'
import { encrypt, decrypt, getEncryptionSecret } from '../services/crypto'
import {
  loadSessions,
  saveSessions,
  loadSettings,
  saveSettings,
  createSession,
  generateId,
} from '../services/storage'
import { chat } from '../services/ai-provider'
import { getMessages } from '../locales'

// Configure marked for safe rendering
marked.setOptions({
  gfm: true,
  breaks: true,
})

const { lang, page, frontmatter } = useData()
const route = useRoute()

// i18n - auto switch based on VitePress locale
const t = computed(() => getMessages(lang.value))

// Get current page context for AI
function getPageContext(): PageContext {
  const title = frontmatter.value?.title || page.value?.title || document.title
  const path = route.path

  // Get main content from VitePress content area
  let content = ''
  const contentEl = document.querySelector('.VPDoc .vp-doc')
  if (contentEl) {
    // Get text content, limit to prevent token explosion
    content = contentEl.textContent?.slice(0, 8000) || ''
  }

  return { title, path, content }
}

// ============ State ============

const ui = reactive<UIState>({
  isOpen: false,
  isFullscreen: false,
  showSettings: false,
  sidebarCollapsed: false,
})

const settings = reactive<Settings>(loadSettings())
const sessions = ref<Session[]>(loadSessions())
const activeSessionId = ref<string | null>(null)
const inputMessage = ref('')
const isLoading = ref(false)
const abortController = ref<AbortController | null>(null)
const apiKeyInput = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

// Custom models management
const customModels = ref<string[]>(loadCustomModels())
const newModelInput = ref('')
const showAddModel = ref(false)

function loadCustomModels(): string[] {
  try {
    const saved = localStorage.getItem('vp-ai-custom-models')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCustomModels() {
  localStorage.setItem('vp-ai-custom-models', JSON.stringify(customModels.value))
}

function addCustomModel() {
  const model = newModelInput.value.trim()
  if (!model) return

  // Check for duplicates
  const isDuplicate = customModels.value.includes(model) || currentProvider.value.models.includes(model)
  if (isDuplicate) {
    // Model already exists - just select it and close form
    settings.model = model
    saveSettings(settings)
    newModelInput.value = ''
    showAddModel.value = false
    return
  }

  // Add new custom model
  customModels.value.push(model)
  saveCustomModels()
  settings.model = model
  saveSettings(settings)
  newModelInput.value = ''
  showAddModel.value = false
}

function removeCustomModel(model: string) {
  const index = customModels.value.indexOf(model)
  customModels.value = customModels.value.filter(m => m !== model)
  saveCustomModels()
  // If current model was deleted, switch to next available
  if (settings.model === model) {
    // Try next custom model, then previous, then fallback to preset default
    const nextCustom = customModels.value[index] || customModels.value[index - 1]
    settings.model = nextCustom || currentProvider.value.defaultModel
    saveSettings(settings)
  }
}

// ============ Computed ============

const activeSession = computed(() => {
  if (!activeSessionId.value) return null
  return sessions.value.find(s => s.id === activeSessionId.value) || null
})

const messages = computed(() => activeSession.value?.messages || [])

const hasApiKey = computed(() => !!settings.apiKeyCipher)

const currentProvider = computed(() => PROVIDERS[settings.provider])

// ============ Methods ============

function togglePanel() {
  ui.isOpen = !ui.isOpen
  if (ui.isOpen && !activeSessionId.value && sessions.value.length > 0) {
    activeSessionId.value = sessions.value[0].id
  }
}

function toggleFullscreen() {
  ui.isFullscreen = !ui.isFullscreen
}

function toggleSettings() {
  ui.showSettings = !ui.showSettings
}

function toggleSidebar() {
  ui.sidebarCollapsed = !ui.sidebarCollapsed
}

function startNewChat() {
  const session = createSession(settings.provider, settings.model)
  sessions.value.unshift(session)
  activeSessionId.value = session.id
  saveSessions(sessions.value)
}

function selectSession(id: string) {
  activeSessionId.value = id
}

function deleteSessionById(id: string) {
  sessions.value = sessions.value.filter(s => s.id !== id)
  saveSessions(sessions.value)
  if (activeSessionId.value === id) {
    activeSessionId.value = sessions.value[0]?.id || null
  }
}

async function saveApiKeyFromInput() {
  if (!apiKeyInput.value.trim()) return

  const secret = getEncryptionSecret()
  const encrypted = await encrypt(apiKeyInput.value.trim(), secret)
  settings.apiKeyCipher = encrypted
  saveSettings(settings)
  apiKeyInput.value = ''
}

function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  settings[key] = value
  saveSettings(settings)
}

async function getDecryptedApiKey(): Promise<string | null> {
  if (!settings.apiKeyCipher) return null
  const secret = getEncryptionSecret()
  return await decrypt(settings.apiKeyCipher, secret)
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

async function sendMessage() {
  if (!inputMessage.value.trim() || isLoading.value) return

  const apiKey = await getDecryptedApiKey()
  if (!apiKey) {
    ui.showSettings = true
    return
  }

  // Ensure we have an active session
  if (!activeSession.value) {
    startNewChat()
  }

  const session = activeSession.value!
  const userMessage: Message = {
    id: generateId(),
    role: 'user',
    content: inputMessage.value.trim(),
    createdAt: Date.now(),
  }

  session.messages.push(userMessage)

  // Update session title from first message
  if (session.messages.length === 1) {
    session.title = userMessage.content.slice(0, 30) + (userMessage.content.length > 30 ? '...' : '')
  }

  inputMessage.value = ''
  saveSessions(sessions.value)
  scrollToBottom()

  // Create assistant message placeholder
  const assistantMessage: Message = {
    id: generateId(),
    role: 'assistant',
    content: '',
    createdAt: Date.now(),
    loading: true,
  }
  session.messages.push(assistantMessage)
  scrollToBottom()

  // Start streaming
  isLoading.value = true
  abortController.value = new AbortController()

  try {
    const stream = chat({
      provider: settings.provider,
      model: settings.model,
      messages: session.messages.slice(0, -1).map(m => ({
        role: m.role,
        content: m.content,
      })),
      systemPrompt: settings.systemPrompt,
      apiKey,
      baseUrl: settings.baseUrl,
      signal: abortController.value.signal,
      pageContext: getPageContext(),
    })

    for await (const chunk of stream) {
      if (chunk.error) {
        assistantMessage.error = chunk.error
        break
      }

      assistantMessage.content += chunk.content
      scrollToBottom()

      if (chunk.done) {
        break
      }
    }
  } catch (error: unknown) {
    const err = error as Error
    if (err.name !== 'AbortError') {
      assistantMessage.error = err.message || 'An error occurred'
    }
  } finally {
    assistantMessage.loading = false
    isLoading.value = false
    abortController.value = null
    saveSessions(sessions.value)
  }
}

function stopGeneration() {
  abortController.value?.abort()
}

function clearAllHistory() {
  if (confirm(t.value.confirmClear)) {
    sessions.value = []
    activeSessionId.value = null
    saveSessions([])
  }
}

function clearCurrentChat() {
  if (!activeSession.value) return
  if (confirm(t.value.confirmClearCurrent)) {
    activeSession.value.messages = []
    activeSession.value.title = t.value.newChat
    saveSessions(sessions.value)
  }
}

function deleteMessage(messageId: string) {
  if (!activeSession.value) return
  activeSession.value.messages = activeSession.value.messages.filter(m => m.id !== messageId)
  saveSessions(sessions.value)
}

function renderMarkdown(content: string): string {
  if (!content) return ''
  try {
    return marked.parse(content) as string
  } catch {
    return content
  }
}

// ============ Lifecycle ============

onMounted(() => {
  if (sessions.value.length > 0) {
    activeSessionId.value = sessions.value[0].id
  }
})

// Watch for settings changes
watch(() => settings.provider, (newProvider) => {
  const providerConfig = PROVIDERS[newProvider]
  // Keep custom models valid across provider switches
  const isPresetModel = providerConfig.models.includes(settings.model)
  const isCustomModel = customModels.value.includes(settings.model)
  if (providerConfig && !isPresetModel && !isCustomModel) {
    settings.model = providerConfig.defaultModel
    settings.baseUrl = providerConfig.baseUrl
    saveSettings(settings)
  } else if (providerConfig) {
    // Update base URL even if keeping custom model
    settings.baseUrl = providerConfig.baseUrl
    saveSettings(settings)
  }
})
</script>

<template>
  <!-- Toggle Button -->
  <button
    v-show="!ui.isOpen"
    class="ai-chat-toggle"
    :class="[settings.position]"
    :title="t.title"
    @click="togglePanel"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  </button>

  <!-- Chat Panel -->
  <div
    v-show="ui.isOpen"
    class="ai-chat-panel"
    :class="{
      'fullscreen': ui.isFullscreen,
      'bottom-left': settings.position === 'bottom-left',
      'bottom-right': settings.position === 'bottom-right',
    }"
  >
    <!-- Header -->
    <div class="ai-chat-header">
      <div class="header-left">
        <button class="icon-btn" title="Toggle sidebar" @click="toggleSidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <span class="title">{{ t.title }}</span>
      </div>
      <div class="header-actions">
        <button class="icon-btn" :title="t.newChat" @click="startNewChat">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button v-if="messages.length > 0" class="icon-btn" :title="t.clearCurrentChat" @click="clearCurrentChat">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
        <button class="icon-btn" :title="t.settings" @click="toggleSettings">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
        <button class="icon-btn" :title="ui.isFullscreen ? t.exitFullscreen : t.fullscreen" @click="toggleFullscreen">
          <svg v-if="!ui.isFullscreen" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 14 10 14 10 20"></polyline>
            <polyline points="20 10 14 10 14 4"></polyline>
            <line x1="14" y1="10" x2="21" y2="3"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
        <button class="icon-btn" :title="t.close" @click="togglePanel">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <div class="ai-chat-body">
      <!-- Sidebar -->
      <div class="ai-chat-sidebar" :class="{ collapsed: ui.sidebarCollapsed }">
        <div class="sidebar-header">
          <span>{{ t.sessions }}</span>
        </div>
        <div class="session-list">
          <div
            v-for="session in sessions"
            :key="session.id"
            class="session-item"
            :class="{ active: session.id === activeSessionId }"
            @click="selectSession(session.id)"
          >
            <span class="session-title">{{ session.title }}</span>
            <button
              class="delete-btn"
              :title="t.deleteSession"
              @click.stop="deleteSessionById(session.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div v-if="sessions.length === 0" class="no-sessions">
            {{ t.noSessions }}
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="ai-chat-main">
        <!-- Settings Panel -->
        <div v-if="ui.showSettings" class="settings-panel">
          <h3>{{ t.settings }}</h3>

          <div class="setting-item">
            <label>{{ t.provider }}</label>
            <select
              :value="settings.provider"
              @change="updateSetting('provider', ($event.target as HTMLSelectElement).value as ProviderId)"
            >
              <option v-for="(config, id) in PROVIDERS" :key="id" :value="id">
                {{ config.name }}
              </option>
            </select>
          </div>

          <div class="setting-item">
            <label>{{ t.model }}</label>
            <div class="model-select-group">
              <select
                :value="settings.model"
                @change="updateSetting('model', ($event.target as HTMLSelectElement).value)"
              >
                <optgroup :label="t.presetModels">
                  <option v-for="model in currentProvider.models" :key="model" :value="model">
                    {{ model }}
                  </option>
                </optgroup>
                <optgroup v-if="customModels.length" :label="t.customModels">
                  <option v-for="model in customModels" :key="'custom-' + model" :value="model">
                    {{ model }}
                  </option>
                </optgroup>
              </select>
              <button class="add-model-btn" :title="t.addModel" @click="showAddModel = !showAddModel">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            <!-- Add custom model -->
            <div v-if="showAddModel" class="add-model-form">
              <input
                v-model="newModelInput"
                type="text"
                :placeholder="t.modelPlaceholder"
                @keydown.enter="addCustomModel"
              />
              <button :disabled="!newModelInput.trim()" @click="addCustomModel">{{ t.add }}</button>
              <button class="cancel-btn" @click="showAddModel = false">{{ t.cancel }}</button>
            </div>
            <!-- Custom models list (deletable) -->
            <div v-if="customModels.length" class="custom-models-list">
              <div v-for="model in customModels" :key="model" class="custom-model-item">
                <span>{{ model }}</span>
                <button class="delete-model-btn" :title="t.deleteSession" @click="removeCustomModel(model)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="setting-item">
            <label>{{ t.apiKey }}</label>
            <div class="api-key-input">
              <input
                v-model="apiKeyInput"
                type="password"
                :placeholder="hasApiKey ? '••••••••' : t.apiKeyPlaceholder"
              />
              <button :disabled="!apiKeyInput.trim()" @click="saveApiKeyFromInput">
                {{ t.saveApiKey }}
              </button>
            </div>
          </div>

          <div class="setting-item">
            <label>{{ t.baseUrl }}</label>
            <input
              :value="settings.baseUrl"
              type="text"
              @input="updateSetting('baseUrl', ($event.target as HTMLInputElement).value)"
            />
          </div>

          <!-- System prompt is configured server-side for security -->

          <div class="setting-item">
            <label>{{ t.position }}</label>
            <select
              :value="settings.position"
              @change="updateSetting('position', ($event.target as HTMLSelectElement).value as 'bottom-left' | 'bottom-right')"
            >
              <option value="bottom-left">{{ t.bottomLeft }}</option>
              <option value="bottom-right">{{ t.bottomRight }}</option>
            </select>
          </div>

          <button class="danger-btn" @click="clearAllHistory">
            {{ t.clearHistory }}
          </button>
        </div>

        <!-- Messages -->
        <div v-else ref="messagesContainer" class="messages-container">
          <div v-if="!hasApiKey" class="no-api-key">
            <p>{{ t.noApiKey }}</p>
            <button @click="toggleSettings">{{ t.settings }}</button>
          </div>

          <template v-else>
            <div
              v-for="message in messages"
              :key="message.id"
              class="message"
              :class="[message.role, { loading: message.loading, error: message.error }]"
            >
              <div class="message-content">
                <div v-if="message.loading" class="loading-dots">
                  <span></span><span></span><span></span>
                </div>
                <div v-else-if="message.error" class="error-message">
                  {{ message.error }}
                </div>
                <div v-else class="message-text markdown-body" v-html="renderMarkdown(message.content)"></div>
                <button
                  v-if="!message.loading"
                  class="delete-message-btn"
                  :title="t.deleteMessage"
                  @click="deleteMessage(message.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Input -->
        <div v-if="!ui.showSettings" class="input-container">
          <textarea
            v-model="inputMessage"
            :placeholder="t.placeholder"
            :disabled="!hasApiKey || isLoading"
            rows="1"
            @keydown.enter.exact.prevent="sendMessage"
          ></textarea>
          <button
            v-if="isLoading"
            class="stop-btn"
            @click="stopGeneration"
          >
            {{ t.stop }}
          </button>
          <button
            v-else
            class="send-btn"
            :disabled="!inputMessage.trim() || !hasApiKey"
            @click="sendMessage"
          >
            {{ t.send }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-chat-toggle {
  position: fixed;
  z-index: 100;
  width: 56px;
  height: 56px;
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

.ai-chat-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.ai-chat-toggle.bottom-left {
  left: 24px;
  bottom: 24px;
}

.ai-chat-toggle.bottom-right {
  right: 24px;
  bottom: 24px;
}

.ai-chat-panel {
  position: fixed;
  z-index: 100;
  width: 520px;
  height: 680px;
  max-height: calc(100vh - 48px);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ai-chat-panel.bottom-left {
  left: 24px;
  right: auto;
  bottom: 24px;
}

.ai-chat-panel.bottom-right {
  right: 24px;
  left: auto;
  bottom: 24px;
}

.ai-chat-panel.fullscreen {
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
}

.ai-chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-left .title {
  font-weight: 600;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 4px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  transition: background 0.2s, color 0.2s;
}

.icon-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.ai-chat-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.ai-chat-sidebar {
  width: 140px;
  min-width: 140px;
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  transition: width 0.2s, opacity 0.2s;
}

.ai-chat-sidebar.collapsed {
  width: 0;
  opacity: 0;
  overflow: hidden;
}

.sidebar-header {
  padding: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}

.session-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
}

.session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.session-item:hover {
  background: var(--vp-c-bg-mute);
}

.session-item.active {
  background: var(--vp-c-brand-soft);
}

.session-title {
  flex: 1;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
}

.session-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: var(--vp-c-danger-1);
}

.no-sessions {
  padding: 24px 12px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.ai-chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.settings-panel {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.settings-panel h3 {
  margin: 0 0 16px;
  font-size: 16px;
}

.setting-item {
  margin-bottom: 16px;
}

.setting-item label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--vp-c-text-2);
}

.setting-item input,
.setting-item select,
.setting-item textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.setting-item select {
  appearance: auto;
  cursor: pointer;
}

.setting-item textarea {
  resize: vertical;
  font-family: inherit;
}

.setting-hint {
  display: block;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

.model-input-group {
  position: relative;
}

.model-input-group input {
  width: 100%;
}

.api-key-input {
  display: flex;
  gap: 8px;
}

.api-key-input input {
  flex: 1;
}

.api-key-input button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  font-size: 13px;
}

.api-key-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.danger-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--vp-c-danger-1);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-danger-1);
  cursor: pointer;
  font-size: 14px;
  margin-top: 16px;
}

.danger-btn:hover {
  background: var(--vp-c-danger-soft);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.no-api-key {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  color: var(--vp-c-text-2);
}

.no-api-key button {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
}

.message {
  margin-bottom: 16px;
}

.message.user .message-content {
  background: var(--vp-c-brand-soft);
  margin-left: 40px;
  border-radius: 12px 12px 4px 12px;
}

.message.assistant .message-content {
  background: var(--vp-c-bg-soft);
  margin-right: 40px;
  border-radius: 12px 12px 12px 4px;
}

.message-content {
  position: relative;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.6;
}

.delete-message-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s, background 0.2s;
}

.message:hover .delete-message-btn {
  opacity: 1;
}

.delete-message-btn:hover {
  color: var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}

.message.error .message-content {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
}

.loading-dots {
  display: flex;
  gap: 4px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: var(--vp-c-text-3);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(1) { animation-delay: 0s; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
}

.input-container {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.input-container textarea {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  font-size: 14px;
  resize: none;
  font-family: inherit;
  max-height: 120px;
}

.send-btn,
.stop-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-btn {
  background: var(--vp-c-brand-1);
  color: white;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stop-btn {
  background: var(--vp-c-danger-1);
  color: white;
}

.model-select-group {
  display: flex;
  gap: 8px;
}

.model-select-group select {
  flex: 1;
}

.add-model-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.add-model-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.add-model-form {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.add-model-form input {
  flex: 1;
  padding: 6px 10px;
  font-size: 13px;
}

.add-model-form button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: white;
  cursor: pointer;
  font-size: 13px;
}

.add-model-form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-model-form .cancel-btn {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.add-model-form .cancel-btn:hover {
  background: var(--vp-c-bg-mute);
}

.custom-models-list {
  margin-top: 8px;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.custom-model-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  border-radius: 4px;
}

.custom-model-item:hover {
  background: var(--vp-c-bg-mute);
}

.custom-model-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.delete-model-btn {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
}

.custom-model-item:hover .delete-model-btn {
  opacity: 1;
}

.delete-model-btn:hover {
  color: var(--vp-c-danger-1);
}

/* Markdown content styles */
.markdown-body {
  word-wrap: break-word;
}

.markdown-body :deep(p) {
  margin: 0 0 8px;
}

.markdown-body :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-body :deep(pre) {
  background: var(--vp-c-bg-mute);
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}

.markdown-body :deep(code) {
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 20px;
  margin: 8px 0;
}

.markdown-body :deep(li) {
  margin: 4px 0;
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid var(--vp-c-brand-1);
  padding-left: 12px;
  margin: 8px 0;
  color: var(--vp-c-text-2);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  margin: 12px 0 8px;
  font-weight: 600;
}

.markdown-body :deep(h1) { font-size: 1.4em; }
.markdown-body :deep(h2) { font-size: 1.2em; }
.markdown-body :deep(h3) { font-size: 1.1em; }

.markdown-body :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 8px 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--vp-c-divider);
  padding: 8px;
  text-align: left;
}

.markdown-body :deep(th) {
  background: var(--vp-c-bg-soft);
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 12px 0;
}

@media (max-width: 768px) {
  .ai-chat-panel {
    width: calc(100vw - 16px);
    height: calc(100vh - 60px);
    left: 8px !important;
    right: 8px !important;
    bottom: 52px;
    border-radius: 8px;
  }

  .ai-chat-toggle {
    width: 48px;
    height: 48px;
  }

  .ai-chat-toggle.bottom-left {
    left: 16px;
    bottom: 16px;
  }

  .ai-chat-toggle.bottom-right {
    right: 16px;
    bottom: 16px;
  }

  .ai-chat-sidebar {
    width: 100px;
    min-width: 100px;
  }

  .ai-chat-sidebar.collapsed {
    width: 0;
    min-width: 0;
  }

  .message.user .message-content {
    margin-left: 16px;
  }

  .message.assistant .message-content {
    margin-right: 16px;
  }
}
</style>
