"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeOf = exports.isRef = exports.isValueType = exports.isTime = void 0;
var prop_types_1 = __importDefault(require("prop-types"));
var allViews = ['hour', 'minute', 'second'];
var allValueTypes = __spreadArray([], allViews, true);
var hourOptionalSecondsRegExp = /^(([0-1])?[0-9]|2[0-3]):[0-5][0-9](:([0-5][0-9]))?$/;
var isTime = function isTime(props, propName, componentName) {
    var _a = props, _b = propName, time = _a[_b];
    if (time) {
        if (typeof time !== 'string' || !hourOptionalSecondsRegExp.test(time)) {
            return new Error("Invalid prop `".concat(propName, "` of type `").concat(typeof time, "` supplied to `").concat(componentName, "`, expected time in HH:mm(:ss) format."));
        }
    }
    // Everything is fine
    return null;
};
exports.isTime = isTime;
exports.isValueType = prop_types_1.default.oneOf(allValueTypes);
exports.isRef = prop_types_1.default.oneOfType([
    prop_types_1.default.func,
    prop_types_1.default.exact({
        current: prop_types_1.default.any,
    }),
]);
var rangeOf = function (type) {
    return prop_types_1.default.arrayOf(type);
};
exports.rangeOf = rangeOf;
