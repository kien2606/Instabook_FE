import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createNotify, deleteNotify } from "../notify/notifySlice";
import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from "../../utils/fetchData";
import {
  deletePost,
  deletePostProcess,
  getPost,
  gettingPostProcess,
  likePost,
  postingDone,
  postingProcess,
  savePost,
  scrollInfinityPosts,
  setPost,
  setSpecificPost,
  setSpecificPostLoading,
  unLikePost,
  unSavePost,
  updatePost,
  updatePostProcess,
} from "./postSlice";
import { setOnEditDone, setOpen } from "../status/statusSlice";

import { imageUpload } from "../../utils/imageUpload";
import { setAuthProcessSuccess } from "../auth/authSlice";
import { toast } from "react-toastify";

function* handleStartPosting(payload) {
  const { content, images, responseData, socket } = payload.payload;
  let media = [];
  try {
    if (images.length > 0) media = yield call(imageUpload, images);
    const res = yield call(
      postDataApi,
      "posts",
      { content, images: media },
      responseData.token
    );
    yield put(setPost({ ...res.data.post, user: responseData.user }));
    yield put(setOpen(false));

    // Create post notify

    const notifyData = {
      id: res.data.post._id,
      text: "added a new post",
      recipients: res.data.post.user.followers,
      url: `/post/${res.data.post._id}`,
    };
    yield put(createNotify({ notifyData, responseData, socket }));
  } catch (error) {
    toast.error(error.response.data.msg);
    yield put(postingDone());
    yield put(setOpen(false));
  }
}

function* handleGettingPost(payload) {
  const { token, page } = payload.payload;
  try {
    if (token) {
      const res = yield call(getDataApi, `posts?page=${page}`, token);
      yield put(
        getPost({
          res: res.data,
          scrollPost: { loading: false, hasMore: res.data.posts.length > 0 },
        })
      );
    }
  } catch (error) {
    toast.error(error.response.data.msg);
    yield put(postingDone());
  }
}

function* handleUpdatePost(payload) {
  const { content, images, responseData, statusState } = payload.payload;
  const { currentPost } = statusState;
  let media = [];
  const newImage = images.filter((img) => !img.url);
  const oldImage = images.filter((img) => img.url);
  if (
    content === currentPost.content &&
    newImage.length === 0 &&
    oldImage.length === currentPost.images.length
  ) {
    yield put(setOpen(false));
    yield put(postingDone());
    return;
  }
  try {
    if (newImage.length > 0) media = yield call(imageUpload, newImage);
    const res = yield call(
      patchDataApi,
      `posts/${currentPost._id}`,
      { content, images: [...oldImage, ...media] },
      responseData.token
    );

    yield put(setOnEditDone());
    yield put(updatePost(res.data.newPost));
  } catch (error) {
    toast.error(error.message);
    yield put(setOpen(false));
    yield put(postingDone());
  }
}

function* handleLikePost(payload) {
  const { post, responseData, socket } = payload.payload;
  const newPost = { ...post, likes: [...post.likes, responseData.user] };
  try {
    yield call(patchDataApi, `post/like/${post._id}`, null, responseData.token);
    yield put(updatePost(newPost));
    socket.emit("like_post", newPost);

    // Create post notify

    const notifyData = {
      id: responseData.user._id,
      text: "like your post",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };
    yield put(createNotify({ notifyData, responseData, socket }));

  } catch (error) {
    toast.error(error.message);
  }
}

function* handleUnlikePost(payload) {
  const { post, responseData, socket } = payload.payload;
  const newPost = {
    ...post,
    likes: post.likes.filter((user) => user._id !== responseData.user._id),
  };
  try {
    yield call(
      patchDataApi,
      `post/unlike/${post._id}`,
      null,
      responseData.token
    );
    yield put(updatePost(newPost));
    socket.emit("unlike_post", newPost);

     // Create post notify

     const notifyData = {
      id: responseData.user._id,
      text: "unlike your post",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };
    yield put(deleteNotify({ notifyData, responseData, socket }));

  } catch (error) {
    toast.error(error.message);
  }
}

function* handleDeletePost(payload) {
  const { post, responseData, socket } = payload.payload;
  try {
    const res = yield call(
      deleteDataApi,
      `posts/${post._id}`,
      responseData.token
    );
    yield put(deletePost(post));

    // Delete post notify

    const notifyData = {
      id: res.data.post._id,
      text: "remove post",
      recipients: res.data.post.user.followers,
      url: `/post/${res.data.post._id}`,
    };
    yield put(deleteNotify({ notifyData, responseData, socket }));
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleSetSpecificPost(payload) {
  const { id, responseData } = payload.payload;
  try {
    const res = yield call(getDataApi, `/post/${id}`, responseData.token);
    yield put(setSpecificPost([res.data.post]));
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleSavePost(payload) {
  const { post, responseData: currentUser } = payload.payload;
  const newCurrentUser = {
    ...currentUser.user,
    savedPost: [...currentUser.user.savedPost, post._id],
  };
  yield put(
    setAuthProcessSuccess({
      access_token: currentUser.token,
      user: newCurrentUser,
      msg: "",
    })
  );
  try {
    yield call(patchDataApi, `/save_post/${post._id}`, null, currentUser.token);
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleUnSavePost(payload) {
  const { post, responseData: currentUser } = payload.payload;
  const newCurrentUser = {
    ...currentUser.user,
    savedPost: currentUser.user.savedPost.filter((id) => id !== post._id),
  };
  yield put(
    setAuthProcessSuccess({
      access_token: currentUser.token,
      user: newCurrentUser,
      msg: "",
    })
  );
  try {
    yield call(
      patchDataApi,
      `/unSave_post/${post._id}`,
      null,
      currentUser.token
    );
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

export default function* postSaga() {
  yield takeLatest(postingProcess.type, handleStartPosting);
  yield takeLatest(gettingPostProcess.type, handleGettingPost);
  yield takeLatest(scrollInfinityPosts.type, handleGettingPost);
  yield takeLatest(updatePostProcess.type, handleUpdatePost);
  yield takeLatest(likePost.type, handleLikePost);
  yield takeLatest(unLikePost.type, handleUnlikePost);
  yield takeLatest(deletePostProcess.type, handleDeletePost);
  yield takeLatest(setSpecificPostLoading.type, handleSetSpecificPost);
  yield takeLatest(savePost.type, handleSavePost);
  yield takeLatest(unSavePost.type, handleUnSavePost);
}
