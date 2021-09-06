<script lang="ts">
  import { Route,Router } from 'svelte-navigator';
  import Home from './common/Home.svelte';
  import NavMenu from './common/NavMenu.svelte';
  import Counter from './counter/Counter.svelte';
  import TodoDetail from './todo/TodoDetail.svelte';
  import TodoList from './todo/TodoList.svelte';
</script>

<Router>
  <NavMenu title={document.title} />
  <main class="container">
    <Route path="/" component={Home}/>
    <Route path="/counter" component={Counter} />
    <Route path="/todo-list" component={TodoList} />
    <Route path="/todo/:id" component={TodoDetail} />
  </main>
</Router>
