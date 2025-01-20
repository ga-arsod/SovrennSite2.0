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
              Payment Failed! An error occurred while processing the payment!
            </StyledTypography1>
            <StyledTypography2 color={colors.navyBlue200}>
              {"Don't worry your money is safe! In case your money got deducted, please email at" +
                " "}
              <Typography
                component="a"
                href="mailto:help@sovrenn.com"
                sx={{ color: colors.themeGreen }}
              >
                help@sovrenn.com
              </Typography>
              {" " + "and we will solve the problem in the next 12 hours."}
            </StyledTypography2>

            <Box sx={{ marginY: "24px" }}>
              <Image
                src="/rafiki.png"
                alt="Success Illustration"
                width={250}
                height={258}
              />
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
