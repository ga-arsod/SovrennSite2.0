"use client"
import React from "react";
import PlanCard from "../Cards/PlanCard";
import {Box,Grid,Typography} from "@mui/material";
import styled from '@emotion/styled';
import { planData } from "../../utils/Data";



const StyledTypography1 = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
@media (max-width:700px)
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
@media (max-width:700px)
{
  font-weight:400;
font-size:12px;
line-height:14px;
}

`;


const PlanInfo=()=>{
  return(
<Box width="100%" >
      <Grid container spacing={1} direction="column" justifyContent='center' alignItems='center' paddingTop={4} >
        <Grid item> 
        <Typography textAlign='center'>
        <StyledTypography1 component="span" color="#0D1726" marginRight={1}>Choose a Plan that&apos;s Best for</StyledTypography1>
       <StyledTypography1 component="span" color="#1DA098" >You</StyledTypography1>

        </Typography>
       
        </Grid>
        
        <Grid item> 
       <StyledTypography2 component="div" color="#627B8F" textAlign="center" sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>We have curated best plans as per your requirement</StyledTypography2>
        </Grid>
       
       

      </Grid>
     <Grid  container  spacing={2} justifyContent='center' paddingX={{xs:2,sm:0,md:8}}>
      {
   planData.map((element,index)=>{
    return(
      <Grid item  xs={12} sm={4}  key={index}>
      <PlanCard element={element}/>
      </Grid>
    )
   })
      }
     
    
     </Grid>

      </Box>
  )
}

export default PlanInfo;

