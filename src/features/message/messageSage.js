import {
  addMessage,
  getConversation,
  getMessage,
  sendMessage,
  setConversation,
  setMessage,
} from "./messageSlice";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getDataApi, postDataApi } from "../../utils/fetchData";

import { imageUpload } from "../../utils/imageUpload";

function* handleSendMessage(payload) {
  const { msg, responseData, socket } = payload.payload;
  let media = [];

  try {
    if (msg.images.length > 0) media = yield call(imageUpload, msg.images);
    const newMsg = { ...msg, images: media };
    yield put(addMessage(newMsg));
    yield call(postDataApi, "message", newMsg, responseData.token);
    socket.emit("send_message", newMsg);
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleGetConversation(payload) {
  const { responseData } = payload.payload;
  try {
    const res = yield call(getDataApi, "conversations", responseData.token);
    const listMessagesUser = [];
    res.data.conversations.forEach((data) =>
      data.recipients.forEach((user) => {
        if (user._id !== responseData.user._id) {
          listMessagesUser.push({
            ...user,
            text: data.text,
            images: data.images,
          });
        }
      })
    );
    yield put(setConversation(listMessagesUser));
  } catch (error) {
    console.log(error.message);
  }
}

function* handleGetMessage(payload) {
  const { id, responseData } = payload.payload;
  try {
    const res = yield call(getDataApi, `message/${id}`, responseData.token);
    yield put(setMessage(res.data));
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

export default function* messageSaga() {
  yield takeLatest(sendMessage.type, handleSendMessage);
  yield takeLatest(getConversation.type, handleGetConversation);
  yield takeLatest(getMessage.type, handleGetMessage);
}
