const { getDefaultConfig } = require("expo/metro-config");

const path = require("path");
const extraNodeModules = {
  "@qrcode": path.resolve(__dirname + "../../../src"),
};

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;
  config.watchFolders = [path.resolve(__dirname, "../../src")];

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  };

  return config;
})();
