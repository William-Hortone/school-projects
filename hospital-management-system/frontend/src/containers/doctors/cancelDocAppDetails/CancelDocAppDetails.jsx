import React, { useState } from "react";
import "./cancelDocAppDetails.css";
import { Input } from "../../../components";

const CancelDocAppDetails = () => {
  const [inputs, setInputs] = useState({
    appointmentID: "",
    patientID: "",
    doctorID: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <div className="app__cancelAppD">
      <div className="roomDetails-container">
        <h2 className="page-title">CANCEL DOCTOR APPOINTMENT</h2>
        <form
        // onSubmit={handleSubmit}
        >
          <div className="input-fields">
            <label form="AppointmentID">Appointment ID:</label>
            <Input
              placeholder="Appointment ID"
              name="appointmentID"
              value={inputs.appointmentID}
              handleOnChange={handleOnChange}
              //   inputDisabled="true"
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
                inputDisabled="true"
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
                inputDisabled="true"
              />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="gender"> Appointment Date:</label>
            <div className="custom-input-field">
              <div>
                <Input
                  placeholder="appointmentDate "
                  name="appointmentDate"
                  value={inputs.appointmentDate}
                  handleOnChange={handleOnChange}
                  inputDisabled="true"
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
                inputDisabled="true"
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CancelDocAppDetails;
