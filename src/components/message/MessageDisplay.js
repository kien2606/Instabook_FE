import React from "react";
import { authSelector } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

function MessageDisplay({ user, msg }) {
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
      <div className="wrapper_msg">
        {msg.text && <div className="wrapper_text">{msg.text} </div>}
        {msg.images.length > 0 && (
          <div className="wrapper_images">
            {msg.images.map((image, index) => {
              return (
                <img
                  src={image.url}
                  alt={image.url}
                  key={index}
                  style={{ width: "100%", height: "100%" }}
                />
              );
            })}
          </div>
        )}
        <p style={{ color: "gray", fontSize: "12px", marginLeft: "10px" }}>
          {msg.createdAt}
        </p>
      </div>
    </div>
  );
}

export default MessageDisplay;
