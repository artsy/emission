import React from "react"
import "react-native"
import * as renderer from "react-test-renderer"

import { ConfirmFirstTimeBid } from "../ConfirmFirstTimeBid"

it("renders properly", () => {
  const saleArtwork = {
    artwork: {
      title: "Meteor Shower",
      date: "2015",
      artist_names: "Makiko Kudo",
      id: "makiko-kudo-meteor-shower",
    },
    lot_label: "538",
    sale: {
      id: "best art sale in town",
      live_start_at: "2018-06-11T01:00:00+00:00",
      end_at: null,
    },
  }
  const bg = renderer
    .create(<ConfirmFirstTimeBid sale_artwork={saleArtwork} bid={{ cents: 450000, display: "$45,000" }} />)
    .toJSON()
  expect(bg).toMatchSnapshot()
})
