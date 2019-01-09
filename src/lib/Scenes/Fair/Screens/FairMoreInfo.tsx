import React from "react"
import { Text } from "react-native"
import { graphql, createFragmentContainer } from "react-relay"
import { FairMoreInfo_fair } from "__generated__/FairMoreInfo_fair.graphql"

interface Props {
  fair: FairMoreInfo_fair
}

export const FairMoreInfo: React.SFC<Props> = ({ fair }) => <Text>{JSON.stringify(fair)}</Text>

export const FairMoreInfoContainer = createFragmentContainer(
  FairMoreInfo,
  graphql`
    fragment FairMoreInfo_fair on Fair {
      links
      about
      tickets_link
    }
  `
)
