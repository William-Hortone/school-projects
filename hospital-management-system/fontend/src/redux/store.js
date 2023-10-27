import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import doctorReducer from "./slice/doctorSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  doctor: doctorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
