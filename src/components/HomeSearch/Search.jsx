"use client"
import React from 'react'
import { Grid, Typography,Divider } from '@mui/material';
import styled from "@emotion/styled";
import { colors } from '../Constants/colors';
import SearchCompanyInfo from '../Cards/SearchCompanyInfo';
import CompanyCard from "../Cards/CompanyCard";
import SearchCompanyPulseAdd from "../Cards/SearchCompanyPulseAdd"


const StyledTypography1 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: -0.02em;
`;

const StyledTypography3 = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${colors.neutral800};
`;

const StyledList = styled('ol')`
  list-style-type: none;
  
  counter-reset: list-counter;
`;

const StyledListItem = styled('li')`
  counter-increment: list-counter;
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: ${colors.neutral800};
  letter-spacing: -0.02em;
  font-family: Inter, sans-serif;

  &::before {
    content: "(" counter(list-counter, lower-roman) ") ";
    font-weight: 400;
    margin-right: 4px;
  }
`;

const StyledYesBank = styled('span')`
  color: ${colors.navyBlue500};
  font-weight: 600;
`;

const StyledEmail = styled('span')`
  color: ${colors.themeGreen};
  text-decoration: underline;
  cursor: pointer;
`;
const CustomDivider = styled(Divider)`
  background-color: ${colors.neutral500};
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;

const companyNotListedArray = [
  "cyclical in nature",
  "loss making",
  "large cap (more than INR 30,000 Crore market capitalisation)",
  "not demonstrating profit uptrend",
];

const Search = () => {
  return (
    <>
      <Grid container marginTop="60px" flexDirection="column">
        <Grid item paddingY={{ xs: 2, sm: 5 }}>
          <StyledTypography1
            color={colors.navyBlue500}
            marginRight={1}
            component="span"
          >
            Search Result for:
          </StyledTypography1>
          <StyledTypography1 color={colors.themeGreen} component="span">
            Yes Bank
          </StyledTypography1>
        </Grid>
        <Grid item marginBottom={3}>
          <StyledTypography2 color={colors.red400} textAlign="center">
            Yes Bank is not covered by Sovrenn.
          </StyledTypography2>
        </Grid>
        <Grid item>
          <StyledTypography3 color={colors.neutral800}>
            Sovrenn is a curated stock platform where we pick only high potential stocks. We do not cover stocks which are:
          </StyledTypography3>
        </Grid>
        <Grid item>
          <StyledList>
            {companyNotListedArray.map((item, index) => (
              <StyledListItem key={index}>{item}</StyledListItem>
            ))}
          </StyledList>
        </Grid>
        <Grid item paddingTop={4}>
          <StyledTypography3 fontSize="16px" lineHeight="24px" color={colors.neutral900}>
            In case you think <StyledYesBank>Yes Bank</StyledYesBank> is not falling under any of the above criteria, please let us know at: <StyledEmail>help@sovrenn.com</StyledEmail>, and we will be happy to consider if we should add <StyledYesBank>Yes Bank</StyledYesBank> on the platform.
          </StyledTypography3>
          <CustomDivider sx={{ mt: 4, mb: 4 }} />
        </Grid>
        <Grid item>
            <StyledTypography1 color={colors.navyBlue400}>Keyword Found in</StyledTypography1>
           <SearchCompanyInfo/>
           <CustomDivider sx={{ mt: 4, mb: 4 }} />
        </Grid>
        <Grid item>
            <StyledTypography1 color={colors.navyBlue400}>Explore High Profit Growth Companies in Discovery</StyledTypography1>
          <CompanyCard/>
           <CustomDivider sx={{ mt: 4, mb: 4 }} />
        </Grid>
        <Grid item marginBottom={6}>
            <StyledTypography1 color={colors.navyBlue400}>Track Latest Updates of this company using Sovrenn Pulse</StyledTypography1>
          <SearchCompanyPulseAdd/>
           
        </Grid>
      </Grid>
    </>
  );
}

export default Search;