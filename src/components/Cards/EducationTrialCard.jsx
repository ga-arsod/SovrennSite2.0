"use client";

import React from "react";
import styled from "@emotion/styled";
import { Box, Grid, Typography, Button } from "@mui/material";
import { gradientColors } from "../Constants/colors";
import { colors } from "../Constants/colors";

const StyledGrid = styled(Box)`
  position: relative;
  z-index: 10;
  width: 100%; 
  max-width: 960px; 
  margin: auto; 
  bottom: 5rem;
  left: 0;
  
  @media (min-width: 640px) and (max-width: 1080px) {
    width: 90%;
    bottom: 7rem;
  }
  
  @media (min-width: 1080px) {
    bottom: 9rem;
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.02em;

  @media (max-width: 639px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  
  @media (max-width: 639px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;

const StyledButton = styled(Button)`
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 600;
  border-color: ${(props) => props.theme.palette.primary.main};
  outline: ${(props) => props.theme.palette.primary.main};
  box-shadow: none;
  &:hover {
    background-color:${colors.themeButtonHover}; 
    color: white; 
  }
`;

const EducationTrialCard = () => {
  return (
    <>
      <Box
        sx={{ position: "absolute" }}
        bgcolor={{ xs: "#0D1726", sm: "transparent" }}
        width="100%"  
      >
        <StyledGrid
          container
          justifyContent="center"
          paddingX={{ xs: 2, sm: 0 }}  
          paddingTop={{ xs: 16, sm: 0 }}
        >
          <Grid
            item
            sx={{
              background: `linear-gradient(45deg, ${gradientColors.c1}, ${gradientColors.c2})`,
              boxShadow:
                "0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #1018281A",
              borderRadius: "8px",
              maxWidth: "960px", 
              width: "100%",
            }}
          >
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
              alignItems="center"
              justifyContent="space-between"
              paddingY={{ xs: 1, sm: 4 }}
              paddingX={{ xs: 2, sm: 4, md: 4 }} 
            >
              <Grid item width={{ xs: "100%", sm: "70%" }}>
                <StyledTypography1
                  color="#F3FAFB"
                  textAlign={{ xs: "center", sm: "start" }}
                  gutterBottom
                >
                Let’s continue your investing journey by upgrading today!
                </StyledTypography1>
                <StyledTypography2
                  color="#F4F3F3"
                  textAlign={{ xs: "center", sm: "start" }}
                  gutterBottom
                  marginBottom={3}
                >
                Enjoy uninterrupted access! Your full access begins seamlessly once your trial period concludes
                </StyledTypography2>
              </Grid>
              <Grid item>
                <StyledButton
                  variant="contained"
                  sx={{
                    fontSize: { xs: "16px", sm: "16px" },
                    backgroundColor: "white",
                    paddingY: { xs: "12px", sm: "14px" },
                    lineHeight: { xs: "19px", sm: "21px" },
                    textTransform: "none",
                  }}
                >
                 Buy Full Access Now
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>
      </Box>
    </>
  );
};

export default EducationTrialCard;