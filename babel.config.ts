module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ts", ".tsx", ".js", ".json"],
          alias: {
            "@src": "./src",
            "@core": "./src/core",
            "@data": "./src/data",
            "@domain": "./src/domain",
            "@features": "./src/features",
            "@ui": "./src/ui",
            "@navigation": "./src/navigation",
            "@assets": "./src/assets",
            "@types": "./src/@types",
          },
        },
      ],
    ],
  };
};
