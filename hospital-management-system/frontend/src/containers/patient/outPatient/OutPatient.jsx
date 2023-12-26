import React, { useEffect, useState } from "react";
import axios from "axios";
// import Scheduling from "../scheduling/Scheduling";
import { useSelector } from "react-redux";
import { selectDocAppointment } from "../../../redux/slice/doctorSlice";
import { useNavigate } from "react-router-dom";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import OutPatientMDetails from "../outPatientMDetails/OutPatientMDetails";
import AddDocAppointment from "../addDocAppointment/AddDocAppointment";
import "./outPatient.css";
import { toast } from "react-toastify";
import AddHospAppointment from "../addHospAppointment/AddHospAppointment";

const OutPatient = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [openAddAppointment, setOpenAddAppointment] = useState(false);
  const [openAddHospitalApp, setOpenAddHospitalApp] = useState(false);
  const [allOutPatients, setAllOutPatients] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");

  // To Get all outPatient
  const API_URL = "http://localhost:3001/getOutPatientsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOutPatients(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const docAppointmentDetails = useSelector(selectDocAppointment);
  const [usersLength, setUsersLength] = useState(
    docAppointmentDetails.length - 1
  );
  const [lastElement, setLastElement] = useState(
    docAppointmentDetails[usersLength]
  );

  useEffect(() => {
    setUsersLength(docAppointmentDetails.length - 1);
  }, [docAppointmentDetails.length]);

  useEffect(() => {
    setLastElement(docAppointmentDetails[usersLength]);
  }, [usersLength, docAppointmentDetails]);

  const navigate = useNavigate();

  // const lastElement = docAppointmentDetails[docAppointmentDetails.length - 1];

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(true);
  };

  const showSchedulingToEdit = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleClose = () => {
    navigate("/adminDashboard/dashboard");
  };
  const handleViewAll = () => {
    navigate("/VizAllOutPatient");
  };
  const showSchedulingToDelete = () => {
    setOpenScheduleDelete(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };

  // Display the infos of the preview element
  const handleShowPrev = () => {
    if (usersLength > 0) {
      setUsersLength(usersLength - 1);
      if (usersLength == 0) {
        return;
      }
    }
  };
  const handleShowFirstEl = () => {
    setUsersLength(0);
  };

  // Display the infos of the next element
  const handleShowNext = () => {
    if (usersLength < docAppointmentDetails.length - 1) {
      setUsersLength(usersLength + 1);
      if (usersLength == docAppointmentDetails.length - 1) {
        return;
      }
    }
  };
  const handleShowLastEl = () => {
    setUsersLength(docAppointmentDetails.length - 1);
  };

  //  Function for the appointment option
  const handleSelectAppointment = (e) => {
    setSelectedPlace(e.target.value);
  };

  //  Function to open the add appointment page
  const handleOpenApp = (e) => {
    if (selectedPlace === "doctors") {
      setOpenAddAppointment(true);
    } else {
      if (selectedPlace === "hospitalServices") {
        setOpenAddHospitalApp(true);
        // toast.error("Please select an appointment");
      } else {
        toast.error("Please select an appointment");
      }
    }
  };
  return (
    <>
      <div className="appScheduling">
        <h2 className="page-title">OUT PATIENTS</h2>
        <div className="appScheduling-container">
          <div className="details-title">
            <h4>Out Patient Details</h4>
            <div className="divider" />
          </div>
          <form>
            <div className="container-display-infos">
              <div className="container-wrapper">
                <div className="input-field">
                  <label form="patientID">Patient ID:</label>
                  <Input
                    inputDisabled="true"
                    placeholder="Patient ID"
                    name="patientID"
                    value={lastElement ? lastElement.schedulingID : ""}
                  />
                </div>
                <div className="input-field">
                  <label form="firstName">First Name:</label>
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    inputDisabled="true"
                    value={lastElement ? lastElement.doctorID : ""}
                  />
                </div>
                <div className="input-field">
                  <label form="lastName">Last Name:</label>
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    inputDisabled="true"
                    value={lastElement ? lastElement.timeIn : ""}
                  />
                </div>

                <div className="input-field">
                  <label form="notes"> Notes:</label>
                  <textarea name="" id="notes" cols="39" rows="10"></textarea>
                </div>
              </div>

              <div className="container-wrapper">
                <div className="input-field">
                  <label form="gender"> Gender:</label>
                  <Input
                    placeholder="Gender"
                    name="gender"
                    inputDisabled="true"
                    value={lastElement ? lastElement.timeOut : ""}
                  />
                </div>
                <div className="input-field">
                  <label form="telephone"> Telephone:</label>
                  <Input
                    inputDisabled="true"
                    placeholder="Telephone"
                    name="telephone"
                    value={lastElement ? lastElement.selectedDays : ""}
                  />
                </div>
                <div className="input-field">
                  <label form="status"> Status:</label>
                  <Input
                    placeholder="Status"
                    name="status"
                    id="status"
                    inputDisabled="true"
                    value={lastElement ? lastElement.schedulingNotes : ""}
                  />
                </div>
                <div className="input-field">
                  <label form="address"> Address:</label>
                  <textarea name="" id="address" cols="39" rows="10"></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>

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
                  <tr className="doctor-infos" key={index}>
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

        {/* Container buttons */}
        <div className="container-btn-menus-actions">
          <div className="appScheduling-container-menus">
            <div>
              <div className="input-record appSchedule-container-menu-header">
                <ButtonSkip
                  handleOnClick={handleShowFirstEl}
                  iconName="doubleLeft"
                  color="green"
                />
                <ButtonSkip
                  handleOnClick={handleShowPrev}
                  iconName="arrowLeft"
                  color="blue"
                />
                <input type="text" placeholder="Record No" />
                <ButtonSkip
                  handleOnClick={handleShowNext}
                  iconName="arrowRight"
                  color="blue"
                />
                <ButtonSkip
                  handleOnClick={handleShowLastEl}
                  iconName="doubleRight"
                  color="green"
                />
              </div>
              <div className="wrapper-action">
                <div className="btn-wrapper container-menu-btn">
                  <ButtonAction
                    iconName="add"
                    btnName="Add"
                    color="green"
                    buttonType="submit"
                    onClick={handleShowScheduling}
                  />
                  <ButtonAction
                    iconName="edit"
                    btnName="Edit"
                    color="green"
                    onClick={showSchedulingToEdit}
                    buttonType="submit"
                  />
                  <ButtonAction
                    iconName="delete"
                    btnName="Delete"
                    buttonType="button"
                    color="red"
                    onClick={showSchedulingToDelete}
                  />
                  <ButtonAction
                    iconName="refresh"
                    btnName="Refresh"
                    color="blue"
                    buttonType="button"
                    onClick={handleRefresh}
                  />

                  <ButtonAction
                    iconName="close"
                    btnName="Close"
                    color="red"
                    buttonType="button"
                    onClick={handleClose}
                  />
                  <ButtonAction
                    iconName="all"
                    btnName="View All"
                    color="blue"
                    buttonType="button"
                    onClick={handleViewAll}
                  />
                </div>
                <aside className="action-options-wrapper">
                  <div className="box-input-radio">
                    <input
                      type="radio"
                      id="doctors"
                      name="doctors"
                      value="doctors"
                      checked={selectedPlace === "doctors"}
                      onChange={handleSelectAppointment}
                      className="input-radio"
                    />
                    <label htmlFor="doctors">Doctors</label>
                  </div>

                  <div className="box-input-radio">
                    <input
                      type="radio"
                      id="hospitalServices"
                      name="hospitalServices"
                      value="hospitalServices"
                      checked={selectedPlace === "hospitalServices"}
                      onChange={handleSelectAppointment}
                      className="input-radio"
                    />
                    <label htmlFor="hospitalServices">Hospital Services</label>
                  </div>
                  <div className="btn-action-box">
                    <ButtonAction
                      iconName="arrow"
                      btnName="Add"
                      color="green"
                      buttonType="submit"
                      onClick={handleOpenApp}
                    />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        {/* Open the OutPatientMDetails component  */}
        {openPage && (
          <div className="popup-wrapper">
            <div className="popup">
              <OutPatientMDetails
                setOpenScheduling={setOpenScheduling}
                setOpenScheduleDelete={setOpenScheduleDelete}
                openScheduleDelete={openScheduleDelete}
                addOnSubmit={addOnSubmit}
                setOpenPage={setOpenPage}
              />
            </div>
          </div>
        )}

        {/* section to set a doctor appointment */}
        {openAddAppointment && (
          <div className="popup-wrapper">
            <div className="popup">
              <AddDocAppointment
                setOpenAddAppointment={setOpenAddAppointment}
              />
            </div>
          </div>
        )}

        {/* section to set a hospital service appointment */}
        {openAddHospitalApp && (
          <div className="popup-wrapper">
            <div className="popup">
              <AddHospAppointment
                setOpenAddHospitalApp={setOpenAddHospitalApp}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OutPatient;
