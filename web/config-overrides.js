const {
  removeModuleScopePlugin,
  override,
  babelInclude,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  addWebpackAlias({
    ["@qrcode"]: path.resolve(__dirname, "../src"),
  }),
  babelInclude([path.resolve("src"), path.resolve("../src")])
);
