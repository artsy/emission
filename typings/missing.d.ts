declare module "enzyme-adapter-react-16" {
  export default class Adapter {}
}

declare module "relay-mock-network-layer" {
  import { GraphQLFieldResolver } from "graphql"
  import { IMocks } from "graphql-tools/dist/Interfaces"
  import { FetchFunction } from "relay-runtime"
  export default function getNetworkLayer(options: {
    schema: string
    mocks?: IMocks
    resolvers?: any
    resolveQueryFromOperation: (params: { id: string }) => string
    fieldResolver?: GraphQLFieldResolver<any, any>
  }): FetchFunction
}

declare module "react-spring/dist/native.cjs.js" {

}

declare module "@mapbox/react-native-mapbox-gl" {
  const Mapbox: any
  export default Mapbox
}

declare module "react-relay-network-modern/node8" {

}

declare module "react-native-parallax-scroll-view" {
  import React from "react"
  const ParallaxScrollView: React.ComponentType<any>
  export default ParallaxScrollView
}

declare module "react-native/Libraries/Image/resolveAssetSource" {
  import { ImageResolvedAssetSource, ImageSourcePropType } from "react-native"
  export default function resolveAssetSource(source: ImageSourcePropType): ImageResolvedAssetSource
}

declare module "simple-markdown" {

}

declare module "react-native-hyperlink" {
  import React from "react"
  const Hyperlink: React.ComponentType<any>
  export default Hyperlink
}

declare module "tipsi-stripe" {

}
