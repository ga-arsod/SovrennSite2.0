"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material"; // Import the ArrowBack icon
import { colors } from "../Constants/colors";
import SearchBar from "../Common/SearchBar";

const StyledTypography1 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0.02em;
`;

const PrimeHeader = () => {
  const theme = useTheme();

  return (
    <Box sx={{ marginTop: "54px" }}>
      <Grid container alignItems="center">
        <Grid item paddingY={{ xs: 2, sm: 5 }}>
          <Box display="flex" alignItems="center" marginBottom={1}>
            <ArrowBack sx={{ color: colors.navyBlue500, marginRight: 1 }} /> {/* Insert the icon here */}
            <StyledTypography1
              color={colors.navyBlue500}
              marginRight={1}
              component="span"
            >
              Sovrenn
            </StyledTypography1>
            <StyledTypography1 color={theme.palette.primary.main} component="span">
              Prime
            </StyledTypography1>
          </Box>
          <StyledTypography2 color={colors.navyBlue400}>
            Access prime stock articles for informed investment decisions
          </StyledTypography2>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" width="100%">
        <Grid item order={{ xs: 1, sm: 2 }}>
          <SearchBar placeholder="Search for company, sector, or industry" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrimeHeader;