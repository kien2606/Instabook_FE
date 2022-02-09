import {
  all,
  call,
  put,
  putResolve,
  takeLatest,
} from "@redux-saga/core/effects";
import {
  createNewComment,
  deleteComment,
  likeComment,
  unLikeComment,
  updateComment,
} from "./commentSlice";
import { createNotify, deleteNotify } from "../notify/notifySlice";
import {
  deleteDataApi,
  patchDataApi,
  postDataApi,
} from "../../utils/fetchData";

import { toast } from "react-toastify";
import { updatePost } from "../post/postSlice";

function* handleCreateNewComment(payload) {
  const { post, newComment, responseData, socket } = payload.payload;
  try {
    const sendData = {
      ...newComment,
      postId: post._id,
      postUserId: post.user._id,
    };
    const res = yield call(
      postDataApi,
      "comment",
      sendData,
      responseData.token
    );
    const commentData = { ...res.data.newComment, user: responseData.user };

    const newPost = {
      ...post,
      comments: [...post.comments, commentData],
    };
    yield put(updatePost(newPost));
    socket.emit("create_comment", newPost);

    // Create post notify

    const notifyData = {
      id: commentData._id,
      text: commentData.reply
        ? "mentioned you in a comment"
        : "has commented on your post",
      recipients: commentData.reply ? [commentData.tag._id] : [post.user._id],
      url: `/post/${commentData.postId}`,
    };
    yield put(createNotify({ notifyData, responseData, socket }));
  } catch (error) {
    toast.error(error.message);
  }
}

function* handleLikeComment(payload) {
  const { comment, post, responseData, socket } = payload.payload;

  const newComment = {
    ...comment,
    likes: [...comment.likes, responseData.user],
  };
  const newCommentPost = {
    ...post,
    comments: post.comments.map((comment) =>
      comment._id === newComment._id ? newComment : comment
    ),
  };
  yield put(updatePost(newCommentPost));
  try {
    yield call(
      patchDataApi,
      `comment/like/${comment._id}`,
      null,
      responseData.token
    );
    socket.emit("like_comment", newCommentPost);
  } catch (error) {
    console.log(error.message);
  }
}

function* handleUnLikeComment(payload) {
  const { post, comment, responseData, socket } = payload.payload;
  const newComment = {
    ...comment,
    likes: comment.likes.filter((cm) => cm._id !== responseData.user._id),
  };
  const newCommentPost = {
    ...post,
    comments: post.comments.map((comment) =>
      comment._id === newComment._id ? newComment : comment
    ),
  };
  yield put(updatePost(newCommentPost));
  try {
    const res = yield call(
      patchDataApi,
      `comment/unlike/${comment._id}`,
      null,
      responseData.token
    );
    socket.emit("unlike_comment", newCommentPost);

    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
}

function* handleUpdateComment(payload) {
  const { post, responseData, comment, content } = payload.payload;
  const newComment = { ...comment, content };
  console.log(comment, newComment);
  const newPost = {
    ...post,
    comments: post.comments.map((comment) =>
      comment._id === newComment._id ? newComment : comment
    ),
  };

  try {
    const res = yield call(
      patchDataApi,
      `comment/${comment._id}`,
      { content },
      responseData.token
    );
    console.log(res);
    yield put(updatePost(newPost));
  } catch (error) {
    console.log(error.message);
  }
  yield;
}

function* handleDeleteComment(payload) {
  const { post, comment, responseData, socket } = payload.payload;
  const deleteArr = [
    ...post.comments.filter((cm) => cm.reply === comment._id),
    comment,
  ];
  const newPost = {
    ...post,
    comments: post.comments.filter(
      (cm) => !deleteArr.find((cm1) => cm1._id === cm._id)
    ),
  };
  yield put(updatePost(newPost));
  socket.emit("delete_comment", newPost);

  try {
    const deleteComment = deleteArr.map((item) =>
      call(deleteDataApi, `comment/${item._id}`, responseData.token)
    );

    const deleteCommentNotify = deleteArr.map((item) => {
      const notifyData = {
        id: item._id,
        text: item.reply ? "delete reply comment" : "delete comment",
        recipients: item.reply ? [item.tag._id] : [post.user._id],
        url: `/post/${comment.postId}`,
      };
      return putResolve(deleteNotify({ notifyData, responseData, socket }));
    });

    yield all(deleteComment);
    yield all(deleteCommentNotify);
    // create notify

    // for (let i = 0; i < deleteArr.length; i++) {
    //   const notifyData = {
    //     id: deleteArr[i]._id,
    //     text: deleteArr[i].reply ? "delete reply comment" : "delete comment",
    //     recipients: deleteArr[i].reply
    //       ? [deleteArr[i].tag._id]
    //       : [post.user._id],
    //     url: `/post/${comment.postId}`,
    //   };
    //   yield putResolve(deleteNotify({ notifyData, responseData, socket }));
    // }
  } catch (error) {
    console.log(error);
  }
}

export default function* commentSaga() {
  yield takeLatest(createNewComment.type, handleCreateNewComment);
  yield takeLatest(likeComment.type, handleLikeComment);
  yield takeLatest(unLikeComment.type, handleUnLikeComment);
  yield takeLatest(updateComment.type, handleUpdateComment);
  yield takeLatest(deleteComment.type, handleDeleteComment);
}
