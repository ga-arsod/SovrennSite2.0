"use client"

import { Grid, Typography,Box } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';

const StyledTypography1=styled(Typography)`
font-weight:600;
font-size:48px;
line-height:56px;


`;
const StyledTypography2=styled(Typography)`
font-weight:600;
font-size:19px;
line-height:23px;
color:"#4D5E7C";


`;


const MainHeading=()=>{
    const theme=useTheme();
    return(
        <>
        <Box
         width="100vw"
         height="60vh"
         display="flex"
         justifyContent="center"
         alignItems="center"
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
      }}
    >
     <Grid container  >
        <Grid item width="100%">
            <Typography textAlign="center" gutterBottom>
            <StyledTypography1 color="#20365B" component="span" marginRight={1}>Unlock Your</StyledTypography1>
      <StyledTypography1 color={theme.palette.primary.main} marginRight={1}  component="span">Locking</StyledTypography1>
      <StyledTypography1 color="#20365B" component="span" >Potential</StyledTypography1>
     <StyledTypography2 textAlign="center">
     Empower Your Investing Journey with Expert Guidance at Sovrenn
     </StyledTypography2>

            </Typography>
        
      
        </Grid>

     </Grid>
    </Box>
        </>
    )
}

export default MainHeading;