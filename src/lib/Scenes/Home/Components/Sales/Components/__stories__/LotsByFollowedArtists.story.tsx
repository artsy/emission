import { storiesOf } from "@storybook/react-native"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"
import React from "react"
import { SalesRenderer } from "../../Relay/SalesRenderer"
import LotsByFollowedArtists from "../LotsByFollowedArtists"
import { ZeroState } from "../ZeroState"

storiesOf("Home/Relay/Auctions")
  .add("LotsByFollowedArtists", () => <SalesRenderer render={renderWithLoadProgress(LotsByFollowedArtists)} />)
  .add("Zero State for Auctions", () => <ZeroState />)
