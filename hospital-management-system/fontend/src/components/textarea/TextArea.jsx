import React from "react";
import "./textArea.css";

const TextArea = ({ name, value, handleOnChange }) => {
  return (
    <div>
      <textarea
        style={{ padding: "5px" }}
        id={name}
        name={name}
        value={value}
        cols="38"
        rows="7"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default TextArea;
