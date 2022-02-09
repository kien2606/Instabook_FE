import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  posts: [],
  savedPost: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUserLoading: (state, action) => {
      state.loading = true;
    },
    setUserSuccess: (state, action) => {
      state.users = [...state.users, action.payload];
      state.loading = false;
    },
    updateProfileLoading: (state, action) => {
      state.loading = true;
    },
    setProcessDone: (state, action) => {
      state.loading = false;
    },

    setUserPosts: (state, action) => {
      state.posts = [...state.posts, action.payload];
      state.loading = false;
    },
    setSavedPost: (state, action) => {
      state.savedPost = [...state.savedPost, action.payload];
      state.loading = false;

    },
    follow: (state, action) => {},
    unfollow: (state, action) => {},
    processFollowAndUnFollow: (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
  },
});

export const userSelector = (state) => state.user;
export const {
  setSavedPost,
  setUserPosts,
  setUserLoading,
  setUserSuccess,
  setProcessDone,
  updateProfileLoading,
  follow,
  unfollow,
  processFollowAndUnFollow,
} = userSlice.actions;
export default userSlice.reducer;
