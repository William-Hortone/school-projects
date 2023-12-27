import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { ButtonAction, ButtonSkip, Input, Select } from "../../../components";
// import { selectMedicalService } from "../../redux/slice/medicalServiceSlice";
// import { selectaddedUserDetails } from "../../redux/slice/roomsSlice";
// import "./addUserDetails.css";
// import fetchAddedUserDetails from "../../redux/actions/addedUser";
// import { selectAddedUserInfos } from "../../../redux/slice/addedUserSlide";

const OutPatientCancelP = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [inputs, setInputs] = useState({
    appointmentID: "",
    patientID: "",
    doctorID: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [id, setId] = useState("");
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  //   const addedUserDetails = useSelector(selectAddedUserInfos);

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
  };

  useEffect(() => {
    setId(inputs.userID);
  }, [inputs.userID]);

  //   Function to add user  a new roo ID
  //   const handleAddAppointment = () => {
  //     if (addOnSubmit) {
  //       // Initialize the Id if the array is empty
  //       if (addedUserDetails.length === 0) {
  //         setInputs({
  //           ...inputs,
  //           userID: "user_001",
  //         });
  //       } else {
  //         // Get the last Id and increment it
  //         const lastElementId =
  //           addedUserDetails[addedUserDetails.length - 1].userID;
  //         const numericPart = parseInt(lastElementId.split("_")[1]);
  //         const nextElementId = `user_${(numericPart + 1)
  //           .toString()
  //           .padStart(3, "0")}`;
  //         console.log("nextElementId", nextElementId);
  //         setInputs({
  //           ...inputs,
  //           userID: nextElementId,
  //         });
  //       }
  //     } else {
  //       toast.error("Please Enter a Id manually to update");
  //     }
  //   };

  // The function to add a User details
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/usersInfos", inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Added successfully");
        }
      })
      .catch((err) => toast.error(err));
  };

  // function to Edit a user details
  const handleSubmitEditRoom = (e, userId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editUserDetails/${userId}`, inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Room updated successfully");
        } else if (res.data === "notfound") {
          toast.error("Wrong ID");
        } else {
          toast.error("An error occurred while updating the user");
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
    if (id === undefined || id === "") {
      toast.error("Please provide a user ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  // Delete a user
  const handleDeleteRoom = (userId) => {
    if (userId === undefined || userId === "") {
      toast.error("Please provide a Scheduling ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteUser/${userId}`)
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

  const handleUpdateInfos = (user) => {
    if (!addOnSubmit) {
      setInputs({
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        address: user.address,
        email: user.email,
        telephone: user.telephone,
        status: user.status,
        notes: user.notes,
        userType: user.userType,
        userName: user.userName,
      });

      // setSelectedDays(room.selectedDays);
      // setPickedServiceID(user.userID);
      // setDocIDisPicked(true);
      // setDisabledInput(true);
    }
  };

  return (
    <>
      <div className="app__roomMDetails schedule-container">
        <div className="app__roomMDetails-container">
          <h2 className="page-title">USER DETAILS</h2>

          <form
            onSubmit={
              addOnSubmit ? handleSubmit : (e) => handleSubmitEditRoom(e, id)
            }
          >
            <div className="container container-content">
              {/* <div className="container-wrapper"> */}
              <div className="form--content">
                <div className="details-title">
                  <h4> User Details</h4>
                  <div className="divider" />
                </div>
                <div className="input-fields">
                  <label htmlFor="userID"> User ID</label>
                  <Input
                    placeholder="User ID"
                    id="userID"
                    name="userID"
                    value={inputs.userID}
                    handleOnChange={handleOnChange}
                    inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                  />
                </div>
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
                  <label htmlFor="userName"> User Name:</label>
                  <Input
                    placeholder="User Name"
                    name="userName"
                    id="userName"
                    value={inputs.userName}
                    handleOnChange={handleOnChange}
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
                {/* </div> */}
              </div>

              {/* <div className="container-wrapper"> */}
              <div className="form--content">
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
                  <div>
                    <input
                      type="tel"
                      placeholder="Telephone"
                      name="telephone"
                      id="telephone"
                      value={inputs.telephone}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
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
                <div className="input-fields">
                  <label htmlFor="userType"> User Type:</label>
                  <Input
                    placeholder="User Type"
                    name="userType"
                    id="userType"
                    value={inputs.userType}
                    handleOnChange={handleOnChange}
                  />
                </div>

                {/* </div> */}
              </div>
            </div>
            {/* </div> */}
          </form>

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
                // onClick={handleAddAppointment}
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

          {/* The table  to display the schedules*/}
          <div className="app__roomMDetails-table">
            <table>
              <thead>
                <tr>
                  <th>User ID </th>
                  <th>User First Name </th>
                  <th>User Last Name</th>
                  <th>User Gender</th>
                  <th>User Address</th>
                  <th>User Email</th>
                  <th>User Telephone</th>
                  <th>User Status</th>
                  <th>User Notes</th>
                  <th>User Type</th>
                  <th>User Name</th>
                </tr>
              </thead>
              {/* <tbody>
                {addedUserDetails.map((user, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(user)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-serviceID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{user.userID}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.gender}</td>
                      <td>{user.address}</td>
                      <td>{user.email}</td>
                      <td>{user.telephone}</td>
                      <td>{user.status}</td>
                      <td>{user.notes}</td>
                      <td>{user.userType}</td>
                      <td>{user.userName}</td>
                    </tr>
                  );
                })}
              </tbody> */}
            </table>
          </div>

          {/* The popup to delete */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the User with ID of {inputs.userID} ?
                </p>
                <div className="delete-buttons">
                  <button onClick={handleClosePopup}> Cancel</button>
                  <button onClick={() => handleDeleteRoom(id)}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OutPatientCancelP;
