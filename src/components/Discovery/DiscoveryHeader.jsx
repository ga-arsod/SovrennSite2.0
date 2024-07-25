"use client"
import React from 'react'
import { Grid,Box, Typography, IconButton } from '@mui/material'
import styled from '@emotion/styled'
import { colors } from '../Constants/colors';
import SearchBar from "../Common/SearchBar"
import { useTheme } from "@mui/material/styles";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

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


const HoverBox = styled(Box)`
  background-color: #F6F5F5;
  border-radius:4px;
  margin-bottom: 8px;
  cursor:pointer;
  &:hover {
    background-color: ${colors.neutral900}; 
  }
`;
const DiscoveryHeader = () => {
  const theme=useTheme();
  const title=useSelector((store)=>store.discovery.title)
  const [firstWord, ...remainingWordsArray] = title.split(' ');

  const remainingWords = remainingWordsArray.join(' ');
 
  return (
    <>
     <Box sx={{marginTop:"64px"}} marginBottom={{xs:3,sm:"28px"}}  >
      <Grid container  alignItems="center">
        <Grid item paddingY={{xs:2,sm:5}}>
          <Box marginBottom={1}>
          <StyledTypography1 color={colors.navyBlue500} marginRight={1} component="span">
     {firstWord}
          </StyledTypography1>
          <StyledTypography1
            color={theme.palette.primary.main}
            component="span"
          >
          {remainingWords}
          </StyledTypography1>
          </Box>
          
        </Grid>
       
      </Grid>
      <Grid container justifyContent="flex-end" width="100%">
       
      <Grid item   >
     <SearchBar placeholder="Search for a Keyword"/>
        
        </Grid>
      </Grid>
    </Box>
   
    </>
  )
}

export default DiscoveryHeader
