import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

import { createVitestTestConfig } from "./create-vitest-test-config";

export default defineConfig({
  test: createVitestTestConfig("unit"),
  plugins: [swc.vite()],
});
