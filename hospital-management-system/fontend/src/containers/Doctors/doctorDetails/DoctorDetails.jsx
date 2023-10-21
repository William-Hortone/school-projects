import React from "react";
import "./doctorDetails.css";
import DDetails from "../dDetails/DDetails";
import DoctorMenu from "../doctorMenu/DoctorMenu";

const DoctorDetails = () => {
  return (
    <div className="app__doctorDetails">
      <DDetails />
      <DoctorMenu />
    </div>
  );
};

export default DoctorDetails;
