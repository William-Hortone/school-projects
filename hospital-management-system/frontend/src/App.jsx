import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Login, Register, Reset } from "./components";
import {
  AddUser,
  AdminDashboard,
  AppScheduling,
  BedDetails,
  DDetails,
  Dashboard,
  MedicalServices,
  RoomDetails,
  ServiceScheduling,
  ViewAllUsers,
  ViewHospitalSD,
  ViewWardDetails,
  VizAllRooms,
  VizDocApp,
  VizDoctorDetails,
  VizHospitalSer,
  WardDetails,
} from "./containers";
import { Home } from "./pages";
import fetchAddedUserDetails from "./redux/actions/addedUser";
import fetchDoctorDetails, {
  fetchDocAppointments,
} from "./redux/actions/doctors.action";
import fetchMedicalService, {
  fetchHospitalSchedule,
} from "./redux/actions/medicalService.action";
import fetchRoomsDetails from "./redux/actions/room.action";
import fetchWardDetails from "./redux/actions/ward.actions";
import { IS_USER_LOGIN, REMOVE_ACTIVE_USER } from "./redux/slice/userSlide";

function App() {
  const dispatch = useDispatch();

  // Set a cookie and keep track  the infos of the current user
  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUserDetails = Cookies.get("userDetails");

    if (storedToken) {
      const { email, name, role } = JSON.parse(storedUserDetails);

      dispatch(
        IS_USER_LOGIN({
          email: email,
          name: name,
          role: role,
        })
      );
    } else {
      dispatch(REMOVE_ACTIVE_USER());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDoctorDetails());
    dispatch(fetchMedicalService());
    dispatch(fetchDocAppointments());
    dispatch(fetchHospitalSchedule());
    dispatch(fetchAddedUserDetails());
    dispatch(fetchRoomsDetails());
    dispatch(fetchWardDetails());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          {/* Routes for visualization  */}
          <Route path="/vizDoctorD" element={<VizDoctorDetails />} />
          <Route path="/vHospital" element={<ViewHospitalSD />} />
          <Route path="/vizDocApp" element={<VizDocApp />} />
          <Route path="/vizHospitalSer" element={<VizHospitalSer />} />
          <Route path="/vizRooms" element={<VizAllRooms />} />
          <Route path="/vizAllWards" element={<ViewWardDetails />} />
          <Route path="/vizAllUsers" element={<ViewAllUsers />} />

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
            <Route path="/adminDashboard/bedDetails" element={<BedDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
