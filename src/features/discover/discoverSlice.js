import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  posts: [],
  firstLoad: false,
  hasMore: false,
};

const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    getDiscoverPostLoading: (state, action) => {
      state.loading = true;
    },
    getDiscoverPostDone: (state, action) => {
      state.loading = false;
    },
    getDiscoverPost: (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
      state.loading = false;
      state.hasMore = action.payload.hasMore;
    },
    doneFirstLoad: (state, action) => {
      state.firstLoad = true;
      state.hasMore = false;
    },
  },
});
export const discoverSelector = (state) => state.discover;
export const {
  doneFirstLoad,
  getDiscoverPost,
  getDiscoverPostDone,
  getDiscoverPostLoading,
} = discoverSlice.actions;
export default discoverSlice.reducer;
