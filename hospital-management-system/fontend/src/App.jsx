import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Register, Reset } from "./components";
import { Home, HomeAdmin } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AdminDashboard,
  AppScheduling,
  DoctorAppointment,
  DoctorDetails,
  MedicalServices,
  RoomDetails,
  ServiceScheduling,
  ViewHospitalSD,
  VizDoctorDetails,
  WardDetails,
} from "./containers";
import { useDispatch } from "react-redux";
import fetchDoctorDetails, {
  fetchDocAppointments,
} from "./redux/actions/doctors.action";
import fetchMedicalService, {
  fetchHospitalSchedule,
} from "./redux/actions/medicalService.action";
import fetchRoomsDetails from "./redux/actions/room.action";
import fetchWardDetails from "./redux/actions/ward.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorDetails());
    dispatch(fetchMedicalService());
    dispatch(fetchDocAppointments());
    dispatch(fetchHospitalSchedule());
    dispatch(fetchRoomsDetails());
    dispatch(fetchWardDetails());
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

          <Route path="/vizDoctorD" element={<VizDoctorDetails />} />
          <Route path="/vHospital" element={<ViewHospitalSD />} />
          <Route path="/roomDetails" element={<RoomDetails />} />

          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="/adminDashboard/doctorD" element={<DoctorDetails />} />
            <Route
              path="/adminDashboard/doctorApp"
              element={<AppScheduling />}
            />
            <Route
              path="/adminDashboard/serviceSchedule"
              element={<ServiceScheduling />}
            />
            <Route
              path="/adminDashboard/mServices"
              element={<MedicalServices />}
            />
            <Route path="/adminDashboard/rooms" element={<RoomDetails />} />
            <Route
              path="/adminDashboard/wardDetails"
              element={<WardDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
