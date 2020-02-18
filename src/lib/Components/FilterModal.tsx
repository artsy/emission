import { ArrowRightIcon, Box, Button, CloseIcon, color, Flex, Sans, Serif } from "@artsy/palette"
import {
  MediumOptions,
  PriceRangeOptions,
  SizeOptions,
  SortOptions,
  TimePeriodOptions,
  WaysToBuyOptions,
} from "lib/data/ArtworkFilterOptions"
import React from "react"
import {
  FlatList,
  LayoutAnimation,
  Modal as RNModal,
  // NavigatorIOS,
  NativeModules,
  TouchableWithoutFeedback,
  ViewProperties,
} from "react-native"
import NavigatorIOS from "react-native-navigator-ios"
import styled from "styled-components/native"
import { SortModal } from "./SortModal"

interface ModalProps extends ViewProperties {
  // visible: boolean
  // closeModal?: () => void
  navigator?: NavigatorIOS
  // isArtworkGridVisible: boolean
}

// TODO:  Define a TypeScript interface to represent possible filter states (take a look at the Pick TypeScript generic)
interface State {
  isComponentMounted: boolean
  sortableItems: Array<{ type: string; data: any }>
  currentSortOrder: SortOptions
  waysToBuySortOrder: WaysToBuyOptions
  mediumSortOrder: MediumOptions
  priceRangeSortOrder: PriceRangeOptions
  sizeSortOrder: SizeOptions
  timePeriodSortOrder: TimePeriodOptions
  showModal: boolean
  isFilterArtworksModalVisible: boolean
}

export class FilterModalNavigator extends React.Component<ModalProps, any> {
  render() {
    return (
      <NavigatorIOS
        navigationBarHidden={true}
        initialRoute={{
          component: FilterModal,
          passProps: { visible: this.props.visible, closeModal: this.props.closeModal },
          title: "????", // what does this string need to be?
        }}
        style={{ flex: 1 }}
      />
    )
  }
}

