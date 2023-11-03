import React, { useRef, useState } from "react";
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

  const [serviceId, setServiceId] = useState("");
  const [input, setInput] = useState({
    serviceID: "",
    serviceName: "",
    amount: "",
    duration: "",
    additionalNotes: "",
  });
  const [inputRefreshed, setInputRefreshed] = useState({
    serviceID: "",
    serviceName: "",
    amount: "",
    duration: "",
    additionalNotes: "",
  });
  const navigate = useNavigate();
  const medicalServiceInfos = useSelector(selectMedicalService);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleAddMedicalS = () => {
    setShowSubmitBtn(true);
    console.log(medicalServiceInfos);
    if (medicalServiceInfos.length === 0) {
      setInput({
        ...input,
        serviceID: "001",
      });
    } else {
      const lastMServiceID =
        medicalServiceInfos[medicalServiceInfos.length - 1].serviceID;
      const nextMServiceID = (parseInt(lastMServiceID) + 1)
        .toString()
        .padStart(3, "0");
      setInput({
        ...input,
        serviceID: nextMServiceID,
      });
    }
  };
  const handleSubmitAddMedicalS = (e) => {
    e.preventDefault();

    if (
      input.serviceName === "" ||
      input.amount === "" ||
      input.duration === "" ||
      input.additionalNotes === ""
    ) {
      toast.error("Please complete the fields");
    } else {
      axios
        .post("http://localhost:3001/medicalServices", input)
        .then((res) => {
          toast.success("Saved Successfully");
          console.log(res);
        })
        .catch((err) => toast.error(err));
    }
    setAddMedical(true);
    console.log(input);
  };

  const handleRefresh = () => {
    setInput(inputRefreshed);
  };
  const handleClose = () => {
    navigate("/home");
  };
  const handleViewAllMedicalS = () => {
    navigate("/vHospital");
  };

  const handleDelete = (serviceId) => {
    if (serviceId === undefined || serviceId === "") {
      toast.error("Please provide a service ID");
    } else {
      axios
        .delete(`http://localhost:3001/deleteService/${serviceId}`)
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
  };

  const HandleEditMedicalS = () => {
    setShowSubmitBtn(true);
  };
  const handleSubmitEditServices = (e, serviceId) => {
    e.preventDefault();
    if (serviceId === undefined || serviceId === "") {
      toast.error("Please complete the fields");
    } else {
      axios
        .put(`http://localhost:3001/editService/${serviceId}`, input)
        .then((res) => {
          if (res.data === "success") {
            toast.success("Service updated successfully");
          } else if (res.data === "not found") {
            toast.error("Service not found");
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

  return (
    <div className="app__medicalServices">
      <Header />
      <div className="app__medicalServices-container">
        <h1>Medical Services</h1>
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
              <input
                placeholder="Service ID"
                name="serviceId"
                value={input.serviceID}
                onChange={handleOnChange}
              />
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
              onClick={() => handleDelete(serviceId)}
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
