import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { selectWardDetails } from "../../../redux/slice/wardSlice";
import "./wardMoreDetails.css";

const WardMoreDetails = ({
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

  const [id, setId] = useState("");
  const [pickedServiceID, setPickedServiceID] = useState("");
  const [docIDisPicked, setDocIDisPicked] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showDocDetailTable, setShowDocDetailTable] = useState(false);
  // const input = { ...inputs, selectedDays };

  const wardsDetails = useSelector(selectWardDetails);

  const handleOnChangeAppointment = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setId(inputs.wardID);
  }, [setId, inputs.wardID]);

  const handleClose = () => {
    setOpenScheduling(false);
    setOpenScheduleDelete(false);
    setInputs({
      wardID: "",
      wardType: "",
      wardRates: "",
      wardDesc: "",
    });
  };

  // To Display only selected days
  // useEffect(() => {
  //   const selectedDays = Object.keys(availableDays).filter(
  //     (day) => availableDays[day]
  //   );
  //   const selectedDaysString = selectedDays.join(", ");
  //   setSelectedDays(selectedDaysString);
  //   setRoomId(inputs.schedulingID);
  // }, [availableDays, input, inputs.schedulingID]);

  // function to add room  a new roo ID
  const handleAddWardDetails = () => {
    if (addOnSubmit) {
      // Initialize the Id if the array is empty
      if (wardsDetails.length === 0) {
        setInputs({
          ...inputs,
          wardID: "ward_001",
        });
      } else {
        // Get the last Id and increment it
        const lastElementId = wardsDetails[wardsDetails.length - 1].wardID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextElementId = `ward_${(numericPart + 1)
          .toString()
          .padStart(3, "0")}`;
        console.log("nextElementId", nextElementId);
        setInputs({
          ...inputs,
          wardID: nextElementId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // The function to add a ward details
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/wardsInfos", inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Added successfully");
        }
      })
      .catch((err) => toast.error(err));
  };

  // function to Edit a ward details
  const handleSubmitEditWard = (e, wardId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editWardDetails/${wardId}`, inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Room updated successfully");
        } else if (res.data === "notfound") {
          toast.error("Wrong ID");
        } else {
          toast.error("An error occurred while updating the ward");
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
      toast.error("Please provide a ward ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  // Delete a ward
  const handleDeleteWard = (wardId) => {
    if (id === undefined || id === "") {
      toast.error("Please provide a Ward ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteWard/${wardId}`)
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

  // const handleShowDocDetailsTable = () => {
  //   setShowDocDetailTable(true);
  // };

  // const handleCloseDocDetailsTable = () => {
  //   setShowDocDetailTable(false);
  // };

  // Passing the Service Id to the form when selected
  // const handleServiceId = (serID) => {
  //   setShowDocDetailTable(false);
  //   setPickedServiceID(serID);
  //   setInputs({
  //     ...inputs,
  //     serviceID: serID,
  //   });
  //   setDocIDisPicked(true);
  // };

  // automatically fill the form when click on one row of the table
  // const handleUpdateInfos = (room) => {
  //   if (!addOnSubmit) {
  //     setInputs({
  //       roomID: room.roomID,
  //       roomType: room.roomType,
  //       roomRates: room.roomRates,
  //       roomDesc: room.roomDesc,
  //     });

  //     // setSelectedDays(room.selectedDays);
  //     setRoomId(room.roomID);
  //     console.log("Room iD selected", roomId);
  //     console.log("Room iD ", inputs.roomID);
  //     // setPickedServiceID(room.roomID);
  //     // setDocIDisPicked(true);
  //     setDisabledInput(true);
  //   }
  // };

  const handleUpdateInfos = (ward) => {
    if (!addOnSubmit) {
      setInputs({
        wardID: ward.wardID,
        wardType: ward.wardType,
        wardRates: ward.wardRates,
        wardDesc: ward.wardDesc,
      });

      setPickedServiceID(ward.wardID);
      setDocIDisPicked(true);
      setDisabledInput(true);
    }
  };

  // Delete a service schedule
  // const handleDeleteWard = (scheduleId) => {
  //   if (scheduleId === undefined || scheduleId === "") {
  //     toast.error("Please provide a Scheduling ID");
  //   } else {
  //     axios
  //       .put(`http://localhost:3001/deleteHospitalSchedule/${scheduleId}`)
  //       .then((res) => {
  //         if (res.data === "success") {
  //           toast.success("Deleted Successfully");
  //         }
  //         if (res.data === "notfound") {
  //           toast.error("Service not found");
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(error);
  //       });
  //   }
  //   setShowPopupDelete(false);
  // };

  return (
    <>
      <div className="app__roomMDetails">
        <div className="app__roomMDetails-container">
          <h2 className="page-title">WARDS DETAILS</h2>

          <form
            onSubmit={
              addOnSubmit ? handleSubmit : (e) => handleSubmitEditWard(e, id)
            }
          >
            <div className="form--content">
              <div className="details-title">
                <h4> Ward Details</h4>
                <div className="divider" />
              </div>
              <div className="input-fields">
                <label form="schedulingId"> Ward ID:</label>
                <Input
                  placeholder="Ward ID"
                  name="wardID"
                  value={inputs.wardID}
                  handleOnChange={handleOnChangeAppointment}
                  inputDisabled={disabledInput || addOnSubmit ? "true" : ""}
                />
              </div>

              <div className="input-fields">
                <label htmlFor="wardType"> Ward Type:</label>
                <Input
                  placeholder="Ward Type"
                  name="wardType"
                  id="wardType"
                  value={inputs.wardType}
                  handleOnChange={handleOnChangeAppointment}

                  // readOnly
                />
              </div>
              <div className="input-fields">
                <label htmlFor="wardRates"> Ward Rates:</label>
                <Input
                  placeholder="Ward Rates"
                  name="wardRates"
                  id="wardRates"
                  value={inputs.wardRates}
                  handleOnChange={handleOnChangeAppointment}
                />
              </div>

              <div className="input-fields">
                <label htmlFor="wardDesc"> Ward Description:</label>
                <Input
                  placeholder="Ward Description"
                  name="wardDesc"
                  id="wardDesc"
                  value={inputs.wardDesc}
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
                  <th>Ward ID </th>
                  <th>Ward Type </th>
                  <th>Ward Rates</th>
                  <th>Ward Description</th>
                </tr>
              </thead>
              <tbody>
                {wardsDetails.map((ward, index) => {
                  return (
                    <tr
                      onClick={(e) => handleUpdateInfos(ward)}
                      className={
                        !addOnSubmit
                          ? "doctor-infos select-serviceID"
                          : "doctor-infos"
                      }
                      key={index}
                    >
                      <td>{ward.wardID}</td>
                      <td>{ward.wardType}</td>
                      <td>{ward.wardRates}</td>
                      <td>{ward.wardDesc}</td>
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
                onClick={handleAddWardDetails}
              />

              <ButtonAction
                iconName="close"
                btnName="Cancel"
                color="red"
                buttonType="button"
                onClick={handleClose}
              />
            </div>
          </div>

          {/* The popup to delete */}
          {showPopupDelete && (
            <div style={{ position: "relative" }}>
              <div className="schedule-delete-popup">
                <p>
                  Do you really want to delete <br />
                  the ward with ID of {inputs.wardID} ?
                </p>
                <div className="delete-buttons">
                  <button onClick={handleClosePopup}> Cancel</button>
                  <button onClick={() => handleDeleteWard(id)}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WardMoreDetails;
