import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
  transform: {
    "^.+\\.(t|j)s$": "@swc/jest",
  },
  testEnvironment: "node",
  cacheDirectory: ".tmp/jestCache",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  setupFiles: ["<rootDir>.jest/set-env-vars.ts"],
  clearMocks: true,
  coverageReporters: ["json", "lcov", "text"],
  modulePaths: ["."],
  moduleNameMapper: pathsToModuleNameMapper({
    "@/*": ["src/*"],
  }),
};

export default config;
