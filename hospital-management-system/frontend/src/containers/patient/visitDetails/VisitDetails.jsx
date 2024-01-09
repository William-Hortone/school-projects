import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction, ButtonSkip, Input } from "../../../components";

const VisitDetails = ({ addOnSubmit, openScheduleDelete, setOpenPage }) => {
  const [inputs, setInputs] = useState({
    visitID: "",
    patientID: "",
    doctorId: "",
    date: "",
    admissionID: "",
    time: "",
    status: "",
    description: "",
  });

  const [allDOctors, setAllDOctors] = useState([]);
  const [allAdFiltered, setAllAdFiltered] = useState([]);
  const [allAdmission, setAllAdmission] = useState([]);
  const [allVisits, setAllVisits] = useState([]);
  const [id, setId] = useState("");
  const [adId, setAdId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [pickedTime, setPickedTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";
  const API_URL_ADMISSION = "http://localhost:3001/getAdmissionDetails";
  const API_URL_VISITS = "http://localhost:3001/getVisitDetails";

  const fetchDoctorsData = async () => {
    const { data } = await axios.get(API_URL_DOCTORS);
    setAllDOctors(data);
  };
  const fetchDataAdmission = async () => {
    const { data } = await axios.get(API_URL_ADMISSION);
    setAllAdmission(data);
  };
  const fetchDataVisit = async () => {
    const { data } = await axios.get(API_URL_VISITS);
    setAllVisits(data);
  };

  useEffect(() => {
    fetchDoctorsData();
    fetchDataAdmission();
    fetchDataVisit();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setId(inputs.visitID);
  }, [inputs.visitID]);

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
      date: selectedDate,
    }));
  }, [selectedDate]);

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
      time: selectedTime,
    }));
  }, [selectedTime]);

  //   Function to generate a new  ID
  const handleAddATreatment = () => {
    if (addOnSubmit) {
      // Initialize the Id if the array is empty
      if (allVisits.length === 0) {
        setInputs({
          ...inputs,
          visitID: "v_001",
        });
      } else {
        // Get the last Id and increment it
        const lastElementId = allVisits[allVisits.length - 1].visitID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextElementId = `v_${(numericPart + 1)
          .toString()
          .padStart(3, "0")}`;
        setInputs({
          ...inputs,
          visitID: nextElementId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // The function to add out patient treatment details
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/addVisit", inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Added successfully");
        }
      })
      .catch((err) => toast.error(err));
  };

  // function to Edit a doctor visit details
  const handleSubmitEditInfos = (e, id) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editVisits/${id}`, inputs)
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

  const handleClose = () => {
    setOpenPage(false);
  };

  // Automatically fill the form when click on one element of the table
  const handleUpdateInfos = (visit) => {
    if (!addOnSubmit) {
      setInputs({
        visitID: visit.visitID,
        patientId: visit.patientId,
        admissionID: visit.admissionID,
        doctorId: visit.doctorId,
        date: visit.date,
        time: visit.time,
        prescription: visit.prescription,
        description: visit.description,
        status: visit.status,
      });
      setSelectedDate(visit.date);
      setSelectedTime(visit.time);
      // setDisabledInput(true);
    }
  };

  const handleDelete = () => {
    if (id === undefined || id === "") {
      toast.error("Please provide a visit ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // Function to Delete an visit
  const handleDeleteVisit = (id) => {
    if (id === undefined || id === "") {
      toast.error("Please provide a visit ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteVisit/${id}`)
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

  useEffect(() => {
    setAdId(inputs.admissionID);
  }, [inputs.admissionID]);

  // To filter admissions according to the admission selected
  useEffect(() => {
    const handleFilter = (id) => {
      const result = allAdmission.filter(
        (admission) => admission.admissionID === id
      );
      setAllAdFiltered(result);
    };

    handleFilter(adId);
  }, [adId, allAdmission]);

  // Assign the patient value  according to the admission selected
  useEffect(() => {
    if (allAdFiltered.length > 0) {
      setInputs((prev) => ({
        ...prev,
        patientID: allAdFiltered[0].patientID,
      }));
    }
  }, [allAdFiltered]);

  return (
    <div className="app-container">
      <h2 className="page-title">VISITS DETAILS</h2>
      <div className="appScheduling-container">
        <div className="details-title">
          <h4>Treatment infos</h4>
          <div className="divider" />
        </div>
        <form
          onSubmit={
            addOnSubmit ? handleSubmit : (e) => handleSubmitEditInfos(e, id)
          }
        >
          <div className="container-display-infos">
            <div className="container-wrapper">
              <div className="input-field">
                <label form="schedulingId">Visit ID:</label>
                <Input
                  inputDisabled="true"
                  placeholder="Visit ID"
                  name="visitID"
                  value={inputs.visitID}
                />
              </div>

              <div className="input-field doctor-types">
                <label htmlFor="admissionId"> Admission ID :</label>
                <div>
                  <select
                    name="admissionID"
                    id="admissionId"
                    value={inputs.admissionID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a Admission
                    </option>
                    {allAdmission.map((admission, index) => (
                      <option key={index} value={admission.admissionID}>
                        {admission.admissionID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-field">
                <label form="schedulingId">Patients ID:</label>
                <Input
                  inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="Patient ID"
                  name="patientID"
                  value={inputs.patientID}
                />
              </div>

              <div className="input-field doctor-types">
                <label htmlFor="wardRates"> Doctor ID :</label>
                <div>
                  <select
                    name="doctorId"
                    id="wardRates"
                    value={inputs.doctorId}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a doctor ID
                    </option>
                    {allDOctors.map((doctor, index) => (
                      <option key={index} value={doctor.doctorID}>
                        {doctor.doctorID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-field">
                <label form="schedulingId">status :</label>
                <Input
                  handleOnChange={handleOnChange}
                  placeholder="Status"
                  name="status"
                  value={inputs.status}
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

            <div className="container-wrapper">
              <div className="input-field">
                <label htmlFor="gender">Visit Date:</label>
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
                    minDate={new Date()}
                  />
                </div>
              </div>

              <div className="input-field">
                <label htmlFor="gender">Visit Time:</label>
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
              <div className="input-field">
                <label htmlFor="Description">Description :</label>
                <textarea
                  placeholder="Description"
                  name="description"
                  id="description"
                  cols="39"
                  rows="10"
                  onChange={handleOnChange}
                  value={inputs.description}
                  // disabled
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Table to see and select element to auto complete the form */}
      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Visit ID </th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Admission ID</th>
              <th>status</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {allVisits.map((visit, index) => {
              return (
                <tr
                  onClick={() => handleUpdateInfos(visit)}
                  className={
                    !addOnSubmit
                      ? "doctor-infos select-doctorID"
                      : "doctor-infos"
                  }
                  key={index}
                >
                  <td>{visit.visitID}</td>
                  <td>{visit.admissionID}</td>
                  <td>{visit.patientId}</td>
                  <td>{visit.doctorId}</td>
                  <td>{visit.date}</td>
                  <td>{visit.time}</td>
                  <td>{visit.status}</td>
                  <td>{visit.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Container buttons */}
      <div className="appScheduling-container-menus">
        <div className="appSchedule-container-menu-header">
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
            onClick={handleAddATreatment}
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

      {/* Delete popup */}
      {showPopupDelete && (
        <div style={{ position: "relative" }}>
          <div className="schedule-delete-popup">
            <p>
              Do you really want to delete <br />
              the Visit with ID of {inputs.visitID} ?
            </p>
            <div className="delete-buttons">
              <button onClick={handleClosePopup}> Cancel</button>
              <button onClick={() => handleDeleteVisit(id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitDetails;
