"use client"

import React from "react";
import styled from "@emotion/styled";
import { Box,Grid,Typography,Button } from "@mui/material";
import { gradientColors } from "../Constants/colors";

const StyledGrid = styled(Box)`

position:relative;
z-index:10;
width:80%;
bottom:5rem;
left:10%;
@media (min-width: 640px) and (max-width: 1080px) {
  width:90%;
  left:5%;
  bottom:7rem;
}

`;

const StyledTypography1=styled(Typography)`
font-weight:700;
font-size:28px;
line-height:34px; 
letter-spacing: -0.02em;  

@media (max-width:639px)
{
  
  font-weight:600;
font-size:23px;
line-height:28px;
}


`;

const StyledTypography2 = styled(Typography)`
font-weight:400;
font-size:20px;
line-height:24px;
@media (max-width:639px)
{
  
  font-weight:400;
font-size:12px;
line-height:14px;
}

`;

const StyledButton=styled(Button)`
color: ${(props) => props.theme.palette.primary.main};
font-weight:600;
border-color: ${(props) => props.theme.palette.primary.main};
outline:${(props) => props.theme.palette.primary.main};
box-shadow:none;

`;
const TrialCard=()=>{
  return(
    <>

    <Box sx={{position:'absolute'}} bgcolor={{xs:'#0D1726',sm:""}}  width="100vw"  >
      <StyledGrid container justifyContent='center' paddingTop={{xs:16,sm:0}} >
<Grid item  sx={{background: `linear-gradient(45deg, ${gradientColors.c1}, ${gradientColors.c2})`, boxShadow: '0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #1018281A',borderRadius:'8px',}}>
<Grid container direction={{xs:"column",sm:"row"}}   spacing={0} alignItems='center' justifyContent='space-between' paddingY={{xs:1,sm:3,md:6}} paddingX={{xs:1,sm:6,md:4}} >
        <Grid item  width={{xs:"100%",sm:"70%"}}>
        <StyledTypography1 color='#F3FAFB' textAlign={{xs:"center",sm:"start"}}  gutterBottom>Begin your 2-month trial for only ₹400 today!</StyledTypography1>
        <StyledTypography2 color="#F4F3F3" textAlign={{xs:"center",sm:"start"}} gutterBottom marginBottom={3} >Unlock two months of financial insight with Sovrenn. Empower your investing journey today!</StyledTypography2>
        </Grid>
        <Grid item >
        <StyledButton variant="contained"  sx={{fontSize:{xs:"16px",sm:"16px"} ,backgroundColor:"white",paddingY:{xs:"12px",sm:"14px"},lineHeight:{xs:"19px",sm:"21px"} ,textTransform:'none'}}>Buy Trial Now</StyledButton>
        </Grid>
        </Grid>

</Grid>
      </StyledGrid>
      
     
      

    </Box>

   
    </>
  )
}
export default TrialCard;