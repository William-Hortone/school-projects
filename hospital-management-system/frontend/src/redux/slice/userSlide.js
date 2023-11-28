// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     isLoggedIn: false,
//   },
//   reducers: {
//     login: (state) => {
//       state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//     },
//   },
// });

// export const { login, logout } = userSlice.actions;

// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// export default userSlice.reducer;

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
      const { email, name, role, userStatus } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.name = name;
      state.role = role;
      console.log(
        "here is logged new",
        state.isLoggedIn,
        state.email,
        state.name,
        state.role
      );
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.name = null;
      state.role = null;
      console.log(
        "here is logout",
        state.isLoggedIn,
        state.email,
        state.name,
        state.role
      );
    },
  },
});

export const { IS_USER_LOGIN, REMOVE_ACTIVE_USER } = userSlide.actions;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectEmail = (state) => state.user.email;
export const selectName = (state) => state.user.name;
export const selectRole = (state) => state.user.role;

export default userSlide.reducer;
