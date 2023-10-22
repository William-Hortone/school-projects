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

const ButtonAction = ({ btnName, iconName, onClick, color }) => {
  const IconComponent = iconComponents[iconName];

  if (!IconComponent) {
    return null;
  }

  return (
    <div className="btnAction" onClick={onClick}>
      <IconComponent size={24} color={color} />

      <p>{btnName}</p>
    </div>
  );
};

export default ButtonAction;
