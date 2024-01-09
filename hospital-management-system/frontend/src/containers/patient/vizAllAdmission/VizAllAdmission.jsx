import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllAdmissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allAdmissions, setAllAdmissions] = useState([]);
  const navigate = useNavigate();

  // To Get all the available getGuardian
  const API_URL = "http://localhost:3001/getAdmissionDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllAdmissions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the guardian ID
    if (searchOptions === "guardianID") {
      const result = allAdmissions.filter(
        (guardian) => guardian.guardianID === searchTerm
      );
      setSearchResult(result);
    }
    // search by the patientId
    else if (searchOptions === "patientId") {
      const result = allAdmissions.filter(
        (guardian) => guardian.patientID === searchTerm
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
    navigate("/adminDashboard/admission");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Admission Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>admissionID </th>
                  <th>patientID </th>
                  <th>doctorID</th>
                  <th>guardianID </th>
                  <th>admissionDate</th>
                  <th>admissionTime</th>
                  <th>bedID</th>
                  <th>bedPlace</th>
                  <th>emergency</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allAdmissions.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.admissionID}</td>
                        <td>{guardian.patientID}</td>
                        <td>{guardian.doctorID}</td>
                        <td>{guardian.guardianID}</td>
                        <td>{guardian.admissionDate}</td>
                        <td>{guardian.admissionTime}</td>
                        <td>{guardian.bedID}</td>
                        <td>{guardian.bedPlace}</td>
                        <td>{guardian.emergency}</td>
                        {/* <td>{guardian.address}</td> */}
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.guardianID}</td>
                        <td>{guardian.firstName}</td>
                        <td>{guardian.lastName}</td>
                        <td>{guardian.patientID}</td>
                        <td>{guardian.occupation}</td>
                        <td>{guardian.telephone}</td>
                        <td>{guardian.nicNumber}</td>
                        <td>{guardian.relationShip}</td>
                        <td>{guardian.homePhone}</td>
                        <td>{guardian.address}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* container buttons */}
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
                  <option value="guardianID">Guardian ID</option>
                  <option value="patientId">Patient ID</option>
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

export default VizAllAdmissions;
