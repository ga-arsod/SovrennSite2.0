"use client";
import React from 'react';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import Link from 'next/link';

const StyledTypography1 = styled(Typography)`
  font-size: 34px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.04em;
  color: #20365B;
  text-align: center;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: #627B8F;
  text-align: center;
`;

const StyledTypography3 = styled(Typography)`
  font-size: 19px;
  font-weight: 600;
  line-height: 23px;
  text-align: center;
  color: ${colors.themeGreen};
  position: relative;

  & > span {
    display: inline-block;
    position: relative;
  }

  & > span::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${colors.themeGreen};
    position: absolute;
    bottom: -2px;
    left: 0;
  }

  & > span:hover::after {
    height: 2px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.themeGreen};
`;

const EmptyWatchlist = () => {
  return (
    <Grid container marginTop={12} marginBottom={6} flexDirection='column' alignItems='center' width='100%'>
      <Grid item>
        <Image
          src="/watchlist-image.png"
          alt="..."
          width={350}
          height={350}
        />
        <StyledTypography1 marginTop={4}>
          Your Watchlist is empty
        </StyledTypography1>
        <StyledTypography2 marginTop={0.5}>
          to add company in watch list
        </StyledTypography2>
        <StyledLink href="self-help">
          <StyledTypography3 marginTop={4}>
            <span>Go to Self Help &gt;</span>
          </StyledTypography3>
        </StyledLink>
      </Grid>
    </Grid>
  );
}

export default EmptyWatchlist;