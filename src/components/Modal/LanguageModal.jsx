"use client";
import React from "react";
import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import CloseIcon from "@mui/icons-material/Close";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width:100%;
  text-transform: none;
  background-color: ${colors.white};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
   
  }
`;

const StyledButton2 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.white};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  width:100%;
  text-transform: none;
  background-color: ${colors.themeGreen};

  :hover {
    background-color: ${colors.themeButtonHover};
    color: ${colors.white};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
   
  }
`;
const LanguageModal = () => {
  return (
    <Box
      bgcolor={colors.white}
      width={{xs:"100vw",sm:"60vw",md:"40vw"}}
      height={{sm:"19vh",md:"32vh"}}
   
      sx={{
        boxShadow: " 0px 12px 24px 0px #0000001A",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      <IconButton sx={{ position: "absolute", top: "4px", right: "4px" }}>
        <CloseIcon />
      </IconButton>
      <Grid
        container
        padding={4}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Grid item marginTop={1}>
          <StyledTypography1 color={colors.navyBlue500} textAlign="center">
            In Which Language You Want to Watch this?
          </StyledTypography1>
        </Grid>
        <Grid item width="100%">
          <Grid container display="flex" justifyContent="space-between" spacing={2} width="100%" >
            <Grid item xs={6}>
            <StyledButton1 whitespace="nowrap" variant="outlined"> Watch in Hindi</StyledButton1>
            </Grid>
            <Grid item xs={6}>
            <StyledButton2 variant="contained">Watch in English</StyledButton2>
            </Grid>

          </Grid>
   

        
        </Grid>
      </Grid>
    </Box>
  );
};

export default LanguageModal;
