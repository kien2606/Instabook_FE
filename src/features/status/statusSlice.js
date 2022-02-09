import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isEdit: false,
  currentPost: [],
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setOnEdit: (state, action) => {
      state.isOpen = true;
      state.isEdit = action.payload.isEdit;
      state.currentPost = action.payload.currentPost;
    },
    setOnEditDone: (state, action) => {
      state.isEdit = false;
      state.isOpen = false;
      state.currentPost = [];
    },
  },
});

export const statusSelector = (state) => state.status;

export const { setOpen, setOnEdit, setOnEditDone } = statusSlice.actions;

export default statusSlice.reducer;
