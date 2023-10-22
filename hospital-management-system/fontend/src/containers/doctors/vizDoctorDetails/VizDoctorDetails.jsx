import React from "react";
import "./vizDoctorDetails.css";

const VizDoctorDetails = ({ doctors }) => {
  return (
    <div>
      <div className="app__vDoctorDetails">
        <h1>View Doctor Details</h1>

        <div className="app__vDoctorDetails-container">
          <table>
            <thead>
              <tr>
                <th>DoctorID </th>
                <th>DoctorFN</th>
                <th>NicNo</th>
                <th>DoctorLN</th>
                <th>HomePhone</th>
                <th>MobilePhone</th>
                <th>Qualifications</th>
                <th>Specialization</th>
                <th>VisitingCharge</th>
                <th>ChannelingCharge</th>
                <th>BasicSalary</th>
                <th>Sex</th>
                <th>DoctorType</th>
                <th>DoctorAddress</th>
                <th>DoctorNotes</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => {
                return (
                  <tr className="doctor-infos" key={index}>
                    <td>{doctor.doctorID}</td>
                    <td>{doctor.doctorFN}</td>
                    <td>{doctor.nicNo}</td>
                    <td>{doctor.doctorLN}</td>
                    <td>{doctor.homePhone}</td>
                    <td>{doctor.mobilePhone}</td>
                    <td>{doctor.Qualifications}</td>
                    <td>{doctor.Specialization}</td>
                    <td>{doctor.VisitingCharge}</td>
                    <td>{doctor.ChannelingCharge}</td>
                    <td>{doctor.basicSalary}</td>
                    <td>{doctor.sex}</td>
                    <td>{doctor.doctorType}</td>
                    <td>{doctor.doctorAddress}</td>
                    <td>{doctor.doctorNotes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VizDoctorDetails;
