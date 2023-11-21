import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addedUserInfos: [],
};

const addedUserSlice = createSlice({
  name: "addedUser",
  initialState,
  reducers: {
    GET_USER_DETAILS: (state, action) => {
      state.addedUserInfos = action.payload;
    },
  },
});

export const { GET_USER_DETAILS } = addedUserSlice.actions;
export const selectAddedUserInfos = (state) => state.addedUser.addedUserInfos;

export default addedUserSlice.reducer;
