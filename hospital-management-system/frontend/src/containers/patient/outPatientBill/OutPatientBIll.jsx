import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ButtonAction, ButtonSkip, Input } from "../../../components";
import { useNavigate } from "react-router-dom";

const OutPatientBill = ({ addOnSubmit, openScheduleDelete, setOpenPage }) => {
  const [inputs, setInputs] = useState({
    billID: "",
    patientID: "",
    treatmentID: "",
    consultationFeel: 25,
    productID: "",
    amount: 0,
    discount: 0,
    totalAmount: "",
    selectedProduct: "",
  });

  const [allDOctors, setAllDOctors] = useState([]);
  const [allOutPatients, setAllOutPatients] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [selectedWards, setSelectedWards] = useState("");

  const [allSuppliers, setAllSuppliers] = useState([]);
  const [allOPTreatmentFiltered, setAllOPTreatmentFiltered] = useState([]);
  const [allMedicineFiltered, setAllMedicineFiltered] = useState([]);
  const [allMedicineCat, setAllMedicineCat] = useState([]);
  const [allMedicine, setAllMedicine] = useState([]);
  const [allPurchaseOrder, setAllPurchaseOrder] = useState([]);
  const [allOPTreatments, setAllOPTreatments] = useState([]);
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [pickedTime, setPickedTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [supID, setSupID] = useState("");
  const [thePatientID, setThePatientID] = useState("");
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [selectedProductsArray, setSelectedProductsArray] = useState([]);
  const [productPrices, setProductPrices] = useState({
    paracetamol: 200,
    Doliprane: 100,
  });
  const navigate = useNavigate();
  // To Get all the available Treatments
  const API_URL = "http://localhost:3001/getMedicineCat";
  const API_URL_MEDICINE = "http://localhost:3001/getMedicine";
  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";
  const API_URL_PATIENTS = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_SUPPLIERS = "http://localhost:3001/getSupplierDetails";
  const API_URL_PURChASE = "http://localhost:3001/getPurchaseOrder";
  const API_URL_OPTREATMENT = "http://localhost:3001/getOutPTreatment";

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
  const fetchDataPurchaseO = async () => {
    const { data } = await axios.get(API_URL_PURChASE);
    setAllPurchaseOrder(data);
  };
  const fetchDataOutPTreatment = async () => {
    const { data } = await axios.get(API_URL_OPTREATMENT);
    setAllOPTreatments(data);
  };

  useEffect(() => {
    fetchData();
    fetchDoctorsData();
    fetchDataSuppliers();
    fetchDataOPatients();
    fetchDataMedicine();
    fetchDataPurchaseO();
    fetchDataOutPTreatment();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleOnSelectMedicine = (e) => {
    const newValue = e.target.value;
    // To update the selectedProduct value
    setInputs((prevInputs) => ({
      ...prevInputs,
      selectedProduct:
        e.target.value +
        (prevInputs.selectedProduct ? "," : "") +
        prevInputs.selectedProduct,
    }));

    setSelectedProductsArray((prevArray) => [...prevArray, newValue]);
  };

  //   useEffect(() => {
  //     setId(inputs.treatmentId);
  //   }, [inputs.treatmentId]);

  useEffect(() => {
    console.log("lets try iselectedProductsArray ", selectedProductsArray);
  }, [selectedProductsArray]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;

      selectedProductsArray.forEach((product) => {
        // Check if the product exists in the productPrices object
        if (productPrices.hasOwnProperty(product)) {
          totalPrice += productPrices[product];
        }
      });

      return totalPrice;
    };
    const total = calculateTotalPrice();

    setInputs((prev) => ({
      ...prev,
      amount: total,
    }));
    console.log("Total Price:", total);
  }, [selectedProductsArray, productPrices]);

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
  //   const handleAddATreatment = () => {
  //     if (addOnSubmit) {
  //       // Initialize the Id if the array is empty
  //       if (allMedicine.length === 0) {
  //         setInputs({
  //           ...inputs,
  //           productID: "Medicine_001",
  //         });
  //       } else {
  //         // Get the last Id and increment it
  //         const lastElementId = allMedicine[allMedicine.length - 1].productID;
  //         const numericPart = parseInt(lastElementId.split("_")[1]);
  //         const nextElementId = `Medicine_${(numericPart + 1)
  //           .toString()
  //           .padStart(3, "0")}`;
  //         setInputs({
  //           ...inputs,
  //           productID: nextElementId,
  //         });
  //       }
  //     } else {
  //       toast.error("Please Enter a Id manually to update");
  //     }
  //   };

  const handleAddATreatment = () => {
    navigate("/vizAllPurchaseO");
  };

  // The function to add Medicine Cat details
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/addPurchaseOrder", inputs)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Added successfully");
        }
      })
      .catch((err) => toast.error(err));
  };

  // function to Edit a Out patient treatment details
  //   const handleSubmitEditInfos = (e, ID) => {
  //     e.preventDefault();

  //     axios
  //       .put(`http://localhost:3001/editOutPTreatment/${ID}`, inputs)
  //       .then((res) => {
  //         if (res.data === "success") {
  //           toast.success("Updated successfully");
  //         } else if (res.data === "notfound") {
  //           toast.error("Wrong ID");
  //         } else {
  //           toast.error("An error occurred while updating ");
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error(err);
  //       });
  //   };

  const handleClose = () => {
    setOpenPage(false);
  };

  // Automatically fill the form when click on one element of the table
  //   const handleUpdateInfos = (treatment) => {
  //     if (!addOnSubmit) {
  //       setInputs({
  //         treatmentId: treatment.treatmentId,
  //         patientId: treatment.patientId,
  //         doctorId: treatment.doctorId,
  //         prescription: treatment.prescription,
  //         description: treatment.description,
  //       });
  //       setSelectedDate(treatment.date);
  //       setSelectedTime(treatment.time);
  //       // setDisabledInput(true);
  //     }
  //   };

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

  // =========================== //

  useEffect(() => {
    setSupID(inputs.patientID);
  }, [inputs.patientID, supID]);

  useEffect(() => {
    setThePatientID(inputs.patientID);
  }, [inputs.patientID, thePatientID]);

  useEffect(() => {
    console.log("the last inpuuuuuu", inputs);
  }, [inputs]);

  // To filter the Out patients treatments according to the out patient  selected
  useEffect(() => {
    if (thePatientID) {
      const handleFilter = (id) => {
        const result = allOPTreatments.filter(
          (treatment) => treatment.patientId === id
        );
        console.log("the patient is", result);
        if (result.length === 0) {
          toast.error("This patient does not have any treatment");
          setInputs((prev) => ({
            ...prev,
            treatmentID: "",
          }));
        } else {
          setAllOPTreatmentFiltered(result);
        }
      };
      handleFilter(thePatientID);
    }
  }, [thePatientID, allOPTreatments]);

  // Assign the values according to the out patient selected selected
  useEffect(() => {
    if (allOPTreatmentFiltered.length > 0) {
      setInputs((prev) => ({
        ...prev,
        treatmentID:
          allOPTreatmentFiltered[allOPTreatmentFiltered.length - 1].treatmentId,
      }));
    }
  }, [allOPTreatmentFiltered]);

  // To filter the Product according to the Product selected
  //   useEffect(() => {
  //     const handleFilter = (id) => {
  //       const result = allMedicine.filter(
  //         (medicine) => medicine.productID === id
  //       );
  //       setAllMedicineFiltered(result);
  //     };

  //     handleFilter(thePatientID);
  //   }, [thePatientID, allMedicine]);

  // useEffect(() => {
  //   setInputs((prev) => ({
  //     ...prev,
  //     totalAmount: prev.amount + prev.consultationFeel - prev.discount,
  //   }));
  // }, []);

  useEffect(() => {
    const calculateBill = () => {
      // if(selectedPlace === "needMedicine"){
      let total;

      if (selectedPlace === "noNeed") {
        total = 25;
      } else if (selectedPlace === "needMedicine") {
        const amount = parseInt(inputs.amount);
        const discount = parseInt(inputs.discount);

        if (isNaN(amount) || amount < 0 || isNaN(discount) || discount < 0) {
          toast.error("Please enter valid values");
          return;
        } else {
          total = amount + 25 - discount;
          console.log("the totale bill is", total);
          setInputs((prev) => ({
            ...prev,
            totalAmount: total,
          }));
        }
      }
      // const amount = parseInt(inputs.amount);

      // const totalBill =  25 - discount;
      // const perPersonShare = totalBill / numberOfPeople;
    };
    calculateBill();
  }, [inputs.amount, inputs.discount, selectedPlace]);

  // useEffect(() => {
  //   setInputs((prev) => ({
  //     ...prev,
  //     totalAmount: prev.amount + prev.consultationFeel - prev.discount,
  //   }));
  // }, []);

  const handleSelectPlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  return (
    <div className="app-container" style={{ minWidth: "80vw" }}>
      <h2 className="page-title">OUT PATIENT BILL</h2>
      <div className="appScheduling-container">
        <div className="details-title">
          <h4>Bill infos</h4>
          <div className="divider" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="container-display-infos">
            <div className="container-wrapper">
              {/* <div className="input-field">
                <label form="schedulingId">Bill ID:</label>
                <Input
                  //   inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="Bill ID"
                  name="billID"
                  value={inputs.billID}
                />
              </div> */}
              <div className="input-field doctor-types">
                <label htmlFor="gender"> Patient ID:</label>
                <div>
                  <select
                    name="patientID"
                    id="patientID"
                    value={inputs.patientID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a Patient
                    </option>
                    {allOutPatients.map((patient, index) => (
                      <option key={index} value={patient.patientID}>
                        {patient.patientID}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-field">
                <label form="schedulingId">Treatment ID :</label>
                <Input
                  inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="Treatment ID "
                  name="treatmentID "
                  value={inputs.treatmentID}
                />
              </div>
              <div className="input-field">
                <label form="schedulingId">Consultation feels:</label>
                <Input
                  inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="Consultation feels"
                  name="consultationFeel"
                  value={inputs.consultationFeel}
                />
              </div>
              {selectedPlace === "needMedicine" && (
                <div className="input-field">
                  <label htmlFor="selectedProduct">Selected Products:</label>
                  <textarea
                    name="selectedProduct"
                    // onChange={(e) => setInputs({ ...inputs, selectedProduct: e.target.value })}
                    onChange={handleOnChange}
                    value={inputs.selectedProduct}
                    id="selectedProduct"
                    placeholder="Selected Medicine"
                    cols="39"
                    rows="10"
                  ></textarea>
                </div>
              )}

              {/* <div className="input-field doctor-types">
                <label htmlFor="gender"> Product ID :</label>
                <div>
                  <select
                    name="productID"
                    id="productID"
                    value={inputs.productID}
                    onChange={handleOnChange}
                    required
                  >
                    <option required value="">
                      Select a Product
                    </option>
                    {allMedicine.map((category, index) => (
                      <option key={index} value={category.productID}>
                        {category.productID}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}
              {!openScheduleDelete && (
                <button type="submit" className="submit-btn">
                  Ready to Pay
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

            <div className="container-wrapper">
              <aside style={{ width: "90%" }}>
                {/* To select to buy medicine or not*/}
                <div className="box-input-radio" style={{ marginTop: 10 }}>
                  <input
                    type="radio"
                    id="noNeed"
                    name="noNeed"
                    value="noNeed"
                    checked={selectedPlace === "noNeed"}
                    // onChange={handleSelectPlaceChange}
                    onChange={(e) => {
                      setSelectedPlace(e.target.value);
                      // Appel de handleOnChange pour mettre à jour le textarea
                      handleOnChange(e);
                    }}
                    className="input-radio"
                  />
                  <label htmlFor="noNeed">No need to buy medicine </label>
                </div>

                <div className="box-input-radio" style={{ marginTop: 10 }}>
                  <input
                    type="radio"
                    id="contactChoice2"
                    name="needMedicine"
                    value="needMedicine"
                    checked={selectedPlace === "needMedicine"}
                    onChange={handleSelectPlaceChange}
                    className="input-radio"
                  />
                  <label htmlFor="needMedicine">Need to buy medicine</label>
                </div>

                {/* Display for select a room*/}
                {/* {selectedPlace === "noNeed" && (
                <div
                  className="aside-option-box"
                  style={{ marginTop: 10, marginLeft: 140 }}
                >
                  <label htmlFor="rooms"> Rooms</label>
                  <div className="option-wrapper" style={{ width: "68%" }}>
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
              )} */}

                {/* Display for select a ward*/}
                {selectedPlace === "needMedicine" && (
                  <div
                    className="aside-option-box"
                    style={{ marginTop: 10, marginLeft: 200 }}
                  >
                    <label htmlFor="medicine"> Medicine</label>
                    <div className="option-wrapper" style={{ maxWidth: "67%" }}>
                      <select
                        name="medicine"
                        id="medicine"
                        value={selectedWards}
                        onChange={(e) => {
                          setSelectedWards(e.target.value);
                          handleOnSelectMedicine(e);
                        }}
                        required
                      >
                        <option required value="">
                          Select a Medicine
                        </option>
                        {allMedicine.map((medicine, index) => (
                          <option key={index} value={medicine.productName}>
                            {medicine.productName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </aside>

              {selectedPlace === "needMedicine" && (
                <div className="input-field">
                  <label form="schedulingId">Amount:</label>

                  <Input
                    inputDisabled="true"
                    handleOnChange={handleOnChange}
                    placeholder="Amount"
                    name="amount"
                    value={inputs.amount}
                  />
                </div>
              )}
              <div className="input-field">
                <label form="schedulingId">Discount :</label>
                <Input
                  //   inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="Discount "
                  name="discount"
                  value={inputs.discount}
                />
              </div>

              <div className="input-field">
                <label form="schedulingId">Total Amount:</label>
                <Input
                  inputDisabled="true"
                  handleOnChange={handleOnChange}
                  placeholder="Total Amount"
                  name="totalAmount"
                  value={inputs.totalAmount}
                />
              </div>
            </div>
          </div>
        </form>
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
            iconName="all"
            btnName="View All"
            color="blue"
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

export default OutPatientBill;
