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
        <ButtonSkip btnName="First One" />
        <ButtonSkip btnName="Preview" />
        <input type="text" placeholder="Record No" value="Record: 10" />
        <ButtonSkip btnName="Last One" />
        <ButtonSkip btnName="Next" />
      </div>
      <div className="app__doctorMenu-container">
        <ButtonAction btnName="Add" onClick={handleAddDoctor} />
        <ButtonAction btnName="Edit" />
        <ButtonAction btnName="Delete" />
        <ButtonAction btnName="Refresh" onClick={handleRefreshDetails} />
        <ButtonAction btnName="View All" />
        <ButtonAction btnName="Close" onClick={handleClose} />
      </div>
    </div>
  );
};

export default DoctorMenu;
