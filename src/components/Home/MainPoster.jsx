"use client";
import styled from "@emotion/styled";
import { Grid, Typography, Box, Button } from "@mui/material";
import React, { useState,useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { keyframes } from '@emotion/react';

import { colors } from "../Constants/colors";
const headingsArray = [
  {
    h1: "MASTER",
    h2: "Investing",
  },
  {
    h1: "UNLOCK",
    h2: "Quality Insights",
  },
  {
    h1: "DISCOVER",
    h2: "High-Potential Stocks",
  },
];

const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-transform: none;
  background-color: white;
  width: 100%;
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  width: 100%;
  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledTypography1 = styled(Typography)`
  color: ${colors.themeGreen};
  margin-right: 8px;

  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
  @media (min-width: 701px) and (max-width: 1120px) {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
  @media (min-width: 1121px) {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
`;

const StyledTyography2 = styled(Typography)`
  @media (max-width: 700px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.02em;
  }
  @media (min-width: 701px) and (max-width: 1120px) {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
  @media (min-width: 1121px) {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }
`;

const StyledTyography3 = styled(Typography)`
  @media (max-width: 1100px) {
    text-align: center;
  }
`;
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SlideInLeftBox = styled(Grid)`
opacity: 0; /* Initial state */
&.animate {
  animation: ${slideInFromLeft} 1s ease-out forwards;
}
`;

const SlideInBottomBox = styled(Box)`
opacity: 0; /* Initial state */
&.animate {
  animation: ${slideInFromBottom} 1s ease-out forwards;
}
`;

const MainPoster = () => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const hoverTransform1 = hovered ? "translate(0px, 30px)" : "translate(0, 0)";
  const hoverTransform2 = hovered ? "translate(0px, -20px)" : "translate(0, 0)";
  const hoverTransform3 = hovered ? "translate(0px, -50px)" : "translate(0, 0)";
  const hoverTransform4 = hovered ? "translate(0px, -20px)" : "translate(0, 0)";
  const hoverTransform5 = hovered ? "translate(20px, 0px)" : "translate(0, 0)";
  const hoverTransform6 = hovered ? "translate(-20px, 0px)" : "translate(0, 0)";
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200); // Delay in milliseconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <Box
      width="100vw"
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
        overflow: "hidden"
      }}
      marginTop={6}
    >
      <Grid
        container
        paddingX={2}
        justifyContent="space-between"
        paddingTop={{ xs: 7, sm: 10, lg: 0 }}
      >
        <Grid
          item
          lg={6}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
         
          <SlideInLeftBox container justifyContent="center" alignItems="center" className={animate ? 'animate' : ''}>
            <Grid item>
              <StyledTyography3 gutterBottom>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    marginRight: "3px",
                    lineHeight: "19px",
                    color: "#0D1726",
                  }}
                >
                  Sovrenn helps
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "16px",
                    color: colors.themeGreen,
                    fontWeight: "400",
                    marginRight: "3px",
                  }}
                >
                  &quot;You&quot;
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontSize: "16px", fontWeight: "400", color: "#0D1726" }}
                >
                  to
                </Typography>
              </StyledTyography3>

              <Box component="span">
                {headingsArray.map((element, index) => {
                  return (
                    <Box key={index}>
                      <StyledTyography3 marginTop={{ xs: 1, sm: 0 }}>
                        <StyledTypography1 variant="h6" component="span">
                          {element.h1}
                        </StyledTypography1>
                        <StyledTyography2 variant="h1" component="span">
                          {element.h2}
                        </StyledTyography2>
                      </StyledTyography3>
                    </Box>
                  );
                })}
              </Box>
              <Box
                sx={{ textAlign: { xs: "center", lg: "start" } }}
                marginTop={1}
              >
                <Typography
                  align="justify"
                  wrap="wrap"
                  component="span"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    color: "#0D1726",
                    fontWeight: 400,
                    lineHeight: { xs: "14px", sm: "14px" },
                  }}
                >
                  So you can take informed investing decisions to build a secure
                  financial future.
                </Typography>
              </Box>

              <Grid
                container
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ paddingTop: "12px" }}
              >
                <Grid item>
                  <StyledButton1 variant="outlined">
                    Buy Trial for 2 months @ ₹400
                  </StyledButton1>
                </Grid>
                <Grid item>
                  <StyledButton2 variant="contained">
                    Buy Full Access @ ₹5000/yr
                  </StyledButton2>
                </Grid>
              </Grid>
            </Grid>
          </SlideInLeftBox>
         
        </Grid>
        <Grid item md={6} xs={12}>
        <SlideInBottomBox className={animate ? 'animate' : ''}>
          <Grid
            container
            justifyContent="center"
            paddingTop={6}
            alignItems="center"
            sx={{
              display: "flex",

              position: "relative",
            }}
          >
            <Grid item  sx={{display:{xs:"block",md:"none"}}} >
               <Image
                src="/hero.svg"
                width={500}
                height={636}
                alt="poster"
                layout="responsive"
               
              /> 
             
            </Grid>
            <Grid item sm={6.5} sx={{display:{xs:"none",md:"block"}}}>
            <Box
                sx={{ position: "relative",display:{xs:"none",md:"block" }}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src="/hero2.svg"
                  alt="Parent"
                  width={500}
                  height={410}
                  layout="fixed"
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: "183px",
                    height: "68px",
                    top: 0,
                    left: "-10vh",
                    transition: "transform 0.3s",
                    transform: hoverTransform1,
                  }}
                >
                  <Image
                    src="/group1.svg"
                    alt="Top Left"
                    width={183}
                    height={68}
                    layout="responsive"
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "35px",
                    height: "35px",
                    top: "25vh",
                    left: "20vh",
                    transition: "transform 0.3s",
                    transform: hoverTransform2,
                  }}
                >
                  <Image
                    src="/group2.svg"
                    alt="Top Right"
                    width={35}
                    height={35}
                    layout="responsive"
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "121px",
                    height: "61px",
                    top: "55vh",
                    left: "3vh",
                    transition: "transform 0.3s",
                    transform: hoverTransform3,
                  }}
                >
                  <Image
                    src="/group3.svg"
                    alt="Bottom Left"
                    width={121}
                    height={61}
                    layout="responsive"
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "129px",
                    height: "32px",
                    top: "62vh",
                    left: "33vh",
                    transition: "transform 0.3s",
                    transform: hoverTransform4,
                  }}
                >
                  <Image
                    src="/group4.svg"
                    alt="Bottom Right"
                    width={129}
                    height={32}
                    layout="responsive"
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "35px",
                    height: "35px",
                    bottom: "10px",
                    right: "-10vh",
                    transition: "transform 0.3s",
                    transform: hoverTransform5,
                  }}
                >
                  <Image
                    src="/group5.svg"
                    alt="Bottom Right"
                    width={35}
                    height={35}
                    layout="responsive"
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "129px",
                    height: "166px",
                    bottom: "15vh",
                    right: "-25vh",
                    transition: "transform 0.3s",
                    transform: hoverTransform6,
                  }}
                >
                  <Image
                    src="/group6.svg"
                    alt="Bottom Right"
                    width={129}
                    height={166}
                    layout="responsive"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          </SlideInBottomBox>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MainPoster;
