import axios from "axios";
import { GET_ROOMS_DETAILS } from "../slice/roomsSlice";

const fetchRoomsDetails = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/getRoomsDetails");
      dispatch(GET_ROOMS_DETAILS(res.data));
    } catch (err) {
      console.error(err);
    }
  };
};
export default fetchRoomsDetails;
