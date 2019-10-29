import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import React, { useContext, useMemo } from "react"
import { Image } from "react-native"
import { PanGestureHandler, State } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import { isPad } from "../../hardware"
import { getMeasurements, ImageMeasurements } from "./geometry"
import { ImageCarouselContext } from "./ImageCarouselContext"

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

  const { images } = useContext(ImageCarouselContext)

  // measurements is geometry data about each image.
  const measurements = getMeasurements({ images, boundingBox: embeddedCardBoundingBox })

  const nextIndex = useAnimateValue(0)
  const currentIndex = useAnimateValue(0)

  const railLeft = useAnimateValue(0)
  const dragX = useAnimateValue(0)
  const velocityX = useAnimateValue(0)
  const isDragging = useAnimateValue(-1)
  const offsetToSnapTo = useAnimateValue(0)

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
          // set the offet to snap to
          Animated.set(nextIndex, findClosestIndex(measurements, offsetToSnapTo)),
          Animated.cond(
            Animated.and(Animated.eq(nextIndex, currentIndex), Animated.greaterThan(Animated.abs(velocityX), 10)),
            [
              // trigger gesture
              Animated.cond(
                Animated.greaterThan(velocityX, 0),
                [Animated.set(nextIndex, Animated.max(0, Animated.sub(nextIndex, 1)))],
                [Animated.set(nextIndex, Animated.min(measurements.length - 1, Animated.add(nextIndex, 1)))]
              ),
            ]
          ),
          Animated.call([currentIndex, nextIndex, velocityX], console.log),
          Animated.set(currentIndex, nextIndex),
          // update offset to snap to
          Animated.set(offsetToSnapTo, getOffsetForIndex(measurements, currentIndex)),
        ]),
      ],
      []
    ),
    []
  )

  const state = useMemo(
    () => ({
      finished: new Animated.Value(0),
      velocity: new Animated.Value(0),
      position: railLeft,
      time: new Animated.Value(0),
    }),
    []
  )

  const config = useMemo(
    () => ({
      damping: 50,
      mass: 1,
      stiffness: 621.6,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: offsetToSnapTo,
    }),
    []
  )

  Animated.useCode(
    Animated.cond(Animated.not(isDragging), [Animated.startClock(clock), Animated.spring(clock, state, config)]),
    []
  )

  // stop clock when not needed
  // rubber banding?
  //

  return (
    <PanGestureHandler
      onGestureEvent={Animated.event([
        {
          nativeEvent: { translationX: dragX, velocityX },
        },
      ])}
      onHandlerStateChange={e => {
        if (e.nativeEvent.state !== State.ACTIVE && e.nativeEvent.state !== State.BEGAN) {
          isDragging.setValue(0)
        } else if (e.nativeEvent.state === State.ACTIVE || e.nativeEvent.state === State.BEGAN) {
          isDragging.setValue(1)
          hasTriggeredSnap.setValue(0)
        }
      }}
    >
      <Animated.View
        style={[{ height: cardHeight }, { transform: [{ translateX: Animated.add(dragX, railLeft) as any }] }]}
      >
        {images.map((image, index) => {
          const { width, height, cumulativeScrollOffset, marginTop, marginLeft } = measurements[index]
          return (
            <Image
              source={{ uri: image.url }}
              style={{ width, height, left: cumulativeScrollOffset + marginLeft, top: marginTop, position: "absolute" }}
            />
          )
        })}
      </Animated.View>
    </PanGestureHandler>
  )
}
