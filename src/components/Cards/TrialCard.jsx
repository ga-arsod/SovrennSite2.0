"use client"

import React from "react";
import styled from "@emotion/styled";
import { Box,Grid,Typography,Button } from "@mui/material";

const StyledGrid = styled(Box)`

position:relative;
z-index:10;
width:80%;
bottom:5rem;
left:10%

`;

const StyledTypography1=styled(Typography)`
font-weight:700;
font-size:26px;
line-height:34px;    

@media (max-width:700px)
{
  font-weight:600;
font-size:20px;
line-height:28px;  
}


`;

const StyledTypography2 = styled(Typography)`
font-weight:400;
font-size:18px;
line-height:24px;
@media (max-width:700px)
{
  font-weight:400;
font-size:12px;
line-height:19px;
}

`;

const TrialCard=()=>{
  return(
    <>

    <Box sx={{position:'absolute'}} bgcolor={{xs:'#0D1726',sm:""}}  width="100vw"  >
      <StyledGrid container justifyContent='center' paddingTop={{xs:15,sm:0}} >
<Grid item  sx={{background: "linear-gradient(to right, #0C4340, #4AB3AD)",borderRadius:'8px',}}>
<Grid container direction={{xs:"column",sm:"row"}}   spacing={2} alignItems='center' justifyContent='space-between' paddingY={{xs:2,md:6}} paddingX={{xs:2,sm:4}} >
        <Grid item  width={{xs:"90",sm:"70%"}}>
        <StyledTypography1 color='#F3FAFB'  gutterBottom>Begin your 2-month trial for only ₹400 today!</StyledTypography1>
        <StyledTypography2 color="#F4F3F3" textAlign="justify" >Unlock two months of financial insight with Sovrenn. Empower your investing journey today!</StyledTypography2>
        </Grid>
        <Grid item >
        <Button variant="contained"  sx={{ color: '#1DA098',fontWeight:"600",fontSize:{xs:"16px",sm:"16px"} ,backgroundColor:"white",lineHeight:"21px" ,textTransform:'none'}}>Buy Trial Now</Button>
        </Grid>
        </Grid>

</Grid>
      </StyledGrid>
      

      

    </Box>

   
    </>
  )
}
export default TrialCard;