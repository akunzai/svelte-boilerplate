// https://stackoverflow.com/a/66275285
declare namespace svelte.JSX {
  interface HTMLProps<T> {
    onclick_outside?: () => void;
  }
}
