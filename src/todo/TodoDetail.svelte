<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Todo from './Todo';
  import TodoService from './TodoService';

  const todoService = new TodoService();
  export let id: string;
  let loaded = false;
  let title = '';
  let description: string | undefined;
  let done = false;

  onMount(() => {
    todoService.getTodo(Number(id)).subscribe((todo) => {
      if (todo !== undefined) {
        loaded = true;
        title = todo.title;
        description = todo.description || '';
        done = todo.done;
      }
    });
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const newTodo = new Todo(Number(id), title, description, done);
    todoService.updateTodo(newTodo).subscribe(() => {
      history.back();
    });
  };
</script>

{#if !loaded}
  <div>Loading...</div>
{:else}
  <form on:submit={handleSubmit}>
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      on:click={() => {
        history.back();
      }}
    />
    <div class="mb-3">
      <label class="form-label" for="title">
        {$_('Title')}
      </label>
      <input
        class="form-control"
        name="title"
        aria-label="Title"
        placeholder={$_('Title')}
        bind:value={title}
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label" for="description">
        {$_('Description')}
      </label>
      <textarea
        class="form-control"
        name="description"
        aria-label="Description"
        placeholder={$_('Description')}
        bind:value={description}
      />
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          name="done"
          type="checkbox"
          bind:checked={done}
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
