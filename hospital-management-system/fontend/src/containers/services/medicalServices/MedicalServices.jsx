import React, { useRef, useState } from "react";
import { ButtonAction, ButtonSkip, Input, TextArea } from "../../../components";
import "./medicalServices.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MedicalServices = () => {
  const [showBtn, setShowBtn] = useState(false);
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

  return (
    <div className="app__medicalServices">
      <div className="app__medicalServices-container">
        <h1>Medical Services</h1>
        <div className="container-field">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label form="serviceId"> Service ID:</label>
              <input placeholder="Service ID" name="serviceId" value="" />
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
            <ButtonAction iconName="edit" btnName="Edit" color="green" />
            <ButtonAction iconName="delete" btnName="Delete" color="red" />
            <ButtonAction
              iconName="refresh"
              btnName="Refresh"
              color="blue"
              onClick={handleRefresh}
            />
            <ButtonAction iconName="all" btnName="View All" color="blue" />
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
