/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    open: true,
  },
  test: {
    alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  },
});
