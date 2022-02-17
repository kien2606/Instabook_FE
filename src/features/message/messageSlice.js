import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  messages: [],
  firstLoad: false,
};

// GET means start saga to call api , SET means get data API from saga

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = [action.payload.value, ...state.users];
    },
    sendMessage: () => {},
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
      state.users = state.users.map((user) =>
        user._id === action.payload.recipient
          ? {
              ...user,
              text: action.payload.text,
              images: action.payload.images,
            }
          : user
      );
      state.loading = false;
    },
    getConversation: () => {},
    setConversation: (state, action) => {
      state.users = action.payload;
      state.firstLoad = true;
    },
    getMessage: (state, action) => {
      state.loading = true;
    },
    setMessage: (state, action) => {
      state.messages = action.payload.messages.reverse();
      state.loading = false;
    },
  },
});

export const messageSelector = (state) => state.message;

export const {
  setUsers,
  sendMessage,
  addMessage,
  getConversation,
  setConversation,
  getMessage,
  setMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
