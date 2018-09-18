import { storiesOf } from "@storybook/react-native"
import React from "react"
import { Text, View } from "react-native"
import { BorderBox, Box } from "../Box"
import { Flex } from "../Flex"
import { Join } from "../Join"
import { Separator } from "../Separator"
import { Spacer } from "../Spacer"

storiesOf("Palette")
  .add("Box", () => (
    <View>
      <Box m={"100px"}>
        <Text>hello!</Text>
      </Box>
    </View>
  ))
  .add("BorderBox", () => (
    <View>
      <BorderBox m={"100px"}>
        <Text>hello!</Text>
      </BorderBox>
    </View>
  ))
  .add("Flex", () => (
    <View>
      <Flex justifyContent="center" width="100%" flexDirection="row">
        <Flex width="80%" flexDirection="row">
          <Box width="50%">
            <Text>A Flex component is a layout container for content that exposes props related flexbox.</Text>
          </Box>
          <Box width="50%">
            <Text>A Flex component is a layout container for content that exposes props related flexbox.</Text>
          </Box>
        </Flex>
      </Flex>
    </View>
  ))
  .add("Join", () => (
    <View>
      <Join separator={<Spacer mb={20} />}>
        <Text>Join!</Text>
        <Text>Items!</Text>
        <Text>Together!</Text>
      </Join>
    </View>
  ))
  .add("Separator", () => (
    <View>
      <Join separator={<Box mb={20} />}>
        <Separator />
        <Text>Some text</Text>
        <Separator />
        <Text>Some other text to separate</Text>
        <Separator />
      </Join>
    </View>
  ))
  .add("Spacer", () => (
    <View>
      <Join separator={<Box mb={20} />}>
        <Separator />
        <Text>A spacer component</Text>
        <Spacer my={3} />
        <Text>...spaces content.</Text>
        <Separator />
      </Join>
    </View>
  ))
