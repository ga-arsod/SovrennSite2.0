"use client"
import React from "react";
import { Typography,Box,Grid} from "@mui/material";
import styled from '@emotion/styled';
import FoundersCard from "./Cards/FoundersCard";
import { foundersArray } from "@/app/utils/Data";

const StyledTypography = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
`;

const FoundersInfo=()=>{
  return(
<Box sx={{backgroundImage: `url('/rectangle.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',}}>
      <Grid container spacing={1} direction="column" justifyContent='center' alignItems='center' paddingTop={4}>
        <Grid item> 
       <StyledTypography component="span" color="#0D1726" marginRight={1} >Meet Our</StyledTypography>
       <Typography component="span" color="#1DA098" sx={{fontWeight:"600",fontSize:"34px",lineHeight:"40px"}}>Founders</Typography>
        </Grid>
        
        <Grid item> 
       <Typography component="div" color="#627B8F"  sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>Get to Know the Minds Behind Sovrenn</Typography>
        </Grid>
       
       

      </Grid>
      <Grid container justifyContent='center'>
        {
foundersArray.map((item,index)=>{
  return(
    <FoundersCard key={index} item={item}/>
  )
})
        }

      </Grid>

      </Box>
  )
}
export default FoundersInfo;