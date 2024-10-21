<script lang="ts">
  import { _ } from 'svelte-i18n';
  interface Props {
    count?: number;
  }

  let { count = $bindable(0) }: Props = $props();
</script>

<div>
  <h1>{$_('Counter')}</h1>
  <p aria-live="polite">
    {$_('Current count')}: <strong>{count}</strong>
  </p>
  <button class="btn btn-primary" onclick={() => (count += 1)}>
    {$_('Increment')}
  </button>
</div>
