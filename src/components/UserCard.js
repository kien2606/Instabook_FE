import FollowBtn from "./FollowBtn";
import { Link } from "react-router-dom";
import React from "react";

function UserCard({ user, isUser }) {
  return (
    <div className="user_card">
      <div className="user_card_left">
        <img
          src={user.avatar}
          alt={user.username}
          className={isUser ? "big_avatar" : "small_avatar"}
        />
        <div className="user_card_info">
          <Link to={`/profile/${user._id}`}>{user.username}</Link>
          <p>{user.fullname}</p>
        </div>
      </div>
      <div className="user_card_right">
        {isUser ? (
          <Link to={`/profile/${user._id}`}>See Profile</Link>
        ) : (
          <FollowBtn user={user} typeStyle="suggestion_user" />
        )}
      </div>
    </div>
  );
}

export default UserCard;
