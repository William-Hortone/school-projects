import { useEffect, useState } from "react";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { useSelector } from "react-redux";
import {
  selectHospitalSchedule,
  selectMedicalService,
} from "../../../redux/slice/medicalServiceSlice";
import "./scheduleSer.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const ScheduleSer = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [appointmentInfos, setAppointmentInfos] = useState({
    schedulingID: "",
    serviceID: "",
    serviceStarts: "",
    serviceEnds: "",
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
  const [pickedServiceID, setPickedServiceID] = useState("");
  const [docIDisPicked, setDocIDisPicked] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showDocDetailTable, setShowDocDetailTable] = useState(false);
  const input = { ...appointmentInfos, selectedDays };

  const hosScheduleDetails = useSelector(selectHospitalSchedule);
  const medicalServiceDetails = useSelector(selectMedicalService);

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
      serviceID: "",
      serviceStarts: "",
      serviceEnds: "",
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

  // To generate the schedule ID
  const handleAddAppointment = () => {
    if (addOnSubmit) {
      // Initialize the Id if the array is empty
      if (hosScheduleDetails.length === 0) {
        setAppointmentInfos({
          ...appointmentInfos,
          schedulingID: "schedule_001",
        });
      } else {
        // Get the last Id and increment it
        const lastScheduleId =
          hosScheduleDetails[hosScheduleDetails.length - 1].schedulingID;
        const numericPart = parseInt(lastScheduleId.split("_")[1]);
        const nextScheduleId = `schedule_${(numericPart + 1)
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
      .post("http://localhost:3001/hospitalServiceSchedule", input)
      .then((res) => {
        toast.success("Added successfully");
      })
      .catch((err) => toast.error(err));
  };

  // Edit a service schedule
  const handleSubmitEditDoctor = (e, scheduleId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editHospitalSchedule/${scheduleId}`, input)
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

  // Delete a service schedule
  const handleDeleteAppointment = (scheduleId) => {
    if (scheduleId === undefined || scheduleId === "") {
      toast.error("Please provide a Scheduling ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteHospitalSchedule/${scheduleId}`)
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

  const handleShowDocDetailsTable = () => {
    setShowDocDetailTable(true);
  };

  const handleCloseDocDetailsTable = () => {
    setShowDocDetailTable(false);
  };

  // Passing the Service Id to the form when selected
  const handleServiceId = (serID) => {
    setShowDocDetailTable(false);
    setPickedServiceID(serID);
    setAppointmentInfos({
      ...appointmentInfos,
      serviceID: serID,
    });
    setDocIDisPicked(true);
  };

  // Automatically fill the form when click on one row of the table
  const handleUpdateInfos = (serAppointment) => {
    if (!addOnSubmit) {
      setAppointmentInfos({
        schedulingID: serAppointment.schedulingID,
        serviceID: serAppointment.serviceID,
        serviceStarts: serAppointment.serviceStarts,
        serviceEnds: serAppointment.serviceEnds,
        schedulingNotes: serAppointment.schedulingNotes,
      });

      setSelectedDays(serAppointment.selectedDays);
      setPickedServiceID(serAppointment.serviceID);
      setDocIDisPicked(true);
      setDisabledInput(true);
    }
  };

  return (
    <>
      <div className="app__scheduling">
        <div className="app__scheduling-container">
          <h2>HOSPITAL SERVICE DETAILS</h2>

          <form
            onSubmit={
              addOnSubmit
                ? handleSubmit
                : (e) => handleSubmitEditDoctor(e, scheduleId)
            }
          >
            <div className="form-left-box">
              <div className="details-title">
                <h4> Service Detail</h4>
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
                <label htmlFor="doctorID"> Service ID</label>
                <div>
                  <select
                    name="serviceID"
                    id="serviceID"
                    value={appointmentInfos.serviceID}
                    onChange={handleOnChangeAppointment}
                    required
                  >
                    <option value={docIDisPicked}>
                      {docIDisPicked ? pickedServiceID : "Select a service ID"}
                    </option>
                    {medicalServiceDetails.map((medicalService, index) => (
                      <option key={index} value={medicalService.serviceID}>
                        {medicalService.serviceID}
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
                <label htmlFor="serviceStarts"> Service Starts:</label>
                <div>
                  <input
                    type="time"
                    id="serviceStarts"
                    name="serviceStarts"
                    value={appointmentInfos.serviceStarts}
                    onChange={handleOnChangeAppointment}
                    required
                  />
                </div>
              </div>
              <div className="input-fields">
                <label htmlFor="serviceEnds"> Service Ends:</label>
                <div>
                  <input
                    type="time"
                    id="serviceEnds"
                    name="serviceEnds"
                    value={appointmentInfos.serviceEnds}
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

            {/* Available Days */}
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

          {/* The table  to display the schedules*/}
          <div className="appScheduling-table">
            <table>
              <thead>
                <tr>
                  <th>Schedule ID </th>
                  <th>Service ID </th>
                  <th>Service Starts</th>
                  <th>Service Ends</th>
                  <th> Available Days</th>
                  <th>Schedule Notes</th>
                </tr>
              </thead>
              <tbody>
                {hosScheduleDetails.map((serAppointment, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(serAppointment)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-serviceID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{serAppointment.schedulingID}</td>
                      <td>{serAppointment.serviceID}</td>
                      <td>{serAppointment.serviceStarts}</td>
                      <td>{serAppointment.serviceEnds}</td>
                      <td>{serAppointment.selectedDays}</td>
                      <td>{serAppointment.schedulingNotes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* The buttons container */}
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

          {/* The popup to delete */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the Service with ID of {appointmentInfos.schedulingID} ?
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
        </div>
      </div>

      {/* Popup table to choose the service ID */}
      {showDocDetailTable && (
        <div className="appScheduling-table-id ">
          <div onClick={handleCloseDocDetailsTable} className="close-tableID">
            <FaTimes size={24} color="#000" />
          </div>
          <h2>SERVICES DETAILS</h2>
          <div className="appScheduling-table">
            <table>
              <thead>
                <tr>
                  <th>Service ID </th>
                  <th>Service Name</th>
                  <th>Amount</th>
                  <th>Duration</th>
                  <th>Additional Notes</th>
                </tr>
              </thead>
              <tbody>
                {medicalServiceDetails.map((medicalService, index) => {
                  return (
                    <tr
                      className="doctor-infos select-serviceID"
                      onClick={(e) => handleServiceId(medicalService.serviceID)}
                      key={index}
                    >
                      <td>{medicalService.serviceID}</td>
                      <td>{medicalService.serviceName}</td>
                      <td>{medicalService.amount}</td>
                      <td>{medicalService.duration}</td>
                      <td>{medicalService.additionalNotes}</td>
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

export default ScheduleSer;
