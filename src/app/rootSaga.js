import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import commentSaga from "../features/comment/commentSaga";
import discoverSaga from "../features/discover/discoverSaga";
import messageSaga from "../features/message/messageSage";
import notifySaga from "../features/notify/notifySaga";
import postSaga from "../features/post/postSaga";
import sUserSaga from "../features/suggestion_user/sUserSaga";
import userSaga from "../features/user/userSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    postSaga(),
    commentSaga(),
    discoverSaga(),
    sUserSaga(),
    notifySaga(),
    messageSaga(),
  ]);
}
