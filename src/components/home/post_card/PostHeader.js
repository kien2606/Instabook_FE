import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import MoreOptions from "../../MoreOptions";
import React from "react";
import moment from "moment";

function PostHeader({ post }) {
  return (
    <div className="post_card_header">
      <div className="header_info">
        <Avatar src={post.user.avatar} alt={post.user.username} />
        <div className="info_name">
          {/* <h5>{post.user.username}</h5> */}
          <Link className="info_name_user" to={`/profile/${post.user._id}`}>{post.user.username}</Link>
          <small>{moment(post.createdAt).fromNow()}</small>
        </div>
      </div>
      <div className="options">
        <MoreOptions post={post} />
      </div>
    </div>
  );
}

export default PostHeader;
