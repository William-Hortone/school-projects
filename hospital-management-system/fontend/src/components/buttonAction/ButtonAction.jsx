import React from "react";
import "./buttonAction.css";

const ButtonAction = ({ btnName, onClick }) => {
  return (
    <div className="btnAction" onClick={onClick}>
      <p>{btnName}</p>
    </div>
  );
};

export default ButtonAction;
