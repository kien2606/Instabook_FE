import { Card } from "@mui/material";
import Comment from "./comment/Comment";
import DisplayComment from "./comment/DisplayComment";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import React from "react";

function PostCard({ post, reuseComponent }) {
  return (
    <Card
      className={
        reuseComponent === "reuse_specific_post"
          ? "post_card reuse_specific_post"
          : "post_card"
      }
    >
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostFooter post={post} />
      {post.comments.length > 0 && <DisplayComment post={post} />}
      <Comment post={post} />
    </Card>
  );
}

export default PostCard;
