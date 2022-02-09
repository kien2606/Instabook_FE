import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  createNotify,
  deleteAllNotifications,
  deleteNotify,
  gettingNotifies,
  readNotify,
  setDeleteAllNotifications,
  setNotifyData,
  setReadNotify,
} from "./notifySlice";
import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from "../../utils/fetchData";

// create 1 notify for each action like : post , comment , ... in saga file

function* handleCreateNotify(payload) {
  const { notifyData, responseData, socket } = payload.payload;
  try {
    const res = yield call(
      postDataApi,
      "notify",
      notifyData,
      responseData.token
    );
    const msg = {
      ...res.data.notify,
      user: {
        username: responseData.user.username,
        avatar: responseData.user.avatar,
      },
    };
    socket.emit("create_notify", msg);
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

// delete 1 notify for each action like : post , comment , ... in saga file

function* handleDeleteNotify(payload) {
  const { notifyData, responseData, socket } = payload.payload;
  try {
    yield call(deleteDataApi, `notify/${notifyData.id}`, responseData.token);
    const msg = {
      ...notifyData,
      user: {
        username: responseData.user.username,
        avatar: responseData.user.avatar,
      },
    };
    console.log({ msg });
    socket.emit("delete_notify", msg);
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleGetNotifyData(payload) {
  const { token } = payload.payload;
  try {
    const res = yield call(getDataApi, "notifies", token);
    yield put(setNotifyData(res.data.notifies));
    console.log("get notify", res);
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleReadNotify(payload) {
  const { notify, responseData } = payload.payload;
  const newData = {
    ...notify,
    unread: notify.unread.filter((uId) => uId !== responseData.user._id),
  };
  console.log({ notify, newData });
  yield put(setReadNotify(newData));
  try {
    yield call(
      patchDataApi,
      `read_notifies/${notify._id}`,
      null,
      responseData.token
    );
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleDeleteAll(payload) {
  const { responseData } = payload.payload;
  yield put(setDeleteAllNotifications([]));
  try {
    yield call(deleteDataApi, "delete_all_notifies", responseData.token);
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

export default function* notifySaga() {
  yield takeLatest(createNotify.type, handleCreateNotify);
  yield takeLatest(deleteNotify.type, handleDeleteNotify);
  yield takeLatest(gettingNotifies.type, handleGetNotifyData);
  yield takeLatest(readNotify.type, handleReadNotify);
  yield takeLatest(deleteAllNotifications.type, handleDeleteAll);
}
