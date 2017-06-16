import * as React from "react"

import ArtistSearch from "../Components/ArtistSearchResults"
import DoneButton from "../Components/BottomAlignedButton"
import { ConsignmentSetup } from "../index"

import { NavigatorIOS, Route, ScrollView, View, ViewProperties } from "react-native"

interface Props extends ConsignmentSetup {
  navigator: NavigatorIOS
  route: Route
}

export default class Artist extends React.Component<Props, null> {
  doneTapped = () => {
    // Update state
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <DoneButton onPress={this.doneTapped}>
          <View
            style={{ alignContent: "center", justifyContent: "center", flexGrow: 1, marginLeft: 20, marginRight: 20 }}
          >
            <ArtistSearch results={null} query={null} />
          </View>
        </DoneButton>
      </View>
    )
  }
}
