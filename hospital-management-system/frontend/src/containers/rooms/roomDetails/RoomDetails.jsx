import React, { useState } from "react";
import "./roomDetails.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import RoomMoreDetails from "../roomMoreDetails/RoomMoreDetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoomsDetails } from "../../../redux/slice/roomsSlice";

const RoomDetails = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const roomsDetails = useSelector(selectRoomsDetails);
  const [usersLength, setUsersLength] = useState(roomsDetails.length - 1);
  const [lastElement, setLastElement] = useState(roomsDetails[usersLength]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsersLength(roomsDetails.length - 1);
  }, [roomsDetails.length]);

  useEffect(() => {
    setLastElement(roomsDetails[usersLength]);
  }, [usersLength, roomsDetails]);

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
  const handleViewAll = () => {
    navigate("/vizRooms");
  };

  // Display the infos of the preview element
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

  // Display the infos of the next element
  const handleShowNext = () => {
    if (usersLength < roomsDetails.length - 1) {
      setUsersLength(usersLength + 1);
      if (usersLength == roomsDetails.length - 1) {
        return;
      }
    }
  };
  const handleShowLastEl = () => {
    setUsersLength(roomsDetails.length - 1);
  };

  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2>ROOM DETAILS</h2>
        <form>
          <div className="input-fields">
            <label form="roomId"> Room ID:</label>
            <Input
              placeholder="Room ID"
              id="roomID"
              name="roomID"
              value={lastElement ? lastElement.roomID : ""}
              inputDisabled="true"
            />
          </div>
          <div className="input-fields">
            <label form="roomType"> Room Type:</label>
            <Input
              placeholder="Room Type"
              name="roomType"
              id="roomType"
              value={lastElement ? lastElement.roomType : ""}
              inputDisabled="true"
            />
          </div>
          <div className="input-fields">
            <label form="roomRates"> Room Rates:</label>
            <Input
              placeholder="Room Rates"
              name="roomRates"
              id="roomRates"
              value={lastElement ? lastElement.roomRates : ""}
              inputDisabled="true"
            />
          </div>

          <div className="input-fields">
            <label form="roomDesc"> Room Description:</label>
            <Input
              placeholder="Room Description"
              name="roomDesc"
              value={lastElement ? lastElement.roomDesc : ""}
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
          <ButtonAction
            iconName="all"
            btnName="View All"
            color="blue"
            buttonType="button"
            onClick={handleViewAll}
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
        <RoomMoreDetails
          setOpenScheduling={setOpenScheduling}
          setOpenScheduleDelete={setOpenScheduleDelete}
          openScheduleDelete={openScheduleDelete}
          addOnSubmit={addOnSubmit}
        />
      </div>
    </div>
  );
};

export default RoomDetails;
