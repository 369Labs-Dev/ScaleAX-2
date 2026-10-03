import { defineConfig } from 'vitest/config';
import path from 'node:path';

// Lightweight component test setup, scoped to apps/website only (the
// monorepo otherwise uses Jest/Playwright — see W2 prompt notes).
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
