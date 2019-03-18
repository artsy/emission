import React from "react"
import { ActivityIndicator, Image, ImageURISource, Text, TextInputProperties, View, ViewProperties } from "react-native"

import { Colors } from "lib/data/colors"
import { Fonts } from "lib/data/fonts"
import styled from "styled-components/native"

interface ReffableTextInputProps extends TextInputProperties {
  ref?: (component: any) => any
}

export interface TextInputProps extends ViewProperties {
  searching?: boolean
  readonly?: boolean
  text?: ReffableTextInputProps
  preImage?: ImageURISource | ImageURISource[]
}

interface State {
  focused: boolean
}

const Input = styled.TextInput`
  height: 40;
  background-color: black;
  color: white;
  font-family: "${Fonts.GaramondRegular}";
  font-size: 20;
  flex: 1;
`

const Separator = focused => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: focused ? Colors.White : Colors.GraySemibold,
      }}
    />
  )
}

const ReadOnlyInput = (props: TextInputProps) => (
  <Text
    style={{
      color: props.text.value ? Colors.White : Colors.GraySemibold,
      fontFamily: Fonts.GaramondRegular,
      fontSize: 20,
      paddingTop: 8,
    }}
  >
    {props.text.value || props.text.placeholder}
  </Text>
)

export default class TextInputField extends React.Component<TextInputProps, State> {
  constructor(props) {
    super(props)
    this.state = { focused: false }
  }
  render() {
    return (
      <View style={[this.props.style, { flex: 1, maxHeight: 40 }]}>
        <View style={{ flexDirection: "row", height: 40 }}>
          {this.props.preImage && <Image source={this.props.preImage} style={{ marginRight: 6, marginTop: 12 }} />}
          {this.props.readonly ? (
            ReadOnlyInput(this.props)
          ) : (
            <Input
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardAppearance="dark"
              placeholderTextColor={this.state.focused ? "white" : Colors.GraySemibold}
              selectionColor={Colors.GrayMedium}
              {...this.props.text}
              onFocus={e => this.setState({ focused: true }, () => this.props.text.onFocus(e))}
              onBlur={e => this.setState({ focused: false }, () => this.props.text.onBlur(e))}
            />
          )}

          {this.props.searching ? <ActivityIndicator animating={this.props.searching} /> : null}
        </View>
        {Separator(this.state.focused)}
      </View>
    )
  }
}
