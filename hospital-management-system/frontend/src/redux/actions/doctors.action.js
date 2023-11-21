import axios from "axios";
import {
  GET_DOCTORS_DETAILS,
  GET_DOCTOR_APPOINTMENT,
} from "../slice/doctorSlice";

const fetchDoctorDetails = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/getDoctors")
      .then((res) => {
        dispatch(GET_DOCTORS_DETAILS(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const fetchDocAppointments = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/getDocAppointments")
      .then((res) => {
        dispatch(GET_DOCTOR_APPOINTMENT(res.data));
      })
      .catch((err) => console.log(err));
  };
};
export default fetchDoctorDetails;
