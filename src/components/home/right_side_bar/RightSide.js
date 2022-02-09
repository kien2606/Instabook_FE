import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import React from "react";
import { Tooltip } from "@mui/material";
import UserCard from "../../UserCard";
import { authSelector } from "../../../features/auth/authSlice";
import { getSuggestionsLoading } from "../../../features/suggestion_user/sUserSlice";
import { sUserSelector } from "../../../features/suggestion_user/sUserSlice";
import { useEffect } from "react";

function RightSide() {
  const { responseData } = useSelector(authSelector);
  const sUserState = useSelector(sUserSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuggestionsLoading(responseData.token));
  }, [responseData.token, dispatch]);
  return (
    <div className="right_side_bar">
      <div className="side_bar_header">
        <UserCard user={responseData.user} isUser={true} />
      </div>
      <div className="side_bar_user_suggestion">
        <div className="suggestion_header">
          <p>Suggestions For You</p>
          <Link to="/suggestion_user">See All</Link>
        </div>
        <div className="list_suggestion_user">
          {sUserState.users.length > 0 &&
            sUserState.users.map((user, index) => {
              return <UserCard user={user} key={index} />;
            })}
        </div>
      </div>
      <div className="right_side_bar_copyright">
        <div className="info_author">
          <p>Author : Vu Manh Kien</p>
          <p>Email : vumanhkien01@gmail.com</p>
          <p>Phone : 0961812900</p>
          <Tooltip title="https://www.facebook.com/vu.kien.79230305">
            <a href="https://www.facebook.com/vu.kien.79230305">Facebook</a>
          </Tooltip>
        </div>
        <div className="info_copyright">© 2022 INSTABOOK DESIGNED BY META </div>
      </div>
    </div>
  );
}

export default RightSide;
