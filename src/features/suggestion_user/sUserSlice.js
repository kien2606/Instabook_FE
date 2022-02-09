import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};
const sUserSlice = createSlice({
  name: "sUser",
  initialState,
  reducers: {
    getSuggestionsLoading: (state, action) => {
      state.loading = true;
    },

    getSuggestionsDone: (state, action) => {
      state.loading = false;
    },
    setSuggestionsUser: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
  },
});

export const { getSuggestionsDone, getSuggestionsLoading, setSuggestionsUser } =
  sUserSlice.actions;

export const sUserSelector = (state) => state.sUser;

export default sUserSlice.reducer;
