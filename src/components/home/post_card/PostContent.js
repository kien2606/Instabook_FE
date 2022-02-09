import React, { useState } from "react";

import SlideImages from "./SlideImages";

function PostContent({ post }) {
  const [readMore, setReadMore] = useState(true);
  return (
    <div className="post_card_content">
      <div className="content">
        {post.content.length > 60 ? (
          readMore ? (
            <>
              {post.content.slice(0, 60)} ...
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
              {post.content}
              <span
                className="content_handle"
                onClick={() => {
                  setReadMore(!readMore);
                }}
              >
                See less
              </span>
            </>
          )
        ) : (
          post.content
        )}
      </div>
      {post.images.length > 0 && (
        <div className="slide_images">
          <SlideImages images={post.images} />
        </div>
      )}
    </div>
  );
}

export default PostContent;
