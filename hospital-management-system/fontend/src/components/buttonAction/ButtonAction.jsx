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
} from "react-icons/fa";

const iconComponents = {
  add: FaUserPlus,
  refresh: FaUndo,
  edit: FaUserEdit,
  close: FaTimes,
  all: FaUsers,
  delete: FaTrash,
  search: FaSearch,
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
