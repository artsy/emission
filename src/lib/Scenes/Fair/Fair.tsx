import { Theme } from "@artsy/palette"
import React from "react"
import { NavigatorIOS, ViewProperties } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

import { ShowArtistsContainer as ShowArtistsScreen } from "lib/Components/Show/ShowArtists"
import { ShowArtworksContainer as ShowArtworksScreen } from "lib/Components/Show/ShowArtworks"
import { FairArtistsContainer as FairArtistsScreen } from "./Screens/FairArtists"
import { FairArtworksContainer as FairArtworksScreen } from "./Screens/FairArtworks"
import { FairBoothContainer as FairBoothScreen } from "./Screens/FairBooth"
import { FairDetailContainer as FairDetailScreen } from "./Screens/FairDetail"
import { FairExhibitorsContainer as FairExhibitorsScreen } from "./Screens/FairExhibitors"
import { FairMoreInfoContainer as FairMoreInfoScreen } from "./Screens/FairMoreInfo"

import { Fair_fair } from "__generated__/Fair_fair.graphql"

interface Props extends ViewProperties {
  fair: Fair_fair
}

export class Fair extends React.Component<Props> {
  navigator?: NavigatorIOS

  navigate = ({ component, props }: { component: any; props?: object }) => {
    if (!this.navigator) {
      throw new Error("navigator is undefined")
    }
    this.navigator.push({
      component,
      passProps: {
        ...this.props,
        onViewAllExhibitorsPressed: this.handleViewAllExhibitorsPressed,
        onViewAllArtworksPressed: this.handleViewAllArtworksPressed,
        onViewAllArtistsPressed: this.handleViewAllArtistsPressed,
        onViewFairBoothPressed: this.handleViewFairBoothPressed,
        onViewFairBoothArtworksPressed: this.handleViewFairBoothArtworksPressed,
        onViewFairBoothArtistsPressed: this.handleViewFairBoothArtistsPressed,
        ...(props || {}),
      },
      title: "",
    })
  }

  handleViewAllExhibitorsPressed = () => {
    this.navigate({ component: FairExhibitorsScreen })
  }

  handleViewAllArtworksPressed = () => {
    this.navigate({ component: FairArtworksScreen })
  }

  handleViewAllArtistsPressed = () => {
    this.navigate({ component: FairArtistsScreen })
  }

  handleViewFairBoothPressed = props => {
    this.navigate({ component: FairBoothScreen, props })
  }

  handleViewFairBoothArtistsPressed = props => {
    this.navigate({ component: ShowArtistsScreen, props })
  }

  handleViewFairBoothArtworksPressed = props => {
    this.navigate({ component: ShowArtworksScreen, props })
  }

  handleViewMoreInfoPressed = () => {
    this.navigate({
      component: FairMoreInfoScreen,
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
            component: FairDetailScreen,
            title: "",
            passProps: {
              ...this.props,
              onViewAllExhibitorsPressed: this.handleViewAllExhibitorsPressed,
              onViewAllArtworksPressed: this.handleViewAllArtworksPressed,
              onViewAllArtistsPressed: this.handleViewAllArtistsPressed,
              onViewFairBoothPressed: this.handleViewFairBoothPressed,
              onViewMoreInfoPressed: this.handleViewMoreInfoPressed,
            },
          }}
          style={{ flex: 1 }}
        />
      </Theme>
    )
  }
}

export const FairContainer = createFragmentContainer(
  Fair,
  graphql`
    fragment Fair_fair on Fair {
      ...FairDetail_fair
      ...FairExhibitors_fair
      ...FairArtists_fair
      ...FairArtworks_fair
      ...FairMoreInfo_fair
    }
  `
)
