import { Spacer } from "@artsy/palette"
import React, { useContext, useRef } from "react"
import { View } from "react-native"
import Animated from "react-native-reanimated"
import { useAnimatedValue, useValue } from "./reanimatedHelpers"
import { TAB_BAR_HEIGHT } from "./StickyTabPage"

export const StickyTabScrollViewContext = React.createContext<{
  scrollOffsetY: Animated.Node<number>
  contentHeight: Animated.Node<number>
  layoutHeight: Animated.Node<number>
}>(null)

export const useStickyTabContext = () => {
  return useContext(StickyTabScrollViewContext)
}

// how fast you have to be scrolling up to show the header when not near the top of the scroll view
const SHOW_HEADER_VELOCITY = 10

export interface TabState {
  isActive: Animated.Node<number>
  shouldLoad: Animated.Value<number>
  hasLoaded: Animated.Value<number>
}

export const StickyTabScrollView: React.FC<{
  headerHeight: number
  headerOffsetY: Animated.Value<number>
  tabState: TabState
  content: React.ReactNode
}> = ({ headerHeight, headerOffsetY, content, tabState }) => {
  const contentHeight = useAnimatedValue(0)
  const layoutHeight = useAnimatedValue(0)
  const scrollOffsetY = useAnimatedValue(0)

  const { lockHeaderPosition } = useStickyHeaderPositioning({
    headerOffsetY,
    contentHeight,
    layoutHeight,
    headerHeight,
    scrollOffsetY,
  })

  const scrollViewRef = useRef<Animated.ScrollView>()

  const lastIsActive = useAnimatedValue(-1)

  // prevent this tab from manipulating the header position when it is not active
  Animated.useCode(
    () =>
      Animated.cond(Animated.neq(lastIsActive, tabState.isActive), [
        Animated.set(lastIsActive, tabState.isActive),
        Animated.cond(
          tabState.isActive,
          [
            // the tab just became active so we might need to adjust the scroll offset to avoid unwanted
            // white space before allowing the scroll offset to affect the header position
            Animated.cond(
              Animated.greaterThan(Animated.multiply(-1, headerOffsetY), scrollOffsetY),
              Animated.call([headerOffsetY], ([y]) => {
                scrollViewRef.current.getNode().scrollTo({ y: -y, animated: false })
                lockHeaderPosition.setValue(0)
              }),
              Animated.set(lockHeaderPosition, 0)
            ),
          ],
          Animated.set(lockHeaderPosition, 1)
        ),
      ]),
    []
  )

  return (
    <StickyTabScrollViewContext.Provider value={{ contentHeight, layoutHeight, scrollOffsetY }}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollOffsetY },
                contentSize: { height: contentHeight },
                layoutMeasurement: { height: layoutHeight },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        // we want every frame to trigger an update on the native side
        scrollEventThrottle={0.0000000001}
      >
        <Spacer mb={headerHeight + TAB_BAR_HEIGHT} />
        <LazyLoadTabContent tabState={tabState} content={content} />
      </Animated.ScrollView>
    </StickyTabScrollViewContext.Provider>
  )
}

const LazyLoadTabContent: React.FC<{ tabState: TabState; content: React.ReactNode }> = ({ tabState, content }) => {
  const showing = Boolean(useValue(tabState.shouldLoad))

  return showing ? (
    <View
      onLayout={() => {
        setTimeout(() => {
          tabState.hasLoaded.setValue(1)
          // use significant timeout to avoid busy cpu cascade while loading tabs
        }, 300)
      }}
      style={{ flex: 1 }}
    >
      {content}
    </View>
  ) : (
    <></>
  )
}

function useStickyHeaderPositioning({
  headerHeight,
  scrollOffsetY,
  headerOffsetY,
  contentHeight,
  layoutHeight,
}: {
  headerHeight: number
  scrollOffsetY: Animated.Node<number>
  headerOffsetY: Animated.Value<number>
  contentHeight: Animated.Node<number>
  layoutHeight: Animated.Node<number>
}) {
  const lockHeaderPosition = useAnimatedValue(1)

  Animated.useCode(
    () => {
      // scrollDiff is the amount the header has scrolled since last time this code ran
      const scrollDiff = Animated.diff(scrollOffsetY)

      const upwardVelocityBreached = Animated.lessOrEq(scrollDiff, -SHOW_HEADER_VELOCITY)
      const headerIsNotFullyUp = Animated.neq(headerOffsetY, -headerHeight)

      const nearTheTop = Animated.lessOrEq(scrollOffsetY, headerHeight)

      // this is the code which actually performs the update to headerOffsetY, according to which direction
      // the scrolling is going
      const updateHeaderOffset = Animated.cond(
        Animated.greaterThan(scrollDiff, 0),
        [
          // y offset got bigger so scrolling down (content travels up the screen)
          // move the header up (hide it) unconditionally
          Animated.set(headerOffsetY, Animated.max(-headerHeight, Animated.sub(headerOffsetY, scrollDiff))),
        ],
        [
          // y offset got smaller so scrolling up (content travels down the screen)
          // if velocity is high enough or we're already moving the header up or we're near the top of the scroll view
          // then move the header down (show it)
          Animated.cond(Animated.or(upwardVelocityBreached, headerIsNotFullyUp, nearTheTop), [
            Animated.set(headerOffsetY, Animated.min(0, Animated.sub(headerOffsetY, scrollDiff))),
          ]),
        ]
      )

      // we don't want to manipulate the header position while bouncing at the top or the bottom of the scroll view
      // cause it feels weeeird
      const notBouncingAtTheTop = Animated.greaterThan(scrollOffsetY, 0)
      const notBouncingAtTheBottom = Animated.lessThan(scrollOffsetY, Animated.sub(contentHeight, layoutHeight))

      const updateHeaderOffsetWhenNotBouncingOrLocked = Animated.cond(
        Animated.and(notBouncingAtTheTop, notBouncingAtTheBottom, Animated.not(lockHeaderPosition)),
        updateHeaderOffset,
        // deref scroll diff to prevent diff buildup when ignoring changes
        scrollDiff
      )

      // on first eval (when the component mounts) the scroll values will be nonsensical so ignore
      const firstEval = new Animated.Value(1)
      return Animated.cond(
        firstEval,
        [
          Animated.set(firstEval, 0),
          // again, deref scrollDiff to prevent buildup
          scrollDiff,
        ],
        updateHeaderOffsetWhenNotBouncingOrLocked
      )
    },
    [headerHeight]
  )

  return { lockHeaderPosition }
}
