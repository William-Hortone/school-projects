import React, { useState } from "react";
import "./wardDetails.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import RoomMoreDetails from "../roomMoreDetails/RoomMoreDetails";
import WardMoreDetails from "../wardMoreDetails/WardMDetails";
import { useEffect } from "react";
import { selectWardDetails } from "../../../redux/slice/wardSlice";
import { useSelector } from "react-redux";

const WardDetails = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const wardsDetails = useSelector(selectWardDetails);
  const [usersLength, setUsersLength] = useState(wardsDetails.length - 1);
  const [lastElement, setLastElement] = useState(wardsDetails[usersLength]);

  useEffect(() => {
    setUsersLength(wardsDetails.length - 1);
  }, [wardsDetails.length]);

  useEffect(() => {
    setLastElement(wardsDetails[usersLength]);
  }, [usersLength, wardsDetails]);

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setAddOnSubmit(true);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const showRoomsToEdit = () => {
    setOpenScheduling(true);
    setAddOnSubmit(false);
  };

  const showSchedulingToDelete = () => {
    setOpenScheduleDelete(true);
    setAddOnSubmit(false);
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
    if (usersLength < wardsDetails.length - 1) {
      setUsersLength(usersLength + 1);
      if (usersLength == wardsDetails.length - 1) {
        return;
      }
    }
  };
  const handleShowLastEl = () => {
    setUsersLength(wardsDetails.length - 1);
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
              value={lastElement ? lastElement.wardID : ""}
              inputDisabled="true"
            />
          </div>
          <div className="input-fields">
            <label form="roomType"> Ward Type:</label>
            <Input
              placeholder="Ward Type"
              name="roomType"
              id="roomType"
              value={lastElement ? lastElement.wardType : ""}
              inputDisabled="true"
            />
          </div>
          <div className="input-fields">
            <label form="roomRates"> Ward Rates:</label>
            <Input
              placeholder="Ward Rates"
              name="roomRates"
              id="roomRates"
              value={lastElement ? lastElement.wardRates : ""}
              inputDisabled="true"
            />
          </div>

          <div className="input-fields">
            <label form="roomDesc"> Ward Description:</label>
            <Input
              placeholder="Ward Description"
              name="roomDesc"
              value={lastElement ? lastElement.wardDesc : ""}
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
            onClick={handleRefresh}
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
