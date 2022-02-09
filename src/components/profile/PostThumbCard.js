import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

function PostThumbCard({ post, refValue }) {
  return (
    <Grid item xs={4} ref={refValue}>
      <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
        <div className="post_thumb_display">
          {post.images.length > 0 ? (
            <div className="post_thumb_img">
              <img src={post.images[0].url} alt={post.images[0].url} />
            </div>
          ) : (
            <div className="post_thumb_no_img">This post has no image</div>
          )}
          <div className="post_thumb_reaction">
            <div style={{ display: "flex", alignItems: "center" }}>
              <FavoriteIcon /> &nbsp;
              {post.likes.length}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <i
                className="fas fa-comment"
                style={{ fontSize: "20px", marginLeft: "16px" }}
              ></i>
              <p>&nbsp;&nbsp;{post.comments.length}</p>
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  );
}

export default PostThumbCard;
