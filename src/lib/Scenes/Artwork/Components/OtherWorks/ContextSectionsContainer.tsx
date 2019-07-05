import { Box, Join, Separator } from "@artsy/palette"
import React from "react"

export const ContextSectionsContainer: React.SFC = props => {
  const { children } = props

  return (
    <Join
      separator={
        <Box my={3}>
          <Separator />
        </Box>
      }
    >
      {children}
    </Join>
  )
}
