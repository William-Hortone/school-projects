import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllVisits = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allVisits, setAllVisit] = useState([]);
  const navigate = useNavigate();

  // To Get all the available getGuardian
  const API_URL = "http://localhost:3001/getVisitDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllVisit(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the supplier ID
    if (searchOptions === "visitID") {
      const result = allVisits.filter((visit) => visit.visitID === searchTerm);
      setSearchResult(result);
    }
    // search by the patientId
    else if (searchOptions === "patientId") {
      const result = allVisits.filter(
        (visit) => visit.patientId === searchTerm
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
    navigate("/adminDashboard/visit");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Visits Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Visit ID </th>
                  <th>patientId</th>
                  <th>DoctorId</th>
                  <th> Visit Date</th>
                  <th> Visit Time</th>
                  <th>Admission ID</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allVisits.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.visitID}</td>
                        <td>{guardian.patientId}</td>
                        <td>{guardian.doctorId}</td>
                        <td>{guardian.date}</td>
                        <td>{guardian.time}</td>
                        <td>{guardian.admissionID}</td>
                        <td>{guardian.status}</td>
                        <td>{guardian.description}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.visitID}</td>
                        <td>{guardian.patientId}</td>
                        <td>{guardian.contactName}</td>
                        <td>{guardian.address}</td>
                        <td>{guardian.phone}</td>
                        <td>{guardian.fax}</td>
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
                  <option value="visitID">Guardian ID</option>
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

export default VizAllVisits;
