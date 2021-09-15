import { fireEvent, render, screen } from '@testing-library/svelte';
import Counter from './Counter.svelte';
import '../i18nForTests';

beforeEach(() => {
  render(Counter);
});

test('should render counter with 0', () => {
  expect(screen.getByText(/Current count:/).textContent).toContain(
    'Current count: 0'
  );
});

test('should increment the counter on click', async () => {
  await fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByText(/Current count:/).textContent).toContain(
    'Current count: 1'
  );
});
