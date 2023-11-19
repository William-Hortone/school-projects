import React, { useEffect, useState } from "react";
import "./addUser.css";
import { ButtonAction, ButtonSkip, Input } from "../../components";
import AddUserDetails from "../addUserDetails/AddUserDetails";
import { useNavigate } from "react-router-dom";
import { selectAddedUserInfos } from "../../redux/slice/addedUserSlide";
import { useSelector } from "react-redux";

const AddUser = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const addedUserInfos = useSelector(selectAddedUserInfos);

  const [usersLength, setUsersLength] = useState(addedUserInfos.length - 1);
  const [lastElement, setLastElement] = useState(addedUserInfos[usersLength]);

  const [inputs, setInputs] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    email: "",
    telephone: "",
    status: "",
    notes: "",
    userType: "",
    userName: "",
  });

  const navigate = useNavigate();

  // let usersLength = addedUserInfos.length - 1;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setLastElement(addedUserInfos[usersLength]);
  }, [usersLength, addedUserInfos]);

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setAddOnSubmit(true);
  };

  const showRoomsToEdit = () => {
    setOpenScheduling(true);
    setAddOnSubmit(false);
  };
  const handleViewAllMedicalS = () => {
    // navigate("/adminDashboard");
  };
  const handleClose = () => {
    navigate("/adminDashboard");
  };

  const handleShowPrev = () => {
    if (usersLength > 0) {
      setUsersLength(usersLength - 1);
      if (usersLength == 0) {
        return;
      }
    }
  };
  const handleShowFirstEl = () => {
    setUsersLength(usersLength - 1);
  };
  const handleShowLastEl = () => {
    setUsersLength(addedUserInfos.length - 1);
  };
  const handleShowNext = () => {
    if (usersLength < addedUserInfos.length - 1) {
      setUsersLength(usersLength + 1);
      if (usersLength == addedUserInfos.length - 1) {
        return;
      }
    }
  };

  const showSchedulingToDelete = () => {
    setOpenScheduleDelete(true);
    setAddOnSubmit(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2>USER DETAILS</h2>
        <form>
          <div className="input-fields">
            <label htmlFor="userID"> User ID</label>
            <Input
              placeholder="User ID"
              id="userID"
              name="userID"
              value={lastElement ? lastElement.userID : ""}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="firstName"> First Name</label>
            <Input
              placeholder="First Name"
              id="firstName"
              name="firstName"
              value={lastElement ? lastElement.firstName : ""}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="lastName"> Last Name:</label>
            <Input
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              value={lastElement ? lastElement.lastName : ""}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="gender">Gender:</label>
            <Input
              placeholder="Gender"
              name="gender"
              id="gender"
              value={lastElement ? lastElement.gender : ""}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="address">Address:</label>
            <Input
              placeholder="Address"
              name="address"
              id="address"
              value={lastElement ? lastElement.address : ""}
              handleOnChange={handleOnChange}
            />
          </div>

          <div className="input-fields">
            <label htmlFor="email">Email:</label>
            <Input
              placeholder="Email"
              name="email"
              id="email"
              value={lastElement ? lastElement.email : ""}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="telephone"> Telephone:</label>
            <Input
              placeholder="Telephone"
              name="telephone"
              id="telephone"
              value={lastElement ? lastElement.telephone : ""}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="status"> Status:</label>
            <Input
              placeholder="Status"
              name="status"
              id="status"
              value={lastElement ? lastElement.status : ""}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="notes"> Notes:</label>
            <Input
              placeholder="Notes"
              name="notes"
              id="notes"
              value={lastElement ? lastElement.notes : ""}
              handleOnChange={handleOnChange}
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
            onClick={handleClose}
          />
          <ButtonAction
            iconName="all"
            btnName="View All"
            color="blue"
            buttonType="button"
            onClick={handleViewAllMedicalS}
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
        <AddUserDetails
          setOpenScheduling={setOpenScheduling}
          setOpenScheduleDelete={setOpenScheduleDelete}
          openScheduleDelete={openScheduleDelete}
          addOnSubmit={addOnSubmit}
        />
      </div>
    </div>
  );
};

export default AddUser;
