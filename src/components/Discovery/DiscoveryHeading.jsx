"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../Constants/colors";
import Snackbar from "../Snackbar/SnackBar";

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

const DiscoveryHeading = ({headingObject}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const lastSpaceIndex = headingObject?.heading?.lastIndexOf(" ");

  const part1 = headingObject?.heading?.substring(0, lastSpaceIndex + 1);
  const part2 = headingObject?.heading?.substring(lastSpaceIndex + 1);
  
  return (
    <>
      <Box sx={{ marginTop: "54px" }} marginBottom={{ xs: 3, sm: "28px" }}>
      <Snackbar />
        <Grid container alignItems="center">
          <Grid item paddingY={{ xs: 2, sm: 5 }}>
            <Box marginBottom={1} display="flex" alignItems="center">
              {isSmallScreen && (
                <ArrowBackIcon
                  sx={{
                    fontSize: { xs: 23, sm: 48 },
                    marginRight: { xs: 1, sm: 2 },
                    color: colors.navyBlue500,
                  }}
                />
              )}
              <StyledTypography1
                color={colors.navyBlue500}
                marginRight={1}
                component="span"
              >
             {part1}
              </StyledTypography1>
              <StyledTypography1
                color={theme.palette.primary.main}
                component="span"
              >
               {part2}
              </StyledTypography1>
            </Box>
            <StyledTypography2 color={colors.navyBlue400}>
              {headingObject?.description}
            </StyledTypography2>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DiscoveryHeading;