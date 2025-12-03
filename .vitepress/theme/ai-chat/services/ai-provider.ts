/**
 * AI Provider Service
 *
 * Unified interface for multiple AI providers with streaming support.
 * Supports both direct API calls and secure proxy mode (recommended).
 */

import type { ChatRequest, StreamChunk, ProviderId } from '../types'

/**
 * Check if proxy mode is enabled
 */
function isProxyEnabled(): boolean {
  return import.meta.env?.VITE_AI_USE_PROXY === 'true'
}

/**
 * Get proxy API URL
 */
function getProxyUrl(): string {
  return import.meta.env?.VITE_AI_PROXY_URL || '/api/chat'
}

/**
 * Parse SSE stream response
 */
async function* parseSSEStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  parseChunk: (data: string) => string | null
): AsyncGenerator<StreamChunk> {
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { value, done } = await reader.read()

      if (done) {
        yield { content: '', done: true }
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()

        if (!trimmed || trimmed.startsWith(':')) continue

        if (trimmed.startsWith('data: ')) {
          const data = trimmed.slice(6)

          if (data === '[DONE]') {
            yield { content: '', done: true }
            return
          }

          const content = parseChunk(data)
          if (content) {
            yield { content, done: false }
          }
        }
      }
    }
  } catch (error) {
    yield { content: '', done: true, error: String(error) }
  }
}

// Project info for system prompt (from README and package.json)
const PROJECT_INFO = {
  zh: `项目：HaloLight 多框架管理后台文档
版本：1.0.0
描述：HaloLight 是一套多框架实现的企业级管理后台解决方案，支持 12+ 框架版本
作者：h7ml <h7ml@qq.com>
主页：https://halolight.docs.h7ml.cn/
核心特性：可拖拽仪表盘、RBAC 权限控制、11 种主题皮肤、Mock 数据、30+ 组件`,
  en: `Project: HaloLight Multi-framework Admin Dashboard Documentation
Version: 1.0.0
Description: HaloLight is an enterprise-grade admin dashboard solution with multi-framework implementations, supporting 12+ framework versions
Author: h7ml <h7ml@qq.com>
Homepage: https://halolight.docs.h7ml.cn/
Core Features: Draggable Dashboard, RBAC Permission Control, 11 Theme Skins, Mock Data, 30+ Components`,
}

const BASE_PROMPTS = {
  zh: `你是 HaloLight 文档的智能助手。
你的职责是帮助用户理解和使用 HaloLight 多框架管理后台解决方案。
请简洁、准确、有帮助地回答问题。请使用中文回答。`,
  en: `You are a helpful assistant for the HaloLight documentation.
Your role is to help users understand and use the HaloLight multi-framework admin dashboard solution.
Be concise, accurate, and helpful. Please respond in English.`,
}

/**
 * Detect locale from page path
 */
function detectLocale(path?: string): 'zh' | 'en' {
  if (!path) return 'zh'
  return path.startsWith('/en/') || path === '/en' ? 'en' : 'zh'
}

/**
 * Build system prompt with page context (language-aware)
 */
function buildSystemPrompt(req: ChatRequest): string {
  const locale = detectLocale(req.pageContext?.path)
  const parts: string[] = []

  // Base system prompt (language-aware)
  if (req.systemPrompt) {
    parts.push(req.systemPrompt)
  } else {
    parts.push(BASE_PROMPTS[locale])
  }

  // Add project info
  parts.push(`\n\n${locale === 'en' ? 'Project Information' : '项目信息'}:\n${PROJECT_INFO[locale]}`)

  // Add page context if provided
  if (req.pageContext) {
    const contextParts: string[] = []
    if (req.pageContext.title) contextParts.push(`${locale === 'en' ? 'Page Title' : '页面标题'}: ${req.pageContext.title}`)
    if (req.pageContext.path) contextParts.push(`${locale === 'en' ? 'Page Path' : '页面路径'}: ${req.pageContext.path}`)
    if (req.pageContext.content) {
      const truncated = req.pageContext.content.slice(0, 6000)
      contextParts.push(`${locale === 'en' ? 'Page Content' : '页面内容'}:\n${truncated}${req.pageContext.content.length > 6000 ? `\n[${locale === 'en' ? 'Content truncated...' : '内容已截断...'}]` : ''}`)
    }
    if (contextParts.length > 0) {
      parts.push(`\n\n${locale === 'en' ? 'Current Page Context' : '当前页面上下文'}:\n${contextParts.join('\n')}`)
    }
  }

  return parts.join('')
}

/**
 * OpenAI-compatible API (OpenAI, DeepSeek, etc.)
 */
