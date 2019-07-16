import { Box, Flex, Spinner, Theme } from "@artsy/palette"
import { Artwork_artwork } from "__generated__/Artwork_artwork.graphql"
import { ArtworkQuery } from "__generated__/ArtworkQuery.graphql"
import Separator from "lib/Components/Separator"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { SafeAreaInsets } from "lib/types/SafeAreaInsets"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"
import React from "react"
import { FlatList } from "react-native"
import { createFragmentContainer, graphql, QueryRenderer, RelayProp } from "react-relay"
import { AboutArtistFragmentContainer as AboutArtist } from "./Components/AboutArtist"
import { AboutWorkFragmentContainer as AboutWork } from "./Components/AboutWork"
import { ArtworkDetailsFragmentContainer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkHeaderFragmentContainer as ArtworkHeader } from "./Components/ArtworkHeader"
import { ArtworkHistoryFragmentContainer as ArtworkHistory } from "./Components/ArtworkHistory"
import { CommercialInformationFragmentContainer as CommercialInformation } from "./Components/CommercialInformation"
import { OtherWorksRenderer as OtherWorks } from "./Components/OtherWorks"
import { PartnerCardFragmentContainer as PartnerCard } from "./Components/PartnerCard"

interface Props {
  artwork: Artwork_artwork
  safeAreaInsets: SafeAreaInsets
  relay: RelayProp
}

interface State {
  isLoading: boolean
}

export class Artwork extends React.Component<Props, State> {
  sections = []

  constructor(props: Props) {
    super(props)

    this.state = {
      isLoading: false,
    }

    this.renderSections()
  }

  shouldRenderDetails = () => {
    const {
      category,
      conditionDescription,
      signature,
      signatureInfo,
      certificateOfAuthenticity,
      framed,
      series,
      publisher,
      manufacturer,
      image_rights,
    } = this.props.artwork
    if (
      category ||
      conditionDescription ||
      signature ||
      signatureInfo ||
      certificateOfAuthenticity ||
      framed ||
      series ||
      publisher ||
      manufacturer ||
      image_rights
    ) {
      return true
    } else {
      return false
    }
  }

  shouldRenderPartner = () => {
    const { partner, sale } = this.props.artwork
    if ((sale && sale.isBenefit) || (sale && sale.isGalleryAuction)) {
      return false
    } else if (partner && partner.type && partner.type !== "Auction House") {
      return true
    } else {
      return false
    }
  }

  renderSections = () => {
    const { artwork } = this.props
    const {
      artist: { biography_blurb },
    } = artwork

    this.sections.push("header")
    this.sections.push("commercialInformation")

    if (artwork.description || artwork.additional_information) {
      this.sections.push("aboutWork")
    }

    if (this.shouldRenderDetails()) {
      this.sections.push("details")
    }

    if (artwork.provenance || artwork.exhibition_history || artwork.literature) {
      this.sections.push("history")
    }

    if (biography_blurb) {
      this.sections.push("aboutArtist")
    }

    if (this.shouldRenderPartner()) {
      this.sections.push("partnerCard")
    }
  }

  renderItem = ({ item: section }) => {
    const { artwork } = this.props
    switch (section) {
      case "header":
        return <ArtworkHeader artwork={artwork} />
      case "commercialInformation":
        return <CommercialInformation artwork={artwork} />
      case "aboutWork":
        return <AboutWork artwork={artwork} />
      case "details":
        return <ArtworkDetails artwork={artwork} />
      case "history":
        return <ArtworkHistory artwork={artwork} />
      case "aboutArtist":
        return <AboutArtist artwork={artwork} />
      case "partnerCard":
        return <PartnerCard artwork={artwork} />
      case "otherWorks":
        return <OtherWorks artworkID={artwork.internalID} />
      default:
        return null
    }
  }

  loadOtherWorks = () => {
    if (!this.sections.includes("otherWorks")) {
      this.sections.push("otherWorks")
    }
  }

  render() {
    return (
      <Theme>
        <Box pt={this.props.safeAreaInsets && this.props.safeAreaInsets.top}>
          <FlatList
            data={this.sections}
            onEndReached={this.loadOtherWorks}
            onEndReachedThreshold={0.2}
            ItemSeparatorComponent={() => (
              <Box px={2} mx={2} my={3}>
                <Separator />
              </Box>
            )}
            keyExtractor={(item, index) => item.type + String(index)}
            renderItem={item =>
              item.item === "header" ? this.renderItem(item) : <Box px={2}>{this.renderItem(item)}</Box>
            }
            ListFooterComponent={
              this.state.isLoading ? (
                <Flex alignItems="center" justifyContent="center" flexGrow={1} mb={3}>
                  <Spinner />
                </Flex>
              ) : null
            }
          />
        </Box>
      </Theme>
    )
  }
}

export const ArtworkContainer = createFragmentContainer(Artwork, {
  artwork: graphql`
    fragment Artwork_artwork on Artwork {
      additional_information
      description
      provenance
      exhibition_history
      literature

      internalID

      partner {
        type
      }

      artist {
        name
        biography_blurb {
          text
        }
      }

      # Partner Card
      sale {
        isBenefit
        isGalleryAuction
      }

      # Details
      category
      conditionDescription {
        details
      }
      signature
      signatureInfo {
        details
      }
      certificateOfAuthenticity {
        details
      }
      framed {
        details
      }
      series
      publisher
      manufacturer
      image_rights

      ...PartnerCard_artwork
      ...AboutWork_artwork
      ...AboutArtist_artwork
      ...ArtworkDetails_artwork
      ...ArtworkHeader_artwork
      ...CommercialInformation_artwork
      ...ArtworkHistory_artwork
    }
  `,
})

export const ArtworkRenderer: React.SFC<{ artworkID: string; safeAreaInsets: SafeAreaInsets }> = ({
  artworkID,
  ...others
}) => {
  return (
    <QueryRenderer<ArtworkQuery>
      environment={defaultEnvironment}
      query={graphql`
        query ArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Artwork_artwork
          }
        }
      `}
      variables={{
        artworkID,
      }}
      render={renderWithLoadProgress(ArtworkContainer, others)}
    />
  )
}
