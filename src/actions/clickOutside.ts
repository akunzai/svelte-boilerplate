// https://svelte.dev/repl/dae848c2157e48ab932106779960f5d5
import type { ActionReturn } from 'svelte/action';

export function clickOutside(
  node: HTMLElement,
  params: { enabled: boolean; cb: () => void }
): ActionReturn<{ enabled: boolean }> {
  const { enabled: initialEnabled, cb } = params;

  const handleOutsideClick = ({ target }: MouseEvent) => {
    if (!node.contains(target as Node)) cb();
  };

  function update({ enabled }: { enabled: boolean }) {
    if (enabled) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }
  }
  update({ enabled: initialEnabled });
  return {
    update,
    destroy() {
      window.removeEventListener('click', handleOutsideClick);
    },
  };
}
