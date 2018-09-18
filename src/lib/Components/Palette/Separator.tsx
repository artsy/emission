// @ts-ignore
import React from "react"

import { color } from "@artsy/palette"
import styled from "styled-components/native"
import { space, SpaceProps, width, WidthProps } from "styled-system"

interface SeparatorProps extends SpaceProps, WidthProps {}

export const Separator = styled.View.attrs<SeparatorProps>({})`
  border: 1px solid ${color("black10")};
  border-bottom-width: 0;
  ${space};
  ${width};
`

Separator.defaultProps = {
  width: "100%",
}
