/**
 * Encryption service for API key protection
 *
 * Uses Web Crypto API with AES-GCM for client-side encryption.
 * Note: Client-side encryption provides obfuscation, not true security.
 * For production with sensitive keys, use a backend proxy.
 */

const encoder = new TextEncoder()
const decoder = new TextDecoder()

/** Salt for key derivation (should be unique per application) */
const SALT = 'halolight-ai-chat-v1'

/** PBKDF2 iterations for key derivation */
const ITERATIONS = 100_000

/**
 * Derives a cryptographic key from a secret string using PBKDF2
 */
async function deriveKey(secret: string): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(SALT),
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypts a plaintext string (e.g., API key)
 *
 * @param plaintext - The text to encrypt
 * @param secret - The encryption secret/passphrase
 * @returns Base64-encoded ciphertext (IV prepended)
 */
export async function encrypt(plaintext: string, secret: string): Promise<string> {
  if (!plaintext || !secret) {
    throw new Error('Plaintext and secret are required')
  }

  const key = await deriveKey(secret)

  // Generate random IV (12 bytes for AES-GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12))

  // Encrypt
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext)
  )

  // Combine IV + ciphertext
  const combined = new Uint8Array(iv.byteLength + cipherBuffer.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(cipherBuffer), iv.byteLength)

  // Return as base64
  return btoa(String.fromCharCode(...combined))
}

/**
 * Decrypts a ciphertext back to plaintext
 *
 * @param ciphertext - Base64-encoded ciphertext
 * @param secret - The encryption secret/passphrase
 * @returns Decrypted plaintext, or null if decryption fails
 */
export async function decrypt(ciphertext: string, secret: string): Promise<string | null> {
  if (!ciphertext || !secret) {
    return null
  }

  try {
    // Decode base64
    const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0))

    // Extract IV and ciphertext
    const iv = combined.slice(0, 12)
    const cipherBuffer = combined.slice(12)

    const key = await deriveKey(secret)

    // Decrypt
    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherBuffer
    )

    return decoder.decode(plainBuffer)
  } catch (error) {
    console.warn('[Crypto] Decryption failed:', error)
    return null
  }
}

/**
 * Get encryption secret from environment or generate fallback
 * In production, this should come from a secure source
 */
export function getEncryptionSecret(): string {
  // Try to get from Vite env (set during build)
  const envSecret = import.meta.env?.VITE_AI_CRYPTO_SECRET

  if (envSecret) {
    return envSecret
  }

  // Fallback: generate a device-specific key (stored in localStorage)
  // This is less secure but works for user-owned keys
  const storageKey = 'vp-ai-device-key'
  let deviceKey = localStorage.getItem(storageKey)

  if (!deviceKey) {
    // Generate random key
    const randomBytes = crypto.getRandomValues(new Uint8Array(32))
    deviceKey = btoa(String.fromCharCode(...randomBytes))
    localStorage.setItem(storageKey, deviceKey)
  }

  return deviceKey
}
