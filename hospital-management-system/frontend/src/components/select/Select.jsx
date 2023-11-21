import React from "react";
import "./select.css";

const Select = ({
  options,
  defaultOptionValue,
  value,
  name,
  handleOnChange,
}) => {
  return (
    <div>
      <select
        className="select-box"
        name={name}
        id={name}
        value={value}
        onChange={handleOnChange}
      >
        <option value="">{defaultOptionValue}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
