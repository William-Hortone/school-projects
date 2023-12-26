import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonAction, Header } from "../../../components";
import { selectDocAppointment } from "../../../redux/slice/doctorSlice";
import "./vizDocApp.css";

const VizDocSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideData, setHideDada] = useState(false);
  const [hideDataSearched, setHideDataSearched] = useState(true);

  const navigate = useNavigate();

  const doctorAppointment = useSelector(selectDocAppointment);

  // Function to search
  const handleSearch = () => {
    // search by the first name
    if (searchOptions === "doctorId") {
      const result = doctorAppointment.filter(
        (doctor) => doctor.doctorID === searchTerm
      );
      setSearchResult(result);
    }
    // search by the ID
    else if (searchOptions === "scheduleId") {
      const result = doctorAppointment.filter(
        (doctor) => doctor.schedulingID === searchTerm
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
    navigate("/adminDashboard/doctorApp");
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
                  <th>Schedule ID </th>
                  <th>Doctor ID</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Available Days</th>
                  <th>Schedule Notes</th>
                </tr>
              </thead>
              <tbody>
                {!hideData &&
                  doctorAppointment.map((doctor, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{doctor.schedulingID}</td>
                        <td>{doctor.doctorID}</td>
                        <td>{doctor.timeIn}</td>
                        <td>{doctor.timeOut}</td>
                        <td>{doctor.selectedDays}</td>
                        <td>{doctor.schedulingNotes}</td>
                      </tr>
                    );
                  })}

                {/* Table for the result searched  */}
                {hideDataSearched &&
                  searchResult.map((doctor, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{doctor.schedulingID}</td>
                        <td>{doctor.doctorID}</td>
                        <td>{doctor.timeIn}</td>
                        <td>{doctor.timeOut}</td>
                        <td>{doctor.selectedDays}</td>
                        <td>{doctor.schedulingNotes}</td>
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
                  <option value="scheduleId">Schedule ID</option>
                  <option value="doctorId">Doctor ID</option>
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

export default VizDocSchedule;
