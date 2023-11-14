import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Register, Reset } from "./components";
import { Home, HomeAdmin } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AdminDashboard,
  DoctorAppointment,
  DoctorDetails,
  MedicalServices,
  RoomDetails,
  ServiceScheduling,
  ViewHospitalSD,
  VizDoctorDetails,
} from "./containers";
import { useDispatch } from "react-redux";
import fetchDoctorDetails, {
  fetchDocAppointments,
} from "./redux/actions/doctors.action";
import fetchMedicalService, {
  fetchHospitalSchedule,
} from "./redux/actions/medicalService.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorDetails());
    dispatch(fetchMedicalService());
    dispatch(fetchDocAppointments());
    dispatch(fetchHospitalSchedule());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeAdmin />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route path="/doctorD" element={<DoctorDetails />} />
          <Route path="/vizDoctorD" element={<VizDoctorDetails />} />
          <Route path="/mServices" element={<MedicalServices />} />
          <Route path="/vHospital" element={<ViewHospitalSD />} />
          <Route path="/doctorApp" element={<DoctorAppointment />} />
          <Route path="/serviceSchedule" element={<ServiceScheduling />} />
          <Route path="/roomDetails" element={<RoomDetails />} />
          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="/adminDashboard/rooms" element={<RoomDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
