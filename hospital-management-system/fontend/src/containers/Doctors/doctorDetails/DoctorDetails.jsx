import React, { useState } from "react";
import "./doctorDetails.css";
import DDetails from "../dDetails/DDetails";
import DoctorMenu from "../doctorMenu/DoctorMenu";

const DoctorDetails = () => {
  // const handleAddMedicalServices = (e) => {
  //   e.preventDefault();

  //   if (
  //     input.serviceName === "" ||
  //     input.amount === "" ||
  //     input.duration === "" ||
  //     input.additionalNotes === ""
  //   ) {
  //     toast.error("Please complete the fields");
  //   } else {
  //     axios
  //       .post("http://localhost:3001/medicalServices", input)
  //       .then((res) => {
  //         toast.success("Saved Successfully");
  //         console.log(res);
  //       })
  //       .catch((err) => toast.error(err));
  //   }
  //   setAddMedical(true);
  // };

  return (
    <div className="app__doctorDetails">
      <DDetails />
      {/* <DoctorMenu
        setShowSubmitBtn={setShowSubmitBtn}
        handleRefresh={handleRefresh}
      /> */}
    </div>
  );
};

export default DoctorDetails;
