const config = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.prod.json --noEmit",
  "*.{js,jsx,ts,tsx}": ["npm run lint", "vitest related --run"],
  "*.{md,json}": "prettier --write",
  "*": "npm run typos",
};

module.exports = config;
