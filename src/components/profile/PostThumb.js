import { Grid } from "@mui/material";
import PostThumbCard from "./PostThumbCard";
import React from "react";

function PostThumb({ posts, totalPosts }) {
  return (
    <Grid className="post_thumb" container spacing={2}>
      {posts.map((post, index) => {
        return <PostThumbCard key={index} post={post} />;
      })}
    </Grid>
  );
}

export default PostThumb;
