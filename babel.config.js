module.exports = function(api) {
  console.log("OK")
  api.cache.never()
  // debugger
  return {
    plugins: [
      ["@babel/plugin-transform-runtime"],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["relay", { artifactDirectory: "./src/__generated__" }],
    ],
    presets: ["module:metro-react-native-babel-preset", "@babel/preset-typescript"],
  }
}
