/**
 * Local storage service for sessions and settings
 */

import type { Session, Settings, ProviderId } from '../types'
import { PROVIDERS } from '../types'

const STORAGE_KEYS = {
  SESSIONS: 'vp-ai-sessions',
  SETTINGS: 'vp-ai-settings',
} as const

const SCHEMA_VERSION = 1

/**
 * Safe JSON parse with fallback
 */
function safeJsonParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

/**
 * Safe localStorage getter
 */
function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Safe localStorage setter
 */
function setItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.warn('[Storage] Failed to save:', error)
    return false
  }
}

// ============ Sessions ============

/**
 * Load all chat sessions from localStorage
 */
export function loadSessions(): Session[] {
  const raw = getItem(STORAGE_KEYS.SESSIONS)
  return safeJsonParse<Session[]>(raw, [])
}

/**
 * Save all sessions to localStorage
 */
export function saveSessions(sessions: Session[]): void {
  setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions))
}

/**
 * Get a specific session by ID
 */
export function getSession(id: string): Session | null {
  const sessions = loadSessions()
  return sessions.find(s => s.id === id) || null
}

/**
 * Create or update a session
 */
export function upsertSession(session: Session): void {
  const sessions = loadSessions()
  const index = sessions.findIndex(s => s.id === session.id)

  const now = Date.now()
  const updated = {
    ...session,
    updatedAt: now,
    createdAt: session.createdAt || now,
  }

  if (index >= 0) {
    sessions[index] = updated
  } else {
    sessions.unshift(updated) // Add to beginning
  }

  saveSessions(sessions)
}

/**
 * Delete a session by ID
 */
export function deleteSession(id: string): void {
  const sessions = loadSessions().filter(s => s.id !== id)
  saveSessions(sessions)
}

/**
 * Clear all sessions
 */
export function clearAllSessions(): void {
  saveSessions([])
}

// ============ Settings ============

/**
 * Get default settings (with env overrides)
 */
export function getDefaultSettings(): Settings {
  // Read from Vite env (set during build)
  const envProvider = import.meta.env?.VITE_AI_PROVIDER as ProviderId | undefined
  const envModel = import.meta.env?.VITE_AI_MODEL as string | undefined
  const envBaseUrl = import.meta.env?.VITE_AI_BASE_URL as string | undefined
  const envSystemPrompt = import.meta.env?.VITE_AI_SYSTEM_PROMPT as string | undefined

  const provider = envProvider && PROVIDERS[envProvider] ? envProvider : 'openai'
  const providerConfig = PROVIDERS[provider]

  return {
    provider,
    model: envModel || providerConfig.defaultModel,
    baseUrl: envBaseUrl || providerConfig.baseUrl,
    systemPrompt: envSystemPrompt || '',
    apiKeyCipher: '',
    position: 'bottom-right',
    schemaVersion: SCHEMA_VERSION,
  }
}

/**
 * Load settings from localStorage (with defaults)
 */
export function loadSettings(): Settings {
  const defaults = getDefaultSettings()
  const raw = getItem(STORAGE_KEYS.SETTINGS)
  const saved = safeJsonParse<Partial<Settings>>(raw, {})

  // Merge with defaults
  const settings: Settings = {
    ...defaults,
    ...saved,
  }

  // Handle schema migration
  if (settings.schemaVersion !== SCHEMA_VERSION) {
    settings.schemaVersion = SCHEMA_VERSION
    saveSettings(settings)
  }

  return settings
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: Settings): void {
  setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
    ...settings,
    schemaVersion: SCHEMA_VERSION,
  }))
}

/**
 * Update specific settings fields
 */
export function updateSettings(partial: Partial<Settings>): Settings {
  const current = loadSettings()
  const updated = { ...current, ...partial }
  saveSettings(updated)
  return updated
}

// ============ Utilities ============

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Create a new empty session
 */
export function createSession(provider: ProviderId, model: string, docPath?: string): Session {
  return {
    id: generateId(),
    title: 'New Chat',
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    provider,
    model,
    docPath,
  }
}
