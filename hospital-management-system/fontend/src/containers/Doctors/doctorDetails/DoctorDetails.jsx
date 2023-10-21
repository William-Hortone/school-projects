import React, { useState } from "react";
import "./doctorDetails.css";
import DDetails from "../dDetails/DDetails";
import DoctorMenu from "../doctorMenu/DoctorMenu";

const DoctorDetails = () => {
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [refreshForm, setRefreshForm] = useState(false);

  const handleRefresh = () => {
    setRefreshForm(!refreshForm);
  };

  return (
    <div className="app__doctorDetails">
      <DDetails showSubmitBtn={showSubmitBtn} refreshForm={refreshForm} />
      <DoctorMenu
        setShowSubmitBtn={setShowSubmitBtn}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};

export default DoctorDetails;
