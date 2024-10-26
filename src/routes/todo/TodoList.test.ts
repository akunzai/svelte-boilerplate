import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/svelte';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { beforeEach, expect, test } from 'vitest';
import { server } from '../../mocks/node';
import TodoList from './TodoList.svelte';

beforeEach(async () => {
  render(TodoList);
});

test('should renders as expected', async () => {
  const links = await screen.findAllByRole('link');
  expect(links.length).toBe(3);
  expect(links[0].textContent).toContain('Pay bills');
  expect(links[0].getAttribute('href')).toBe('/todo/1');
  expect(links[1].textContent).toContain('Read a book');
  expect(links[1].getAttribute('href')).toBe('/todo/2');
  expect(links[2].textContent).toContain('Buy eggs');
  expect(links[2].getAttribute('href')).toBe('/todo/3');

  const inputs = screen.getAllByRole('checkbox');
  expect(inputs.length).toBe(3);
  expect(inputs[0]).toBeChecked();
  expect(inputs[1]).not.toBeChecked();
  expect(inputs[2]).not.toBeChecked();
});

test('should remove item when delete button clicked', async () => {
  server.use(
    http.delete('/api/todos/3', () => {
      return new HttpResponse(null, { status: 200 });
    }),
  );
  const buttons = await screen.findAllByRole('button', { name: /Close/i });
  await fireEvent.click(buttons[2]);
  await waitForElementToBeRemoved(
    screen.getByRole('link', { name: /Buy eggs/ })
  );
  expect(screen.getAllByRole('link').length).toBe(2);
});

test('should update item when checkbox checked', async () => {
  const inputs = await screen.findAllByRole('checkbox');
  await fireEvent.click(inputs[2]);
  await waitFor(() => {
    expect(screen.getAllByRole('link')[2].getAttribute('class')).toContain(
      'text-decoration-line-through'
    );
  });
});

test('should not add item without any input', async () => {
  await fireEvent.click(await screen.findByRole('button', { name: /Add/i }));
  expect((await screen.findAllByRole('link')).length).toBe(3);
});

test('should not add item with blank input', async () => {
  await userEvent.type(await screen.findByRole('textbox'), '   ');
  await fireEvent.click(screen.getByRole('button', { name: /Add/i }));
  expect((await screen.findAllByRole('link')).length).toBe(3);
});

test('should add item and clears the input', async () => {
  await userEvent.type(await screen.findByRole('textbox'), 'Test');
  await fireEvent.click(screen.getByRole('button', { name: /Add/i }));
  await waitFor(() => expect(screen.getByText('Test')).toBeInTheDocument());
  const link = await screen.findByRole('link', { name: /Test/i });
  expect(link.textContent).toContain('Test');
  expect(link.getAttribute('href')).toBe('/todo/4');
});
