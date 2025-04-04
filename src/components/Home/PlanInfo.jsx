"use client"
import React, { useState, useEffect, useRef } from "react";
import PlanCard from "../Cards/PlanCard";
import { Box, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { planData } from "../../utils/Data";
import { colors } from "../Constants/colors";
import { Fade } from "@mui/material";
import PricingCard from "../Cards/PricingCard";
import { useDispatch } from "react-redux";
import { allPlansApi } from "@/app/Redux/Slices/PlanSlice";
import { useSelector } from "react-redux";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  @media (max-width: 639px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    letter-spacing: 0.02em;
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

const PlanInfo = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const { plans } = useSelector(
    (store) => store.plan
  );
  const { isAuth } = useSelector(
    (store) => store.auth
  );
 
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(allPlansApi())
  },[isAuth])
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
    <Box width="100%" paddingY={{xs:"20px",sm:6}}>
      <FadeInBox ref={domRef} className={isVisible ? "visible" : ""}>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography textAlign="center" paddingX={2} marginBottom={{xs:1,sm:"20px"}}>
              <StyledTypography1
                component="span"
                color="#0D1726"
                marginRight={1}
              >
                Choose a Plan that&apos;s Best for
              </StyledTypography1>
              <StyledTypography1 component="span" color={colors.themeGreen}>
                You
              </StyledTypography1>
            </Typography>
          </Grid>

          <Grid item>
            <StyledTypography2
              component="div"
              marginBottom={5}
              color="#627B8F"
              textAlign="center"
              sx={{ fontWeight: "400", fontSize: "20px", lineHeight: "24px" }}
            >
              We have curated best plans as per your requirement
            </StyledTypography2>
          </Grid>
        </Grid>
      </FadeInBox>
      <Fade in={inView} timeout={1000}>
        <Grid
          container
          ref={ref}
          sx={{ opacity: inView ? 1 : 0 }}
         
         
        >
         <PricingCard planDetails={plans}/>
        </Grid>
      </Fade>
    </Box>
  );
};

export default PlanInfo;