async function* streamOpenAI(req: ChatRequest): AsyncGenerator<StreamChunk> {
  const baseUrl = req.baseUrl || 'https://api.openai.com/v1'
  const url = `${baseUrl}/chat/completions`

  const systemPrompt = buildSystemPrompt(req)
  const messages = [{ role: 'system' as const, content: systemPrompt }, ...req.messages]

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.apiKey}`,
    },
    body: JSON.stringify({
      model: req.model,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
    }),
    signal: req.signal,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`API error: ${response.status} - ${error}`)
  }

  if (!response.body) {
    throw new Error('No response body')
  }

  const reader = response.body.getReader()

  yield* parseSSEStream(reader, (data) => {
    try {
      const parsed = JSON.parse(data)
      return parsed.choices?.[0]?.delta?.content || null
    } catch {
      return null
    }
  })
}

/**
 * Anthropic Claude API
 */
async function* streamClaude(req: ChatRequest): AsyncGenerator<StreamChunk> {
  const baseUrl = req.baseUrl || 'https://api.anthropic.com'
  const url = `${baseUrl}/v1/messages`

  const systemPrompt = buildSystemPrompt(req)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': req.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: req.model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: req.messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
    }),
    signal: req.signal,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`API error: ${response.status} - ${error}`)
  }

  if (!response.body) {
    throw new Error('No response body')
  }

  const reader = response.body.getReader()

  yield* parseSSEStream(reader, (data) => {
    try {
      const parsed = JSON.parse(data)
      if (parsed.type === 'content_block_delta') {
        return parsed.delta?.text || null
      }
      return null
    } catch {
      return null
    }
  })
}

/**
 * Google Gemini API
 */
async function* streamGemini(req: ChatRequest): AsyncGenerator<StreamChunk> {
  const baseUrl = req.baseUrl || 'https://generativelanguage.googleapis.com/v1beta'
  const url = `${baseUrl}/models/${req.model}:streamGenerateContent?key=${req.apiKey}`

  const systemPrompt = buildSystemPrompt(req)

  const contents = req.messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  // Gemini uses system instruction as first user message
  contents.unshift({
    role: 'user',
    parts: [{ text: `System: ${systemPrompt}` }],
  })

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contents }),
    signal: req.signal,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`API error: ${response.status} - ${error}`)
  }

  if (!response.body) {
    throw new Error('No response body')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { value, done } = await reader.read()

      if (done) {
        yield { content: '', done: true }
        break
      }

      buffer += decoder.decode(value, { stream: true })

      // Gemini returns JSON array chunks
      try {
        // Try to parse complete JSON objects
        const matches = buffer.match(/\{[^{}]*"text"[^{}]*\}/g)
        if (matches) {
          for (const match of matches) {
            const parsed = JSON.parse(match)
            const text = parsed.text || parsed.candidates?.[0]?.content?.parts?.[0]?.text
            if (text) {
              yield { content: text, done: false }
            }
          }
          // Keep unparsed remainder
          const lastMatch = matches[matches.length - 1]
          const lastIndex = buffer.lastIndexOf(lastMatch)
          buffer = buffer.slice(lastIndex + lastMatch.length)
        }
      } catch {
        // Continue accumulating
      }
    }
  } catch (error) {
    yield { content: '', done: true, error: String(error) }
  }
}

/**
 * Stream via secure proxy API (recommended)
 * Supports both server-side API keys and user-provided keys
 */
async function* streamViaProxy(req: ChatRequest): AsyncGenerator<StreamChunk> {
  const proxyUrl = getProxyUrl()

  const response = await fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: req.messages.map(m => ({ role: m.role, content: m.content })),
      provider: req.provider,
      model: req.model,
      apiKey: req.apiKey,  // Pass user's API key to proxy
      baseUrl: req.baseUrl,
      pageContext: req.pageContext,
    }),
    signal: req.signal,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `API error: ${response.status}`)
  }

  if (!response.body) {
    throw new Error('No response body')
  }

  const reader = response.body.getReader()

  yield* parseSSEStream(reader, (data) => {
    if (data === '[DONE]') return null
    try {
      const parsed = JSON.parse(data)
      return parsed.content || null
    } catch {
      return null
    }
  })
}

/**
 * Main chat function - routes to appropriate provider
 * Uses proxy mode by default for security
 */
export async function* chat(req: ChatRequest): AsyncGenerator<StreamChunk> {
  // Use proxy mode if enabled (recommended for security)
  if (isProxyEnabled()) {
    yield* streamViaProxy(req)
    return
  }

  // Direct API calls (requires client-side API key)
  const provider = req.provider

  switch (provider) {
    case 'openai':
    case 'deepseek':
    case 'custom':
      yield* streamOpenAI(req)
      break

    case 'claude':
      yield* streamClaude(req)
      break

    case 'gemini':
      yield* streamGemini(req)
      break

    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}

/**
 * Check if API key is valid (simple validation)
 */
export function validateApiKey(provider: ProviderId, apiKey: string): boolean {
  if (!apiKey || apiKey.trim().length < 10) {
    return false
  }

  switch (provider) {
    case 'openai':
      return apiKey.startsWith('sk-')
    case 'claude':
      return apiKey.startsWith('sk-ant-')
    case 'gemini':
      return apiKey.length > 20
    case 'deepseek':
      return apiKey.startsWith('sk-')
    default:
      return true
  }
}
