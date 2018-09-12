import { storiesOf } from "@storybook/react-native"
import React from "react"
import { View } from "react-native"

import { AnimatedCarousel } from "../AnimatedCarousel"

storiesOf("App Style/Animated Carousel")
  .addDecorator(story => (
    <View accessibilityLabel="wrapperView" style={{ height: 200, marginTop: 60, marginLeft: 20, marginRight: 20 }}>
      {story()}
    </View>
  ))
  .add("Default", () => {
    return <AnimatedCarousel />
  })
