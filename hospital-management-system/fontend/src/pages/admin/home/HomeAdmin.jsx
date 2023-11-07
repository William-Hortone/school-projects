import React from "react";
import "./homeAdmin.css";
import { Link } from "react-router-dom";
import { Header } from "../../../components";

const HomeAdmin = () => {
  return (
    <div className="app__homeAdmin">
      <Header />
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
        <Link to="/vHospital" className="admin-category">
          View hospital services details
        </Link>
        <Link to="/doctorApp" className="admin-category">
          Doctor Appointments
        </Link>
        <Link to="/serviceSchedule" className="admin-category">
          Service Scheduling
        </Link>
      </div>
    </div>
  );
};

export default HomeAdmin;
