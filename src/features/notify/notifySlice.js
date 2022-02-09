import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  notifyData: [],
};
const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    createNotify: () => {},
    deleteNotify: () => {},
    gettingNotifies: (state, action) => {
      state.loading = true;
    },
    gettingNotifiesDone: (state, action) => {
      state.loading = false;
    },
    setNotifyData: (state, action) => {
      state.notifyData = action.payload;
      state.loading = false;
    },
    readNotify: () => {},
    setReadNotify: (state, action) => {
      state.notifyData = state.notifyData.map((notify) =>
        notify._id === action.payload._id ? action.payload : notify
      );
    },
    deleteAllNotifications: () => {},
    setDeleteAllNotifications: (state, action) => {
      state.notifyData = action.payload;
    },
    // real time
    rtCreateNotify: (state, action) => {
      state.notifyData = [action.payload, ...state.notifyData];
    },
    rtDeleteNotify: (state, action) => {
      // state.notifyData = state.notifyData.filter(
      //   (notify) =>
      //     notify._id !== action.payload._id ||
      //     (notify.id !== action.payload.id && notify.url !== action.payload.url)
      // );
      state.notifyData = state.notifyData.filter(
        (notify) =>
          notify.id !== action.payload.id || notify.url !== action.payload.url
      );
    },
  },
});

export const notifySelector = (state) => state.notify;

export const {
  deleteAllNotifications,
  setDeleteAllNotifications,
  readNotify,
  setReadNotify,
  createNotify,
  deleteNotify,
  gettingNotifies,
  gettingNotifiesDone,
  setNotifyData,
  rtCreateNotify,
  rtDeleteNotify,
} = notifySlice.actions;

export default notifySlice.reducer;
