import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectRoomsDetails } from "../../../redux/slice/roomsSlice";
import "./roomMoreDetails.css";

const RoomMoreDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
}) => {
  const [inputs, setInputs] = useState({
    roomID: "",
    roomType: "",
    roomRates: "",
    roomDesc: "",
  });

  // To Get all room Details
  const API_URL = "http://localhost:3001/getRoomsDetails";

  // To Get all room Type
  const API_URL_ROOM_TYPE = "http://localhost:3001/getRoomTypes";

  useEffect(() => {
    fetchData();
  }, []);

  const [roomId, setRoomId] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [allRoomsType, setAllRoomsType] = useState([]);

  const roomsDetails = useSelector(selectRoomsDetails);

  const handleOnChangeAppointment = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const fetchDataRoomType = async () => {
    const { data } = await axios.get(API_URL_ROOM_TYPE);
    setAllRoomsType(data);
  };

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllRooms(data);
  };

  useEffect(() => {
    fetchDataRoomType();
    fetchData();
  }, []);

  useEffect(() => {
    setRoomId(inputs.roomID);
  }, [roomId, inputs.roomID]);

  const handleCloseScheduling = () => {
    setOpenScheduling(false);
    setOpenScheduleDelete(false);
    setInputs({
      roomID: "",
      roomType: "",
      roomRates: "",
      roomDesc: "",
    });
  };

  // function to generate  room  ID
  const handleAddAppointment = () => {
    if (addOnSubmit) {
      // Initialize the Id if the array is empty
      if (roomsDetails.length === 0) {
        setInputs({
          ...inputs,
          roomID: "room_001",
        });
      } else {
        // Get the last Id and increment it
        const lastElementId = roomsDetails[roomsDetails.length - 1].roomID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextElementId = `room_${(numericPart + 1)
          .toString()
          .padStart(3, "0")}`;
        setInputs({
          ...inputs,
          roomID: nextElementId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // The function to add a room details
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/roomsInfos", inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Added successfully");
        }
      })
      .catch((err) => toast.error(err));
  };

  // function to Edit a room details
  const handleSubmitEditRoom = (e, roomId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editRoomDetails/${roomId}`, inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Room updated successfully");
        } else if (res.data === "notfound") {
          toast.error("Wrong ID");
        } else {
          toast.error("An error occurred while updating the service");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  const handleDelete = () => {
    if (roomId === undefined || roomId === "") {
      toast.error("Please provide a Scheduling ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  //Function Delete  a room
  const handleDeleteRoom = (roomId) => {
    if (roomId === undefined || roomId === "") {
      toast.error("Please provide a Scheduling ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteRooms/${roomId}`)
        .then((res) => {
          if (res.data === "success") {
            toast.success("Deleted Successfully");
          }
          if (res.data === "notfound") {
            toast.error("Service not found");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
    setShowPopupDelete(false);
  };

  const handleUpdateInfos = (room) => {
    if (!addOnSubmit) {
      setInputs({
        roomID: room.roomID,
        roomType: room.roomType,
        roomRates: room.roomRates,
        roomDesc: room.roomDesc,
      });

      setDisabledInput(true);
    }
  };

  return (
    <>
      <div className="app__roomMDetails">
        <div className="app__roomMDetails-container">
          <h2 className="page-title">ROOMS DETAILS</h2>

          <form
            onSubmit={
              addOnSubmit
                ? handleSubmit
                : (e) => handleSubmitEditRoom(e, roomId)
            }
          >
            <div className="form--content">
              <div className="details-title">
                <h4> Room Detail</h4>
                <div className="divider" />
              </div>
              <div className="input-fields">
                <label form="schedulingId"> Room ID:</label>
                <Input
                  placeholder="Room ID"
                  name="roomID"
                  value={inputs.roomID}
                  handleOnChange={handleOnChangeAppointment}
                  inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                />
              </div>

              <div
                className="input-field doctor-types"
                style={{ paddingLeft: "3rem" }}
              >
                <label htmlFor="roomType"> Room Type</label>
                <div>
                  <select
                    name="roomType"
                    id="roomType"
                    value={inputs.roomType}
                    onChange={handleOnChangeAppointment}
                    required
                  >
                    {/* <option required value={docIDisPicked}>
                      {docIDisPicked ? pickedDoctorID : "Select a doctor ID"}
                    </option> */}
                    {allRoomsType.map((roomType, index) => (
                      <option key={index} value={roomType.roomType}>
                        {roomType.roomType}
                      </option>
                    ))}
                  </select>

                  <span onClick="" className="btn-seeAll">
                    See All
                  </span>
                </div>
              </div>

              {/* <div className="input-fields">
                <label htmlFor="roomType"> Room Type:</label>
                <Input
                  placeholder="Room Type"
                  name="roomType"
                  id="roomType"
                  value={inputs.roomType}
                  handleOnChange={handleOnChangeAppointment}

                  // readOnly
                />
              </div> */}
              {/* <div className="input-fields">
                <label htmlFor="roomRates"> Room Rates:</label>
                <Input
                  placeholder="Room Rates"
                  name="roomRates"
                  id="roomRates"
                  value={inputs.roomRates}
                  handleOnChange={handleOnChangeAppointment}
                />
              </div> */}

              <div className="input-fields">
                <label htmlFor="roomDesc"> Room Description:</label>
                <Input
                  placeholder="Room Description"
                  name="roomDesc"
                  id="roomDesc"
                  value={inputs.roomDesc}
                  handleOnChange={handleOnChangeAppointment}
                />
              </div>
              {!openScheduleDelete && (
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              )}
              {openScheduleDelete && (
                <button
                  onClick={handleDelete}
                  type="button"
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
          </form>

          {/* The table  to display the schedules*/}
          <div className="app__roomMDetails-table">
            <table>
              <thead>
                <tr>
                  <th>Room ID </th>
                  <th>Room Type </th>
                  <th>Room Rates</th>
                  <th>Room Description</th>
                </tr>
              </thead>
              <tbody>
                {allRooms.map((room, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(room)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-serviceID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{room.roomID}</td>
                      <td>{room.roomType}</td>
                      <td>{room.roomRates}</td>
                      <td>{room.roomDesc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* The buttons container */}
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
                onClick={handleAddAppointment}
              />

              <ButtonAction
                iconName="close"
                btnName="Cancel"
                color="red"
                buttonType="button"
                onClick={handleCloseScheduling}
              />
            </div>
          </div>

          {/* The popup to delete */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the Service with ID of {inputs.schedulingID} ?
                </p>
                <div className="delete-buttons">
                  <button onClick={handleClosePopup}> Cancel</button>
                  <button onClick={() => handleDeleteRoom(roomId)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomMoreDetails;
