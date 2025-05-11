/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['dotenv-flow/config'],
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec).[tj]s?(x)'],
  coveragePathIgnorePatterns: ['src/infra/db/prisma/generated/'],
}

module.exports = config
