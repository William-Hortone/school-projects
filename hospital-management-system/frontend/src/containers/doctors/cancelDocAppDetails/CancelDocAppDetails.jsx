import React, { useEffect, useState } from "react";
import "./cancelDocAppDetails.css";
import { ButtonAction, Input } from "../../../components";
import { toast } from "react-toastify";
import axios from "axios";

const CancelDocAppDetails = ({ setOpenCancelPage }) => {
  const [inputs, setInputs] = useState({
    appointmentID: "",
    patientID: "",
    doctorID: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [appId, setAppId] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [disabledInput, setDisabledInput] = useState(false);

  const API_URL_APPOINTMENT = "http://localhost:3001/getAddDocAppointments";

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const fetchAppointment = async () => {
    const { data } = await axios.get(API_URL_APPOINTMENT);
    setAllAppointments(data);
  };
  useEffect(() => {
    fetchAppointment();
  }, []);
  useEffect(() => {
    setAppId(inputs.appointmentID);
  }, [inputs.appointmentID]);

  const handleClose = () => {
    setOpenCancelPage(false);
  };
  // Function to Delete a bed
  const handleCancelApp = (appId) => {
    if (appId === undefined || appId === "") {
      toast.error("Please provide a bed ID");
    } else {
      axios
        .put(`http://localhost:3001/cancelAppointment/${appId}`)
        .then((res) => {
          if (res.data === "success") {
            toast.success("Deleted Successfully");
          }
          if (res.data === "notfound") {
            toast.error("Service not found");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
    setShowPopupDelete(false);
  };
  const handleC = () => {
    if (appId === undefined || appId === "") {
      toast.error("Please provide an appointment ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // Automatically fill the form when click on one  element of the table
  const handleUpdateInfos = (appointment) => {
    setInputs({
      appointmentID: appointment.appointmentID,
      patientID: appointment.patientID,
      doctorID: appointment.doctorID,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
    });

    setDisabledInput(true);
  };
  return (
    <>
      <div className="app__cancelAppD">
        <div className="roomDetails-container">
          <h2 className="page-title">CANCEL DOCTOR APPOINTMENT</h2>
          <form>
            <div className="input-fields">
              <label htmlFor="AppointmentID">Appointment ID:</label>
              <Input
                placeholder="Appointment ID"
                name="appointmentID"
                value={inputs.appointmentID}
                handleOnChange={handleOnChange}
                inputDisabled={disabledInput}
              />
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="patientID"> Patient ID</label>
              <div>
                <Input
                  placeholder="Patient ID"
                  name="patientID"
                  value={inputs.patientID}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput}
                />
              </div>
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="doctorID"> Doctor ID</label>
              <div>
                <Input
                  placeholder="Doctor ID"
                  name="doctorID"
                  value={inputs.doctorID}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput}
                />
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="gender"> Appointment Date:</label>
              <div className="custom-input-field">
                <div>
                  <Input
                    placeholder="AppointmentDate "
                    name="appointmentDate"
                    value={inputs.appointmentDate}
                    handleOnChange={handleOnChange}
                    inputDisabled={disabledInput}
                  />
                </div>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="gender"> Appointment Time:</label>
              <div className="custom-input-field">
                <Input
                  placeholder="Appointment Time"
                  name="appointmentTime"
                  value={inputs.appointmentTime}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <button onClick={handleC} type="button" className="delete-btn">
                Cancel
              </button>
              <ButtonAction
                iconName="close"
                btnName="Close"
                color="red"
                buttonType="button"
                onClick={handleClose}
              />
            </div>
          </form>
        </div>

        {/* Popup to delete a bed */}
        {showPopupDelete && (
          <div style={{ position: "relative" }}>
            <div className="schedule-delete-popup">
              <p>
                Do you really want to cancel <br />
                the appointment with ID of {inputs.appointmentID} ?
              </p>
              <div className="delete-buttons">
                <button onClick={handleClosePopup}> Cancel</button>
                <button onClick={() => handleCancelApp(appId)}>Delete</button>
              </div>
            </div>
          </div>
        )}

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
                  <tr
                    onClick={(e) => handleUpdateInfos(appointment)}
                    className="doctor-infos select-doctorID"
                    key={index}
                  >
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
    </>
  );
};

export default CancelDocAppDetails;
