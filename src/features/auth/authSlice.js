import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  responseData: null,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginLoading: (state, action) => {
      state.loading = true;
    },
    register: (state, action) => {
      state.loading = true;
    },
    refreshToken: (state, action) => {
      state.loading = true;
    },
    setAuthProcessSuccess: (state, action) => {
      state.responseData = {
        token: action.payload.access_token,
        user: action.payload.user,
      };
      state.loading = false;
      state.message = { success: action.payload.msg };
    },
    setAuthProcessFailed: (state, action) => {
      state.loading = false;
      state.message = { error: action.payload };
    },

    logout: (state, action) => {},
    setUser: (state, action) => {
      // why cant use setAuthDoneProcess ? because set user dont relate to loading in auth
      state.responseData = {
        token: action.payload.token,
        user: action.payload.user,
      };
    },
  },
});

export const authSelector = (state) => state.auth;

export const {
  loginLoading,
  register,
  refreshToken,
  setAuthProcessFailed,
  setAuthProcessSuccess,
  logout,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
