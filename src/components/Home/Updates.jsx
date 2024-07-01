"use client"

import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { colors } from "../Constants/colors";
import { useDispatch, useSelector } from "react-redux";

import { homeUpdatesApi } from "@/app/Redux/Slices/homeSlice";
import UpdateInfo from "./updateInfo";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  letter-spacing: -0.04em;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    text-align: center;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
`;
const Updates = () => {
  const { isAuth } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeUpdatesApi());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          paddingX={{ xs: 2, sm: 3, md: 2 }}
          paddingY={6}
        >
          <Grid item>
            <Typography
              sx={{ textAlign: "center" }}
              marginBottom={{ xs: 1, sm: "20px" }}
            >
              <StyledTypography1
                component="span"
                marginRight={1}
                color="#0D1726"
              >
                This week’s latest
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                updates
              </StyledTypography1>
            </Typography>
          </Grid>
          <Grid item sx={{ textAlign: "center" }} marginBottom={5}>
            <StyledTypography2
              component="span"
              justifyContent="center"
              wrap="wrap"
              gutterBottom
              color="#627B8F"
            >
              We want to inform you with latest information added for you this
              week
            </StyledTypography2>
          </Grid>

          <Grid item>
            <UpdateInfo />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Updates;
