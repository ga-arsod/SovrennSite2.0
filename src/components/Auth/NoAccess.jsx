import React from "react";
import styled from "@emotion/styled";
import { Grid, Typography,Button } from "@mui/material";
import { colors } from "../Constants/colors";
import { useSelector } from "react-redux";
import Footer from "../Home/Footer";
import Link from "next/link";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 19px;
  letter-spacing: -0.02em;
  text-align: center;
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  text-align: center;
`;
const StyledButton1 = styled(Button)`
  border-color: ${colors.themeGreen};
  color: ${colors.themeGreen};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-transform: none;
  background-color: white;
  
  :hover {
    background-color: ${colors.themeButtonHover};
    color: white;
    border-color: ${colors.themeButtonHover};
    outline: ${colors.themeButtonHover};
  }
  @media (max-width: 639px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  
  :hover {
    background-color: ${colors.themeButtonHover};
  }
  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;
const NoAccess = () => {
    const { userDetails, isAuth } = useSelector((store) => store.auth);
  return (
    <>
      <Grid container flexDirection="column" spacing={2} marginY="90px" alignItems="center" marginBottom="200px">
        <Grid item paddingTop="80px">
          <StyledTypography1 color={colors.navyBlue600} >
          Looks like you’re not a paid user.
          </StyledTypography1>
          <StyledTypography2 marginTop={1.5} color={colors.navyBlue600}>
          To read this full you need to buy a plan.
          </StyledTypography2>
        </Grid>
        <Grid item sx={{display:'flex',gap:2}}>
            <Link href="/signup">
          <StyledButton1 variant="outlined">Get 45 Days Free Trial</StyledButton1>
          </Link>
          <Link href="/pricing">
          <StyledButton2 variant="contained">{`Buy Full Access @ ₹${userDetails?.to_pay_for_fa}/yr`}</StyledButton2>
          </Link>
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default NoAccess;
