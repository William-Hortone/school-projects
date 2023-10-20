import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "./components";
import { HomeAdmin } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DoctorDetails,
  MedicalServices,
  VDoctorDetails,
  VHospitalSD,
} from "./containers";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomeAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctorD" element={<DoctorDetails />} />
        <Route path="/vDoctorD" element={<VDoctorDetails />} />
        <Route path="/mServices" element={<MedicalServices />} />
        <Route path="/vHospitalSD" element={<VHospitalSD />} />
      </Routes>
    </div>
  );
}

export default App;
