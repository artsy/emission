import { Box, color, Flex, Sans, space, Spacer } from "@artsy/palette"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import React, { useMemo, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import Animated from "react-native-reanimated"
import styled from "styled-components/native"
import { useAnimatedValue } from "./reanimatedHelpers"
import { SnappyHorizontalRail } from "./SnappyHorizontalRail"
import { StickyTabScrollView, TabState } from "./StickyTabScrollView"

interface TabProps {
  initial?: boolean
  title: string
  content: JSX.Element
}

/**
 * This page wrapper encapsulates a disappearing header and sticky tabs each with their own content
 *
 * At the moment all tabs are rendered at all times, as this isn't designed for more than 3 tabs
 * but if we need to have conditional rendering of tab content in the future it should be possible.
 *
 * Each tab optionally consumes a 'scroll view context' which could potentialy contain information
 * about whether the tab is being shown currently etc.
 */
export const StickyTabPage: React.FC<{
  tabs: TabProps[]
  headerContent: JSX.Element
}> = ({ tabs, headerContent }) => {
  const initialTabIndex = useMemo(() => Math.max(tabs.findIndex(tab => tab.initial), 0), [tabs])
  const { width } = useScreenDimensions()
  const activeTabIndex = useAnimatedValue(initialTabIndex)
  const tabStates: TabState[] = useMemo(
    () => {
      return tabs.map((_, index) => ({
        isActive: Animated.eq(index, activeTabIndex),
        shouldLoad: new Animated.Value(index === initialTabIndex ? 1 : 0),
        hasLoaded: new Animated.Value(0),
      }))
    },
    [tabs]
  )
  // trigger staggered loading of tabs
  Animated.useCode(
    () => {
      return Animated.call(
        // collect all shouldLoad and hasLoaded into a single array so we can pluck them out at once
        [...tabStates.map(({ shouldLoad }) => shouldLoad), ...tabStates.map(({ hasLoaded }) => hasLoaded)],
        vals => {
          const shouldsLoads = vals.slice(0, tabStates.length)
          const hasLoadeds = vals.slice(tabStates.length)

          let loadInProgress = false
          for (let tabIndex = 0; tabIndex < tabStates.length; tabIndex++) {
            if (!hasLoadeds[tabIndex] && shouldsLoads[tabIndex]) {
              loadInProgress = true
              break
            }
          }
          if (loadInProgress) {
            return
          }
          // kick the next one off if needed
          for (let tabIndex = 0; tabIndex < tabStates.length; tabIndex++) {
            if (!hasLoadeds[tabIndex] && !shouldsLoads[tabIndex]) {
              tabStates[tabIndex].shouldLoad.setValue(1)
              break
            }
          }
        }
      )
    },
    [tabStates]
  )
  const [headerHeight, setHeaderHeight] = useState<number>(0)

  const headerOffsetY = useAnimatedValue(0)

  const railRef = useRef<SnappyHorizontalRail>()
  const initialRenderTime = useMemo(() => Date.now(), [])

  return (
    <View style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      {/* put tab content first because we want the header to be absolutely positioned _above_ it */}
      <SnappyHorizontalRail ref={railRef} initialOffset={initialTabIndex * width}>
        {tabs.map(({ content }, index) => {
          return (
            <View
              style={{ flex: 1, width }}
              key={index}
              onLayout={() => {
                if (headerHeight > 0) {
                  console.warn("second layout", Date.now() - initialRenderTime)
                }
              }}
            >
              <StickyTabScrollView
                headerHeight={headerHeight}
                content={content}
                headerOffsetY={headerOffsetY}
                tabState={tabStates[index]}
              />
            </View>
          )
        })}
      </SnappyHorizontalRail>
      <Animated.View
        style={{
          width,
          top: 0,
          position: "absolute",
          backgroundColor: color("white100"),
          transform: [{ translateY: headerOffsetY as any }],
        }}
      >
        <View
          onLayout={e => {
            setHeaderHeight(e.nativeEvent.layout.height)
            console.warn("first layout", Date.now() - initialRenderTime)
          }}
        >
          {headerContent}
          <Spacer mb={1} />
        </View>
        <StickyTabBar>
          {tabs.map(({ title }, index) => (
            <StickyTab
              key={title}
              label={title}
              active={tabStates[index].isActive}
              onPress={() => {
                activeTabIndex.setValue(index)
                railRef.current.setOffset(index * width)
                tabStates[index].shouldLoad.setValue(1) // *just* in case. This should already be 1
              }}
            />
          ))}
        </StickyTabBar>
      </Animated.View>
    </View>
  )
}

export const TAB_BAR_HEIGHT = 48

const StickyTabBar = styled(Flex)`
  border-bottom-width: 1;
  border-bottom-color: ${color("black30")};
  height: ${TAB_BAR_HEIGHT};
  flex-direction: row;
  padding-right: ${space(2)};
  padding-left: ${space(2)};
`

const StickyTab: React.FC<{ label: string; active: Animated.Node<number>; onPress(): void }> = ({
  label,
  active,
  onPress,
}) => {
  const [isActive, setIsActive] = useState(false)

  // Animated.useCode(() => Animated.call([active], ([val]) => setIsActive(Boolean(val))), [])

  return (
    <Flex style={{ flex: 1, height: TAB_BAR_HEIGHT }}>
      <TouchableOpacity onPress={onPress}>
        <Box
          style={{
            height: TAB_BAR_HEIGHT,
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: isActive ? color("black100") : color("black30"),
          }}
        >
          <Sans size="3" weight={isActive ? "medium" : "regular"}>
            {label}
          </Sans>
        </Box>
      </TouchableOpacity>
    </Flex>
  )
}
