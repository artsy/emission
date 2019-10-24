import { Schema } from "lib/utils/track"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import React, { useCallback, useContext, useMemo } from "react"
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { PanGestureHandler, State } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import { useTracking } from "react-tracking"
import { isPad } from "../../hardware"
import { findClosestIndex, getMeasurements } from "./geometry"
import { ImageCarouselContext, ImageDescriptor } from "./ImageCarouselContext"
import { ImageWithLoadingState } from "./ImageWithLoadingState"

// This is the main image caoursel visible on the root of the artwork page
export const ImageCarouselEmbedded = () => {
  const tracking = useTracking()
  const screenDimensions = useScreenDimensions()
  // The logic for cardHeight comes from the zeplin spec https://zpl.io/25JLX0Q
  const cardHeight = screenDimensions.width >= 375 ? 340 : 290

  const embeddedCardBoundingBox = { width: screenDimensions.width, height: isPad() ? 460 : cardHeight }

  const {
    images,
    embeddedFlatListRef: embeddedFlatListRef,
    embeddedImageRefs: embeddedImageRefs,
    dispatch,
    imageIndex,
  } = useContext(ImageCarouselContext)

  // measurements is geometry data about each image.
  const measurements = getMeasurements({ images, boundingBox: embeddedCardBoundingBox })

  const goFullScreen = useCallback(() => {
    tracking.trackEvent({
      action_name: Schema.ActionNames.ArtworkImageZoom,
      action_type: Schema.ActionTypes.Tap,
      context_module: Schema.ContextModules.ArtworkImage,
    })
    dispatch({ type: "TAPPED_TO_GO_FULL_SCREEN" })
  }, [dispatch])

  const railLeft = useMemo(() => new Animated.Value(0 as number), [])
  const dragX = useMemo(() => new Animated.Value(0 as number), [])
  const isDragging = useMemo(() => new Animated.Value(0 as number), [])

  const clock = useMemo(() => new Animated.Clock(), [])

  Animated.useCode(
    Animated.cond(Animated.not(isDragging), [
      Animated.set(railLeft, Animated.add(railLeft, dragX)),
      Animated.set(dragX, 0),
    ]),
    []
  )

  // snap to offset
  // rubber banding
  // momentum scroll

  return (
    <PanGestureHandler
      onGestureEvent={Animated.event([
        {
          nativeEvent: { translationX: dragX },
        },
      ])}
      onHandlerStateChange={e => {
        if (e.nativeEvent.oldState === State.ACTIVE) {
          isDragging.setValue(0)
        } else if (e.nativeEvent.state === State.ACTIVE) {
          isDragging.setValue(1)
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
            ></Image>
          )
        })}
      </Animated.View>
    </PanGestureHandler>
  )
}
