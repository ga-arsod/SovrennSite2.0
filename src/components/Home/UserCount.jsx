"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
 
  Box,
} from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import { Fade } from "@mui/material";
import { useSelector } from "react-redux";

const UserCount = () => {
  const analyticsArray = [
    {
      icon: "/icon1.svg",
      heading: "30k+ Daily Readers",
    },
    {
      icon: "/icon2.svg",
      heading: "10k+ Articles with daily updates",
    },
    {
      icon: "/icon3.svg",
      heading: "Community of 30k+ Investors",
    },
    {
      icon: "/icon4.svg",
      heading: "4.2+ Rating on Playstore",
    },
  ];
  const [inView, setInView] = useState(false);
  const { isAuth } = useSelector((store) => store.auth);
   
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

  const StyledTypography1 = styled(Typography)`
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    @media (max-width: 700px) {
      font-size: 19px;
    }
  `;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Fade in={inView} timeout={2000}>
        <Grid
          container
          alignItems="flex-start"
          justifyContent="center"
          direction="row"
          paddingX={{ xs: 2, lg: 10 }}
          paddingTop={{ xs:isAuth ? 4 : 8, sm: 6 }}
          paddingBottom={{ xs: 2, sm: 6 }}
          spacing={{xs:6,sm:4}}
          ref={ref}
          sx={{ opacity: inView ? 1 : 0 }}
        >
          {analyticsArray.map((element, index) => {
            return (
              <Grid
                item
                xs={6}
                sm={3}
                md={2.8}
                key={index}
                height={{ sm: "12vh", lg: "20vh" }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                >
                  <Box
                    sx={{
                      width: { xs: "32px", sm: "64px" },
                      height: { xs: "32px", sm: "64px" },
                    }}
                  >
                    <Image
                      src={element.icon}
                      alt={`icon${index}`}
                      width={64}
                      height={64}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                  <Grid
                    item
                    width={{ sm: "90%", md: "80%", xl: "37%" }}
                  >
                    <StyledTypography1
                      color="#0D1726"
                      align="center"
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        lineHeight: "28px",
                      }}
                    >
                      {element.heading}
                    </StyledTypography1>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Fade>
    </Box>
  );
};
export default UserCount;
