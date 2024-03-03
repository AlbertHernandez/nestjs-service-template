import swc from "unplugin-swc";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    isolate: false,
    include: ["tests/e2e/**/*.test.ts"],
    env: loadEnv("test", process.cwd(), ""),
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage/e2e",
      include: ["src/**/*.ts"],
    },
  },
  plugins: [swc.vite()],
});
