import axios from "axios";
import {
  GET_MEDICAL_SERVICE_DETAILS,
  GET_HOSPITAL_SCHEDULE,
} from "../slice/medicalServiceSlice";

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

export const fetchHospitalSchedule = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/getHospitalSchedule")
      .then((res) => {
        console.log(res.data);
        dispatch(GET_HOSPITAL_SCHEDULE(res.data));
      })
      .catch((err) => console.error(err));
  };
};

export default fetchMedicalService;
