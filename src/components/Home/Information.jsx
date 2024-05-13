"use client";
import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import Image from "next/image";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

const StyledTypography1 = styled(Typography)`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  text-align: center;
  @media (max-width: 700px) {
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    text-align: center;
  }
`;

const StyledTypography2 = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  @media (max-width: 700px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
`;

const Information = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          paddingX={2}
          paddingY={4}
        >
          <Grid item>
            <Typography sx={{ textAlign: "center" }} gutterBottom>
              <StyledTypography1
                component="span"
                marginRight={1}
                color="#0D1726"
              >
                Everything You Need to Know About
              </StyledTypography1>
              <StyledTypography1
                component="span"
                color={theme.palette.primary.main}
              >
                Sovrenn
              </StyledTypography1>
            </Typography>
          </Grid>
          <Grid item sx={{ textAlign: "center" }}>
            <StyledTypography2
              component="span"
              justifyContent="center"
              wrap="wrap"
              gutterBottom
              color="#627B8F"
            >
              Here is a video that will quickly enable you to understand what
              you can expect from Sovrenn.
            </StyledTypography2>
          </Grid>
          <Grid item>
            <Image
              src="/green.svg"
              alt="..."
              width={750}
              height={470}
              layout="responsive"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Information;
