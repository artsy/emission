import * as Analytics from "../../analytics/analytics"

// This heavily uses ideas and approaches from @autobind
// https://github.com/andreypopp/autobind-decorator
export default function eventHandler(analyticsConstant: string) {
  // TODO: disable tslint arrow function rule
  return function bindMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value

    if (typeof originalMethod !== "function") {
      throw new Error(`@eventHandler can only be applied to methods not: ${typeof originalMethod}`)
    }

    // normally in decorators, you overwrite the descriptor's value (= function), and return as is
    // because we're binding, we're creating a whole new descriptor
    let newDescriptor = {
      configurable: true,
      get() {
        if (this === target.prototype || this.hasOwnProperty(propertyKey)) {
          return originalMethod
        }

        let boundFn = originalMethod.bind(this)

        let analyticsWrappedMethod
        if (analyticsConstant) {
          let contextualProps = this.props
          Analytics.sendIntent(analyticsConstant, contextualProps)
          analyticsWrappedMethod = function (...args: any[]) {
            const resultPromise = boundFn.apply(this, args)
            resultPromise
              .then(() => {
                Analytics.sendSuccess(analyticsConstant, contextualProps)
              })
              .catch(error => {
                Analytics.sendFail(analyticsConstant, contextualProps, error)
                console.error("FAILED", error)
              })
            return resultPromise
          }.bind(this)
        }

        Object.defineProperty(this, propertyKey, {
          value: analyticsConstant ? analyticsWrappedMethod : boundFn,
          configurable: true,
          writable: true,
        })
        return analyticsConstant ? analyticsWrappedMethod : boundFn
      },
    }
    return newDescriptor
  }
}
