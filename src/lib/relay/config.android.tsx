let metaphysicsURL
let gravityURL

// if (__DEV__) {
metaphysicsURL = "https://metaphysics-staging.artsy.net"
gravityURL = "https://stagingapi.artsy.net"
// } else {
// metaphysicsURL = "https://metaphysics-production.artsy.net"
// gravityURL = "https://api.artsy.net"
// }

export { metaphysicsURL, gravityURL }

// Disable the native polyfill during development, which will make network requests show-up in the Chrome dev-tools.
// Specifically, in our case, we get to see the Relay requests.
//
// It will be `undefined` unless running inside Chrome.
//
declare var global: any
if (__DEV__ && global.originalXMLHttpRequest !== undefined) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
  // tslint:disable-next-line:no-var-requires
  require("react-relay/lib/RelayNetworkDebug").init()
}
