import React from 'react';
import clsx from 'clsx';
import { getHours } from '@wojtekmaj/date-utils';
import { convert24to12 } from '../shared/dates.js';
import { getAmPmLabels } from '../shared/utils.js';
export default function AmPm(_a) {
    var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, locale = _a.locale, maxTime = _a.maxTime, minTime = _a.minTime, onChange = _a.onChange, onKeyDown = _a.onKeyDown, required = _a.required, value = _a.value;
    var amDisabled = minTime ? convert24to12(getHours(minTime))[1] === 'pm' : false;
    var pmDisabled = maxTime ? convert24to12(getHours(maxTime))[1] === 'am' : false;
    var name = 'amPm';
    var _b = getAmPmLabels(locale), amLabel = _b[0], pmLabel = _b[1];
    return (React.createElement("select", { "aria-label": ariaLabel, autoFocus: autoFocus, className: clsx("".concat(className, "__input"), "".concat(className, "__").concat(name)), "data-input": "true", "data-select": "true", disabled: disabled, name: name, onChange: onChange, onKeyDown: onKeyDown, ref: inputRef, required: required, value: value !== null ? value : '' },
        !value && React.createElement("option", { value: "" }, "--"),
        React.createElement("option", { disabled: amDisabled, value: "am" }, amLabel),
        React.createElement("option", { disabled: pmDisabled, value: "pm" }, pmLabel)));
}
