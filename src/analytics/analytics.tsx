// import segment
import * as DSL from "./dsl"

export function sendIntent(analyticsConstant: string, contextProps: any) {
  // send it
  let properties = DSL.dsl[analyticsConstant].intent(contextProps)
  console.log(properties)
  // Segment.track(analyticsConstant, properties)
}

export function sendSuccess(analyticsConstant: string, contextProps: any) {
  // send it
}

export function sendFail(analyticsConstant: string, contextProps: any, error: Error) {
  // send it
}