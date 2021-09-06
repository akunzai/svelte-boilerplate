import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

const zhHant = require('./locales/zh-Hant.json');

addMessages('en', {});
addMessages('zh-Hant', zhHant);
addMessages('zh-TW', zhHant);

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
  warnOnMissingMessages: false,
});
