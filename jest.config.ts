import fs from "fs-extra";
import type { Config } from "jest";

const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, "utf-8"));

const config: Config = {
  transform: {
    "^.+\\.(t|j)s$": ["@swc/jest", swcConfig],
  },
  testEnvironment: "node",
  cacheDirectory: ".tmp/jestCache",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  setupFiles: ["<rootDir>.jest/set-env-vars.ts"],
  clearMocks: true,
};

export default config;
