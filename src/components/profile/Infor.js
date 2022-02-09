import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { authSelector } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/user/userSlice";

function Infor() {
  const { id } = useParams();
  const { responseData } = useSelector(authSelector); // this user is from auth store , it means mine
  const userProfile = useSelector(userSelector); // this user is from user store , it means other who you come to his/her profile
  const [profileUserData, setProfileUserData] = useState([]);
  const [onEditProfile, setOnEditProfile] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === responseData.user._id) {
      setProfileUserData([responseData.user]);
    } else {
      const userData = userProfile.users.filter((user) => user._id === id);
      setProfileUserData(userData);
    }
  }, [responseData.user, userProfile.users, id]);

  return (
    <div className="profile_info">
      {profileUserData.map((userInfo, index) => {
        return (
          <div className="info_container" key={index}>
            <Avatar
              alt={userInfo.username}
              src={userInfo.avatar}
              className="avatar_profile"
            />
            <div className="info_content">
              <div className="info_content_title">
                <h2>{userInfo.username}</h2>
                {responseData.user._id === id ? (
                  <Button
                    variant="outlined"
                    onClick={() => setOnEditProfile(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <FollowBtn user={userInfo} />
                )}
              </div>
              <div className="info_content_social">
                <p
                  className="social_interact"
                  onClick={() => setShowFollower(true)}
                >
                  {/* {responseData.user._id === id
                    ? responseData.user.followers.length
                    : userInfo.followers.length} */}
                  {userInfo.followers.length} followers
                </p>
                <p
                  className="social_interact"
                  onClick={() => setShowFollowing(true)}
                >
                  {responseData.user._id === id
                    ? responseData.user.following.length
                    : userInfo.following.length}{" "}
                  {/* {userInfo.following.length}  */}
                  following
                </p>
              </div>
              <div className="info_content_user">
                <div style={{ display: "flex" }}>
                  <h4 style={{ marginRight: "8px" }}>{userInfo.fullname}</h4>
                  {userInfo.mobile ? (
                    <h4> - {userInfo.mobile}</h4>
                  ) : responseData.user._id === id ? (
                    <button
                      className="info_btn_update"
                      onClick={() => setOnEditProfile(true)}
                    >
                      Update mobile ...
                    </button>
                  ) : (
                    <h4> - No information</h4>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#8e8e8e ",
                    fontSize: "14px",
                  }}
                >
                  {userInfo.address ? (
                    <p>{userInfo.address} -</p>
                  ) : responseData.user._id === id ? (
                    <button
                      className="info_btn_update"
                      onClick={() => setOnEditProfile(true)}
                    >
                      Update address ...
                    </button>
                  ) : (
                    <p>No information - </p>
                  )}
                  <p>&nbsp;{userInfo.email}</p>
                </div>

                <a href={userInfo.website} rel="noreferrer" target="_blank">
                  {userInfo.website}
                </a>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>Story : </p>
                <div
                  className="info_content_story"
                  style={{ textTransform: "capitalize", fontSize: "14px" }}
                >
                  &nbsp;{userInfo.story}
                </div>
              </div>

              {/* --------------------test field---------------------- */}
            </div>
            {onEditProfile && (
              <EditProfile setOnEditProfile={setOnEditProfile} />
            )}
            {showFollower && (
              <Followers
                // data={
                //   id === responseData.user._id
                //     ? responseData.user.followers
                //     : profileUserData[0].followers
                // }
                data={userInfo.followers}
                responseData={responseData}
                setShowFollower={setShowFollower}
              />
            )}
            {showFollowing && (
              <Following
                // data={
                //   id === responseData.user._id
                //     ? responseData.user.following
                //     : profileUserData[0].following
                // }
                data={userInfo.following}
                responseData={responseData}
                setShowFollowing={setShowFollowing}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Infor;
