import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";
import { selectRoomsDetails } from "../../../redux/slice/roomsSlice";

const VizAllRooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const [myData, setMyData] = useState([]);
  const navigate = useNavigate();

  const roomsDetails = useSelector(selectRoomsDetails);

  // To Get all the available rooms
  const API_URL = "http://localhost:3001/getRoomsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setMyData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to search
  const handleSearch = () => {
    // search by the first name
    if (searchOptions === "doctorId") {
      const result = roomsDetails.filter(
        (room) => room.roomType === searchTerm
      );
      setSearchResult(result);
    }
    // search by the ID
    else if (searchOptions === "scheduleId") {
      const result = roomsDetails.filter((room) => room.roomID === searchTerm);
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
    navigate("/adminDashboard/rooms");
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
                  <th>Room ID </th>
                  {/* <th>Room Type</th> */}
                  <th>Room Rates</th>
                  <th>Room DEscription</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  myData.map((room, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{room.roomID}</td>
                        {/* <td>{room.roomType}</td> */}
                        <td>{room.roomRates}</td>
                        <td>{room.roomDesc}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((room, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{room.roomID}</td>
                        {/* <td>{room.roomType}</td> */}
                        <td>{room.roomRates}</td>
                        <td>{room.roomDesc}</td>
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
                  <option value="scheduleId">Room ID</option>
                  <option value="doctorId">Room Type</option>
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

export default VizAllRooms;
