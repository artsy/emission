export interface Size {
  width: number
  height: number
}

export interface Position {
  x: number
  y: number
}

export interface Rect extends Size, Position {}

// places a box (child) in the center of another (container), making the child 'fit' within the container
// without overflowing or changing the child's aspect ratio
export function fitInside(container: Size, child: Size): Size & { marginHorizontal: number; marginVertical: number } {
  const aspectRatio = child.width / child.height

  // start out assuming that we need to constrain the image by height
  let height = Math.min(container.height, child.height)
  let width = aspectRatio * height

  // check whether we actually need to constrain the image by width
  if (width > container.width) {
    width = container.width
    height = width / aspectRatio
  }

  // calculate centering margins
  const marginHorizontal = (container.width - width) / 2
  const marginVertical = (container.height - height) / 2

  return { width, height, marginHorizontal, marginVertical }
}

/**
 * Represents geometric data to position images on the carousel rail
 */
export interface ImageMeasurements {
  width: number
  height: number
  marginLeft: number
  marginRight: number
  marginTop: number
  marginBottom: number
  cumulativeScrollOffset: number
}

const MIN_MARGIN = 20

// given an input array of image sources, calculates the dimensions and positions of all the images on the carousel
// rail. boundingBox is the maximum possible size that an image can occupy on the rail
export function getMeasurements({ images, boundingBox }: { images: ReadonlyArray<Size>; boundingBox: Size }) {
  const result: ImageMeasurements[] = []

  for (let i = 0; i < images.length; i++) {
    const { width, height, marginHorizontal, marginVertical } = fitInside(boundingBox, images[i])

    const prev = result[i - 1]

    const distanceBetweenImages = prev ? Math.max(prev.marginRight, marginHorizontal, MIN_MARGIN) : marginHorizontal
    const cumulativeScrollOffset = prev
      ? prev.cumulativeScrollOffset + boundingBox.width - prev.marginRight - marginHorizontal + distanceBetweenImages
      : 0

    result.push({
      width,
      height,
      marginLeft: marginHorizontal,
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
