import React from "react"
import { StyleSheet } from "react-native"

import { ButtonProps, InvertedButton } from "../../Buttons"

export class Button extends React.Component<ButtonProps> {
  render() {
    const { style, ...props } = this.props

    return <InvertedButton style={[styles.default, style]} {...props} />
  }
}

const styles = StyleSheet.create({
  default: {
    // fontSize: 14,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 1,
    // color: '#ffffff'
  },
})
