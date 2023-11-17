import React, { useState } from "react";
import "./wardDetails.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import RoomMoreDetails from "../roomMoreDetails/RoomMoreDetails";
import WardMoreDetails from "../wardMoreDetails/WardMDetails";

const WardDetails = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setAddOnSubmit(true);
  };

  const showRoomsToEdit = () => {
    setOpenScheduling(true);
    setAddOnSubmit(false);
  };

  const showSchedulingToDelete = () => {
    setOpenScheduleDelete(true);
    setAddOnSubmit(false);
  };

  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2>WARD DETAILS</h2>
        <form>
          <div className="input-fields">
            <label form="roomId"> Ward ID:</label>
            <Input
              placeholder="Ward ID"
              id="roomID"
              name="roomID"
              //   value={appointmentInfos.schedulingID}
              //   handleOnChange={handleOnChangeAppointment}
            />
          </div>
          <div className="input-fields">
            <label form="roomType"> Ward Type:</label>
            <Input
              placeholder="Ward Type"
              name="roomType"
              id="roomType"
              //   value={appointmentInfos.schedulingID}
              //   handleOnChange={handleOnChangeAppointment}
            />
          </div>
          <div className="input-fields">
            <label form="roomRates"> Ward Rates:</label>
            <Input
              placeholder="Ward Rates"
              name="roomRates"
              id="roomRates"
              //   value={appointmentInfos.schedulingID}
              //   handleOnChange={handleOnChangeAppointment}
            />
          </div>

          <div className="input-fields">
            <label form="roomDesc"> Ward Description:</label>
            <Input
              placeholder="Ward Description"
              name="roomDesc"
              //   value={appointmentInfos.schedulingID}
              //   handleOnChange={handleOnChangeAppointment}
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

      <div
        className={
          openScheduling || openScheduleDelete
            ? "appScheduling-wrapper ActiveScheduling"
            : "appScheduling-wrapper"
        }
      >
        <WardMoreDetails
          setOpenScheduling={setOpenScheduling}
          setOpenScheduleDelete={setOpenScheduleDelete}
          openScheduleDelete={openScheduleDelete}
          addOnSubmit={addOnSubmit}
        />
      </div>
    </div>
  );
};

export default WardDetails;
