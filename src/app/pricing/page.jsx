"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import PricingCard from "../../components/Cards/PricingCard";
import { useRouter } from "next/navigation";
import { allPlansApi } from "../Redux/Slices/PlanSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const StyledTypography1 = styled(Typography)`
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: -0.04em;
  @media (max-width: 639px) {
    font-size: 23px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.02em;
    text-align: start;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  @media (max-width: 639px) {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    text-align: start;
  }
`;

const PricingPage = () => {
  const { plans } = useSelector((store) => store.plan);
  const { isAuth } = useSelector((store) => store.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    dispatch(allPlansApi());
    
    const title = "Sovrenn Pricing Plans";
    const description =
      "Discover the pricing plans of Sovrenn Financial Technologies! Unlock access to India's premier platform for potential small and micro-cap stocks.";
    
    const url = "https://www.sovrenn.com/discovery";

 
    if (typeof document !== "undefined") {
     
      document.title = title;

    
      let metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }

   
      let metaTitle = document.querySelector("meta[property='og:title']");
      if (metaTitle) {
        metaTitle.setAttribute("content", title);
      } else {
        metaTitle = document.createElement("meta");
        metaTitle.setAttribute("property", "og:title");
        metaTitle.setAttribute("content", title);
        document.head.appendChild(metaTitle);
      }

      
      let metaDescriptionOg = document.querySelector("meta[property='og:description']");
      if (metaDescriptionOg) {
        metaDescriptionOg.setAttribute("content", description);
      } else {
        metaDescriptionOg = document.createElement("meta");
        metaDescriptionOg.setAttribute("property", "og:description");
        metaDescriptionOg.setAttribute("content", description);
        document.head.appendChild(metaDescriptionOg);
      }

     
    

     
      let metaUrl = document.querySelector("meta[property='og:url']");
      if (metaUrl) {
        metaUrl.setAttribute("content", url);
      } else {
        metaUrl = document.createElement("meta");
        metaUrl.setAttribute("property", "og:url");
        metaUrl.setAttribute("content", url);
        document.head.appendChild(metaUrl);
      }

      
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (canonicalLink) {
        canonicalLink.setAttribute("href", url);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", url);
        document.head.appendChild(canonicalLink);
      }
    }
  }, [isAuth]);

  return (
    <>
      <Box sx={{ width: "100%", padding: "60px 0 0px 0" }}>
        <Grid
          container
          height={{ xs: "298px", sm: "380px" }}
          justifyContent={{ xs: "flex-start", sm: "center" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{
            backgroundImage: "linear-gradient(45deg, #0C4340 0%, #06A77D 100%)",
            overflow: "hidden",
            paddingX: { xs: 2, sm: 0 },
            paddingTop: { xs: 2, sm: 0 },
          }}
        >
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent={{ xs: "flex-start", sm: "center" }}
            paddingX={{ xs: 2 }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <ArrowBackIcon
                onClick={handleBackClick}
                sx={{
                  display: { xs: "block", sm: "none" },
                  color: "white",
                  fontSize: 28,
                }}
              />
              <StyledTypography1 variant="h2" color="white">
                Pricing plans
              </StyledTypography1>
            </Box>
            <StyledTypography2 color={colors.green50} sx={{ marginTop: 2 }}>
              Simple, transparent, and affordable pricing to enable everyone to
              equip themselves with financial knowledge.
            </StyledTypography2>
          </Grid>
        </Grid>

        <Box sx={{ position: "relative", top: { xs: "-160px", sm: "-110px" } }}>
          <PricingCard planDetails={plans} />
        </Box>
      </Box>
    </>
  );
};

export default PricingPage;
