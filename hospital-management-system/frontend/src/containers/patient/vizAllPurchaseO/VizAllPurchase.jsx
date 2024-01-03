import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllPurchaseO = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allSuppliers, setAllSuppliers] = useState([]);
  const navigate = useNavigate();

  // To Get all the available getGuardian
  const API_URL = "http://localhost:3001/getPurchaseOrder";

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
    navigate("/adminDashboard/purchaseOrder");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Purchase Orders</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Supplier ID </th>
                  <th>Company Name </th>
                  <th>Contact Name</th>
                  <th>productID</th>
                  <th>productName</th>
                  <th>unitInStock</th>
                  <th>unitPurchased</th>
                  <th>ratePerUnit</th>
                  <th>discount</th>
                  <th>amount</th>
                  <th>netAmount</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allSuppliers.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.supplierID}</td>
                        <td>{guardian.companyName}</td>
                        <td>{guardian.contactName}</td>
                        <td>{guardian.productID}</td>
                        <td>{guardian.productName}</td>
                        <td>{guardian.unitInStock}</td>
                        <td>{guardian.unitPurchased}</td>
                        <td>{guardian.ratePerUnit}</td>
                        <td>{guardian.discount}</td>
                        <td>{guardian.amount}</td>
                        <td>{guardian.netAmount}</td>
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
                        <td>{guardian.productID}</td>
                        <td>{guardian.productName}</td>
                        <td>{guardian.unitInStock}</td>
                        <td>{guardian.unitPurchased}</td>
                        <td>{guardian.ratePerUnit}</td>
                        <td>{guardian.discount}</td>
                        <td>{guardian.amount}</td>
                        <td>{guardian.netAmount}</td>
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

export default VizAllPurchaseO;
