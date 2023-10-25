module.exports = {
  root: true,
  extends: ["haku/react"],
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  rules: {
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "react/require-default-props": "off",
  },
};
