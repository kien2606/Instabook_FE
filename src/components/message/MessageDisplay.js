import React from "react";
import { authSelector } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

function MessageDisplay({ user }) {
  const { responseData } = useSelector(authSelector);
  return (
    <div className="display_message">
      {user._id === responseData.user._id ? (
        <img
          src={responseData.user.avatar}
          alt={responseData.user.username}
          className="avatar_message"
        />
      ) : (
        <img src={user.avatar} alt={user.username} className="avatar_message" />
      )}
      <div className="wrapper_message">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book

        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book

        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book
      </div>
    </div>
  );
}

export default MessageDisplay;
