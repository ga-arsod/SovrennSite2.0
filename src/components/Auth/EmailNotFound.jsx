"use client";
import React from "react";
import { Box, Button, Container, Typography, Link, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/system";
import { colors } from "../Constants/colors";
import { useDispatch } from "react-redux";
import { resetLinkMessage } from "@/app/Redux/Slices/authSlice";


const StyledTypography1 = styled(Typography)`
  font-size: 33px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.02em;
`;

const StyledButton = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  width: 100%;
  :hover {
    background-color: ${colors.themeButtonHover};
  }

  @media (max-width: 700px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;
  margin-top: 16px;
  color: #667085;
`;

const EmailNotFound = () => {
  const dispatch=useDispatch()
  return (
    <Container
      maxWidth="sm"
     
      sx={{
       
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        
      }}
    >
      <Grid container justifyContent="center" alignItems="center" marginTop={{xs:"100px",sm:"150px"}}>
        <Grid item xs={12} textAlign="center">
          <StyledTypography1 color={colors.themeGreen} marginBottom={3}>
            Email Not Found!
          </StyledTypography1>

          <Typography
            color={colors.navyBlue200}
            sx={{
              maxWidth: "400px",
              marginBottom: "24px",
              fontSize: "18px",
              lineHeight: "21px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            The email you entered isn’t linked to any account. Please double-check
            and try again.
          </Typography>

         
          <StyledButton fullWidth sx={{ maxWidth: "300px", marginBottom: "16px" }} onClick={()=>{dispatch(resetLinkMessage())}}>
            Try Again
          </StyledButton>

         
          <StyledLink href="/login">
            <ArrowBackIcon sx={{ fontSize: "18px", marginRight: "8px" }} />
            Back to log in
          </StyledLink>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmailNotFound;
