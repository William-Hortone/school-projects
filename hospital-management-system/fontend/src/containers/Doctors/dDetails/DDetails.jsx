import React from "react";
import "./dDetails.css";
import { Input } from "../../../components";

const DDetails = () => {
  return (
    <div className="app__dDetails">
      <h1>Doctor Details</h1>
      <div className="app__dDetails-container">
        <div className="details-section-one">
          <label form="doctorID"> Doctor ID:</label>
          <Input placeholder="Doctor ID" name="doctorID" />
        </div>
        <div className="details-section-two">
          <h4>
            Personal Details <span />
          </h4>
          <div className="section-two-content">
            <div className="container-one">
              <div className="input-field">
                <label form="doctorFN"> First name:</label>
                <Input placeholder="First name" name="doctorFN" />
              </div>
              <div className="input-field">
                <label form="doctorSex"> Sex</label>
                <select className="dropdown" name="doctorSex" id="">
                  <option value="">M</option>
                  <option value="">F</option>
                </select>
              </div>
              <div className="input-field">
                <label form="nicNo"> NIC NO:</label>
                <Input placeholder="Nic no" name="nicNo" />
              </div>
              <div className="input-field">
                <label form="doctorAddress"> Address:</label>
                <textarea
                  name="doctorAddress"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <div className="container-two">
              <div className="input-field">
                <label form="doctorLN"> Last name:</label>
                <Input placeholder="Last name" name="doctorLN" />
              </div>
              <div className="input-field">
                <label form="homePhone"> Home Phone:</label>
                <Input placeholder="Home phone" name="homePhone" />
              </div>
              <div className="input-field">
                <label form="mobilePhone"> Mobile Phone:</label>
                <Input placeholder="Mobile phone" name="mobilePhone" />
              </div>
              <div className="input-field">
                <label form="Qualifications"> Qualifications:</label>
                <Input placeholder="Qualifications" name="Qualifications" />
              </div>
              <div className="input-field">
                <label form="Specialization"> Specialization:</label>
                <Input placeholder="Specialization" name="Specialization" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DDetails;
