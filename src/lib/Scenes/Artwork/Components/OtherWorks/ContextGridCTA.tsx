import { ArrowRightIcon, Sans } from "@artsy/palette"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import React from "react"
import { Text, TouchableWithoutFeedback } from "react-native"

interface ContextGridCTAProps {
  href?: string
  label: string
}

export class ContextGridCTA extends React.Component<ContextGridCTAProps> {
  render() {
    const { href, label } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => href && SwitchBoard.presentNavigationViewController(this, href)}>
        <Text>
          <Sans size="2" textAlign="left" weight="medium">
            {label}
          </Sans>
          <ArrowRightIcon fill="black30" height="8px" />
        </Text>
      </TouchableWithoutFeedback>
    )
  }
}
