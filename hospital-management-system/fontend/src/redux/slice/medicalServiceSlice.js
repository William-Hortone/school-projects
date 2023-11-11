import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicalServices: [],
  hospitalSchedule: [],
};

const medicalServiceSlice = createSlice({
  name: "medical",
  initialState,
  reducers: {
    GET_MEDICAL_SERVICE_DETAILS: (state, action) => {
      state.medicalServices = action.payload;
    },
    GET_HOSPITAL_SCHEDULE: (state, action) => {
      state.hospitalSchedule = action.payload;
    },
  },
});

export const { GET_MEDICAL_SERVICE_DETAILS, GET_HOSPITAL_SCHEDULE } =
  medicalServiceSlice.actions;
export const selectMedicalService = (state) => state.medical.medicalServices;
export const selectHospitalSchedule = (state) => state.medical.hospitalSchedule;

export default medicalServiceSlice.reducer;
