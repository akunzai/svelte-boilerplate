import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import Home from './Home.svelte';

test('should render with title: Welcome!', async () => {
  render(Home);
  expect(screen.getByText('Welcome!')).toBeInTheDocument();
});
