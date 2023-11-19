import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorsDetails: [],
  docAppointment: [],
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    GET_DOCTORS_DETAILS: (state, action) => {
      state.doctorsDetails = action.payload;
    },
    GET_DOCTOR_APPOINTMENT: (state, action) => {
      state.docAppointment = action.payload;
    },
  },
});

export const { GET_DOCTORS_DETAILS, GET_DOCTOR_APPOINTMENT } =
  doctorSlice.actions;
export const selectDoctorDetails = (state) => state.doctor.doctorsDetails;
export const selectDocAppointment = (state) => state.doctor.docAppointment;

export default doctorSlice.reducer;
