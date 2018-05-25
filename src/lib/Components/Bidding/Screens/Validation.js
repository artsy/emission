"use strict";
exports.__esModule = true;
exports.composeValidator = function (rule, msg) { return function (val) {
    if (!rule(val)) {
        return msg;
    }
}; };
// Rules
var validateEmail = function (val) { return val.indexOf("@") !== -1; };
var validateRequired = function (val) { return val.length > 0; };
var validateNumber = function (val) { return Number.isNaN(Number.parseFloat(val)); };
var validateInt = function (val) { return Number.isNaN(Number.parseInt(val)); };
var validateMinLength = function (min) { return function (val) { return val.length >= min; }; };
// Validators from Functions
exports.isRequired = function (message) {
    if (message === void 0) { message = "Required"; }
    return exports.composeValidator(validateRequired, message);
};
exports.isEmail = function (msg) {
    if (msg === void 0) { msg = "Valid Email Required"; }
    return exports.composeValidator(validateEmail, msg);
};
exports.isNumber = function (msg) {
    if (msg === void 0) { msg = "Number Required"; }
    return exports.composeValidator(validateNumber, msg);
};
exports.isInt = function (msg) {
    if (msg === void 0) { msg = "Integer Required"; }
    return exports.composeValidator(validateInt, msg);
};
exports.isMinLength = function (min, msg) {
    return exports.composeValidator(validateMinLength(min), msg || "Min Length " + min + " required");
};
// export const validateField = (name, values, schema) => {
//   const validators = schema[name]
// }
var Validation = /** @class */ (function () {
    function Validation(schema) {
        var _this = this;
        this.validate = function (inputs) {
            return Object.keys(_this.schema).reduce(function (errors, key) {
                var errorMessage;
                var validators = _this.schema[key];
                var value = inputs[key];
                for (var _i = 0, _a = Object.keys(validators); _i < _a.length; _i++) {
                    var i = _a[_i];
                    var validator = validators[i];
                    var res = validator(value);
                    if (res) {
                        errorMessage = res;
                        break;
                    }
                }
                if (errorMessage) {
                    console.log(errorMessage);
                    errors[key] = errorMessage;
                }
                return errors;
            }, {});
        };
        this.schema = schema;
    }
    return Validation;
}());
exports.Validation = Validation;
var data = { name: "", age: "27", occupation: "crime", email: "someone.com" };
var rules = {
    name: [exports.isRequired()],
    age: [exports.isRequired("This should be an age")],
    email: [exports.isRequired(), exports.isEmail()]
};
var result = new Validation(rules).validate(data);
console.log(data);
console.log(result);
