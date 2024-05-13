"use client"
import React from "react";
import { Box } from "@mui/system";
import styled from '@emotion/styled';
import { Typography,Grid } from "@mui/material";
import CustomerCard from "../Cards/CustomerCard";
import Marquee from "react-fast-marquee";
import { customerArray } from "@/utils/Data";




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
font-size:20px;
line-height:24px;
}

`;
const StyledBox = styled(Box)`
background: linear-gradient(to right, #0C4340, #4AB3AD);
`;
const CustomerVerdict = () => {
  
  
  return (
    <StyledBox>
      <Grid container justifyContent='center' py={3} sx={{position:"relative"}}>
        <Grid item paddingX={5}>
          <StyledTypography1 component="div" color="white" textAlign='center' gutterBottom>
            What Our Customers Say About Us
          </StyledTypography1>
          <StyledTypography2
            component="div"
            color="#FCFBFB"
            textAlign="center"
            marginBottom={1}
            
          >
            Words of our customer matters to us
          </StyledTypography2>
        </Grid>
     
       
      </Grid>
     <Grid container spacing={4} paddingY={2} >
     
     <Marquee>
      {
      customerArray.map((element,index)=>{
        return(
          <Grid item key={index} xs={8} md={4} marginRight={1} marginBottom={2}>
          <CustomerCard element={element}/>
        </Grid>

        )
      })
      }
         
      
      
      </Marquee>
        
      
      
     </Grid>
      
    </StyledBox>
  );
};

export default CustomerVerdict;
