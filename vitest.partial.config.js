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

// Configuration for partial testing (excludes NewComponent tests)
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
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
    // Only include App and HelloWorld tests, exclude NewComponent
    include: ['src/tests/App.test.js', 'src/tests/HelloWorld.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: 'coverage-partial',
      all: true,
      skipFull: false,
      reportOnFailure: true,
      // Include all source files for coverage tracking
      include: ['src/**/*.{vue,js}'],
      exclude: ['src/tests/**']
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
