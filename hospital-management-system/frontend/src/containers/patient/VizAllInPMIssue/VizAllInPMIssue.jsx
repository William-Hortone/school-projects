import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllInpMIssue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allSuppliers, setAllSuppliers] = useState([]);
  const navigate = useNavigate();

  // To Get all the available getGuardian
  const API_URL = "http://localhost:3001/getMedicalIssue";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllSuppliers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the supplier ID
    if (searchOptions === "supplierID") {
      const result = allSuppliers.filter(
        (supplier) => supplier.supplierID === searchTerm
      );
      setSearchResult(result);
    }
    // search by the companyName
    else if (searchOptions === "companyName") {
      const result = allSuppliers.filter(
        (supplier) => supplier.companyName === searchTerm
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
    navigate("/adminDashboard/supplier");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> IN PATIENT MEDICAL ISSUE</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>admissionID </th>
                  <th>patientID </th>
                  <th>billNumber</th>
                  <th>categoryID</th>
                  <th>productID</th>
                  <th>productName</th>
                  <th>unitInStock</th>
                  <th>quantity</th>
                  <th>ratePerUnit</th>
                  <th>discount</th>
                  <th>amount</th>
                  <th>totalAmount</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allSuppliers.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.admissionID}</td>
                        <td>{guardian.patientID}</td>
                        <td>{guardian.billNumber}</td>
                        <td>{guardian.categoryID}</td>
                        <td>{guardian.productID}</td>
                        <td>{guardian.productName}</td>
                        <td>{guardian.unitInStock}</td>
                        <td>{guardian.quantity}</td>
                        <td>{guardian.ratePerUnit}</td>
                        <td>{guardian.discount}</td>
                        <td>{guardian.amount}</td>
                        <td>{guardian.totalAmount}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.supplierID}</td>
                        <td>{guardian.companyName}</td>
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
                  <option value="supplierID">Guardian ID</option>
                  <option value="companyName">Patient ID</option>
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

export default VizAllInpMIssue;
