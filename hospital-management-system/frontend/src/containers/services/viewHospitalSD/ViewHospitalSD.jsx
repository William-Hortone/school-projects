import { useEffect, useState } from "react";
import "./viewHospitalSD.css";
import { ButtonAction, Header } from "../../../components";
import { useNavigate } from "react-router-dom";
import { selectMedicalService } from "../../../redux/slice/medicalServiceSlice";
import { useSelector } from "react-redux";

const ViewHospitalSD = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);
  const [refreshValue, setRefreshValue] = useState("");

  const navigate = useNavigate();
  const medicalSDetail = useSelector(selectMedicalService);

  const handleSearch = () => {
    if (searchOptions === "serviceName") {
      const result = medicalSDetail.filter(
        (medicalService) => medicalService.serviceName === searchTerm
      );
      setSearchResult(result);
    } else if (searchOptions === "serviceId") {
      const result = medicalSDetail.filter(
        (medicalService) => medicalService.serviceID === searchTerm
      );
      setSearchResult(result);
    }
    setHideDada(true);
    setHideDataSearched(true);
  };

  const handleRefresh = () => {
    setHideDada(false);
    setHideDataSearched(false);
    setSearchTerm(refreshValue);
  };
  const handleClose = () => {
    navigate("/adminDashboard/mServices");
  };

  return (
    <div>
      <Header />
      <div className="app__vHospitalDetails">
        <div>
          <h1>View Hospital Services Details</h1>

          <div className="app__vHospitalDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Service ID </th>
                  <th>ServiceName </th>
                  <th>Amount</th>
                  <th>Duration</th>
                  <th>AdditionalNotes</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  medicalSDetail.map((medicalService, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{medicalService.serviceID}</td>
                        <td>{medicalService.serviceName}</td>
                        <td>{medicalService.amount}</td>
                        <td>{medicalService.duration}</td>
                        <td>{medicalService.additionalNotes}</td>
                      </tr>
                    );
                  })}
                {hideDataSearched &&
                  searchResult.map((medicalService, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{medicalService.serviceID}</td>
                        <td>{medicalService.serviceName}</td>
                        <td>{medicalService.amount}</td>
                        <td>{medicalService.duration}</td>
                        <td>{medicalService.additionalNotes}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="app__vHospitalDetails-container-btn">
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
                <option value="serviceId">Service Id</option>
                <option value="serviceName">Service Name</option>
              </select>
            </div>
            <div className="content">
              <label htmlFor="">Search text</label>
              <input
                value={searchTerm}
                type="text"
                placeholder="Write ID or first name"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHospitalSD;
