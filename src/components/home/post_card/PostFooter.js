import React, { useEffect, useState } from "react";
import { savePost, unSavePost } from "../../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";

import LikeButton from "../../LikeButton";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import ShareOptions from "../../ShareOptions";
import { Tooltip } from "@mui/material";
import { authSelector } from "../../../features/auth/authSlice";
import { baseUrl } from "../../../utils/common";
import { useHistory } from "react-router-dom";

function PostFooter({ post }) {
  const [isShare, setIsShare] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { responseData } = useSelector(authSelector);
  const handleSharePost = () => {
    setIsShare(!isShare);
  };
  const handleRedirectSpecificPost = () => {
    history.push(`/post/${post._id}`);
  };
  useEffect(() => {
    if (responseData.user.savedPost.find((id) => id === post._id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [responseData.user.savedPost, post._id]);
  return (
    <div className="post_footer">
      <div className="post_footer_top">
        <div className="post_footer_top_left">
          <LikeButton post={post} />
          <Tooltip title="View post">
            <div style={{ padding: "0 8px" }}>
              <i
                onClick={handleRedirectSpecificPost}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                className="far fa-comment"
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="Share post">
            <NearMeOutlinedIcon
              onClick={handleSharePost}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
        {isSaved ? (
          <Tooltip title="Unsave post">
            <i
              className="fas fa-bookmark"
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(unSavePost({ post, responseData }))}

            ></i>
          </Tooltip>
        ) : (
          <Tooltip title="Save post">
            <i
              className="far fa-bookmark"
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(savePost({ post, responseData }))}
            ></i>
 
          </Tooltip>
        )}
      </div>
      {isShare && <ShareOptions postUrl={`${baseUrl}/post/${post._id}`} />}
      <div className="post_footer_bottom">
        <p style={{ paddingLeft: "7px" }}>{post.likes.length} likes</p>
        <p>{post.comments.length} comments</p>
      </div>
    </div>
  );
}

export default PostFooter;
