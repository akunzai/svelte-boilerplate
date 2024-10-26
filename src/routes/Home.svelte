<script>
  import { _ } from 'svelte-i18n';
</script>

<div>
  <h1>{$_('Welcome!')}</h1>
  <p>
    You are running this application in <b>{process.env.NODE_ENV}</b> mode.
  </p>
</div>
