import React from "react";
import "./homeAdmin.css";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <div className="app__homeAdmin">
      <div className="app__homeAdmin-container">
        <Link to="/doctorD" className="admin-category">
          <p>Doctor Details</p>
        </Link>
        <Link to="/vDoctorD" className="admin-category">
          <p>View Doctor Details</p>
        </Link>
        <Link to="/mServices" className="admin-category">
          <p>Medical Services</p>
        </Link>
        <Link to="/vHospitalSD" className="admin-category">
          <p>View hospital services details</p>
        </Link>
      </div>
    </div>
  );
};

export default HomeAdmin;
