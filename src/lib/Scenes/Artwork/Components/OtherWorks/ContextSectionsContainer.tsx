import { Box, Join, Separator } from "@artsy/palette"
import React from "react"

export const ContextSectionsContainer: React.SFC = props => {
  const { children } = props

  React.Children.map(children, child => {
    console.log("CHILD", child)
    return child
  })

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
