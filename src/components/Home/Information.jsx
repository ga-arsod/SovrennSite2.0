"use client";
import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Grid } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { colors } from "../Constants/colors";
import { Fade } from "@mui/material";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  letter-spacing: -0.04em;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    text-align: center;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
`;

const Container = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  cursor: pointer;
`;

const ParentImage = styled(Image)`
  border-radius: 12px;
`;

const FadeInBox = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
  "&.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const Information = () => {
  const theme = useTheme();
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          paddingX={{ xs: 2, sm: 3, md: 2 }}
          paddingY={6}
        >
          <FadeInBox ref={domRef} className={isVisible ? "visible" : ""}>
            <Grid item>
              <Typography sx={{ textAlign: "center" }} marginBottom={{xs:1,sm:"20px"}}>
                <StyledTypography1
                  component="span"
                  marginRight={1}
                  color="#0D1726"
                >
                  Everything You Need to Know About
                </StyledTypography1>
                <StyledTypography1 component="span" color={colors.themeGreen}>
                  Sovrenn
                </StyledTypography1>
              </Typography>
            </Grid>
            <Grid item sx={{ textAlign: "center" }} marginBottom={5}>
              <StyledTypography2
                component="span"
                justifyContent="center"
                wrap="wrap"
                gutterBottom
                color="#627B8F"
              >
                Here is a video that will quickly enable you to understand what
                you can expect from Sovrenn.
              </StyledTypography2>
            </Grid>
          </FadeInBox>
          <Grid item>
            <Fade in={inView} timeout={1000}>
              <Container ref={ref} sx={{ opacity: inView ? 1 : 0 }}>
                {isPlaying ? (
                  <video
                    width="750"
                    height="470"
                    controls
                    autoPlay
                    style={{ borderRadius: "12px" }}
                  >
                    <source src="https://dwht5p5xdhql3.cloudfront.net/VIDEO/HowToUseSovrennIntro.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    <ParentImage
                      src="/green.svg"
                      alt="..."
                      width={750}
                      height={470}
                      layout="responsive"
                    />
                    <OverlayImage
                      src="/play.svg"
                      alt="Overlay Image"
                      width={80}
                      height={80}
                      onClick={handlePlayClick}
                    />
                  </>
                )}
              </Container>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Information;