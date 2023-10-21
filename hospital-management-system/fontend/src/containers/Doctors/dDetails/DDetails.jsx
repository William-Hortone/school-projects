import React, { useEffect, useRef, useState } from "react";
import "./dDetails.css";
import { Input, Select, TextArea } from "../../../components";
import axios from "axios";
import { toast } from "react-toastify";

const DDetails = ({ showSubmitBtn, refreshForm }) => {
  const form = useRef();
  const [input, setInput] = useState({
    doctorID: "",
    doctorFN: "",
    nicNo: "",
    doctorLN: "",
    homePhone: "",
    mobilePhone: "",
    Qualifications: "",
    Specialization: "",
    VisitingCharge: "",
    ChannelingCharge: "",
    basicSalary: "",
    sex: "",
    doctorType: "",
    doctorAddress: "",
    doctorNotes: "",
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

    axios
      .post("http://localhost:3001/doctor", input)
      .then((res) => {
        console.log("the response from the backend", res.data);
        toast.success("Added Successfully");
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    if (refreshForm) {
      setInput({
        doctorID: "",
        doctorFN: "",
        nicNo: "",
        doctorLN: "",
        homePhone: "",
        mobilePhone: "",
        Qualifications: "",
        Specialization: "",
        VisitingCharge: "",
        ChannelingCharge: "",
        basicSalary: "",
        sex: "",
        doctorType: "",
        doctorAddress: "",
        doctorNotes: "",
      });
    }
  }, [refreshForm]);

  const doctorSexOptions = [
    { value: "Men", label: "M" },
    { value: "Women", label: "F" },
  ];
  const doctorTypeOptions = [
    { value: "Visiting Doctor", label: "Visiting Doctor" },
    { value: "Permanent Doctor", label: "Permanent Doctor" },
  ];

  return (
    <div className="app__dDetails">
      <h1>Doctor Details</h1>
      <form onSubmit={handleSubmit} ref={form}>
        <div className="app__dDetails-container">
          <div className="details-section-one">
            <div className="container-one">
              <div className="input-field">
                <label form="doctorID"> Doctor ID:</label>
                <Input
                  placeholder="Doctor ID"
                  name="doctorID"
                  value={input.doctorID}
                  handleOnChange={handleOnChange}
                />
              </div>
            </div>
            <div className="container-two"></div>
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
                  <Input
                    placeholder="First name"
                    value={input.doctorFN}
                    name="doctorFN"
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="doctorSex"> Sex</label>
                  <Select
                    name="sex"
                    label="sex"
                    value={input.sex ? `${input.sex}` : "Moi meme"}
                    options={doctorSexOptions}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="nicNo"> NIC NO:</label>
                  <Input
                    placeholder="Nic no"
                    name="nicNo"
                    value={input.nicNo}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="doctorAddress"> Address:</label>

                  <TextArea
                    name="doctorAddress"
                    value={input.doctorAddress}
                    handleOnChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="container-two">
                <div className="input-field">
                  <label form="doctorLN"> Last name:</label>
                  <Input
                    placeholder="Last name"
                    name="doctorLN"
                    value={input.doctorLN}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="homePhone"> Home Phone:</label>
                  <Input
                    placeholder="Home phone"
                    name="homePhone"
                    value={input.homePhone}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="mobilePhone"> Mobile Phone:</label>
                  <Input
                    placeholder="Mobile phone"
                    name="mobilePhone"
                    value={input.mobilePhone}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="Qualifications"> Qualifications:</label>
                  <Input
                    placeholder="Qualifications"
                    name="Qualifications"
                    value={input.Qualifications}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="Specialization"> Specialization:</label>
                  <Input
                    placeholder="Specialization"
                    name="Specialization"
                    value={input.Specialization}
                    handleOnChange={handleOnChange}
                  />
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
                  <label form="doctorType"> Doctor Type</label>
                  <Select
                    name="doctorType"
                    label="doctorType"
                    value={input.doctorType}
                    options={doctorTypeOptions}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="doctorNotes"> Notes:</label>
                  <TextArea
                    name="doctorNotes"
                    value={input.doctorNotes}
                    handleOnChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="container-two">
                <div className="input-field">
                  <label form="VisitingCharge"> Visiting Charge:</label>
                  <Input
                    placeholder="Visiting Charge"
                    name="VisitingCharge"
                    value={input.VisitingCharge}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="ChannelingCharge"> Channeling Charge:</label>
                  <Input
                    placeholder="Channeling Charge:"
                    name="ChannelingCharge"
                    value={input.ChannelingCharge}
                    handleOnChange={handleOnChange}
                  />
                </div>
                <div className="input-field">
                  <label form="basicSalary"> Basic salary:</label>
                  <Input
                    placeholder="Basic salary"
                    name="basicSalary"
                    value={input.basicSalary}
                    handleOnChange={handleOnChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSubmitBtn && <button type="submit">Submit</button>}
      </form>
    </div>
  );
};

export default DDetails;
