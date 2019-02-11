import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import { ShowHeader_show } from "__generated__/ShowHeader_show.graphql"
import { ShowHeaderFollowShowMutation } from "__generated__/ShowHeaderFollowShowMutation.graphql"
import InvertedButton from "lib/Components/Buttons/InvertedButton"
import { EntityList } from "lib/Components/EntityList"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import React from "react"
import { Dimensions } from "react-native"
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay"
import styled from "styled-components/native"
import { Carousel } from "./Components/Carousel"

interface Props {
  show: ShowHeader_show
  onViewAllArtistsPressed: () => void
  relay: RelayProp
}

interface State {
  isFollowedSaving: boolean
}

const ButtonWrapper = styled(Box)`
  width: 100%;
  height: 85;
`

const { height: windowHeight } = Dimensions.get("window")

export class ShowHeader extends React.Component<Props, State> {
  state = { isFollowedSaving: false }

  handleFollowShow = () => {
    const {
      relay,
      show: { id, __id, is_followed },
    } = this.props

    this.setState(
      {
        isFollowedSaving: true,
      },
      () => {
        commitMutation<ShowHeaderFollowShowMutation>(relay.environment, {
          onCompleted: () => {
            this.setState({
              isFollowedSaving: false,
            })
          },
          mutation: graphql`
            mutation ShowHeaderFollowShowMutation($input: FollowShowInput!) {
              followShow(input: $input) {
                show {
                  __id
                  is_followed
                }
              }
            }
          `,
          variables: {
            input: {
              partner_show_id: id,
              unfollow: is_followed,
            },
          },
          optimisticResponse: {
            followShow: {
              show: {
                __id,
                is_followed: !is_followed,
              },
            },
          },
          updater: store => {
            store.get(__id).setValue(!is_followed, "is_followed")
          },
        })
      }
    )
  }

  render() {
    const { isFollowedSaving } = this.state
    const {
      show: { artists, images, is_followed, name, partner, exhibition_period },
      onViewAllArtistsPressed,
    } = this.props
    const hasImages = !!images.length
    const noImagesPadding = windowHeight / 2 - 200

    return (
      <>
        <Box px={2} pt={hasImages ? 3 : noImagesPadding} pb={hasImages ? 0 : noImagesPadding}>
          <Spacer m={2} />
          <Sans size="3" mb={0.5}>
            {partner.name}
          </Sans>
          <Serif size="8" lineHeight={34}>
            {name}
          </Serif>
          <Sans size="3">{exhibition_period}</Sans>
        </Box>
        {hasImages && (
          <Carousel
            sources={(images || []).map(({ url: imageURL, aspect_ratio: aspectRatio }) => ({ imageURL, aspectRatio }))}
          />
        )}
        <Box px={2}>
          <EntityList
            prefix="Works by"
            list={artists}
            count={artists.length}
            displayedItems={2}
            onItemSelected={url => {
              SwitchBoard.presentNavigationViewController(this, url)
            }}
            onViewAllPressed={onViewAllArtistsPressed}
          />
          <ButtonWrapper>
            <Spacer m={1} mt={1} />
            <InvertedButton
              inProgress={isFollowedSaving}
              text={is_followed ? "Show saved" : "Save show"}
              selected={is_followed}
              onPress={this.handleFollowShow}
              grayBorder={true}
            />
            <Spacer m={1} />
          </ButtonWrapper>
        </Box>
      </>
    )
  }
}

export const ShowHeaderContainer = createFragmentContainer(
  ShowHeader,
  graphql`
    fragment ShowHeader_show on Show {
      id
      __id
      name
      press_release
      is_followed
      exhibition_period
      status
      partner {
        ... on Partner {
          name
        }
        ... on ExternalPartner {
          name
        }
      }
      images {
        url
        aspect_ratio
      }
      artists {
        name
        href
      }
    }
  `
)
