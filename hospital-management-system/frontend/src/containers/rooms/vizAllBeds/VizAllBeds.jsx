import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllBeds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allBeds, setAllBeds] = useState([]);
  const navigate = useNavigate();

  // To Get all the available beds
  const API_URL = "http://localhost:3001/getBedsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllBeds(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the bed ID
    if (searchOptions === "bedId") {
      const result = allBeds.filter((bed) => bed.bedID === searchTerm);
      setSearchResult(result);
    }
    // search by the bed place
    else if (searchOptions === "bedPlace") {
      const result = allBeds.filter((bed) => bed.bedPlace === searchTerm);
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
    navigate("/adminDashboard/bedDetails");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Bed Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Bed ID </th>
                  <th>Bed Place </th>
                  <th>Available</th>
                  {/* <th>Bed Description</th> */}
                  <th>Admission ID</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allBeds.map((bed, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{bed.bedID}</td>
                        <td>{bed.bedPlace}</td>
                        <td>{bed.isOccupied ? "No" : "Yes"}</td>
                        {/* <td>{bed.admissionID}</td> */}
                        <td>{bed.bedDesc}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((bed, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{bed.bedID}</td>
                        <td>{bed.bedPlace}</td>
                        <td>{bed.isOccupied ? "No" : "Yes"}</td>
                        {/* <td>{bed.admissionID}</td> */}
                        <td>{bed.bedDesc}</td>
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
                  <option value="bedId">Bed ID</option>
                  <option value="bedPlace">Bed Place</option>
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

export default VizAllBeds;
