import './main.css';
import './i18n';

// Start the mocking conditionally.
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')!,
});

export default app;
