"use client";
import React from 'react';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import Link from 'next/link';

const StyledTypography1 = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  
  color: ${colors.greyBlue500};
  text-align: center;
`;





const EmptyExam = () => {
  return (
    <Grid container marginTop={12} marginBottom={6} flexDirection='column' alignItems='center' width='100%'>
      <Grid item>
        <Image
          src="/exam-trophy.png"
          alt="..."
          width={400}
          height={350}
        />
        <StyledTypography1 marginTop={4}>
        No one has taken the exam yet. You could be the first to take the exam today.
        </StyledTypography1>
       
        
      </Grid>
    </Grid>
  );
}

export default EmptyExam;