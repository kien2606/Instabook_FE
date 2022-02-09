import { CircularProgress, Grid } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  discoverSelector,
  getDiscoverPostLoading,
} from "../features/discover/discoverSlice";
import { useDispatch, useSelector } from "react-redux";

import PostThumbCard from "../components/profile/PostThumbCard";
import { authSelector } from "../features/auth/authSlice";

function Discover() {
  const dispatch = useDispatch();
  const { responseData } = useSelector(authSelector);
  const discoverState = useSelector(discoverSelector);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!discoverState.firstLoad) {
      dispatch(
        getDiscoverPostLoading({
          token: responseData?.token,
          page: 1,
          limit: 12,
          isFirstLoad: "true",
        })
      );
    }
  }, [dispatch, responseData?.token, discoverState.firstLoad]);
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (discoverState.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && discoverState.hasMore) {
          setPage((prevPage) => prevPage + 1);
          dispatch(
            getDiscoverPostLoading({
              token: responseData?.token,
              page: page + 1,
              limit: 12,
              isFirstLoad: "false",
            })
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      discoverState.loading,
      discoverState.hasMore,
      dispatch,
      page,
      responseData?.token,
    ]
  );
  //
  return (
    <>
      {discoverState.posts.length > 0 ? (
        <Grid
          className="post_thumb"
          container
          spacing={2}
          sx={{ marginTop: "16px" }}
        >
          {discoverState.posts.map((post, index) => {
            if (discoverState.posts.length === index + 1) {
              return (
                <PostThumbCard
                  key={index}
                  post={post}
                  refValue={lastPostElementRef}
                />
              );
            } else {
              return <PostThumbCard key={index} post={post} />;
            }
          })}
          {discoverState.loading && !discoverState.firstLoad && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: "32px",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </Grid>
      ) : (
        <div className="none_discovery_posts">
          No discovery posts to view recently
        </div>
      )}
    </>
  );
}

export default Discover;
