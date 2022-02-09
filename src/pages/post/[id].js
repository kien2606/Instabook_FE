import React, { useEffect } from "react";
import {
  postSelector,
  setSpecificPostLoading,
} from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import PostCard from "../../components/home/post_card/PostCard";
import { authSelector } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const { responseData } = useSelector(authSelector);
  const postState = useSelector(postSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSpecificPostLoading({ id, responseData }));
  }, [id, dispatch, responseData]);

  return (
    <div className="specific_post">
      {postState.specificPost.length > 0 ? (
        <PostCard
          post={postState.specificPost[0]}
          reuseComponent="reuse_specific_post"
        />
      ) : (
        <div className="loading_search_users" style={{ marginTop: "16px" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Post;
