<script lang="ts">
  import { onMount } from 'svelte';
  import { createForm } from 'svelte-forms-lib';
  import { _ } from 'svelte-i18n';
  import { TodoService } from '../api';
  import { Todo } from '../types';

  const todoService = new TodoService();
  export let id: number;
  let loaded = false;

  const { form, handleChange, handleSubmit, updateInitialValues } =
    createForm<Todo>({
      initialValues: new Todo(id, '', undefined, false),
      onSubmit: async (values) => {
        await todoService.updateTodo(values);
        history.back();
      },
    });

  onMount(async () => {
    const values = await todoService.getTodo(id);
    if (values !== undefined) {
      loaded = true;
      updateInitialValues(values);
    }
  });
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
        name="title"
        bind:value={$form.title}
        on:change={handleChange}
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
        bind:value={$form.description}
        on:change={handleChange}
        class="form-control"
        aria-label="Description"
        placeholder={$_('Description')}
      />
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input
          name="done"
          type="checkbox"
          bind:checked={$form.done}
          on:change={handleChange}
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
