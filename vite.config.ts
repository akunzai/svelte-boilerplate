/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [svelte(), nodePolyfills()],
  server: {
    open: true,
  },
  test: {
    alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }],
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
});
