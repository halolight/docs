/**
 * Document Index Service
 *
 * Builds and manages document index for the AI chat sidebar.
 * Merges Chinese and English documents as paired entries.
 */

import type { DocIndexItem } from '../types'

// VitePress window extensions
interface VPWindow extends Window {
  __VP_SIDEBAR_DATA__?: SidebarItem[]
  __VP_HASH_MAP__?: Record<string, string>
}

// Sidebar item structure
interface SidebarItem {
  text?: string
  link?: string
  items?: SidebarItem[]
}

/**
 * Extract document metadata from VitePress sidebar config
 * This will be called at runtime to build the index
 */
export function buildDocIndex(): DocIndexItem[] {
  // Get sidebar data from VitePress (injected at build time)
  const sidebarData = (window as unknown as VPWindow).__VP_SIDEBAR_DATA__

  if (!sidebarData) {
    // Fallback: build from current page context
    return buildFromPageContext()
  }

  return parseSidebarData(sidebarData)
}

/**
 * Build index from VitePress page context
 */
function buildFromPageContext(): DocIndexItem[] {
  const items: DocIndexItem[] = []

  // Try to get from VitePress data
  try {
    const vpData = (window as unknown as VPWindow).__VP_HASH_MAP__
    if (vpData) {
      // Parse hash map to extract page info
      for (const [path] of Object.entries(vpData)) {
        const isEnglish = path.startsWith('/en/')
        const locale = isEnglish ? 'en' : 'zh'
        const pairedPath = isEnglish
          ? path.replace('/en/', '/')
          : `/en${path}`

        items.push({
          title: extractTitleFromPath(path),
          path,
          locale,
          pairedPath,
        })
      }
    }
  } catch (error) {
    console.warn('[DocIndex] Failed to build from page context:', error)
  }

  return deduplicateAndPair(items)
}

/**
 * Parse VitePress sidebar configuration
 */
function parseSidebarData(data: SidebarItem[]): DocIndexItem[] {
  const items: DocIndexItem[] = []

  function traverse(obj: SidebarItem | SidebarItem[], locale: 'zh' | 'en' = 'zh') {
    if (Array.isArray(obj)) {
      obj.forEach(item => traverse(item, locale))
    } else if (obj && typeof obj === 'object') {
      if (obj.link) {
        const path = obj.link
        const isEnglish = path.startsWith('/en/')
        const detectedLocale = isEnglish ? 'en' : 'zh'
        const pairedPath = isEnglish
          ? path.replace('/en/', '/')
          : `/en${path}`

        items.push({
          title: obj.text || extractTitleFromPath(path),
          path,
          locale: detectedLocale,
          pairedPath,
        })
      }

      if (obj.items) {
        traverse(obj.items, locale)
      }
    }
  }

  traverse(data)
  return deduplicateAndPair(items)
}

/**
 * Extract title from file path
 */
function extractTitleFromPath(path: string): string {
  const parts = path.split('/')
  const filename = parts[parts.length - 1] || parts[parts.length - 2]
  return filename
    .replace(/\.html?$/, '')
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Deduplicate items and pair Chinese/English versions
 */
function deduplicateAndPair(items: DocIndexItem[]): DocIndexItem[] {
  const map = new Map<string, DocIndexItem>()

  for (const item of items) {
    // Normalize path for deduplication (remove /en/ prefix)
    const normalizedPath = item.path.replace(/^\/en\//, '/')

    if (!map.has(normalizedPath)) {
      map.set(normalizedPath, item)
    } else {
      // Update paired path if we found the other locale version
      const existing = map.get(normalizedPath)!
      if (existing.locale !== item.locale) {
        existing.pairedPath = item.path
      }
    }
  }

  return Array.from(map.values())
}

/**
 * Group documents by category (based on path)
 */
export function groupByCategory(items: DocIndexItem[]): Map<string, DocIndexItem[]> {
  const groups = new Map<string, DocIndexItem[]>()

  for (const item of items) {
    const parts = item.path.replace(/^\/en\//, '/').split('/')
    const category = parts.length > 2 ? parts[1] : 'root'

    if (!groups.has(category)) {
      groups.set(category, [])
    }
    groups.get(category)!.push(item)
  }

  return groups
}

/**
 * Search documents by title
 */
export function searchDocs(items: DocIndexItem[], query: string): DocIndexItem[] {
  if (!query.trim()) {
    return items
  }

  const lowerQuery = query.toLowerCase()

  return items.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.path.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get document content for context (simplified)
 * In a real implementation, this would fetch the actual document content
 */
export async function getDocContent(path: string): Promise<string> {
  try {
    // Try to fetch the HTML version
    const htmlPath = path.endsWith('.html') ? path : `${path}.html`
    const response = await fetch(htmlPath)

    if (!response.ok) {
      return ''
    }

    const html = await response.text()

    // Extract text content from main content area
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const mainContent = doc.querySelector('.vp-doc') || doc.querySelector('main')

    if (mainContent) {
      return mainContent.textContent?.trim() || ''
    }

    return ''
  } catch (error) {
    console.warn('[DocIndex] Failed to fetch doc content:', error)
    return ''
  }
}
