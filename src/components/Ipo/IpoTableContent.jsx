"use client"
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import IpoCard from "../Cards/IpoCard";
import IpoTableData from "../Ipo/IpoTableData"


const IpoTableContent = () => {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
 
  
  return (
    <>
      {isSmallerThanMd ? (
        <IpoCard />
      ) : (
        <IpoTableData  />
      )}
    </>
  );
};

export default IpoTableContent;