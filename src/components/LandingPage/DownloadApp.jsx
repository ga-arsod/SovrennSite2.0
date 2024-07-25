"use client";
import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { colors } from "../Constants/colors";
import Image from "next/image";
import styled from "@emotion/styled";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  letter-spacing: -0.02em;
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
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${colors.themeOrange};
  text-transform: none;
  width: 80%;
  :hover {
    background-color: ${colors.themeOrange};
  }
`;
const DownloadApp = () => {
  return (
    <>
      <Box marginX={10} height="495px" sx={{display:"flex",justifyContent:"center"}}>
        <Grid container height="100%" width="1150px">
          <Grid item paddingY="45px" paddingX={4} xs={6}>
            <StyledTypography1 marginBottom={3}>
              Sovrenn- Simplifying Investing for Everyone.
            </StyledTypography1>
            <StyledButton2 variant="contained">
              Get 45 Days Free Trial Now
            </StyledButton2>
            <StyledTypography2 color="#667085" marginY={4}>
              Download our app
            </StyledTypography2>
            <Grid container spacing={1}>
              <Grid item>
                <Image
                  src="/ios-app-link.png"
                  width={135}
                  height={40}
                  alt="..."
                />
              </Grid>
              <Grid item>
                <Image
                  src="/mobile-app-link.png"
                  width={135}
                  height={40}
                  alt="..."
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Box height="100%" display="flex" alignItems="center">
              <Image
                src="/landing-page-mockup.png"
                alt="Parent"
                width={313}
                height={496}
                layout="fixed"
                style={{ height: "100%", width: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DownloadApp;