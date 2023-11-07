import React from "react";
import "./doctorAppointment.css";
import AppScheduling from "../appSheduling/AppScheduling";
import { Header } from "../../../components";

const DoctorAppointment = () => {
  return (
    <div className="app__doctorAppointment">
      <Header />
      <AppScheduling />
    </div>
  );
};

export default DoctorAppointment;
