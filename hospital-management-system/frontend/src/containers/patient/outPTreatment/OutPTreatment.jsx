import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDocAppointment } from "../../../redux/slice/doctorSlice";
import { Input, ButtonAction, ButtonSkip } from "../../../components";
import { BedMoreDetails, OutPTreatmentDetails } from "../..";
import axios from "axios";

const OutPTreatment = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [allOPTreatments, setAllOPTreatments] = useState([]);

  const docAppointmentDetails = useSelector(selectDocAppointment);
  const [usersLength, setUsersLength] = useState(
    docAppointmentDetails.length - 1
  );
  const [lastElement, setLastElement] = useState(allOPTreatments[usersLength]);

  // To Get all the available Out patient treatments
  const API_URL = "http://localhost:3001/getOutPTreatment";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOPTreatments(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setUsersLength(allOPTreatments.length - 1);
  }, [allOPTreatments.length]);

  useEffect(() => {
    setLastElement(allOPTreatments[usersLength]);
  }, [usersLength, allOPTreatments]);

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
    navigate("/VizAllOPtreatment");
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
    if (usersLength < allOPTreatments.length - 1) {
      setUsersLength(usersLength + 1);
      if (usersLength == allOPTreatments.length - 1) {
        return;
      }
    }
  };
  const handleShowLastEl = () => {
    setUsersLength(allOPTreatments.length - 1);
  };

  return (
    <div className="appScheduling">
      <h2 className="page-title">OUT PATIENT TREATMENTS</h2>
      <div className="appScheduling-container">
        <div className="details-title">
          <h4>Treatment infos</h4>
          <div className="divider" />
        </div>
        <form>
          <div className="container-display-infos">
            <div className="container-wrapper">
              <div className="input-field">
                <label form="schedulingId">Treatment ID:</label>
                <Input
                  inputDisabled="true"
                  placeholder="Treatment ID"
                  name="treatmentId"
                  value={lastElement ? lastElement.bedID : ""}
                />
              </div>
              <div className="input-field">
                <label form="doctorId"> Patient ID:</label>
                <Input
                  placeholder="Patient ID"
                  name="patientId"
                  inputDisabled="true"
                  value={lastElement ? lastElement.bedPlace : ""}
                />
              </div>
              <div className="input-field">
                <label form="doctorId"> Doctor ID:</label>
                <Input
                  placeholder="Doctor ID"
                  name="doctorId"
                  inputDisabled="true"
                  value={lastElement ? lastElement.bedPlace : ""}
                />
              </div>
              <div className="input-field">
                <label htmlFor="prescription">Prescription :</label>
                <textarea
                  placeholder="Prescription"
                  name="prescription"
                  id="prescription"
                  cols="39"
                  rows="10"
                  value={lastElement ? lastElement.bedDesc : ""}
                  // disabled
                ></textarea>
              </div>
            </div>

            <div className="container-wrapper">
              <div className="input-field">
                <label form="doctorId"> Date:</label>
                <Input
                  placeholder="Date"
                  name="date"
                  inputDisabled="true"
                  value={lastElement ? lastElement.bedPlace : ""}
                />
              </div>
              <div className="input-field">
                <label form="doctorId"> Time:</label>
                <Input
                  placeholder="Time"
                  name="time"
                  inputDisabled="true"
                  value={lastElement ? lastElement.bedPlace : ""}
                />
              </div>
              <div className="input-field">
                <label htmlFor="Description">Description :</label>
                <textarea
                  placeholder="Description"
                  name="description"
                  id="description"
                  cols="39"
                  rows="10"
                  value={lastElement ? lastElement.bedDesc : ""}
                  // disabled
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Treatment ID </th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Prescription</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {allOPTreatments.map((treatment, index) => {
              return (
                <tr className="doctor-infos" key={index}>
                  <td>{treatment.treatmentId}</td>
                  <td>{treatment.patientId}</td>
                  <td>{treatment.doctorId}</td>
                  <td>{treatment.date}</td>
                  <td>{treatment.time}</td>
                  <td>{treatment.prescription}</td>
                  <td>{treatment.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Container buttons */}
      <div className="appScheduling-container-menus">
        <div className="appSchedule-container-menu-header">
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
        <div className="container-menu-btn">
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
      </div>

      {/* Open the OutPTreatmentDetails component  */}
      {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <OutPTreatmentDetails
              // setOpenScheduling={setOpenScheduling}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OutPTreatment;
