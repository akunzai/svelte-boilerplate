import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [sveltekit(), svelteTesting()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      'msw/node': fileURLToPath(new URL('./node_modules/msw/lib/node/index.mjs', import.meta.url)),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'clover'],
      include: ['src/routes/**/*.ts', 'src/routes/**/*.svelte'],
      exclude: [
        '**/*.d.ts',
        '**/+*.{svelte,ts}',
        '**/*.test.ts',
      ],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts']
  },
});
