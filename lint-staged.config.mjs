const config = {
  "**/*.{ts?(x),mts}": () => "tsc -p tsconfig.prod.json --noEmit",
  "*.{js,jsx,mjs,cjs,ts,tsx,mts}": ["pnpm lint:file", "vitest related --run"],
  "*.{md,json}": "prettier --write",
  "*": "pnpm typos",
  "*.{yml,yaml}": "pnpm lint:yaml",
};

export default config;
