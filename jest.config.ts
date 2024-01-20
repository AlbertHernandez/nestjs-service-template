import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.(t|j)s$": ["@swc/jest", { configFile: ".swcrc" }],
  },
  testEnvironment: "node",
  cacheDirectory: ".tmp/jestCache",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  setupFiles: ["<rootDir>.jest/set-env-vars.ts"],
  clearMocks: true,
};

export default config;
