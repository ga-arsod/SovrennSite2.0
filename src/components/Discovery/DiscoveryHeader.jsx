"use client"
import React from 'react'
import { Grid,Box, Typography, IconButton } from '@mui/material'
import styled from '@emotion/styled'
import { colors } from '../Constants/colors';


const StyledTypography1=styled(Typography)`
font-weight:700;
font-size:28px;
line-height:34px;
letter-spacing:-0.02em;

`;
const HoverBox = styled(Box)`
  background-color: #F6F5F5;
  border-radius:4px;
  margin-bottom: 8px;
  cursor:pointer;
  &:hover {
    background-color: ${colors.neutral900}; 
  }
`;
const DiscoveryHeader = () => {
  return (
    <>
   
    </>
  )
}

export default DiscoveryHeader
