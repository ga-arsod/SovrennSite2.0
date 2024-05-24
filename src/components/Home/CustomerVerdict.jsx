"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { Typography, Grid } from "@mui/material";
import CustomerCard from "../Cards/CustomerCard";
import Marquee from "react-fast-marquee";
import { customerArray } from "@/utils/Data";
import { gradientColors } from "../Constants/colors";
import { Fade } from "@mui/material";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
`;
const StyledBox = styled(Box)`
  background: linear-gradient(
    45deg,
    ${gradientColors.c1},
    ${gradientColors.c2}
  );
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
const CustomerVerdict = () => {
  const [inView, setInView] = useState(false);
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

  return (
    <StyledBox>
      <Grid
        container
        justifyContent="center"
        py={3}
        sx={{ position: "relative" }}
      >
        <Grid item paddingX={5}>
          <FadeInBox ref={domRef} className={isVisible ? "visible" : ""}>
            <StyledTypography1
              component="div"
              color="white"
              textAlign="center"
              gutterBottom
            >
              What Our Customers Say About Us
            </StyledTypography1>
            <StyledTypography2
              component="div"
              color="#FCFBFB"
              textAlign="center"
              marginBottom={1}
            >
              Words of our customer matters to us
            </StyledTypography2>
          </FadeInBox>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        paddingY={2}
        ref={ref}
        sx={{ opacity: inView ? 1 : 0 }}
      >
        <Marquee>
          {customerArray.map((element, index) => {
            return (
              <Grid
                item
                key={index}
                xs={8}
                md={4}
                marginRight={1}
                marginBottom={2}
              >
                <CustomerCard element={element} />
              </Grid>
            );
          })}
        </Marquee>
      </Grid>
    </StyledBox>
  );
};

export default CustomerVerdict;
