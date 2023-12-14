import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./outPatientMDetails.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";

const OutPatientMDetails = ({
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
    notes: "",
  });

  const [id, setId] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allOutPatients, setAllOutPatients] = useState([]);
  const selectGender = [
    { name: "female", value: "F" },
    { name: "male", value: "M" },
  ];

  // To Get all outPatient
  const API_URL = "http://localhost:3001/getOutPatientsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOutPatients(data);
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
      if (allOutPatients.length === 0) {
        setInputs({
          ...inputs,
          patientID: "outP_001",
        });
      } else {
        const lastElementId =
          allOutPatients[allOutPatients.length - 1].patientID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextId = `outP_${(numericPart + 1).toString().padStart(3, "0")}`;
        setInputs({
          ...inputs,
          patientID: nextId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // Function to add an out patient
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/addOutPatient", inputs)
      .then((res) => {
        toast.success("Added successfully");
      })
      .catch((err) => toast.error(err));
  };

  // Function to update an Out patient details
  const handleSubmitEditDoctor = (e, id) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editOutPatientDetails/${id}`, inputs)
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
      toast.error("Please provide a out patient ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  // Function to Delete an Out patient
  const handleDeleteAppointment = (id) => {
    if (id === undefined || id === "") {
      toast.error("Please provide a out patient ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteOutPatient/${id}`)
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
      });

      setDisabledInput(true);
    }
  };

  return (
    <>
      <div className="app__scheduling schedule-container">
        <div className="app__scheduling-container container-more-infos">
          <h2 className="page-title">Out Patient</h2>

          <form
            onSubmit={
              addOnSubmit ? handleSubmit : (e) => handleSubmitEditDoctor(e, id)
            }
          >
            <div className="container">
              <div className="container-wrapper">
                <div className="details-title">
                  <h4> Out Patient Details</h4>
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
                  <label form="notes"> Notes:</label>
                  <textarea
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
                  <label form="telephone">Telephone:</label>
                  <Input
                    placeholder="Telephone"
                    name="telephone"
                    value={inputs.telephone}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-field">
                  <label form="address"> Address:</label>
                  <textarea
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
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {allOutPatients.map((patient, index) => {
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
                      <td>{patient.notes}</td>
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
                  <button onClick={() => handleDeleteAppointment(id)}>
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

export default OutPatientMDetails;
