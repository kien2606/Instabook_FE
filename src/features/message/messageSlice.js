import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  firstLoad: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = [action.payload.value, ...state.users];
    },
  },
});

export const messageSelector = (state) => state.message;

export const { setUsers } = messageSlice.actions;

export default messageSlice.reducer;
