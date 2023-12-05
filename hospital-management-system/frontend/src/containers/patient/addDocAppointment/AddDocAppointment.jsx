import React, { useEffect, useState } from "react";
import { ButtonAction, Input, Select } from "../../../components";
import axios from "axios";
import "./addDocAppointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const AddDocAppointment = ({ setOpenAddAppointment }) => {
  const [inputs, setInputs] = useState({
    patientID: "",
    doctorID: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allDOctors, setAllDOctors] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  const [pickedTime, setPickedTime] = useState(null);
  const [showPatient, setShowPatient] = useState(true);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const [isFocusedD, setIsFocusedD] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // To Get all outPatient
  const API_URL = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";

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

  const handleFocusPatient = () => {
    setIsFocusedP(true);
  };

  const handleBlurPatient = () => {
    setIsFocusedP(false);
  };

  const handleFocusDoctor = () => {
    setIsFocusedD(true);
  };

  const handleBlurDoctor = () => {
    setIsFocusedD(false);
  };

  useEffect(() => {
    fetchData();
    fetchDoctorsData();
  }, []);

  //  Set the format for the Date
  useEffect(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = startDate.getDate();
    const month = months[startDate.getMonth()];
    const year = startDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    setSelectedDate(formattedDate);
  }, [startDate]);

  //  Set the format for the time
  useEffect(() => {
    if (pickedTime) {
      const formattedTime = pickedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setSelectedTime(formattedTime);
    }
  }, [pickedTime]);

  useEffect(() => {
    setInputs((inputsValue) => ({
      ...inputsValue,
      appointmentDate: selectedDate,
    }));
  }, [selectedDate]);

  useEffect(() => {
    setInputs((inputsValue) => ({
      ...inputsValue,
      appointmentTime: selectedTime,
    }));
  }, [selectedTime]);

  // Function to add a doctor Appointment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.patientID === "" ||
      inputs.doctorID === "" ||
      inputs.appointmentDate === "" ||
      inputs.appointmentTime === ""
    ) {
      toast.error("Please complete all the fields");
    } else {
      axios
        .post("http://localhost:3001/addDocAppointment", inputs)
        .then((res) => {
          toast.success("Added successfully");
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleClose = () => {
    setOpenAddAppointment(false);
  };

  return (
    <div className="app__addAppointment">
      <h2 className="page-title">ADD DOCTOR APPOINTMENT</h2>
      <div className="app__addAppointment-container">
        <div className="appScheduling-container">
          <div className="details-title">
            <h4>Appointment Details</h4>
            {/* <div className="divider" /> */}
          </div>
          <form>
            <div className="input-field doctor-types">
              <label htmlFor="patientID"> Patient ID</label>
              <div>
                <select
                  name="patientID"
                  id="patientID"
                  value={inputs.patientID}
                  onChange={handleOnChange}
                  onFocus={handleFocusPatient}
                  onBlur={handleBlurPatient}
                  required
                >
                  <option required value="">
                    Select a Patient ID
                  </option>
                  {allOutPatients.map((patient, index) => (
                    <option key={index} value={patient.patientID}>
                      {patient.patientID}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="doctorID"> Doctor ID</label>
              <div>
                <select
                  name="doctorID"
                  id="doctorID"
                  value={inputs.doctorID}
                  onChange={handleOnChange}
                  required
                  onFocus={handleFocusDoctor}
                  onBlur={handleBlurDoctor}
                >
                  <option required value="">
                    Select a doctor ID
                  </option>
                  {allDOctors.map((doctor, index) => (
                    <option key={index} value={doctor.doctorID}>
                      {doctor.doctorID}
                    </option>
                  ))}
                </select>

                <span
                  // onClick={handleShowDocDetailsTable}
                  className="btn-docSchedule"
                >
                  Doctors Schedule
                </span>
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="gender"> Appointment Date:</label>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  // value={inputs.appointmentDate}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="gender"> Appointment Time:</label>
              <div>
                <DatePicker
                  selected={pickedTime}
                  onChange={(time) => setPickedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={10}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                />
              </div>
            </div>
          </form>

          <div className="container-view-appoint-btn">
            <ButtonAction
              iconName="add"
              btnName="Save Appointment"
              color="green"
              buttonType="submit"
              onClick={handleSubmit}
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

        <aside className="container-view-appoint">
          {/* empty span */}
          {!isFocusedP && !isFocusedD && <span />}

          {/* Table for  Out patient details */}
          {isFocusedP && (
            <table className="table-view-app">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {allOutPatients.map((patient, index) => {
                  return (
                    <tr className="table-view-app-row" key={index}>
                      <td>{patient.patientID}</td>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Table for  Doctors details */}
          {isFocusedD && (
            <table className="table-view-app">
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Specialization</th>
                  <th>Qualification</th>
                </tr>
              </thead>
              <tbody>
                {allDOctors.map((doctor, index) => {
                  return (
                    <tr className="table-view-app-row" key={index}>
                      <td>{doctor.doctorID}</td>
                      <td>{doctor.doctorFN}</td>
                      <td>{doctor.doctorLN}</td>
                      <td>{doctor.Specialization}</td>
                      <td>{doctor.Qualifications}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="container-view-appoint-btn">
            <ButtonAction
              iconName="close"
              btnName="Ok"
              color="blue"
              buttonType="button"
              // onClick={handleCloseScheduling}
            />
            <ButtonAction
              iconName="close"
              btnName="Cancel"
              color="red"
              buttonType="button"
              // onClick={handleCloseScheduling}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AddDocAppointment;
