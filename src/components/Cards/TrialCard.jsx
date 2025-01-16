"use client";

import React,{useState} from "react";
import styled from "@emotion/styled";
import { Box, Grid, Typography, Button } from "@mui/material";
import { gradientColors } from "../Constants/colors";
import { colors } from "../Constants/colors";
import Link from "next/link";
import { useSelector } from "react-redux";
import TrialCardPaymentButton from "../../components/Common/TrialCardPaymentButton"
import LoginModal from "../Modal/LoginModal";

const StyledGrid = styled(Box)`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 960px;
  margin: auto;
  bottom: 6rem;
  left: 0;

  @media (min-width: 640px) and (max-width: 1080px) {
    width: 90%;
    bottom: 7rem;
  }

  @media (min-width: 1080px) {
    bottom: 7rem;
  }
`;

const StyledTypography1 = styled(Typography)`
  font-weight: 700;
  font-size: 26px;
  line-height: 34px;
  letter-spacing: -0.02em;

  @media (max-width: 639px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  @media (max-width: 639px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;

const StyledButton = styled(Button)`
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: white;
  text-transform: none;

  &:hover {
    background-color:${colors.themeButtonHover}; 
    color: white; 
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const TrialCard = () => {
  const { isAuth, userDetails } = useSelector((store) => store.auth);
  const [isOpen,setIsOpen]=useState(false)
  const handleClose=()=>{
    setIsOpen(false)
  }
  return (
    <>
     <LoginModal isOpen={isOpen} handleClose={handleClose} />
      <Box
        sx={{ position: "absolute" }}
        bgcolor={{ xs: "#000910", sm: "transparent" }}
        width="100%"
      >
        <StyledGrid
          container
          justifyContent="center"
          paddingX={{ xs: 2, sm: 0 }}
          paddingTop={{ xs: 16, sm: 0 }}
        >
          <Grid
            item
            sx={{
              background: "linear-gradient(15deg, #0C4340 0%, #06A77D 100%)",

              boxShadow: "0px 8px 8px -4px #1018280A",

              boxShadow: "0px 20px 24px -4px #1018281A",

              borderRadius: "8px",
              maxWidth: "960px",
              width: "100%",
            }}
          >
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
              alignItems="center"
              justifyContent="space-between"
              paddingY={{ xs: 2, sm: 4 }}
              paddingX={{ xs: 2, sm: 4, md: 4 }}
            >
              <Grid item width={{ xs: "100%", sm: "70%" }}>
                <StyledTypography1
                  color="#F3FAFB"
                  textAlign={{ xs: "center", sm: "start" }}
                  marginBottom={2}
                >
                  {!isAuth
                    ? "Begin your 45 days free trial today!"
                    : isAuth &&
                      (userDetails?.subscriptions.includes("full-access") ||
                        userDetails?.subscriptions.includes("life"))
                    ? "Discover Top-Performing Stocks Today!"
                    : "Let’s continue your investing journey by upgrading today!"}
                </StyledTypography1>
                <StyledTypography2
                  color="#F4F3F3"
                  textAlign={{ xs: "center", sm: "start" }}
                  gutterBottom
                  marginBottom={3}
                >
                  {!isAuth
                    ? "Unlock 45 days of financial insight with Sovrenn. Empower your investing journey today!"
                    : isAuth &&
                      (userDetails?.subscriptions.includes("full-access") ||
                        userDetails?.subscriptions.includes("life"))
                    ? "Uncover exciting opportunities to grow your portfolio with the market's best-performing stocks, all in one place."
                    : "Enjoy uninterrupted access! Your full access begins seamlessly once your trial period concludes"}
                </StyledTypography2>
              </Grid>
              <Grid item>
                {!isAuth ? (
                  <Link href="/signup">
                    <StyledButton variant="contained">
                      Get 45 days Free Trial
                    </StyledButton>
                  </Link>
                ) : isAuth &&
                  (userDetails?.subscriptions.includes("full-access") ||
                    userDetails?.subscriptions.includes("life")) ? (
                  <Link href="/discovery">
                    <StyledButton variant="contained">
                      Discover Now
                    </StyledButton>
                  </Link>
                ) : (
                 <TrialCardPaymentButton/>
                )}
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>
      </Box>
    </>
  );
};

export default TrialCard;
