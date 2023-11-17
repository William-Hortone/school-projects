import React, { useEffect } from "react";
import "./dashboard.css";
import { selectDoctorDetails } from "../../redux/slice/doctorSlice";
import { useSelector } from "react-redux";
import user from "../../assets/user.jpg";

const Dashboard = () => {
  const doctorDetails = useSelector(selectDoctorDetails);
  useEffect(() => {
    console.log(doctorDetails);
  }, [doctorDetails]);
  return (
    <div className="app__dashboard">
      <h2 className="page-title">ADMIN DASHBOARD</h2>
      <div className="app__dashboard-container">
        <div className="app__dashboard-container-left">
          <div className="container-left_box">
            <div className="container_content">
              <div className="container_content-header">
                <h4>Heart Surgeries</h4>
              </div>
            </div>
            <div className="container_content">
              <div className="container_content-header">
                <h4>Heart Surgeries</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="app__dashboard-container-right">
          <div className="container_content">
            <div className="container_content-header">
              <h4>Heart Surgeries</h4>
            </div>
          </div>
          <div className="container_content">
            <div className="container_content-header header-infos">
              <h4>Doctors </h4>
              <span> View All</span>
            </div>

            <div>
              {doctorDetails.map((doctor) => (
                <div key={doctor.doctorID} className="content-details">
                  <div className="content-details-img">
                    <img src={user} alt="photo" />
                  </div>
                  <h4>{doctor.doctorFN}</h4>
                  <p>{doctor.doctorID}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
