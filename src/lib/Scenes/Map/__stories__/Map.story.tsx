import { storiesOf } from "@storybook/react-native"
import React from "react"
import { MapRenderer } from ".."
import cities from "../../../../../data/cityDataSortedByDisplayPreference.json"

const stories = storiesOf("Map/Relay")

cities.forEach(city => {
  stories.add(city.name, () => (
    <MapRenderer
      citySlug={city.slug}
      safeAreaInsets={{ top: 20, bottom: 0, left: 0, right: 0 }}
      hideMapButtons
      userLocationWithinCity={false}
    />
  ))
})
