import React from 'react';
import Image from 'next/image';
import styled from "@emotion/styled";
import { Grid } from '@mui/material';
import { colors } from '../Constants/colors';

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 420px;  /* Maximum width for the image */
  height: auto;      /* Keep the height proportional */
`;

const EmptySelfHelp = () => {
  return (
    <Grid container justifyContent="center" direction="column" alignItems="center" marginTop={4}>
      <Grid item sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
        <ImageWrapper>
          <Image
            src="/self-help.png"
            alt="Self Help"
            width={420}  
            height={330}  
            layout="responsive" 
            objectFit="contain"
          />
        </ImageWrapper>
      </Grid>
    </Grid>
  );
};

export default EmptySelfHelp;
