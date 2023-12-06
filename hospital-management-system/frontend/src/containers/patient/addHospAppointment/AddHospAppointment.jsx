import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction, Input } from "../../../components";

const AddHospAppointment = ({ setOpenAddHospitalApp }) => {
  const [inputs, setInputs] = useState({
    appointmentID: "",
    patientID: "",
    hospitalServiceID: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allHospitalSer, setAllHospitalSer] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [pickedTime, setPickedTime] = useState(null);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const [isFocusedD, setIsFocusedD] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // To Get all out Patients
  const API_URL = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_APPOINTMENT = "http://localhost:3001/getAddHospitalSerApp";
  const API_URL_HOSPITAL_SER = "http://localhost:3001/getHospitalServices";

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
    const { data } = await axios.get(API_URL_HOSPITAL_SER);
    setAllHospitalSer(data);
  };
  const fetchAppointment = async () => {
    const { data } = await axios.get(API_URL_APPOINTMENT);
    setAllAppointments(data);
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
      inputs.hospitalServiceID === "" ||
      inputs.appointmentDate === "" ||
      inputs.appointmentTime === ""
    ) {
      toast.error("Please complete all the fields");
    } else {
      axios
        .post("http://localhost:3001/addHospitalSerApp", inputs)
        .then((res) => {
          toast.success("Added successfully");
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleClose = () => {
    setOpenAddHospitalApp(false);
  };

  // Function to generate the ID
  const handleAddAppointment = () => {
    if (allAppointments.length === 0) {
      setInputs({
        ...inputs,
        appointmentID: "appH_001",
      });
    } else {
      const lastElementId =
        allAppointments[allAppointments.length - 1].appointmentID;
      const numericPart = parseInt(lastElementId.split("_")[1]);
      const nextId = `appH_${(numericPart + 1).toString().padStart(3, "0")}`;

      setInputs({
        ...inputs,
        appointmentID: nextId,
      });
    }
  };

  return (
    <div className="app__addAppointment">
      <h2 className="page-title">HOSPITAL SERVICE APPOINTMENT</h2>
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
              <label htmlFor="doctorID">Hospital Service ID</label>
              <div>
                <select
                  name="hospitalServiceID"
                  id="hospitalServiceID"
                  value={inputs.hospitalServiceID}
                  onChange={handleOnChange}
                  required
                  onFocus={handleFocusDoctor}
                  onBlur={handleBlurDoctor}
                >
                  <option required value="">
                    Hospital Service ID
                  </option>
                  {allHospitalSer.map((service, index) => (
                    <option key={index} value={service.serviceID}>
                      {service.serviceID}
                    </option>
                  ))}
                </select>

                <span
                  // onClick={handleShowDocDetailsTable}
                  className="btn-docSchedule"
                >
                  Hospital Service
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
                  <th>Service ID</th>
                  <th>Service Name</th>
                  <th>Amount</th>
                  <th>Duration</th>
                  <th>Additional Notes</th>
                </tr>
              </thead>
              <tbody>
                {allHospitalSer.map((service, index) => {
                  return (
                    <tr className="table-view-app-row" key={index}>
                      <td>{service.serviceID}</td>
                      <td>{service.serviceName}</td>
                      <td>{service.amount}</td>
                      <td>{service.duration}</td>
                      <td>{service.additionalNotes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="container-view-appoint-btn">
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
          </div>
        </aside>
      </div>

      {/* Table for all Hospital service appointments */}
      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Appointment ID </th>
              <th>Patient ID</th>
              <th>Hospital Service ID</th>
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
  );
};

export default AddHospAppointment;
