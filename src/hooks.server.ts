import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'
import { dev } from '$app/environment';

if (dev) {
  const { server } = await import('./mocks/node');
  server.listen();
}

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get('accept-language')?.split(',')[0]
	if (lang) {
		locale.set(lang)
	}
  return resolve(event);
};