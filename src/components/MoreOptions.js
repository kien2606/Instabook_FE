import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { authSelector } from "../features/auth/authSlice";
import { deleteComment } from "../features/comment/commentSlice";
import { deletePostProcess } from "../features/post/postSlice";
import { setOnEdit } from "../features/status/statusSlice";
import { socketSelector } from "../features/socket/socketSlice";
import { useHistory } from "react-router-dom";

function MoreOptions({
  post,
  className,
  optionsAction,
  setEditComment,
  postOfComment,
}) {
  const { responseData } = useSelector(authSelector);
  const socket = useSelector(socketSelector).socketData;

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleEditPost = () => {
    if (optionsAction === "comment") {
      setEditComment(true);
    } else {
      dispatch(setOnEdit({ currentPost: post, isEdit: true }));
    }
  };
  const handleDeletePost = () => {
    if (optionsAction === "comment") {
      dispatch(
        deleteComment({
          comment: post,
          post: postOfComment,
          responseData,
          socket,
        })
      );
    } else {
      if (window.confirm("Are you sure want to delete this post?")) {
        dispatch(deletePostProcess({ post, responseData, socket }));
        history.push("/");
      }
    }
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={className ? className : ""}>
      <IconButton aria-label="more" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {responseData.user._id === post.user._id && (
          <div>
            <MenuItem onClick={handleEditPost}>
              <EditIcon sx={{ marginRight: "16px" }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDeletePost}>
              <DeleteIcon sx={{ marginRight: "16px" }} /> Delete
            </MenuItem>
          </div>
        )}
        {responseData.user._id !== post.user._id && (
          <div>
            <MenuItem>
              <CancelPresentationIcon sx={{ marginRight: "16px" }} /> Do
              Something with &nbsp;
              {post.user.username}
            </MenuItem>
          </div>
        )}
        {optionsAction === "comment" &&
          responseData.user._id !== post.user._id &&
          responseData.user._id === postOfComment.user._id && (
            <div>
              <MenuItem onClick={handleDeletePost}>
                <DeleteIcon sx={{ marginRight: "16px" }} /> Delete
              </MenuItem>
            </div>
          )}
      </Menu>
    </div>
  );
}

export default MoreOptions;
