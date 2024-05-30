"use client"
import React, { useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { colors } from '../Constants/colors';
import styled from "@emotion/styled";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const GridContainer1 = styled(Grid)`
  row-gap: 24px; /* Gap between rows */
  column-gap: 16px; /* Gap between columns */
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.black};
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
const StyledGrid = styled(Grid)`
  cursor: pointer;
  background-color: ${colors.navyBlue50};
  &:hover {
    background-color: ${colors.green50};
  }
`;
const StyledTypography3 = styled(Typography)`
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue900};
`;
const HoverBox = styled(Box)`
  background-color: #F6F5F5;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral900};

    .header-text {
      color: ${colors.white}; /* Change text color on hover */
    }

    .header-icon {
      color: ${colors.white}; /* Change arrow color on hover */
    }
  }

  &.collapsed {
    background-color: ${colors.neutral400}; /* Color when collapsed */

    .header-text {
      color: ${colors.navyBlue900}; /* Text color when collapsed */
    }

    .header-icon {
      color: ${colors.navyBlue900}; /* Icon color when collapsed */
    }

    &:hover {
      background-color: ${colors.neutral900};

      .header-text {
        color: ${colors.white}; /* Text color on hover when collapsed */
      }

      .header-icon {
        color: ${colors.white}; /* Icon color on hover when collapsed */
      }
    }
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
  transition: background-color 0.3s, border-color 0.3s, transform 0.3s; /* Add transition for all properties */

  &:hover {
    background-color: ${colors.themeGreen}; /* Change background color on hover */
    border-color: ${colors.navyBlue900}; /* Change border color on hover */
    transform: rotate(-45deg); /* Rotate icon by 45 degrees anticlockwise on hover */

    .arrow-icon {
      color: ${colors.white}; /* Change arrow color on hover */
    }
  }
`;

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; visibility: hidden; }
    to { opacity: 1; visibility: visible; }
  }
`;

const fadeOut = `
  @keyframes fadeOut {
    from { opacity: 1; visibility: visible; }
    to { opacity: 0; visibility: hidden; }
  }
`;

const GridContainer = styled(Grid)`
  &.fade-in {
    animation: fadeIn 0.5s forwards;
  }
  &.fade-out {
    animation: fadeOut 0.5s forwards;
  }
  ${fadeIn}
  ${fadeOut}
`;

const DiscoveryCard = ({title}) => {
  const [isGridOpen, setIsGridOpen] = useState(true); // State to control the collapse

  const handleToggle = () => {
    setIsGridOpen(!isGridOpen);
  };

  return (
    <>
      <Box marginBottom={6}>
        <HoverBox 
          onClick={handleToggle} 
          className={isGridOpen ? '' : 'collapsed'}
        > 
          <Grid container justifyContent="space-between" paddingY={1} paddingX="12px" alignItems="center">
            <Grid item>
              <StyledTypography3 className="header-text">{title}</StyledTypography3>
            </Grid>
            <Grid item>
              <IconButton >
                {isGridOpen ? (
                  <KeyboardArrowUpIcon sx={{ color: colors.navyBlue900 }} fontSize='large' className="header-icon"/>
                ) : (
                  <KeyboardArrowDownIcon sx={{ color: colors.navyBlue900 }} fontSize='large' className="header-icon" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </HoverBox>
        {isGridOpen && (
          <GridContainer container rowGap={3} columnGap={2}  className='fade-in'>
            {
              Array.from("abcedfghij").map((item, index) => {
                return (
                  <StyledGrid item key={index} width="310px" direction={{ xs: "column", sm: "row" }} sx={{ borderRadius: "3px" }}>
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
                        <StyledTypography2 color={colors.navyBlue400} marginBottom={2}>
                          List of interesting stocks in the process of raising capital via Preferential Issuance
                        </StyledTypography2>
                      </Grid>
                      <Grid item width="100%" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} paddingX="11px" marginTop={2} marginBottom="12px">
                        <StyledTypography2 component="span" color={colors.themeGreen}>187 Companies are in this bucket</StyledTypography2>
                        <CustomIconButton>
                          <ArrowForwardIcon fontSize='small' className="arrow-icon" sx={{ color: "#3C464F" }} />
                        </CustomIconButton>
                      </Grid>
                    </Grid>
                  </StyledGrid>
                )
              })
            }
          </GridContainer>
        )}
      </Box>
    </>
  )
}

export default DiscoveryCard;