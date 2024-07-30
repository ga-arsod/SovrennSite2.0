"use client"
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";



const IpoTableContent = () => {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
 
  
  return (
    <>
     
    </>
  );
};

export default IpoTableContent;