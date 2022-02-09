import CloseIcon from "@mui/icons-material/Close";
import FollowBtn from "../FollowBtn";
import React from "react";
import { useClickOutside } from "../../utils/common";
import { useHistory } from "react-router-dom";

function Followers({ data, responseData, setShowFollower }) {
  let domNode = useClickOutside(() => {
    setShowFollower(false);
  });
  const history = useHistory();
  const handleRedirectUser = (userId) => {
    history.push(`/profile/${userId}`);
    setShowFollower(false);
  };
  return (
    <div className="card_social_interact">
      <div ref={domNode} className="wrapper_card">
        <div className="card_header">
          <p>Followers</p>
          <CloseIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              setShowFollower(false);
            }}
          />
        </div>
        <hr style={{ margin: "8px 0" }} />
        {data.length > 0 ? (
          data.map((user, index) => {
            return (
              <div className="card_content" key={index}>
                <div className="card_content_info">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                    }}
                  />
                  <div>
                    <p onClick={() => handleRedirectUser(user._id)}>
                      {user.username}
                    </p>
                    <p style={{ color: "#9e9e9e" }}>{user.fullname}</p>
                  </div>
                </div>
                {responseData.user._id !== user._id && (
                  <FollowBtn user={user} />
                )}
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "crimson",
            }}
          >
            You have no followers
          </div>
        )}
      </div>
    </div>
  );
}

export default Followers;
