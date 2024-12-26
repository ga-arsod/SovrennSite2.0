"use client";
import Head from "next/head";
import { Grid, Typography, Button } from "@mui/material";
import styles from "../../styles/Privacy&Policy.module.css";
import styled from "@emotion/styled";
import { colors } from "@/components/Constants/colors";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Footer from "@/components/Home/Footer";

const StyledTypography1 = styled(Typography)`
  font-size: 36px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.02em;
  text-align:center;
  @media (max-width: 639px) {
    font-size: 19px;

    line-height: 19px;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
   text-align:center;
  @media (max-width: 639px) {
    font-size: 14px;

    line-height: 17px;
  }
`;
const StyledButton = styled(Button)`
  :hover {
    background-color: ${colors.blueButtonHover};

    border-color: ${colors.blueButtonHover};
    outline: ${colors.blueButtonHover};
  }
`;
const RefundPolicy = () => {
  const handleMailClick = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=help@sovrenn.com.com&su=Inquiry&body=Hi%20team,",
      "_blank"
    );
  };
  return (
    <>
      <Head>
        <title>Refund Policy of Sovrenn</title>

        <link
          rel="canonical"
          href="https://www.sovrenn.com/refund-policy"
          key="canonical"
        />
      </Head>
      <div id={styles.MainContainer}>
        <h2 style={{ marginBottom: "20px" }}>REFUND POLICY</h2>

        <ol>
          <li>
            A customer can claim 100% refund if they are not satisfied with
            citing the reasons for dis-satisfaction with the services within 7
            days of taking subscription.
          </li>

          <li>
            The amount of refund will be processed in a same manner by which the
            customer paid for the subscription and will be credited to the
            source of payment.
          </li>
        </ol>
      </div>
      <Grid
        container
        justifyContent="center"
        backgroundColor="#F3FAFB"
        height="300px"
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          paddingX={2}
        >
          <StyledTypography1 color={colors.navyBlue900}>
            Need Assistance with Refunds?
          </StyledTypography1>
          <StyledTypography2 color="#627B8F" marginY={2}>
            We're here to help! If you have questions or need support regarding
            our refund policy.
          </StyledTypography2>
          <StyledButton
            variant="contained"
            startIcon={<MailOutlineIcon />}
            onClick={handleMailClick}
            sx={{
              color: "white",
              fontWeight: "600",
              textTransform: "none",
              fontSize: "16px",
              backgroundColor: colors.navyBlue500,
              lineHeight: "35px",
            }}
          >
            Write to Us
          </StyledButton>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default RefundPolicy;
