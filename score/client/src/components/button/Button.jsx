import React from "react";
import "./button.css";
const Button = ({ onClick, text, type }) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {text}
    </button>
  );
};

export default Button;
