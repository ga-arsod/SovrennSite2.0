


"use client"
import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { androidAppLink,iosAppLink } from '@/utils/Data';
import Link from 'next/link';
import styled from "@emotion/styled";
import { colors } from '@/components/Constants/colors';

const StyledTypography1 = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: -0.02em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.02em;
    text-align: start;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
 
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.02em;
    text-align: start;
  }
`;

const PaymentConfirmation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
       backgroundColor:'red',
       
        
      }}
      marginTop="60px"
    >
      {/* Header Section */}
      <StyledTypography1 color="#034635" paddingTop={5}>
        Congrats! You have successfully subscribed!
      </StyledTypography1>
      <StyledTypography2
       marginTop={1}
       color={colors.navyBlue200}
      >
        This is official confirmation. Thanks for joining Sovrenn Full Access.
      </StyledTypography2>

      {/* Illustration */}
      <Box sx={{ marginBottom: '24px' }}>
        <Image
          src="/payment-confirmation.png" 
          alt="Success Illustration"
          width={217}
          height={258}
        />
      </Box>

      {/* Download App Section */}
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: '600',
          lineHeight:'19px',
          letterSpacing:'-0.02em'
        }}
        color={colors.navyBlue200}
      >
        Please download the Sovrenn app for a complete Sovrenn experience:
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '32px' }} >
      <Grid item>
                  <Link
                    href={iosAppLink}
                    passHref
                     target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Image
                      src="/appstore3.png"
                      width={132}
                      height={44}
                      alt="play-store"
                    />
                    </Link>
                  </Grid>
                  <Grid item>
                  <Link
                    href={androidAppLink}
                    passHref
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Image
                      src="/mobilestore.png"
                      width={132}
                      height={44}
                      alt="app-store"
                    />
                    </Link>
                  </Grid>
      </Grid>

      {/* Additional Information */}
      <StyledTypography2
       color={colors.navyBlue200}
      >
        You will be added to Sovrenn Times group shortly in the next 24-48 hours. In case you are not added, please send an email at{' '}
        <Typography component="a" href="mailto:help@sovrenn.com" sx={{ color:colors.themeGreen }}>
          help@sovrenn.com
        </Typography>.
      </StyledTypography2>

      <Box sx={{ textAlign: 'left', marginBottom: '24px' }}>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#555',
            lineHeight: '1.8',
          }}
        >
          1. Please learn investing by watching videos at{' '}
          <Typography component="a" href="https://sovrenn.com/education" sx={{ color: '#007aff' }}>
            sovrenn.com/education
          </Typography>.
          <br />
          2. Please read all Sovrenn prime articles and promoter interviews at{' '}
          <Typography component="a" href="https://sovrenn.com/prime" sx={{ color: '#007aff' }}>
            sovrenn.com/prime
          </Typography>.
          <br />
          3. Please check our discovery platform at{' '}
          <Typography component="a" href="https://sovrenn.com/discovery" sx={{ color: '#007aff' }}>
            sovrenn.com/discovery
          </Typography>.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="success"
            sx={{
              textTransform: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Discover Stocks
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              textTransform: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Back to Homepage
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentConfirmation;
