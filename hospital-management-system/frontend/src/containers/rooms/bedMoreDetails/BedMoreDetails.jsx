import React, { useEffect, useState } from "react";
import "./bedMoreDetails.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import {
  selectDocAppointment,
  selectDoctorDetails,
} from "../../../redux/slice/doctorSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { selectRoomsDetails } from "../../../redux/slice/roomsSlice";
import { selectWardDetails } from "../../../redux/slice/wardSlice";

const BedMoreDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
}) => {
  const [inputs, setInputs] = useState({
    bedID: "",
    place: "",
    bedDesc: "",
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

  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedWards, setSelectedWards] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [pickedDoctorID, setPickedDoctorID] = useState("");
  const [docIDisPicked, setDocIDisPicked] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showDocDetailTable, setShowDocDetailTable] = useState(false);
  //   const input = { ...inputs, selectedDays };

  const doctorDetails = useSelector(selectDoctorDetails);
  const roomsDetails = useSelector(selectRoomsDetails);
  const wardsDetails = useSelector(selectWardDetails);
  const docAppointmentDetails = useSelector(selectDocAppointment);

  const handleOnChangeAppointment = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleRoomSelected = (e) => {
    const { name, value } = e.target;

    setSelectedRooms({ [name]: value });
  };

  const handleWardsSelected = (e) => {
    const { name, value } = e.target;

    setSelectedWards({ [name]: value });
  };

  const handleCloseScheduling = () => {
    setOpenScheduling(false);
    setOpenScheduleDelete(false);
    setInputs({
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
    setScheduleId(inputs.schedulingID);
  }, [availableDays, inputs.schedulingID]);

  // Function to generate the ID
  const handleAddBed = () => {
    setInputs({
      ...inputs,
      bedID: "bed_001",
    });
    // if (addOnSubmit) {
    //   if (docAppointmentDetails.length === 0) {
    //     setInputs({
    //       ...inputs,
    //       schedulingID: "bed_001",
    //     });
    //   } else {
    //     const lastScheduleId =
    //       docAppointmentDetails[docAppointmentDetails.length - 1].schedulingID;
    //     const numericPart = parseInt(lastScheduleId.split("_")[1]);

    //     const nextScheduleId = `docA_${(numericPart + 1)
    //       .toString()
    //       .padStart(3, "0")}`;

    //     setInputs({
    //       ...inputs,
    //       schedulingID: nextScheduleId,
    //     });
    //   }
    // } else {
    //   toast.error("Please Enter a Id manually to update");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("this is the data", inputs);

    // axios
    //   .post("http://localhost:3001/docAppointment", inputs)
    //   .then((res) => {
    //     toast.success("Added successfully");
    //   })
    //   .catch((err) => toast.error(err));
  };

  // Function to update an appointment
  const handleSubmitEditDoctor = (e, scheduleId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editDocAppointment/${scheduleId}`, inputs)
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
    setInputs({
      ...inputs,
      doctorID: docId,
    });
    setDocIDisPicked(true);
  };

  // automatically fill the form when click on one row of the table
  const handleUpdateInfos = (docAppointment) => {
    if (!addOnSubmit) {
      setInputs({
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
          <h2>Bed Details</h2>

          <form
            onSubmit={
              addOnSubmit
                ? handleSubmit
                : (e) => handleSubmitEditDoctor(e, scheduleId)
            }
          >
            <div className="form-left-box">
              <div className="details-title">
                <h4> Bed Details</h4>
                <div className="divider" />
              </div>
              <div className="input-fields">
                <label form="bedID"> Bed ID:</label>
                <Input
                  placeholder="Bed ID"
                  name="bedID"
                  value={inputs.bedID}
                  handleOnChange={handleOnChangeAppointment}
                  inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                />
              </div>

              {/* <div className="input-field doctor-types">
                <label htmlFor="doctorID"> Doctor ID</label>
                <div>
                  <select
                    name="doctorID"
                    id="doctorID"
                    value={inputs.doctorID}
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
                    value={inputs.timeIn}
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
                    value={inputs.timeOut}
                    onChange={handleOnChangeAppointment}
                    required
                  />
                </div>
              </div> */}

              <div className="input-fields">
                <label htmlFor="place"> Room / Ward:</label>
                <Input
                  placeholder="Place infos"
                  name="place"
                  value={inputs.place}
                  handleOnChange={handleOnChangeAppointment}
                  readOnly
                />
              </div>

              <div className="input-fields">
                <label htmlFor="schedulingNotes">Bed Description:</label>
                <textarea
                  name="bedDesc"
                  id=""
                  cols="39"
                  placeholder="Bed description"
                  rows="10"
                  onChange={handleOnChangeAppointment}
                  value={inputs.bedDesc}
                ></textarea>
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
                <h4> Choose a room or ward</h4>
                {/* <div className="days-divider" /> */}
              </div>

              <div className="aside-option-box">
                <label htmlFor="rooms"> Rooms</label>
                <div className="option-wrapper">
                  <select
                    name="rooms"
                    id="rooms"
                    value={selectedRooms}
                    onChange={handleRoomSelected}
                    required
                  >
                    <option required value={selectedRooms}>
                      {/* {docIDisPicked ? pickedDoctorID : "Select a room ID"} */}
                      {/* {docIDisPicked ? pickedDoctorID : "Select a room ID"} */}
                    </option>
                    {roomsDetails.map((room, index) => (
                      <option key={index} value={room.roomID}>
                        {room.roomID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="aside-option-box">
                <label htmlFor="wards"> Wards</label>
                <div className="option-wrapper">
                  <select
                    name="wards"
                    id="wards"
                    value={selectedWards}
                    onChange={(e) => setSelectedWards(e.target.value)}
                    required
                  >
                    <option required value={docIDisPicked}>
                      {docIDisPicked ? pickedDoctorID : "Select a ward ID"}
                    </option>
                    {wardsDetails.map((ward, index) => (
                      <option key={index} value={ward.wardID}>
                        {ward.wardID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="input-field-days">
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
              </div> */}
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

          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the doctor with ID of {inputs.schedulingID} ?
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
                onClick={handleAddBed}
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

      {showDocDetailTable && (
        <div className="appScheduling-table-id">
          {/* <div className="appScheduling-tableId-container">

        </div> */}
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

export default BedMoreDetails;
