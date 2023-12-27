import React, { useEffect, useState } from "react";
import { ButtonAction, Input } from "../../../components";
import { toast } from "react-toastify";
import axios from "axios";

const CancelServiceAppDetails = ({ setOpenCancelPage }) => {
  const [inputs, setInputs] = useState({
    appointmentID: "",
    patientID: "",
    serviceID: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [appId, setAppId] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [disabledInput, setDisabledInput] = useState(false);

  const API_URL_APPOINTMENT = "http://localhost:3001/getAddHospitalSerApp";

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
      toast.error("Please provide an appointment ID");
    } else {
      axios
        .put(`http://localhost:3001/cancelHosAppointment/${appId}`)
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
      serviceID: appointment.hospitalServiceID,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
    });

    setDisabledInput(true);
  };
  return (
    <>
      <div className="app__cancelAppD">
        <div className="roomDetails-container">
          <h2 className="page-title">CANCEL HOSPITAL SERVICE APPOINTMENT</h2>
          <form>
            <div className="input-field doctor-types">
              <label htmlFor="AppointmentID">Appointment ID:</label>
              <div>
                <Input
                  placeholder="Appointment ID"
                  name="appointmentID"
                  value={inputs.appointmentID}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput}
                />
              </div>
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="patientID"> Patient ID :</label>
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
              <label htmlFor="serviceID"> Service ID :</label>
              <div>
                <Input
                  placeholder="Service ID"
                  name="serviceID"
                  value={inputs.serviceID}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput}
                />
              </div>
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="gender"> Appointment Date :</label>
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
            <div className="input-field doctor-types">
              <label htmlFor="gender"> Appointment Time :</label>
              <Input
                placeholder="Appointment Time"
                name="appointmentTime"
                value={inputs.appointmentTime}
                handleOnChange={handleOnChange}
                inputDisabled={disabledInput}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
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

        {/* Table for all Hospital service appointments */}
        <div className="appScheduling-table">
          <table>
            <thead>
              <tr>
                <th>Appointment ID </th>
                <th>Patient ID</th>
                <th>Hospital service ID</th>
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
    </>
  );
};

export default CancelServiceAppDetails;
