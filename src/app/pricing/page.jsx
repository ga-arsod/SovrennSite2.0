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
import Head from "next/head";

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
  const {isAuth} = useSelector((store) => store.auth);
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allPlansApi());
  }, [isAuth]);
  return (
    <>
      <Head>
        <title>
         Sovrenn Pricing Plans
        </title>
        <meta
          name="description"
          content="Discover the pricing plans of Sovrenn Financial Technologies! Unlock access to India's premier platform for potential small and micro-cap stocks.
"
        />

        <meta
          property="og:title"
          content="Discover the pricing plans of Sovrenn Financial Technologies and unlock exclusive insights into InIndia'shriving small and micro-cap stock market!
"
        />
        <meta
          property="og:description"
          content="Discover the pricing plans of Sovrenn Financial Technologies! Unlock affordable access to India's leading platform for small and micro-cap stock investments."
        />
        <link
          rel="canonical"
          href={`https://www.sovrenn.com/discovery`}
          key="canonical"
        />
      </Head>
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
