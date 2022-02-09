import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createNotify, deleteNotify } from "../notify/notifySlice";
import {
  follow,
  processFollowAndUnFollow,
  setProcessDone,
  setSavedPost,
  setUserLoading,
  setUserPosts,
  setUserSuccess,
  unfollow,
  updateProfileLoading,
} from "./userSlice";
import { getDataApi, patchDataApi } from "../../utils/fetchData";

import { imageUpload } from "../../utils/imageUpload";
import { setUser } from "../auth/authSlice";
import { toast } from "react-toastify";

function* handleGetUser(payload) {
  // argument : users
  const { id, responseData } = payload.payload;
  try {
    const res = yield call(getDataApi, `user/${id}`, responseData.token);
    const resPosts = yield call(
      getDataApi,
      `/user_posts/${id}`,
      responseData.token
    );
    const resSavePost = yield call(
      getDataApi,
      "save_posts",
      responseData.token
    );

    yield put(
      setUserPosts({
        posts: resPosts.data.posts,
        idUser: id,
        totalPost: resPosts.data.totalPost,
      })
    );
    yield put(setUserSuccess(res.data.user));
    yield put(
      setSavedPost({
        posts: resSavePost.data.posts,
        idUser: id,
        totalPost: resSavePost.data.totalPost,
      })
    );
  } catch (error) {
    yield put(setProcessDone());
    console.log(error);
  }
  yield put(setProcessDone());
}

function* handleUpdateProfile(payload) {
  const { userData, avatar, responseData } = payload.payload;
  try {
    let media;
    if (avatar) {
      media = yield call(imageUpload, [avatar]);
    }
    const res = yield call(
      patchDataApi,
      "user",
      {
        ...userData,
        avatar: avatar ? media[0].url : responseData.user.avatar,
      },
      responseData.token
    );
    toast.success(res.data.msg);
    yield put(
      setUser({
        ...responseData,
        user: {
          ...responseData.user,
          ...userData,
          avatar: avatar ? media[0].url : responseData.user.avatar,
        },
      })
    );
    yield put(setProcessDone());
  } catch (error) {
    yield put(setProcessDone());
    toast.error(error);
  }
  yield;
}

function* handleFollow(payload) {
  const { user, responseData, socket } = payload.payload;
  const addFollower = {
    ...user,
    followers: [...user.followers, responseData.user],
  };
  // it means follower in other user ++ and add you to list his/her followers
  yield put(processFollowAndUnFollow(addFollower));

  const addFollowing = {
    ...responseData.user,
    following: [...responseData.user.following, addFollower],
  };

  // console.log({ addFollower, addFollowing });
  // add user that you just follow in list your following
  yield put(
    setUser({
      ...responseData,
      user: addFollowing,
    })
  );
  // console.log({ addFollower, addFollowing });
  try {
    yield call(
      patchDataApi,
      `user/${user._id}/follow`,
      null,
      responseData.token
    );
    socket.emit("follow", user._id, addFollowing, addFollower);

    // create notify

    const notifyData = {
      id: responseData.user._id,
      text: "has started follow you",
      recipients: [addFollower._id],
      url: `/profile/${responseData.user._id}`,
    };
    yield put(createNotify({ notifyData, responseData, socket }));
  } catch (error) {
    console.log(error);
  }
  yield;
}

function* handleUnFollow(payload) {
  const { user, responseData, socket } = payload.payload;
  const removeFollower = {
    ...user,
    followers: user.followers.filter(
      (follower) => follower._id !== responseData.user._id
    ),
  };

  yield put(processFollowAndUnFollow(removeFollower));

  const removeFollowing = {
    ...responseData.user,
    following: responseData.user.following.filter(
      (followingId) => followingId._id !== user._id
    ),
  };
  yield put(
    setUser({
      ...responseData,
      user: removeFollowing,
    })
  );
  try {
    yield call(
      patchDataApi,
      `user/${user._id}/unfollow`,
      null,
      responseData.token
    );
    socket.emit("unfollow", user._id, removeFollowing, removeFollower);

    const notifyData = {
      id: responseData.user._id,
      text: "not follow anymore",
      recipients: [removeFollower._id],
      url: `/profile/${responseData.user._id}`,
    };
    yield put(deleteNotify({ notifyData, responseData, socket }));
  } catch (error) {
    console.log(error);
  }
}

export default function* userSaga() {
  yield takeLatest(setUserLoading.type, handleGetUser);
  yield takeLatest(updateProfileLoading.type, handleUpdateProfile);
  yield takeLatest(follow.type, handleFollow);
  yield takeLatest(unfollow.type, handleUnFollow);
}
