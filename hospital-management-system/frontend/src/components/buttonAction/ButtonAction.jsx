import React from "react";
import "./buttonAction.css";
import {
  FaUserPlus,
  FaUndo,
  FaUserEdit,
  FaUserTimes,
  FaUsers,
  FaTrash,
  FaTimes,
  FaSearch,
  FaArrowAltCircleRight,
  FaCheck,
  FaUserTie,
  FaUserInjured,
} from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
const iconComponents = {
  add: FaUserPlus,
  refresh: FaUndo,
  edit: FaUserEdit,
  close: FaTimes,
  all: FaUsers,
  delete: FaTrash,
  search: FaSearch,
  arrow: FaArrowAltCircleRight,
  valid: FaCheck,
  display: FcViewDetails,
  guardian: FaUserTie,
  sick: FaUserInjured,
};

const ButtonAction = ({ btnName, iconName, onClick, color, buttonType }) => {
  const IconComponent = iconComponents[iconName];

  if (!IconComponent) {
    return null;
  }

  return (
    <div className="btnAction" onClick={onClick}>
      <button type={buttonType}>
        <IconComponent size={35} color={color} />
        <p>{btnName}</p>
      </button>
    </div>
  );
};

export default ButtonAction;
