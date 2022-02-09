import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React from "react";
import { authSelector } from "../../features/auth/authSlice";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function ContactField({ setOpenSearch, users }) {
  const { responseData } = useSelector(authSelector);
  const history = useHistory();
  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  return (
    <div className="contact_field">
      <div className="new_message">
        <p>{responseData.user.username}</p>
        <OpenInNewIcon
          sx={{ cursor: "pointer", flex: "0.2" }}
          onClick={handleOpenSearch}
        />
      </div>
      <div className="list_message_user">
        {users.map((user, index) => {
          return (
            <div
              className="user_card user_message"
              key={index}
              onClick={() => {
                history.push(`/message/${user._id}`);
              }}
            >
              <div className="user_card_left">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className={"big_avatar"}
                />
                <div className="user_card_info">
                  {/* <Link to={`/profile/${user._id}`}>{user.username}</Link> */}
                  <p>{user.username}</p>
                  <p>{user.fullname}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactField;
