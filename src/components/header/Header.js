import * as React from "react";

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { authSelector, logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Logout from "@mui/icons-material/Logout";
import MenuLink from "./MenuLink";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Search from "./Search";
import Settings from "@mui/icons-material/Settings";
import { getDataApi } from "../../utils/fetchData";
import { toast } from "react-toastify";

export default function ButtonAppBar() {
  const { responseData } = useSelector(authSelector);
  const [usersSearch, setUsersSearch] = React.useState([]);
  const { user } = useSelector(authSelector).responseData;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmitSearch = (value) => {
    if (value && responseData.token) {
      getDataApi(`search?username=${value}`, responseData.token)
        .then((res) => {
          setUsersSearch(res.data.users);
        })
        .catch((error) => toast.error(error.response.data.msg));
    } else {
      setUsersSearch([]);
    }
  };
  const handleResetListUserSearch = () => {
    setUsersSearch([]);
  };

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: "0", zIndex: "100" }}>
      <MenuLink />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#fff",
          padding: "0 10px",
        }}
      >
        <div className="wrap-app-bar">
          <NavLink to="/" className="main_logo">
            <p className="text_logo">Insta-Book</p>
          </NavLink>
          <Search
            onSubmitSearch={handleSubmitSearch}
            listUserSearch={usersSearch}
            resetListUserSearch={handleResetListUserSearch}
          />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <Avatar
              alt={user.username}
              src={user.avatar}
              sx={{ width: "25px", height: "25px" }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableScrollLock
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
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none", color: "#4f4f4f" }}
            >
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
            </Link>

            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logout());
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </AppBar>
    </Box>
  );
}
