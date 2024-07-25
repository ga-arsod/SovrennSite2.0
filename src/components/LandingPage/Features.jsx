"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';
import Image from 'next/image';
import { landingPageArray } from '@/utils/Data';

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const StyledTypography3 = styled(Typography)`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
`;

const StyledTypography4 = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const Slider = styled(Box)`
  position: absolute;
  left: -20px;
  width: 4px;
  height: 100px; /* Adjust height to cover all grid items */
  background-color: #20385E; /* Customize the color as needed */
  animation: slide 10s infinite; /* Adjust animation duration */

  @keyframes slide {
    0%, 19.9% {
      top: 15px; /* Position for the first grid item */
    }
    20%, 39.9% {
      top: 140px; /* Position for the second grid item */
    }
    40%, 59.9% {
      top: 280px; /* Position for the third grid item */
    }
    60%, 79.9% {
      top: 400px; /* Position for the fourth grid item */
    }
    80%, 99.9% {
      top: 520px; /* Position for the fifth grid item */
    }
  }
`;

const CenteredGrid = styled(Grid)`
  width: 1150px;
  max-width: 100%;
  margin: 0 auto; /* Center the grid container */
`;

const Features = () => {
  const images = [
    '/education.png',
    '/times.png',
    '/prime.png',
    '/discovery2.png',
    '/pulse.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 2000); // Change image every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isInView, images.length]);

  return (
    <Box ref={componentRef}>
      <CenteredGrid container paddingY={12} paddingX={10}>
        <Grid item xs={12}>
          <StyledTypography1 component="div" color="#20385E" marginBottom="12px">
            Features
          </StyledTypography1>
          <StyledTypography2 component="div" color="#101828">
            What you get?
          </StyledTypography2>
        </Grid>
        <Grid item xs={5} position="relative">
          <Slider />
          <Grid container>
            {
              landingPageArray.map((item, index) => (
                <Grid item paddingY={2} key={index}>
                  <StyledTypography3 component="div" color="#101828" marginBottom={1}>
                    {item.title}
                  </StyledTypography3>
                  <StyledTypography4 component="div" color="#667085">
                    {item.description}
                  </StyledTypography4>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item xs={7} display="flex" justifyContent="center" alignItems="center">
          <Box position="relative" width={400} height={560}>
            <Image
              src={images[currentImageIndex]}
              layout="fill"
              objectFit="cover" // Ensure the image covers the entire box
              alt="iPhone screen"
            />
          </Box>
        </Grid>
      </CenteredGrid>
    </Box>
  );
};

export default Features;