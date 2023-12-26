import React, { useEffect, useState } from "react";
import "./cancelDocApp.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectAddedUserInfos } from "../../../redux/slice/addedUserSlide";
import CancelDocAppDetails from "../cancelDocAppDetails/CancelDocAppDetails";
import OutPatientCancelP from "../../patient/outPatientcancelApp/OutPatientCancelP";

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

  const handleViewAll = () => {
    setOpenPage(true);
    setOpenScheduling(true);
    setAddOnSubmit(true);
  };

  const showRoomsToEdit = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };
  // const handleViewAll = () => {
  //   navigate("/vizAllUsers");
  // };
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
              <select
                className="custom-input-field"
                name="patientID"
                id="patientID"
                // value={inputs.patientID}
                // onChange={handleOnChange}
                // onFocus={handleFocusPatient}
                // onBlur={handleBlurPatient}
                required
              >
                <option required value="">
                  Select a Patient ID
                </option>
                {/* {allOutPatients.map((patient, index) => (
                  <option key={index} value={patient.patientID}>
                    {patient.patientID}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          <div className="input-field doctor-types">
            <label htmlFor="doctorID"> Doctor ID</label>
            <div>
              <select
                name="doctorID"
                id="doctorID"
                // value={inputs.doctorID}
                // onChange={handleOnChange}
                // required
                // onFocus={handleFocusDoctor}
                // onBlur={handleBlurDoctor}
              >
                <option required value="">
                  Select a doctor ID
                </option>
                {/* {allDOctors.map((doctor, index) => (
                  <option key={index} value={doctor.doctorID}>
                    {doctor.doctorID}
                  </option>
                ))} */}
              </select>

              {/*   */}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="gender"> Appointment Date:</label>
            <div className="custom-input-field">
              {/* <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableMonthYearDropdowns
                minDate={new Date()}
                filterDate={(date) =>
                  date.getDay() == monday ||
                  date.getDay() == tuesday ||
                  date.getDay() == wednesday ||
                  date.getDay() == thursday ||
                  date.getDay() == friday ||
                  date.getDay() == saturday ||
                  date.getDay() == sunday
                }
              /> */}
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="gender"> Appointment Time:</label>
            <div className="custom-input-field">
              {/* <DatePicker
                selected={pickedTime}
                onChange={(time) => setPickedTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                dateFormat="h:mm aa"
                timeCaption="Time"
                // filterTime={filterTime}
              /> */}
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
            onClick={handleViewAll}
          />
          {/* <ButtonAction
            iconName="edit"
            btnName="Edit"
            color="green"
            onClick={showRoomsToEdit}
            buttonType="submit"
          /> */}
          {/* <ButtonAction
            iconName="delete"
            btnName="Delete"
            buttonType="button"
            color="red"
            onClick={showSchedulingToDelete}
          /> */}
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
      {/* {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <OutPatientCancelP
              setOpenScheduling={setOpenScheduling}
              setOpenScheduleDelete={setOpenScheduleDelete}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )} */}

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
