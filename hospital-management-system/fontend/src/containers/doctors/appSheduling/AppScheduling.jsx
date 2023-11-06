import React, { useState } from "react";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import "./appScheduling.css";
import Scheduling from "../scheduling/Scheduling";

const AppScheduling = () => {
  const [openScheduling, setOpenScheduling] = useState(false);

  const handleShowScheduling = () => {
    setOpenScheduling(true);
  };
  return (
    <div className="appScheduling">
      {/* <div> */}
      <div className="appScheduling-container">
        <h2>Doctor Appointment Scheduling</h2>
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
              // value={input.serviceID}
              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <div className="input-field">
            <label form="doctorId"> Doctor ID:</label>
            <Input
              placeholder="Doctor ID"
              name="doctorID"
              // value={input.serviceID}
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
              // value={input.serviceID}
              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <div className="input-field">
            <label form="timeOut"> Time Out:</label>
            <Input
              placeholder="Time Out"
              name="timeOut"
              // value={input.serviceID}
              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <div className="input-field">
            <label form="availableDays"> Available Days:</label>
            <Input
              placeholder="Available Days"
              name="availableDays"
              // value={input.serviceID}
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
              // value={input.serviceID}
              // onChange={handleOnChange}
              // disabled={!isInputEnabled}
            />
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Schedule ID </th>
              <th>Doctor ID </th>
              <th>Doctor In</th>
              <th>Doctor Out</th>
              <th>Doctor Available</th>
              <th>Schedule Notes</th>
            </tr>
          </thead>
          <tbody>
            {/* {!hideData &&
                  medicalSDetail.map((medicalService, index) => {
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

      <div className="container-menu">
        <div className="container-menu-header">
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
            // onClick={HandleEditMedicalS}
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
          <Scheduling setOpenScheduling={setOpenScheduling} />
        </div>
      )}
    </div>
    // </div>
  );
};

export default AppScheduling;
