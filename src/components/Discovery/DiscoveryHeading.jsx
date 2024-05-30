"use client";
import styled from "@emotion/styled";
import { Grid, Typography,Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";
import SearchBar from "../Common/SearchBar";
const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  letter-spacing:-0.04em;
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 700;
    line-height:19px;
    letter-spacing:-0.02em;
   
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  letter-spacing:0.02em;
  @media (max-width: 639px) {
    font-size: 10px;
    font-weight: 600;
    line-height:12px;
    letter-spacing:0.02em;
   
  }
`;
const DiscoveryHeading = () => {
  const theme = useTheme();
  return (
    <Box marginTop={8} marginBottom={{xs:3,sm:"28px"}} >
      <Grid container  alignItems="center">
        <Grid item paddingY={{xs:2,sm:5}}>
          <Box marginBottom={1}>
          <StyledTypography1 color={colors.navyBlue500} marginRight={1} component="span">
            Stock
          </StyledTypography1>
          <StyledTypography1
            color={theme.palette.primary.main}
            component="span"
          >
            Discovery
          </StyledTypography1>
          </Box>
          <StyledTypography2 color={colors.navyBlue400}>
            Explore our thematic buckets of stocks for capturing the decadal
            trends in your personal investment portfolio.
          </StyledTypography2>
        </Grid>
       
      </Grid>
      <Grid container justifyContent="space-between">
        <Typography></Typography>
      <Grid item >
         <SearchBar/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiscoveryHeading;
