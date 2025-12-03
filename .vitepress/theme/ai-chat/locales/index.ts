/**
 * AI Chat i18n Messages
 */

export interface AiChatMessages {
  title: string
  newChat: string
  settings: string
  send: string
  stop: string
  placeholder: string
  noApiKey: string
  provider: string
  model: string
  modelPlaceholder: string
  modelHint: string
  presetModels: string
  customModels: string
  addModel: string
  add: string
  cancel: string
  apiKey: string
  apiKeyPlaceholder: string
  saveApiKey: string
  baseUrl: string
  systemPrompt: string
  position: string
  bottomLeft: string
  bottomRight: string
  clearHistory: string
  confirmClear: string
  clearCurrentChat: string
  confirmClearCurrent: string
  deleteMessage: string
  close: string
  fullscreen: string
  exitFullscreen: string
  sessions: string
  noSessions: string
  deleteSession: string
  retry: string
  copy: string
  copied: string
  error: string
  networkError: string
  invalidApiKey: string
}

export const zhCN: AiChatMessages = {
  title: 'AI 助手',
  newChat: '新对话',
  settings: '设置',
  send: '发送',
  stop: '停止',
  placeholder: '输入消息...',
  noApiKey: '请先配置 API Key',
  provider: '服务商',
  model: '模型',
  modelPlaceholder: '输入模型名称',
  modelHint: '可从列表选择或手动输入自定义模型',
  presetModels: '预设模型',
  customModels: '自定义模型',
  addModel: '添加模型',
  add: '添加',
  cancel: '取消',
  apiKey: 'API Key',
  apiKeyPlaceholder: '输入您的 API Key',
  saveApiKey: '保存',
  baseUrl: 'API 地址',
  systemPrompt: '系统提示词',
  position: '位置',
  bottomLeft: '左下角',
  bottomRight: '右下角',
  clearHistory: '清空历史',
  confirmClear: '确定要清空所有对话吗？',
  clearCurrentChat: '清空当前对话',
  confirmClearCurrent: '确定要清空当前对话吗？',
  deleteMessage: '删除消息',
  close: '关闭',
  fullscreen: '全屏',
  exitFullscreen: '退出全屏',
  sessions: '会话列表',
  noSessions: '暂无会话',
  deleteSession: '删除',
  retry: '重试',
  copy: '复制',
  copied: '已复制',
  error: '发生错误',
  networkError: '网络错误，请检查连接',
  invalidApiKey: 'API Key 无效',
}

export const enUS: AiChatMessages = {
  title: 'AI Assistant',
  newChat: 'New Chat',
  settings: 'Settings',
  send: 'Send',
  stop: 'Stop',
  placeholder: 'Type a message...',
  noApiKey: 'Please configure API Key first',
  provider: 'Provider',
  model: 'Model',
  modelPlaceholder: 'Enter model name',
  modelHint: 'Choose from list or enter custom model',
  presetModels: 'Preset Models',
  customModels: 'Custom Models',
  addModel: 'Add Model',
  add: 'Add',
  cancel: 'Cancel',
  apiKey: 'API Key',
  apiKeyPlaceholder: 'Enter your API Key',
  saveApiKey: 'Save',
  baseUrl: 'API URL',
  systemPrompt: 'System Prompt',
  position: 'Position',
  bottomLeft: 'Bottom Left',
  bottomRight: 'Bottom Right',
  clearHistory: 'Clear History',
  confirmClear: 'Are you sure you want to clear all chats?',
  clearCurrentChat: 'Clear Current Chat',
  confirmClearCurrent: 'Are you sure you want to clear current chat?',
  deleteMessage: 'Delete Message',
  close: 'Close',
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit Fullscreen',
  sessions: 'Sessions',
  noSessions: 'No sessions',
  deleteSession: 'Delete',
  retry: 'Retry',
  copy: 'Copy',
  copied: 'Copied',
  error: 'An error occurred',
  networkError: 'Network error, please check connection',
  invalidApiKey: 'Invalid API Key',
}

/**
 * Get messages by locale
 */
export function getMessages(lang: string): AiChatMessages {
  if (lang.startsWith('zh') || lang === 'zh-CN') {
    return zhCN
  }
  return enUS
}
