import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordDetails: [],
};

const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {
    GET_WARD_DETAILS: (state, action) => {
      state.wordDetails = action.payload;
    },
  },
});

export const { GET_WARD_DETAILS } = wardSlice.actions;
export const selectWardDetails = (state) => state.ward.wordDetails;

export default wardSlice.reducer;
