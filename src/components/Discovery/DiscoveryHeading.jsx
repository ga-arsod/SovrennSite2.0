
"use client"
import styled from '@emotion/styled'
import { Grid,Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';


const StyledTypography1=styled(Typography)`
font-weight:600;
font-size:48px;
line-height:56px;
`
const StyledTypography2=styled(Typography)`
font-weight:600;
font-size:19px;
line-height:23px;
`
const DiscoveryHeading = () => {
    const theme=useTheme();
  return (
    <Grid container height="30vh" alignItems="center">
       <Grid item>
        <StyledTypography1 color="#20365B" marginRight={1} component="span" >
            Stock
        </StyledTypography1>
        <StyledTypography1 color={theme.palette.primary.main}  component="span">
           discovery
        </StyledTypography1>
        <StyledTypography2 color="#4D5E7C">
        Explore our thematic buckets of stocks for capturing the decadal trends in your personal investment portfolio.
        </StyledTypography2>

       </Grid>
        </Grid>
  )
}

export default DiscoveryHeading
