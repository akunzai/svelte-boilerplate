<script lang="ts">
  import { page } from '$app/stores';
  import { locale } from 'svelte-i18n';
  import { get } from 'svelte/store';
  import { clickOutside } from '../lib';
  import { browser } from '$app/environment';
  let { title }: { title: string } = $props();
  let collapsed = $state(true);
  let expanded = $state(false);

  locale.subscribe((lang) => {
    if (browser && lang) {
      localStorage.setItem('locale', lang);
    }
  });

  const isCurrentLanguage = (pattern: RegExp): boolean => {
    const currentLocale = get(locale);
    if (!currentLocale) return false;
    return pattern.test(currentLocale);
  };
  const changeLanguage = (lang: string): void => {
    locale.set(lang);
    expanded = false;
  };
</script>

<header>
  <nav
    class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
  >
    <div class="container">
      <a class="navbar-brand" href="/">{title}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".navbar-collapse"
        aria-label="Toggle navigation"
        aria-expanded={!collapsed}
        onclick={() => (collapsed = !collapsed)}
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class={`navbar-collapse collapse d-sm-inline-flex justify-content-end ${
          collapsed ? '' : 'show'
        }`}
        role="menu"
      >
        <ul class="navbar-nav flex-grow">
          <li
            aria-current={$page.url.pathname === '/' ? 'page' : undefined}
            class="nav-item"
          >
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/counter">Counter</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/todo">Todo</a>
          </li>
          <li class="nav-item dropdown">
            <button
              class={`btn dropdown-toggle ${expanded ? 'show' : ''}`}
              id="i18nDropdown"
              aria-label="Toggle Languages"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded={expanded}
              onclick={() => (expanded = !expanded)}
              use:clickOutside={{
                enabled: expanded,
                cb: () => {
                  expanded = false;
                },
              }}
            >
              <i class="bi bi-globe"></i>
            </button>
            {#if expanded}
              <ul
                class={`dropdown-menu ${expanded ? 'show' : ''}`}
                aria-labelledby="i18nDropdown"
              >
                <li>
                  <button
                    class={`dropdown-item ${
                      isCurrentLanguage(/^en/i) ? 'active' : ''
                    }`}
                    onclick={() => changeLanguage('en')}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    class={`dropdown-item ${
                      isCurrentLanguage(/^zh/i) ? 'active' : ''
                    }`}
                    onclick={() => changeLanguage('zh-Hant')}
                  >
                    中文(繁體)
                  </button>
                </li>
              </ul>
            {/if}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
