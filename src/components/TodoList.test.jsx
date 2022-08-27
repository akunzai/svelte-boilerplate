import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { Router } from 'svelte-routing';
import '../i18nForTests';
import { rest, server } from '../mocks/server';
import { Todo } from '../types';
import TodoList from './TodoList.svelte';

beforeEach(async () => {
  render(
    <Router>
      <TodoList />
    </Router>
  );
  await waitFor(() => expect(screen.getAllByRole('link').length).toBe(3));
});

test('should renders as expected', () => {
  const links = screen.getAllByRole('link');
  expect(links.length).toBe(3);
  expect(links[0].textContent).toContain('Pay bills');
  expect(links[0].getAttribute('href')).toBe('/todo/1');
  expect(links[1].textContent).toContain('Read a book');
  expect(links[1].getAttribute('href')).toBe('/todo/2');
  expect(links[2].textContent).toContain('Buy eggs');
  expect(links[2].getAttribute('href')).toBe('/todo/3');

  const inputs = screen.getAllByRole('checkbox');
  expect(inputs.length).toBe(3);
  expect(inputs[0].checked).toBeTruthy();
  expect(inputs[1].checked).toBeFalsy();
  expect(inputs[2].checked).toBeFalsy();
});

test('should remove item when delete button clicked', async () => {
  server.use(
    rest.delete('/api/todos/3', (req, res, ctx) => {
      return res(ctx.json(req.body));
    }),
    rest.get('/api/todos', (req, res, ctx) => {
      return res(
        ctx.json([
          new Todo(1, 'Pay bills', '', true),
          new Todo(2, 'Read a book'),
        ])
      );
    })
  );
  const buttons = screen.getAllByRole('button', { name: /Close/i });
  await fireEvent.click(buttons[2]);
  await waitForElementToBeRemoved(
    screen.getByRole('link', { name: /Buy eggs/ })
  );
  expect(screen.getAllByRole('link').length).toBe(2);
});

test('should update item when checkbox checked', async () => {
  const inputs = screen.getAllByRole('checkbox');
  await fireEvent.click(inputs[2]);
  await waitFor(() => {
    expect(screen.getAllByRole('link')[2].getAttribute('class')).toContain(
      'text-decoration-line-through'
    );
  });
});

test('should not add item without any input', async () => {
  await fireEvent.click(screen.getByRole('button', { name: /Add/i }));
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
