// app/error.js
"use client"; // Required for error components in Next.js
import { useEffect } from "react";
import { Grid,Typography,Button,Container } from "@mui/material";
import { colors } from "../components/Constants/colors";
import Image from "next/image";
import styled from "@emotion/styled";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 60px;
  line-height: 74px;
  letter-spacing: -0.04em;
  color: #034635;
  @media (max-width: 639px) {
    font-size: 34px;
    line-height: 40px;
  }
`;
const StyledTypography2 = styled(Typography)`
  font-weight: 600;
  font-size: 23px;
  line-height: 28px;
  letter-spacing: -0.02em;
  color: #034635;
  @media (max-width: 639px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0em;
  }
`;
const StyledButton2 = styled(Button)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${colors.themeGreen};
  text-transform: none;

  :hover {
    background-color: ${colors.themeButtonHover};
  }
`;

export default function Error({ error, reset }) {
    useEffect(() => {
       
    }, [error]);

    return (

    <>
     <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          marginTop="100px"
          marginBottom="50px"
        >
          <Grid item style={{ maxWidth: "580px", width: "100%" }}>
            <Image
              src="/cuate.png"
              width={580}
              height={350}
              alt="common_error"
              layout="responsive"
            />
          </Grid>
          <Grid item>
            <StyledTypography1 textAlign="center">
            Something Went Wrong on Our End
            </StyledTypography1>
            <StyledTypography2 marginTop={{ xs: 1, sm: 2 }} textAlign="center">
            We're Sorry! Please try again later or contact support if the issue persists.
            </StyledTypography2>
          </Grid>
          <Grid item marginTop={4}>
            <StyledButton2 href="/">Back to Homepage</StyledButton2>
          </Grid>
        </Grid>
      </Container>
    
       
        </>
    );
}
