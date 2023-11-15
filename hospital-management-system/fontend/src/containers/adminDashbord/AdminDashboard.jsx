import React from "react";
import "./adminDashboard.css";
import { Header } from "../../components";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="app__AdminDashboard">
      <Header />
      <div className="app__AdminDashboard-container">
        <aside className="app__AdminDashboard-container_nav">
          <ul className="container_nav-links">
            {/* <Link to="/adminDashboard/doctorD" className="nav-link">
              Doctor Details
            </Link>
            <Link to="/adminDashboard/mServices" className="nav-link">
              Medical Services
            </Link>
            <Link to="/adminDashboard/doctorApp" className="nav-link">
              Doctor Appointments
            </Link>
            <Link to="/adminDashboard/serviceSchedule" className="nav-link">
              Service Scheduling
            </Link> */}
            {/* <Link className="nav-link admin-category">Doctor Details</Link> */}
            {/* <Link className="nav-link admin-category">Medical Services</Link> */}
            {/* <Link className="nav-link admin-category">Doctor Appointments</Link> */}
            {/* <Link className="nav-link admin-category">Service Scheduling</Link> */}
            <Link
              to="/adminDashboard/doctorD"
              className="nav-link admin-category"
            >
              Doctor Details
            </Link>
            <Link
              to="/adminDashboard/mServices"
              className="nav-link admin-category"
            >
              Medical Services
            </Link>
            <Link
              to="/adminDashboard/serviceSchedule"
              className="nav-link admin-category"
            >
              Service Scheduling
            </Link>
            <Link
              to="/adminDashboard/doctorApp"
              className="nav-link admin-category"
            >
              Doctor Appointments
            </Link>

            <Link
              to="/adminDashboard/rooms"
              className="nav-link admin-category"
            >
              Rooms Details
            </Link>

            <Link
              to="/adminDashboard/wardDetails"
              className="nav-link admin-category"
            >
              Ward Details
            </Link>
          </ul>
        </aside>
        <div className="app__AdminDashboard-container_wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
