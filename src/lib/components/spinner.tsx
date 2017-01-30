import * as React from 'react'
import { ColorPropType, processColor, requireNativeComponent, View, StyleSheet } from 'react-native'

interface Props extends React.Props<Spinner> {

}

interface State {

}

export default class Spinner extends React.Component<Props, State> {
  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        <NativeSpinner spinnerColor={processColor(this.props.spinnerColor)} style={styles.spinner} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 22,
    height: 22,
  }
})

// Only needed so React doesn’t complain about ARSpinner not havig any propTypes.
Spinner.propTypes = {
  spinnerColor: ColorPropType,
}

const NativeSpinner = requireNativeComponent('ARSpinner', Spinner)
