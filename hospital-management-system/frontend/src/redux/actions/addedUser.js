import axios from "axios";
import { GET_USER_DETAILS } from "../slice/addedUserSlide";

const fetchAddedUserDetails = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/getUsersDetails")
      .then((res) => {
        // console.log(res.data);
        dispatch(GET_USER_DETAILS(res.data));
      })
      .catch((err) => console.error(err));
  };
};
export default fetchAddedUserDetails;
