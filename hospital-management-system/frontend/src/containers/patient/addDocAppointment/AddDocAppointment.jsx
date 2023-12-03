import React, { useEffect, useState } from "react";
import { Input, Select } from "../../../components";
import axios from "axios";
import "./addDocAppointment.css";

const AddDocAppointment = () => {
  const [allOutPatients, setAllOutPatients] = useState([]);
  const [allDOctors, setAllDOctors] = useState([]);

  // To Get all outPatient
  const API_URL = "http://localhost:3001/getOutPatientsDetails";
  const API_URL_DOCTORS = "http://localhost:3001/getDoctors";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllOutPatients(data);
  };
  const fetchDoctorsData = async () => {
    const { data } = await axios.get(API_URL_DOCTORS);
    setAllDOctors(data);
  };

  useEffect(() => {
    fetchData();
    fetchDoctorsData();
  }, []);
  return (
    <div className="app__addAppointment">
      <h2 className="page-title">ADD DOCTOR APPOINTMENT</h2>
      <div className="app__addAppointment-container">
        <div className="appScheduling-container">
          <div className="details-title">
            <h4>Appointment Details</h4>
            <div className="divider" />
          </div>
          <form>
            <div className="input-field doctor-types">
              <label htmlFor="patientID"> Patient ID</label>
              <div>
                <select
                  name="patientID"
                  id="patientID"
                  // value={appointmentInfos.doctorID}
                  // onChange={handleOnChangeAppointment}
                  required
                >
                  <option required value="">
                    Select a Patient ID
                  </option>
                  {allOutPatients.map((patient, index) => (
                    <option key={index} value={patient.patientID}>
                      {patient.patientID}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-field doctor-types">
              <label htmlFor="doctorID"> Doctor ID</label>
              <div>
                <select
                  name="doctorID"
                  id="doctorID"
                  // value={appointmentInfos.doctorID}
                  // onChange={handleOnChangeAppointment}
                  required
                >
                  <option required value="">
                    Select a doctor ID
                  </option>
                  {allDOctors.map((doctor, index) => (
                    <option key={index} value={doctor.doctorID}>
                      {doctor.doctorID}
                    </option>
                  ))}
                </select>

                <span
                  // onClick={handleShowDocDetailsTable}
                  className="btn-seeAll"
                >
                  See All
                </span>
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="gender"> Gender:</label>
              <Input
                placeholder="Gender"
                name="gender"
                inputDisabled="true"
                // value={lastElement ? lastElement.timeOut : ""}
              />
            </div>
            s
          </form>
        </div>
        <aside className="container-view-appoint"></aside>
      </div>
    </div>
  );
};

export default AddDocAppointment;
