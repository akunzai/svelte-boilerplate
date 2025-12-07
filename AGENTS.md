# Project Overview

This is a **SvelteKit** boilerplate project designed for rapid development of modern web applications. It uses **Bun.js** as the runtime and package manager.

## Tech Stack

-   **Runtime & Package Manager:** [Bun.js](https://bun.sh/)
-   **Framework:** [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Testing:**
    -   Host: [Vitest](https://vitest.dev/)
    -   Environment: `jsdom`
    -   Library: `@testing-library/svelte`
    -   Mocking: [MSW (Mock Service Worker)](https://mswjs.io/)
-   **Styling:** Bootstrap (via CDN/npm)
-   **Language:** TypeScript
-   **I18n:** `svelte-i18n`

## Project Structure

-   `src/routes`: SvelteKit application routes (file-based routing).
-   `src/lib`: Shared utilities, components, and internalization files.
-   `static`: Static assets (images, favicon, `mockServiceWorker.js`).
-   `tests`: End-to-end tests (if applicable) or integration tests.
-   `package.json`: Project dependencies and scripts.
-   `svelte.config.js`: SvelteKit configuration (adapter: `svelte-adapter-bun`).
-   `vite.config.ts`: Vite configuration (plugins, test setup).
-   `vitest-setup.ts`: Global test setup (MSW server, localStorage mock).

## Development Workflow

### Installation

```bash
bun install
```

### Development Server

```bash
bun run start
```

### Testing

```bash
bun run test
```

*Note: Run via `bun run test` to correctly use the configured Vitest runner with jsdom.*

### Build

```bash
bun run build
```

## Key Configuration Notes

-   **Bun Adapter**: The project uses `svelte-adapter-bun`. The build output is optimized for the Bun runtime.
-   **Testing Environment**: Vitest is configured to use `jsdom` to simulate a browser environment for Svelte components. `localStorage` is mocked in `vitest-setup.ts`.
-   **API Mocking**: MSW is set up to intercept network requests during tests. Handlers are defined in `src/mocks`.

## Commands

-   `bun run start`: Start dev server.
-   `bun run build`: Build for production.
-   `bun run test`: Run unit/integration tests.
-   `bun run lint`: Run code linting.
-   `bun run i18n:extract`: Extract translation strings.
<!-- Note: All explanations and comments in this document should be written in English. -->
