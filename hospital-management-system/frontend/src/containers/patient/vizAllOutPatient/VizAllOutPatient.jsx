import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllOutPatient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allOutPatients, setAllOutPatients] = useState([]);
  const navigate = useNavigate();

  // To Get all the out Patients
  const API_URL = "http://localhost:3001/getOutPatientsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOutPatients(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by patient ID
    if (searchOptions === "patientId") {
      const result = allOutPatients.filter(
        (patient) => patient.patientID === searchTerm
      );
      setSearchResult(result);
    }
    // search by the patient first Name
    else if (searchOptions === "firstName") {
      const result = allOutPatients.filter(
        (patient) => patient.firstName === searchTerm
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
    navigate("/adminDashboard/outPatient");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Out Patients Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Patient ID </th>
                  <th>First Name </th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Telephone</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allOutPatients.map((patient, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{patient.patientID}</td>
                        <td>{patient.firstName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.address}</td>
                        <td>{patient.telephone}</td>
                        <td>{patient.status}</td>
                        <td>{patient.notes}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((patient, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{patient.patientID}</td>
                        <td>{patient.firstName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.address}</td>
                        <td>{patient.telephone}</td>
                        <td>{patient.status}</td>
                        <td>{patient.notes}</td>
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
                  <option value="patientId">Patient ID</option>
                  <option value="firstName">First Name</option>
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

export default VizAllOutPatient;
