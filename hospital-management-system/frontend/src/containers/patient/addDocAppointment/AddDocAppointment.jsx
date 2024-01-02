import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction, Input } from "../../../components";
import "./addDocAppointment.css";

const AddDocAppointment = ({ setOpenAddAppointment }) => {
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
  const [allDocSchFiltered, setAllDocSchFiltered] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const [isFocusedD, setIsFocusedD] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [docID, setDocID] = useState("");

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
    fetchAppointment();
    fetchDocSchedule();
  }, []);

  // Filter available days according to the doctor schedule available days
  useEffect(() => {
    if (allDocSchFiltered) {
      const allDocSchFilterDays = allDocSchFiltered.map(
        (day) => day.selectedDays
      );

      if (allDocSchFilterDays.length > 0) {
        const daysMap = {
          Mon: { stateUpdater: setMonday, value: 1 },
          Tue: { stateUpdater: setTuesday, value: 2 },
          Wed: { stateUpdater: setWednesday, value: 3 },
          Thu: { stateUpdater: setThursday, value: 4 },
          Fri: { stateUpdater: setFriday, value: 5 },
          Sat: { stateUpdater: setSaturday, value: 6 },
          Sun: { stateUpdater: setSunday, value: 0 },
        };

        Object.keys(daysMap).forEach((dayName) => {
          const containsDay = allDocSchFilterDays.some((dayString) =>
            dayString.includes(dayName)
          );

          const { stateUpdater, value } = daysMap[dayName];
          containsDay ? stateUpdater(value) : stateUpdater();
        });
      } else {
        setMonday();
        setTuesday();
        setWednesday();
        setThursday();
        setFriday();
        setSaturday();
        setSunday();
      }
    }
  }, [
    allDocSchFiltered,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  ]);

  useEffect(() => {
    if (startDate) {
      const text = startDate.toString();

      const result = text.slice(0, 3);

      setSelectedDay(result);
    }
  }, [startDate, selectedDay]);

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

    if (startDate) {
      const day = startDate.getDate();
      const month = months[startDate.getMonth()];
      const year = startDate.getFullYear();

      const formattedDate = `${selectedDay} ${day} ${month} ${year}`;
      setSelectedDate(formattedDate);
    }
  }, [startDate, selectedDay]);

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

  // Function to generate the ID
  const handleAddAppointment = () => {
    if (allAppointments.length === 0) {
      setInputs({
        ...inputs,
        appointmentID: "app_001",
      });
    } else {
      const lastElementId =
        allAppointments[allAppointments.length - 1].appointmentID;
      const numericPart = parseInt(lastElementId.split("_")[1]);
      const nextId = `app_${(numericPart + 1).toString().padStart(3, "0")}`;

      setInputs({
        ...inputs,
        appointmentID: nextId,
      });
    }
  };

  useEffect(() => {
    setDocID(inputs.doctorID);
  }, [inputs.doctorID, docID]);

  useEffect(() => {
    const handleFilter = (id) => {
      const result = allDocSchedule.filter((doctor) => doctor.doctorID === id);
      setAllDocSchFiltered(result);
    };

    handleFilter(docID);
  }, [docID, allDocSchedule]);

  return (
    <div className="app__addAppointment">
      <h2 className="page-title">ADD DOCTOR APPOINTMENT</h2>
      <div className="app__addAppointment-container">
        <div className="container-view-appoint appointment-form">
          <div className="details-title">
            <h4>Appointment Details</h4>
            {/* <div className="divider" /> */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-fields">
              <label form="AppointmentID">Appointment ID:</label>
              <Input
                placeholder="Appointment ID"
                name="appointmentID"
                value={inputs.appointmentID}
                handleOnChange={handleOnChange}
                inputDisabled="true"
              />
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="patientID"> Patient ID</label>
              <div>
                <select
                  className="custom-input-field"
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
              <div className="custom-input-field">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableMonthYearDropdowns
                  minDate={new Date()}
                  filterDate={(date) =>
                    date.getDay() == monday ||
                    date.getDay() == tuesday ||
                    date.getDay() == wednesday ||
                    date.getDay() == thursday ||
                    date.getDay() == friday ||
                    date.getDay() == saturday ||
                    date.getDay() == sunday
                  }
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="gender"> Appointment Time:</label>
              <div className="custom-input-field">
                <DatePicker
                  selected={pickedTime}
                  onChange={(time) => setPickedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={10}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                  // filterTime={filterTime}
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>

          <div className="container-view-appoint-btn">
            <ButtonAction
              iconName="add"
              btnName="Add Appointment"
              color="green"
              buttonType="submit"
              onClick={handleAddAppointment}
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
          {/* <div className="container-view-appoint-btn">
            <ButtonAction
              iconName="valid"
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
          </div> */}
        </aside>
      </div>

      {/* Table for all Doctors appointments */}
      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Scheduling ID </th>
              <th>Doctor ID</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Available Days </th>
            </tr>
          </thead>
          <tbody>
            {allDocSchFiltered.map((schedule, index) => {
              return (
                <tr className="doctor-infos" key={index}>
                  <td>{schedule.schedulingID}</td>
                  <td>{schedule.doctorID}</td>
                  <td>{schedule.timeIn}</td>
                  <td>{schedule.timeOut}</td>
                  <td>{schedule.selectedDays}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2
        className="page-title"
        style={{ textTransform: "uppercase", margin: 50 }}
      >
        Doctor appointments
      </h2>

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
    </div>
  );
};

export default AddDocAppointment;
