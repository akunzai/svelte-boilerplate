<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { Link } from 'svelte-routing';
  import { TodoService } from '../api';
  import type { Todo } from '../types';

  const todoService = new TodoService();
  let todos: Todo[] = [];
  let title = '';

  onMount(async () => {
    todos = await todoService.getTodoList();
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }
    const newTodo = { title: trimmedTitle, done: false } as Todo;
    const value = await todoService.addTodo(newTodo);
    const newTodos = [...todos];
    if (!newTodos.some((x) => x.id === value.id)) {
      newTodos.push(value);
    }
    todos = newTodos;
    title = '';
  };

  const handleChecked = async (todo: Todo, event: Event) => {
    const done = (event.target as HTMLInputElement).checked;
    const exist = todos.find((x) => x.id === todo.id);
    if (exist === undefined) return;
    const newTodo = Object.assign(exist, { done: done });
    await todoService.updateTodo(newTodo);
    const index = todos.findIndex((x) => x.id === todo.id);
    if (index > -1) {
      const newTodos = [...todos];
      newTodos[index] = newTodo;
      todos = newTodos;
    }
  };

  const handleRemove = async (todo: Todo) => {
    await todoService.deleteTodo(todo);
    todos = todos.filter((t) => t.id !== todo.id);
  };
</script>

<div class="row justify-content-md-center">
  <div class="col-6">
    <h1>{$_('Todo List')}</h1>
    <form on:submit={handleSubmit}>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          name="title"
          placeholder={$_('What need to be done?')}
          bind:value={title}
          required
        />
        <button
          class="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
          aria-label="Add"
        >
          <i class="bi bi-plus" />
        </button>
      </div>
    </form>
    <div class="todo list-group">
      {#each todos as todo (todo.id)}
        <div class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <div class="form-check">
              <input
                class="form-check-input"
                name="done"
                type="checkbox"
                checked={todo.done}
                on:change={(e) => handleChecked(todo, e)}
              />
            </div>
            <Link
              class={todo.done ? 'text-decoration-line-through' : ''}
              to={`/todo/${todo.id}`}
            >
              {todo.title}
            </Link>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              on:click={() => handleRemove(todo)}
            />
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
