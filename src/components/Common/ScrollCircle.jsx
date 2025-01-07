import React from "react";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollCircle = () => {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 50,
          right: 16,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid  #E6E8E9",
          backgroundColor: "#FAF9F9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          cursor: "pointer",
          display: showScroll ? "flex" : "none",
        }}
        onClick={scrollTop}
      >
        <KeyboardArrowUpIcon />
      </Box>
    </>
  );
};

export default ScrollCircle;
