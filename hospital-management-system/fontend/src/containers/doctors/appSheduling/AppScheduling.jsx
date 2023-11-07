import React, { useState } from "react";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import "./appScheduling.css";
import Scheduling from "../scheduling/Scheduling";
import { useSelector } from "react-redux";
import { selectDocAppointment } from "../../../redux/slice/doctorSlice";

const AppScheduling = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const docAppointmentDetails = useSelector(selectDocAppointment);

  // const lastElement = docAppointmentDetails[docAppointmentDetails.length - 1];
  // if (docAppointmentDetails.length > 0) {
  //   setIsEmpty(false);
  // }
  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setAddOnSubmit(true);
  };
  const showSchedulingToEdit = () => {
    setOpenScheduling(true);
    setAddOnSubmit(false);
  };
  return (
    <div className="appScheduling">
      {/* <div> */}
      <div className="appScheduling-container">
        <h2>DOCTOR APPOINTMENT SCHEDULING</h2>
        <div className="details-title">
          <h4> Personal Detail</h4>
          <div className="divider" />
        </div>
        <form>
          <div className="input-field">
            <label form="schedulingId"> Scheduling ID:</label>
            <Input
              placeholder="Scheduling ID"
              name="schedulingID"
              // value={isEmpty ? "" : lastElement.schedulingID}
              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <div className="input-field">
            <label form="doctorId"> Doctor ID:</label>
            <Input
              placeholder="Doctor ID"
              name="doctorID"
              // value={isEmpty ? "" : lastElement.doctorID}

              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <div className="input-field">
            <label form="timeIn"> Time In:</label>
            <Input
              placeholder="time In"
              name="timeIn"
              id="timeIn"
              // value={isEmpty ? "" : lastElement.timeIn}

              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <div className="input-field">
            <label form="timeOut"> Time Out:</label>
            <Input
              placeholder="Time Out"
              name="timeOut"
              // value={isEmpty ? "" : lastElement.timeOut}

              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <div className="input-field">
            <label form="availableDays"> Available Days:</label>
            <Input
              placeholder="Available Days"
              name="availableDays"
              // value={isEmpty ? "" : lastElement.selectedDays}

              // value={isEmpty? "" : input.serviceID}
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
              // value={isEmpty ? "" : lastElement.schedulingNotes}

              // value={input.serviceID}
              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          {/* <button className="submit-btn" type="submit">
            Submit
          </button> */}
        </form>
      </div>

      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Schedule ID </th>
              <th>Doctor ID </th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Available Days</th>
              <th>Schedule Notes</th>
            </tr>
          </thead>
          <tbody>
            {docAppointmentDetails.map((docAppointment, index) => {
              return (
                <tr className="doctor-infos" key={index}>
                  <td>{docAppointment.schedulingID}</td>
                  <td>{docAppointment.doctorID}</td>
                  <td>{docAppointment.timeIn}</td>
                  <td>{docAppointment.timeOut}</td>
                  <td>{docAppointment.selectedDays}</td>
                  <td>{docAppointment.schedulingNotes}</td>
                </tr>
              );
            })}
            {/* {hideDataSearched &&
                  searchResult.map((medicalService, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{medicalService.serviceID}</td>
                        <td>{medicalService.serviceName}</td>
                        <td>{medicalService.amount}</td>
                        <td>{medicalService.duration}</td>
                        <td>{medicalService.additionalNotes}</td>
                      </tr>
                    );
                  })} */}
          </tbody>
        </table>
      </div>

      <div className="appScheduling-container-menus">
        <div className="appSchedule-container-menu-header">
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
            // onClick={handleOpenDeletePopup}
          />
          <ButtonAction
            iconName="refresh"
            btnName="Refresh"
            color="blue"
            buttonType="button"
            // onClick={handleRefresh}
          />
          <ButtonAction
            iconName="all"
            btnName="View All"
            color="blue"
            buttonType="button"
            // onClick={handleViewAllMedicalS}
          />
          <ButtonAction
            iconName="close"
            btnName="Close"
            color="red"
            buttonType="button"
            // onClick={handleClose}
          />
        </div>
      </div>
      {openScheduling && (
        <div
          className={
            openScheduling
              ? "appScheduling-wrapper ActiveScheduling"
              : "appScheduling-wrapper"
          }
        >
          <Scheduling
            setOpenScheduling={setOpenScheduling}
            addOnSubmit={addOnSubmit}
          />
        </div>
      )}
    </div>
    // </div>
  );
};

export default AppScheduling;
