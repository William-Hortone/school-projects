import React, { useEffect, useRef, useState } from "react";
import "./dDetails.css";
import { Input, Select, TextArea } from "../../../components";
import axios from "axios";
import { toast } from "react-toastify";
import DoctorMenu from "../doctorMenu/DoctorMenu";

const DDetails = () => {
  const [refreshForm, setRefreshForm] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [addDoctorD, setAddDoctorD] = useState(true);
  const [input, setInput] = useState({
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

  const form = useRef();

  const doctorSexOptions = [
    { value: "Man", label: "M" },
    { value: "Woman", label: "F" },
  ];
  const doctorTypeOptions = [
    { value: "Visiting Doctor", label: "Visiting Doctor" },
    { value: "Permanent Doctor", label: "Permanent Doctor" },
  ];

  useEffect(() => {
    if (refreshForm) {
      setInput({
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();

    if (
      input.doctorFN === "" ||
      input.nicNo === "" ||
      input.doctorLN === "" ||
      input.homePhone === "" ||
      input.mobilePhone === "" ||
      input.Qualifications === "" ||
      input.Specialization === "" ||
      input.VisitingCharge === "" ||
      input.ChannelingCharge === "" ||
      input.basicSalary === "" ||
      input.doctorType === "" ||
      input.doctorAddress === "" ||
      input.doctorNotes === ""
    ) {
      toast.error("Please complete the fields");
    } else {
      axios
        .post("http://localhost:3001/doctor", input)
        .then((res) => {
          console.log("the response from the backend", res.data);
          toast.success("Added Successfully");
        })
        .catch((err) => toast.error(err.message));
    }
    setAddDoctorD(true);
  };

  const handleEditDoctor = (e, doctorId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editDoctor/${doctorId}`, input)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Doctor updated successfully");
        } else if (res.data === "not found") {
          toast.error("Service not found");
        } else {
          toast.error("An error occurred while updating the service");
        }
      })
      .catch((err) => {
        toast.error("An error occurred while updating the service");
      });

    setAddDoctorD(false);
  };
  const handleRefresh = () => {
    setRefreshForm(!refreshForm);
  };

  const handleDeleteDoctor = (doctorId) => {
    axios
      .delete(`http://localhost:3001/deleteDoctor/${doctorId}`)
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

  // const handleDelete = (serviceId) => {
  //   axios
  //     .delete(`http://localhost:3001/deleteService/${serviceId}`)
  //     .then((res) => {
  //       if (res.data === "success") {
  //         toast.success("Delete Successfully");
  //       }
  //       if (res.data === "not found") {
  //         toast.error("Service not found");
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  return (
    <div className="app__dDetails">
      <div className="app__dDetails-wrapper">
        <h1>Doctor Details</h1>
        <form
          onSubmit={addDoctorD ? handleAddDoctor : handleEditDoctor}
          ref={form}
        >
          <div className="app__dDetails-container">
            <div className="details-section-one">
              <div className="container-one">
                <div className="input-field">
                  <label form="doctorID"> Doctor ID:</label>
                  <input
                    placeholder="Doctor ID"
                    name="doctorID"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
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
        </form>
      </div>
      <div className="app__doctorMenuD-container">
        <DoctorMenu
          handleRefresh={handleRefresh}
          handleAddDoctor={handleAddDoctor}
          handleEditDoctor={(e) => handleEditDoctor(e, doctorId)}
          handleDeleteDoctor={() => handleDeleteDoctor(doctorId)}
        />
      </div>
    </div>
  );
};

export default DDetails;
