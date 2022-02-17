import * as React from "react";

import { Button, Grid } from "@mui/material";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";

export default function Icons({ setContent, content }) {
  const reactions = [
    "❤️",
    "👍",
    "👎",
    "🙂",
    "😀",
    "😄",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😌",
    "😉",
    "😏",
    "😍",
    "😘",
    "😭",
    "😤",
    "🤔",
    "🙄",
    "😡",
    "😠",
    "😶",
    "🤐",
    "😲",
    "🤒",
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button
          onClick={handleClick}
          size="small"
          sx={{ ml: 2, fontSize: "18px", justifyContent: "center"  }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <span>🙂</span>
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
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
        <Grid container sx={{ padding: "10px" }}>
          {reactions.map((icon, index) => {
            return (
              <Grid
                key={index}
                xs={3}
                item
                sx={{
                  width: "8px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setContent(content + icon)}
                >
                  {icon}
                </span>
              </Grid>
            );
          })}
        </Grid>
      </Menu>
    </React.Fragment>
  );
}
