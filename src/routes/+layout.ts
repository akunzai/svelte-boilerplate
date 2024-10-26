import { browser } from '$app/environment'
import '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async () => {
	if (browser) {
		const lang = localStorage.getItem('locale');
		if (lang) {
			locale.set(lang)
		}
	}
	await waitLocale()
}
export const prerender = false;
export const ssr = false;
