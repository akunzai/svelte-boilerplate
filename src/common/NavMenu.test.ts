import { fireEvent, render, screen } from '@testing-library/svelte';
import { locale } from 'svelte-i18n';
import { get } from 'svelte/store';
import '../i18nForTests';
import NavMenu from './NavMenu.test.svelte';

beforeEach(() => {
  render(NavMenu, {title: 'Test'});
});

test('should render with title: Test', () => {
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('support to toggle navigation', async () => {
  const navbar = screen.getByTestId('navbar-collapse');
  expect(navbar.getAttribute('class')).not.toContain('show');
  await fireEvent.click(screen.getByRole('button', { name: /Toggle navigation/i }));
  expect(navbar.getAttribute('class')).toContain('show');
});

test('support to switch languages', async () => {
  await fireEvent.click(screen.getByRole('button', { name: /Toggle Languages/i }));
  await fireEvent.click(screen.getByRole('button', { name: /English/i }));
  expect(get(locale)).toBe('en');
  await fireEvent.click(screen.getByRole('button', { name: /Toggle Languages/i }));
  await fireEvent.click(screen.getByRole('button', { name: /正體中文/i }));
  expect(get(locale)).toBe('zh-Hant');
});
