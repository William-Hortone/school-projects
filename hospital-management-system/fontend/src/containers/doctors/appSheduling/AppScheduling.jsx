import React, { useEffect, useState } from "react";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import "./appScheduling.css";
import Scheduling from "../scheduling/Scheduling";
import { useSelector } from "react-redux";
import { selectDocAppointment } from "../../../redux/slice/doctorSlice";
import { useNavigate } from "react-router-dom";

const AppScheduling = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const navigate = useNavigate();
  const docAppointmentDetails = useSelector(selectDocAppointment);

  const lastElement = docAppointmentDetails[docAppointmentDetails.length - 1];

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setAddOnSubmit(true);
  };

  const showSchedulingToEdit = () => {
    setOpenScheduling(true);
    setAddOnSubmit(false);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleClose = () => {
    navigate("/adminDashboard");
  };
  const showSchedulingToDelete = () => {
    setOpenScheduleDelete(true);
    setAddOnSubmit(false);
  };

  useEffect(() => {
    if (docAppointmentDetails.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [docAppointmentDetails]);

  return (
    <div className="appScheduling">
      <h2 className="page-title">DOCTOR APPOINTMENT SCHEDULING</h2>
      <div className="appScheduling-container">
        <div className="details-title">
          <h4> Doctor Details</h4>
          <div className="divider" />
        </div>
        <form>
          <div className="input-field">
            <label form="schedulingId">Scheduling ID:</label>
            <Input
              inputDisabled="true"
              placeholder="Scheduling ID"
              name="schedulingID"
              value={isEmpty ? "" : lastElement.schedulingID}
            />
          </div>
          <div className="input-field">
            <label form="doctorId"> Doctor ID:</label>
            <Input
              placeholder="Doctor ID"
              name="doctorID"
              inputDisabled="true"
              value={isEmpty ? "" : lastElement.doctorID}
            />
          </div>
          <div className="input-field">
            <label form="timeIn"> Time In:</label>
            <Input
              placeholder="time In"
              name="timeIn"
              id="timeIn"
              inputDisabled="true"
              value={isEmpty ? "" : lastElement.timeIn}
            />
          </div>
          <div className="input-field">
            <label form="timeOut"> Time Out:</label>
            <Input
              placeholder="Time Out"
              name="timeOut"
              inputDisabled="true"
              value={isEmpty ? "" : lastElement.timeOut}
            />
          </div>
          <div className="input-field">
            <label form="availableDays"> Available Days:</label>
            <Input
              inputDisabled="true"
              placeholder="Available Days"
              name="availableDays"
              value={isEmpty ? "" : lastElement.selectedDays}

              // value={isEmpty? "" : input.serviceID}
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

              // value={input.serviceID}
            />
          </div>
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

      {/* Container buttons */}
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
        </div>
      </div>

      {/* Open the scheduling component  */}
      <div
        className={
          openScheduling || openScheduleDelete
            ? "appScheduling-wrapper ActiveScheduling"
            : "appScheduling-wrapper"
        }
      >
        <Scheduling
          setOpenScheduling={setOpenScheduling}
          setOpenScheduleDelete={setOpenScheduleDelete}
          openScheduleDelete={openScheduleDelete}
          addOnSubmit={addOnSubmit}
        />
      </div>
    </div>
  );
};

export default AppScheduling;
