import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createNewComment: () => {},
    likeComment: () => {},
    unLikeComment: () => {},
    updateComment: () => {},
    deleteComment: () => {},
  },
});

export const commentSelector = (state) => state.comment;

export const {
  createNewComment,
  likeComment,
  unLikeComment,
  updateComment,
  deleteComment,
} = commentSlice.actions;

export default commentSlice.reducer;
