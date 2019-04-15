import Mapbox from "@mapbox/react-native-mapbox-gl"
import React, { Component } from "react"
import { Animated, Easing } from "react-native"
import { MapGeoFeature } from "../types"

interface Props {
  collections: MapGeoFeature
  onPress?: (nativeEvent) => void
  filterID: string
  duration: number

  layerType: string
}

enum visibilityStatus {
  visible = "visible",
  none = "none",
}

export class SelectedShapeLayer extends Component<Props> {
  static defaultProps = {
    duration: 300,
  }
  state = {
    pinOpacity: new Animated.Value(0),
    clusterOpacity: new Animated.Value(0),
    clusterRadius: new Animated.Value(0),
    rendered: false,
  }
  stylesheet = Mapbox.StyleSheet.create({
    singleShow: {
      iconImage: Mapbox.StyleSheet.identity("icon"),
      iconSize: 1,
    },

    clusteredPoints: {
      circlePitchAlignment: "map",
      circleColor: "purple",

      circleRadius: Mapbox.StyleSheet.source(
        [[0, 15], [5, 20], [30, 30]],
        "point_count",
        Mapbox.InterpolationMode.Exponential
      ),
    },

    clusterCount: {
      textField: "{point_count}",
      textSize: 14,
      textColor: "white",
      textFont: ["Unica77 LL Medium"],
      textPitchAlignment: "map",
    },
  })

  componentDidMount() {
    this.fadeInAnimations()
  }

  fadeInAnimations() {
    this.setState(
      {
        pinOpacity: new Animated.Value(0),
        clusterOpacity: new Animated.Value(0),
        clusterRadius: new Animated.Value(0),
        rendered: true,
      },
      () => {
        Animated.timing(this.state.pinOpacity, {
          toValue: 1,
          duration: this.props.duration,
        }).start()

        Animated.timing(this.state.clusterOpacity, {
          toValue: 1,
          duration: this.props.duration,
        }).start()

        Animated.timing(this.state.clusterRadius, {
          toValue: 1,
          duration: this.props.duration,
          easing: Easing.in(Easing.cubic),
        }).start()
      }
    )
  }

  getShapeLayer(layerType, id) {
    if (layerType === "singlePin") {
      return (
        <Mapbox.Animated.SymbolLayer
          id={id}
          iconAllowOverlap={true}
          iconIgnorePlacement={true}
          visibility={visibilityStatus.visible}
          style={[this.stylesheet.singleShow, { iconOpacity: 1 }]}
        />
      )
    } else {
      return (
        <>
          <Mapbox.Animated.SymbolLayer id="selectedPointCount" style={this.stylesheet.clusterCount} />
          <Mapbox.Animated.CircleLayer
            id="selectedClusteredPoints"
            // filter={["has", "point_count"]}
            style={[this.stylesheet.clusteredPoints]}
          />
        </>
      )
    }
  }

  render() {
    const { collections, filterID, layerType } = this.props
    // const { properties: selectedFeatureProperties } = collections
    console.log("TCL: ShapeLayer -> render -> collections", collections)

    return (
      <Mapbox.Animated.ShapeSource
        id="selectedShows"
        shape={collections}
        // buffer={512}
        // cluster
        // clusterRadius={50}
        onPress={this.props.onPress}
      >
        {this.getShapeLayer(layerType, filterID)}
      </Mapbox.Animated.ShapeSource>
    )
  }
}

export const SelectedPinsShapeLayer = Animated.createAnimatedComponent(SelectedShapeLayer)
