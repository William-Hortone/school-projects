import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login, Register, Reset } from "./components";
import { Home, HomeAdmin } from "./pages";
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
import { useDispatch } from "react-redux";
import fetchDoctorDetails from "./redux/actions/doctors.action";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  const dispatch = useDispatch();

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
        setMedicalServices(res.data);
      })
      .catch((err) => console.error(err));

    dispatch(fetchDoctorDetails());
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
