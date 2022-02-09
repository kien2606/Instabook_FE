import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";

import authSlice from "../features/auth/authSlice";
import commentSlice from "../features/comment/commentSlice";
import createSagaMiddleware from "redux-saga";
import discoverSlice from "../features/discover/discoverSlice";
import history from "../utils/history";
import messageSlice from "../features/message/messageSlice";
import notifySlice from "../features/notify/notifySlice";
import postSlice from "../features/post/postSlice";
import rootSaga from "./rootSaga";
import sUserSlice from "../features/suggestion_user/sUserSlice";
import socketSlice from "../features/socket/socketSlice";
import statusSlice from "../features/status/statusSlice";
import userSlice from "../features/user/userSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authSlice,
  notify: notifySlice,
  user: userSlice,
  status: statusSlice,
  post: postSlice,
  comment: commentSlice,
  discover: discoverSlice,
  sUser: sUserSlice,
  socket: socketSlice,
  message: messageSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);
