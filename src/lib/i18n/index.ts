import { browser } from '$app/environment';
import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';
import zhHant from './locales/zh-Hant.json';

addMessages('en', {});
addMessages('zh-Hant', zhHant);
addMessages('zh-TW', zhHant);

init({
  fallbackLocale: 'en',
  initialLocale: browser && getLocaleFromNavigator() || 'en',
  warnOnMissingMessages: false,
});
