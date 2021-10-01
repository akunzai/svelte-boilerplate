/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!svelte-routing)'],
  moduleFileExtensions: ['ts', 'js', 'jsx', 'svelte'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,svelte}',
    '!src/App.svelte',
    '!src/main.ts',
    '!src/i18n*.ts',
    '!src/**/*.test.{ts,svelte}',
    '!src/**/*.d.ts',
    '!src/mocks/*.ts',
    '!jest.global-mocks.ts',
  ],
};
