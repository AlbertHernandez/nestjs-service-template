const config = {
  "**/*.ts?(x)": () => "tsc -p tsconfig.prod.json --noEmit",
  "*.{js,jsx,ts,tsx}": ["npm run lint"],
  "*.{md,json}": "prettier --write",
};

module.exports = config;
