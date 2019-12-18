import { useMemo, useRef, useState } from "react"
import Animated from "react-native-reanimated"

/**
 * returns a stable Animated.Value instance which starts off with the
 * given number. Note that the initialization parameter will be ignored
 * on subsequent renders
 * @param init
 */
export function useAnimatedValue(init: number) {
  return useMemo(() => {
    return new Animated.Value(init)
  }, [])
}

/**
 * returns a function which can asynchronously read the value of some native animated nodes
 * This is useful for values that change frequently on the native side but which you only
 * want to read occasionally on the JS side. It helps you avoid the perf hit of sending change
 * events over the bridge.
 * @param vals the animated vals to make the reader function for
 * @example
 * const scrollOffset = useMemo(() => new Animated.Value(0), [])
 * const readVals = useValueReader({scrollOffset})
 * // later, e.g. in a callback
 * const {scrollOffset} = await readVals()
 * console.log(scrollOffset) // => 632
 */
export function useValueReader<T extends { [k: string]: Animated.Adaptable<number> }>(
  props: T
): () => Promise<{ [k in keyof T]: number }> {
  // this works by running some reanimated code every time an 'epoch' value
  // is incremented. That code calls a callback with the current values
  // to resolve a promise set up for the consumer
  const epochRef = useRef(0)
  const epoch = useAnimatedValue(0)
  const lastEpoch = useAnimatedValue(0)

  const readCallback = useRef<(vals: ReadonlyArray<number>) => void>()

  const keys = useMemo(() => {
    return Object.keys(props)
  }, [props])

  const vals = useMemo(() => {
    return keys.map(k => props[k])
  }, [keys])

  Animated.useCode(
    () =>
      Animated.cond(Animated.neq(epoch, lastEpoch), [
        Animated.set(lastEpoch, epoch),
        Animated.call([...vals], vs => {
          const cb = readCallback.current
          readCallback.current = null
          result.current = null
          cb(
            keys.reduce((acc, k, i) => {
              acc[k] = vs[i]
              return acc
            }, {} as any)
          )
        }),
      ]),
    [vals, keys]
  )

  const result = useRef<Promise<any>>()

  return () => {
    if (!result.current) {
      result.current = new Promise(resolve => {
        readCallback.current = resolve
        epochRef.current += 1
        epoch.setValue(epochRef.current)
      })
    }
    return result.current
  }
}

export function useNativeValue(node: Animated.Node<number>, init: number): number {
  const [state, setState] = useState(init)
  Animated.useCode(() => Animated.call([node], ([val]) => setState(val)), [])
  return state
}

// Takes an animated driver value and outputs a value which follows the
// driver but smoothed using a spring damping technique
export function springDampen(val: Animated.Node<number>, customConfig: Partial<Animated.SpringConfig> = {}) {
  const {
    Clock,
    Value,
    neq,
    sub,
    add,
    and,
    block,
    cond,
    set,
    spring,
    not,
    clockRunning,
    startClock,
    stopClock,
  } = Animated
  const clock = new Clock()
  const dampener = new Value(0)
  const output = add(val, dampener)
  const lastVal = new Value(0)
  const firstTime = new Value(1)
  const state = {
    finished: new Value(0),
    position: dampener,
    velocity: new Value(0),
    time: new Value(0),
  }

  const config: Animated.SpringConfig = {
    stiffness: new Value(180),
    mass: new Value(1),
    damping: new Value(18),
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    ...customConfig,
    toValue: 0,
  }

  return block([
    cond(firstTime, [set(firstTime, 0), set(lastVal, output)]),
    set(dampener, add(dampener, sub(lastVal, val))),
    set(lastVal, val),
    cond(and(neq(0, dampener), not(clockRunning(clock))), [
      startClock(clock),
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.time, 0),
    ]),
    cond(clockRunning(clock), [
      spring(clock, state, config),
      // if the animation is over we stop the clock
      cond(state.finished, stopClock(clock)),
    ]),
    output,
  ])
}
