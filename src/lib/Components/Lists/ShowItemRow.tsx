import { Box, color, Flex, Sans, Serif, space } from "@artsy/palette"
import { ShowItemRow_show } from "__generated__/ShowItemRow_show.graphql"
import { ShowItemRowMutation } from "__generated__/ShowItemRowMutation.graphql"
import InvertedButton from "lib/Components/Buttons/InvertedButton"
import OpaqueImageView from "lib/Components/OpaqueImageView"
import colors from "lib/data/colors"
import { Pin } from "lib/Icons/Pin"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { hrefForPartialShow } from "lib/utils/router"
import { Schema, Track, track as _track } from "lib/utils/track"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay"
import styled from "styled-components/native"

interface Props {
  show: ShowItemRow_show
  relay?: RelayProp
  noPadding?: boolean
  onSaveStarted?: () => void
  onSaveEnded?: () => void
}

interface State {
  isFollowedSaving: boolean
}

const track: Track<Props, {}> = _track

@track()
export class ShowItemRow extends React.Component<Props, State> {
  state = {
    isFollowedSaving: false,
  }

  handleTap() {
    const href = hrefForPartialShow(this.props.show)
    SwitchBoard.presentNavigationViewController(this, href)
  }

  @track(props => {
    const {
      show: { id: slug, _id, is_followed },
    } = props
    return {
      action_name: is_followed ? Schema.ActionNames.UnsaveShow : Schema.ActionNames.SaveShow,
      owner_type: Schema.OwnerEntityTypes.Show,
      owner_id: _id,
      owner_slug: slug,
    } as any
  })
  handleSave() {
    const {
      show: { id: showSlug, __id: nodeID, _id: showID, is_followed: isShowFollowed },
    } = this.props

    if (showID && showSlug && nodeID && !this.state.isFollowedSaving) {
      if (this.props.onSaveStarted) {
        this.props.onSaveStarted()
      }

      this.setState(
        {
          isFollowedSaving: true,
        },
        () => {
          return commitMutation<ShowItemRowMutation>(this.props.relay.environment, {
            onCompleted: () => this.handleShowSuccessfullyUpdated(),
            mutation: graphql`
              mutation ShowItemRowMutation($input: FollowShowInput!) {
                followShow(input: $input) {
                  show {
                    id
                    _id
                    is_followed
                  }
                }
              }
            `,
            variables: {
              input: {
                partner_show_id: showID,
                unfollow: isShowFollowed,
              },
            },
            optimisticResponse: {
              followShow: {
                show: {
                  id: showSlug,
                  _id: showID,
                  is_followed: !isShowFollowed,
                },
              },
            },
            updater: store => {
              store.get(nodeID).setValue(!isShowFollowed, "is_followed")
            },
          })
        }
      )
    }
  }

  handleShowSuccessfullyUpdated() {
    if (this.props.onSaveEnded) {
      this.props.onSaveEnded()
    }

    this.setState({
      isFollowedSaving: false,
    })
  }

  render() {
    const { noPadding, show } = this.props
    const imageURL = show.cover_image && show.cover_image.url

    return (
      <TouchableWithoutFeedback onPress={this.handleTap.bind(this)}>
        <Box py={noPadding ? 0 : 2}>
          <Flex flexDirection="row">
            {!imageURL ? (
              <DefaultImageContainer p={15}>
                <Pin color={color("white100")} pinHeight={30} pinWidth={30} />
              </DefaultImageContainer>
            ) : (
              <OpaqueImageView width={58} height={58} imageURL={imageURL} />
            )}
            <Flex flexDirection="column" flexGrow={1} width={180}>
              {show.partner &&
                show.partner.name && (
                  <Sans size="3t" color="black" weight="medium" numberOfLines={1} ml={15}>
                    {show.partner.name}
                  </Sans>
                )}
              {show.name && (
                <TightendSerif size="3t" color={color("black60")} ml={15} numberOfLines={1}>
                  {show.name}
                </TightendSerif>
              )}
              {show.status &&
                show.exhibition_period && (
                  <Sans size="3t" color={color("black60")} ml={15}>
                    {show.status.includes("closed")
                      ? show.status.charAt(0).toUpperCase() + show.status.slice(1)
                      : show.exhibition_period}
                  </Sans>
                )}
            </Flex>
            <Flex flexDirection="row">
              <InvertedButton
                inProgress={this.state.isFollowedSaving}
                text={show.is_followed ? "Saved" : "Save"}
                selected={show.is_followed}
                onPress={() => this.handleSave()}
                noBackground={true}
              />
            </Flex>
          </Flex>
        </Box>
      </TouchableWithoutFeedback>
    )
  }
}
export const ShowItemRowContainer = createFragmentContainer(ShowItemRow, {
  show: graphql`
    fragment ShowItemRow_show on Show {
      id
      _id
      __id
      is_followed
      name
      partner {
        ... on Partner {
          name
        }
      }
      href
      exhibition_period
      status
      cover_image {
        url
        aspect_ratio
      }
      is_fair_booth
      start_at
      end_at
    }
  `,
})

const TightendSerif = styled(Serif)`
  top: 3;
`

const DefaultImageContainer = styled(Box)`
  align-items: center;
  background-color: ${colors["gray-regular"]};
  height: ${space(6)};
  width: ${space(6)};
`
