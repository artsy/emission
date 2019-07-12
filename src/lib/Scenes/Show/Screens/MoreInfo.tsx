import { Box, Sans, Separator, Serif, Spacer, Theme } from "@artsy/palette"
import { MoreInfo_show } from "__generated__/MoreInfo_show.graphql"
import { MoreInfoQuery } from "__generated__/MoreInfoQuery.graphql"
import { CaretButton } from "lib/Components/Buttons/CaretButton"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { Schema, screenTrack, track } from "lib/utils/track"
import React from "react"
import { FlatList, Linking, ViewProperties } from "react-native"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components/native"
import renderWithLoadProgress from "../../../utils/renderWithLoadProgress"
import { ShowEventSectionContainer as ShowEventSection } from "../Components/ShowEventSection"
import { TextSection } from "../Components/TextSection"

const ListHeaderText = styled(Serif)`
  height: 36px;
`

interface Props extends ViewProperties {
  show: MoreInfo_show
}

interface State {
  sections: Array<{
    type: "event" | "pressRelease" | "galleryWebsite" | "pressReleaseUrl" | "receptionText"
    data: any
  }>
}
@screenTrack<Props>(props => ({
  context_screen: Schema.PageNames.AboutTheShowPage,
  context_screen_owner_type: Schema.OwnerEntityTypes.Show,
  context_screen_owner_slug: props.show.slug,
  context_screen_owner_id: props.show.internalID,
}))
export class MoreInfo extends React.Component<Props, State> {
  state = {
    sections: [],
  }

  componentDidMount() {
    const { show } = this.props

    const sections = []

    show.events.forEach(event => {
      sections.push({
        type: "event",
        data: { event },
      })
    })

    if (show.openingReceptionText) {
      sections.push({
        type: "receptionText",
        data: show.openingReceptionText,
      })
    }

    if (show.press_release) {
      sections.push({
        type: "pressRelease",
        data: show,
      })
    }

    if (show.pressReleaseUrl) {
      sections.push({
        type: "pressReleaseUrl",
        data: show,
      })
    }

    if (show.partner.website) {
      sections.push({
        type: "galleryWebsite",
        data: show,
      })
    }

    this.setState({ sections })
  }

  renderItemSeparator = () => (
    <Box py={3} px={2}>
      <Separator />
    </Box>
  )

  @track(props => ({
    action_name: Schema.ActionNames.GallerySite,
    action_type: Schema.ActionTypes.Tap,
    owner_id: props.show.internalID,
    owner_slug: props.show.id,
    owner_type: Schema.OwnerEntityTypes.Show,
  }))
  renderGalleryWebsite(url) {
    Linking.openURL(url).catch(err => console.error("An error occurred opening gallery link", err))
  }

  openPressReleaseLink = () => {
    SwitchBoard.presentNavigationViewController(this, this.props.show.pressReleaseUrl)
  }

  renderItem = ({ item: { data, type } }) => {
    switch (type) {
      case "galleryWebsite":
        return (
          <CaretButton
            onPress={() => this.renderGalleryWebsite(data.partner.website)}
            text={data.partner.type === "Gallery" ? "Visit gallery site" : "Visit institution site"}
          />
        )
      case "pressReleaseUrl":
        return <CaretButton onPress={() => this.openPressReleaseLink()} text="View press release" />
      case "receptionText":
        return (
          <>
            <Box mb={2}>
              <Sans size="3t" weight="medium">
                Opening reception
              </Sans>
            </Box>
            <Sans size="3t">{data}</Sans>
          </>
        )
      case "event":
        return <ShowEventSection {...data} />
      case "pressRelease":
        return <TextSection title="Press Release" text={data.press_release} />
    }
  }

  render() {
    return (
      <Theme>
        <FlatList
          data={this.state.sections}
          ListHeaderComponent={
            <>
              <ListHeaderText size="8" mt={12} px={2}>
                About the show
              </ListHeaderText>
              {this.renderItemSeparator()}
            </>
          }
          ListFooterComponent={<Spacer pb={4} />}
          ItemSeparatorComponent={this.renderItemSeparator}
          renderItem={item => <Box px={2}>{this.renderItem(item)}</Box>}
          keyExtractor={(item, index) => item.type + String(index)}
        />
      </Theme>
    )
  }
}

export const MoreInfoContainer = createFragmentContainer(MoreInfo, {
  show: graphql`
    fragment MoreInfo_show on Show {
      internalID
      slug
      exhibition_period
      pressReleaseUrl
      openingReceptionText
      partner {
        ... on Partner {
          website
          type
        }
      }
      press_release
      events {
        ...ShowEventSection_event
      }
    }
  `,
})

export const ShowMoreInfoRenderer: React.SFC<{ showID: string }> = ({ showID }) => {
  return (
    <QueryRenderer<MoreInfoQuery>
      environment={defaultEnvironment}
      query={graphql`
        query MoreInfoQuery($showID: String!) {
          show(id: $showID) {
            ...MoreInfo_show
          }
        }
      `}
      variables={{ showID }}
      render={renderWithLoadProgress(MoreInfoContainer)}
    />
  )
}
