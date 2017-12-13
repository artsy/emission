import React, { Component } from "react"
import { Dimensions, FlatList, View } from "react-native"

import { SaleListItem } from "./SaleListItem"
import { SectionHeader } from "./SectionHeader"

export class SaleList extends Component<any> {
  render() {
    const numColumns = Dimensions.get("window").width > 700 ? 4 : 2

    return (
      <View>
        <SectionHeader title={this.props.section.title} />
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-between",
            padding: 5,
            display: "flex",
          }}
          data={this.props.item.data}
          numColumns={numColumns}
          // keyExtractor={item => item.__id}
          // FIXME:
          keyExtractor={item => Math.random().toString()}
          renderItem={({ item, index }) => <SaleListItem key={index} sale={item} />}
        />
      </View>
    )
  }
}
