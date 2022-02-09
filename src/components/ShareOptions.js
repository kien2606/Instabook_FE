import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
} from "react-share";

import React from "react";

function ShareOptions({ postUrl }) {
  return (
    <div className="share_options">
      <FacebookShareButton url="google.com" style={{ display: "flex" }}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>

      <FacebookMessengerShareButton url={postUrl} style={{ display: "flex" }}>
        <FacebookMessengerIcon round={true} size={32} />
      </FacebookMessengerShareButton>

      <EmailShareButton url={postUrl} style={{ display: "flex" }}>
        <EmailIcon round={true} size={32} />
      </EmailShareButton>
    </div>
  );
}

export default ShareOptions;
