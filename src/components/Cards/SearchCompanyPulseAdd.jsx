"use client";
import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import styled from "@emotion/styled";
import { colors } from '../Constants/colors';

const GridContainer = styled(Box)`
  display: grid;
  gap: 24px 16px;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(2, 1fr); /* Two cards per row on larger screens */
    justify-content: center;
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr); /* One card per row on medium screens */
    justify-content: center;
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(1, 1fr); /* One card per row on smaller screens */
    justify-content: center;
    width: 100vw; /* Ensure the grid container takes up full viewport width */
    overflow-x: hidden; /* Prevent horizontal overflow */
    padding-left: 8px;
    padding-right: 8px;
    box-sizing: border-box;
  }
`;

const CustomCard = styled(Card)`
  border: 1px solid #DEDDDD;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: none;
  height: 278px;
  width: 100%; /* Ensure the card takes full width */
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 1025px) {
    max-width: 674px; /* On large screens, restrict the card width */
  }

  @media (max-width: 1024px) {
    max-width: 100%; /* Ensure the card takes full width on medium screens */
  }

  @media (max-width: 639px) {
    max-width: 100%; /* Full width on small screens */
    width: 100%;
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.neutral800};
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 700;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
  border: 1px solid ${colors.themeGreen};
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-transform: none;
  width: 100%;
  color: ${colors.themeGreen};
  padding-top: 12px;
  padding-bottom: 12px;
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const StyledTypographyFileLink = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: ${colors.themeGreen};
`;

const FileLinkButton = styled(Button)`
  background-color: ${colors.green50};
  text-transform: none;
  color: ${colors.themeGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 4px 16px;
  min-width: 120px;
  :hover {
    background-color: ${colors.themeButtonHover};
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
`;

const SearchCompanyPulseAdd = () => {
  return (
    <GridContainer marginTop={2}>
      {Array.from("ab").map((item, index) => (
        <CustomCard key={index}>
          <CardContent>
            <StyledTypography1 color={colors.navyBlue200}>
              31st Aug 2024 | 9:17 PM
            </StyledTypography1>

            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="8px">
              <StyledTypography2>Yes Bank</StyledTypography2>
              <FileLinkButton startIcon={<AttachFileTwoToneIcon />}>
                <StyledTypographyFileLink>File Link</StyledTypographyFileLink>
              </FileLinkButton>
            </Box>

            <StyledTypography3 marginTop={3}>
              YES BANK received two orders from the GST Departments of Maharashtra and Punjab on August 30, 2024, demanding Rs. 11,53,481/- and Rs. 2,04,686/- along with penalties. The penalties were imposed under the CGST Act and the State GST Act. The bank believes it can substantiate its position and intends to appeal the or...
            </StyledTypography3>

            <StyledButton variant="outlined">
              + Add Company to Sovrenn Pulse
            </StyledButton>
          </CardContent>
        </CustomCard>
      ))}
    </GridContainer>
  );
};

export default SearchCompanyPulseAdd;