import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import "./InPatientDetails.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";

const InPatientDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [inputs, setInputs] = useState({
    patientID: "",
    firstName: "",
    lastName: "",
    gender: "",
    telephone: "",
    address: "",
    status: "",
    nicNumber: "",
    notes: "",
    blood: "",
    weight: "",
    height: "",
    dateOB: "",
    homePhone: "",
  });

  const [id, setId] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allInPatients, setAllInPatients] = useState([]);
  const selectGender = [
    { name: "female", value: "F" },
    { name: "male", value: "M" },
  ];
  const [startDate, setStartDate] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  // To Get all outPatient
  const API_URL = "http://localhost:3001/getInPatientsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllInPatients(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setId(inputs.patientID);
  }, [inputs.patientID]);

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
      patientID: "",
      firstName: "",
      lastName: "",
      gender: "",
      telephone: "",
      address: "",
      status: "",
      notes: "",
    });
  };

  // Function to generate the ID
  const handleAddAppointment = () => {
    if (addOnSubmit) {
      if (allInPatients.length === 0) {
        setInputs({
          ...inputs,
          patientID: "inP_001",
        });
      } else {
        const lastElementId = allInPatients[allInPatients.length - 1].patientID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextId = `inP_${(numericPart + 1).toString().padStart(3, "0")}`;
        setInputs({
          ...inputs,
          patientID: nextId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // Function to add an in patient
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("inputs", inputs);
    axios
      .post("http://localhost:3001/addInPatient", inputs)
      .then((res) => {
        toast.success("Added successfully");
      })
      .catch((err) => toast.error(err));
  };

  // Function to update an In patient details
  const handleSubmitEditInfos = (e, id) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editInPatientDetails/${id}`, inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Updated successfully");
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
    if (id === undefined || id === "") {
      toast.error("Please provide a Inpatient ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  // Function to Delete an In patient
  const handleDeleteInPatient = (id) => {
    if (id === undefined || id === "") {
      toast.error("Please provide a  inpatient ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteInPatient/${id}`)
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

  // Automatically fill the form when click on one element of the table
  const handleUpdateInfos = (patient) => {
    if (!addOnSubmit) {
      setInputs({
        patientID: patient.patientID,
        firstName: patient.firstName,
        lastName: patient.lastName,
        gender: patient.gender,
        address: patient.address,
        telephone: patient.telephone,
        status: patient.status,
        notes: patient.notes,
        weight: patient.weight,
        homePhone: patient.homePhone,
        nicNumber: patient.nicNumber,
        height: patient.height,
        blood: patient.blood,
      });
      setSelectedDate(patient.dateOB);

      setDisabledInput(true);
    }
  };

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
      dateOB: selectedDate,
    }));
  }, [selectedDate]);

  return (
    <>
      <div className="app__scheduling schedule-container">
        <div className="app__scheduling-container container-more-infos">
          <h2 className="page-title">In Patient Details</h2>

          <form
            onSubmit={
              addOnSubmit ? handleSubmit : (e) => handleSubmitEditInfos(e, id)
            }
          >
            <div className="container">
              <div className="container-wrapper">
                <div className="details-title">
                  <h4> In Patient Details</h4>
                  <div className="divider" />
                </div>
                <div className="input-fields">
                  <label form="patientID">Patient ID:</label>
                  <Input
                    placeholder="Patient ID"
                    name="patientID"
                    value={inputs.patientID}
                    handleOnChange={handleOnChange}
                    inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="firstName">First Name:</label>
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    value={inputs.firstName}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="lastName">Last Name:</label>
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={inputs.lastName}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="gender"> Date of born:</label>
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
                      maxDate={new Date()}
                    />
                  </div>
                </div>
                <div className="input-fields">
                  <label form="blood">Blood :</label>
                  <Input
                    placeholder="Blood type"
                    name="blood"
                    value={inputs.blood}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="weight">Weight (Kg) :</label>
                  <Input
                    placeholder="Weight"
                    name="weight"
                    value={inputs.weight}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>

                <div className="input-field">
                  <label form="notes"> Notes:</label>
                  <textarea
                    placeholder="Notes"
                    name="notes"
                    value={inputs.notes}
                    onChange={handleOnChange}
                    id="notes"
                    cols="39"
                    rows="10"
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

              <div className="container-wrapper">
                <br />
                <br />
                <div className="input-field doctor-types">
                  <label htmlFor="gender"> Gender</label>
                  <div>
                    <select
                      name="gender"
                      id="gender"
                      value={inputs.gender}
                      onChange={handleOnChange}
                      required
                    >
                      <option required value="">
                        Select a gender
                      </option>
                      {selectGender.map((person, index) => (
                        <option key={index} value={person.value}>
                          {person.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-fields">
                  <label form="status">Status:</label>
                  <Input
                    placeholder="Status"
                    name="status"
                    value={inputs.status}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="weight">NIC Number :</label>
                  <Input
                    placeholder="NIC Number"
                    name="nicNumber"
                    value={inputs.nicNumber}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="status">Height:</label>
                  <Input
                    placeholder="Height"
                    name="height"
                    value={inputs.height}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="telephone">Telephone:</label>
                  <Input
                    placeholder="Telephone"
                    name="telephone"
                    value={inputs.telephone}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="telephone"> Home phone:</label>
                  <Input
                    placeholder=" Home phone"
                    name="homePhone"
                    value={inputs.homePhone}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-field">
                  <label form="address"> Address:</label>
                  <textarea
                    placeholder="address"
                    name="address"
                    id="address"
                    cols="39"
                    rows="10"
                    onChange={handleOnChange}
                    value={inputs.address}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>

          {/* Table to see all out patients and select one to edit */}
          <div className="appScheduling-table">
            <table>
              <thead>
                <tr>
                  <th>Patient ID </th>
                  <th>First Name </th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Telephone</th>
                  <th>Status</th>
                  <th>Date of Born</th>
                  <th>Notes</th>
                  <th>Blood</th>
                  <th>Weight</th>
                  <th>Height</th>
                  <th>Home phone</th>
                  <th>NIC Number</th>
                </tr>
              </thead>
              <tbody>
                {allInPatients.map((patient, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(patient)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-doctorID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{patient.patientID}</td>
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.address}</td>
                      <td>{patient.telephone}</td>
                      <td>{patient.status}</td>
                      <td>{patient.dateOB}</td>
                      <td>{patient.notes}</td>
                      <td>{patient.blood}</td>
                      <td>{patient.weight}</td>
                      <td>{patient.height}</td>
                      <td>{patient.homePhone}</td>
                      <td>{patient.nicNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Delete popup */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the Patient with ID of {inputs.patientID} ?
                </p>
                <div className="delete-buttons">
                  <button onClick={handleClosePopup}> Cancel</button>
                  <button onClick={() => handleDeleteInPatient(id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Container buttons */}
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
    </>
  );
};

export default InPatientDetails;
