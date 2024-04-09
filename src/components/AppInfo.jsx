"use client"
import { Grid ,Box,Typography,Button} from "@mui/material";
import React from "react";
import styled from '@emotion/styled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const StyledTypography = styled(Typography)`
font-weight:600;
font-size:34px;
line-height:40px;
width=100%;
`;
const AppInfo=()=>{
  return(
    <Box backgroundColor="#F3FAFB"  >
 <Grid container direction='column' spacing={10} paddingBottom={13} >
  <Grid item>
    <Grid container spacing={4} direction='column' alignItems='center' paddingTop={10}>
    <Grid item> 
       <StyledTypography component="span" color="#0D1726" marginRight={1}>Still have questions?</StyledTypography>
      
        </Grid>
        
        <Grid item> 
       <Typography component="div" color="#627B8F"  sx={{fontWeight:"400",fontSize:"20px",lineHeight:"24px"}}>Your Questions Matter, and We're Here to Help!</Typography>
        </Grid>
       
        <Grid item>
        <Button variant="contained"  startIcon={<MailOutlineIcon />} sx={{ color: 'white',fontWeight:"600",textTransform:'none',fontSize:"16px" ,backgroundColor:'#20365B',lineHeight:"35px" }}>Write to Us</Button>
        </Grid>

    </Grid>
  </Grid>
     <Grid item>
      <Grid container justifyContent='space-between' paddingX={20} alignItems='center'>
        <Grid item>
        <Typography component="div" color='#0D1726' sx={{fontWeight:'600',fontSize:'23px',lineHeight:"28px"}} gutterBottom>Experience the ease of Sovrenn with our mobile app</Typography>
        <Typography component="div" color='#627B8F' sx={{fontWeight:'400',fontSize:'16px',lineHeight:"19px"}}>simplify your investment journey and start investing at your fingertips!</Typography>
        </Grid>
        <Grid item>
          <Grid container direction='column'>
         <Grid item>
         <img    src="/playStore.png" alt="..."/>
         </Grid>
         <Grid item>
         <img   src="/appStore.png" alt="..." />
         </Grid>
          </Grid>
       
      
       
        </Grid>

      </Grid>

     </Grid>
       
     </Grid>
    </Box>
    
  )
}

export default AppInfo;