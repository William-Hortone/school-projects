import React from "react";
import "./input.css";

const Input = ({ placeholder, inputName }) => {
  return (
    <div className="app__input">
      <input type="text" placeholder={placeholder} name={inputName} />
    </div>
  );
};

export default Input;
