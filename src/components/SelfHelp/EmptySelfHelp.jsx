import React from 'react';
import Image from 'next/image';
import styled from "@emotion/styled";
import { Grid, Typography } from '@mui/material';
import { colors } from '../Constants/colors';

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  margin-top: 16px;
`;

const ImageWrapper = styled.div`
  max-width: 420px; /* Set the maximum width for larger screens */
  width: 100%; /* Ensures the image scales down on smaller screens */
  position: relative;
  aspect-ratio: 420 / 330; /* Maintain aspect ratio */
`;

const EmptySelfHelp = () => {
  return (
    <Grid container justifyContent="center" direction="column" alignItems="center" marginTop={4}>
      <Grid item sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
        <ImageWrapper>
          <Image
            src="/self-help.png"
            alt="Self Help"
            layout="fill" 
            objectFit="contain" 
          />
        </ImageWrapper>
        <StyledTypography1 color={colors.greyBlue800}>
          Select an option for which you want to calculate
        </StyledTypography1>
      </Grid>
    </Grid>
  );
};

export default EmptySelfHelp;