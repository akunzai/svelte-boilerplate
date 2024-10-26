import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [sveltekit(), svelteTesting()],
  server: {
    open: true,
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
