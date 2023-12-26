import React, { useEffect, useState } from "react";
import "./cancelDocApp.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectAddedUserInfos } from "../../../redux/slice/addedUserSlide";
import VizDocApp from "../vizDocApp/VizDocApp";
import CancelDocAppDetails from "../cancelDocAppDetails/CancelDocAppDetails";

const CancelDocApp = () => {
  const [openCancelPage, setOpenCancelPage] = useState(false);
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

  const handleViewAll = () => {
    setOpenPage(true);
    setAddOnSubmit(true);
  };
  const handleOpenCancelPage = () => {
    setOpenCancelPage(true);
    // setAddOnSubmit(true);
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

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2 className="page-title">CANCEL DOCTOR APPOINTMENT</h2>
        <form
        // onSubmit={handleSubmit}
        >
          <div className="input-fields">
            <label form="AppointmentID">Appointment ID:</label>
            <Input
              placeholder="Appointment ID"
              name="appointmentID"
              // value={inputs.appointmentID}
              // handleOnChange={handleOnChange}
              inputDisabled="true"
            />
          </div>
          <div className="input-field doctor-types">
            <label htmlFor="patientID"> Patient ID</label>
            <div>
              <Input
                placeholder="Appointment ID"
                name="appointmentID"
                // value={inputs.appointmentID}
                // handleOnChange={handleOnChange}
                inputDisabled="true"
              />
            </div>
          </div>
          <div className="input-field doctor-types">
            <label htmlFor="doctorID"> Doctor ID</label>
            <div>
              <Input
                placeholder="Appointment ID"
                name="appointmentID"
                // value={inputs.appointmentID}
                // handleOnChange={handleOnChange}
                inputDisabled="true"
              />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="gender"> Appointment Date:</label>
            <div className="custom-input-field">
              <div>
                <Input
                  placeholder="Appointment ID"
                  name="appointmentID"
                  // value={inputs.appointmentID}
                  // handleOnChange={handleOnChange}
                  inputDisabled="true"
                />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="gender"> Appointment Time:</label>
            <div className="custom-input-field">
              <Input
                placeholder="Appointment ID"
                name="appointmentID"
                // value={inputs.appointmentID}
                // handleOnChange={handleOnChange}
                inputDisabled="true"
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
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
            iconName="delete"
            btnName="Cancel"
            color="red"
            buttonType="submit"
            onClick={handleOpenCancelPage}
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
            buttonType="submit"
            onClick={handleViewAll}
          />
        </div>
      </div>

      {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <VizDocApp
              setOpenScheduling={setOpenScheduling}
              setOpenScheduleDelete={setOpenScheduleDelete}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )}

      {openCancelPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <CancelDocAppDetails
            // setOpenScheduling={setOpenScheduling}
            // setOpenScheduleDelete={setOpenScheduleDelete}
            // openScheduleDelete={openScheduleDelete}
            // addOnSubmit={addOnSubmit}
            // setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelDocApp;
