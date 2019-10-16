import { storiesOf } from "@storybook/react-native"
import React from "react"
import { MyNewComponent } from "../MyNewComponent"

storiesOf("MyNewComponent").add("Show default component", () => {
  return <MyNewComponent />
})
