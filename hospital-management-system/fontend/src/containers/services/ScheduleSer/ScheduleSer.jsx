import React, { useState } from "react";
import { ButtonAction, ButtonSkip, Input, Select } from "../../../components";

const ScheduleSer = ({ setOpenScheduling }) => {
  const [appointmentInfos, setAppointmentInfos] = useState({
    schedulingID: "",
    doctorID: "",
    doctorType: "",
    timeIn: "",
    timeOut: "",
    availableDays: "",
    schedulingNotes: "",
  });
  const [availableDays, setAvailableDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [selectedDaysList, setSelectedDaysList] = useState("");
  // const [input, setInput] = useState([]);

  const handleOnChangeAppointment = (e) => {
    const { name, value } = e.target;
    setAppointmentInfos({
      ...appointmentInfos,
      [name]: value,
    });
  };
  const handleOnChangeDays = (e) => {
    const { name, checked } = e.target;
    setAvailableDays({
      ...availableDays,
      [name]: checked,
    });
  };

  const doctorIdOptions = [
    { value: "Man", label: "M" },
    { value: "Woman", label: "F" },
  ];
  const handleCloseScheduling = () => {
    setOpenScheduling(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="app__scheduling">
      <div className="app__scheduling-container">
        <h2>Doctor Scheduling Appointment</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-left-box">
            <div className="details-title">
              <h4> Doctor Detail</h4>
              <div className="divider" />
            </div>
            <div className="input-fields">
              <label form="schedulingId"> Scheduling ID:</label>
              <Input
                placeholder="Scheduling ID"
                name="schedulingID"
                value={appointmentInfos.schedulingID}
                handleOnChange={handleOnChangeAppointment}
                // disabled={!isInputEnabled}
              />
            </div>

            <div className="input-field doctor-types">
              <label htmlFor="doctorType"> Doctor ID</label>
              <div>
                <Select
                  name="doctorType"
                  label="doctorType"
                  value={appointmentInfos.doctorType}
                  options={doctorIdOptions}
                  handleOnChange={handleOnChangeAppointment}
                />

                <span className="btn-seeAll">See All</span>
              </div>
            </div>
            <div className="input-fields">
              <label htmlFor="timeIn"> Time In:</label>
              <div>
                <input
                  type="time"
                  id="timeIn"
                  name="timeIn"
                  value={appointmentInfos.timeIn}
                  onChange={handleOnChangeAppointment}
                />
              </div>
            </div>
            <div className="input-fields">
              <label htmlFor="timeOut"> Time Out:</label>
              <div>
                <input
                  type="time"
                  id="timeOut"
                  name="timeOut"
                  value={appointmentInfos.timeOut}
                  onChange={handleOnChangeAppointment}
                  required
                />
              </div>
            </div>

            <div className="input-fields">
              <label htmlFor="availableDays"> Available Days:</label>
              <Input
                placeholder="Available Days"
                name="availableDays"
                value={appointmentInfos.availableDays}
                handleOnChange={handleOnChangeAppointment}
                // disabled={!isInputEnabled}
              />
            </div>

            <div className="input-fields">
              <label htmlFor="schedulingNotes"> Schedule Notes:</label>
              <Input
                placeholder="Schedule Notes"
                name="schedulingNotes"
                value={appointmentInfos.schedulingNotes}
                handleOnChange={handleOnChangeAppointment}
                // disabled={!isInputEnabled}
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
          <aside>
            <div className="details-title">
              <h4> Available Days</h4>
              <div className="days-divider" />
            </div>
            <div className="input-field">
              <label htmlFor="monday">Monday:</label>
              <div>
                <input
                  type="checkbox"
                  id="monday"
                  name="monday"
                  value={availableDays.monday}
                  onChange={handleOnChangeDays}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="tuesday">Tuesday:</label>
              <div>
                <input
                  type="checkbox"
                  id="tuesday"
                  name="tuesday"
                  value={availableDays.tuesday}
                  onChange={handleOnChangeDays}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="wednesday">Wednesday:</label>
              <div>
                <input
                  type="checkbox"
                  id="wednesday"
                  name="wednesday"
                  value={availableDays.wednesday}
                  onChange={handleOnChangeDays}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="thursday">Thursday:</label>
              <div>
                <input
                  type="checkbox"
                  id="thursday"
                  name="thursday"
                  value={availableDays.thursday}
                  onChange={handleOnChangeDays}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="friday">Friday:</label>
              <div>
                <input
                  type="checkbox"
                  id="friday"
                  name="friday"
                  value={availableDays.friday}
                  onChange={handleOnChangeDays}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="saturday">Saturday:</label>
              <div>
                <input
                  type="checkbox"
                  id="saturday"
                  name="saturday"
                  value={availableDays.saturday}
                  onChange={handleOnChangeDays}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="sunday">Sunday:</label>
              <div>
                <input
                  type="checkbox"
                  id="sunday"
                  name="sunday"
                  value={availableDays.sunday}
                  onChange={handleOnChangeDays}
                />
              </div>
            </div>
          </aside>
        </form>

        <div className="appScheduling-table">
          <table>
            <thead>
              <tr>
                <th>Schedule ID </th>
                <th>Doctor ID </th>
                <th>Doctor In</th>
                <th>Doctor Out</th>
                <th>Doctor Available</th>
                <th>Schedule Notes</th>
              </tr>
            </thead>
            <tbody>
              {/* {!hideData &&
                  medicalSDetail.map((medicalService, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{medicalService.serviceID}</td>
                        <td>{medicalService.serviceName}</td>
                        <td>{medicalService.amount}</td>
                        <td>{medicalService.duration}</td>
                        <td>{medicalService.additionalNotes}</td>
                      </tr>
                    );
                  })} */}
              {/* {hideDataSearched &&
                  searchResult.map((medicalService, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{medicalService.serviceID}</td>
                        <td>{medicalService.serviceName}</td>
                        <td>{medicalService.amount}</td>
                        <td>{medicalService.duration}</td>
                        <td>{medicalService.additionalNotes}</td>
                      </tr>
                    );
                  })} */}
            </tbody>
          </table>
        </div>

        <div className="container-menu">
          <div className="container-menu-header">
            <ButtonSkip iconName="doubleLeft" color="green" />
            <ButtonSkip iconName="arrowLeft" color="blue" />
            <input type="text" placeholder="Record No" />
            <ButtonSkip iconName="arrowRight" color="blue" />
            <ButtonSkip iconName="doubleRight" color="green" />
          </div>
          <div className="container-menu-btn">
            <ButtonAction
              iconName="add"
              btnName="Add"
              color="green"
              buttonType="submit"
              // onClick={handleAddMedicalS}
            />

            <ButtonAction
              iconName="close"
              btnName="Cancel"
              color="red"
              buttonType="button"
              onClick={handleCloseScheduling}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSer;
