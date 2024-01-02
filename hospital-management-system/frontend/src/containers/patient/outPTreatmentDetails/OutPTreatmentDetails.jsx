import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDocAppointment } from "../../../redux/slice/doctorSlice";
import { Input, ButtonAction, ButtonSkip } from "../../../components";
import { BedMoreDetails } from "../..";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./outPTreatmentD.css";
import { toast } from "react-toastify";

const OutPTreatmentDetails = ({
  setOpenScheduling,
  addOnSubmit,
  setOpenScheduleDelete,
  openScheduleDelete,
  setOpenPage,
}) => {
  const [inputs, setInputs] = useState({
    treatmentId: "",
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    prescription: "",
    description: "",
  });

  const [allDOctors, setAllDOctors] = useState([]);
  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allOutPTreatment, setAllOutPTreatment] = useState([]);
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [pickedTime, setPickedTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  // To Get all the available beds
  // const API_URL = "http://localhost:3001/getOutPTreatment";
  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";
  const API_URL_PATIENTS = "http://localhost:3001/getOutPatientsDetails";

  // const fetchData = async () => {
  //   const { data } = await axios.get(API_URL);
  //   setAllBeds(data);
  // };
  const fetchDoctorsData = async () => {
    const { data } = await axios.get(API_URL_DOCTORS);
    setAllDOctors(data);
  };
  const fetchDataOPatients = async () => {
    const { data } = await axios.get(API_URL_PATIENTS);
    setAllOutPatients(data);
  };

  useEffect(() => {
    fetchDoctorsData();
    fetchDataOPatients();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //  Set the format for the Date
  useEffect(() => {
    const handleFilterDate = () => {
      if (startDate) {
        const result = startDate.toString();
        const formattedDate = result.slice(0, 15);
        setSelectedDate(formattedDate);
      }
    };
    handleFilterDate();
  }, [startDate]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      date: selectedDate,
    }));
  }, [selectedDate]);

  //  Set the format for the time
  useEffect(() => {
    if (pickedTime) {
      const formattedTime = pickedTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setSelectedTime(formattedTime);
    }
  }, [pickedTime]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      time: selectedTime,
    }));
  }, [selectedTime]);

  //   Function to add user  a new roo ID
  const handleAddATreatment = () => {
    if (addOnSubmit) {
      // Initialize the Id if the array is empty
      if (allOutPTreatment.length === 0) {
        setInputs({
          ...inputs,
          treatmentId: "OPT_001",
        });
      } else {
        // Get the last Id and increment it
        const lastElementId =
          allOutPTreatment[allOutPTreatment.length - 1].treatmentId;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextElementId = `OPT_${(numericPart + 1)
          .toString()
          .padStart(3, "0")}`;
        setInputs({
          ...inputs,
          treatmentId: nextElementId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // The function to add a User details
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("inputs", inputs);
    axios
      .post("http://localhost:3001/addOutPTreatment", inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Added successfully");
        }
      })
      .catch((err) => toast.error(err));
  };

  // function to Edit a Out patient treatment details
  const handleSubmitEditRoom = (e, userId) => {
    e.preventDefault();

    // axios
    //   .put(`http://localhost:3001/editUserDetails/${userId}`, inputs)
    //   .then((res) => {
    //     if (res.data === "success") {
    //       toast.success("Room updated successfully");
    //     } else if (res.data === "notfound") {
    //       toast.error("Wrong ID");
    //     } else {
    //       toast.error("An error occurred while updating the user");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
  };

  const handleClose = () => {
    setOpenPage(false);
  };

  return (
    <div className="app-container">
      <h2 className="page-title">OUT PATIENT TREATMENTS DETAILS</h2>
      <div className="appScheduling-container">
        <div className="details-title">
          <h4>Treatment infos</h4>
          <div className="divider" />
        </div>
        <form
          onSubmit={
            addOnSubmit ? handleSubmit : (e) => handleSubmitEditRoom(e, id)
          }
        >
          <div className="container-display-infos">
            <div className="container-wrapper">
              <div className="input-field">
                <label form="schedulingId">Treatment ID:</label>
                <Input
                  inputDisabled="true"
                  placeholder="Treatment ID"
                  name="treatmentId"
                  value={inputs.treatmentId}
                />
              </div>

              <div className="input-field doctor-types">
                <label htmlFor="patientId"> Patient ID :</label>
                <div>
                  <select
                    name="patientId"
                    id="patientId"
                    value={inputs.patientId}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a patient ID
                    </option>
                    {allOutPatients.map((patient, index) => (
                      <option key={index} value={patient.patientID}>
                        {patient.patientID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-field doctor-types">
                <label htmlFor="wardRates"> Doctor ID :</label>
                <div>
                  <select
                    name="doctorId"
                    id="wardRates"
                    value={inputs.doctorId}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a doctor ID
                    </option>
                    {allDOctors.map((doctor, index) => (
                      <option key={index} value={doctor.doctorID}>
                        {doctor.doctorID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-field">
                <label htmlFor="prescription">Prescription :</label>
                <textarea
                  placeholder="Prescription"
                  name="prescription"
                  id="prescription"
                  cols="39"
                  rows="10"
                  value={inputs.prescription}
                  onChange={handleOnChange}
                  // disabled
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>

            <div className="container-wrapper">
              <div className="input-field">
                <label htmlFor="gender"> Date:</label>
                <div
                  className="custom-input-field"
                  style={{ marginRight: "0" }}
                >
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="EEE MMM dd yyyy"
                    showYearDropdown
                    scrollableMonthYearDropdowns
                    minDate={new Date()}
                  />
                </div>
              </div>

              <div className="input-field">
                <label htmlFor="gender"> Time:</label>
                <div
                  className="custom-input-field"
                  style={{ marginRight: "0" }}
                >
                  <DatePicker
                    selected={pickedTime}
                    onChange={(time) => setPickedTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={10}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="Description">Description :</label>
                <textarea
                  placeholder="Description"
                  name="description"
                  id="description"
                  cols="39"
                  rows="10"
                  onChange={handleOnChange}
                  value={inputs.description}
                  // disabled
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>

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
            {/* {allBeds.map((bed, index) => {
              return (
                <tr className="doctor-infos" key={index}>
                  <td>{bed.bedID}</td>
                  <td>{bed.bedPlace}</td>
                  <td>{bed.bedDesc}</td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>

      {/* Container buttons */}
      <div className="appScheduling-container-menus">
        <div className="appSchedule-container-menu-header">
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
            onClick={handleAddATreatment}
          />
          <ButtonAction
            iconName="close"
            btnName="Close"
            color="red"
            buttonType="button"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default OutPTreatmentDetails;
