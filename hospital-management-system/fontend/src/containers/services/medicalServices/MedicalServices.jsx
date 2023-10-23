import React, { useRef, useState } from "react";
import { ButtonAction, ButtonSkip, Input, TextArea } from "../../../components";
import "./medicalServices.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MedicalServices = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [input, setInput] = useState({
    serviceName: "",
    amount: "",
    duration: "",
    additionalNotes: "",
  });
  const [inputRefreshed, setInputRefreshed] = useState({
    serviceName: "",
    amount: "",
    duration: "",
    additionalNotes: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/medicalServices", input)
      .then((res) => {
        toast.success("Saved Successfully");
        console.log(res);
      })
      .catch((err) => toast.error(err));
  };
  const handleAddMedicalServices = () => {
    setShowBtn(true);
  };
  const handleRefresh = () => {
    setShowBtn(false);
    setInput(inputRefreshed);
  };
  const handleClose = () => {
    setShowBtn(false);
    navigate("/");
  };
  const handleViewAllMedicalS = () => {
    setShowBtn(false);
    navigate("/vHospital");
  };
  // console.log(serviceId);

  const handleDelete = (serviceId) => {
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
  };
  const handleEdit = (serviceId) => {
    axios
      .delete(`http://localhost:3001/editService/${serviceId}`, input)
      .then((res) => {
        // if (res.data === "success") {
        //   toast.success("Updated Successfully");
        // }
        // if (res.data === "not found") {
        //   toast.error("Service not found");
        // }
        toast.success("Service updated");
        console.log(res.data);
        console.log("the response", res);
      })
      .catch((error) => {
        toast.error(error);
      });
    handleSubmit();
  };

  return (
    <div className="app__medicalServices">
      <div className="app__medicalServices-container">
        <h1>Medical Services</h1>
        <div className="container-field">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label form="serviceId"> Service ID:</label>
              <input
                placeholder="Service ID"
                name="serviceId"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
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
            {showBtn && <button type="submit">Submit</button>}
          </form>
        </div>

        <div className="container-menu">
          <div className="container-menu-header">
            <ButtonSkip iconName="doubleLeft" color="green" />
            <ButtonSkip iconName="arrowLeft" color="blue" />
            <input
              type="text"
              placeholder="Record No"
              onChange=""
              value="Record: 10"
            />
            <ButtonSkip iconName="arrowRight" color="blue" />
            <ButtonSkip iconName="doubleRight" color="green" />
          </div>
          <div className="container-menu-btn">
            <ButtonAction
              iconName="add"
              btnName="Add"
              color="green"
              onClick={handleAddMedicalServices}
            />
            <ButtonAction
              iconName="edit"
              btnName="Edit"
              color="green"
              onClick={() => handleEdit(serviceId)}
            />
            <ButtonAction
              iconName="delete"
              btnName="Delete"
              color="red"
              onClick={(e) => handleDelete(serviceId)}
            />
            <ButtonAction
              iconName="refresh"
              btnName="Refresh"
              color="blue"
              onClick={handleRefresh}
            />
            <ButtonAction
              iconName="all"
              btnName="View All"
              color="blue"
              onClick={handleViewAllMedicalS}
            />
            <ButtonAction
              iconName="close"
              btnName="Close"
              color="red"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalServices;
