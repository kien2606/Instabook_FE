import React, { useEffect, useState } from "react";

import CommentWrapper from "./CommentWrapper";

function DisplayComment({ post }) {
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);
  const [displayComment, setDisplayComment] = useState(2);
  useEffect(() => {
    const listComment = post.comments.filter((cm) => !cm.reply);
    setComments(listComment);
  }, [post.comments]);

  useEffect(() => {
    const listReplyComment = post.comments.filter((cm) => cm.reply);
    setReplyComments(listReplyComment);
  }, [post.comments]);

  useEffect(() => {}, [post.comment]);
  const shallowCopyComment = [...comments];
  return (
    <div className="display_comment">
      {shallowCopyComment
        .reverse()
        .slice(0, displayComment)
        .map((comment, index) => {
          return (
            <CommentWrapper
              comment={comment}
              post={post}
              key={index}
              replyCm={replyComments.filter((cm) => cm.reply === comment._id)}
            />
          );
        })}
      {displayComment < comments.length && (
        <button
          className="btn_see_more_cmt"
          onClick={() => setDisplayComment(displayComment + 10)}
        >
          See more comment
        </button>
      )}
    </div>
  );
}

export default DisplayComment;
