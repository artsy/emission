import { Box, Flex, Sans } from "@artsy/palette"
import { AboutArtist_artwork } from "__generated__/AboutArtist_artwork.graphql"
import { ArtistListItemContainer as ArtistListItem } from "lib/Components/ArtistListItem"
import { ReadMore } from "lib/Components/ReadMore"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface AboutArtistProps {
  artwork: AboutArtist_artwork
}

export class AboutArtist extends React.Component<AboutArtistProps> {
  render() {
    const {
      artwork: { artists },
    } = this.props
    const hasSingleArtist = artists && artists.length === 1
    const text =
      hasSingleArtist && artists[0].biography_blurb && artists[0].biography_blurb.text
        ? artists[0].biography_blurb.text
        : null

    return (
      <>
        <Flex alignItems="flex-start">
          <Sans size="3t" weight="medium" mb={2}>
            {hasSingleArtist ? "About the artist" : "About the artists"}
          </Sans>
          {artists.map(artist => (
            <ArtistListItem key={artist.id} artist={artist} />
          ))}
        </Flex>
        {hasSingleArtist &&
          text && (
            <Box mt={2}>
              <ReadMore content={text} maxChars={140} />
            </Box>
          )}
      </>
    )
  }
}

export const AboutArtistFragmentContainer = createFragmentContainer(AboutArtist, {
  artwork: graphql`
    fragment AboutArtist_artwork on Artwork {
      artists {
        id
        biography_blurb {
          text
        }
        ...ArtistListItem_artist
      }
    }
  `,
})
