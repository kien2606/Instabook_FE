import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Icons from "../../../Icons";
import { authSelector } from "../../../../features/auth/authSlice";
import { createNewComment } from "../../../../features/comment/commentSlice";
import { socketSelector } from "../../../../features/socket/socketSlice";

function Comment({ post, styleStatus, onReply, setOnReply }) {
  const [comment, setComment] = useState("");
  const { responseData } = useSelector(authSelector);
  const socket = useSelector(socketSelector).socketData;

  const dispatch = useDispatch();
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const newComment = {
      content: comment,
      likes: [],
      user: responseData.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    if (comment) {
      dispatch(createNewComment({ post, newComment, responseData, socket }));
      setComment("");
      if (onReply) return setOnReply(false);
    }
  };
  return (
    <div
      className={
        styleStatus === "reply_comment" ? "comment reply_comment" : "comment"
      }
    >
      <form onSubmit={handleSubmitComment}>
        <input
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder={
            onReply ? `Reply to ${onReply.user.username} ` : "Add a comment..."
          }
        />
        <div style={{ display: "flex" }}>
          <Icons setContent={setComment} content={comment} />
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default Comment;
