import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction } from "../../../components";
// import "./vizDocApp.css";

const VizServiceApp = ({ setOpenPage }) => {
  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allDOctors, setAllDOctors] = useState([]);

  const [filteredDocAppTable, setFilteredDocAppTable] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [selectDocId, setSelectDocId] = useState();
  const [selectedStartDay, setSelectedStartDay] = useState("");
  const [selectedEndDay, setSelectedEndDay] = useState("");
  const [showFilteredTable, setShowFilteredTable] = useState(false);
  const [searchOptions, setSearchOptions] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hideDefaultTable, setHideDefaultTable] = useState(false);

  // To Get all outPatient
  const API_URL = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_APPOINTMENT = "http://localhost:3001/getAddHospitalSerApp";
  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOutPatients(data);
  };

  const fetchDoctorsData = async () => {
    const { data } = await axios.get(API_URL_DOCTORS);
    setAllDOctors(data);
  };
  const fetchAppointment = async () => {
    const { data } = await axios.get(API_URL_APPOINTMENT);
    setAllAppointments(data);
  };

  useEffect(() => {
    fetchData();
    fetchDoctorsData();
    fetchAppointment();
  }, [doctorId]);

  const handleClose = () => {
    setOpenPage(false);
  };

  const handleRefreshFields = () => {
    setShowFilteredTable(false);
    setStartDate();
    setEndDate();
    setSelectDocId(false);
    setHideDefaultTable(false);
    setSearchTerm("");
  };

  // function to filter the table according to the date range
  const handleFilterTable = () => {
    if (startDate != null && endDate != null) {
      if (allAppointments) {
        const allDocAppFilterDays = allAppointments.map(
          (day) => day.appointmentDate
        );

        const sd = new Date(selectedStartDay);
        const ed = new Date(selectedEndDay);

        const filteredDays = allDocAppFilterDays.filter((day) => {
          const currentDate = new Date(day);
          return currentDate >= sd && currentDate <= ed;
        });
        // setAllDaysFiltered(filteredDays);

        const results = allAppointments.filter((appointment) =>
          filteredDays.includes(appointment.appointmentDate)
        );

        setFilteredDocAppTable(results);
      }
      setShowFilteredTable(true);
    } else {
      toast.error("Please enter the range date");
    }
  };

  // To extract  the date  as the date format
  useEffect(() => {
    if (startDate) {
      const text = startDate.toString();
      const result = text.slice(4, 15);
      setSelectedStartDay(result);
    }
    if (endDate) {
      const text = endDate.toString();
      const result = text.slice(4, 15);
      setSelectedEndDay(result);
    }
  }, [startDate, endDate, selectedEndDay]);

  const handleCheckboxChange = (e) => {
    setSelectDocId(e.target.checked);

    if (!selectDocId) {
      const result = allAppointments.filter(
        (appointment) => appointment.hospitalServiceID === doctorId
      );
      setFilteredDocAppTable(result);
      setShowFilteredTable(true);
    }
  };

  // Function to search
  const handleSearch = () => {
    setHideDefaultTable(true);
    // search by patient ID
    if (searchOptions === "appointmentId") {
      const result = allAppointments.filter(
        (appointment) => appointment.appointmentID === searchTerm
      );
      setSearchResult(result);
      console.log("Search", result);
    }
    // search by the patient first Name
    else if (searchOptions === "patientId") {
      const result = allAppointments.filter(
        (patient) => patient.patientID === searchTerm
      );
      setSearchResult(result);
      console.log("Search", result);
    }
    // setHideDada(true);
    // setHideDataSearched(true);
  };

  return (
    <div className="app__addAppointment">
      <h2 className="page-title">ADD DOCTOR APPOINTMENT</h2>
      <section className="app__cancelApp">
        <div className="app__cancelApp-header">
          <div style={{ display: "flex", gap: 20 }}>
            <ButtonAction
              iconName="search"
              btnName="Search"
              color="green"
              buttonType="button"
              onClick={handleFilterTable}
            />
            <ButtonAction
              iconName="refresh"
              btnName="Refresh"
              color="blue"
              buttonType="button"
              onClick={handleRefreshFields}
            />
          </div>

          <div className="wrapper-input">
            <label htmlFor="startDate">From</label>
            <div className="">
              <DatePicker
                className="input-options"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableMonthYearDropdowns
                placeholder="From this date"
                // minDate={new Date()}
              />
            </div>
          </div>
          <div className="wrapper-input">
            <label htmlFor="endDate">To</label>
            <div className="">
              <DatePicker
                className="input-options"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableMonthYearDropdowns
                // minDate={new Date()}
              />
            </div>
          </div>
          <div className="wrapper-input">
            <label htmlFor="startDate" style={{ marginLeft: 5 }}>
              of
            </label>
            <input
              type="checkbox"
              checked={selectDocId}
              onChange={handleCheckboxChange}
            />
            <p>Service ID</p>
          </div>
          <div className="wrapper-input">
            <label htmlFor="endDate">To</label>
            <input
              type="text"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="Service ID"
            />
          </div>
          <ButtonAction
            iconName="display"
            btnName="Display"
            color="green"
            buttonType="submit"

            //   onClick={handleAddAppointment}
          />
        </div>
        <div className="app__cancelApp-tables">
          <div className="app__cancelApp-tables-infos">
            <div className="appScheduling-table">
              <table>
                <thead>
                  <tr>
                    <th>Appointment ID </th>
                    <th>Patient ID</th>
                    <th>Service ID</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                  </tr>
                </thead>
                <tbody>
                  {!showFilteredTable &&
                    !hideDefaultTable &&
                    allAppointments.map((appointment, index) => {
                      return (
                        <tr className="doctor-infos" key={index}>
                          <td>{appointment.appointmentID}</td>
                          <td>{appointment.patientID}</td>
                          <td>{appointment.hospitalServiceID}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.appointmentTime}</td>
                        </tr>
                      );
                    })}
                  {showFilteredTable &&
                    !hideDefaultTable &&
                    filteredDocAppTable.map((appointment, index) => {
                      return (
                        <tr className="doctor-infos" key={index}>
                          <td>{appointment.appointmentID}</td>
                          <td>{appointment.patientID}</td>
                          <td>{appointment.hospitalServiceID}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.appointmentTime}</td>
                        </tr>
                      );
                    })}
                  {hideDefaultTable &&
                    searchResult.map((appointment, index) => {
                      return (
                        <tr className="doctor-infos" key={index}>
                          <td>{appointment.appointmentID}</td>
                          <td>{appointment.patientID}</td>
                          <td>{appointment.hospitalServiceID}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.appointmentTime}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="app__cancelApp-tables-calendar"></div> */}
        </div>
      </section>

      {/* Table for all Doctor appointments */}
      <section className="search-container">
        <div className="container-inputs">
          <div className="content">
            <label htmlFor="searchOptions">Search For</label>
            <select
              name="searchOptions"
              id="searchOptions"
              onChange={(e) => setSearchOptions(e.target.value)}
            >
              <option value="">Select one option</option>
              <option value="appointmentId">Appointment ID</option>
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
          <div style={{ display: "flex", gap: 20 }}>
            <ButtonAction
              iconName="search"
              btnName="Search"
              color="blue"
              buttonType="button"
              onClick={handleSearch}
            />
            <ButtonAction
              iconName="close"
              btnName="Close"
              color="red"
              buttonType="button"
              onClick={handleClose}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VizServiceApp;
