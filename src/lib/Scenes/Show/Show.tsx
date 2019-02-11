import { Theme } from "@artsy/palette"
import React from "react"
import { NavigatorIOS, ViewProperties } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

import { ShowArtistsContainer as ShowArtistsScreen } from "lib/Components/Show/ShowArtists"
import { ShowArtworksContainer as ShowArtworksScreen } from "lib/Components/Show/ShowArtworks"
import { DetailContainer as DetailScreen } from "./Screens/Detail"
import { MoreInfoContainer as MoreInfoScreen } from "./Screens/MoreInfo"

import { Show_show } from "__generated__/Show_show.graphql"

interface Props extends ViewProperties {
  show: Show_show
}

export class Show extends React.Component<Props> {
  navigator?: NavigatorIOS

  handleMoreInformationPressed = () => {
    if (!this.navigator) {
      throw new Error("navigator is undefined")
    }

    this.navigator.push({
      component: MoreInfoScreen,
      title: "",
      passProps: this.props,
    })
  }

  handleViewAllArtists = () => {
    if (!this.navigator) {
      throw new Error("navigator is undefined")
    }

    this.navigator.push({
      component: ShowArtistsScreen,
      title: "",
      passProps: this.props,
    })
  }

  handleViewAllArtworksPressed = () => {
    if (!this.navigator) {
      throw new Error("navigator is undefined")
    }

    this.navigator.push({
      component: ShowArtworksScreen,
      title: "",
      passProps: this.props,
    })
  }

  render() {
    return (
      <Theme>
        <NavigatorIOS
          ref={ref => {
            this.navigator = ref as any
          }}
          navigationBarHidden={true}
          initialRoute={{
            component: DetailScreen,
            title: "",
            passProps: {
              ...this.props,
              onMoreInformationPressed: this.handleMoreInformationPressed,
              onViewAllArtistsPressed: this.handleViewAllArtists,
              onViewAllArtworksPressed: this.handleViewAllArtworksPressed,
            },
          }}
          style={{ flex: 1 }}
        />
      </Theme>
    )
  }
}

export const ShowContainer = createFragmentContainer(
  Show,
  graphql`
    fragment Show_show on Show {
      ...Detail_show
      ...MoreInfo_show
      ...ShowArtists_show
      ...ShowArtworks_show
    }
  `
)
