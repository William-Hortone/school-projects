import React from "react";
import "./homeAdmin.css";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <div className="app__homeAdmin">
      <div className="app__homeAdmin-container">
        <Link to="/doctorD" className="admin-category">
          Doctor Details
        </Link>
        <Link to="/vizDoctorD" className="admin-category">
          VizDoctorDetails
        </Link>
        <Link to="/mServices" className="admin-category">
          Medical Services
        </Link>
        <Link to="/vHospitalS" className="admin-category">
          View hospital services details
        </Link>
      </div>
    </div>
  );
};

export default HomeAdmin;
