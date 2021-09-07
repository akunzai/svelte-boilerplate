import { addMessages, init } from 'svelte-i18n';

addMessages('en', {});

init({
  fallbackLocale: 'en',
  initialLocale: 'en',
  warnOnMissingMessages: false,
});
