import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/lib/__tests__/setup.ts'],
    include: ['src/lib/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/*.stories.*'],
    coverage: {
      include: ['src/lib/**/*.{ts,tsx}'],
      exclude: ['src/lib/**/*.test.*', 'src/lib/__tests__/**', '**/*.stories.*'],
    },
  },
})
