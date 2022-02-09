import { IconButton, Tooltip } from "@mui/material";
import {
  deleteAllNotifications,
  readNotify,
} from "../../features/notify/notifySlice";
import { useDispatch, useSelector } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import React from "react";
import { authSelector } from "../../features/auth/authSlice";
import moment from "moment";

function NotifyDisplay({ notifies }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { responseData } = useSelector(authSelector);
  const dispatch = useDispatch();
  const handleReadNotify = (notify) => {
    dispatch(readNotify({ notify, responseData }));
  };
  const handleDeleteAllNotifies = () => {
    if (window.confirm("Are you sure want to delete all notifications?")) {
      dispatch(deleteAllNotifications({ responseData }));
    }
  };
  return (
    <>
      <Tooltip title="Notification">
        <IconButton
          className={`link_icon`}
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <FavoriteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="notify_title" style={{ minWidth: "405px" }}>
          <div className="title_left">
            <p>Notifies</p>
          </div>
          <div className="title_right">
            <button onClick={handleDeleteAllNotifies}>Delete all notify</button>
          </div>
        </div>
        {notifies.length > 0 ? (
          notifies.map((notify, index) => {
            return (
              <Link
                to={notify.url}
                key={index}
                className="notify_display"
                onClick={() => handleReadNotify(notify)}
              >
                <div className="notify_left">
                  <img src={notify.user.avatar} alt={notify.user.username} />
                  <div className="notify_left_info">
                    <div className="notify_left_info_header">
                      <p>{notify.user.username}</p>
                      &nbsp;
                      <p>{notify.text}</p>
                    </div>
                    <div className="notify_left_info_time">
                      <small>{moment(notify.createdAt).fromNow()}</small>
                    </div>
                  </div>
                </div>
                <div className="notify_right">
                  {/* {!notify.isRead && <div className="notify_sign"></div>} */}
                  {notify.unread.includes(responseData.user._id)  && <div className="notify_sign"></div>  }
                </div>
              </Link>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              color: "crimson",
              justifyContent: "center",
              alignItems: "center",
              margin: "16px 0",
            }}
          >
            You have no notifications
          </div>
        )}
      </Menu>
    </>
  );
}

export default NotifyDisplay;
