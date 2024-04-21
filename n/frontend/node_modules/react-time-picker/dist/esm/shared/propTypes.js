var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import PropTypes from 'prop-types';
var allViews = ['hour', 'minute', 'second'];
var allValueTypes = __spreadArray([], allViews, true);
var hourOptionalSecondsRegExp = /^(([0-1])?[0-9]|2[0-3]):[0-5][0-9](:([0-5][0-9]))?$/;
export var isTime = function isTime(props, propName, componentName) {
    var _a = props, _b = propName, time = _a[_b];
    if (time) {
        if (typeof time !== 'string' || !hourOptionalSecondsRegExp.test(time)) {
            return new Error("Invalid prop `".concat(propName, "` of type `").concat(typeof time, "` supplied to `").concat(componentName, "`, expected time in HH:mm(:ss) format."));
        }
    }
    // Everything is fine
    return null;
};
export var isValueType = PropTypes.oneOf(allValueTypes);
export var isRef = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
        current: PropTypes.any,
    }),
]);
export var rangeOf = function (type) {
    return PropTypes.arrayOf(type);
};
