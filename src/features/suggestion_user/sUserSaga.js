import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  getSuggestionsDone,
  getSuggestionsLoading,
  setSuggestionsUser,
} from "./sUserSlice";

import { getDataApi } from "../../utils/fetchData";

function* handleGetSuggestionsData(payload) {
  const token = payload.payload;
  try {
    const res = yield call(getDataApi, "user/suggestion_user", token);
    yield put(setSuggestionsUser(res.data.userSuggestion));
  } catch (error) {
    console.log(error.message);
    yield put(getSuggestionsDone());
  }
  yield;
}

export default function* sUserSaga() {
  yield takeLatest(getSuggestionsLoading.type, handleGetSuggestionsData);
  yield;
}
