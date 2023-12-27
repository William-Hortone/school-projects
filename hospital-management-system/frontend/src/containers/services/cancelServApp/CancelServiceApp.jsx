import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectAddedUserInfos } from "../../../redux/slice/addedUserSlide";
// import VizDocApp from "../vizDocApp/VizDocApp";
// import CancelDocAppDetails from "../cancelDocAppDetails/CancelDocAppDetails";
import { selectAddedUserInfos } from "../../../redux/slice/addedUserSlide";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import CancelServiceAppDetails from "../cancelServAppDetails/CancelServiceAppDetails";
import VizServiceApp from "../vizServiceApp/VizServiceApp";

const CancelServiceApp = () => {
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
        <h2 className="page-title">CANCEL SERVICE APPOINTMENT</h2>
        <form>
          <div className="input-field doctor-types">
            <label form="AppointmentID">Appointment ID:</label>
            <Input
              placeholder="Appointment ID"
              name="appointmentID"
              // value={inputs.appointmentID}
              inputDisabled="true"
            />
          </div>
          <div className="input-field doctor-types">
            <label htmlFor="patientID"> Patient ID</label>
            <div>
              <Input
                placeholder="Patient ID"
                name="appointmentID"
                // value={inputs.appointmentID}
                inputDisabled="true"
              />
            </div>
          </div>
          <div className="input-field doctor-types">
            <label htmlFor="doctorID"> Service ID</label>
            <div>
              <Input
                placeholder="Service ID"
                name="appointmentID"
                // value={inputs.appointmentID}
                inputDisabled="true"
              />
            </div>
          </div>

          <div className="input-field doctor-types">
            <label htmlFor="gender"> Appointment Date:</label>
            <div>
              <Input
                placeholder="Appointment Date"
                name="appointmentID"
                // value={inputs.appointmentID}
                inputDisabled="true"
              />
            </div>
          </div>
          <div className="input-field doctor-types">
            <label htmlFor="gender"> Appointment Time:</label>
            <Input
              placeholder="Appointment Time"
              name="appointmentID"
              inputDisabled="true"
            />
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

      {/* component to view  the doctor appointments */}
      {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <VizServiceApp
              setOpenScheduling={setOpenScheduling}
              setOpenScheduleDelete={setOpenScheduleDelete}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )}

      {/* component to cancel the doctor appointment */}
      {openCancelPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <CancelServiceAppDetails setOpenCancelPage={setOpenCancelPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelServiceApp;
