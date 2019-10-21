import { storiesOf } from "@storybook/react-native"
import React from "react"
import { MyNewComponentQueryRenderer as MyNewComponent } from "../MyNewComponent"

storiesOf("MyNewComponent").add("Show Tim Fishlock", () => {
  return <MyNewComponent artistID="tim-fishlock" />
})
