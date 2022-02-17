import React from "react";
import { useHistory } from "react-router-dom";

function ContactFieldUser({ user, id }) {
  const history = useHistory();
  const handleClickUser = () => {
    history.push(`/message/${user._id}`);
  };
  return (
    <div
      className={
        user._id === id
          ? "user_card user_message active"
          : "user_card user_message"
      }
      //   className="user_card user_message"
      onClick={handleClickUser}
    >
      <div className="user_card_left">
        <img src={user.avatar} alt={user.username} className={"big_avatar"} />
        <div className="user_card_info">
          <p>{user.username}</p>
          {user.text && <p>{user.text}</p>}
        </div>
      </div>
    </div>
  );
}

export default ContactFieldUser;
