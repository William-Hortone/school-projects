import React from "react";
import "./roomDetails.css";
import { ButtonAction, ButtonSkip, Header, Input } from "../../../components";

const RoomDetails = () => {
  return (
    <div className="roomDetails">
      <Header />
      <div className="roomDetails-container">
        <h2>ROOM DETAILS</h2>
        <form>
          <div className="input-fields">
            <label form="roomId"> Room ID:</label>
            <Input
              placeholder="Room ID"
              id="roomID"
              name="roomID"
              //   value={appointmentInfos.schedulingID}
              //   handleOnChange={handleOnChangeAppointment}
            />
          </div>
          <div className="input-fields">
            <label form="roomType"> Room Type:</label>
            <Input
              placeholder="Room Type"
              name="roomType"
              //   value={appointmentInfos.schedulingID}
              //   handleOnChange={handleOnChangeAppointment}
            />
          </div>
          <div className="input-fields">
            <label form="roomDesc"> Room Description:</label>
            <Input
              placeholder="Room Description"
              name="roomDesc"
              //   value={appointmentInfos.schedulingID}
              //   handleOnChange={handleOnChangeAppointment}
            />
          </div>
        </form>
      </div>
      <div className="roomDetails-container-menus">
        <div className="roomDetails-container-menu-header">
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
            // onClick={handleShowScheduling}
          />
          <ButtonAction
            iconName="edit"
            btnName="Edit"
            color="green"
            // onClick={showSchedulingToEdit}
            buttonType="submit"
          />
          <ButtonAction
            iconName="delete"
            btnName="Delete"
            buttonType="button"
            color="red"
            // onClick={showSchedulingToDelete}
          />
          <ButtonAction
            iconName="refresh"
            btnName="Refresh"
            color="blue"
            buttonType="button"
            // onClick={handleRefresh}
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
    </div>
  );
};

export default RoomDetails;
