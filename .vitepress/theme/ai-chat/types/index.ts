/**
 * AI Chat Type Definitions
 */

/** Message role types */
export type Role = 'user' | 'assistant' | 'system'

/** Supported AI provider identifiers */
export type ProviderId = 'openai' | 'claude' | 'gemini' | 'deepseek' | 'custom'

/** Chat message */
export interface Message {
  id: string
  role: Role
  content: string
  createdAt: number
  /** Loading state for streaming */
  loading?: boolean
  /** Error message if failed */
  error?: string
}

/** Chat session */
export interface Session {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
  provider: ProviderId
  model: string
  /** Associated document path (for doc-based chat) */
  docPath?: string
}

/** Provider configuration */
export interface ProviderConfig {
  id: ProviderId
  name: string
  models: string[]
  defaultModel: string
  baseUrl: string
}

/** User settings */
export interface Settings {
  /** Current provider */
  provider: ProviderId
  /** Current model */
  model: string
  /** Custom base URL */
  baseUrl: string
  /** System prompt */
  systemPrompt: string
  /** Encrypted API key (base64) */
  apiKeyCipher: string
  /** Window position */
  position: 'bottom-left' | 'bottom-right'
  /** Schema version for migrations */
  schemaVersion: number
}

/** UI state */
export interface UIState {
  /** Panel open state */
  isOpen: boolean
  /** Fullscreen mode */
  isFullscreen: boolean
  /** Settings panel open */
  showSettings: boolean
  /** Sidebar collapsed */
  sidebarCollapsed: boolean
}

/** Streaming response chunk */
export interface StreamChunk {
  content: string
  done: boolean
  error?: string
}

/** Page context for AI */
export interface PageContext {
  title?: string
  path?: string
  content?: string
}

/** Chat request parameters */
export interface ChatRequest {
  provider: ProviderId
  model: string
  messages: Array<{ role: Role; content: string }>
  systemPrompt?: string
  apiKey: string
  baseUrl?: string
  signal?: AbortSignal
  pageContext?: PageContext
}

/** Document index item */
export interface DocIndexItem {
  title: string
  path: string
  locale: 'zh' | 'en'
  /** Paired document in other locale */
  pairedPath?: string
}

/** Provider definitions */
export const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4o-mini',
    baseUrl: 'https://api.openai.com/v1',
  },
  claude: {
    id: 'claude',
    name: 'Anthropic Claude',
    models: ['claude-sonnet-4-20250514', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'],
    defaultModel: 'claude-sonnet-4-20250514',
    baseUrl: 'https://api.anthropic.com',
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
    defaultModel: 'gemini-1.5-flash',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    models: ['deepseek-chat', 'deepseek-coder'],
    defaultModel: 'deepseek-chat',
    baseUrl: 'https://api.deepseek.com/v1',
  },
  custom: {
    id: 'custom',
    name: 'Custom Provider',
    models: [],
    defaultModel: '',
    baseUrl: '',
  },
}
