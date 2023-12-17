import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAddedUserInfos } from "../../../redux/slice/addedUserSlide";
import { ButtonAction, Header } from "../../../components";

const ViewAllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const usersInfos = useSelector(selectAddedUserInfos);

  // To Get all the available Wards
  const API_URL = "http://localhost:3001/getUsersDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the user ID
    if (searchOptions === "userId") {
      const result = usersInfos.filter((user) => user.userID === searchTerm);
      setSearchResult(result);
    }
    // search by the ID
    else if (searchOptions === "userName") {
      const result = usersInfos.filter((user) => user.firstName === searchTerm);
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
    navigate("/adminDashboard/addUser");
  };

  return (
    <div>
      <Header />
      <div className="app__vDoctorDetails">
        <div>
          <h1> Users Details</h1>

          <div className="app__vDoctorDetails-container">
            <table>
              <thead>
                <tr>
                  <th>User ID </th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Telephone</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>User Type</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  allUsers.map((user, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{user.userID}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.gender}</td>
                        <td>{user.address}</td>
                        <td>{user.email}</td>
                        <td>{user.telephone}</td>
                        <td>{user.status}</td>
                        <td>{user.notes}</td>
                        <td>{user.userType}</td>
                        <td>{user.userName}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((user, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{user.userID}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.gender}</td>
                        <td>{user.address}</td>
                        <td>{user.email}</td>
                        <td>{user.telephone}</td>
                        <td>{user.status}</td>
                        <td>{user.notes}</td>
                        <td>{user.userType}</td>
                        <td>{user.userName}</td>
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
                  <option value="userId">User ID</option>
                  <option value="userName">User First Name</option>
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

export default ViewAllUsers;
