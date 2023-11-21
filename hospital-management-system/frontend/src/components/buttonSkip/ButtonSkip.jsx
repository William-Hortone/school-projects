import React from "react";
import "./buttonSkip.css";
import {
  FaAngleRight,
  FaAngleLeft,
  FaFastForward,
  FaFastBackward,
} from "react-icons/fa";

const iconComponents = {
  arrowRight: FaAngleRight,
  arrowLeft: FaAngleLeft,
  doubleRight: FaFastForward,
  doubleLeft: FaFastBackward,
};

const ButtonSkip = ({ iconName, color, handleOnClick }) => {
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) {
    return null;
  }
  return (
    <div onClick={handleOnClick} className="btnSkip">
      <IconComponent size={20} color={color} />
    </div>
  );
};

export default ButtonSkip;
