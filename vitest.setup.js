// Polyfill for crypto.hash that Vue plugin needs
import { beforeAll } from 'vitest'
import crypto from 'crypto'

// Add crypto.hash polyfill globally
if (!crypto.hash) {
  crypto.hash = function(algorithm, data, options) {
    const hash = crypto.createHash(algorithm)
    if (data) {
      hash.update(data)
    }
    return hash
  }
}

// Make sure globalThis.crypto has the hash function
if (!globalThis.crypto) {
  globalThis.crypto = crypto.webcrypto || {}
}

if (!globalThis.crypto.hash) {
  globalThis.crypto.hash = crypto.hash
}

beforeAll(() => {
  // Additional setup if needed
})