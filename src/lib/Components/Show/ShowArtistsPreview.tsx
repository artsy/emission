import { Serif, Spacer } from "@artsy/palette"
import { ShowArtistsPreview_show } from "__generated__/ShowArtistsPreview_show.graphql"
import { ArtistListItemContainer as ArtistListItem } from "lib/Components/ArtistListItem"
import { CaretButton } from "lib/Components/Buttons/CaretButton"
import Switchboard from "lib/NativeModules/SwitchBoard"
import { get, take } from "lodash"
import React from "react"
import { TouchableOpacity } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  show: ShowArtistsPreview_show
  onViewAllArtistsPressed: () => void
  Component: any
}

export const ShowArtistsPreview: React.SFC<Props> = ({ show, onViewAllArtistsPressed, Component }) => {
  const artistsShown = 5
  const artists = get(show, "artists", [])
  const items: ShowArtistsPreview_show["artists"] = take(artists, artistsShown)

  return (
    <>
      <Serif size="5">Artists</Serif>
      <Spacer m={1} />
      {items.map((artist, idx, arr) => {
        return (
          <React.Fragment key={artist.id}>
            <TouchableOpacity onPress={() => Switchboard.presentNavigationViewController(Component, artist.href)}>
              <ArtistListItem artist={artist} Component={Component} />
            </TouchableOpacity>
            {idx < arr.length - 1 && <Spacer m={1} />}
          </React.Fragment>
        )
      })}
      {artists.length > artistsShown && (
        <>
          <Spacer m={1} />
          <CaretButton text={`View all ${artists.length} artists`} onPress={() => onViewAllArtistsPressed()} />
        </>
      )}
    </>
  )
}

export const ShowArtistsPreviewContainer = createFragmentContainer(
  ShowArtistsPreview,
  graphql`
    fragment ShowArtistsPreview_show on Show {
      artists {
        id
        href
        ...ArtistListItem_artist
      }
    }
  `
)
