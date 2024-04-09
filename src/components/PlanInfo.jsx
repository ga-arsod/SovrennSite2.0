"use client"
import React from "react";
import PlanCard from "./PlanCard";
import {Box,Grid,Typography} from "@mui/material";
import styled from '@emotion/styled';
import { planData } from "../app/utils/Data";



const StyledTypography = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
`;


const PlanInfo=()=>{
  return(
<Box >
      <Grid container spacing={1} direction="column" justifyContent='center' alignItems='center' py={3}>
        <Grid item> 
       <StyledTypography component="span" color="#0D1726" marginRight={1} >Choose a Plan that’s Best for You</StyledTypography>
       <Typography component="span" color="#1DA098" sx={{fontWeight:"600",fontSize:"34px",lineHeight:"40px"}}>You</Typography>
        </Grid>
        
        <Grid item> 
       <Typography component="div" color="#627B8F"  sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>We have curated best plans as per your requirement</Typography>
        </Grid>
       
       

      </Grid>
     <Grid  container  spacing={5} justifyContent='center'>
      {
   planData.map((element)=>{
    return(
      <Grid item  sm={3} >
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

