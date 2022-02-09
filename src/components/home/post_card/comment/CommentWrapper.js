import React, { useState } from "react";

import CommentCard from "./CommentCard";

function CommentWrapper({ comment, post, replyCm }) {
  const [displayReplyComment, setDisplayReplyComment] = useState(2);
  const copyReplyCm = [...replyCm];
  return (
    <div className="comment_wrapper">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div style={{ marginLeft: "38px" }}>
          {copyReplyCm
            .reverse()
            .slice(0, displayReplyComment)
            .map((cm, index) => {
              return (
                <CommentCard
                  key={index}
                  comment={cm}
                  post={post}
                  commentId={comment._id}
                />
              );
            })}
          {displayReplyComment < replyCm.length && (
            <button
              className="btn_see_more_cmt"
              onClick={() => setDisplayReplyComment(displayReplyComment + 10)}
            >
              See more comment
            </button>
          )}
        </div>
      </CommentCard>
    </div>
  );
}

export default CommentWrapper;
