import React, { useEffect, useState } from "react";

import PostThumb from "./PostThumb";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/user/userSlice";

function Posts() {

  const { id } = useParams();
  const userProfile = useSelector(userSelector);
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postData = userProfile.posts.filter((post) => post.idUser === id);
    setPosts(postData[0]?.posts);
    setTotalPosts(postData[0]?.totalPost);
  }, [userProfile.posts, id]);
  return (
    <div className="posts_profile">
      {posts && posts.length > 0 ? (
        <PostThumb posts={posts} totalPosts={totalPosts} />
      ) : (
        <h2 style={{ textAlign: "center" }}>No Post</h2>
      )}
    </div>
  );
}

export default Posts;
