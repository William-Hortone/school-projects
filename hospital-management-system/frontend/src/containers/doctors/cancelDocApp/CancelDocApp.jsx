import React, { useEffect, useState } from "react";
import "./cancelDocApp.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectAddedUserInfos } from "../../../redux/slice/addedUserSlide";
import CancelDocAppDetails from "../cancelDocAppDetails/CancelDocAppDetails";
// import AddUserDetails from "../addUserDetails/AddUserDetails";

const CancelDocApp = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const addedUserInfos = useSelector(selectAddedUserInfos);

  const [usersLength, setUsersLength] = useState(addedUserInfos.length - 1);
  const [lastElement, setLastElement] = useState(addedUserInfos[usersLength]);

  const navigate = useNavigate();

  useEffect(() => {
    setUsersLength(addedUserInfos.length - 1);
  }, [addedUserInfos.length]);

  useEffect(() => {
    setLastElement(addedUserInfos[usersLength]);
  }, [usersLength, addedUserInfos]);

  const handleShowScheduling = () => {
    setOpenPage(true);
    setOpenScheduling(true);
    setAddOnSubmit(true);
  };

  const showRoomsToEdit = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };
  const handleViewAll = () => {
    navigate("/vizAllUsers");
  };
  const handleClose = () => {
    navigate("/adminDashboard/dashboard");
  };

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
  const handleShowLastEl = () => {
    setUsersLength(addedUserInfos.length - 1);
  };
  const handleShowNext = () => {
    if (usersLength < addedUserInfos.length - 1) {
      setUsersLength(usersLength + 1);
      if (usersLength == addedUserInfos.length - 1) {
        return;
      }
    }
  };

  const showSchedulingToDelete = () => {
    setOpenPage(true);
    setOpenScheduleDelete(true);
    setAddOnSubmit(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2>CANCEL DOCTOR APPOINTMENT</h2>
        <form>
          <div className="container-display-infos">
            <div className="container-wrapper">
              <div className="input-fields">
                <label htmlFor="appointmentID"> Appointment ID</label>
                <Input
                  placeholder="Appointment ID"
                  id="appointmentID"
                  name="appointmentID"
                  value={lastElement ? lastElement.userID : ""}
                  inputDisabled="true"
                />
              </div>
              <div className="input-fields">
                <label htmlFor="patientID"> Patient ID</label>
                <Input
                  placeholder="Patient ID"
                  id="patientID"
                  name="patientID"
                  value={lastElement ? lastElement.firstName : ""}
                  inputDisabled="true"
                />
              </div>
              <div className="input-fields">
                <label htmlFor="doctorID"> Doctor ID:</label>
                <Input
                  placeholder="Doctor ID"
                  name="doctorID"
                  id="doctorID"
                  value={lastElement ? lastElement.lastName : ""}
                  inputDisabled="true"
                />
              </div>
              <div className="input-fields">
                <label htmlFor="appDate">Appointment Date:</label>
                <Input
                  placeholder="Appointment Date"
                  name="appDate"
                  id="appDate"
                  value={lastElement ? lastElement.gender : ""}
                  inputDisabled="true"
                />
              </div>
              <div className="input-fields">
                <label htmlFor="appTime">Appointment Time:</label>
                <Input
                  placeholder="Appointment Time"
                  name="appTime"
                  id="appTime"
                  value={lastElement ? lastElement.address : ""}
                  inputDisabled="true"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* The  container menu buttons */}
      <div className="roomDetails-container-menus">
        <div
          className="roomDetails-container-menu-header"
          style={{ width: "91%", margin: "auto" }}
        >
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
            onClick={showRoomsToEdit}
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

      {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <CancelDocAppDetails
              setOpenScheduling={setOpenScheduling}
              setOpenScheduleDelete={setOpenScheduleDelete}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )}

      {/* <div
        className={
          openScheduling || openScheduleDelete
            ? "appScheduling-wrapper ActiveScheduling"
            : "appScheduling-wrapper"
        }

      > */}

      {/* {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <AddUserDetails
              setOpenScheduling={setOpenScheduling}
              setOpenScheduleDelete={setOpenScheduleDelete}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CancelDocApp;
