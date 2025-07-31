import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Crypto polyfill for Node.js compatibility
import crypto from 'crypto'
if (!crypto.hash) {
  crypto.hash = function(algorithm, data) {
    const hash = crypto.createHash(algorithm)
    if (data) hash.update(data)
    return hash
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    // Use a more stable template compilation option
    template: {
      compilerOptions: {
        // Add compatibility mode
        compatConfig: {
          MODE: 3
        }
      }
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: 'coverage'
    },
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  optimizeDeps: {
    exclude: ['vue']
  }
})
