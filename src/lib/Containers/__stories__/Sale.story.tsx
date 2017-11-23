import { storiesOf } from "@storybook/react-native"
import { SaleRenderer } from "lib/relay/QueryRenderers"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"
import React from "react"
import Sale from "../Sale"

storiesOf("Sale/Relay").add("Rago", () => {
  return <SaleRenderer saleID="rago-auctions-curiouser-and-curiouser" render={renderWithLoadProgress(Sale)} />
})
