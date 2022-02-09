import React, { useEffect, useState } from "react";
import { setUserLoading, userSelector } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import Infor from "../../components/profile/Infor";
import Posts from "../../components/profile/Posts";
import SavedPost from "../../components/profile/SavedPost";
import { authSelector } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";

function Profile() {
  const [saveTab, setSaveTab] = useState(false);
  const userProfile = useSelector(userSelector);
  const { id } = useParams();
  const { responseData } = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userProfile.users.every((user) => user._id !== id)) {
      dispatch(
        setUserLoading({
          id,
          responseData,
        })
      );
    }
  }, [dispatch, responseData, id, userProfile.users]);
  return (
    <div className="profile">
      {userProfile.loading ? (
        <div className="loading_search_users" style={{ marginTop: "16px" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Infor />
          {responseData.user._id === id ? (
            <div className="profile_tab">
              <button
                className={saveTab ? "" : "active"}
                onClick={() => setSaveTab(false)}
              >
                Posts
              </button>
              <button
                className={saveTab ? "active" : ""}
                onClick={() => setSaveTab(true)}
              >
                Saved
              </button>
            </div>
          ) : (
            <div className="profile_tab">
              <button className="active" onClick={() => setSaveTab(false)}>
                Posts
              </button>
            </div>
          )}
          {saveTab ? <SavedPost /> : <Posts />}
        </>
      )}
    </div>
  );
}

export default Profile;
