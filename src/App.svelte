<script lang="ts">
  import { Route, Router } from 'svelte-routing';
  import Counter from './components/Counter.svelte';
  import Home from './components/Home.svelte';
  import NavMenu from './components/NavMenu.svelte';
  import TodoDetail from './components/TodoDetail.svelte';
  import TodoList from './components/TodoList.svelte';
</script>

<Router>
  <NavMenu title={document.title} />
  <main class="container">
    <Route path="/counter"><Counter /></Route>
    <Route path="/todo-list"><TodoList /></Route>
    <Route path="/todo/:id" let:params
      ><TodoDetail id={Number(params.id)} /></Route
    >
    <Route><Home /></Route>
  </main>
</Router>
