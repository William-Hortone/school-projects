import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomsDetails: [],
};

const roomsSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    GET_ROOMS_DETAILS: (state, action) => {
      state.roomsDetails = action.payload;
    },
  },
});

export const { GET_ROOMS_DETAILS } = roomsSlice.actions;
export const selectRoomsDetails = (state) => state.room.roomsDetails;

export default roomsSlice.reducer;
