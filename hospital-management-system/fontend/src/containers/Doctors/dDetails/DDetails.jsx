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
          <div className="details-title">
            <h4> Personal Detail</h4>
            <div className="divider" />
          </div>
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
                  rows="5"
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
        <div className="details-section-three-global">
          <div className="details-title">
            <h4>Employees Details</h4>
            <div className="divider" />
          </div>
          <div className="details-section-three">
            <div className="container-one">
              <div className="input-field">
                <label form="PermanentDoctor"> Doctor Type</label>
                <select className="dropdown" name="PermanentDoctor" id="">
                  <option value="Visiting Doctor">Visiting Doctor</option>
                  <option value="Permanent Doctor">Permanent Doctor</option>
                </select>
              </div>
              <div className="input-field">
                <label form="doctorAddress"> Notes:</label>
                <textarea
                  name="doctorAddress"
                  id=""
                  cols="32"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div className="container-two">
              <div className="input-field">
                <label form="VisitingCharge"> Visiting Charge:</label>
                <Input placeholder="Visiting Charge" name="VisitingCharge" />
              </div>
              <div className="input-field">
                <label form="ChannelingCharge"> Channeling Charge:</label>
                <Input
                  placeholder="Channeling Charge:"
                  name="ChannelingCharge"
                />
              </div>
              <div className="input-field">
                <label form="basicSalary"> Basic salary:</label>
                <Input placeholder="Basic salary" name="basicSalary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DDetails;
