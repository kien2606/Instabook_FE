import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  doneFirstLoad,
  getDiscoverPost,
  getDiscoverPostDone,
  getDiscoverPostLoading,
} from "./discoverSlice";

import { getDataApi } from "../../utils/fetchData";

function* handleGetDiscoverPost(payload) {
  const { token, page, limit, isFirstLoad } = payload.payload;
  try {
    const res = yield call(
      getDataApi,
      `posts_discover?page=${page}&limit=${limit}&isFirstLoad=${isFirstLoad}`,
      token
    );
    if (res.data.posts.length > 0) {
      yield put(
        getDiscoverPost({
          posts: res.data.posts,
          hasMore: res.data.posts.length > 0,
        })
      );
    } else {
      yield put(doneFirstLoad());
    }
  } catch (error) {
    console.log(error.message);
    yield put(getDiscoverPostDone());
  }
}

export default function* discoverSaga() {
  yield takeLatest(getDiscoverPostLoading.type, handleGetDiscoverPost);
}
