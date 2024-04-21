"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var date_utils_1 = require("@wojtekmaj/date-utils");
function NativeInput(_a) {
    var ariaLabel = _a.ariaLabel, disabled = _a.disabled, maxTime = _a.maxTime, minTime = _a.minTime, name = _a.name, onChange = _a.onChange, required = _a.required, value = _a.value, valueType = _a.valueType;
    var nativeValueParser = (function () {
        switch (valueType) {
            case 'hour':
                return function (receivedValue) { return "".concat((0, date_utils_1.getHours)(receivedValue), ":00"); };
            case 'minute':
                return date_utils_1.getHoursMinutes;
            case 'second':
                return date_utils_1.getHoursMinutesSeconds;
            default:
                throw new Error('Invalid valueType');
        }
    })();
    var step = (function () {
        switch (valueType) {
            case 'hour':
                return 3600;
            case 'minute':
                return 60;
            case 'second':
                return 1;
            default:
                throw new Error('Invalid valueType');
        }
    })();
    function stopPropagation(event) {
        event.stopPropagation();
    }
    return (react_1.default.createElement("input", { "aria-label": ariaLabel, disabled: disabled, hidden: true, max: maxTime ? nativeValueParser(maxTime) : undefined, min: minTime ? nativeValueParser(minTime) : undefined, name: name, onChange: onChange, onFocus: stopPropagation, required: required, step: step, style: {
            visibility: 'hidden',
            position: 'absolute',
            zIndex: '-999',
        }, type: "time", value: value ? nativeValueParser(value) : '' }));
}
exports.default = NativeInput;
