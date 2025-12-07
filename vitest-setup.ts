import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from './src/mocks/node';
import './src/lib/i18n';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

if (typeof globalThis.localStorage === 'undefined' || typeof globalThis.localStorage.setItem !== 'function') {
	let store: Record<string, string> = {};
	Object.defineProperty(globalThis, 'localStorage', {
		value: {
			getItem: vi.fn((key: string) => store[key] ?? null),
			setItem: vi.fn((key: string, value: string) => {
				store[key] = value + '';
			}),
			removeItem: vi.fn((key: string) => {
				delete store[key];
			}),
			clear: vi.fn(() => {
				store = {};
			}),
		},
		writable: true
	});
}

// https://github.com/sveltejs/kit/issues/5525
vi.mock('$app/stores', async () => {
	const { readable, writable } = await import('svelte/store');
	/**
	 * @type {import('$app/stores').getStores}
	 */
	const getStores = () => ({
		navigating: readable(null),
		page: readable({ url: new URL('http://localhost'), params: {} }),
		session: writable(null),
		updated: readable(false)
	});
	/** @type {typeof import('$app/stores').page} */
	const page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	/** @type {typeof import('$app/stores').navigating} */
	const navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	/** @type {typeof import('$app/stores').session} */
	const session = {
		subscribe(fn) {
			return getStores().session.subscribe(fn);
		}
	};
	/** @type {typeof import('$app/stores').updated} */
	const updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		}
	};
	return {
		getStores,
		navigating,
		page,
		session,
		updated
	};
});