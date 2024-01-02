import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";

const GuardianDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [inputs, setInputs] = useState({
    guardianID: "",
    patientID: "",
    firstName: "",
    lastName: "",
    occupation: "",
    telephone: "",
    address: "",
    relationShip: "",
    nicNumber: "",
    homePhone: "",
  });

  const [id, setId] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allInPatients, setAllInPatients] = useState([]);
  const [allGuardians, setAllGuardians] = useState([]);

  const [startDate, setStartDate] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  // To Get all outPatient
  const API_URL = "http://localhost:3001/getInPatientsDetails";
  const API_URL_GUARDIAN = "http://localhost:3001/getGuardianDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllInPatients(data);
  };
  const fetchDataGuardian = async () => {
    const { data } = await axios.get(API_URL_GUARDIAN);
    setAllGuardians(data);
  };

  useEffect(() => {
    fetchData();
    fetchDataGuardian();
  }, []);

  useEffect(() => {
    setId(inputs.guardianID);
  }, [inputs.guardianID]);

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
      guardianID: "",
      patientID: "",
      firstName: "",
      lastName: "",
      occupation: "",
      telephone: "",
      address: "",
      relationShip: "",
      nicNumber: "",
      homePhone: "",
    });
  };

  // Function to generate the ID
  const handleAddAppointment = () => {
    if (addOnSubmit) {
      if (allGuardians.length === 0) {
        setInputs({
          ...inputs,
          guardianID: "g_001",
        });
      } else {
        const lastElementId = allGuardians[allGuardians.length - 1].guardianID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextId = `g_${(numericPart + 1).toString().padStart(3, "0")}`;
        setInputs({
          ...inputs,
          guardianID: nextId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // Function to add an Guardian
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("inputs", inputs);
    axios
      .post("http://localhost:3001/addGuardian", inputs)
      .then((res) => {
        toast.success("Added successfully");
      })
      .catch((err) => toast.error(err));
  };

  // Function to update an Guardian details
  const handleSubmitEditInfos = (e, id) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editGuardianDetails/${id}`, inputs)
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
      toast.error("Please provide a guardian ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  // Function to Delete an In patient
  const handleDeleteInPatient = (id) => {
    if (id === undefined || id === "") {
      toast.error("Please provide a guardian ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteGuardian/${id}`)
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
  const handleUpdateInfos = (guardian) => {
    if (!addOnSubmit) {
      setInputs({
        guardianID: guardian.guardianID,
        patientID: guardian.patientID,
        firstName: guardian.firstName,
        lastName: guardian.lastName,
        occupation: guardian.occupation,
        address: guardian.address,
        telephone: guardian.telephone,
        nicNumber: guardian.nicNumber,
        homePhone: guardian.homePhone,
        relationShip: guardian.relationShip,
      });
      setSelectedDate(guardian.dateOB);

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
          <h2 className="page-title">Guardian Details</h2>

          <form
            onSubmit={
              addOnSubmit ? handleSubmit : (e) => handleSubmitEditInfos(e, id)
            }
          >
            <div className="container">
              <div className="container-wrapper">
                <div className="details-title">
                  <h4> Guardian Details</h4>
                  <div className="divider" />
                </div>
                <div className="input-fields">
                  <label form="guardianID">Guardian ID:</label>
                  <Input
                    placeholder="Guardian ID"
                    name="guardianID"
                    value={inputs.guardianID}
                    handleOnChange={handleOnChange}
                    inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-field doctor-types">
                  <label htmlFor="patientID"> Patient ID</label>
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
                      {allInPatients.map((patient, index) => (
                        <option key={index} value={patient.patientID}>
                          {patient.patientID}
                        </option>
                      ))}
                    </select>
                  </div>
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

                <div className="input-fields">
                  <label form="occupation">Occupation :</label>
                  <Input
                    placeholder="Occupation"
                    name="occupation"
                    value={inputs.occupation}
                    handleOnChange={handleOnChange}
                    //   inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="relationShip">RelationShip:</label>
                  <Input
                    placeholder="RelationShip"
                    name="relationShip"
                    value={inputs.relationShip}
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

              <div className="container-wrapper">
                <br />
                <br />

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

          {/* Table to see all Guardians and select one to edit */}
          <div className="appScheduling-table">
            <table>
              <thead>
                <tr>
                  <th>Guardian ID </th>
                  <th>First Name </th>
                  <th>Last Name</th>
                  <th>Patient ID </th>
                  <th>Occupation</th>
                  <th>Telephone</th>
                  <th>NIC Number</th>
                  <th>RelationShip</th>
                  <th>Home phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {allGuardians.map((guardian, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(guardian)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-doctorID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{guardian.guardianID}</td>
                      <td>{guardian.firstName}</td>
                      <td>{guardian.lastName}</td>
                      <td>{guardian.patientID}</td>
                      <td>{guardian.occupation}</td>
                      <td>{guardian.telephone}</td>
                      <td>{guardian.nicNumber}</td>
                      <td>{guardian.relationShip}</td>
                      <td>{guardian.homePhone}</td>
                      <td>{guardian.address}</td>
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
                  the Guardian with ID of {inputs.guardianID} ?
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

export default GuardianDetails;
