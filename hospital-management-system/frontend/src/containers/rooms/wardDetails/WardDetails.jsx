import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectWardDetails } from "../../../redux/slice/wardSlice";
import WardMoreDetails from "../wardMoreDetails/WardMDetails";
import "./wardDetails.css";
import axios from "axios";
import { toast } from "react-toastify";

const WardDetails = () => {
  const wardsDetails = useSelector(selectWardDetails);

  const [openScheduling, setOpenScheduling] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [currentRecord, setCurrentRecord] = useState();
  const [disabledInput, setDisabledInput] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [wardTID, setWardTID] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [allWardType, setAllWardType] = useState([]);
  const [addOnSubmitWardT, setAddOnSubmitWardT] = useState(true);
  const [usersLength, setUsersLength] = useState(wardsDetails.length - 1);
  const [lastElement, setLastElement] = useState(wardsDetails[usersLength]);

  const [inputs, setInputs] = useState({
    wardTypeID: "",
    wardType: "",
    wardRates: "",
    wardNotes: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  // To Get all ward Types
  const API_URL = "http://localhost:3001/getWardTypes";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllWardType(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // To generate the id  for ward type
  const handleAddRoomType = () => {
    setShowBtn(true);
    if (allWardType.length === 0) {
      setInputs({
        ...inputs,
        wardTypeID: "wardT_001",
      });
    } else {
      const lastElementID = allWardType[allWardType.length - 1].wardTypeID;
      const numericPart = parseInt(lastElementID.split("_")[1]);
      const nextId = `wardT_${(numericPart + 1).toString().padStart(3, "0")}`;
      setInputs({
        ...inputs,
        wardTypeID: nextId,
      });
    }
    setDisabledInput(true);
  };

  // function to add a ward type
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    setAddOnSubmitWardT(true);

    axios
      .post("http://localhost:3001/addWardType", inputs)
      .then((res) => {
        console.log(res.data);
        toast.success("Added successfully");
        setShowBtn(false);
      })
      .catch((err) => console.log(err));
  };

  // The function to update the ward type
  const handleUSubmitUpdate = (e, wardTID) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/editWardType/${wardTID}`, inputs)
      .then((res) => {
        console.log(res.data);
        toast.success("Updated successfully");
      })
      .catch((err) => console.log(err));
  };

  // Function to delete the room type
  const handleDeleteWardType = (wardTID) => {
    axios
      .delete(`http://localhost:3001/deleteWardType/${wardTID}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Deleted successfully");
        setShowPopupDelete(false);
      })
      .catch((err) => console.log(err));
  };

  // Function to field the form according to the selected field on the table
  const handleUpdateInfos = (ward) => {
    if (!addOnSubmitWardT) {
      setInputs({
        wardTypeID: ward.wardTypeID,
        wardType: ward.wardType,
        wardRates: ward.wardRates,
        wardNotes: ward.wardNotes,
      });

      setDisabledInput(true);
    }
  };

  const handleShowPopupDelete = () => {
    if (inputs.wardTypeID === undefined || inputs.wardTypeID === "") {
      toast.error("Please enter a ward type ID");
    } else {
      setShowPopupDelete(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  useEffect(() => {
    setWardTID(inputs.wardTypeID);
  }, [inputs.wardTypeID]);

  const handleUpdateType = () => {
    setAddOnSubmitWardT(false);
    setShowBtn(true);
  };

  // ------------------ For the ward details------------------

  useEffect(() => {
    setUsersLength(wardsDetails.length - 1);
  }, [wardsDetails.length]);

  useEffect(() => {
    setLastElement(wardsDetails[usersLength]);
    setCurrentRecord(usersLength + 1);
  }, [usersLength, wardsDetails]);

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(true);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const showRoomsToEdit = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };

  const showSchedulingToDelete = () => {
    setOpenPage(true);
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

  const handleViewAll = () => {
    navigate("/vizAllWards");
  };

  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2>WARD TYPE</h2>
        <form
          onSubmit={
            addOnSubmitWardT
              ? handleSubmitAdd
              : (e) => handleUSubmitUpdate(e, wardTID)
          }
        >
          <div className="input-fields">
            <label form="roomId"> Ward Type ID:</label>
            <Input
              placeholder="Ward Type ID"
              id="wardTypeID"
              name="wardTypeID"
              value={inputs.wardTypeID}
              handleOnChange={handleOnChange}
              inputDisabled={disabledInput ? "true" : ""}
              // value={lastElement ? lastElement.wardID : ""}
              // inputDisabled="true"
            />
          </div>
          <div className="input-fields">
            <label form="wardType"> Ward Type:</label>
            <Input
              placeholder="Ward Type"
              name="wardType"
              id="wardType"
              handleOnChange={handleOnChange}
              // value={lastElement ? lastElement.wardType : ""}
              value={inputs.wardType}
              // inputDisabled="true"
            />
          </div>
          <div className="input-fields">
            <label form="wardRates"> Ward Rates:</label>
            <Input
              placeholder="Ward Rates"
              name="wardRates"
              id="wardRates"
              handleOnChange={handleOnChange}
              // value={lastElement ? lastElement.wardRates : ""}
              value={inputs.wardRates}
              // inputDisabled="true"
            />
          </div>

          <div className="input-fields">
            <label form="wardNotes"> Ward Notes:</label>
            <Input
              placeholder="Ward Notes"
              handleOnChange={handleOnChange}
              name="wardNotes"
              // value={lastElement ? lastElement.wardDesc : ""}
              value={inputs.wardNotes}
              // inputDisabled="true"
            />
          </div>
          {showBtn && (
            <button type="submit" className="submit-btn">
              Submit
            </button>
          )}
        </form>
      </div>

      {/* The  container menu buttons for the ward type */}
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
            onClick={handleUpdateType}
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
            onClick={handleRefresh}
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

      {/* The table  to display all the wards type*/}
      <div className="app__roomMDetails-table">
        <table>
          <thead>
            <tr>
              <th>Ward type ID </th>
              <th>Ward Type </th>
              <th>Ward Rates</th>
              <th>Ward Notes</th>
            </tr>
          </thead>
          <tbody>
            {allWardType.map((ward, index) => {
              return (
                <tr
                  onClick={(e) => handleUpdateInfos(ward)}
                  className={
                    !addOnSubmitWardT
                      ? "doctor-infos select-serviceID"
                      : "doctor-infos"
                  }
                  key={index}
                >
                  <td>{ward.wardTypeID}</td>
                  <td>{ward.wardType}</td>
                  <td>{ward.wardRates}</td>
                  <td>{ward.wardNotes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* The popup to delete ward type */}
      {showPopupDelete && (
        <div style={{ position: "" }}>
          <div
            style={{ position: "absolute" }}
            className="schedule-delete-popup"
          >
            <p>
              Do you really want to delete <br />
              the ward with ID of {inputs.wardTypeID} ?
            </p>
            <div className="delete-buttons">
              <button onClick={handleClosePopup}> Cancel</button>
              <button onClick={() => handleDeleteWardType(wardTID)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple form for the ward details */}
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

      {/* The  container menu buttons  for ward details*/}
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
            onClick={handleRefresh}
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

      {/* Open the WardMoreDetails component */}
      {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <WardMoreDetails
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

export default WardDetails;
