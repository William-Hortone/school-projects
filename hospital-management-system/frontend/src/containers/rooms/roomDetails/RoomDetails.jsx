import React, { useState } from "react";
import "./roomDetails.css";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import RoomMoreDetails from "../roomMoreDetails/RoomMoreDetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRoomsDetails } from "../../../redux/slice/roomsSlice";
import axios from "axios";
import { toast } from "react-toastify";

const RoomDetails = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [addOnSubmitRoomT, setAddOnSubmitRoomT] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const roomsDetails = useSelector(selectRoomsDetails);
  const [currentRecord, setCurrentRecord] = useState();
  const [roomTID, setRoomTID] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const [openPage, setOpenPage] = useState(false);

  const [allRoomType, setAllRoomType] = useState([]);

  const [inputs, setInputs] = useState({
    roomTypeID: "",
    roomType: "",
    roomRates: "",
    roomNotes: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // To Get all room Type
  const API_URL = "http://localhost:3001/getRoomTypes";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllRoomType(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setRoomTID(inputs.roomTypeID);
  }, [inputs.roomTypeID]);

  // ------------------ For add room Type -----------

  // To generate the id
  const handleAddRoomType = () => {
    setShowBtn(true);
    if (allRoomType.length === 0) {
      setInputs({
        ...inputs,
        roomTypeID: "roomT_001",
      });
    } else {
      const lastElementID = allRoomType[allRoomType.length - 1].roomTypeID;
      const numericPart = parseInt(lastElementID.split("_")[1]);
      const nextId = `roomT_${(numericPart + 1).toString().padStart(3, "0")}`;
      setInputs({
        ...inputs,
        roomTypeID: nextId,
      });
    }
    setDisabledInput(true);
  };

  // function to add a room type
  const handleSubmitAdd = (e) => {
    e.preventDefault();

    setAddOnSubmitRoomT(true);

    axios
      .post("http://localhost:3001/addRoomType", inputs)
      .then((res) => {
        console.log(res.data);
        toast.success("Added successfully");
        setShowBtn(false);
      })
      .catch((err) => console.log(err));
  };

  // The function to update the room type
  const handleUSubmitUpdate = (e, roomTID) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/editRoomType/${roomTID}`, inputs)
      .then((res) => {
        console.log(res.data);
        toast.success("Updated successfully");
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = () => {
    setAddOnSubmitRoomT(false);
    setShowBtn(true);
  };

  // Function to delete the room type
  const handleDeleteRoomType = (roomTID) => {
    axios
      .delete(`http://localhost:3001/deleteRoomType/${roomTID}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Deleted successfully");
        setShowPopupDelete(false);
      })
      .catch((err) => console.log(err));
  };

  const handleShowPopupDelete = () => {
    if (inputs.roomTypeID === undefined || inputs.roomTypeID === "") {
      toast.error("Please enter a room type ID");
    } else {
      setShowPopupDelete(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // ------------------ For add room Details-------
  const [usersLength, setUsersLength] = useState(roomsDetails.length - 1);
  const [lastElement, setLastElement] = useState(roomsDetails[usersLength]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsersLength(roomsDetails.length - 1);
  }, [roomsDetails.length]);

  useEffect(() => {
    setLastElement(roomsDetails[usersLength]);
    setCurrentRecord(usersLength + 1);
  }, [usersLength, roomsDetails]);

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(true);
  };

  const showRoomsToEdit = () => {
    setOpenScheduling(true);
    setOpenPage(true);

    setAddOnSubmit(false);
  };

  const showSchedulingToDelete = () => {
    setOpenScheduleDelete(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };
  const handleViewAllRoomType = () => {
    navigate("/VizRoomType");
  };
  const handleViewAllRooms = () => {
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

  // Function to field the form according to the selected field
  const handleUpdateInfos = (room) => {
    if (!addOnSubmitRoomT) {
      setInputs({
        roomTypeID: room.roomTypeID,
        roomType: room.roomType,
        roomRates: room.roomRates,
        roomNotes: room.roomNotes,
      });

      setDisabledInput(true);
    }
  };
  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2>ADD ROOM TYPE </h2>
        <form
          onSubmit={
            addOnSubmitRoomT
              ? handleSubmitAdd
              : (e) => handleUSubmitUpdate(e, roomTID)
          }
        >
          <div className="input-fields">
            <label form="roomType"> Room Type ID:</label>
            <Input
              placeholder="Room Type ID"
              name="roomTypeID"
              id="roomTypeID"
              value={inputs.roomTypeID}
              handleOnChange={handleOnChange}
              inputDisabled={disabledInput ? "true" : ""}
            />
          </div>
          <div className="input-fields">
            <label form="roomType"> Room Type:</label>
            <Input
              placeholder="Room Type"
              name="roomType"
              id="roomType"
              value={inputs.roomType}
              handleOnChange={handleOnChange}
              // value={lastElement ? lastElement.roomType : ""}
            />
          </div>
          <div className="input-fields">
            <label form="roomRates"> Room Rates:</label>
            <Input
              placeholder="Room Rates"
              name="roomRates"
              id="roomRates"
              value={inputs.roomRates}
              handleOnChange={handleOnChange}

              // value={lastElement ? lastElement.roomRates : ""}
            />
          </div>

          <div className="input-fields">
            <label form="roomDesc"> Notes</label>
            <Input
              placeholder="Room Notes"
              name="roomNotes"
              value={inputs.roomNotes}
              handleOnChange={handleOnChange}
              // value={lastElement ? lastElement.roomDesc : ""}
            />
          </div>

          {showBtn && (
            <button type="submit" className="submit-btn">
              Submit
            </button>
          )}
        </form>
      </div>

      {/* The  container menu buttons  for the room type*/}
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
          <input
            type="text"
            style={{ textAlign: "center" }}
            value={`Record No ${currentRecord}`}
            placeholder="Record No"
          />
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
            onClick={handleAddRoomType}
          />
          <ButtonAction
            iconName="edit"
            btnName="Edit"
            color="green"
            onClick={handleUpdate}
            buttonType="submit"
          />
          <ButtonAction
            iconName="delete"
            btnName="Delete"
            buttonType="button"
            color="red"
            onClick={handleShowPopupDelete}
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
            onClick={handleViewAllRoomType}
          />
        </div>
      </div>

      {/* The table  to display all the rooms type*/}
      <div className="app__roomMDetails-table">
        <table>
          <thead>
            <tr>
              <th>Room type ID </th>
              <th>Room Type </th>
              <th>Room Rates</th>
              <th>Room Notes</th>
            </tr>
          </thead>
          <tbody>
            {allRoomType.map((room, index) => {
              return (
                <tr
                  onClick={(e) => handleUpdateInfos(room)}
                  className={
                    !addOnSubmitRoomT
                      ? "doctor-infos select-serviceID"
                      : "doctor-infos"
                  }
                  key={index}
                >
                  <td>{room.roomTypeID}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomRates}</td>
                  <td>{room.roomNotes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* The popup to delete room type */}
      {showPopupDelete && (
        <div style={{ position: "" }}>
          <div
            style={{ position: "absolute" }}
            className="schedule-delete-popup"
          >
            <p>
              Do you really want to delete <br />
              the Service with ID of {inputs.roomTypeID} ?
            </p>
            <div className="delete-buttons">
              <button onClick={handleClosePopup}> Cancel</button>
              <button onClick={() => handleDeleteRoomType(roomTID)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini form for the room details */}
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
          {/* <div className="input-fields">
            <label form="roomType"> Room Type:</label>
            <Input
              placeholder="Room Type"
              name="roomType"
              id="roomType"
              value={lastElement ? lastElement.roomType : ""}
              inputDisabled="true"
            />
          </div> */}
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
          <input
            type="text"
            style={{ textAlign: "center" }}
            value={`Record No ${currentRecord}`}
            placeholder="Record No"
          />
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
            onClick={handleViewAllRooms}
          />
        </div>
      </div>

      {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <RoomMoreDetails
              setOpenScheduling={setOpenScheduling}
              setOpenScheduleDelete={setOpenScheduleDelete}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
