import React, { useEffect, useState } from "react";
import "./scheduling.css";
import { ButtonAction, ButtonSkip, Input, Select } from "../../../components";
import {
  selectDocAppointment,
  selectDoctorDetails,
} from "../../../redux/slice/doctorSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Scheduling = ({ setOpenScheduling }) => {
  const [appointmentInfos, setAppointmentInfos] = useState({
    schedulingID: "",
    doctorID: "",
    timeIn: "",
    timeOut: "",
    // availableDay: "",
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

  const [selectedDays, setSelectedDays] = useState("");
  const input = { ...appointmentInfos, selectedDays };

  const doctorDetails = useSelector(selectDoctorDetails);
  const docAppointmentDetails = useSelector(selectDocAppointment);
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

  const handleCloseScheduling = () => {
    setOpenScheduling(false);
  };

  useEffect(() => {
    const selectedDays = Object.keys(availableDays).filter(
      (day) => availableDays[day]
    );
    const selectedDaysString = selectedDays.join(", ");
    setSelectedDays(selectedDaysString);
    // console.log("the docAppointmentDetails ", docAppointmentDetails);
  }, [availableDays, input]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/docAppointment", input)
      .then((res) => {
        toast.success("Added successfully");
      })
      .catch((err) => toast.error(err));

    console.log("the final result", appointmentInfos);
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
              />
            </div>

            <div className="input-field doctor-types">
              <label htmlFor="doctorID"> Doctor ID</label>
              <div>
                <select
                  name="doctorID"
                  id="doctorID"
                  value={appointmentInfos.doctorID}
                  onChange={handleOnChangeAppointment}
                  required
                >
                  <option value="">Select a doctor ID</option>
                  {doctorDetails.map((doctor, index) => (
                    <option key={index} value={doctor.doctorID}>
                      {doctor.doctorID}
                    </option>
                  ))}
                </select>

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
                name="availableDay"
                value={selectedDays}
                handleOnChange={(e) => setSelectedDays(e.target.value)}
                readOnly
              />
            </div>

            <div className="input-fields">
              <label htmlFor="schedulingNotes"> Schedule Notes:</label>
              <Input
                placeholder="Schedule Notes"
                name="schedulingNotes"
                value={appointmentInfos.schedulingNotes}
                handleOnChange={handleOnChangeAppointment}
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
                  name="Monday"
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
                  name="Tuesday"
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
                  name="Wednesday"
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
                  name="Thursday"
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
                  name="Friday"
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
                  name="Saturday"
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
                  name="Sunday"
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
                <th>Time In</th>
                <th>Time Out</th>
                <th> Available Days</th>
                <th>Schedule Notes</th>
              </tr>
            </thead>
            <tbody>
              {docAppointmentDetails.map((docAppointment, index) => {
                return (
                  <tr className="doctor-infos" key={index}>
                    <td>{docAppointment.schedulingID}</td>
                    <td>{docAppointment.doctorID}</td>
                    <td>{docAppointment.timeIn}</td>
                    <td>{docAppointment.timeOut}</td>
                    <td>{docAppointment.selectedDays}</td>
                    <td>{docAppointment.schedulingNotes}</td>
                  </tr>
                );
              })}
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

export default Scheduling;
