"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button,Container } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";
import SearchBar from "../Common/SearchBar";

import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.02em;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0.02em;
  }
`;
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

const IpoHeader = () => {
 
  const theme = useTheme();
  return (
    <>
     <Container>
      <Box sx={{ marginTop: "54px" }} marginBottom={{ xs: 3, sm: "28px" }}>
        <Grid container alignItems="center">
          <Grid item paddingY={{ xs: 2, sm: 5 }}>
            <Box marginBottom={1}>
            <Box display="flex" alignItems="center">
                <Box display={{ xs: 'block', sm: 'block', md: 'none' }} marginRight={1}>
                  <ArrowBackIcon sx={{fontSize:{xs:'14px',sm:'24px'}}} />
                </Box>
                <StyledTypography1
                  color={colors.navyBlue500}
                  marginRight={1}
                  component="span"
                >
                  Sovrenn
                </StyledTypography1>
                <StyledTypography1
                  color={theme.palette.primary.main}
                  component="span"
                >
                  Knowledge
                </StyledTypography1>
              </Box>
            </Box>
            <StyledTypography2 color={colors.navyBlue400}>
            We are bringing to you IPO stock articles to make you better equipped with information before making investment decisions
            </StyledTypography2>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          width="100%"
          gap={{ xs: 3, sm: 4 }}
          flexWrap="wrap"
        >
        
          <Grid item order={{ xs: 1, sm: 2 }}>
            <SearchBar placeholder="Search for company, or industry"/>
          </Grid>
        </Grid>
      </Box>
      </Container>
    </>
  );
};

export default IpoHeader;
