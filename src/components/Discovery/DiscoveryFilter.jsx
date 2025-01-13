"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";
import SearchBar from "../Common/SearchBar";
import CreateBucketModal from "../Modal/CreateBucketModal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useSelector } from "react-redux";

const StyledButton = styled(Button)`
  color: ${colors.navyBlue500};
  background-color: transparent;
  text-transform: none;
  border: 1px solid ${colors.navyBlue500};
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 12px;
  padding-bottom: 12px;
  white-space: nowrap;
  :hover {
    background-color: ${colors.white};
  }
`;
const DiscoveryFilter = () => {
  const [open, setOpen] = useState(false);
  const { userDetails,isAuth } = useSelector((store) => store.auth);
  const { isCreateBucketModalOpen, customBucketData } = useSelector(
    (store) => store.discovery
  );

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (customBucketData?.success) {
      setOpen(false);
    }
  }, [customBucketData]);
  return (
    <div>
      {open ? (
        <CreateBucketModal open={open} handleClose={handleClose} />
      ) : (
        <></>
      )}
      <Grid
        container
        justifyContent="flex-end"
        width="100%"
        gap={{ xs: 3, sm: 4 }}
        flexWrap="wrap"
        marginBottom={3}
      >
        <Grid
          item
          order={{ xs: 2, sm: 1 }}
          width={{ xs: "100%", sm: "auto" }}
          sx={{ display: { xs: "flex", sm: "", justifyContent: "center" } }}
        >
          {isAuth && (userDetails?.subscriptions?.includes("full-access") ||
          userDetails?.subscriptions?.includes("monthly") ||
          userDetails?.subscriptions?.includes("quarterly") ||
          userDetails?.subscriptions?.includes("life") ||
          userDetails?.subscriptions?.includes("basket") ||
          userDetails?.subscriptions?.includes("trial")) ? (
            <StyledButton
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
              width="170px"
              startIcon={
                <AddOutlinedIcon
                  sx={{ color: colors.navyBlue500, strokeWidth: 10 }}
                />
              }
            >
              Create Bucket
            </StyledButton>
          ) : (
            ""
          )}
        </Grid>
        {/* <Grid item order={{ xs: 1, sm: 2 }}>
            <SearchBar placeholder="Search for a bucket"/>
          </Grid> */}
      </Grid>
    </div>
  );
};

export default DiscoveryFilter;
