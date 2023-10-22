import React, { useState } from "react";
import "./vizDoctorDetails.css";
import { ButtonAction } from "../../../components";

const VizDoctorDetails = ({ doctors, setDoctors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const handleSearchDoctor = () => {
    console.log("handleSearchDoctor");
  };

  const handleRefresh = () => {
    setHideDada(false);
    setHideDataSearched(false);
  };
  const handleSearch = () => {
    if (searchOptions === "doctorName") {
      const result = doctors.filter((doctor) => doctor.doctorFN === searchTerm);
      setSearchResult(result);
    } else if (searchOptions === "doctorId") {
      const result = doctors.filter((doctor) => doctor._id === searchTerm);
      setSearchResult(result);
    }
    setHideDada(true);

    setHideDataSearched(true);
  };

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
              {!hideData &&
                doctors.map((doctor, index) => {
                  return (
                    <tr className="doctor-infos" key={index}>
                      <td>{doctor._id}</td>
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
              {hideDataSearched &&
                searchResult.map((doctor, index) => {
                  return (
                    <tr className="doctor-infos" key={index}>
                      <td>{doctor._id}</td>
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

        <div className="app__vDoctorDetails-container-btn">
          <div className="container-btn">
            <ButtonAction
              iconName="search"
              btnName="Search"
              color="green"
              onClick={handleSearch}
            />
            <ButtonAction
              iconName="search"
              btnName="Refresh"
              color="blue"
              onClick={handleRefresh}
            />
            <ButtonAction
              iconName="close"
              btnName="Close"
              color="red"
              onClick={handleSearchDoctor}
            />
            {/* <ButtonAction
              iconName="search"
              btnName="Search"
              color="green"
              onClick={handleSearchDoctor}
            /> */}
          </div>
          <div className="container-inputs">
            <div className="content">
              <label htmlFor="searchOptions">Search For</label>
              <select
                name="searchOptions"
                id="searchOptions"
                onChange={(e) => setSearchOptions(e.target.value)}
              >
                <option value="doctorId">Doctor Id</option>
                <option value="doctorName">Doctor Name</option>
              </select>
            </div>
            <div className="content">
              <label htmlFor="">Search text</label>
              <input
                type="text"
                placeholder="Search text"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* <button onClick={handleSearch}>Search</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VizDoctorDetails;
