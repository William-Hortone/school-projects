import React from "react";
import "./adminDashboard.css";
import { Header } from "../../components";
import { Link, NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const activeLink = ({ isActive }) =>
    isActive ? "activeLink nav-link admin-category" : "nav-link admin-category";

  return (
    <div className="app__AdminDashboard">
      <Header />
      <div className="app__AdminDashboard-container">
        <aside className="app__AdminDashboard-container_nav">
          <ul className="container_nav-links">
            <NavLink to="/adminDashboard/dashboard" className={activeLink}>
              DashBoard
            </NavLink>
            <NavLink to="/adminDashboard/doctorD" className={activeLink}>
              Doctor Details
            </NavLink>
            <NavLink to="/adminDashboard/mServices" className={activeLink}>
              Medical Services
            </NavLink>
            <NavLink
              to="/adminDashboard/serviceSchedule"
              className={activeLink}
            >
              Service Scheduling
            </NavLink>
            <NavLink to="/adminDashboard/doctorApp" className={activeLink}>
              Doctor Appointments
            </NavLink>

            <NavLink to="/adminDashboard/rooms" className={activeLink}>
              Rooms Details
            </NavLink>

            <NavLink to="/adminDashboard/wardDetails" className={activeLink}>
              Ward Details
            </NavLink>
            <NavLink to="/adminDashboard/addUser" className={activeLink}>
              Add User
            </NavLink>
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