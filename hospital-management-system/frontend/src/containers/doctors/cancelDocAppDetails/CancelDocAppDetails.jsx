import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction, Input } from "../../../components";
import "./cancelAppointment.css";

const CancelDocAppDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [inputs, setInputs] = useState({
    appointmentID: "",
    patientID: "",
    doctorID: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allDOctors, setAllDOctors] = useState([]);
  const [allDocSchedule, setAllDocSchedule] = useState([]);
  const [allDaysFiltered, setAllDaysFiltered] = useState([]);
  const [filteredDocAppTable, setFilteredDocAppTable] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const [isFocusedD, setIsFocusedD] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStartDay, setSelectedStartDay] = useState("");
  const [selectedEndDay, setSelectedEndDay] = useState("");
  const [showFilteredTable, setShowFilteredTable] = useState(false);

  const [monday, setMonday] = useState();
  const [tuesday, setTuesday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();
  const [saturday, setSaturday] = useState();
  const [sunday, setSunday] = useState();

  // To Get all outPatient
  const API_URL = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_APPOINTMENT = "http://localhost:3001/getAddDocAppointments";
  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";
  const API_URL_DOCTORS_SCHEDULE = "http://localhost:3001/getDocAppointments";

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

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
  const fetchDocSchedule = async () => {
    const { data } = await axios.get(API_URL_DOCTORS_SCHEDULE);
    setAllDocSchedule(data);
  };

  useEffect(() => {
    fetchData();
    fetchDoctorsData();
    fetchAppointment();
    fetchDocSchedule();
  }, []);

  const handleClose = () => {
    setOpenPage(false);
  };

  // function to filter the table according to the date range
  const handleRefreshFields = () => {
    setShowFilteredTable(false);
    setStartDate();
    setEndDate();
  };
  const handleFilterTable = () => {
    console.log("clicked");
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
      setAllDaysFiltered(filteredDays);

      const results = allAppointments.filter((appointment) =>
        filteredDays.includes(appointment.appointmentDate)
      );

      setFilteredDocAppTable(results);
    }
    setShowFilteredTable(true);
  };

  useEffect(() => {
    console.log("the filtered days are", allAppointments);
  }, [allAppointments]);

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

  // useEffect(() => {
  //   console.log("startDate", selectedStartDay);
  //   console.log("startDate", startDate);
  //   console.log("endDate", endDate);
  // }, [endDate, startDate, selectedStartDay]);

  return (
    <div className="app__addAppointment">
      <h2 className="page-title">ADD DOCTOR APPOINTMENT</h2>
      <section className="app__cancelApp">
        <div className="app__cancelApp-header">
          <div>
            <button onClick={handleFilterTable}>Click</button>
            <button onClick={handleRefreshFields}>Refresh</button>
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
            {/* <select name="startDate" id="startDate">
              <option value="">Nothing</option>
            </select> */}
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
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="wrapper-input">
            <label htmlFor="startDate">of</label>
            <input type="checkbox" />
            <p>Doctor ID</p>
          </div>
          <div className="wrapper-input">
            <label htmlFor="endDate">To</label>
            <select name="endDate" id="endDate">
              <option value="">Nothing</option>
            </select>
          </div>
          <ButtonAction
            iconName="add"
            btnName="Add Appointment"
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
                    <th>DoctorID</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                  </tr>
                </thead>
                <tbody>
                  {!showFilteredTable &&
                    allAppointments.map((appointment, index) => {
                      return (
                        <tr className="doctor-infos" key={index}>
                          <td>{appointment.appointmentID}</td>
                          <td>{appointment.patientID}</td>
                          <td>{appointment.doctorID}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.appointmentTime}</td>
                        </tr>
                      );
                    })}
                  {showFilteredTable &&
                    filteredDocAppTable.map((appointment, index) => {
                      return (
                        <tr className="doctor-infos" key={index}>
                          <td>{appointment.appointmentID}</td>
                          <td>{appointment.patientID}</td>
                          <td>{appointment.doctorID}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.appointmentTime}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {/* <table>
                <thead>
                  <tr>
                    <th>Appointment ID </th>
                    <th>Patient ID</th>
                    <th>DoctorID</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocAppTable.map((appointment, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{appointment.appointmentID}</td>
                        <td>{appointment.patientID}</td>
                        <td>{appointment.doctorID}</td>
                        <td>{appointment.appointmentDate}</td>
                        <td>{appointment.appointmentTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> */}
            </div>
          </div>
          <div className="app__cancelApp-tables-calendar"></div>
        </div>
      </section>

      {/* Table for all Doctor appointments */}
      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Appointment ID </th>
              <th>Patient ID</th>
              <th>DoctorID</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments.map((appointment, index) => {
              return (
                <tr className="doctor-infos" key={index}>
                  <td>{appointment.appointmentID}</td>
                  <td>{appointment.patientID}</td>
                  <td>{appointment.doctorID}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="container-view-appoint-btn">
        <ButtonAction
          iconName="add"
          btnName="Add Appointment"
          color="green"
          buttonType="submit"
          //   onClick={handleAddAppointment}
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
  );
};

export default CancelDocAppDetails;
