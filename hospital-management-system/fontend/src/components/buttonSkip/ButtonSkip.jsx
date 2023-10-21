import React from "react";
import "./buttonSkip.css";
import {
  FaAngleRight,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";

const iconComponents = {
  arrowRight: FaAngleRight,
  arrowLeft: FaAngleLeft,
  doubleRight: FaAngleDoubleRight,
  doubleLeft: FaAngleDoubleLeft,
};

const ButtonSkip = ({ iconName, color }) => {
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) {
    // Handle the case when an invalid iconName is provided
    return null;
  }
  return (
    <div className="btnSkip">
      <IconComponent size={20} color={color} />
    </div>
  );
};

export default ButtonSkip;
