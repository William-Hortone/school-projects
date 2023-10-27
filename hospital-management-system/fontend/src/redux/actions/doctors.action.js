import axios from "axios";
import { GET_DOCTORS_DETAILS } from "../slice/doctorSlice";

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
export default fetchDoctorDetails;
