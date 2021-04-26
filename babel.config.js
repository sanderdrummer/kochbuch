// babel.config.js
module.exports = {
  presets: [
    "@babel/react",
    ["@babel/env", { modules: "commonjs" }],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
