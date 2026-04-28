import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['index.ts'],
      reporter: ['text', 'json-summary', 'json'],
    },
  },
})
