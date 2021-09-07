/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'svelte'],
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
