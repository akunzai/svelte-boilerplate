import { fireEvent, render, screen } from '@testing-library/svelte';
import html from 'svelte-htm';
import { Router } from 'svelte-routing';
import '../i18nForTests';
import NavMenu from './NavMenu.svelte';

beforeEach(() => {
  render(html`<${Router}>
    <${NavMenu} title=${'Test'} />
  <//>`);
});

test('should render with title: Test', () => {
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('support to toggle navigation', async () => {
  const navbar = screen.getByRole('menu');
  expect(navbar.getAttribute('class')).not.toContain('show');
  await fireEvent.click(
    screen.getByRole('button', { name: /Toggle navigation/i })
  );
  expect(navbar.getAttribute('class')).toContain('show');
});

test('support to switch languages', async () => {
  await fireEvent.click(
    screen.getByRole('button', { name: /Toggle Languages/i })
  );
  await fireEvent.click(screen.getByRole('button', { name: /English/i }));
  expect(localStorage.getItem('locale')).toBe('en');
  await fireEvent.click(
    screen.getByRole('button', { name: /Toggle Languages/i })
  );
  await fireEvent.click(screen.getByRole('button', { name: /中文/i }));
  expect(localStorage.getItem('locale')).toBe('zh-Hant');
});
