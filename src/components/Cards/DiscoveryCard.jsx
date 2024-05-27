"use client"
import React from 'react'
import { Box,Grid,IconButton,Typography } from '@mui/material'
import Image from 'next/image'
import { colors } from '../Constants/colors'
import styled from "@emotion/styled";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledTypography1=styled(Typography)`
font-weight:600;
font-size:20px;
line-height:24px;
color:${colors.black}
`;
const StyledTypography2=styled(Typography)`
font-weight:600;
font-size:14px;
line-height:17px;

`;
const DiscoveryCard = () => {
  return (

 <>
 <Box>
  <Grid container gap={1.5} >
    {
      Array.from("abcedfghij").map((item,index)=>{
        return(
          <>
           <Grid item key={index} xs={12} sm={6} md={2.9} bgcolor={colors.navyBlue50} direction={{xs:"column",sm:"row"}} sx={{borderRadius:"3px"}}>
      <Grid container>
       <Grid item paddingY={2} paddingX="20px" width="100%">
       <Box
        sx={{
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/discovery.jpg"
          width={274}
          height={140}
          alt="poster"
          layout="responsive"
        />
      </Box>
              </Grid>
              <Grid item paddingX="11px">
              <StyledTypography1 gutterBottom>
              Preferential Issuance
              </StyledTypography1>
              <StyledTypography2 color={colors.navyBlue400} marginBottom={2}>
              List of interesting stocks in the process of raising capital via Preferential Issuance
              </StyledTypography2>
              </Grid>
        <Grid item width="100%" sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}} paddingX="11px" marginTop={2} marginBottom="12px">
       <StyledTypography2 component="span" color={colors.themeGreen}>187 Companies are in this bucket</StyledTypography2>
      
         <IconButton sx={{
          padding: 0, 
          height: "24px",
          width: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border:" 1px solid #B0B7BC",borderRadius:"50%",
          backgroundColor:colors.white
        }}>
         <ArrowForwardIcon fontSize='small' sx={{color:"#3C464F"}}/>
         </IconButton>
      
        </Grid>
       
       
      </Grid>


    </Grid>
          </>
        )
      })
    }
   
    </Grid>
 </Box>


 </>


 
  

  )
}

export default DiscoveryCard
