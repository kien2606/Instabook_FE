import React, { useState } from "react";

function CommentContent({ comment }) {
  const [readMore, setReadMore] = useState(true);
  const convertComment =
    comment.content.length > 60 ? (
      readMore ? (
        <>
          {comment.content.slice(0, 60)} ...
          <span
            className="content_handle"
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            See more
          </span>
        </>
      ) : (
        <>
          {comment.content}
          <span
            className="content_handle"
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            &nbsp;See less
          </span>
        </>
      )
    ) : (
      comment.content
    );
  return (
    <div
      className="content"
      style={{ margin: 0, width: "380px", maxWidth: "98%" }}
    >
      {comment.tag && comment.tag._id !== comment.user._id ? (
        <div style={{ display: "flex" }}>
          <p>@{comment.tag.username}</p>
          <p>&nbsp; {convertComment}</p>
        </div>
      ) : (
        convertComment
      )}
    </div>
  );
}

export default CommentContent;
