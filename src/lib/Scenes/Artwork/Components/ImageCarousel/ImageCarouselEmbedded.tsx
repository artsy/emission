import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import React, { useContext, useMemo } from "react"
import { Image } from "react-native"
import { PanGestureHandler, State, TapGestureHandler } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import { isPad } from "../../hardware"
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
    return Animated.cond(
      Animated.greaterThan(currentOffset, -midpoints[midpointIndex]),
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
    return Animated.cond(
      Animated.eq(index, measurementsIndex),
      -measurements[measurementsIndex].cumulativeScrollOffset,
      getOffsetForIndex(measurements, index, measurementsIndex + 1)
    )
  }
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

  const nextIndex = useAnimateValue(0)
  const currentIndex = useAnimateValue(0)

  embeddedCarouselRef.current = {
    scrollToIndexImmediately(index) {
      currentIndex.setValue(index)
    },
  }

  const railLeft = useAnimateValue(0)
  const dragX = useAnimateValue(0)
  const velocityX = useAnimateValue(0)
  const snapVelocity = useAnimateValue(0)
  const isDragging = useAnimateValue(-1)
  const offsetToSnapTo = useMemo(() => getOffsetForIndex(measurements, currentIndex), [])

  const hasTriggeredSnap = useAnimateValue(0)

  const clock = useMemo(() => new Animated.Clock(), [])

  Animated.useCode(
    Animated.cond(
      Animated.eq(isDragging, 0),
      [
        Animated.set(railLeft, Animated.add(railLeft, dragX)),
        Animated.set(dragX, 0),
        Animated.cond(Animated.not(hasTriggeredSnap), [
          Animated.set(hasTriggeredSnap, 1),
          Animated.set(snapVelocity, velocityX),
          // calculate the closest index to the current viewport and set nextIndex
          Animated.set(nextIndex, findClosestIndex(measurements, railLeft)),
          // if it's not different than the previous index and then maybe we need to handle a swipe gesture
          Animated.cond(
            Animated.and(Animated.eq(nextIndex, currentIndex), Animated.greaterThan(Animated.abs(velocityX), 10)),
            [
              // trigger gesture
              Animated.cond(
                // if we're swiping our finger to the right then the velocity is positive and we want the image
                // index to decrement
                Animated.greaterThan(velocityX, 0),
                [Animated.set(nextIndex, Animated.max(0, Animated.sub(nextIndex, 1)))],
                [Animated.set(nextIndex, Animated.min(measurements.length - 1, Animated.add(nextIndex, 1)))]
              ),
            ]
          ),
          Animated.set(currentIndex, nextIndex),
        ]),
      ],
      []
    ),
    []
  )

  const state = useMemo(
    () => ({
      finished: new Animated.Value(0),
      velocity: snapVelocity,
      position: railLeft,
      time: new Animated.Value(0),
    }),
    []
  )

  const config = useMemo(
    () => ({
      damping: 50,
      mass: 1,
      stiffness: 640.6,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: offsetToSnapTo,
    }),
    []
  )

  Animated.useCode(
    Animated.cond(Animated.clockRunning(clock), [
      Animated.spring(clock, state, config),
      Animated.cond(state.finished, [
        Animated.stopClock(clock),
        Animated.set(state.finished, 0),
        Animated.set(state.time, 0),
      ]),
    ]),
    []
  )

  Animated.useCode(
    Animated.call([currentIndex], ([nextImageIndex]) => dispatch({ type: "IMAGE_INDEX_CHANGED", nextImageIndex })),
    []
  )

  // stop clock when not needed
  // rubber banding?
  //

  const gestureState = useAnimateValue(0)

  Animated.useCode(
    Animated.cond(
      // if the gesture ended
      Animated.and(Animated.neq(gestureState, State.ACTIVE), Animated.neq(gestureState, State.BEGAN)),
      // TODO: maybe refactor to remove isDragging and put animation triggering stuff in here
      [
        Animated.set(isDragging, 0),
        Animated.cond(Animated.not(Animated.clockRunning(clock)), [Animated.startClock(clock)]),
      ],
      [
        // if the gesture started
        Animated.cond(Animated.or(Animated.eq(gestureState, State.ACTIVE), Animated.eq(gestureState, State.BEGAN)), [
          Animated.set(isDragging, 1),
          Animated.set(hasTriggeredSnap, 0),
        ]),
      ]
    ),
    []
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
          onHandlerStateChange={Animated.event(
            [
              {
                nativeEvent: { state: gestureState },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          <Animated.View
            style={[{ height: cardHeight }, { transform: [{ translateX: Animated.add(dragX, railLeft) as any }] }]}
          >
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
