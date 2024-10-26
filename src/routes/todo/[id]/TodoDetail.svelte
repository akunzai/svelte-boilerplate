<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { TodoService } from '../TodoService';
  import { Todo } from '../types';

  const todoService = new TodoService();
  let { id }: { id: number } = $props();
  let loaded = $state(false);
  let todo: Todo = $state(new Todo(id, '', undefined, false));

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    await todoService.updateTodo(todo);
    history.back();
  };

  const handleChange = (event: Event) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    todo = {
      ...todo,
      [name]: type === 'checkbox' ? checked : value,
    };
  };

  onMount(async () => {
    const values = await todoService.getTodo(id);
    if (values !== undefined) {
      loaded = true;
      todo = values;
    }
  });
</script>

{#if !loaded}
  <div>Loading...</div>
{:else}
  <form onsubmit={handleSubmit}>
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      onclick={() => {
        history.back();
      }}
    ></button>
    <div class="mb-3">
      <label class="form-label" for="title">
        {$_('Title')}
      </label>
      <input
        name="title"
        bind:value={todo.title}
        onchange={handleChange}
        class="form-control"
        aria-label="Title"
        placeholder={$_('Title')}
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="description">
        {$_('Description')}
      </label>
      <textarea
        name="description"
        bind:value={todo.description}
        onchange={handleChange}
        class="form-control"
        aria-label="Description"
        placeholder={$_('Description')}
      ></textarea>
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input
          name="done"
          type="checkbox"
          bind:checked={todo.done}
          onchange={handleChange}
          class="form-check-input"
        />
        <label class="form-check-label" for="done">
          {$_('Done')}
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" aria-label="Save">
      {$_('Save')}
    </button>
  </form>
{/if}
