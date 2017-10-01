module.exports = ({ platform }, defaultConfig) => {
  const config = Object.assign({}, defaultConfig)
  config.entry = `./Example/Emission/index.${platform}.js`
  config.resolve.extensions = config.resolve.extensions.concat([".ts", ".tsx", ".js", ".jsx"])
  // Modify existing JS loader to also handle TS sources.
  config.module.rules.find(rule => rule.test && rule.test.toString() === "/\\.js$/").test = /\.(js|tsx?)$/
  return config
}
