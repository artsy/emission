import React from "react"
import { requireNativeComponent } from "react-native"

interface Props {}

export class AnimatedCarousel extends React.Component<Props, null> {
  static propTypes = {}

  render() {
    return <NativeAnimatedCarousel style={{ flex: 1 }} />
  }
}

const NativeAnimatedCarousel: React.ComponentClass<any> = requireNativeComponent("ARAnimatedCarousel", AnimatedCarousel)
