"use client";
import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Grid } from "@mui/material";
import styled from "@emotion/styled";
import FoundersCard from "../Cards/FoundersCard";
import { foundersArray } from "@/utils/Data";
import { colors } from "../Constants/colors";
import { Fade } from "@mui/material";

import { expertDataArray } from "@/utils/Data";
import { usePathname } from "next/navigation";

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
    font-size: 12px;
    line-height: 14px;
  }
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

const FoundersInfo = () => {
  const pathname = usePathname();
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
    <Box
      sx={{
        backgroundImage: `url('/rectangle.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FadeInBox ref={domRef} className={isVisible ? "visible" : ""} >
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
          paddingTop={{xs:"20px",sm:pathname==="/"?"48px":"20px",md:"48px"}}
        >
          <Grid item>
            <Typography textAlign="center">
              <StyledTypography1
                component="span"
                color="#0D1726"
                marginRight={1}
              >
                {pathname === "/"
                  ? expertDataArray.foundersH1
                  : expertDataArray.expertH1}
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                {pathname === "/"
                  ? expertDataArray.foundersH2
                  : expertDataArray.expertH2}
              </StyledTypography1>
            </Typography>
          </Grid>

          <Grid item>
            <StyledTypography2
              textAlign="center"
              component="div"
              color="#627B8F"
            >
              {pathname === "/"
                ? expertDataArray.foundersDescription
                : expertDataArray.expertDescription}
            </StyledTypography2>
          </Grid>
        </Grid>
      </FadeInBox>
      <Fade in={inView} timeout={1000}>
        <Grid
          container
          justifyContent="center"
          item
          ref={ref}
          sx={{ opacity: inView ? 1 : 0 }}
         marginTop={{xs:"20px",sm:6}}
        >
          {(pathname === "/" ? foundersArray : foundersArray.slice(0, 1)).map(
            (item, index) => {
              return <FoundersCard key={index} item={item} />;
            }
          )}
        </Grid>
      </Fade>
    </Box>
  );
};
export default FoundersInfo;
