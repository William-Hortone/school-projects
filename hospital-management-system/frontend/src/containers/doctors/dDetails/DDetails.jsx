import React, { useEffect, useRef, useState } from "react";
import "./dDetails.css";
import { Input, Select, TextArea } from "../../../components";
import axios from "axios";
import { toast } from "react-toastify";
import DoctorMenu from "../doctorMenu/DoctorMenu";
import { selectDoctorDetails } from "../../../redux/slice/doctorSlice";
import { useSelector } from "react-redux";

const DDetails = () => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [addDoctorD, setAddDoctorD] = useState(true);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [isInputEnabled, setInputEnabled] = useState(true);
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

  const form = useRef();
  const doctorsInfos = useSelector(selectDoctorDetails);

  const doctorSexOptions = [
    { value: "Man", label: "M" },
    { value: "Woman", label: "F" },
  ];
  const doctorTypeOptions = [
    { value: "Visiting Doctor", label: "Visiting Doctor" },
    { value: "Permanent Doctor", label: "Permanent Doctor" },
  ];

  useEffect(() => {
    setDoctorId(input.doctorID);
  }, [input.doctorID]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // Function to set the first ID and to increment it
  const handleAddDoctor = () => {
    if (doctorsInfos.length === 0) {
      setInput({
        ...input,
        doctorID: "doctor_001",
      });
    } else {
      const lastDoctorID = doctorsInfos[doctorsInfos.length - 1].doctorID;
      const numericPart = parseInt(lastDoctorID.split("_")[1]);
      const nextDoctorID = `doctor_${(numericPart + 1)
        .toString()
        .padStart(3, "0")} `;
      setInput({
        ...input,
        doctorID: nextDoctorID,
      });
    }
    setInputEnabled(false);
    setAddDoctorD(true);
    setShowSubmit(true);
  };

  // Function to add a new Doctor
  const handleSubmitAddDoctor = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/doctor", input)
      .then((res) => {
        toast.success("Added Successfully");
      })
      .catch((err) => toast.error(err.message));

    setShowSubmit(false);
    setInputEnabled(true);
  };

  const handleEditDoctor = () => {
    setShowSubmit(true);
    setAddDoctorD(false);
  };

  // Function to Edit  Doctor
  const handleSubmitEditDoctor = (e, doctorId) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/editDoctor/${doctorId}`, input)
      .then((res) => {
        if (res.data === "success") {
          toast.success("Doctor updated successfully");
        } else if (res.data === "notfound") {
          toast.error("Wrong doctor ID");
        } else {
          toast.error("An error occurred while updating the service");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleRefresh = () => {
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
    setShowSubmit(false);
    window.location.reload();
  };

  const handleDeleteDoctor = () => {
    if (doctorId === undefined || doctorId === "") {
      toast.error("Please provide a Doctor ID");
    } else {
      setShowPopupDelete(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopupDelete(false);
  };

  // Function to Delete  Doctor
  const handleSubmitDeleteDoctor = (doctorId) => {
    if (doctorId === undefined || doctorId === "") {
      toast.error("Please provide a Doctor ID");
    } else {
      axios
        .put(`http://localhost:3001/deleteDoctor/${doctorId}`)
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
      handleRefresh();
    }
    setShowPopupDelete(false);
  };

  return (
    <div className="app__dDetails">
      <div className="app__dDetails-wrapper">
        <h1 className="page-title">Doctor Details</h1>
        <form
          onSubmit={
            addDoctorD
              ? handleSubmitAddDoctor
              : (e) => handleSubmitEditDoctor(e, doctorId)
          }
          ref={form}
        >
          <div className="app__dDetails-container">
            <div className="details-section-one">
              <div className="container-one">
                <div className="input-field">
                  <label form="doctorID"> Doctor ID:</label>
                  <input
                    required
                    placeholder="Doctor ID"
                    name="doctorID"
                    value={input.doctorID}
                    onChange={handleOnChange}
                    disabled={!isInputEnabled}
                  />
                </div>
              </div>
              <div className="container-two"></div>
            </div>

            {/* Personal Details */}
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
                    <label form="doctorSex"> Sex:</label>
                    <Select
                      name="sex"
                      label="sex"
                      defaultOptionValue="Select the gender"
                      value={input.sex}
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

            {/* Employee Details */}
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
                      defaultOptionValue="Select doctor type"
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
          {showSubmit && (
            <button className="submit-btn" type="submit">
              Submit
            </button>
          )}
        </form>

        {showPopupDelete && (
          <div className="delete-popup">
            <p>
              Do you really want to delete <br />
              the doctor with ID of {input.doctorID} ?
            </p>
            <div className="delete-buttons">
              <button onClick={handleClosePopup}> Cancel</button>
              <button onClick={() => handleSubmitDeleteDoctor(doctorId)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="app__doctorMenuD-container">
        <DoctorMenu
          handleRefresh={handleRefresh}
          handleAddDoctor={handleAddDoctor}
          handleEditDoctor={handleEditDoctor}
          handleDeleteDoctor={handleDeleteDoctor}
        />
      </div>
    </div>
  );
};

export default DDetails;
