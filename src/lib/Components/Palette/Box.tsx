import { color, space } from "@artsy/palette"
// @ts-ignore
import React from "react"
// import { media } from "styled-bootstrap-grid"
import styled from "styled-components/native"
import {
  background,
  BackgroundProps,
  bottom,
  BottomProps,
  color as styledColor,
  ColorProps,
  display,
  DisplayProps,
  height,
  HeightProps,
  left,
  LeftProps,
  maxWidth,
  MaxWidthProps,
  position,
  PositionProps,
  right,
  RightProps,
  space as styledSpace,
  SpaceProps,
  textAlign,
  TextAlignProps,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from "styled-system"
import { Flex, FlexProps } from "./Flex"

export interface BorderBoxProps extends BackgroundProps, FlexProps, HeightProps, MaxWidthProps, SpaceProps, WidthProps {
  hover?: boolean
}

export const BorderBox = styled(Flex).attrs<BorderBoxProps>({})`
  border: 1px solid ${color("black10")};
  border-radius: 2px;
  padding: ${space(2)}px;
  ${background};
  ${height};
  ${maxWidth};
  ${styledSpace};
  ${width};
`

// export const StackableBorderBox = styled(BorderBox)`
//   :not(:first-child) {
//     border-top-left-radius: 0;
//     border-top-right-radius: 0;
//   }
//   :not(:last-child) {
//     border-bottom: 0;
//     border-bottom-left-radius: 0;
//     border-bottom-right-radius: 0;
//   }

//   ${media.sm`
//     padding: ${space(3)}px;
//     ${styledSpace};
//   `};
// `

export interface BoxProps
  extends BackgroundProps,
    BottomProps,
    BottomProps,
    ColorProps,
    DisplayProps,
    HeightProps,
    LeftProps,
    LeftProps,
    MaxWidthProps,
    PositionProps,
    PositionProps,
    RightProps,
    SpaceProps,
    TextAlignProps,
    TopProps,
    WidthProps,
    ZIndexProps {}

export const Box = styled.View.attrs<BoxProps>({})`
  ${background};
  ${bottom};
  ${display};
  ${height};
  ${left};
  ${maxWidth};
  ${position};
  ${right};
  ${styledColor};
  ${styledSpace};
  ${textAlign};
  ${top};
  ${width};
  ${zIndex};
`
