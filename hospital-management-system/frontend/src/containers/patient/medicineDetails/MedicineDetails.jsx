import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction, ButtonSkip, Input } from "../../../components";

const MedicineDetails = ({ addOnSubmit, openScheduleDelete, setOpenPage }) => {
  const [inputs, setInputs] = useState({
    productID: "",
    productName: "",
    supplierID: "",
    categoryID: "",
    unitPrice: "",
    unitInStock: "",
    reorderLevel: "",
  });

  const [allDOctors, setAllDOctors] = useState([]);
  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allMedicineCat, setAllMedicineCat] = useState([]);
  const [allMedicine, setAllMedicine] = useState([]);
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [pickedTime, setPickedTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  // To Get all the available Treatments
  const API_URL = "http://localhost:3001/getMedicineCat";
  const API_URL_MEDICINE = "http://localhost:3001/getMedicine";
  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";
  const API_URL_PATIENTS = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_SUPPLIERS = "http://localhost:3001/getSupplierDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllMedicineCat(data);
  };
  const fetchDoctorsData = async () => {
    const { data } = await axios.get(API_URL_DOCTORS);
    setAllDOctors(data);
  };
  const fetchDataOPatients = async () => {
    const { data } = await axios.get(API_URL_PATIENTS);
    setAllOutPatients(data);
  };
  const fetchDataSuppliers = async () => {
    const { data } = await axios.get(API_URL_SUPPLIERS);
    setAllSuppliers(data);
  };
  const fetchDataMedicine = async () => {
    const { data } = await axios.get(API_URL_MEDICINE);
    setAllMedicine(data);
  };

  useEffect(() => {
    fetchData();
    fetchDoctorsData();
    fetchDataSuppliers();
    fetchDataOPatients();
    fetchDataMedicine();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setId(inputs.treatmentId);
  }, [inputs.treatmentId]);

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

  //   Function to generate a new  ID
  const handleAddATreatment = () => {
    if (addOnSubmit) {
      // Initialize the Id if the array is empty
      if (allMedicine.length === 0) {
        setInputs({
          ...inputs,
          productID: "Medicine_001",
        });
      } else {
        // Get the last Id and increment it
        const lastElementId = allMedicine[allMedicine.length - 1].productID;
        const numericPart = parseInt(lastElementId.split("_")[1]);
        const nextElementId = `Medicine_${(numericPart + 1)
          .toString()
          .padStart(3, "0")}`;
        setInputs({
          ...inputs,
          productID: nextElementId,
        });
      }
    } else {
      toast.error("Please Enter a Id manually to update");
    }
  };

  // The function to add Medicine Cat details
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/addMedicine", inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Added successfully");
        }
      })
      .catch((err) => toast.error(err));
  };

  // function to Edit a Out patient treatment details
  const handleSubmitEditInfos = (e, ID) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editOutPTreatment/${ID}`, inputs)
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

  const handleClose = () => {
    setOpenPage(false);
  };

  // Automatically fill the form when click on one element of the table
  const handleUpdateInfos = (treatment) => {
    if (!addOnSubmit) {
      setInputs({
        treatmentId: treatment.treatmentId,
        patientId: treatment.patientId,
        doctorId: treatment.doctorId,
        prescription: treatment.prescription,
        description: treatment.description,
      });
      setSelectedDate(treatment.date);
      setSelectedTime(treatment.time);
      // setDisabledInput(true);
    }
  };

  const handleDelete = () => {
    if (id === undefined || id === "") {
      toast.error("Please provide a out patient ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // Function to Delete an Out patient
  const handleDeleteAppointment = (id) => {
    if (id === undefined || id === "") {
      toast.error("Please provide a out patient treatment ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteOutPTreatment/${id}`)
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
      // handleRefresh();
    }
    setShowPopupDelete(false);
  };

  return (
    <div className="app-container">
      <h2 className="page-title">MEDICINE DETAILS</h2>
      <div className="appScheduling-container">
        <div className="details-title">
          <h4>Medicine C infos</h4>
          <div className="divider" />
        </div>
        <form
          onSubmit={
            addOnSubmit ? handleSubmit : (e) => handleSubmitEditInfos(e, id)
          }
        >
          <div className="container-display-infos">
            <div className="container-wrapper">
              <div className="input-field">
                <label form="schedulingId">Product ID:</label>
                <Input
                  inputDisabled="true"
                  placeholder="Product ID"
                  handleOnChange={handleOnChange}
                  name="productID"
                  value={inputs.productID}
                />
              </div>
              <div className="input-field">
                <label form="schedulingId">Product Name:</label>
                <Input
                  //   inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="Product Name"
                  name="productName"
                  value={inputs.productName}
                />
              </div>
              <div className="input-field doctor-types">
                <label htmlFor="gender"> Supplier ID :</label>
                <div>
                  <select
                    name="supplierID"
                    id="supplierID"
                    value={inputs.supplierID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a Supplier
                    </option>
                    {allSuppliers.map((supplier, index) => (
                      <option key={index} value={supplier.supplierID}>
                        {supplier.supplierID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-field doctor-types">
                <label htmlFor="gender"> Category ID :</label>
                <div>
                  <select
                    name="categoryID"
                    id="categoryID"
                    value={inputs.categoryID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a category
                    </option>
                    {allMedicineCat.map((category, index) => (
                      <option key={index} value={category.categoryID}>
                        {category.categoryID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-field">
                <label form="schedulingId">UnitPrice :</label>
                <Input
                  //   inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="UnitPrice "
                  name="unitPrice"
                  value={inputs.unitPrice}
                />
              </div>
              <div className="input-field">
                <label form="schedulingId">UnitInStock :</label>
                <Input
                  //   inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="UnitInStock "
                  name="unitInStock"
                  value={inputs.unitInStock}
                />
              </div>
              <div className="input-field">
                <label form="schedulingId">ReorderLevel :</label>
                <Input
                  //   inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="ReorderLevel "
                  name="reorderLevel"
                  value={inputs.reorderLevel}
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

            {/* <div className="container-wrapper">
              <div className="input-field">
                <label htmlFor="gender"> Date:</label>
                <div
                  className="custom-input-field"
                  style={{ marginRight: "0" }}
                >
                  <DatePicker
                    value={selectedDate}
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
                    value={selectedTime}
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
            </div> */}
          </div>
        </form>
      </div>

      {/* <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Treatment ID </th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Prescription</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {allMedicineCat.map((treatment, index) => {
              return (
                <tr
                  onClick={(e) => handleUpdateInfos(treatment)}
                  className={
                    !addOnSubmit
                      ? "doctor-infos select-doctorID"
                      : "doctor-infos"
                  }
                  key={index}
                >
                  <td>{treatment.treatmentId}</td>
                  <td>{treatment.patientId}</td>
                  <td>{treatment.doctorId}</td>
                  <td>{treatment.date}</td>
                  <td>{treatment.time}</td>
                  <td>{treatment.prescription}</td>
                  <td>{treatment.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}

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

      {/* Delete popup */}
      {showPopupDelete && (
        <div style={{ position: "relative" }}>
          <div className="schedule-delete-popup">
            <p>
              Do you really want to delete <br />
              the Out Patient treatment with ID of {inputs.treatmentId} ?
            </p>
            <div className="delete-buttons">
              <button onClick={handleClosePopup}> Cancel</button>
              <button onClick={() => handleDeleteAppointment(id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineDetails;
