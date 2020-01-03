import { Sans, Spacer } from "@artsy/palette"
import { CommercialPartnerInformation_artwork } from "__generated__/CommercialPartnerInformation_artwork.graphql"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import React from "react"
import { Text } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  artwork: CommercialPartnerInformation_artwork
}

export class CommercialPartnerInformation extends React.Component<Props> {
  handleTap(href) {
    SwitchBoard.presentNavigationViewController(this, href)
  }
  render() {
    const { artwork } = this.props
    const artworkIsSold = artwork.availability && artwork.availability === "sold"
    const artworkEcommerceAvailable = artwork.isAcquireable || artwork.isOfferable
    const showsSellerInfo = artwork.partner && artwork.partner.name
    const availabilityDisplayText = artwork.isForSale || artworkIsSold ? "Sold by" : "At"
    return (
      <>
        {showsSellerInfo && (
          <>
            <Spacer mb={1} />
            <Sans size="3t" color="black60">
              {artwork.sale ? (
                <Text style={{ textDecorationLine: "underline" }} onPress={() => this.handleTap(artwork.sale.href)}>
                  {artwork.sale.name}
                </Text>
              ) : (
                <Text>
                  {availabilityDisplayText} {artwork.partner.name}
                </Text>
              )}
            </Sans>
            {artworkEcommerceAvailable && !!artwork.shippingOrigin && (
              <Sans size="3t" color="black60">
                Ships from {artwork.shippingOrigin}
              </Sans>
            )}
            {artworkEcommerceAvailable && !!artwork.shippingInfo && (
              <Sans size="3t" color="black60">
                {artwork.shippingInfo}
              </Sans>
            )}
            {artworkEcommerceAvailable && !!artwork.priceIncludesTaxDisplay && (
              <Sans size="3t" color="black60">
                {artwork.priceIncludesTaxDisplay}
              </Sans>
            )}
          </>
        )}
      </>
    )
  }
}

export const CommercialPartnerInformationFragmentContainer = createFragmentContainer(CommercialPartnerInformation, {
  artwork: graphql`
    fragment CommercialPartnerInformation_artwork on Artwork {
      availability
      isAcquireable
      isForSale
      isOfferable
      shippingOrigin
      shippingInfo
      priceIncludesTaxDisplay
      partner {
        name
      }
      sale {
        name
        href
      }
    }
  `,
})
