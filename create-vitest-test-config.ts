import { loadEnv } from "vite";
import { InlineConfig } from "vitest";

export const createVitestTestConfig = (
  testingType: "unit" | "e2e",
): InlineConfig => {
  return {
    globals: true,
    isolate: false,
    include: [`tests/${testingType}/**/*.test.ts`],
    env: loadEnv("test", process.cwd(), ""),
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: `coverage/${testingType}`,
      include: ["src/**/*.ts"],
    },
  };
};
