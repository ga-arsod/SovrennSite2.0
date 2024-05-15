"use client"
import React from 'react'
import { Box,Grid,Typography,Stack,Rating } from '@mui/material'
import styled from '@emotion/styled'
import { colors ,gradientColors} from '../Constants/colors'


const StyledTypography1=styled(Typography)`
font-weight:400;
font-size:33px;
line-height:40px;
color:white;

`;

const StyledTypography2=styled(Typography)`
font-weight:400;
font-size:18px;
line-height:24px;
color:white;

`;

const SignInCard = () => {
  return (
    <>
   <Box sx={{background:`linear-gradient(45deg, ${gradientColors.c1}, ${gradientColors.c2})`,height:"30vh",position:"absolute",bottom:0} } display="flex" alignItems="center">
    <Grid container  paddingX={6} justifyContent="center" alignItems="center">
        <Grid item>
            <StyledTypography1 textAlign="center" gutterBottom>
            “Sovrenn is best, they give really good information regarding investing...”
            </StyledTypography1>
           <Box display="flex" justifyContent="center" marginBottom={1}>
           <Rating 
       sx={{
        '& .MuiRating-iconFilled': {
          color: 'white', 
        },
      }}
      name="half-rating-read" max={4} value={4}  readOnly size="small" />

           </Box>
   
      
   
            <StyledTypography2  textAlign="center" gutterBottom>
            Suyash Gupta,
                

            </StyledTypography2>
            <StyledTypography2 textAlign="center">
           Startup Founder
                

            </StyledTypography2>

        </Grid>

    </Grid>

   </Box>
    </>
  )
}

export default SignInCard