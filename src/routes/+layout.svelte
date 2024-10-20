<script>
  import Header from './Header.svelte';
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
	<title>Svelte Boilerplate</title>
</svelte:head>

<Header title="Svelte Boilerplate" />
<main class="container">
  {@render children?.()}
</main>
