import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  loginLoading,
  logout,
  refreshToken,
  register,
  setAuthProcessFailed,
  setAuthProcessSuccess,
} from "./authSlice";

import { postDataApi } from "../../utils/fetchData";
import { postingDone } from "../post/postSlice";
import { toast } from "react-toastify";

function* handleRegisterUser(data) {
  try {
    const res = yield call(postDataApi, "register", data.payload);
    localStorage.setItem("first_login", true);
    yield put(setAuthProcessSuccess(res.data));
    toast.success(res.data.msg);
  } catch (error) {
    yield put(setAuthProcessFailed(error.response.data.msg));
    toast.error(error.response.data.msg);
  }
}

function* handleLoginUser(data) {
  try {
    const res = yield call(postDataApi, "login", data.payload);
    localStorage.setItem("first_login", true);
    toast.success(res.data.msg);
    yield put(setAuthProcessSuccess(res.data));
  } catch (error) {
    yield put(setAuthProcessFailed(error.response.data.msg));
    toast.error(error.response.data.msg);
  }
}

function* handleRefreshToken() {
  const first_login = localStorage.getItem("first_login");
  if (first_login) {
    try {
      const res = yield call(postDataApi, "refresh_token");
      yield put(setAuthProcessSuccess(res.data));
    } catch (error) {
      yield put(setAuthProcessFailed(error.response.data.msg));
      console.log(error.response.data.msg);
    }
  } else yield put(setAuthProcessFailed());
}

function* handleLogoutUser() {
  try {
    yield put(postingDone());
    localStorage.removeItem("first_login");
    yield call(postDataApi, "logout");
    window.location.href = "/";
  } catch (error) {
    console.log(error.response.data.msg);
  }
  yield;
}

export default function* authSaga() {
  yield takeLatest(register.type, handleRegisterUser);
  yield takeLatest(loginLoading.type, handleLoginUser);
  yield takeLatest(refreshToken.type, handleRefreshToken);
  yield takeLatest(logout.type, handleLogoutUser);
}
