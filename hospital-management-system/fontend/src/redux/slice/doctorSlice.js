import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorsDetails: [],
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    GET_DOCTORS_DETAILS: (state, action) => {
      state.doctorsDetails = action.payload;
    },
  },
});

export const { GET_DOCTORS_DETAILS } = doctorSlice.actions;
export const selectDoctorDetails = (state) => state.doctor.doctorsDetails;

export default doctorSlice.reducer;
