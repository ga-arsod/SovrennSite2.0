"use client"
import React from "react";
import styled from "@emotion/styled";
import { Box,Grid,Typography,Button } from "@mui/material";

const StyledGrid = styled(Box)`

position:relative;
z-index:10;
width:100%;
bottom:5rem;
left:15%
`;
const TrialCard=()=>{
  return(
    <>
    <Box sx={{position:'absolute'}}>
      <StyledGrid container justifyContent='center' >
<Grid item  sx={{background: "linear-gradient(to right, #0C4340, #4AB3AD)",borderRadius:'8px',}}>
<Grid container alignItems='center' justifyContent='space-between' paddingY={6} paddingX={9}>
        <Grid item  width="70%">
        <Typography color='#F3FAFB' sx={{fontWeigt:'700',fontSize:'28px',lineHeight:"34px"}} gutterBottom>Begin your 2-month trial for only ₹400 today!</Typography>
        <Typography  sx={{color:"#F4F3F3",fontWeigt:'400',fontSize:'20px',lineHeight:"24px"}}>Unlock two months of financial insight with Sovrenn. Empower your investing journey today!</Typography>
        </Grid>
        <Grid item >
        <Button variant="contained"  sx={{ color: '#1DA098',fontWeight:"600",fontSize:"18px" ,backgroundColor:"white",lineHeight:"21px" ,textTransform:'none'}}>Buy Trial Now</Button>
        </Grid>
        </Grid>

</Grid>
      </StyledGrid>
      

      

    </Box>

   
    </>
  )
}
export default TrialCard;