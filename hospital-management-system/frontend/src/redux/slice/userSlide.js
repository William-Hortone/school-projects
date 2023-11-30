import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  name: null,
  role: null,
};

const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    IS_USER_LOGIN: (state, action) => {
      const { email, name, role } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.name = name;
      state.role = role;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.name = null;
      state.role = null;
    },
  },
});

export const { IS_USER_LOGIN, REMOVE_ACTIVE_USER } = userSlide.actions;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectEmail = (state) => state.user.email;
export const selectName = (state) => state.user.name;
export const selectRole = (state) => state.user.role;

export default userSlide.reducer;
