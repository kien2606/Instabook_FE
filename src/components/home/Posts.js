import React, { useCallback, useRef, useState } from "react";
import {
  postSelector,
  scrollInfinityPosts,
} from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import PostCard from "./post_card/PostCard";
import { authSelector } from "../../features/auth/authSlice";

function Posts() {
  const { posts } = useSelector(postSelector);
  const { infinityScrollPost } = useSelector(postSelector);
  const { responseData } = useSelector(authSelector);

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (infinityScrollPost.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && infinityScrollPost.hasMore) {
          setPage((prevPage) => prevPage + 1);
          dispatch(
            scrollInfinityPosts({ token: responseData?.token, page: page + 1 })
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      dispatch,
      infinityScrollPost.loading,
      infinityScrollPost.hasMore,
      page,
      responseData?.token,
    ]
  );

  return (
    <div className="posts">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={index}>
              <PostCard post={post} />
            </div>
          );
        } else {
          return <PostCard key={index} post={post} />;
        }
      })}
      {infinityScrollPost.loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "16px 0",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Posts;
