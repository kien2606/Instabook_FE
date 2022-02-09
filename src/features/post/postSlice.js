import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: [],
  total_posts: 0,
  specificPost: [],
  infinityScrollPost: {
    loading: true,
    hasMore: false,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postingProcess: (state, action) => {
      state.loading = true;
    },
    setPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
      state.total_posts += 1;
    },
    gettingPostProcess: (state, action) => {
      state.loading = true;
    },
    //
    scrollInfinityPosts: (state, action) => {
      state.infinityScrollPost.loading = true;
    },
    //
    getPost: (state, action) => {
      state.posts = [...state.posts, ...action.payload.res.posts];
      state.total_posts = state.total_posts + action.payload.res.total_posts;
      state.loading = false;
      state.infinityScrollPost = action.payload.scrollPost;
    },
    updatePostProcess: (state, action) => {
      state.loading = true;
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.specificPost = state.specificPost.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.loading = false;
    },
    postingDone: (state, action) => {
      state.loading = false;
    },
    likePost: () => {},
    unLikePost: () => {},
    setSpecificPostLoading: () => {},
    setSpecificPost: (state, action) => {
      state.specificPost = action.payload;
    },
    deletePostProcess: (state, action) => {
      state.loading = true;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      state.total_posts -= 1;
      state.loading = false;
    },
    savePost: () => {},
    unSavePost: () => {},
  },
});

export const postSelector = (state) => state.post;

export const {
  scrollInfinityPosts,
  setSpecificPostLoading,
  setSpecificPost,
  postingProcess,
  postingDone,
  setPost,
  getPost,
  gettingPostProcess,
  updatePostProcess,
  updatePost,
  likePost,
  unLikePost,
  deletePostProcess,
  deletePost,
  savePost,
  unSavePost,
} = postSlice.actions;

export default postSlice.reducer;
