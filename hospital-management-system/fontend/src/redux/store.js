import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import doctorReducer from "./slice/doctorSlice";
import medicalSReducer from "./slice/medicalServiceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  doctor: doctorReducer,
  medical: medicalSReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
