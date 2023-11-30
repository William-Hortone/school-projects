import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer from "./slice/authSlice";
import doctorReducer from "./slice/doctorSlice";
import medicalSReducer from "./slice/medicalServiceSlice";
import roomReducer from "./slice/roomsSlice";
import wardReducer from "./slice/wardSlice";
import addedUserReducer from "./slice/addedUserSlide";
import userReducer from "./slice/userSlide";

const rootReducer = combineReducers({
  user: userReducer,
  // auth: authReducer,
  doctor: doctorReducer,
  medical: medicalSReducer,
  room: roomReducer,
  ward: wardReducer,
  addedUser: addedUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
