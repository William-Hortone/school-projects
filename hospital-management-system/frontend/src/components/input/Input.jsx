import React from "react";
import "./input.css";

const Input = ({ placeholder, value, name, handleOnChange, inputDisabled }) => {
  return (
    <div className="app__input">
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleOnChange}
        required
        disabled={inputDisabled}
      />
    </div>
  );
};

export default Input;
