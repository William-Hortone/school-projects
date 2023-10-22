import React from "react";
import "./textArea.css";

const TextArea = ({ name, value, handleOnChange }) => {
  return (
    <div>
      <textarea
        id={name}
        name={name}
        value={value}
        cols="39"
        rows="7"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default TextArea;
