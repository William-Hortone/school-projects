import { useState } from "react";
import "./vizDoctorDetails.css";
import { ButtonAction, Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { selectDoctorDetails } from "../../../redux/slice/doctorSlice";
import { useSelector } from "react-redux";

const VizDoctorDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const navigate = useNavigate();
  const doctorDetails = useSelector(selectDoctorDetails);

  // Function to search
  const handleSearch = () => {
    // search by the first name
    if (searchOptions === "doctorName") {
      const result = doctorDetails.filter(
        (doctor) => doctor.doctorFN === searchTerm
      );
      setSearchResult(result);
    }
    // search by the ID
    else if (searchOptions === "doctorId") {
      const result = doctorDetails.filter(
        (doctor) => doctor.doctorID === searchTerm
      );
      setSearchResult(result);
    }
    setHideDada(true);
    setHideDataSearched(true);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setHideDada(false);
    setHideDataSearched(false);
  };
  const handleClose = () => {
    navigate("/adminDashboard/doctorD");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
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
                  doctorDetails.map((doctor, index) => {
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
                {hideDataSearched &&
                  searchResult.map((doctor, index) => {
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

          <div className="app__vDoctorDetails-container-btn">
            <div className="container-btn">
              <ButtonAction
                iconName="search"
                btnName="Search"
                color="green"
                onClick={handleSearch}
              />
              <ButtonAction
                iconName="refresh"
                btnName="Refresh"
                color="blue"
                onClick={handleRefresh}
              />
              <ButtonAction
                iconName="close"
                btnName="Close"
                color="red"
                onClick={handleClose}
              />
            </div>
            <div className="container-inputs">
              <div className="content">
                <label htmlFor="searchOptions">Search For</label>
                <select
                  name="searchOptions"
                  id="searchOptions"
                  onChange={(e) => setSearchOptions(e.target.value)}
                >
                  <option value="">Select one option</option>
                  <option value="doctorId">Doctor Id</option>
                  <option value="doctorName">Doctor Name</option>
                </select>
              </div>
              <div className="content">
                <label htmlFor="">Search text</label>
                <input
                  type="text"
                  placeholder="Search text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VizDoctorDetails;
