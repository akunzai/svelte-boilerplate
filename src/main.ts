import './main.scss';
import './i18n';

// Start the mocking conditionally.
if (process.env.MOCK === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser');
  worker.start();
}

import App from './App.svelte';

const app = new App({
  target: document.body,
});

export default app;
