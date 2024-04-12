"use client"
import React from "react";
import { Typography,Box,Grid} from "@mui/material";
import styled from '@emotion/styled';
import FoundersCard from "./Cards/FoundersCard";
import { foundersArray } from "@/utils/Data";



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

const FoundersInfo=()=>{
  return(
<Box sx={{backgroundImage: `url('/rectangle.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',}}>
      <Grid container spacing={1} direction="column" justifyContent='center' alignItems='center' paddingTop={4}>
        <Grid item> 
        <Typography textAlign="center">
        <StyledTypography1 component="span" color="#0D1726" marginRight={1} >Meet Our</StyledTypography1>
       <StyledTypography1 component="span" color="#1DA098" >Founders</StyledTypography1>
        </Typography>
      
        </Grid>
        
        <Grid item> 
       <StyledTypography2 textAlign='center' component="div" color="#627B8F">Get to Know the Minds Behind Sovrenn</StyledTypography2>
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