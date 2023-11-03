import axios from "axios";
import { GET_MEDICAL_SERVICE_DETAILS } from "../slice/medicalServiceSlice";

const fetchMedicalService = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/getHospitalServices")
      .then((res) => {
        dispatch(GET_MEDICAL_SERVICE_DETAILS(res.data));
      })
      .catch((err) => console.error(err));
  };
};

export default fetchMedicalService;
