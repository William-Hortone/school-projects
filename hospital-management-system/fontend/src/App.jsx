import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Register } from "./components";
import { HomeAdmin } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DoctorDetails,
  MedicalServices,
  ViewHospitalSD,
  VizDoctorDetails,
} from "./containers";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getDoctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:3001/getHospitalServices")
      .then((res) => {
        console.log(res.data);
        setMedicalServices(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/doctorD" element={<DoctorDetails />} />
          <Route
            path="/vizDoctorD"
            element={<VizDoctorDetails doctors={doctors} />}
          />

          <Route path="/mServices" element={<MedicalServices />} />
          <Route
            path="/vHospital"
            element={<ViewHospitalSD medicalServices={medicalServices} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
