import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectHospitalSchedule } from "../../../redux/slice/medicalServiceSlice";
import ScheduleSer from "../ScheduleSer/ScheduleSer";

const ServiceScheduling = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const navigate = useNavigate();
  const hosScheduleDetails = useSelector(selectHospitalSchedule);
  const lastElement = hosScheduleDetails[hosScheduleDetails.length - 1];

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
    navigate("/vizHospitalSer");
  };
  const showSchedulingToDelete = () => {
    setOpenPage(true);
    setOpenScheduleDelete(true);
    setAddOnSubmit(false);
  };

  useEffect(() => {
    if (hosScheduleDetails.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [hosScheduleDetails, lastElement]);

  return (
    <>
      <div className="appScheduling">
        <h2 className="page-title">HOSPITAL SERVICE DETAILS</h2>
        <div className="appScheduling-container">
          <div className="details-title">
            <h4> Schedule Details</h4>
            <div className="divider" />
          </div>
          <form>
            <div className="container-display-infos">
              <div className="container-wrapper">
                <div className="input-field">
                  <label form="schedulingId"> Scheduling ID:</label>
                  <Input
                    inputDisabled="true"
                    placeholder="Scheduling ID"
                    name="schedulingID"
                    value={isEmpty ? "" : lastElement.schedulingID}
                    // onChange={handleOnChange}
                    // disabled={!isInputEnabled}
                  />
                </div>
                <div className="input-field">
                  <label form="serviceID"> Service ID:</label>
                  <Input
                    inputDisabled="true"
                    placeholder="Service ID"
                    name="serviceID"
                    value={isEmpty ? "" : lastElement.serviceID}
                    // onChange={handleOnChange}
                    // disabled={!isInputEnabled}
                  />
                </div>
                <div className="input-field">
                  <label form="timeIn"> Service Starts:</label>
                  <Input
                    placeholder="Service Starts"
                    name="serviceStart"
                    id="timeIn"
                    value={isEmpty ? "" : lastElement.serviceStarts}
                    inputDisabled="true"
                    // onChange={handleOnChange}
                    // disabled={!isInputEnabled}
                  />
                </div>
              </div>
              <div className="container-wrapper">
                <div className="input-field">
                  <label form="timeOut">Service Ends:</label>
                  <Input
                    placeholder="Service Ends"
                    name="serviceEnds"
                    value={isEmpty ? "" : lastElement.serviceEnds}
                    inputDisabled="true"
                    // onChange={handleOnChange}
                    // disabled={!isInputEnabled}
                  />
                </div>
                <div className="input-field">
                  <label form="availableDays">Available Days:</label>
                  <Input
                    placeholder="Available Days"
                    name="availableDays"
                    value={isEmpty ? "" : lastElement.selectedDays}
                    inputDisabled="true"
                    // onChange={handleOnChange}
                    // disabled={!isInputEnabled}
                  />
                </div>
                <div className="input-field">
                  <label form="schedulingNotes"> Scheduling Notes:</label>
                  <Input
                    placeholder="Scheduling Notes"
                    name="schedulingNotes"
                    id="schedulingNotes"
                    inputDisabled="true"
                    value={isEmpty ? "" : lastElement.schedulingNotes}

                    // onChange={handleOnChange}
                    // disabled={!isInputEnabled}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

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
                    className={!addOnSubmit ? "doctor-infos" : "doctor-infos"}
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
        <div className="appScheduling-container-menus">
          <div
            className="container-menu-header"
            style={{ width: "91%", margin: "auto" }}
          >
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

        {/* <div
          className={
            openScheduling || openScheduleDelete
              ? "appScheduling-wrapper ActiveScheduling"
              : "appScheduling-wrapper"
          }
        > */}

        {openPage && (
          <div className="popup-wrapper">
            <div className="popup">
              <ScheduleSer
                setOpenScheduling={setOpenScheduling}
                setOpenScheduleDelete={setOpenScheduleDelete}
                openScheduleDelete={openScheduleDelete}
                addOnSubmit={addOnSubmit}
                setOpenPage={setOpenPage}
              />
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceScheduling;
