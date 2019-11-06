import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import React, { useContext, useMemo } from "react"
import { PanGestureHandler, State, TapGestureHandler } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import { isPad } from "../../hardware"
import {
  abs,
  add,
  and,
  call,
  clockRunning,
  cond,
  eq,
  greaterThan,
  max,
  min,
  neq,
  not,
  or,
  set,
  spring,
  startClock,
  stopClock,
  sub,
  useCode,
} from "./animated"
import { getMeasurements, ImageMeasurements } from "./geometry"
import { ImageCarouselContext } from "./ImageCarouselContext"
import { ImageWithLoadingState } from "./ImageWithLoadingState"

const useAnimateValue = (init: number) => useMemo(() => new Animated.Value(init), [])

function findClosestIndex(measurements: ImageMeasurements[], currentOffset: Animated.Node<number>) {
  const midpoints = []
  for (let i = 1; i < measurements.length; i++) {
    midpoints.push((measurements[i - 1].cumulativeScrollOffset + measurements[i].cumulativeScrollOffset) / 2)
  }

  return _findClosestIndex({ measurements, midpoints, currentOffset, midpointIndex: 0 })
}

function _findClosestIndex({
  measurements,
  midpoints,
  currentOffset,
  midpointIndex,
}: {
  measurements: ImageMeasurements[]
  midpoints: number[]
  currentOffset: Animated.Node<number>
  midpointIndex: number
}) {
  if (midpointIndex === midpoints.length) {
    return midpointIndex
  } else {
    return cond(
      greaterThan(currentOffset, -midpoints[midpointIndex]),
      midpointIndex,
      _findClosestIndex({
        measurements,
        midpoints,
        currentOffset,
        midpointIndex: midpointIndex + 1,
      })
    )
  }
}

function getOffsetForIndex(
  measurements: ImageMeasurements[],
  index: Animated.Node<number>,
  measurementsIndex: number = 0
) {
  if (measurementsIndex === measurements.length - 1) {
    return -measurements[measurements.length - 1].cumulativeScrollOffset
  } else {
    return cond(
      eq(index, measurementsIndex),
      -measurements[measurementsIndex].cumulativeScrollOffset,
      getOffsetForIndex(measurements, index, measurementsIndex + 1)
    )
  }
}

function useSpring({
  position,
  toValue,
  velocity,
}: {
  velocity: Animated.Value<number>
  position: Animated.Value<number>
  toValue: Animated.Node<number>
}) {
  const clock = useMemo(() => new Animated.Clock(), [])

  const code = useMemo(() => {
    const state = {
      finished: new Animated.Value(0),
      velocity,
      position,
      time: new Animated.Value(0),
    }

    const config = {
      damping: 50,
      mass: 1,
      stiffness: 640.6,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue,
    }

    return cond(neq(toValue, position), [
      cond(not(clockRunning(clock)), startClock(clock)),
      spring(clock, state, config),
      cond(state.finished, [stopClock(clock), set(state.finished, 0), set(state.time, 0), set(position, toValue)]),
    ])
  }, [])

  useCode(code, [code])
}

function useHandlerStateChange(
  fn: (props: { state: Animated.Node<State>; oldState: Animated.Node<State> }) => Animated.Node<any>
) {
  const state = useAnimateValue(State.UNDETERMINED)
  const oldState = useAnimateValue(State.UNDETERMINED)
  const code = useMemo(() => fn({ state, oldState }), [])
  useCode(cond(neq(state, oldState), [code, set(oldState, state)]), [])
  return Animated.event([{ nativeEvent: { state, oldState } }], { useNativeDriver: true })
}

