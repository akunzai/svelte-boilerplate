<script lang="ts">
  import { locale } from 'svelte-i18n';
  import { Link } from 'svelte-routing';
  import { get } from 'svelte/store';
  import { clickOutside } from '../actions';

  export let title: string;
  let collapsed = true;
  let expanded = false;

  locale.subscribe((lang) => {
    localStorage.setItem('locale', lang);
  });

  const isCurrentLanguage = (pattern: RegExp): boolean => {
    const currentLocale = get(locale);
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
        on:click={() => (collapsed = !collapsed)}
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        class={`navbar-collapse collapse d-sm-inline-flex justify-content-end ${
          collapsed ? '' : 'show'
        }`}
        role="menu"
      >
        <ul class="navbar-nav flex-grow">
          <li class="nav-item">
            <Link class="nav-link" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/counter">Counter</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/todo-list">Todo</Link>
          </li>
          <li class="nav-item dropdown">
            <button
              class={`btn dropdown-toggle ${expanded ? 'show' : ''}`}
              id="i18nDropdown"
              aria-label="Toggle Languages"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded={expanded}
              on:click={() => (expanded = !expanded)}
              use:clickOutside={{
                enabled: expanded,
                cb: () => {
                  expanded = false;
                },
              }}
            >
              <i class="bi bi-globe" />
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
                    on:click={() => changeLanguage('en')}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    class={`dropdown-item ${
                      isCurrentLanguage(/^zh/i) ? 'active' : ''
                    }`}
                    on:click={() => changeLanguage('zh-Hant')}
                  >
                    正體中文
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
