/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: 'esnext',
  },
  plugins: [svelte()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'clover'],
      include: ['src/**/*.ts', 'src/**/*.svelte'],
      exclude: [
        'src/App.svelte',
        'src/i18n.ts',
        'src/main.ts',
        'src/setupTests.ts',
        'src/mocks/**/*',
        'src/**/*.d.ts',
      ],
    },
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : []
  }
}));
