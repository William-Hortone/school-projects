import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";

const VizAllMedicine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allMedicine, setAllMedicine] = useState([]);
  const navigate = useNavigate();

  // To Get all the available getGuardian
  const API_URL = "http://localhost:3001/getMedicine";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllMedicine(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the supplier ID
    if (searchOptions === "productID") {
      const result = allMedicine.filter(
        (medicine) => medicine.productID === searchTerm
      );
      setSearchResult(result);
    }
    // search by the productName
    else if (searchOptions === "productName") {
      const result = allMedicine.filter(
        (medicine) => medicine.productName === searchTerm
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
    navigate("/adminDashboard/medicine");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Medicine Category Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Category ID</th>
                  <th>ProductName</th>
                  <th>Supplier ID</th>
                  <th>UnitPrice</th>
                  <th>UnitInStock</th>
                  <th>ReorderLevel</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allMedicine.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.productID}</td>
                        <td>{guardian.categoryID}</td>
                        <td>{guardian.productName}</td>
                        <td>{guardian.supplierID}</td>
                        <td>{guardian.unitPrice}</td>
                        <td>{guardian.unitInStock}</td>
                        <td>{guardian.reorderLevel}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((guardian, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{guardian.productID}</td>
                        <td>{guardian.categoryID}</td>
                        <td>{guardian.productName}</td>
                        <td>{guardian.supplierID}</td>
                        <td>{guardian.unitPrice}</td>
                        <td>{guardian.unitInStock}</td>
                        <td>{guardian.reorderLevel}</td>
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
                  <option value="productID">Guardian ID</option>
                  <option value="productName">Patient ID</option>
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

export default VizAllMedicine;
