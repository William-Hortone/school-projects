import axios from "axios";
import { GET_WARD_DETAILS } from "../slice/wardSlice";

const fetchWardDetails = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/getWardsDetails")
      .then((res) => {
        // console.log(res.data);
        dispatch(GET_WARD_DETAILS(res.data));
      })
      .catch((err) => console.error(err));
  };
};
export default fetchWardDetails;
