module.exports = function(api) {
  console.log("HIII")
  api.cache(true)
  return {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["relay", { artifactDirectory: "./src/__generated__" }],
    ],
    presets: ["module:metro-react-native-babel-preset"],
  }
}
