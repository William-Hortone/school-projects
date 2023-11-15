import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import doctorReducer from "./slice/doctorSlice";
import medicalSReducer from "./slice/medicalServiceSlice";
import roomReducer from "./slice/roomsSlice";
import wardReducer from "./slice/wardSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  doctor: doctorReducer,
  medical: medicalSReducer,
  room: roomReducer,
  ward: wardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
