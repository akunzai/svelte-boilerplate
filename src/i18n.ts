import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import zhHant from './locales/zh-Hant.json';

addMessages('en', {});
addMessages('zh-Hant', zhHant);
addMessages('zh-TW', zhHant);

init({
  fallbackLocale: 'en',
  initialLocale: localStorage.getItem('locale') || getLocaleFromNavigator(),
  warnOnMissingMessages: false,
});
