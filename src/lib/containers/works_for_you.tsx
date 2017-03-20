import * as React from "react"
import { ListView, ListViewDataSource, ScrollView, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import * as Relay from "react-relay"

import Headline from "../components/text/headline"
import SerifText from "../components/text/serif"
import Notification from "../components/works_for_you/notification"
import { LayoutEvent } from "../system/events"

import colors from "../../data/colors"

interface Props extends RelayProps {}

interface State {
  dataSource: ListViewDataSource | null
  sideMargin: number
  topMargin: number
}

export class WorksForYou extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    const edges = props.me.notifications_connection.edges
    const dataSource = edges.length && new ListView.DataSource({
                                      rowHasChanged: (row1, row2) => row1 !== row2,
                                    }).cloneWithRows(edges.map((edge) => edge.node))

    this.state = {
      dataSource,
      sideMargin: 20,
      topMargin: 0,
    }
  }

  onLayout = (event: LayoutEvent) => {
    const layout = event.nativeEvent.layout
    const sideMargin = layout.width > 600 ? 40 : 20
    const topMargin = layout.width > 600 ? 20 : 0

    this.setState({ sideMargin, topMargin })
  }

  render() {
    const margin = this.state.sideMargin
    const containerMargins = { marginLeft: margin, marginRight: margin }
    const hasNotifications = this.state.dataSource

    /* if showing the empty state, the ScrollView should have a {flex: 1} style so it can expand to fit the screen.
       otherwise, it should not use any flex growth.
    */
    return (
      <ScrollView contentContainerStyle={ hasNotifications ? {} : styles.container} onLayout={this.onLayout.bind(this)}>
        <SerifText style={[styles.title, containerMargins]}>Works by Artists you Follow</SerifText>
        <View style={[containerMargins, {flex: 1}]}>
          { hasNotifications ? this.renderNotifications() : this.renderEmptyState() }
        </View>
      </ScrollView>
    )
  }

  renderNotifications() {
    return(
      <ListView dataSource={this.state.dataSource}
                renderRow={(notification) => <Notification notification={notification}/>}
                renderSeparator={(sectionID, rowID) =>
                  <View key={`${sectionID}-${rowID}`} style={styles.separator} /> as React.ReactElement<{}>
                }
                style={{marginTop: this.state.topMargin}}
      />)
  }

  renderEmptyState() {
    const border = <View style={{height: 1, backgroundColor: "black"}}/>
    const text = "Follow artists to get updates about new works that become available."
    return (
      <View style={styles.emptyStateContainer}>
        <View style={{paddingBottom: 60}}>
        { border }
        <View style={styles.emptyStateText}>
          <SerifText style={styles.emptyStateMainLabel}>You’re not following any artists yet</SerifText>
          <SerifText style={styles.emptyStateSubLabel} numberOfLines={2}>{ text }</SerifText>
        </View>
        { border }
        </View>
      </View>
    )
  }
}

interface Styles {
  container: ViewStyle,
  title: TextStyle,
  emptyStateContainer: ViewStyle,
  emptyStateText: ViewStyle,
  emptyStateMainLabel: TextStyle,
  emptyStateSubLabel: TextStyle,
  separator: ViewStyle,
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: "center",
  },
  emptyStateMainLabel: {
    fontSize: 20,
  },
  emptyStateSubLabel: {
    textAlign: "center",
    fontSize: 16,
    color: colors["gray-semibold"],
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors["gray-regular"],
  },
})

export default Relay.createContainer(WorksForYou, {
  fragments: {
    me: () => Relay.QL`
      fragment on Me {
        notifications_connection(first: 10) {
          edges {
            node {
              ${Notification.getFragment("notification")}
            }
          }
        }
      }`,
  },
})

interface RelayProps {
  me: {
    notifications_connection: {
      edges: Array<{
        node: any | null,
      }>,
    },
  },
}
