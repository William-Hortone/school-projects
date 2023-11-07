import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicalServices: [],
};

const medicalServiceSlice = createSlice({
  name: "medical",
  initialState,
  reducers: {
    GET_MEDICAL_SERVICE_DETAILS: (state, action) => {
      state.medicalServices = action.payload;
    },
  },
});

export const { GET_MEDICAL_SERVICE_DETAILS } = medicalServiceSlice.actions;
export const selectMedicalService = (state) => state.medical.medicalServices;

export default medicalServiceSlice.reducer;
