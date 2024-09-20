"use client";
import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { colors } from '../Constants/colors';
import styled from "@emotion/styled";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GridContainer = styled(Box)`
  display: grid;
  gap: 24px 16px; /* Row gap, Column gap */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Ensures responsive layout */

  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, minmax(280px, 332px)); /* 4 items per row, max 332px */
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(280px, 332px)); /* 3 items per row, max 332px */
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(1, 1fr); /* 1 item per row, full width */
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.black};
`;

const StyledTypography2 = styled(Typography)`
  font-size: 14px;
  line-height: 17px;
`;

const StyledGrid = styled(Box)`
  cursor: pointer;
  background-color: ${colors.navyBlue50};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  height: 300px;
  @media (max-width: 639px) {
   height: 330px;
  }
  position: relative;
  transition: background-color 0.8s; 

  &:hover {
    background-color: ${colors.green50};

    .arrow-icon {
      transform: rotate(-45deg); 
      color:white;
      font-size:14px
    }

    .icon-button {
      background-color: ${colors.themeGreen}; 
      border-color: ${colors.navyBlue900}; 
    }
  }

  .content {
    flex: 1; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bottom-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 11px;
    margin-top: auto;
  }
`;

const CustomIconButton = styled(IconButton)`
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #B0B7BC;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.5s, border-color 0.5s, transform 0.5s; 
  
  .arrow-icon {
    transition: transform 0.8s; 
  }
`;

const CompanyCard = () => {
  return (
    <Box marginTop={2}>
      {/* Moved GridContainer outside the loop */}
      <GridContainer>
        {Array.from("abc").map((item, index) => (
          <StyledGrid key={index}>
            <Box className="content">
              <Grid container>
                <Grid item paddingY={2} paddingX="20px" width="100%">
                  <Box
                    sx={{
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src="/discovery.jpg"
                      width={274}
                      height={140}
                      alt="poster"
                      layout="responsive"
                    />
                  </Box>
                </Grid>
                <Grid item paddingX="11px">
                  <StyledTypography1 gutterBottom>
                    Preferential Issuance
                  </StyledTypography1>
                  <StyledTypography2 color={colors.navyBlue400} sx={{ fontWeight: 500 }} marginBottom={1}>
                    List of interesting stocks in the process of raising capital via Preferential Issuance
                  </StyledTypography2>
                </Grid>
              </Grid>
              <Box className="bottom-section">
                <StyledTypography2 component="span" color={colors.themeGreen} sx={{ fontWeight: 600 }}>
                  Bucket- Functional
                </StyledTypography2>
                <CustomIconButton className="icon-button">
                  <ArrowForwardIcon fontSize="small" className="arrow-icon" sx={{ color: "#3C464F" }} />
                </CustomIconButton>
              </Box>
            </Box>
          </StyledGrid>
        ))}
      </GridContainer>
    </Box>
  );
};

export default CompanyCard;