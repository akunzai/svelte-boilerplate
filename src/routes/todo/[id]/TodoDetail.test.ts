import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import TodoDetail from './TodoDetail.svelte';

test('without Todo should render nothing', () => {
  render(TodoDetail, { id: 0 });
  expect(screen.queryAllByRole('textbox')).toStrictEqual([]);
});

describe('with Todo', () => {
  beforeEach(async () => {
    window.history.back = vi.fn();
    render(TodoDetail, { id: 1 });
  });

  test('should renders as expected', async () => {
    const title = await screen.findByRole('textbox', {
      name: /Title/i,
    }) as HTMLInputElement;
    expect(title.value).toBe('Pay bills');
    const description = screen.getByRole('textbox', {
      name: /Description/i,
    });
    expect(description.textContent).toBe('');
    const done = screen.getByRole('checkbox') as HTMLInputElement;
    expect(done.checked).toBeTruthy();
  });

  test('should goes back when close button clicked', async () => {
    await fireEvent.click(await screen.findByRole('button', { name: /Close/i }));
    expect(window.history.back).toBeCalled();
  });

  test('should update values and goes back when form submitted', async () => {
    const input = await screen.findByRole('textbox', {
      name: /Title/i,
    });
    await userEvent.clear(input);
    await userEvent.type(input, 'Test');
    await fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    await waitFor(() => {
      expect(window.history.back).toBeCalled();
    });
  });
});
