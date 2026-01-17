# My Svelte Boilerplate

[![Build Status][build-badge]][build] [![Code Coverage][codecov-badge]][codecov]

[build]: https://github.com/akunzai/svelte-boilerplate/actions/workflows/build.yml
[build-badge]: https://github.com/akunzai/svelte-boilerplate/actions/workflows/build.yml/badge.svg
[codecov]: https://codecov.io/gh/akunzai/svelte-boilerplate
[codecov-badge]: https://codecov.io/gh/akunzai/svelte-boilerplate/branch/main/graph/badge.svg?token=MIhzjUoLaM

[Svelte](https://svelte.dev) boilerplate to kick-start new project with CSS + Bootstrap

## Requirement

- [Bun](https://bun.sh/)

## Get started

```sh
# install packages
bun install

# watch and serve a dev server at http://localhost:5173/
bun run start

# Running unit tests
bun test

# build the project in production mode.
bun run build

# extracts i18n messages from source code
bun run i18n:extract src/lib/i18n/locales/zh-Hant.json
```

## Reference

- [Svelte](https://svelte.dev/docs/svelte)
- [SvelteKit](https://svelte.dev/docs/kit)
- [Svelte plugin for Vite](https://github.com/sveltejs/vite-plugin-svelte)
- [Svelte i18n Library](https://github.com/kaisermann/svelte-i18n)
- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)
- [Mock Service Worker](https://mswjs.io/docs/)
