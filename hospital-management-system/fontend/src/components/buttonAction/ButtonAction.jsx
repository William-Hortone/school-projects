import React from "react";
import "./buttonAction.css";

const ButtonAction = ({ btnName }) => {
  return (
    <div className="btnAction">
      <p>{btnName}</p>
    </div>
  );
};

export default ButtonAction;
