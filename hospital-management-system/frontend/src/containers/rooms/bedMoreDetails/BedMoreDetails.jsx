import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectRoomsDetails } from "../../../redux/slice/roomsSlice";
import { selectWardDetails } from "../../../redux/slice/wardSlice";
import "./bedMoreDetails.css";

const BedMoreDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [inputs, setInputs] = useState({
    bedID: "",
    bedPlace: "",
    bedDesc: "",
  });
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedWards, setSelectedWards] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [theBedId, setTheBedId] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [roomIsSelected, setRoomIsSelected] = useState(true);
  const [allBeds, setAllBeds] = useState([]);

  const roomsDetails = useSelector(selectRoomsDetails);
  const wardsDetails = useSelector(selectWardDetails);

  // To Get all the available beds
  const API_URL = "http://localhost:3001/getBedsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllBeds(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTheBedId(inputs.bedID);
  }, [inputs.bedID]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleCloseScheduling = () => {
    setOpenPage(false);
    setOpenScheduling(false);
    setOpenScheduleDelete(false);
    setInputs({
      bedID: "",
      bedPlace: "",
      bedDesc: "",
    });
  };

  // Function to generate the ID
  const handleAddBed = () => {
    if (addOnSubmit) {
      if (allBeds.length === 0) {
        setInputs({
          ...inputs,
          bedID: "bed_001",
        });
      } else {
        const lastElementId = allBeds[allBeds.length - 1].bedID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextId = `bed_${(numericPart + 1).toString().padStart(3, "0")}`;

        setInputs({
          ...inputs,
          bedID: nextId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // Function to add a new bed
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/addBed", inputs)
      .then((res) => {
        toast.success("Added successfully");
      })
      .catch((err) => toast.error(err));
  };

  // Function to update an bed details
  const handleSubmitEditDoctor = (e, theBedId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editBedDetails/${theBedId}`, inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Updated successfully");
        } else if (res.data === "notfound") {
          toast.error("Wrong ID");
        } else {
          toast.error("An error occurred while updating ");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleDelete = () => {
    if (theBedId === undefined || theBedId === "") {
      toast.error("Please provide a bed ID");
    } else {
      setShowPopupDelete(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // Function to Delete a bed
  const handleDeleteBed = (theBedId) => {
    if (theBedId === undefined || theBedId === "") {
      toast.error("Please provide a bed ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteBed/${theBedId}`)
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

  // Automatically fill the form when click on one  element of the table
  const handleUpdateInfos = (bed) => {
    if (!addOnSubmit) {
      setInputs({
        bedID: bed.bedID,
        bedPlace: bed.bedPlace,
        bedDesc: bed.bedDesc,
      });

      setDisabledInput(true);
    }
  };

  const handleSelectPlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  useEffect(() => {
    if (selectedPlace === "room") {
      setRoomIsSelected(true);
    } else {
      if (selectedPlace === "ward") {
        setRoomIsSelected(false);
      }
    }
  }, [selectedPlace]);

  useEffect(() => {
    // If room is selected pass the selected room
    if (roomIsSelected) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        bedPlace: selectedRooms,
      }));
    }
    // If ward is selected pass the selected ward
    else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        bedPlace: selectedWards,
      }));
    }
  }, [roomIsSelected, selectedRooms, selectedWards]);

  return (
    <>
      <div className="app__scheduling">
        <div className="app__scheduling-container">
          <h2>Bed Details</h2>

          <form
            onSubmit={
              addOnSubmit
                ? handleSubmit
                : (e) => handleSubmitEditDoctor(e, theBedId)
            }
          >
            <div className="form-left-box">
              <div className="details-title">
                <h4> Bed Details</h4>
                <div className="divider" />
              </div>
              <div className="input-fields">
                <label form="bedID"> Bed ID:</label>
                <Input
                  placeholder="Bed ID"
                  name="bedID"
                  value={inputs.bedID}
                  handleOnChange={handleOnChange}
                  inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                />
              </div>
              <div className="input-fields">
                <label htmlFor="place"> Room / Ward:</label>
                <Input
                  placeholder="Place infos"
                  name="bedPlace"
                  value={inputs.bedPlace}
                  handleOnChange={handleOnChange}
                  readOnly
                />
              </div>

              <div className="input-fields">
                <label htmlFor="bedDesc">Bed Description:</label>
                <textarea
                  name="bedDesc"
                  id="bedDesc"
                  cols="39"
                  placeholder="Bed description"
                  rows="10"
                  onChange={handleOnChange}
                  value={inputs.bedDesc}
                ></textarea>
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

            {/* To select a room or ward */}
            <aside>
              <div className="details-title">
                <h4> Choose a room or ward</h4>
              </div>
              {/* To select a room ID */}
              <div className="box-input-radio">
                <input
                  type="radio"
                  id="rooms"
                  name="room"
                  value="room"
                  checked={selectedPlace === "room"}
                  onChange={handleSelectPlaceChange}
                  className="input-radio"
                />
                <label htmlFor="rooms">Rooms</label>
              </div>

              <div className="box-input-radio">
                <input
                  type="radio"
                  id="contactChoice2"
                  name="ward"
                  value="ward"
                  checked={selectedPlace === "ward"}
                  onChange={handleSelectPlaceChange}
                  className="input-radio"
                />
                <label htmlFor="wards">Wards</label>
              </div>

              {/* Display for select a room*/}
              {selectedPlace === "room" && (
                <div className="aside-option-box">
                  <label htmlFor="rooms"> Rooms</label>
                  <div className="option-wrapper">
                    <select
                      name="rooms"
                      id="wards"
                      value={selectedRooms}
                      onChange={(e) => setSelectedRooms(e.target.value)}
                      required
                    >
                      <option value="">Select a room ID</option>
                      {roomsDetails.map((room, index) => (
                        <option key={index} value={room.roomID}>
                          {room.roomID}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Display for select a ward*/}
              {selectedPlace === "ward" && (
                <div className="aside-option-box">
                  <label htmlFor="wards"> Wards</label>
                  <div className="option-wrapper">
                    <select
                      name="wards"
                      id="wards"
                      value={selectedWards}
                      onChange={(e) => setSelectedWards(e.target.value)}
                      required
                    >
                      <option required value="">
                        Select a ward ID
                      </option>
                      {wardsDetails.map((ward, index) => (
                        <option key={index} value={ward.wardID}>
                          {ward.wardID}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </aside>
          </form>

          {/* Table to display all beds */}
          <div className="appScheduling-table">
            <table>
              <thead>
                <tr>
                  <th>Bed ID </th>
                  <th>Bed Place </th>
                  <th>Bed Description</th>
                </tr>
              </thead>
              <tbody>
                {allBeds.map((bed, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(bed)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-doctorID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{bed.bedID}</td>
                      <td>{bed.bedPlace}</td>
                      <td>{bed.bedDesc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Popup to delete a bed */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the bed with ID of {inputs.bedID} ?
                </p>
                <div className="delete-buttons">
                  <button onClick={handleClosePopup}> Cancel</button>
                  <button onClick={() => handleDeleteBed(theBedId)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Container buttons menus */}
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
                onClick={handleAddBed}
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
        </div>
      </div>
    </>
  );
};

export default BedMoreDetails;
