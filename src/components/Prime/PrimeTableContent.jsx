"use client"
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import PrimeTableCard from "../../components/Cards/PrimeCard"
import TableData from "../../components/Prime/TableData";

const PrimeTableContent = () => {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
 
  
  return (
    <>
      {isSmallerThanMd ? (
        <PrimeTableCard  />
      ) : (
        <TableData />
      )}
    </>
  );
};

export default PrimeTableContent;