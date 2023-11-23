import React from "react";
import "./doctorMenu.css";
import { ButtonAction, ButtonSkip } from "../../../components";
import { useNavigate } from "react-router-dom";

const DoctorMenu = ({
  handleRefresh,
  handleAddDoctor,
  handleEditDoctor,
  handleDeleteDoctor,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/adminDashboard/dashboard");
  };
  const handleRefreshDetails = () => {
    handleRefresh();
  };
  const handleViewAll = () => {
    navigate("/vizDoctorD");
  };
  return (
    <div className="app__doctorMenu">
      <div className="app__doctorMenu-header">
        <ButtonSkip iconName="doubleLeft" color="green" />
        <ButtonSkip iconName="arrowLeft" color="blue" />
        <input type="text" placeholder="Record No" />
        <ButtonSkip iconName="arrowRight" color="blue" />
        <ButtonSkip iconName="doubleRight" color="green" />
      </div>
      <div className="app__doctorMenu-container">
        <ButtonAction
          iconName="add"
          btnName="Add"
          color="green"
          buttonType="submit"
          onClick={handleAddDoctor}
        />
        <ButtonAction
          iconName="edit"
          btnName="Edit"
          color="green"
          buttonType="submit"
          onClick={handleEditDoctor}
        />
        <ButtonAction
          iconName="delete"
          btnName="Delete"
          color="red"
          buttonType="button"
          onClick={handleDeleteDoctor}
        />
        <ButtonAction
          iconName="refresh"
          btnName="Refresh"
          color="blue"
          onClick={handleRefreshDetails}
        />
        <ButtonAction
          iconName="all"
          onClick={handleViewAll}
          btnName="View All"
          color="blue"
        />
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