class FilterModal extends React.Component<ModalProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      isComponentMounted: false,
      sortableItems: [],
      currentSortOrder: SortOptions.Default,
      waysToBuySortOrder: WaysToBuyOptions.All,
      mediumSortOrder: MediumOptions.All,
      priceRangeSortOrder: PriceRangeOptions.All,
      sizeSortOrder: SizeOptions.All,
      timePeriodSortOrder: TimePeriodOptions.All,
      showModal: false,
      isFilterArtworksModalVisible: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      this.setState({ isComponentMounted: true })
    }, 100)

    const sortableItems = []

    sortableItems.push({
      type: "Sort by",
      data: {
        sort: [],
      },
    })
    sortableItems.push({
      type: "Ways to buy",
      data: {
        sort: [],
      },
    })
    sortableItems.push({
      type: "Medium",
      data: {
        sort: [],
      },
    })
    sortableItems.push({
      type: "Price range",
      data: {
        sort: [],
      },
    })
    sortableItems.push({
      type: "Size",
      data: {
        sort: [],
      },
    })
    sortableItems.push({
      type: "Time period",
      data: {
        sort: [],
      },
    })

    this.setState({
      sortableItems,
    })
  }
  closeModal() {
    console.log("TCL: FilterModal -> closeModal -> closeModal")
    if (this.props.closeModal) {
      this.props.closeModal()
    }
  }
  getDefaultSort(type) {
    switch (type) {
      case "Sort by":
        return this.state.currentSortOrder
      case "Ways to buy":
        return this.state.waysToBuySortOrder
      case "Medium":
        return this.state.mediumSortOrder
      case "Price range":
        return this.state.priceRangeSortOrder
      case "Size":
        return this.state.sizeSortOrder
      case "Time period":
        return this.state.timePeriodSortOrder
      default:
        return null
    }
  }
  getSortItem(type) {
    return (
      <SortRowItem>
        <Flex p={2} flexDirection="row" justifyContent="space-between" flexGrow={1}>
          <Serif size="3">{type}</Serif>
          <ClickDefault flexDirection="row" onTouchEnd={this.openFilterScreen.bind(this)}>
            <Serif color={color("black60")} size="3">
              {this.getDefaultSort(type)}
            </Serif>
            <ArrowRightIcon fill="black30" ml={0.3} mt={0.3} />
          </ClickDefault>
        </Flex>
      </SortRowItem>
    )
  }
  renderSortItem = ({ item: { type } }) => {
    return this.getSortItem(type)
  }
  openFilterScreen() {
    return
    this.props.navigator.push({
      title: "Sort Modal",
      component: SortModal,
    })
  }

  shouldShowModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  handleFilterArtworksModal() {
    console.log("this when modal button activated", this)
    this.setState({ isFilterArtworksModalVisible: !this.state.isFilterArtworksModalVisible })
  }

  renderFilterButton() {
    const { isArtworkGridVisible } = this.props
    const isArtworkFilterEnabled = NativeModules.Emission?.options?.AROptionsFilterCollectionsArtworks

    return isArtworkGridVisible && isArtworkFilterEnabled ? (
      <FilterArtworkButtonContainer>
        <FilterArtworkButton variant="primaryBlack" onPress={() => this.handleFilterArtworksModal()}>
          Filter
        </FilterArtworkButton>
      </FilterArtworkButtonContainer>
    ) : null
  }

  render() {
    const { sortableItems, isFilterArtworksModalVisible } = this.state
    // const { visible } = this.props
    const visible = true

    return (
      this.renderFilterButton(),
      isFilterArtworksModalVisible && (
        <RNModal animationType="fade" transparent={true} visible={visible}>
          <TouchableWithoutFeedback>
            <ModalBackgroundView>
              <TouchableWithoutFeedback onPress={null}>
                <>
                  <Flex onTouchStart={this.closeModal.bind(this)} style={{ flexGrow: 1 }} />
                  <ModalInnerView visible={this.state.isComponentMounted}>
                    <Flex flexDirection="row" justifyContent="space-between">
                      <Flex alignItems="flex-end" mt={0.5} mb={2}>
                        <Box ml={2} mt={2} onTouchStart={this.closeModal.bind(this)}>
                          <CloseIcon fill="black100" />
                        </Box>
                      </Flex>
                      <Sans mt={2} weight="medium" size="4">
                        Filter
                      </Sans>
                      <Sans mr={2} mt={2} size="4">
                        Clear all
                      </Sans>
                    </Flex>
                    {this.props.children}
                    <Flex flexDirection="row">
                      <FlatList
                        keyExtractor={(_item, index) => String(index)}
                        data={sortableItems}
                        renderItem={item => <Box>{this.renderSortItem(item)}</Box>}
                      />
                    </Flex>
                    <Box p={2}>
                      <Button
                        onPress={() => {
                          this.closeModal()
                        }}
                        block
                        width={100}
                        variant="secondaryOutline"
                      >
                        Ok
                      </Button>
                    </Box>
                  </ModalInnerView>
                </>
              </TouchableWithoutFeedback>
            </ModalBackgroundView>
          </TouchableWithoutFeedback>
        </RNModal>
      )
    )
  }
}

export const FilterArtworkButtonContainer = styled(Flex)`
  position: absolute;
  bottom: 50;
  flex: 1;
  justify-content: center;
  width: 100%;
  flex-direction: row;
`

export const FilterArtworkButton = styled(Button)`
  border-radius: 100;
  width: 110px;
`

const ClickDefault = styled(Flex)`
  border: solid 5px hotpink;
`

const ModalBackgroundView = styled.View`
  background-color: #00000099;
  flex: 1;
  flex-direction: column;
`

const ModalInnerView = styled.View<{ visible: boolean }>`
  flex-direction: column;
  background-color: white;
  height: ${({ visible }) => (visible ? "auto" : "0")};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const SortRowItem = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  border: solid 1px ${color("black10")};
  border-bottom-width: 0;
  border-right-width: 0;
  border-left-width: 0;
  flex: 1;
  width: 100%;
`
