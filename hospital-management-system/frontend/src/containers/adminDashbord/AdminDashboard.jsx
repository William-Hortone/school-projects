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
                title="Hospital Services"
                title1="Medical Services"
                title2="Service Scheduling"
                title3="Cancel Service App."
                link1="/adminDashboard/mServices"
                link2="/adminDashboard/serviceSchedule"
                link3="/adminDashboard/cancelServiceApp"
              />

              <ButtonMenu
                setShowList={setShowList}
                title="Out Patients"
                title1="Out Patient Details"
                title2="Out Patient Treatment"
                // title3="Cancel Doctor App."
                link1="/adminDashboard/outPatient"
                link2="/adminDashboard/outPTreatment"
                // link3="/adminDashboard/cancelServiceApp"
              />
              <ButtonMenu
                setShowList={setShowList}
                title="In Patients"
                title1="In Patient Details"
                title2="Add Guardian"
                title3="Patient Admission"
                title4="Doctor Visit"
                title5="In Patient M. Issue"
                title6="Medicine ORder"
                link1="/adminDashboard/inPatients"
                link2="/adminDashboard/addGuardian"
                link3="/adminDashboard/admission"
                link4="/adminDashboard/visit"
                link5="/adminDashboard/inPMI"
                link6="/adminDashboard/medicineOrder"
              />
              <ButtonMenu
                setShowList={setShowList}
                title="Suppliers"
                title1="Supplier Details"
                // title2="Add Guardian"
                // title3="Patient Admission"
                link1="/adminDashboard/supplier"
                // link2="/adminDashboard/addGuardian"
                // link3="/adminDashboard/admission"
              />
              <ButtonMenu
                setShowList={setShowList}
                title="Medicine"
                title1="Medicine Category"
                title2="Add Medicine"
                title3="Purchase Order"
                link1="/adminDashboard/medicineCategory"
                link2="/adminDashboard/medicine"
                link3="/adminDashboard/purchaseOrder"
              />
              {/* <ButtonMenu
                setShowList={setShowList}
                title="Admission"
                title1="In Patient Details"
                title2="Add Guardian"
                // title3="Cancel Doctor App."
                link1="/adminDashboard/admission"
                link2="/adminDashboard/addGuardian"
                // link3="/adminDashboard/cancelServiceApp"
              /> */}

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
              {/* <NavLink to="/adminDashboard/outPatient" className={activeLink}>
                Out Patient
              </NavLink> */}
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
