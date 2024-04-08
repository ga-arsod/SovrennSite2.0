"use client"
import React from "react";
import { Box } from "@mui/system";
import styled from '@emotion/styled';
import { Typography,Grid } from "@mui/material";
import CustomerCard from "./CustomerCard";
import Marquee from "react-fast-marquee";


const StyledTypography = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
width=100%;
`;

const StyledBox = styled(Box)`
background: linear-gradient(to right, #0C4340, #4AB3AD);
`;
const CustomerVerdict = () => {
  
  
  return (
    <StyledBox sx= {{height:"60vh"}}>
      <Grid container justifyContent='center' py={3} sx={{position:"relative"}}>
        <Grid item>
          <StyledTypography component="div" color="white">
            What Our Customers Say About Us
          </StyledTypography>
          <Typography
            component="div"
            color="#FCFBFB"
            textAlign="center"
            sx={{ fontWeight: "400", fontSize: "20px", lineHeight: "24px", marginTop:"8px" }}
          >
            Words of our customer matters to us
          </Typography>
        </Grid>
     
       
      </Grid>
     <Grid container spacing={4} padding={2} >
     
     <Marquee>
          <Grid item >
        <CustomerCard/>
      </Grid>
      <Grid item>
        <CustomerCard/>
      </Grid>
      <Grid item>
        <CustomerCard/>
      </Grid>
      <Grid item>
        <CustomerCard/>
      </Grid>
      <Grid item>
        <CustomerCard/>
      </Grid>
      
      </Marquee>
        
      
      
     </Grid>
      
    </StyledBox>
  );
};

export default CustomerVerdict;
