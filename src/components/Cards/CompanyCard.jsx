"use client";
import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { colors } from '../Constants/colors';
import styled from "@emotion/styled";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const GridContainer = styled(Box)`
  display: grid;
  gap: 24px 16px;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    flex: 1 1 100%;
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
  background-color: #FAF9F9;
  border: 1px solid #E6E8E9;
  border-radius: 3px;
  display: flex;
  height:350px;
  flex-direction: column;
  position: relative; /* Added for absolute positioning of child elements */
  transition: background-color 0.8s;

  &:hover {
    background-color: ${colors.green50};

    .arrow-icon {
      transform: rotate(-45deg);
      color: white;
      font-size: 14px;
    }

    .icon-button {
      background-color: ${colors.themeGreen};
      border-color: ${colors.navyBlue900};
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;  
    justify-content: space-between;
  }

  .bottom-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    position: absolute;
    bottom: 20px; 
    left: 0;
    right: 0;
  }
`;


const StyledTypography3 = styled(Typography)`
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
  color: ${colors.navyBlue900};
  @media (max-width: 639px) {
    font-size: 23px;
    line-height: 28px;
  }
`;

const HoverBox = styled(Box)`
  background-color:#F6F5F5 ;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.neutral900};

    .header-text {
      color: ${colors.white};
    }

    .header-icon {
      color: ${colors.white};
    }
  }

  &.collapsed {
    background-color: ${colors.neutral400};

    .header-text {
      color: ${colors.navyBlue900};
    }

    .header-icon {
      color: ${colors.navyBlue900};
    }

    &:hover {
      background-color: ${colors.neutral900};

      .header-text {
        color: ${colors.white};
      }

      .header-icon {
        color: ${colors.white};
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
  border: 1px solid #b0b7bc;
  border-radius: 50%;
  background-color: ${colors.white};
  transition: background-color 0.5s, border-color 0.5s, transform 0.5s;

  .arrow-icon {
    transition: transform 0.8s;
  }
`;

const DefaultImageContainer = styled(Box)`
  background-color: ${colors.green900};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  border-radius: 3px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`;

const CompanyCard = ({data,slug}) => {
 
  return (
    <Box marginTop={2}>
     
      <GridContainer>
        {data?.map((ele, index) => (
          <StyledGrid key={index}>
              <Link target="_blank" href={`/discovery/${ele.slug}`} style={{textDecoration:'none'}}>
            <Box className="content">
              <Grid container>
                <Grid item paddingY={2} paddingX="20px" width="100%">
                <Box sx={{ borderRadius: "3px", overflow: "hidden" }}>
                        {ele?.thumb_url ? (
                          <Image src={ele.thumb_url} width={274} height={140} alt="poster" layout="responsive" />
                        ) : (
                          <DefaultImageContainer>
                            <Typography variant="h6">{ele?.title}</Typography>
                          </DefaultImageContainer>
                        )}
                      </Box>
                </Grid>
                <Grid item paddingX="20px">
                  <StyledTypography1 gutterBottom>
                    {ele.title}
                  </StyledTypography1>
                  <StyledTypography2 color={colors.navyBlue400} sx={{ fontWeight: 500 }} marginBottom={1}>
                   {ele.description}
                  </StyledTypography2>
                </Grid>
              </Grid>
              
              <Box className="bottom-section">
                  <StyledTypography2 component="span" color={colors.themeGreen} sx={{ fontWeight: 600 }}>
                    { `${ele?.total_companies} ${ele?.total_companies<2 ? "company" : "companies"} ${ele?.total_companies<2 ? "is" : "are"} in this bucket`}
                  </StyledTypography2>
                  <CustomIconButton className="icon-button">
                    <ArrowForwardIcon fontSize="small" className="arrow-icon" sx={{ color: "#3C464F" }} />
                  </CustomIconButton>
                </Box>
            </Box>
            </Link>
          </StyledGrid>
        ))}
      </GridContainer>
    </Box>
  );
};

export default CompanyCard;