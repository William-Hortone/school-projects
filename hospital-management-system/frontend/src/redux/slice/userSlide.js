import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  name: null,
  role: null,
  userId: null,
};

const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    IS_USER_LOGIN: (state, action) => {
      const { email, name, role, userId } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.name = name;
      state.role = role;
      state.userId = userId;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.name = null;
      state.role = null;
      state.userId = null;
    },
  },
});

export const { IS_USER_LOGIN, REMOVE_ACTIVE_USER } = userSlide.actions;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectEmail = (state) => state.user.email;
export const selectName = (state) => state.user.name;
export const selectRole = (state) => state.user.role;
export const selectUserId = (state) => state.user.userId;

export default userSlide.reducer;
