interface InputStrings {
  [everyProp: string]: string
}

type ValidationRule = (val: string) => boolean
type Errors<Inputs> = Partial<{ [P in keyof Inputs]: string }>
type Validator = (val: string) => string | void
type ValidatorWithDefault = (msg?: string) => Validator

type ValidationSchema<Inputs> = Partial<{ [P in keyof Inputs]: Validator[] }>

export const composeValidator: (rule: ValidationRule, msg: string) => Validator = (rule, msg) => val => {
  if (!rule(val)) {
    return msg
  }
}

// Rules
const validateEmail: ValidationRule = val => val.indexOf("@") !== -1
const validateRequired: ValidationRule = val => val.length > 0

// Validators from Functions
export const isRequired: ValidatorWithDefault = (message = "Required") => composeValidator(validateRequired, message)
export const isEmail: ValidatorWithDefault = (msg = "Valid Email Required") => composeValidator(validateEmail, msg)

const rules = {
  name: [isRequired()],
  age: [isRequired("This should be an age")],
  email: [isRequired(), isEmail()],
}

// export const validateField = (name, values, schema) => {
//   const validators = schema[name]
// }
export class Foo<I extends InputStrings> {
  public schema: ValidationSchema<I>
  constructor(schema: ValidationSchema<I>) {
    this.schema = schema
  }

  validate: (inputs: I) => Errors<I> = inputs => {
    return Object.keys(this.schema).reduce((errors, key) => {
      let errorMessage
      const validators = this.schema[key]
      const value = inputs[key]
      for (const i of Object.keys(validators)) {
        const validator = validators[i]
        const res = validator(value)
        if (res) {
          errorMessage = res
          break
        }
      }
      if (errorMessage) {
        console.log(errorMessage)
        errors[key] = errorMessage
      }
      return errors
    }, {})
  }
}

const result = new Foo(rules).validate({ name: "", age: "27", occupation: "crime", email: "someone.com" })

console.log(result)
