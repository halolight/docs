/**
 * Automatic locale detection and redirect for VitePress i18n
 *
 * Detects browser language preferences and redirects to the appropriate locale.
 * Only redirects for supported languages; unsupported languages stay on current page.
 *
 * @module locale-redirect
 */

const STORAGE_KEYS = {
  USER_LOCALE: 'vp_locale',
  REDIRECT_FLAG: 'vp_locale_redirected',
} as const

const LOCALE_CONFIG = {
  root: {
    patterns: ['zh', 'zh-cn', 'zh-tw', 'zh-hk', 'zh-sg'],
    prefix: '',
  },
  en: {
    patterns: ['en', 'en-us', 'en-gb', 'en-au', 'en-ca'],
    prefix: '/en',
  },
} as const

type LocaleKey = keyof typeof LOCALE_CONFIG

// Safe storage operations (handle Safari private mode, etc.)
function safeGetItem(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(storage: Storage, key: string, value: string): boolean {
  try {
    storage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function safeRemoveItem(storage: Storage, key: string): void {
  try {
    storage.removeItem(key)
  } catch {
    // Silently ignore
  }
}

/**
 * Get VitePress base URL (configured in config.ts)
 */
function getBaseUrl(): string {
  try {
    const base = import.meta.env?.BASE_URL || '/'
    return base.replace(/\/$/, '')
  } catch {
    return ''
  }
}

/**
 * Detect browser's preferred language
 */
function detectBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return ''
  return (navigator.languages?.[0] || navigator.language || '').toLowerCase()
}

/**
 * Map browser language to supported locale
 * Returns null for unsupported languages (no redirect should occur)
 */
function mapLanguageToLocale(browserLang: string): LocaleKey | null {
  const lang = browserLang.toLowerCase()

  // Check English
  for (const pattern of LOCALE_CONFIG.en.patterns) {
    if (lang === pattern || lang.startsWith(pattern + '-')) {
      return 'en'
    }
  }

  // Check Chinese
  for (const pattern of LOCALE_CONFIG.root.patterns) {
    if (lang === pattern || lang.startsWith(pattern + '-')) {
      return 'root'
    }
  }

  // Unsupported language - don't redirect
  return null
}

/**
 * Extract current locale from pathname
 * Handles base URL and /en with or without trailing slash
 */
export function getCurrentLocale(pathname: string): LocaleKey {
  const base = getBaseUrl()

  let path = pathname
  if (base && path.startsWith(base)) {
    path = path.slice(base.length)
  }

  if (!path.startsWith('/')) {
    path = '/' + path
  }

  // Match /en or /en/ or /en/anything
  if (path === '/en' || path.startsWith('/en/')) {
    return 'en'
  }

  return 'root'
}

/**
 * Convert pathname to different locale, preserving deep paths
 */
function convertPathToLocale(pathname: string, targetLocale: LocaleKey): string {
  const base = getBaseUrl()
  const currentLocale = getCurrentLocale(pathname)

  let path = pathname
  if (base && path.startsWith(base)) {
    path = path.slice(base.length)
  }

  if (!path.startsWith('/')) {
    path = '/' + path
  }

  // Strip current locale prefix
  if (currentLocale === 'en') {
    if (path === '/en') {
      path = '/'
    } else if (path.startsWith('/en/')) {
      path = path.slice(3)
    }
  }

  // Apply target locale prefix
  if (targetLocale === 'en') {
    path = '/en' + (path === '/' ? '/' : path)
  }

  return base + path
}

/**
 * Setup automatic locale redirect based on browser language
 *
 * Redirect rules:
 * - Only redirects if browser language is supported (zh/en)
 * - Respects user's manual locale choice (localStorage)
 * - Prevents redirect loops (sessionStorage flag)
 * - Preserves path, query string, and hash
 */
export function setupLocaleRedirect(): void {
  if (typeof window === 'undefined') return

  // Respect user's explicit choice
  const userLocale = safeGetItem(window.localStorage, STORAGE_KEYS.USER_LOCALE)
  if (userLocale) return

  // Prevent redirect loops in same session
  const hasRedirected = safeGetItem(window.sessionStorage, STORAGE_KEYS.REDIRECT_FLAG)
  if (hasRedirected) return

  // Detect browser language
  const browserLang = detectBrowserLanguage()
  if (!browserLang) return

  // Map to supported locale (null = unsupported, don't redirect)
  const targetLocale = mapLanguageToLocale(browserLang)
  if (targetLocale === null) return

  // Check if already in target locale
  const { pathname, search, hash, origin } = window.location
  const currentLocale = getCurrentLocale(pathname)
  if (currentLocale === targetLocale) return

  // Build target URL
  const targetPath = convertPathToLocale(pathname, targetLocale)
  const targetUrl = `${origin}${targetPath}${search}${hash}`

  // Set redirect flag (proceed even if storage fails)
  safeSetItem(window.sessionStorage, STORAGE_KEYS.REDIRECT_FLAG, 'true')

  // Redirect without adding to history
  window.location.replace(targetUrl)
}

/**
 * Save user's locale preference (disables auto-redirect)
 */
export function saveUserLocalePreference(locale: LocaleKey | string): void {
  if (typeof window === 'undefined') return
  safeSetItem(window.localStorage, STORAGE_KEYS.USER_LOCALE, String(locale))
}

/**
 * Clear user's locale preference (for testing)
 */
export function clearUserLocalePreference(): void {
  if (typeof window === 'undefined') return
  safeRemoveItem(window.localStorage, STORAGE_KEYS.USER_LOCALE)
  safeRemoveItem(window.sessionStorage, STORAGE_KEYS.REDIRECT_FLAG)
}
