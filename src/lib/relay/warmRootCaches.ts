// tslint:disable-next-line:no-var-requires
const BatchedBridge = require("BatchedBridge")

BatchedBridge.registerCallableModule("ARCacheWarmer", {
  warm: (a, b) => {
    console.log("OK")
    console.log(a)
    console.log(b)

    return new Promise(res => {
      console.log("Done")
      res()
    })
  },
})
