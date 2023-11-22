import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Register, Reset } from "./components";
import { Home, HomeAdmin } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddUser,
  AdminDashboard,
  AppScheduling,
  DDetails,
  Dashboard,
  MedicalServices,
  RoomDetails,
  ServiceScheduling,
  ViewHospitalSD,
  VizAllRooms,
  VizDocApp,
  VizDoctorDetails,
  VizHospitalSer,
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
import fetchAddedUserDetails from "./redux/actions/addedUser";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorDetails());
    dispatch(fetchMedicalService());
    dispatch(fetchDocAppointments());
    dispatch(fetchHospitalSchedule());
    dispatch(fetchAddedUserDetails());
    dispatch(fetchRoomsDetails());
    dispatch(fetchWardDetails());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route path="/vizDoctorD" element={<VizDoctorDetails />} />
          <Route path="/vHospital" element={<ViewHospitalSD />} />
          <Route path="/vizDocApp" element={<VizDocApp />} />
          <Route path="/vizHospitalSer" element={<VizHospitalSer />} />
          <Route path="/vizRooms" element={<VizAllRooms />} />

          {/* Routes on the dashboard */}
          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="/adminDashboard/dashboard" element={<Dashboard />} />
            <Route path="/adminDashboard/doctorD" element={<DDetails />} />
            <Route
              path="/adminDashboard/mServices"
              element={<MedicalServices />}
            />
            <Route
              path="/adminDashboard/serviceSchedule"
              element={<ServiceScheduling />}
            />
            <Route
              path="/adminDashboard/doctorApp"
              element={<AppScheduling />}
            />
            <Route path="/adminDashboard/rooms" element={<RoomDetails />} />
            <Route
              path="/adminDashboard/wardDetails"
              element={<WardDetails />}
            />
            <Route path="/adminDashboard/addUser" element={<AddUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;