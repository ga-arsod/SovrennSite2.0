"use client"
import React from 'react'
import { Grid,Typography,Button,Box } from '@mui/material';
import styled from "@emotion/styled";
import { colors } from '../../components/Constants/colors';
import TimesHeader from "../../components/Times/TimesHeader"

const StyledTypography1=styled(Typography)`
font-weight:600;
font-size:14px;
line-height:17px;

`
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  
  :hover {
    background-color: ${colors.themeButtonHover};
  }
 
`;

const Times = () => {
  return (
   <>
   <Grid container marginTop="60px">
    <Grid item paddingY={1.5}  sx={{backgroundColor:'#FCE1B3',display:"flex",justifyContent:'center',alignItems:'center'}} width="100%">
        <Box width="1200px" sx={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
        <StyledTypography1 >You are only reading free Sovrenn Times Monday articles. To read daily Sovrenn Times articles, you need to buy a plan.</StyledTypography1>
        <StyledButton2 variant="contained">
                    Buy Full Access @ ₹5000/yr
                  </StyledButton2>
                  </Box>
    </Grid>
    <Grid item>
    <TimesHeader/>
    </Grid>

   </Grid>
   
   </>
  )
}

export default Times;
