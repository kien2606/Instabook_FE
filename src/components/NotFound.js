import { Box } from "@mui/system";
import React from "react";
import { Typography } from "@mui/material";

function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        position: "relative",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          color: "gray",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        404 | NotFound
      </Typography>
    </Box>
  );
}

export default NotFound;
