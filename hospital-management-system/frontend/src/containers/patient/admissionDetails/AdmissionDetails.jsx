import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";

const AdmissionDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [inputs, setInputs] = useState({
    admissionID: "",
    patientID: "",
    doctorID: "",
    guardianID: "",
    admissionDate: "",
    admissionTime: "",
    bedID: "",
    bedPlace: "",
    emergency: "",
    bedAvailability: "",
  });
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedWards, setSelectedWards] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [id, setId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState();
  const [pickedTime, setPickedTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [theBedId, setTheBedId] = useState("");
  const [bedStatus, setBedStatus] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [roomIsSelected, setRoomIsSelected] = useState(true);
  const [allBeds, setAllBeds] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [roomsDetails, setRoomsDetails] = useState([]);
  const [wardsDetails, setWardsDetails] = useState([]);
  const [allGuardians, setAllGuardians] = useState([]);
  const [allAdmission, setAllAdmission] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  // To Get all the available beds
  const API_URL = "http://localhost:3001/getBedsDetails";
  const API_URL_PATIENT = "http://localhost:3001/getInPatientsDetails";
  const API_URL_WARS = "http://localhost:3001/getWardsDetails";
  const API_URL_ROOMS = "http://localhost:3001/getRoomsDetails";
  const API_URL_GUARDIAN = "http://localhost:3001/getGuardianDetails";
  const API_URL_DOCTOR = "http://localhost:3001/getDoctors";
  const API_URL_ADMISSION = "http://localhost:3001/getAdmissionDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllBeds(data);
  };
  const fetchDataPatient = async () => {
    const { data } = await axios.get(API_URL_PATIENT);
    setAllPatients(data);
  };
  const fetchDataWars = async () => {
    const { data } = await axios.get(API_URL_WARS);
    setWardsDetails(data);
  };
  const fetchDataRooms = async () => {
    const { data } = await axios.get(API_URL_ROOMS);
    setRoomsDetails(data);
  };
  const fetchDataGuardians = async () => {
    const { data } = await axios.get(API_URL_GUARDIAN);
    setAllGuardians(data);
  };
  const fetchDataDoctors = async () => {
    const { data } = await axios.get(API_URL_DOCTOR);
    setAllDoctors(data);
  };
  const fetchDataAdmission = async () => {
    const { data } = await axios.get(API_URL_ADMISSION);
    setAllAdmission(data);
  };

  useEffect(() => {
    fetchDataGuardians();
    fetchDataAdmission();
    fetchDataPatient();
    fetchDataDoctors();
    fetchDataRooms();
    fetchDataWars();
    fetchData();
  }, []);

  useEffect(() => {
    setTheBedId(inputs.bedID);
  }, [inputs.bedID]);

  useEffect(() => {
    setId(inputs.admissionID);
  }, [inputs.admissionID]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleCloseScheduling = () => {
    setOpenPage(false);
    setOpenScheduling(false);
    setOpenScheduleDelete(false);
    setInputs({
      admissionID: "",
      patientID: "",
      doctorID: "",
      guardianID: "",
      admissionDate: "",
      admissionTime: "",
      bedID: "",
      bedPlace: "",
      emergency: "",
      bedAvailability: "",
    });
  };

  // Function to generate the ID
  const handleAddBed = () => {
    if (addOnSubmit) {
      if (allAdmission.length === 0) {
        setInputs({
          ...inputs,
          admissionID: "ad_001",
        });
      } else {
        const lastElementId = allAdmission[allAdmission.length - 1].admissionID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextId = `ad_${(numericPart + 1).toString().padStart(3, "0")}`;

        setInputs({
          ...inputs,
          admissionID: nextId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // Function to add a new admission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      inputs.bedAvailability === undefined ||
      inputs.bedAvailability === "" ||
      inputs.bedAvailability !== "the bed is available"
    ) {
      toast.error("Please select an available bed");
    } else {
      try {
        // update the bed availability
        axios
          .put(`http://localhost:3001/updateBedStatus/${theBedId}`)
          .then((res) => {
            if (res.data === "success") {
              toast.success("Bed status updated ");
            } else if (res.data === "notfound") {
              toast.error("Wrong ID");
            } else {
              toast.error("An error occurred while updating ");
            }
          })
          .catch((err) => {
            toast.error(err);
          });

        // Send data for creating a new admission
        axios
          .post("http://localhost:3001/addAdmission", inputs)
          .then((res) => {
            toast.success("Admission added successfully");
          })
          .catch((err) => toast.error(err));
      } catch (error) {
        toast.error("Error handling bed status: " + error.message);
      }
    }
  };

  // Function to update an admission details
  const handleSubmitEdit = (e, id) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editAdmissionDetails/${id}`, inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Updated successfully");
        } else if (res.data === "notfound") {
          toast.error("Wrong ID");
        } else {
          toast.error("An error occurred while updating ");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleDelete = () => {
    if (theBedId === undefined || theBedId === "") {
      toast.error("Please provide a bed ID");
    } else {
      setShowPopupDelete(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // Function to Delete a admission
  const handleDeleteBed = (id) => {
    if (id === undefined || id === "") {
      toast.error("Please provide an admission ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteAdmission/${id}`)
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

  // Automatically fill the form when click on one  element of the table
  const handleUpdateInfos = (admission) => {
    if (!addOnSubmit) {
      setInputs({
        admissionID: admission.admissionID,
        patientID: admission.patientID,
        doctorID: admission.doctorID,
        guardianID: admission.guardianID,
        bedID: admission.bedID,
        bedPlace: admission.bedPlace,
        emergency: admission.emergency,
        bedAvailability: admission.bedAvailability,
      });
      setSelectedDate(admission.admissionDate);
      setSelectedTime(admission.admissionTime);

      setDisabledInput(true);
    }
  };

  const handleSelectPlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  useEffect(() => {
    if (selectedPlace === "room") {
      setRoomIsSelected(true);
    } else {
      if (selectedPlace === "ward") {
        setRoomIsSelected(false);
      }
    }
  }, [selectedPlace]);

  useEffect(() => {
    // If room is selected pass the selected room
    if (roomIsSelected) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        bedPlace: selectedRooms,
      }));
    }
    // If ward is selected pass the selected ward
    else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        bedPlace: selectedWards,
      }));
    }
  }, [roomIsSelected, selectedRooms, selectedWards]);

  //  Set the format for the Date
  useEffect(() => {
    const handleFilterDate = () => {
      if (startDate) {
        const result = startDate.toString();
        const formattedDate = result.slice(0, 15);
        setSelectedDate(formattedDate);
      }
    };
    handleFilterDate();
  }, [startDate]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      admissionDate: selectedDate,
    }));
  }, [selectedDate]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      bedAvailability: bedStatus,
    }));
  }, [bedStatus]);

  //Define a bed status according to the bed selected
  useEffect(() => {
    const handleFilter = (theBedId) => {
      const result = allBeds.filter((beds) => beds.bedID === theBedId);

      if (result.length > 0) {
        if (result[0].isOccupied === false) {
          setBedStatus("the bed is available");
        } else {
          setBedStatus("the bed is not available");
        }
      }
    };

    handleFilter(theBedId);
  }, [theBedId, allBeds, bedStatus]);

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
    setInputs((prev) => ({
      ...prev,
      admissionTime: selectedTime,
    }));
  }, [selectedTime]);

  return (
    <>
      <div className="app__scheduling">
        <div className="app__scheduling-container">
          <h2>Admission Details</h2>

          <form
            onSubmit={
              addOnSubmit ? handleSubmit : (e) => handleSubmitEdit(e, id)
            }
          >
            <div className="form-left-box" style={{ maxWidth: "60%" }}>
              <div className="details-title">
                <h4> Admission Details</h4>
                <div className="divider" />
              </div>
              <div className="input-fields" style={{ marginRight: 0 }}>
                <label form="admissionID"> AdmissionID:</label>
                <Input
                  placeholder="AdmissionID"
                  name="admissionID"
                  value={inputs.admissionID}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                />
              </div>
              <div className="input-field doctor-types">
                <label htmlFor="patientID"> PatientID</label>
                <div>
                  <select
                    name="patientID"
                    id="patientID"
                    value={inputs.patientID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a patient
                    </option>
                    {allPatients.map((patient, index) => (
                      <option key={index} value={patient.patientID}>
                        {patient.patientID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-fields" style={{ marginRight: 0 }}>
                <label htmlFor="place"> Room / Ward:</label>
                <Input
                  placeholder="Place infos"
                  name="bedPlace"
                  value={inputs.bedPlace}
                  handleOnChange={handleOnChange}
                  readOnly
                />
              </div>
              <div className="input-field">
                <label htmlFor="admissionDate"> Admission Date:</label>
                <div
                  className="custom-input-field"
                  style={{ marginRight: "0" }}
                >
                  <DatePicker
                    value={selectedDate}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="EEE MMM dd yyyy"
                    showYearDropdown
                    scrollableMonthYearDropdowns
                    yearDropdownItemNumber={10}
                    yearDropdownMinLength={5}
                    minDate={new Date()}
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="admissionTime">Admission Time:</label>
                <div
                  className="custom-input-field"
                  style={{ marginRight: "0" }}
                >
                  <DatePicker
                    value={selectedTime}
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
              <div className="input-fields" style={{ marginRight: 0 }}>
                <label form="admissionID"> Emergency:</label>
                <Input
                  placeholder="Emergency"
                  name="emergency"
                  value={inputs.emergency}
                  handleOnChange={handleOnChange}
                  //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
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

            {/* To select a room or ward */}
            <aside style={{ width: "40%" }}>
              <div className="details-title">
                <h4> Choose a room or ward</h4>
              </div>
              {/* To select a room ID */}
              <div className="box-input-radio" style={{ marginTop: 10 }}>
                <input
                  type="radio"
                  id="rooms"
                  name="room"
                  value="room"
                  checked={selectedPlace === "room"}
                  onChange={handleSelectPlaceChange}
                  className="input-radio"
                />
                <label htmlFor="rooms">Rooms</label>
              </div>

              <div className="box-input-radio" style={{ marginTop: 10 }}>
                <input
                  type="radio"
                  id="contactChoice2"
                  name="ward"
                  value="ward"
                  checked={selectedPlace === "ward"}
                  onChange={handleSelectPlaceChange}
                  className="input-radio"
                />
                <label htmlFor="wards">Wards</label>
              </div>

              {/* Display for select a room*/}
              {selectedPlace === "room" && (
                <div
                  className="aside-option-box"
                  style={{ marginTop: 10, marginLeft: 140 }}
                >
                  <label htmlFor="rooms"> Rooms</label>
                  <div className="option-wrapper" style={{ width: "68%" }}>
                    <select
                      name="rooms"
                      id="wards"
                      value={selectedRooms}
                      onChange={(e) => setSelectedRooms(e.target.value)}
                      required
                    >
                      <option value="">Select a room ID</option>
                      {roomsDetails.map((room, index) => (
                        <option key={index} value={room.roomID}>
                          {room.roomID}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Display for select a ward*/}
              {selectedPlace === "ward" && (
                <div
                  className="aside-option-box"
                  style={{ marginTop: 10, marginLeft: 140 }}
                >
                  <label htmlFor="wards"> Wards</label>
                  <div className="option-wrapper" style={{ maxWidth: "68%" }}>
                    <select
                      name="wards"
                      id="wards"
                      value={selectedWards}
                      onChange={(e) => setSelectedWards(e.target.value)}
                      required
                    >
                      <option required value="">
                        Select a ward ID
                      </option>
                      {wardsDetails.map((ward, index) => (
                        <option key={index} value={ward.wardID}>
                          {ward.wardID}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="input-field doctor-types">
                <label htmlFor="patientID"> Bed ID</label>
                <div>
                  <select
                    name="bedID"
                    id="bedID"
                    value={inputs.bedID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a Bed
                    </option>
                    {allBeds.map((bed, index) => (
                      <option key={index} value={bed.bedID}>
                        {bed.bedID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-fields" style={{ marginRight: 0 }}>
                <label form="admissionID"> Bed Availability:</label>
                <Input
                  placeholder="Bed Availability"
                  name="bedAvailability"
                  value={inputs.bedAvailability}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                />
              </div>

              <div className="input-field doctor-types">
                <label htmlFor="patientID"> Affered Doctor</label>
                <div>
                  <select
                    name="doctorID"
                    id="afferedDoctor"
                    value={inputs.doctorID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a Doctor
                    </option>
                    {allDoctors.map((doctor, index) => (
                      <option key={index} value={doctor.doctorID}>
                        {doctor.doctorID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-field doctor-types">
                <label htmlFor="guardianID"> Guardian ID</label>
                <div>
                  <select
                    name="guardianID"
                    id="guardianID"
                    value={inputs.guardianID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a Guardian
                    </option>
                    {allGuardians.map((guardian, index) => (
                      <option key={index} value={guardian.guardianID}>
                        {guardian.guardianID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </aside>
          </form>

          {/* Popup to delete a bed */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the admission with ID of {inputs.admissionID} ?
                </p>
                <div className="delete-buttons">
                  <button onClick={handleClosePopup}> Cancel</button>
                  <button onClick={() => handleDeleteBed(id)}>Delete</button>
                </div>
              </div>
            </div>
          )}

          {/* Container buttons menus */}
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

          {/* Table to display all beds */}
          <div className="appScheduling-table">
            <table>
              <thead>
                <tr>
                  <th>admissionID </th>
                  <th>patientID </th>
                  <th>doctorID</th>
                  <th>guardianID </th>
                  <th>admissionDate</th>
                  <th>admissionTime</th>
                  <th>bedID</th>
                  <th>bedPlace</th>
                  <th>emergency</th>
                </tr>
              </thead>
              <tbody>
                {allAdmission.map((admission, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(admission)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-doctorID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{admission.admissionID}</td>
                      <td>{admission.patientID}</td>
                      <td>{admission.doctorID}</td>
                      <td>{admission.guardianID}</td>
                      <td>{admission.admissionDate}</td>
                      <td>{admission.admissionTime}</td>
                      <td>{admission.bedID}</td>
                      <td>{admission.bedPlace}</td>
                      <td>{admission.emergency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionDetails;
