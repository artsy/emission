import { Box, color, Flex, Sans } from "@artsy/palette"
import PinSavedOff from "lib/Icons/PinSavedOff"
import React, { Component } from "react"
import styled from "styled-components/native"

export class HasNoSaves extends Component<any> {
  render() {
    return (
      <Box mx={2} mb={2}>
        <SavedBox p={1}>
          <Flex flexDirection="row" alignItems="center">
            <PinSavedOff width={30} height={30} />
            <Flex ml={24}>
              <Sans size="3t" color="black60" weight="medium">
                No saved events
              </Sans>
              <Sans size="3t" color="black60">
                Save a show to find it later
              </Sans>
            </Flex>
          </Flex>
        </SavedBox>
      </Box>
    )
  }
}

const SavedBox = styled(Box)`
  border-radius: 2px;
  border-width: 1px;
  border-color: ${color("black30")};
`
