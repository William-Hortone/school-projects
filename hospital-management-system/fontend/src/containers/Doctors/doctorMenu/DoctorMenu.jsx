import React from "react";
import "./doctorMenu.css";
import { ButtonAction, ButtonSkip } from "../../../components";

const DoctorMenu = () => {
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
        <ButtonAction btnName="Add" />
        <ButtonAction btnName="Edit" />
        <ButtonAction btnName="Delete" />
        <ButtonAction btnName="Refresh" />
        <ButtonAction btnName="View All" />
        <ButtonAction btnName="Close" />
      </div>
    </div>
  );
};

export default DoctorMenu;
