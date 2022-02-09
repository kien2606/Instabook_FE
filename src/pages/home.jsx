import CircularProgress from "@mui/material/CircularProgress";
import Posts from "../components/home/Posts";
import React from "react";
import RightSide from "../components/home/right_side_bar/RightSide";
import Status from "../components/home/Status";
import { postSelector } from "../features/post/postSlice";
import { useSelector } from "react-redux";

function Home() {
  const postState = useSelector(postSelector);
  return (
    <div className="home">
      <div className="wrapper_main_interact">
        <Status />

        {postState.loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "32px",
            }}
          >
            <CircularProgress />
          </div>
        ) : postState.total_posts === 0 ? (
          <h2 style={{ marginTop: "32px", textAlign: "center", width: "60%" }}>
            No Post Recently
          </h2>
        ) : (
          <Posts />
        )}
      </div>
      <div className="right_side">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
