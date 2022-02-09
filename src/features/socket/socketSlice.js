import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketData: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socketData = action.payload;
    },
  },
});

export const socketSelector = (state) => state.socket;

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
