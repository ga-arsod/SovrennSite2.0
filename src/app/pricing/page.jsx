"use client";
import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import PricingCard from "../../components/Cards/PricingCard"
import { useRouter } from "next/navigation";


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
  const router=useRouter();
  const handleBackClick = () => {
    router.back();  
  };
  return (
    <Box sx={{ width: "100%", padding: "60px 0 0px 0" }}>
      <Grid
        container
        height={{ xs: "298px", sm: "420px" }}
        justifyContent={{ xs: "flex-start", sm: "center" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{
          backgroundImage: 'linear-gradient(45deg, #0C4340 0%, #06A77D 100%)',
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
            sx={{ display: { xs: "block", sm: "none" }, color: "white",fontSize:'18px' }} />
            <StyledTypography1 variant="h2" color="white">
              Pricing plans
            </StyledTypography1>
          </Box>
          <StyledTypography2 color={colors.green50} sx={{ marginTop: 2 }}>
            Simple, transparent, and affordable pricing to enable everyone to equip themselves with financial knowledge.
          </StyledTypography2>
        </Grid>
      </Grid>

      <Box sx={{ position: "relative", top: { xs: "-160px", sm: "-170px" } }}>
        <PricingCard />
      </Box>
    </Box>
  );
};

export default PricingPage;