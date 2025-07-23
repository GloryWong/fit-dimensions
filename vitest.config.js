import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['**'],
      reporter: ['text', 'json-summary', 'json'],
    },
  },
})
