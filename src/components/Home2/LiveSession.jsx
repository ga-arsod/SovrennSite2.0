"use client";
import styled from "@emotion/styled";
import React from "react";
import { Grid,Box,Typography } from "@mui/material";

const StyledTypography1=styled(Typography)`
color:white;
font-weight:600;
font-size:34px;
line-height:44px;

`;
const StyledTypography2=styled(Typography)`
color:white;
font-weight:400;
font-size:20px;
line-height:30px;

`;
const LiveSession=()=>{
    return(
        <>
        <Box height="35vh" display="flex" alignItems="center" justifyContent="center" sx={{background: "linear-gradient(to right, #0C4340, #4AB3AD)"}} marginTop={3}>
       <Grid container width="100%">
       <Grid item width="100%">
        <StyledTypography1 component="h2" textAlign="center" gutterBottom>
        Book a live session
        </StyledTypography1>
       <StyledTypography2 textAlign="center"> 
       Join over 1,000+ learners who already started investing after this session

       </StyledTypography2>
       </Grid>
       </Grid>
      

      

    </Box>
        </>
    )
}
export default LiveSession;