/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!**/node_modules/**"],
};
