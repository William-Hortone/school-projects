// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   doctorsDetails: [],
//   doctorID: "",
// };

// const doctorSlice = createSlice({
//   name: "doctor",
//   initialState,
//   reducers: {
//     GET_DOCTOR_DETAILS: (state, action) => {
//       axios.get("http://localhost:3001/getDoctors").then((res) => {
//         // state.doctorsDetails = action.payload;
//         console.log("from redux", res.data);
//         console.log("from redux", state.doctorsDetails);
//       });
//     },
//   },
// });

// export const { GET_DOCTOR_DETAILS } = doctorSlice.actions;

// export default doctorSlice.reducer;

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
      console.log(state.doctorsDetails);
    },
  },
});

export const { GET_DOCTORS_DETAILS } = doctorSlice.actions;

export default doctorSlice.reducer;

export const selectDoctorDetails = (state) => state.doctor.doctorsDetails;
