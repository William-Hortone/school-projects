import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllOPtreatment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allOPTreatments, setAllOPTreatments] = useState([]);
  const navigate = useNavigate();

  // To Get all the available beds
  const API_URL = "http://localhost:3001/getOutPTreatment";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOPTreatments(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the treatment ID
    if (searchOptions === "treatmentId") {
      const result = allOPTreatments.filter(
        (treatment) => treatment.treatmentId === searchTerm
      );
      setSearchResult(result);
    }
    // search by the patientId
    else if (searchOptions === "patientId") {
      const result = allOPTreatments.filter(
        (treatment) => treatment.patientId === searchTerm
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
    navigate("/adminDashboard/outPTreatment");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1>Out patient Treatment Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Treatment ID </th>
                  <th>Patient ID</th>
                  <th>Doctor ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Prescription</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allOPTreatments.map((treatment, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{treatment.treatmentId}</td>
                        <td>{treatment.patientId}</td>
                        <td>{treatment.doctorId}</td>
                        <td>{treatment.date}</td>
                        <td>{treatment.time}</td>
                        <td>{treatment.prescription}</td>
                        <td>{treatment.description}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((treatment, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{treatment.treatmentId}</td>
                        <td>{treatment.patientId}</td>
                        <td>{treatment.doctorId}</td>
                        <td>{treatment.date}</td>
                        <td>{treatment.time}</td>
                        <td>{treatment.prescription}</td>
                        <td>{treatment.description}</td>
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
                  <option value="treatmentId">Treatment ID</option>
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

export default VizAllOPtreatment;
