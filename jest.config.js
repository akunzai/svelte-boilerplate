module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!svelte-routing)'],
  moduleFileExtensions: ['ts', 'js', 'jsx', 'svelte'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,svelte}',
    '!src/App.svelte',
    '!src/i18n*.ts',
    '!src/main.ts',
    '!src/types.ts',
    '!src/**/*.test.{ts,svelte}',
    '!src/**/*.d.ts',
    '!src/mocks/*.ts',
    '!jest.global-mocks.ts',
  ],
};
