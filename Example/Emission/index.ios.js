import MessageQueue from "react-native/Libraries/BatchedBridge/MessageQueue.js"

const spyFunction = msg => {
  if (!(msg.module === "RCTDeviceEventEmitter" && msg.args[0] === "websocketMessage")) {
    console.log(msg)
  }
}

MessageQueue.spy(spyFunction)

import "./index.storybooks"
import "../../src/lib/Components/Storybooks"

import "../../index.ios"
