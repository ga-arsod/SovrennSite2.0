"use client";
import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { androidAppLink, iosAppLink } from "@/utils/Data";
import Link from "next/link";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

const StyledTypography1 = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
`;

const PaymentConfirmation = () => {
  const searchParams = useSearchParams();
  const to = searchParams.get("to") || "/";
  const subscriptionType = searchParams.get("sub"); 


  const isFreeTrial = subscriptionType === "free_trial";
  return (
    <>
      <Head>
        <title>Sovrenn - Payment Confirmation</title>
      </Head>
      <Grid container justifyContent="center" paddingX={{ xs: 2, sm: 0 }}>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
            marginTop="60px"
            width={{ xs: "100%", sm: "750px" }}
          >
           
            <StyledTypography1 color="#034635" paddingTop={5}>
              Congrats! You have successfully subscribed!
            </StyledTypography1>
            {
              isFreeTrial ?  <StyledTypography2 marginTop={1} color={colors.navyBlue200}>
              This is official confirmation.You got <b>Trial Access</b> for free.
            
            </StyledTypography2> :
            <StyledTypography2 marginTop={1} color={colors.navyBlue200}>
              This is official confirmation. Thanks for joining Sovrenn Full
              Access.
            </StyledTypography2>
            }
            

          
            <Box sx={{ marginBottom: "24px" }}>
              <Image
                src="/payment-confirmation.png"
                alt="Success Illustration"
                width={217}
                height={258}
              />
            </Box>

           
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "19px",
                letterSpacing: "-0.02em",
              }}
              color={colors.navyBlue200}
              marginBottom={1}
            >
              Please download the Sovrenn app for a complete Sovrenn experience:
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ marginBottom: "32px" }}
            >
              <Grid item>
                <Link
                  href={iosAppLink}
                  passHref
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src="/appstore3.png"
                    width={132}
                    height={44}
                    alt="play-store"
                  />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={androidAppLink}
                  passHref
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    src="/mobilestore.png"
                    width={132}
                    height={44}
                    alt="app-store"
                  />
                </Link>
              </Grid>
            </Grid>

          {
            !isFreeTrial ?  <StyledTypography2 color={colors.navyBlue200}>
            You will be added to Sovrenn Times group shortly in the next 24-48
            hours. In case you are not added, please send an email at{" "}
            <Typography
              component="a"
              href="mailto:help@sovrenn.com"
              sx={{ color: colors.themeGreen }}
            >
              help@sovrenn.com.
            </Typography>
            .
          </StyledTypography2> : <></>
          }
           

            <Box sx={{ textAlign: "left", marginY: "24px" }}>
              <StyledTypography2 color={colors.navyBlue200}>
                1. Please learn investing by watching videos at{" "}
                <Typography
                  component="a"
                  href="https://sovrenn.com/education"
                  sx={{ color: colors.themeGreen }}
                >
                  sovrenn.com/education.
                </Typography>
                .
                <br />
                2. Please read all Sovrenn prime articles and promoter
                interviews at{" "}
                <Typography
                  component="a"
                  href="https://sovrenn.com/prime"
                  sx={{ color: colors.themeGreen }}
                >
                  sovrenn.com/prime.
                </Typography>
                .
                <br />
                3. Please check our discovery platform at{" "}
                <Typography
                  component="a"
                  href="https://sovrenn.com/discovery"
                  sx={{ color: colors.themeGreen }}
                >
                  sovrenn.com/discovery.
                </Typography>
                
              </StyledTypography2>
            </Box>

           
            <Grid container gap={2} justifyContent="center" marginBottom={12}>
              <Grid item xs={12} sm="auto">
                <Link href="/discovery" replace>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      paddingY: "12px",
                      fontSize: "18px",
                      lineHeight: "21px",
                      fontWeight: "600",
                      color: colors.themeGreen,
                    }}
                  >
                    Discover Stocks
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Link href={to} replace>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      paddingY: "12px",
                      fontSize: "18px",
                      lineHeight: "21px",
                      fontWeight: "600",
                      color: "white",
                      backgroundColor: colors.themeGreen,
                    }}
                  >
                    Back to Homepage
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentConfirmation;
