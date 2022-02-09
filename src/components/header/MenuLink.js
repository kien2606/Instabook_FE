import { IconButton, Tooltip } from "@mui/material";

import Box from "@mui/material/Box";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import NearMeIcon from "@mui/icons-material/NearMe";
import NotifyDisplay from "./NotifyDisplay";
import React from "react";
import { authSelector } from "../../features/auth/authSlice";
import { notifySelector } from "../../features/notify/notifySlice";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

function MenuLink() {
  const notifyState = useSelector(notifySelector);
  const { responseData } = useSelector(authSelector);
  const listIconsLink = [
    { icon: <HomeIcon />, path: "/", title: "Home" },
    { icon: <NearMeIcon />, path: "/message", title: "Message" },
    { icon: <ExploreIcon />, path: "/discover", title: "Discover" },
    // { icon: <FavoriteIcon />, path: "/notify" },
  ];
  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box className="wrap_link_icons">
        {listIconsLink.map((specific_icon, index) => {
          return (
            <Tooltip key={index} title={specific_icon.title}>
              <Link to={`${specific_icon.path}`} className="link_icon">
                <IconButton
                  className={`link_icon ${isActive(specific_icon.path)}`}
                >
                  {specific_icon.icon}
                </IconButton>
              </Link>
            </Tooltip>
          );
        })}
        <NotifyDisplay notifies={notifyState.notifyData} />

        {!notifyState.notifyData.every(
          (notify) => !notify.unread.includes(responseData.user._id)
        ) && (
          <div className="new_notify">
            <div className="new_notify_sign"></div>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default MenuLink;
