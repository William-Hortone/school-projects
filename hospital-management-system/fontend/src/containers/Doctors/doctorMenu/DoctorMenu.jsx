import React, { useRef, useState } from "react";
import "./doctorMenu.css";
import { ButtonAction, ButtonSkip } from "../../../components";
import { useNavigate } from "react-router-dom";

const DoctorMenu = ({ setShowSubmitBtn, handleRefresh }) => {
  const navigate = useNavigate();
  const handleAddDoctor = () => {
    setShowSubmitBtn(true);
  };
  const handleClose = () => {
    setShowSubmitBtn(false);
    navigate("/");
  };
  const handleRefreshDetails = () => {
    setShowSubmitBtn(false);
    handleRefresh();
  };
  return (
    <div className="app__doctorMenu">
      <div className="app__doctorMenu-header">
        <ButtonSkip iconName="doubleLeft" color="green" />
        <ButtonSkip iconName="arrowLeft" color="blue" />
        <input type="text" placeholder="Record No" value="Record: 10" />
        <ButtonSkip iconName="arrowRight" color="blue" />
        <ButtonSkip iconName="doubleRight" color="green" />
      </div>
      <div className="app__doctorMenu-container">
        <ButtonAction
          iconName="add"
          btnName="Add"
          color="green"
          onClick={handleAddDoctor}
        />
        <ButtonAction iconName="edit" btnName="Edit" color="green" />
        <ButtonAction iconName="delete" btnName="Delete" color="red" />
        <ButtonAction
          iconName="refresh"
          btnName="Refresh"
          color="blue"
          onClick={handleRefreshDetails}
        />
        <ButtonAction iconName="all" btnName="View All" color="blue" />
        <ButtonAction
          iconName="close"
          btnName="Close"
          color="red"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default DoctorMenu;
