import axios from "axios";
import { GET_ROOMS_DETAILS } from "../slice/roomsSlice";

const fetchRoomsDetails = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/getRoomsDetails")
      .then((res) => {
        dispatch(GET_ROOMS_DETAILS(res.data));
      })
      .catch((err) => console.error(err));
  };
};
export default fetchRoomsDetails;
