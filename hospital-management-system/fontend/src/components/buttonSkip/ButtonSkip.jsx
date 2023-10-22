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

const ButtonSkip = ({ iconName, color }) => {
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) {
    return null;
  }
  return (
    <div className="btnSkip">
      <IconComponent size={20} color={color} />
    </div>
  );
};

export default ButtonSkip;
