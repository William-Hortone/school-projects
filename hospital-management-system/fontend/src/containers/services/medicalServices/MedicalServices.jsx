import React, { useEffect, useState } from "react";
import {
  ButtonAction,
  ButtonSkip,
  Header,
  Input,
  TextArea,
} from "../../../components";
import "./medicalServices.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMedicalService } from "../../../redux/slice/medicalServiceSlice";

const MedicalServices = () => {
  const [addMedical, setAddMedical] = useState(true);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [isInputEnabled, setInputEnabled] = useState(true);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [input, setInput] = useState({
    serviceID: "",
    serviceName: "",
    amount: "",
    duration: "",
    additionalNotes: "",
  });
  const navigate = useNavigate();
  const medicalServiceInfos = useSelector(selectMedicalService);

  useEffect(() => {
    setServiceId(input.serviceID);
  }, [medicalServiceInfos, input]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // function to add generate the ID and to Increment it
  const handleAddMedicalS = () => {
    if (medicalServiceInfos.length === 0) {
      setInput({
        ...input,
        serviceID: "service_001",
      });
    } else {
      const lastMServiceID =
        medicalServiceInfos[medicalServiceInfos.length - 1].serviceID;
      const numericPart = parseInt(lastMServiceID.split("_")[1]);
      const nextMServiceID = `service_${(numericPart + 1)
        .toString()
        .padStart(3, "0")}`;
      setInput({
        ...input,
        serviceID: nextMServiceID,
      });
    }
    setShowSubmitBtn(true);
    setAddMedical(true);
    setInputEnabled(false);
  };

  // function to add medical service
  const handleSubmitAddMedicalS = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/medicalServices", input)
      .then(() => {
        toast.success("Saved Successfully");
      })
      .catch((err) => toast.error(err));
    setAddMedical(true);
    setShowSubmitBtn(false);
  };

  const HandleEditMedicalS = () => {
    setShowSubmitBtn(true);
    setAddMedical(false);
  };

  // function to Edit medical service
  const handleSubmitEditServices = (e, serviceId) => {
    e.preventDefault();

    if (serviceId === undefined || serviceId === "") {
      toast.error("Please add a correct ID");
    } else {
      axios
        .put(`http://localhost:3001/editService/${serviceId}`, input)
        .then((res) => {
          if (res.data === "success") {
            toast.success("Service updated successfully");
          } else if (res.data === "notfound") {
            toast.error("Incorrect service ID");
          } else {
            toast.error("An error occurred while updating the service");
          }
        })
        .catch((err) => {
          toast.error(err);
        });
      setAddMedical(false);
    }
  };

  const handleOpenDeletePopup = () => {
    if (serviceId === undefined || serviceId === "") {
      toast.error("Please provide a service ID");
    } else {
      setShowPopupDelete(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // function to delete medical service
  const handleSubmitDeleteDoctor = (serviceId) => {
    if (serviceId === undefined || serviceId === "") {
      toast.error("Please provide a service ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteService/${serviceId}`)
        .then((res) => {
          if (res.data === "success") {
            toast.success("Delete Successfully");
          }
          if (res.data === "not found") {
            toast.error("Service not found");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
    setShowPopupDelete(false);
  };

  const handleRefresh = () => {
    setInput({
      serviceName: "",
      amount: "",
      duration: "",
      additionalNotes: "",
    });
    setShowSubmitBtn(false);
    window.location.reload();
  };

  const handleViewAllMedicalS = () => {
    navigate("/vHospital");
  };

  const handleClose = () => {
    navigate("/adminDashboard");
  };

  return (
    <div className="app__medicalServices">
      <Header />
      <div className="app__medicalServices-container">
        <h1 className="page-title">Medical Services</h1>
        <div className="container-field">
          <form
            onSubmit={
              addMedical
                ? handleSubmitAddMedicalS
                : (e) => handleSubmitEditServices(e, serviceId)
            }
          >
            <div className="input-field">
              <label form="serviceId"> Service ID:</label>
              <div>
                <input
                  placeholder="Service ID"
                  name="serviceID"
                  value={input.serviceID}
                  onChange={handleOnChange}
                  disabled={!isInputEnabled}
                />
              </div>
            </div>
            <div className="input-field">
              <label form="serviceName"> Service name:</label>
              <Input
                placeholder="Service name"
                name="serviceName"
                value={input.serviceName}
                handleOnChange={handleOnChange}
              />
            </div>
            <div className="input-field">
              <label form="Amount"> Amount / Rate:</label>
              <Input
                placeholder="Amount "
                name="amount"
                value={input.amount}
                handleOnChange={handleOnChange}
              />
            </div>
            <div className="input-field">
              <label form="duration"> Duration(min):</label>
              <Input
                placeholder="Duration"
                name="duration"
                value={input.duration}
                handleOnChange={handleOnChange}
              />
            </div>
            <div className="input-field">
              <label form="additionalNotes"> Additional Notes:</label>
              <TextArea
                name="additionalNotes"
                value={input.additionalNotes}
                handleOnChange={handleOnChange}
              />
            </div>
            {showSubmitBtn && (
              <button className="submit-btn" type="submit">
                Submit
              </button>
            )}
          </form>
          {showPopupDelete && (
            <div className="delete-popup">
              <p>
                Do you really want to delete <br />
                the medical service with ID of {input.serviceID} ?
              </p>
              <div className="delete-buttons">
                <button onClick={handleClosePopup}> Cancel</button>
                <button onClick={() => handleSubmitDeleteDoctor(serviceId)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

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
              onClick={handleAddMedicalS}
            />
            <ButtonAction
              iconName="edit"
              btnName="Edit"
              color="green"
              onClick={HandleEditMedicalS}
              buttonType="submit"
            />
            <ButtonAction
              iconName="delete"
              btnName="Delete"
              buttonType="button"
              color="red"
              onClick={handleOpenDeletePopup}
            />
            <ButtonAction
              iconName="refresh"
              btnName="Refresh"
              color="blue"
              buttonType="button"
              onClick={handleRefresh}
            />
            <ButtonAction
              iconName="all"
              btnName="View All"
              color="blue"
              buttonType="button"
              onClick={handleViewAllMedicalS}
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
    </div>
  );
};

export default MedicalServices;
