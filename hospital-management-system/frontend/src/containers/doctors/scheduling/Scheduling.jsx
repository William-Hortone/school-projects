import React, { useEffect, useState } from "react";
import "./scheduling.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import {
  selectDocAppointment,
  selectDoctorDetails,
} from "../../../redux/slice/doctorSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Scheduling = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [appointmentInfos, setAppointmentInfos] = useState({
    schedulingID: "",
    doctorID: "",
    timeIn: "",
    timeOut: "",
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
  const [scheduleId, setScheduleId] = useState("");
  const [pickedDoctorID, setPickedDoctorID] = useState("");
  const [docIDisPicked, setDocIDisPicked] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showDocDetailTable, setShowDocDetailTable] = useState(false);
  const input = { ...appointmentInfos, selectedDays };

  const doctorDetails = useSelector(selectDoctorDetails);
  const docAppointmentDetails = useSelector(selectDocAppointment);

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
    setOpenPage(false);
    setOpenScheduling(false);
    setOpenScheduleDelete(false);
    setAppointmentInfos({
      schedulingID: "",
      doctorID: "",
      timeIn: "",
      timeOut: "",
      schedulingNotes: "",
    });
  };

  // To Display only selected days
  useEffect(() => {
    const selectedDays = Object.keys(availableDays).filter(
      (day) => availableDays[day]
    );
    const selectedDaysString = selectedDays.join(", ");
    setSelectedDays(selectedDaysString);
    setScheduleId(appointmentInfos.schedulingID);
  }, [availableDays, input, appointmentInfos.schedulingID]);

  // Function to generate the ID
  const handleAddAppointment = () => {
    if (addOnSubmit) {
      if (docAppointmentDetails.length === 0) {
        setAppointmentInfos({
          ...appointmentInfos,
          schedulingID: "docA_001",
        });
      } else {
        const lastScheduleId =
          docAppointmentDetails[docAppointmentDetails.length - 1].schedulingID;
        const numericPart = parseInt(lastScheduleId.split("_")[1]);

        const nextScheduleId = `docA_${(numericPart + 1)
          .toString()
          .padStart(3, "0")}`;

        setAppointmentInfos({
          ...appointmentInfos,
          schedulingID: nextScheduleId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/docAppointment", input)
      .then((res) => {
        toast.success("Added successfully");
      })
      .catch((err) => toast.error(err));
  };

  // Function to update an appointment
  const handleSubmitEditDoctor = (e, scheduleId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editDocAppointment/${scheduleId}`, input)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Appointment updated successfully");
        } else if (res.data === "notfound") {
          toast.error("Wrong ID");
        } else {
          toast.error("An error occurred while updating the service");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  const handleDelete = () => {
    if (scheduleId === undefined || scheduleId === "") {
      toast.error("Please provide a Scheduling ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  // Function to Delete an appointment
  const handleDeleteAppointment = (scheduleId) => {
    if (scheduleId === undefined || scheduleId === "") {
      toast.error("Please provide a Scheduling ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteDocAppointment/${scheduleId}`)
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
      // handleRefresh();
    }
    setShowPopupDelete(false);
  };

  const handleShowDocDetailsTable = () => {
    setShowDocDetailTable(true);
  };

  const handleCloseDocDetailsTable = () => {
    setShowDocDetailTable(false);
  };

  // Passing the doctor Id to the form when selected
  const handleDoctorId = (docId) => {
    setShowDocDetailTable(false);
    setPickedDoctorID(docId);
    setAppointmentInfos({
      ...appointmentInfos,
      doctorID: docId,
    });
    setDocIDisPicked(true);
  };

  // automatically fill the form when click on one row of the table
  const handleUpdateInfos = (docAppointment) => {
    if (!addOnSubmit) {
      setAppointmentInfos({
        schedulingID: docAppointment.schedulingID,
        doctorID: docAppointment.doctorID,
        timeIn: docAppointment.timeIn,
        timeOut: docAppointment.timeOut,
        schedulingNotes: docAppointment.schedulingNotes,
      });

      setSelectedDays(docAppointment.selectedDays);
      setPickedDoctorID(docAppointment.doctorID);
      setDocIDisPicked(true);
      setDisabledInput(true);
    }
  };

  return (
    <>
      <div className="app__scheduling">
        <div className="app__scheduling-container">
          <h2>Doctor Scheduling Appointment</h2>

          <form
            onSubmit={
              addOnSubmit
                ? handleSubmit
                : (e) => handleSubmitEditDoctor(e, scheduleId)
            }
          >
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
                  inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
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
                    <option required value={docIDisPicked}>
                      {docIDisPicked ? pickedDoctorID : "Select a doctor ID"}
                    </option>
                    {doctorDetails.map((doctor, index) => (
                      <option key={index} value={doctor.doctorID}>
                        {doctor.doctorID}
                      </option>
                    ))}
                  </select>

                  <span
                    onClick={handleShowDocDetailsTable}
                    className="btn-seeAll"
                  >
                    See All
                  </span>
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
                    required
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
              {!openScheduleDelete && (
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              )}
              {openScheduleDelete && (
                <button
                  onClick={handleDelete}
                  type="button"
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
            <aside>
              <div className="details-title">
                <h4> Available Days</h4>
                <div className="days-divider" />
              </div>
              <div className="input-field-days">
                <label htmlFor="monday">Monday:</label>
                <div>
                  <input
                    type="checkbox"
                    id="monday"
                    name="Mon"
                    value={availableDays.monday}
                    onChange={handleOnChangeDays}
                  />
                </div>
              </div>
              <div className="input-field-days">
                <label htmlFor="tuesday">Tuesday:</label>
                <div>
                  <input
                    type="checkbox"
                    id="tuesday"
                    name="Tue"
                    value={availableDays.tuesday}
                    onChange={handleOnChangeDays}
                  />
                </div>
              </div>
              <div className="input-field-days">
                <label htmlFor="wednesday">Wednesday:</label>
                <div>
                  <input
                    type="checkbox"
                    id="wednesday"
                    name="Wed"
                    value={availableDays.wednesday}
                    onChange={handleOnChangeDays}
                  />
                </div>
              </div>
              <div className="input-field-days">
                <label htmlFor="thursday">Thursday:</label>
                <div>
                  <input
                    type="checkbox"
                    id="thursday"
                    name="Thu"
                    value={availableDays.thursday}
                    onChange={handleOnChangeDays}
                  />
                </div>
              </div>
              <div className="input-field-days">
                <label htmlFor="friday">Friday:</label>
                <div>
                  <input
                    type="checkbox"
                    id="friday"
                    name="Fri"
                    value={availableDays.friday}
                    onChange={handleOnChangeDays}
                  />
                </div>
              </div>
              <div className="input-field-days">
                <label htmlFor="saturday">Saturday:</label>
                <div>
                  <input
                    type="checkbox"
                    id="saturday"
                    name="Sat"
                    value={availableDays.saturday}
                    onChange={handleOnChangeDays}
                  />
                </div>
              </div>
              <div className="input-field-days">
                <label htmlFor="sunday">Sunday:</label>
                <div>
                  <input
                    type="checkbox"
                    id="sunday"
                    name="Sun"
                    value={availableDays.sunday}
                    onChange={handleOnChangeDays}
                  />
                </div>
              </div>
            </aside>
          </form>

          {/* Table to display and the DOCTOR APPOINTMENT SCHEDULING */}
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
                    <tr
                      onClick={(e) => handleUpdateInfos(docAppointment)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-doctorID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
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

          {/* Popup to delete */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the doctor with ID of {appointmentInfos.schedulingID} ?
                </p>
                <div className="delete-buttons">
                  <button onClick={handleClosePopup}> Cancel</button>
                  <button onClick={() => handleDeleteAppointment(scheduleId)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Container menu btn */}
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
                onClick={handleAddAppointment}
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

      {/* Table to select a doctor ID */}
      {showDocDetailTable && (
        <div className="appScheduling-table-id">
          <div onClick={handleCloseDocDetailsTable} className="close-tableID">
            close
          </div>
          <h2>DOCTOR DETAILS</h2>
          <div className="appScheduling-table">
            <table>
              <thead>
                <tr>
                  <th>DoctorID </th>
                  <th>DoctorFN</th>
                  <th>NicNo</th>
                  <th>DoctorLN</th>
                  <th>HomePhone</th>
                  <th>MobilePhone</th>
                  <th>Qualifications</th>
                  <th>Specialization</th>
                  <th>VisitingCharge</th>
                  <th>ChannelingCharge</th>
                  <th>BasicSalary</th>
                  <th>Sex</th>
                  <th>DoctorType</th>
                  <th>DoctorAddress</th>
                  <th>DoctorNotes</th>
                </tr>
              </thead>
              <tbody>
                {doctorDetails.map((doctor, index) => {
                  return (
                    <tr
                      className="doctor-infos select-doctorID"
                      onClick={(e) => handleDoctorId(doctor.doctorID)}
                      key={index}
                      style={{
                        cursor: "pointer",
                        hover: { backgroundColor: "green" },
                      }}
                    >
                      <td>{doctor.doctorID}</td>
                      <td>{doctor.doctorFN}</td>
                      <td>{doctor.nicNo}</td>
                      <td>{doctor.doctorLN}</td>
                      <td>{doctor.homePhone}</td>
                      <td>{doctor.mobilePhone}</td>
                      <td>{doctor.Qualifications}</td>
                      <td>{doctor.Specialization}</td>
                      <td>{doctor.VisitingCharge}</td>
                      <td>{doctor.ChannelingCharge}</td>
                      <td>{doctor.basicSalary}</td>
                      <td>{doctor.sex}</td>
                      <td>{doctor.doctorType}</td>
                      <td>{doctor.doctorAddress}</td>
                      <td>{doctor.doctorNotes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Scheduling;
