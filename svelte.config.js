const sveltePreprocess = require('svelte-preprocess');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  //https://svelte.dev/docs#svelte_compile
  compilerOptions: {
    dev: !prod,
  },
  preprocess: sveltePreprocess({
    sourceMap: !prod,
    scss: {
      renderSync: true,
      implementation: require('sass'),
    },
  }),
};
