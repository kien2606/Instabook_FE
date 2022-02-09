import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Comment from "./Comment";
import CommentContent from "./CommentContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikeButton from "../../../LikeButton";
import MoreOptions from "../../../MoreOptions";
import { authSelector } from "../../../../features/auth/authSlice";
import moment from "moment";
import { updateComment } from "../../../../features/comment/commentSlice";

function CommentCard({ comment, commentId, post, children }) {
  const [editComment, setEditComment] = useState(false);
  const [content, setContent] = useState("");
  const [onReply, setOnReply] = useState(false);
  const dispatch = useDispatch();
  const { responseData } = useSelector(authSelector);
  const handleUpdateComment = async () => {
    await dispatch(
      updateComment({
        post,
        responseData,
        comment,
        content,
      })
    );
    setEditComment(false);
  };

  const handleReplyComment = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };
  useEffect(() => {
    setContent(comment.content);
  }, [comment.content]);

  return (
    <>
      <div className="specific_comment">
        <div className="comment_avatar">
          <Avatar alt={comment.user.username} src={comment.user.avatar} />
        </div>
        <div className="comment_content">
          <div className="comment_content_top">
            <p>{comment.user.username}</p>

            {editComment ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <CommentContent comment={comment} onReply={onReply} />
            )}
            {comment.likes.length > 0 && (
              <div className="count_reaction">
                <p> {comment.likes.length}</p>
                <FavoriteIcon
                  sx={{ fontSize: "15px", color: "#ED4956!important" }}
                />
              </div>
            )}
          </div>
          <div className="comment_content_bottom">
            {editComment ? (
              <>
                <button
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={handleUpdateComment}
                >
                  Update
                </button>
                <button
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditComment(false)}
                >
                  Cancel
                </button>
                <small>{moment(comment.createdAt).fromNow()}</small>
              </>
            ) : (
              <>
                <LikeButton
                  post={comment}
                  likeAction="comment"
                  postParent={post}
                />
                <button
                  onClick={handleReplyComment}
                  style={{ cursor: "pointer" }}
                >
                  {onReply ? "Cancel" : "Reply"}
                </button>
                <small>{moment(comment.createdAt).fromNow()}</small>
              </>
            )}
          </div>
        </div>
        <MoreOptions
          postOfComment={post}
          post={comment}
          className="comment_options"
          optionsAction="comment"
          setEditComment={setEditComment}
        />
      </div>
      {onReply && (
        <Comment
          styleStatus="reply_comment"
          post={post}
          onReply={onReply}
          setOnReply={setOnReply}
        />
      )}
      {children}
    </>
  );
}

export default CommentCard;
