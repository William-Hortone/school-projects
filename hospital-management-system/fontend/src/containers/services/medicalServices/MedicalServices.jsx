import React, { useState } from "react";
import { Input, TextArea } from "../../../components";
import "./medicalServices.css";

const MedicalServices = () => {
  const [input, setInput] = useState({
    serviceId: "",
    serviceName: "",
    amount: "",
    duration: "",
    additionalNotes: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(input);
  };
  return (
    <div className="app__medicalServices">
      <div className="app__medicalServices-container">
        <h1>Medical Services</h1>
        <div className="container-field">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label form="serviceId"> Service ID:</label>
              <Input
                placeholder="Service ID"
                name="serviceId"
                value={input.serviceId}
                handleOnChange={handleOnChange}
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicalServices;
