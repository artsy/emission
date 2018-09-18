import React from "react"
import { HeightProps, SpaceProps, WidthProps } from "styled-system"
import { Box } from "./Box"

export interface SpacerProps extends SpaceProps, WidthProps, HeightProps {}
export const Spacer: React.SFC<SpacerProps & { id?: string }> = props => {
  return <Box {...props} />
}
