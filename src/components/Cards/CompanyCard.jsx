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
  background-color: ${colors.navyBlue50};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  position: relative;
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
    flex: 1;  // Allow content to grow and fill the available space
    justify-content: space-between;
  }

  .bottom-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 11px;
    margin-top: auto;  // Pushes it to the bottom
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
  console.log(data,"data")
  return (
    <Box marginTop={2}>
     
      <GridContainer>
        {data?.map((ele, index) => (
          <StyledGrid key={index}>
              {/* <Link target="_blank" href={`/discovery/${ele.slug}/${slug}`} style={{textDecoration:'none'}}> */}
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
                <Grid item paddingX="11px">
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
                  {`Bucket- ${ele.type}`}
                </StyledTypography2>
                <CustomIconButton className="icon-button">
                  <ArrowForwardIcon fontSize="small" className="arrow-icon" sx={{ color: "#3C464F" }} />
                </CustomIconButton>
              </Box>
            </Box>
            {/* </Link> */}
          </StyledGrid>
        ))}
      </GridContainer>
    </Box>
  );
};

export default CompanyCard;