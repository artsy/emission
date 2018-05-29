import React from "react"
import { Animated, StyleProp, StyleSheet, TextStyle, TouchableHighlight, View } from "react-native"

import colors from "lib/data/colors"
import Spinner from "../Spinner"
import Headline from "../Text/Headline"

const AnimationDuration = 250
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight)
const AnimatedHeadline = Animated.createAnimatedComponent(Headline)

export interface InvertedButtonProps extends React.Props<InvertedButton> {
  text: string
  textStyle?: StyleProp<TextStyle>
  selected?: boolean
  inProgress?: boolean
  onPress?: React.TouchEventHandler<InvertedButton> | ((event: React.FormEvent<any>) => void)
  onSelectionAnimationFinished?: Animated.EndCallback
}

interface InvertedButtonState {
  textOpacity: Animated.Value
  backgroundColor: Animated.Value
}

export default class InvertedButton extends React.Component<InvertedButtonProps, InvertedButtonState> {
  constructor(props: any) {
    super(props)
    this.state = {
      textOpacity: new Animated.Value(1),
      backgroundColor: new Animated.Value(props.selected ? 1 : 0),
    }
  }

  componentWillUpdate(nextProps: any, nextState: any) {
    if (this.props.selected !== nextProps.selected) {
      nextState.textOpacity.setValue(0)
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.selected !== prevProps.selected) {
      const duration = AnimationDuration
      Animated.parallel([
        Animated.timing(this.state.textOpacity, { toValue: 1, duration }),
        Animated.timing(this.state.backgroundColor, { toValue: this.props.selected ? 1 : 0, duration }),
      ]).start(this.props.onSelectionAnimationFinished)
    }
  }

  render() {
    const backgroundColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["black", colors["purple-regular"]],
    })
    const styling = {
      underlayColor: this.props.selected ? "black" : colors["purple-regular"],
      style: [styles.button, { backgroundColor }],
    }
    let content: JSX.Element = null
    if (this.props.inProgress) {
      content = <Spinner spinnerColor="white" style={{ backgroundColor: "transparent" }} />
    } else {
      const customStyle = this.props.textStyle || {}
      const headlineStyles = [styles.text, customStyle, { opacity: this.state.textOpacity }]
      content = <AnimatedHeadline style={headlineStyles}>{this.props.text}</AnimatedHeadline>
    }
    return (
      <AnimatedTouchable onPress={this.props.onPress} activeOpacity={1} disabled={this.props.inProgress} {...styling}>
        <View>{content}</View>
      </AnimatedTouchable>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
})
