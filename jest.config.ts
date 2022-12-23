import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        compiler: 'typescript',
      },
    ],
  },
  rootDir: './',
  testRegex: '\\/src\\/.*\\.spec\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  collectCoverage: true,
};

module.exports = jestConfig;
