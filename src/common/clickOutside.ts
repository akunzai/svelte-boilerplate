// https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783
const clickOutside = (node: HTMLElement) => {
    const handleClick = (e: MouseEvent) => {
      if (node && !node.contains(e.target as Node) && !e.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('click_outside', node as CustomEventInit)
        );
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      },
    };
  };
export default clickOutside;