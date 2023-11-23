import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";
import { selectWardDetails } from "../../../redux/slice/wardSlice";

const ViewWardDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allWards, setAllWards] = useState([]);
  const navigate = useNavigate();

  const wardsDetails = useSelector(selectWardDetails);

  // To Get all the available Wards
  const API_URL = "http://localhost:3001/getWardsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllWards(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the first name
    if (searchOptions === "doctorId") {
      const result = wardsDetails.filter(
        (ward) => ward.wardType === searchTerm
      );
      setSearchResult(result);
    }
    // search by the ID
    else if (searchOptions === "wardId") {
      const result = wardsDetails.filter((ward) => ward.wardID === searchTerm);
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
    navigate("/adminDashboard/wardDetails");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Doctors Appointments Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Ward ID </th>
                  <th>Ward Type</th>
                  <th>Ward Rates</th>
                  <th>Ward DEscription</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allWards.map((ward, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{ward.wardID}</td>
                        <td>{ward.wardType}</td>
                        <td>{ward.wardRates}</td>
                        <td>{ward.wardDesc}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((ward, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{ward.wardID}</td>
                        <td>{ward.wardType}</td>
                        <td>{ward.wardRates}</td>
                        <td>{ward.wardDesc}</td>
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
                  <option value="wardId">Ward ID</option>
                  <option value="doctorId">Ward Type</option>
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

export default ViewWardDetails;
