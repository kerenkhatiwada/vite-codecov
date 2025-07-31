// Polyfill for crypto.hash if not available
if (typeof globalThis.crypto === 'undefined') {
  const crypto = require('crypto')
  globalThis.crypto = {
    ...crypto.webcrypto,
    hash: crypto.hash || function(algorithm, data) {
      return crypto.createHash(algorithm).update(data).digest()
    }
  }
}

// Setup jsdom
import { beforeAll } from 'vitest'

beforeAll(() => {
  // Ensure crypto is available
  if (!globalThis.crypto?.hash && typeof require !== 'undefined') {
    try {
      const crypto = require('crypto')
      if (!globalThis.crypto) globalThis.crypto = {}
      globalThis.crypto.hash = crypto.hash || function(algorithm, data) {
        return crypto.createHash(algorithm).update(data).digest()
      }
    } catch (e) {
      // Fallback if crypto is not available
      console.warn('Crypto polyfill not available')
    }
  }
})