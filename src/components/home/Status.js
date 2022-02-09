import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import React from "react";
import { authSelector } from "../../features/auth/authSlice";
import { setOpen } from "../../features/status/statusSlice";

export default function Status() {
  const { responseData } = useSelector(authSelector);
  const dispatch = useDispatch();
  return (
    <div className="status">
      <div className="status_top">
        <Avatar src={responseData.user.avatar} />
        <button onClick={() => dispatch(setOpen(true))}>
          What is in your mind , {responseData.user.username}
        </button>
      </div>
      <div className="status_bottom">
        <div
          className="wrap_btn_status_open"
          onClick={() => dispatch(setOpen(true))}
        >
          <CameraAltIcon className="btn_open_status" /> Live Photo
        </div>
        <div
          className="wrap_btn_status_open"
          onClick={() => dispatch(setOpen(true))}
        >
          <InsertPhotoIcon className="btn_open_status" /> Photo/Video
        </div>
        <div
          className="wrap_btn_status_open"
          onClick={() => dispatch(setOpen(true))}
        >
          <EmojiEmotionsIcon className="btn_open_status" /> Feelings
        </div>
      </div>
    </div>
  );
}
