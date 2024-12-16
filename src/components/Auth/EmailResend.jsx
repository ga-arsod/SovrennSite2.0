"use client";
import React from "react";
import Image from "next/image";
import { Box, Typography, TextField, Button, Container, Grid, InputLabel } from "@mui/material";
import { colors } from "@/components/Constants/colors";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { sendPasswordLinkApi } from "@/app/Redux/Slices/authSlice";

const StyledTypography1 = styled(Typography)`
  font-size: 33px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.02em;
`;





const EmailResend= ({email}) => {
  const dispatch=useDispatch()
  return (
    <Container>
      <Grid container marginTop={{ xs: "80px", sm: "120px" }}>
        <Grid item width="100%" marginTop={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: "#e8f8f4",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Image
                src="/email-resend-icon.png"
                alt="Lock Icon"
                width={56}
                height={56}
              />
            </Box>

           
            <StyledTypography1 color={colors.themeGreen}>
            Reset Link Sent
            </StyledTypography1>

           
            <Typography
            
              color={colors.navyBlue200}
              marginTop={3}
              sx={{
                fontSize: "17px",
                fontWeight: "400",
                lineHeight: "21px",
                textAlign: "center", 
               
                width: "100%", 
              }}
            >
           Please check your registered email id for the reset link.
            </Typography>
            <Typography
            
              color={colors.navyBlue200}
              marginTop={2}
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "17px",
                textAlign: "center", 
                
                width: "100%", 
              }}
            >
           Please check your registered email id for the reset link.<span style={{color:colors.themeGreen,cursor:'pointer'}} onClick={()=>{dispatch(sendPasswordLinkApi(email))}}>Click to resend</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmailResend;
