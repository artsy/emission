import { Box, Separator, Serif } from "@artsy/palette"
import { Detail_show } from "__generated__/Detail_show.graphql"
import { CaretButton } from "lib/Components/Buttons/CaretButton"
import { HoursCollapsible } from "lib/Components/HoursCollapsible"
import { LocationMapContainer as LocationMap } from "lib/Components/LocationMap"
import { ShowArtistsPreviewContainer as ShowArtistsPreview } from "lib/Components/Show/ShowArtistsPreview"
import { ShowArtworksPreviewContainer as ShowArtworksPreview } from "lib/Components/Show/ShowArtworksPreview"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { Schema, screenTrack, Track, track as _track } from "lib/utils/track"
import React from "react"
import { FlatList } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowHeaderContainer as ShowHeader } from "../Components/ShowHeader"
import { ShowsContainer as Shows } from "../Components/Shows"

interface Props {
  show: Detail_show
}

interface State {
  sections: Array<{
    type: "location" | "artworks" | "artists" | "shows"
    data: any
  }>
  extraData?: { animatedValue: { height: number } }
}

const track: Track<Props, State> = _track
@screenTrack<Props>(props => ({
  context_screen: Schema.PageNames.ShowPage,
  context_screen_owner_type: Schema.OwnerEntityTypes.Show,
  context_screen_owner_slug: props.show.slug,
  context_screen_owner_id: props.show.internalID,
}))
export class Detail extends React.Component<Props, State> {
  state: State = {
    sections: [],
  }

  componentDidMount() {
    const { show } = this.props
    const sections = []

    if (show.location) {
      sections.push({
        type: "location",
        data: {
          location: show.location,
          partnerName: show.partner.name,
          partnerType: show.partner.type,
        },
      })
    }

    if (show.description) {
      sections.push({
        type: "description",
        data: {
          description: show.description,
        },
      })
    }

    sections.push({
      type: "information",
      data: {
        onViewMoreInfoPressed: this.handleViewMoreInfoPressed.bind(this),
      },
    })

    if (show.location) {
      const { openingHours } = show.location
      if ((openingHours.text && openingHours.text !== "") || openingHours.schedules) {
        sections.push({
          type: "hours",
          data: openingHours,
        })
      }
    }

    if (show.counts && show.counts.artworks) {
      sections.push({
        type: "artworks",
        data: {
          show,
          onViewAllArtworksPressed: this.handleViewAllArtworksPressed.bind(this),
        },
      })
    }

    const hasArtsyArtists = show.counts && show.counts.artists
    const hasStubbedArtists = show.artists_without_artworks.length > 0
    if (hasStubbedArtists || hasArtsyArtists) {
      sections.push({
        type: "artists",
        data: {
          show,
          onViewAllArtistsPressed: this.handleViewAllArtistsPressed.bind(this),
          Component: this,
        },
      })
    }

    if (show.location) {
      sections.push({
        type: "shows",
        data: show,
      })
    }

    this.setState({ sections })
  }

  renderItemSeparator = item => {
    if (item && (item.leadingItem.type === "location" || item.leadingItem.type === "description")) {
      return null
    }
    return (
      <Box pb={2} px={2}>
        <Separator />
      </Box>
    )
  }

  handleViewAllArtistsPressed() {
    SwitchBoard.presentNavigationViewController(this, `/show/${this.props.show.slug}/artists`)
  }

  handleViewAllArtworksPressed() {
    SwitchBoard.presentNavigationViewController(this, `/show/${this.props.show.slug}/artworks`)
  }

  handleViewMoreInfoPressed() {
    SwitchBoard.presentNavigationViewController(this, `/show/${this.props.show.slug}/info`)
  }

  @track(eventProps(Schema.ActionNames.ToggleHours))
  handleHoursToggled() {
    return null
  }

  renderItem = ({ item: { data, type } }) => {
    switch (type) {
      case "location":
        return <LocationMap {...data} />
      case "description":
        return <Serif size="3t">{data.description}</Serif>
      case "artworks":
        return <ShowArtworksPreview title="Works" {...data} />
      case "artists":
        return <ShowArtistsPreview {...data} />
      case "shows":
        return <Shows show={data} />
      case "information":
        return <CaretButton onPress={() => data.onViewMoreInfoPressed()} text="View more information" />
      case "hours":
        return <HoursCollapsible openingHours={data} onToggle={() => this.handleHoursToggled()} />
      default:
        return null
    }
  }

  render() {
    const { show } = this.props
    const { extraData, sections } = this.state
    return (
      <Box pt={2}>
        <FlatList
          data={sections}
          extraData={extraData}
          ListHeaderComponent={<ShowHeader show={show} />}
          ItemSeparatorComponent={this.renderItemSeparator}
          renderItem={item => (
            <Box px={2} pb={2}>
              {this.renderItem(item)}
            </Box>
          )}
          keyExtractor={(item, index) => item.type + String(index)}
        />
      </Box>
    )
  }
}

function eventProps(actionName: Schema.ActionNames, actionType: Schema.ActionTypes = Schema.ActionTypes.Tap) {
  return props => ({
    action_name: actionName,
    action_type: actionType,
    owner_id: props.show.internalID,
    owner_slug: props.show.id,
    owner_type: Schema.OwnerEntityTypes.Show,
  })
}

export const DetailContainer = createFragmentContainer(Detail, {
  show: graphql`
    fragment Detail_show on Show {
      internalID
      slug
      name
      description
      city
      isStubShow
      images {
        internalID
      }
      ...ShowHeader_show
      ...ShowArtworksPreview_show
      ...ShowArtistsPreview_show
      ...Shows_show
      location {
        ...LocationMap_location
        openingHours {
          ... on OpeningHoursArray {
            schedules {
              days
              hours
            }
          }
          ... on OpeningHoursText {
            text
          }
        }
      }

      # These artists don't show up in artists count alas
      # and so we need to request them back here to verify if we
      # should show the artists section at all
      artists_without_artworks {
        slug
      }

      counts {
        artworks
        artists
      }
      status
      partner {
        ... on Partner {
          name
          type
        }
      }
    }
  `,
})
