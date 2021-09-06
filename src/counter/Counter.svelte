<script lang="ts">
  import { _ } from 'svelte-i18n';
  export let count = 0;
</script>

<div>
  <h1>{$_('Counter')}</h1>
  <p aria-live="polite">
    {$_('Current count')}: <strong>{count}</strong>
  </p>
  <button class="btn btn-primary" on:click={() => (count += 1)}>
    {$_('Increment')}
  </button>
</div>
