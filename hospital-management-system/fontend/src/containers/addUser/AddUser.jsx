import React, { useState } from "react";
import "./addUser.css";
import { ButtonAction, ButtonSkip, Input } from "../../components";
import AddUserDetails from "../addUserDetails/AddUserDetails";
// import { ButtonAction, ButtonSkip, Input } from "../../../components";
// import RoomMoreDetails from "../roomMoreDetails/RoomMoreDetails";
// import WardMoreDetails from "../wardMoreDetails/WardMDetails";

const AddUser = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const [inputs, setInputs] = useState({
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

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

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="roomDetails">
      <div className="roomDetails-container">
        <h2>USER DETAILS</h2>
        <form>
          <div className="input-fields">
            <label htmlFor="firstName"> First Name</label>
            <Input
              placeholder="First Name"
              id="firstName"
              name="firstName"
              value={inputs.firstName}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="lastName"> Last Name:</label>
            <Input
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              value={inputs.lastName}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="gender">Gender:</label>
            <Input
              placeholder="Gender"
              name="gender"
              id="gender"
              value={inputs.gender}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="address">Address:</label>
            <Input
              placeholder="Address"
              name="address"
              id="address"
              value={inputs.address}
              handleOnChange={handleOnChange}
            />
          </div>

          <div className="input-fields">
            <label htmlFor="email">Email:</label>
            <Input
              placeholder="Email"
              name="email"
              id="email"
              value={inputs.email}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="telephone"> Telephone:</label>
            <Input
              placeholder="Telephone"
              name="telephone"
              id="telephone"
              value={inputs.telephone}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="status"> Status:</label>
            <Input
              placeholder="Status"
              name="status"
              id="status"
              value={inputs.status}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className="input-fields">
            <label htmlFor="notes"> Notes:</label>
            <Input
              placeholder="Notes"
              name="notes"
              id="notes"
              value={inputs.notes}
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
