"use client";
import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${colors.themeOrange};
  text-transform: none;

  :hover {
    background-color: ${colors.themeOrange};
  }
`;
const TrialCard = () => {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item paddingX={{ xs: 2,sm:4, md: 0 }} width="100%" sx={{display:"flex",justifyContent:'center'}}>
          <Box
            width={{ xs: "100%", md: "1216px" }}
            marginBottom={12}
            sx={{ backgroundColor: "#F4F6F8", borderRadius: "16px" }}
          >
            <Grid
              container
              paddingX={{ xs: 3, sm: 8 }}
              paddingY={{ xs: 4, sm: 8 }}
              justifyContent="space-between"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems="center"
            >
              <Grid item>
                <StyledTypography1
                  color="#42307D"
                  marginBottom={2}
                  textAlign={{ xs: "center", sm: "start" }}
                >
                  Start your 45-day free trial
                </StyledTypography1>
                <StyledTypography2
                  color="#20385E"
                  textAlign={{ xs: "center", sm: "start" }}
                
                >
                  Get up and running in less than 5 minutes.
                </StyledTypography2>
              </Grid>
              <Grid item>
                <StyledButton2 variant="contained">
                  Get 45 Days Free Trial Now
                </StyledButton2>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TrialCard;
