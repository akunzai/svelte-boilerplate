<script>
  import { page } from '$app/stores';
  import TodoDetail from './TodoDetail.svelte';
</script>

<TodoDetail id={Number($page.params.id)} />
