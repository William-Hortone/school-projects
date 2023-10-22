import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Register } from "./components";
import { HomeAdmin } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DoctorDetails,
  MedicalServices,
  // VDoctorDetails,
  // VHospitalSD,
  ViewHospitalSD,
  VizDoctorDetails,
} from "./containers";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getDoctors")
      .then((res) => {
        setDoctors(res.data);
        // console.log(doctors);
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
          <Route path="/vHospitalS" element={<ViewHospitalSD />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
