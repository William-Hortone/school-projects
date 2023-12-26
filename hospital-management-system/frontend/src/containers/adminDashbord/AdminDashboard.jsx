import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ButtonMenu, Header } from "../../components";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [showList, setShowList] = useState(false);
  const activeLink = ({ isActive }) =>
    isActive
      ? "activeSection nav-link admin-category"
      : "nav-link admin-category";

  return (
    <div className="app__AdminDashboard">
      <Header />
      <div className="app__AdminDashboard-container">
        <aside className="app__AdminDashboard-container_nav">
          <div className="app__AdminDashboard-wrapper">
            <ul className="container_nav-links">
              <NavLink to="/adminDashboard/dashboard" className={activeLink}>
                DashBoard
              </NavLink>

              <ButtonMenu
                setShowList={setShowList}
                initialShowList="false"
                title="Doctors"
                title1="Doctor Details"
                title2="Doctor Schedule"
                title3="Cancel Doctor App."
                link1="/adminDashboard/doctorD"
                link2="/adminDashboard/doctorApp"
                link3="/adminDashboard/cancelDocApp"
              />

              <ButtonMenu
                setShowList={setShowList}
                initialShowList="false"
                title="Hospital Services"
                title1="Medical Services"
                title2="Service Scheduling"
                title3="Cancel Doctor App."
                link1="/adminDashboard/mServices"
                link2="/adminDashboard/serviceSchedule"
                // link3=""
              />
              {/* <NavLink to="/adminDashboard/doctorD" className={activeLink}>
                Doctor Details
              </NavLink> */}
              {/* <NavLink to="/adminDashboard/mServices" className={activeLink}>
                Medical Services
              </NavLink> */}
              {/* <NavLink
                to="/adminDashboard/serviceSchedule"
                className={activeLink}
              >
                Service Scheduling
              </NavLink> */}
              {/* <NavLink to="/adminDashboard/doctorApp" className={activeLink}>
                Doctor Appointments
              </NavLink> */}

              <NavLink to="/adminDashboard/rooms" className={activeLink}>
                Rooms Details
              </NavLink>

              <NavLink to="/adminDashboard/wardDetails" className={activeLink}>
                Ward Details
              </NavLink>
              <NavLink to="/adminDashboard/addUser" className={activeLink}>
                Add User
              </NavLink>
              <NavLink to="/adminDashboard/bedDetails" className={activeLink}>
                Add Bed
              </NavLink>
              <NavLink to="/adminDashboard/outPatient" className={activeLink}>
                Out Patient
              </NavLink>
              {/* <NavLink to="/adminDashboard/cancelDocApp" className={activeLink}>
                Cancel Doctor A.
              </NavLink> */}
              {/* <NavLink to="/adminDashboard/outPatient" className={activeLink}>
                Out Patient
              </NavLink> */}
              {/* <NavLink to="/adminDashboard/wardDetails" className={activeLink}>
                Ward Details
              </NavLink>
              <NavLink to="/adminDashboard/addUser" className={activeLink}>
                Add User
              </NavLink>
              <NavLink to="/adminDashboard/bedDetails" className={activeLink}>
                Add Bed
              </NavLink>
              <NavLink to="/adminDashboard/outPatient" className={activeLink}>
                Out Patient
              </NavLink> */}
            </ul>
          </div>
        </aside>

        <div className="app__AdminDashboard-container_wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
