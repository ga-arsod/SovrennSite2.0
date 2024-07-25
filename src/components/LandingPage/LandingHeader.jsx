"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import Image from "next/image";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: -0.02em;
  display: inline; /* Ensure it only takes up necessary space */
  text-align: center;
   @media (max-width: 700px) {
    font-size: 40px;
   
    line-height: 48px;
   
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  display: inline; /* Ensure it only takes up necessary space */
  text-align: center;
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: ${colors.themeOrange};
  text-transform: none;
  width: 70%;
  @media (max-width: 700px) {
    width: 100%;
   
  }
  :hover {
    background-color: ${colors.themeOrange};
  }
  margin: 0 auto; /* Center the button horizontally */
`;

const Container1 = styled(Box)`
  position: relative;
  width: 100%;
  max-width: 530px;
  height: 340px;
 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
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

const LandingHeader = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} marginX={{xs:"16px",sm:0}}>
      <Grid container paddingY={8} justifyContent="space-between"  width="1250px">
        <Grid item xs={12} sm={12} md={6} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} width="100%">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", textAlign: "center" }}>
            <StyledTypography1 component="span" marginRight={2}>
              {`Use Data to Find`}
            </StyledTypography1>
            <StyledTypography1 component="span" color={colors.themeOrange} marginRight={2}>
              {`High-Growth`}
            </StyledTypography1>
            <StyledTypography1 component="span" marginRight={2}>{`Stocks and`}</StyledTypography1>
            <StyledTypography1 component="span" color={colors.themeOrange}>
              {`Invest Wisely`}
            </StyledTypography1>
          </Box>
          <StyledTypography2 component="div" color="#667085" marginBottom={6} marginTop={3} width="85%" sx={{ textAlign: "center" }}>
            Experience Unlimited Potential with Sovrenn: Your 45-Day Free Trial Awaits
          </StyledTypography2>
          <StyledButton2 variant="contained">
            Get 45 Days Free Trial Now
          </StyledButton2>
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: { xs: 4, sm: 4 } }}>
          <Container1 sx={{bottom:{xs:0,md:"12%"}}}>
            <ParentImage
              src="/thumbnail.svg"
              alt="..."
              width={550}
              height={360}
              layout="responsive"
            />
            <OverlayImage
              src="/orangeplay.svg"
              alt="Overlay Image"
              width={80}
              height={80}
            />
          </Container1>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingHeader;