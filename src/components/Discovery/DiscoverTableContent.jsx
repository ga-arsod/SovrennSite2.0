"use client"
import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import DiscoveryTableCard from "../Cards/DiscoveryTableCard";
import DiscoveryTable from "../../components/Discovery/DiscoveryTable";

const DiscoverTableContent = () => {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const tableData = useSelector(
    (store) => store.discovery.discoveryTableBucket
  );
  
  return (
    <>
      {isSmallerThanMd ? (
        <DiscoveryTableCard tableData={tableData} />
      ) : (
        <DiscoveryTable tableData={tableData} />
      )}
    </>
  );
};

export default DiscoverTableContent;
