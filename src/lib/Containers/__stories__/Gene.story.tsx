import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { RootContainer } from "react-relay"

import Routes from "../../relay/routes"
import Gene from "../Gene"

const defaultRefineSettings = {
  medium: "*",
  price_range: "*-*",
}

storiesOf("Gene")
  .add("Contemporary Pop", () => {
    const geneRoute = new Routes.Gene({ geneID: "contemporary-pop", refineSettings: defaultRefineSettings })
    return <RootContainer Component={Gene} route={geneRoute} />
  })
  .add("Kawaii", () => {
    const geneRoute = new Routes.Gene({ geneID: "kawaii", refineSettings: defaultRefineSettings })
    return <RootContainer Component={Gene} route={geneRoute} />
  })
  .add("Popular Culture", () => {
    const geneRoute = new Routes.Gene({ geneID: "popular-culture", refineSettings: defaultRefineSettings })
    return <RootContainer Component={Gene} route={geneRoute} />
  })
  .add("Related to Film", () => {
    const geneRoute = new Routes.Gene({ geneID: "related-to-film", refineSettings: defaultRefineSettings })
    return <RootContainer Component={Gene} route={geneRoute} />
  })