// This is the main image caoursel visible on the root of the artwork page
export const ImageCarouselEmbedded = () => {
  const screenDimensions = useScreenDimensions()
  // The logic for cardHeight comes from the zeplin spec https://zpl.io/25JLX0Q
  const cardHeight = screenDimensions.width >= 375 ? 340 : 290

  const embeddedCardBoundingBox = { width: screenDimensions.width, height: isPad() ? 460 : cardHeight }

  const { images, dispatch, embeddedImageRefs, embeddedCarouselRef } = useContext(ImageCarouselContext)

  // measurements is geometry data about each image.
  const measurements = getMeasurements({ images, boundingBox: embeddedCardBoundingBox })

  // which image we are 'snapped' to. This only makes sense while not dragging
  const snapIndex = useAnimateValue(0)
  const snapOffset = useMemo(() => getOffsetForIndex(measurements, snapIndex), [])

  // The non-drag x-offset of the carousel rail
  const railLeft = useAnimateValue(0)
  // The drag x-offset of the carousel rail
  const dragX = useAnimateValue(0)
  // The combined (and final) x-offset of the carousel rail
  const translateX = useMemo(() => add(railLeft, dragX), [])

  const velocityX = useAnimateValue(0)

  const closestIndex = useMemo(() => findClosestIndex(measurements, translateX), [])

  const isDragging = useAnimateValue(0)

  embeddedCarouselRef.current = {
    scrollToIndexImmediately(index) {
      snapIndex.setValue(index)
      railLeft.setValue(snapOffset)
    },
  }

  useSpring({ position: railLeft, toValue: cond(isDragging, railLeft, snapOffset), velocity: velocityX })

  useCode(
    call([Animated.cond(isDragging, closestIndex, snapIndex)], ([nextImageIndex]) =>
      dispatch({ type: "IMAGE_INDEX_CHANGED", nextImageIndex })
    ),
    []
  )

  // stop clock when not needed
  // rubber banding?
  //

  const onHandlerStateChange = useHandlerStateChange(({ state }) =>
    cond(
      // if the gesture ended
      and(neq(state, State.ACTIVE), neq(state, State.BEGAN)),
      [
        set(isDragging, 0),
        // apply drag offset to railLeft
        set(railLeft, add(railLeft, dragX)),
        set(dragX, 0),
        // if the snap index is still the closest index then we might need to interpret a swipe gesture
        cond(
          and(eq(closestIndex, snapIndex), greaterThan(abs(velocityX), 10)),
          [
            // trigger gesture
            cond(
              // if we're swiping our finger to the right then the velocity is positive and we want the image
              // index to decrement
              greaterThan(velocityX, 0),
              [set(snapIndex, max(0, sub(snapIndex, 1)))],
              [set(snapIndex, min(measurements.length - 1, add(snapIndex, 1)))]
            ),
          ],
          [set(snapIndex, closestIndex)]
        ),
      ],
      // if the gesture started
      cond(or(eq(state, State.ACTIVE), eq(state, State.BEGAN)), [set(isDragging, 1)])
    )
  )

  return (
    <TapGestureHandler
      onHandlerStateChange={e => {
        if (e.nativeEvent.state === State.END) {
          dispatch({ type: "TAPPED_TO_GO_FULL_SCREEN" })
        }
      }}
    >
      <Animated.View>
        <PanGestureHandler
          // make the gesture horizontal-only
          minDeltaX={10}
          onGestureEvent={Animated.event(
            [
              {
                nativeEvent: { translationX: dragX, velocityX },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[{ height: cardHeight }, { transform: [{ translateX: translateX as any }] }]}>
            {images.map((image, index) => {
              const { width, height, cumulativeScrollOffset, marginLeft, marginTop } = measurements[index]
              return (
                <ImageWithLoadingState
                  key={index}
                  imageURL={image.url}
                  width={width}
                  height={height}
                  // make sure first image loads first
                  highPriority={index === 0}
                  ref={ref => {
                    embeddedImageRefs[index] = ref
                  }}
                  style={[
                    {
                      width,
                      height,
                      left: cumulativeScrollOffset + marginLeft,
                      top: marginTop,
                      position: "absolute",
                    },
                    images.length === 1 ? { marginTop: 0, marginBottom: 0 } : {},
                  ]}
                />
              )
            })}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}
