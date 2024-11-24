const config = {
  "**/*.{ts?(x),mts}": () => "tsc -p tsconfig.prod.json --noEmit",
  "*.{js,jsx,mjs,cjs,ts,tsx,mts}": [
    "node --run lint:file",
    "vitest related --run",
  ],
  "*.{md,json}": "prettier --write",
  "*": "node --run typos",
  "*.{yml,yaml}": "node --run lint:yaml",
};

export default config;
