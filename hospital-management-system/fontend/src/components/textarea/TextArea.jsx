import React from "react";
import "./textArea.css";

const TextArea = ({ name, value, handleOnChange }) => {
  return (
    <div>
      <textarea
        id={name}
        name={name}
        value={value}
        cols="32"
        rows="5"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default TextArea;
