import * as React from "react"
import * as Relay from "react-relay"

import {
  FlatList,
  LayoutChangeEvent,
  NativeModules,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
const { ARTemporaryAPIModule, ARWorksForYouModule } = NativeModules

import Events from "../native_modules/events"

import Headline from "../components/text/headline"
import SerifText from "../components/text/serif"
import Notification from "../components/works_for_you/notification"

import colors from "../../data/colors"

const PageSize = 10
const PageEndThreshold = 1000

interface Props extends RelayProps {
  relay: any;
}

interface State {
  sideMargin: number
  topMargin: number
  fetchingNextPage: boolean
  completed: boolean
}

export class WorksForYou extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      sideMargin: 20,
      topMargin: 0,
      completed: false,
      fetchingNextPage: false,
    }
  }

  componentDidMount() {
    const notifications = this.props.me.notifications_connection.edges.map((edge) => edge.node)

    // update status in gravity
    NativeModules.ARTemporaryAPIModule.markNotificationsRead((error) => {
      if (error) {
        console.error(error)
      } else {
        Events.postEvent(this, {
          name: "Notifications read",
          source_screen: "works for you page",
        })
      }
    })

    // update anything in Eigen that relies on notification count
    NativeModules.ARWorksForYouModule.updateNotificationsCount(0)
  }

  onLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout
    const sideMargin = layout.width > 600 ? 40 : 20
    const topMargin = layout.width > 600 ? 20 : 0

    this.setState({ sideMargin, topMargin })
  }

  fetchNextPage() {
    if (this.state.fetchingNextPage || this.state.completed) {
      return
    }
    this.setState({ fetchingNextPage: true })
    this.props.relay.setVariables({
      totalSize: this.props.relay.variables.totalSize + PageSize,
    }, (readyState) => {
      if (readyState.done) {
        this.setState({
          fetchingNextPage: false,
        })
        if (!this.props.me.notifications_connection.pageInfo.hasNextPage) {
          this.setState({ completed: true })
        }
      }
    })
  }

  render() {
    const margin = this.state.sideMargin
    const containerMargins = { marginLeft: margin, marginRight: margin }
    const hasNotifications = this.props.me.notifications_connection.edges.length > 0

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
    const notifications = this.props.me.notifications_connection.edges.map((edge, index) => {
      return { key: "notification-" + index, node: edge.node }
    })

    return (
      <FlatList
        data={notifications}
        renderItem={({item}) => <Notification notification={item.node}/>}
        onEndReached={() => this.fetchNextPage()}
      />
    )
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
  initialVariables: {
    totalSize: PageSize,
  },
  fragments: {
    me: () => Relay.QL`
      fragment on Me {
        notifications_connection(first: $totalSize) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              __id
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
      pageInfo: {
        hasNextPage: boolean,
      },
      edges: Array<{
        node: any | null,
      }>,
    },
  },
}
