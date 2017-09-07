import * as PropTypes from "prop-types"
import * as React from "react"
import { ColorPropType, processColor, requireNativeComponent, View } from "react-native"
import colors from "../../data/colors"

interface Props {
  /** The color of the dots (default: Artsy gray-medium) */
  color?: string
}

class DottedLine extends React.Component<Props, null> {
  static propTypes = {
    color: ColorPropType,
  }
  static defaultProps = {
    color: colors["gray-medium"],
  }
  render() {
    return <NativeDottedLine style={{ height: 2 }} color={processColor(this.props.color)} />
  }
}

export default DottedLine

const NativeDottedLine: React.ComponentClass<any> = requireNativeComponent("ARDottedLine", DottedLine)
