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
    <Route path="/counter" component={Counter} />
    <Route path="/todo-list" component={TodoList} />
    <Route path="/todo/:id" component={TodoDetail} />
    <Route component={Home} />
  </main>
</Router>
