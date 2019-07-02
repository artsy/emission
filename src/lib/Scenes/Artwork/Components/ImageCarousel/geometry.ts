interface Box {
  width: number
  height: number
}
// places a box (child) in the center of another (container), making the child 'fit' within the container
// without overflowing or changing the child's aspect ratio
export function fitInside(
  container: Box,
  child: Box
): { width: number; height: number; marginHorizontal: number; marginVertical: number } {
  const aspectRatio = child.width / child.height

  // start out assuming that we need to constrain the image by height
  let height = container.height
  let width = aspectRatio * container.height

  // check whether we actually need to constrain the image by width
  if (width > container.width) {
    width = container.width
    height = container.width / aspectRatio
  }

  // calculate centering margins
  const marginHorizontal = (container.width - width) / 2
  const marginVertical = (container.height - height) / 2

  return { width, height, marginHorizontal, marginVertical }
}

/**
 * Represents geometric data to position images on the carousel rail
 */
interface ImageMeasurements {
  width: number
  height: number
  marginLeft: number
  marginRight: number
  marginTop: number
  marginBottom: number
  cumulativeScrollOffset: number
}

// given an input array of image sources, calculates the dimensions and positions of all the images on the carousel
// rail. boundingBox is the maximum possible size that an image can occupy on the rail
export function getMeasurements({ images, boundingBox }: { images: ReadonlyArray<Box>; boundingBox: Box }) {
  const result: ImageMeasurements[] = []

  for (let i = 0; i < images.length; i++) {
    const { width, height, marginHorizontal, marginVertical } = fitInside(boundingBox, images[i])

    // collapse adjacent margins to avoid excess white space between images
    const marginLeft = i === 0 ? marginHorizontal : Math.max(marginHorizontal - result[i - 1].marginRight, 0)

    // calculate cumulative scroll offset taking collapsed margins into account
    const cumulativeScrollOffset =
      i === 0 ? 0 : result[i - 1].cumulativeScrollOffset + boundingBox.width - (marginHorizontal - marginLeft)

    result.push({
      width,
      height,
      marginLeft,
      marginRight: marginHorizontal,
      marginTop: marginVertical,
      marginBottom: marginVertical,
      cumulativeScrollOffset,
    })
  }

  return result
}

export function findClosestIndex(offsets: number[], scrollOffset: number) {
  if (offsets.length === 0) {
    if (__DEV__) {
      throw new Error("empty offsets array passed to findClosestIndex")
    }
    return 0
  }
  if (offsets.length === 1) {
    return 0
  }
  // It uses a binary search algorithm to find the closest cumulative scroll
  // offset to the scrollX offset of the carousel rail
  let lowIndex = 0
  let highIndex = offsets.length - 1

  // do the binary search to find out which indexes the current rail scroll offset is between
  while (highIndex - lowIndex > 1) {
    const midIndex = Math.floor((highIndex + lowIndex) / 2)
    if (scrollOffset < offsets[midIndex]) {
      highIndex = midIndex
    } else {
      lowIndex = midIndex
    }
  }

  // select the index to which it is closest
  if (Math.abs(scrollOffset - offsets[lowIndex]) < Math.abs(scrollOffset - offsets[highIndex])) {
    return lowIndex
  } else {
    return highIndex
  }
}
