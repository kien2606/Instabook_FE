import React, { useEffect, useState } from "react";
import { follow, unfollow } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { authSelector } from "../features/auth/authSlice";
import { socketSelector } from "../features/socket/socketSlice";

function FollowBtn({ user, typeStyle }) {
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
  const { responseData } = useSelector(authSelector);
  const socket = useSelector(socketSelector).socketData;

  const handleFollow = () => {
    setFollowed(true);
    dispatch(follow({ user, responseData, socket }));
  };

  const handleUnFollow = () => {
    setFollowed(false);

    dispatch(unfollow({ user, responseData, socket }));
  };

  useEffect(() => {
    if (responseData.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
  }, [responseData.user.following, user._id]);

  return (
    <>
      {followed ? (
        <Button
          variant="outlined"
          color="error"
          onClick={handleUnFollow}
          sx={{ width: "120px" }}
          className={typeStyle === "suggestion_user" ? "suggestion_btn" : ""}
        >
          UnFollow
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={handleFollow}
          sx={{ width: "120px" }}
          className={typeStyle === "suggestion_user" ? "suggestion_btn" : ""}
        >
          Follow
        </Button>
      )}
    </>
  );
}

export default FollowBtn;
