import React, { useEffect } from "react";
import { authSelector, setUser } from "./features/auth/authSlice";
import { rtCreateNotify, rtDeleteNotify } from "./features/notify/notifySlice";
import { useDispatch, useSelector } from "react-redux";

import { socketSelector } from "./features/socket/socketSlice";
import { updatePost } from "./features/post/postSlice";
import {
  userSelector
} from "./features/user/userSlice";

function SocketClient() {
  const { responseData } = useSelector(authSelector);
  const { users } = useSelector(userSelector);

  const socket = useSelector(socketSelector).socketData;
  const dispatch = useDispatch();
  // join_user

  useEffect(() => {
    socket.emit("join_user", responseData.user._id);
  }, [responseData.user._id, socket]);
  //like

  useEffect(() => {
    socket.on("like_to_client", (post) => {
      dispatch(updatePost(post));
    });
    return () => socket.off("like_to_client");
  }, [socket, dispatch]);

  // unlike
  useEffect(() => {
    socket.on("unlike_to_client", (post) => {
      dispatch(updatePost(post));
    });
    return () => socket.off("unlike_to_client");
  }, [socket, dispatch]);

  // create new comment
  useEffect(() => {
    socket.on("create_comment_to_client", (post) => {
      dispatch(updatePost(post));
    });
    return () => socket.off("create_comment_to_client");
  }, [socket, dispatch]);

  // delete comment

  useEffect(() => {
    socket.on("delete_comment_to_client", (post) => {
      dispatch(updatePost(post));
    });
    return () => socket.off("delete_comment_to_client");
  }, [socket, dispatch]);

  // like comment

  useEffect(() => {
    socket.on("like_comment_to_client", (post) => {
      dispatch(updatePost(post));
    });
    return () => socket.off("like_comment_to_client");
  }, [socket, dispatch]);

  // unlike comment

  useEffect(() => {
    socket.on("unlike_comment_to_client", (post) => {
      dispatch(updatePost(post));
    });
    return () => socket.off("unlike_comment_to_client");
  }, [socket, dispatch]);

  //follow
  useEffect(() => {
    socket.on("follow_to_client", (userId, addFollowing) => {
      // console.log({ userId, addFollowing });
      // const user = users.find((user) => user._id === userId);
      const user = { ...responseData.user };
      // console.log({ user });
      const newData = { ...user, followers: [...user.followers, addFollowing] };
      // console.log({ newData });
      dispatch(setUser({ ...responseData, user: newData }));
    });
    return () => socket.off("follow_to_client");
  }, [socket, dispatch, users, responseData.user, responseData]);

  //unfollow

  useEffect(() => {
    socket.on("unfollow_to_client", (userId, removeFollowing) => {
      // console.log({ userId, removeFollowing });

      // const user = users.find((user) => user._id === userId);
      const user = { ...responseData.user };

      // console.log(user);
      const newData = {
        ...user,
        followers: user.followers.filter(
          (userId) => userId._id !== removeFollowing._id
        ),
      };
      dispatch(setUser({ ...responseData, user: newData }));
    });
    return () => socket.off("unfollow_to_client");
  }, [socket, dispatch, users, responseData.user, responseData]);

  // create notify
  useEffect(() => {
    socket.on("create_notify_to_client", (msg) => {
      dispatch(rtCreateNotify(msg));
    });
    return () => socket.off("create_notify_to_client");
  }, [socket, dispatch]);

  // detele notify

  useEffect(() => {
    socket.on("delete_notify_to_client", (msg) => {
      // console.log({ msg });
      dispatch(rtDeleteNotify(msg));
    });
    return () => socket.off("delete_notify_to_client");
  }, [socket, dispatch]);

  return <></>;
}

export default SocketClient;
