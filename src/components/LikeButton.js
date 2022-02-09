import React, { useEffect, useState } from "react";
import { likeComment, unLikeComment } from "../features/comment/commentSlice";
import { likePost, unLikePost } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { authSelector } from "../features/auth/authSlice";
import { socketSelector } from "../features/socket/socketSlice";

function LikeButton({ post, likeAction, postParent }) {
  const [isLike, setIsLike] = useState(false);
  const { responseData } = useSelector(authSelector);
  const socket = useSelector(socketSelector).socketData;

  const dispatch = useDispatch();
  const handleLikePost = () => {
    setIsLike(true);
    if (likeAction === "comment") {
      dispatch(likeComment({ comment: post, responseData, post: postParent , socket }));
    } else {
      dispatch(likePost({ post, responseData, socket }));
    }
  };
  const handleUnLikePost = () => {
    setIsLike(false);
    if (likeAction === "comment") {
      dispatch(
        unLikeComment({ comment: post, responseData, post: postParent , socket })
      );
    } else {
      dispatch(unLikePost({ post, responseData, socket }));
    }
  };
  useEffect(() => {
    if (
      post.likes.length > 0 &&
      post.likes.find((user) => user._id === responseData.user._id)
    ) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, responseData.user._id]);
  return (
    <>
      {isLike ? (
        <FavoriteIcon
          sx={{ cursor: "pointer", color: "#ED4956!important" }}
          onClick={handleUnLikePost}
        />
      ) : (
        <FavoriteBorderIcon
          sx={{ cursor: "pointer" }}
          onClick={handleLikePost}
        />
      )}
    </>
  );
}

export default LikeButton;
