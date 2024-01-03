import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import SupplierDetails from "../supplierDetails/SupplierDetails";
// import { ButtonAction, ButtonSkip, Input } from "../../../components";
// import InPatientDetails from "../inPatientDetails/InpatientDetails";

const Supplier = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [allInPatients, setAllInPatients] = useState([]);
  const [docAppointmentDetails, setDocAppointmentDetails] = useState([]);

  // To Get all outPatient
  const API_URL = "http://localhost:3001/getInPatientsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllInPatients(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    navigate("/VizAllSuppliers");
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

  //  Function to open the add appointment page
  const handleAddGuardian = () => {
    navigate("/adminDashboard/addGuardian");
  };
  return (
    <>
      <div className="appScheduling">
        <h2 className="page-title">SUPPLIERS</h2>
        <div className="appScheduling-container">
          <div className="details-title">
            <h4>Suppliers Details</h4>
            <div className="divider" />
          </div>
          <form>
            <div className="container" style={{ border: "none" }}>
              <div className="container-wrapper">
                <div className="input-fields">
                  <label form="patientID">Patient ID:</label>
                  <Input
                    placeholder="Patient ID"
                    name="patientID"
                    // value={inputs.patientID}
                    // handleOnChange={handleOnChange}
                    // inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
                <div className="input-fields">
                  <label form="firstName">First Name:</label>
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    // value={inputs.firstName}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="lastName">Last Name:</label>
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    // value={inputs.lastName}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>

                <div className="input-fields">
                  <label form="blood">Date of born :</label>
                  <Input
                    placeholder="Blood type"
                    name="blood"
                    // value={inputs.blood}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="blood">Blood :</label>
                  <Input
                    placeholder="Blood type"
                    name="blood"
                    // value={inputs.blood}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="weight">Weight (Kg) :</label>
                  <Input
                    placeholder="Weight"
                    name="weight"
                    // value={inputs.weight}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>

                <div className="input-field">
                  <label form="notes"> Notes:</label>
                  <textarea
                    placeholder="Notes"
                    name="notes"
                    // value={inputs.notes}
                    // onChange={handleOnChange}
                    id="notes"
                    cols="39"
                    rows="10"
                  ></textarea>
                </div>
              </div>

              <div className="container-wrapper">
                <div className="input-fields">
                  <label form="status">Gender:</label>
                  <Input
                    placeholder="Status"
                    name="status"
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="status">Status:</label>
                  <Input
                    placeholder="Status"
                    name="status"
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="weight">NIC Number :</label>
                  <Input
                    placeholder="NIC Number"
                    name="nicNumber"
                    // value={inputs.nicNumber}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="status">Height:</label>
                  <Input
                    placeholder="Height"
                    name="height"
                    // value={inputs.height}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="telephone">Telephone:</label>
                  <Input
                    placeholder="Telephone"
                    name="telephone"
                    // value={inputs.telephone}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
                  />
                </div>
                <div className="input-fields">
                  <label form="telephone"> Home phone:</label>
                  <Input
                    placeholder=" Home phone"
                    name="homePhone"
                    // value={inputs.homePhone}
                    // // handleOnChange={handleOnChange}
                    inputDisabled="true"
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
                    // // onChange={handleOnChange}
                    // value={inputs.address}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* table to see details */}
        {/* <div className="appScheduling-table">
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
                  <tr className="doctor-infos" key={index}>
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
        </div> */}

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
                <aside
                  className="action-options-wrapper"
                  style={{ height: 230, justifyContent: "center" }}
                >
                  <div className="btn-action-box" style={{ marginTop: 0 }}>
                    <ButtonAction
                      iconName="guardian"
                      btnName="Add Guardian"
                      color="green"
                      buttonType="submit"
                      onClick={handleAddGuardian}
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
              <SupplierDetails
                setOpenScheduling={setOpenScheduling}
                setOpenScheduleDelete={setOpenScheduleDelete}
                openScheduleDelete={openScheduleDelete}
                addOnSubmit={addOnSubmit}
                setOpenPage={setOpenPage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Supplier;
